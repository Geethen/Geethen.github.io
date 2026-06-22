# Your Random Forest Runs in 0.09 Microseconds Now

## How Timber compiles tree-based models to native C - and why it matters for remote sensing and edge deployment.

---

If you work in remote sensing, precision agriculture, or environmental monitoring, your production model probably is not a transformer. It is a gradient-boosted tree trained on tabular features - spectral indices, texture metrics, terrain derivatives. These models work well. The bottleneck is not the model. It is running `model.predict()` in Python over millions of pixels.

Timber fixes this. It takes your trained model and compiles it to C code. No Python at runtime. No dependencies. Just fast math.

```bash
pip install timber-compiler
```

It supports XGBoost, LightGBM, scikit-learn, CatBoost, and ONNX tree ensembles.

## How It Works

You train your model in Python as usual, then hand it to Timber:

```python
import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = xgb.XGBClassifier(n_estimators=50, max_depth=4, random_state=42)
model.fit(X_train, y_train)
model.get_booster().save_model("model.json")
```

Compile it:

```bash
timber compile --model model.json --out ./compiled
```

```text
Parsed: 50 trees, max depth 4, 30 features
Generating C99 code... 169 lines
Compilation complete in 64ms
```

Your 50-tree model is now 169 lines of C. The output directory has `model.c`, `model.h`, and build files. No Python needed to run it.

Run inference from Python:

```python
from timber.runtime.predictor import TimberPredictor
import numpy as np

predictor = TimberPredictor.from_artifact("./compiled", build=True)
X_f32 = np.ascontiguousarray(X_test, dtype=np.float32)
predictions = predictor.predict(X_f32)
```

Or skip Python entirely and call it from C:

```c
#include "model.h"

TimberCtx *ctx;
timber_init(&ctx);

float input[30] = { /* your features */ };
float output[1];
timber_infer_single(input, output, ctx);
// output[0] is your prediction
```

## The Numbers

I tested three ways to run the same 50-tree XGBoost model:

```text
Method                    Single sample     Per-sample (batch)
------------------------------------------------------------
Python XGBoost              754.0 us            1.61 us
Timber from Python           11.8 us            0.40 us
Timber from C                 0.09 us            0.11 us
```

**The compiled C code runs in 90 nanoseconds.** That is 8,000x faster than Python.

When called from Python, there is overhead from passing data between Python and C (about 12 us per call). That brings it to 64x faster for single samples. In batch mode, that overhead is shared across all samples, so per-sample cost drops to 0.40 us - close to the raw C speed.

All three methods produced **identical classifications**. The probability values differ by at most 0.024 due to float precision, but every class label matched.

### The Three Layers

When you call `model.predict()` in Python, three things happen in sequence:

1. **Python figures out what you want** - it unpacks your data, checks types, sets up memory. This is like filling out paperwork before the actual work starts.
2. **The data crosses a bridge** - Python cannot do the math itself, so it hands your numbers to a lower-level language (C/C++) through a translation layer called "ctypes". Think of this as passing a document through a window at a government office. There is waiting involved.
3. **The actual math runs** - the C code walks through your 50 decision trees and produces a probability. This is the part that actually matters.

#### What we measured

| Step | Time | Analogy |
|---|---|---|
| Python + paperwork + bridge | ~12 us | Standing in line, filling forms |
| Actual tree math | 0.09 us | The clerk stamps your form in 90 nanoseconds |

Python XGBoost does all three steps its own way and takes 754 us total.

When we use Timber through Python (`ctypes`), we still pay for steps 1 and 2 (~12 us), but step 3 is much faster because Timber turned your model into optimized machine code.

When we skip Python entirely and run the same Timber code from a C program, we only pay for step 3. That is where the **8,000x speedup** comes from - we removed the line and the paperwork.

## What This Means Practically

**If you stay in Python (which is fine for most work):** you get 64x faster inference. That is already huge - an 11-minute raster job drops to about 10 seconds.

*(Note: The 336x number from Timber's website was measured on a Mac, where the C/Python "bridge" overhead happens to be smaller. Our Windows machine has a slower bridge, so we see 64x through Python. The raw math speed is similar.)*

**If you need absolute maximum speed:** say, on a drone processor or inside a real-time sensor pipeline, you would write a small C program (like the 40-line `bench.c` we just made) that calls Timber's math directly. No Python installed on the device at all. That gets you 8,000x.

## Practical Tips

**You need a C compiler.** Without one, Timber falls back to an interpreted mode that is ~10x slower. On conda: `conda install -c conda-forge m2w64-gcc`. A modern gcc (15+) or clang produces slightly better code than older versions, but the difference is small.

**Use the Python API, not the HTTP server.** `timber serve` is for quick testing only. Its built-in server added ~2 seconds per request in my tests. Use `TimberPredictor.predict()` directly, or wrap it in FastAPI for production serving.

**Prepare inputs as float32.** Timber's C code works in float32. Convert once upfront instead of every call:

```python
X = np.ascontiguousarray(X, dtype=np.float32)
```

**Batch your data.** Per-sample cost drops dramatically - from 11.8 us to 0.40 us on my machine. If you are processing rasters, you are already working in tiles. Just feed them as contiguous arrays.

**Check accuracy with `timber validate`.** Timber's optimizer quantizes some thresholds to save space, which can shift probabilities slightly:

```bash
timber validate --artifact ./compiled --reference model.json --data samples.csv --tolerance 0.05
```

For my model, all 569 samples were within 0.025 of the original. Class labels were identical.

## The Full Script

```python
import os, sys, subprocess, time
import numpy as np
import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# Ensure gcc is on PATH (adjust for your setup)
ENV = os.path.dirname(sys.executable)
os.environ["PATH"] = os.path.join(ENV, "Library", "mingw-w64", "bin") + os.pathsep + os.environ["PATH"]
TIMBER = os.path.join(ENV, "Scripts", "timber.exe")

# Train
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = xgb.XGBClassifier(n_estimators=50, max_depth=4, random_state=42)
model.fit(X_train, y_train)
model.get_booster().save_model("model.json")

# Compile
subprocess.run([TIMBER, "compile", "--model", "model.json", "--out", "./compiled"], capture_output=True, check=True)

# Load and predict
from timber.runtime.predictor import TimberPredictor
predictor = TimberPredictor.from_artifact("./compiled", build=True)
X_f32 = np.ascontiguousarray(X_test, dtype=np.float32)

# Benchmark
for _ in range(50): predictor.predict(X_f32)
t0 = time.perf_counter()
for _ in range(2000): predictor.predict(X_f32)
timber_us = (time.perf_counter() - t0) / 2000 * 1e6

for _ in range(50): model.predict_proba(X_test)
t0 = time.perf_counter()
for _ in range(2000): model.predict_proba(X_test)
python_us = (time.perf_counter() - t0) / 2000 * 1e6

agreement = ((predictor.predict(X_f32).flatten() >= 0.5) == (model.predict_proba(X_test)[:, 1] >= 0.5)).mean() * 100
print(f"Python: {python_us:.1f} us | Timber: {timber_us:.1f} us | Speedup: {python_us/timber_us:.1f}x | Agreement: {agreement:.1f}%")
```

## Bottom Line

The compiled model is absurdly fast - 90 nanoseconds. What slows it down is Python wrapping. For your raster workflows batching hundreds of pixels at a time, the wrapping cost gets shared across all pixels and you end up at ~0.4 us per pixel, which is already excellent. Going to pure C only matters if you are deploying to hardware that does not have Python.

If your work involves classifying pixels from satellite imagery, running models on field sensors, or serving predictions from a tile server - this is worth the 10 minutes it takes to try.

Train in Python. Compile with Timber. Deploy anywhere.

---

*Timber is open-source under Apache 2.0: [github.com/kossisoroyce/timber](https://github.com/kossisoroyce/timber)*

---

**Tags**: Remote Sensing, Machine Learning, XGBoost, Inference Optimization, Geospatial, Edge Computing, Python

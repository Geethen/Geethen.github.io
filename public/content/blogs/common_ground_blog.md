# Common Ground: A Semi-Supervised Approach to Scalable Time-Series Mapping

![Common Ground Header](/assets/remote-sensing.png)

**TL;DR:** We introduce "Common Ground," a new framework that combines unsupervised change detection with semi-supervised learning to automatically update land cover and invasive species maps over time. In quantitative experiments, this method improved classification predictions by **0.02 - 0.16** (F1-score) compared to baseline approaches, eliminating the need for manual re-labeling.

**Read the full paper on arXiv:** [arXiv:2602.04373](http://arxiv.org/abs/2602.04373)

---


Mapping the changing surface of our planet—whether getting a fix on invasive species or tracking urbanization—is a race against time. A machine learning model trained on satellite imagery from 2018 often fails when applied to 2023 data. The landscape changes, seasons shift, and atmospheric conditions fluctuate, leading to "label decay."

To keep maps current, researchers typically have to manually collect thousands of new training (reference) labels for every new time step—a process that is slow, expensive, and unscalable.

Today, we are sharing **"Common Ground,"** a semi-supervised learning (SSL) framework that solves this bottleneck by effectively "recycling" old labels. By identifying the *spectral common ground* between time points, we can automate the maintenance of long-term ecological monitoring systems.

## The "Common Ground" Intuition

The core insight is simple: even in a rapidly changing landscape, **not everything changes**.

Stable features (e.g., an established forest, a concrete building) provide a reliable link between the past ($t_0$) and the present ($t_1$). If we can automatically identify these stable areas, we can treat their old labels as valid for the current time. This gives us a high-confidence "anchor" dataset to retrain our models, without human intervention.

Our framework executes this in two stages:
1.  **Bridging the Gap:** We use unsupervised change detection algorithms (like IRMAD or CCDC) to separate **Stable** pixels from **Changed** pixels. We then train a "Stage 1" model on the the past ($t_0$) and the present ($t_1$) stable subset, allowing it to learn how the spectral signature of unchanged classes has shifted over time.
2.  **Filling in the Blanks:** This Stage 1 model predicts labels for the **Changed** areas (Pseudo-labeling). Finally, a "Stage 2" model is trained on the full dataset— the past ($t_0$) + the present ($t_1$) stable subset (original labels) + the present ($t_1$) changed subset (pseudo-labels)—creating a robust classifier that covers the entire current landscape.

## Key Results

We evaluated Common Ground across three diverse case studies, ranging from fine-scale invasive tree species mapping to continental-scale land cover classification and for both multispectral and hyperspectral data.

### 1. Performance Depends on Targets
Our results suggest that the benefits of this SSL approach are **more dependent on the complexity of the mapping target than purely on dataset size**.
*   **Fine-Class Mapping:** For difficult targets like invasive tree species (*Acacia* spp.) with limited data (~1,500 samples), we saw substantial gains, with F1-scores improving by **0.10-0.16**.
*   **Broad-Class Mapping:** For continental-scale land cover with abundant data (>33,000 samples), the gains were modest (0.02 improvement in F1), suggesting the method is most valuable when the classification problem itself is inherently hard.
* **Dataset size:** We explicitly tested the effect of dataset size by training on different sized subsets of the broad class data, and found that increases in dataset size did not substantially increase the gains in F1-score, suggesting that the gains were more dependent on the complexity of the mapping target than purely on dataset size. 

### 2. Seamless Sensor Transferability
A challenge in remote sensing is discontinuing sensors or once-off data acquisitions. We tested the framework's ability to transfer labels across different sensors—training on **Airborne Hyperspectral** data from 2018 and 2023 that were collected with different imaging spectrometers.
*   By combining our method with L2 normalization, we boosted F1-scores for invasive species mapping by **0.02 - 0.1** in cross-sensor scenarios, enabling continuity even when the observing hardware changes.

### 3. Model Architecture Matters
We compared the industry-standard **Random Forest (RF)** against **TabPFN**, a novel Transformer-based foundation model for tabular data.
*   **TabPFN** outperformed RF by **0.08** F1-score in high-dimensional hyperspectral settings, validating its utility for complex spectral data.

---

## Improving Your Workflow: A Step-by-Step Guide

Below, we break down how to implement the Common Ground method. We assume you have a dataset containing spectral features for two time points ($t_0$ and $t_1$) and labels for $t_0$.

### Step 1: Detect Change
Before running the Common Ground algorithm, you need to identify which reference samples have changed. In our paper, we used **IRMAD** (Iteratively Reweighted Multivariate Alteration Detection) or **CCDC** (Continuous Change Detection and Classification) to detect change, but you can use any unsupervised change detection method.
*   **Stable ($0$):** Use $t_0$ label for $t_1$.
*   **Changed ($1$):** $t_0$ label is invalid; needs pseudo-labeling.

### Step 2: Stage 1 Training (The Bridge)
We train the first model on the "trusted" data: all original $t_0$ data plus the **Stable** subset of $t_1$.
```python
# Filter T1 data for non-changing (stable) pixels
t1_stable = df_t1[df_t1['change'] == 0].copy()

# Combine T0 data and T1 Stable data
X_stage1 = pd.concat([df_t0[features], t1_stable[features]])
y_stage1 = pd.concat([df_t0['class'], t1_stable['class']])

# Train the "Bridge" model
rf_stage1 = RandomForestClassifier(n_estimators=100)
rf_stage1.fit(X_stage1, y_stage1)
```

### Step 3: Pseudo-Labeling
Now we use the "Bridge" model to guess the labels for the **Changed** areas in $t_1$.
```python
t1_changed = df_t1[df_t1['change'] == 1].copy()

# Predict new labels for changed areas
if len(t1_changed) > 0:
    t1_changed['class'] = rf_stage1.predict(t1_changed[features])
```

### Step 4: Stage 2 Training (Common Ground)
Finally, we train the robust model on *everything*: $t_0$, stable $t_1$, and pseudo-labeled changed $t_1$.
```python
# Combine all datasets
X_final = pd.concat([X_stage1, t1_changed[features]])
y_final = pd.concat([y_stage1, t1_changed['class']])

# Train Final Model
rf_final = RandomForestClassifier(n_estimators=200)
rf_final.fit(X_final, y_final)
```

---

## Combined Script (Copy-Paste Ready)

Here is the complete function to train a Common Ground model.

```python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def train_common_ground(df_t0, df_t1, features):
    """
    Trains a Random Forest using the Common Ground SSL framework.
    
    Args:
        df_t0 (pd.DataFrame): Data from time t0 with 'class' labels.
        df_t1 (pd.DataFrame): Data from time t1 with 'change' column (0/1) 
                              and inherited 'class' from t0.
        features (list): List of feature column names.
    
    Returns:
        model: Trained Stage 2 Random Forest classifier.
    """
    # --- STAGE 1: Train on T0 + Stable T1 ---
    t1_stable = df_t1[df_t1['change'] == 0].copy()
    
    X_stage1 = pd.concat([df_t0[features], t1_stable[features]])
    y_stage1 = pd.concat([df_t0['class'], t1_stable['class']])
    
    model_s1 = RandomForestClassifier(n_estimators=100, n_jobs=-1, random_state=42)
    model_s1.fit(X_stage1, y_stage1)
    
    # --- PSEUDO-LABELING: Label Changed T1 ---
    t1_changed = df_t1[df_t1['change'] == 1].copy()
    
    if len(t1_changed) > 0:
        t1_changed['class'] = model_s1.predict(t1_changed[features])
    
    # --- STAGE 2: Train on All Available Data ---
    # Combine original T0, Stable T1, and Pseudo-labeled Changed T1
    X_final = pd.concat([X_stage1, t1_changed[features]])
    y_final = pd.concat([y_stage1, t1_changed['class']])
    
    model_final = RandomForestClassifier(n_estimators=200, n_jobs=-1, random_state=42)
    model_final.fit(X_final, y_final)
    
    return model_final
```

---

## Advanced: Leave-Location-Time-Out (LLTO) Validation

For rigorous validation, we use **Leave-Location-Time-Out (LLTO)**. This ensures that when we validate on a specific location at time $t_1$, the model hasn't seen the **same location** at time $t_0$ during training. This prevents spatial leakage and "background memorization," providing a true test of the model's ability to generalize over space and time.

```python
from sklearn.cluster import KMeans
from sklearn.metrics import f1_score, accuracy_score

def run_llto_validation(df_t0, df_t1, features, target='class', n_folds=5, random_state=42):
    """
    Performs Leave-Location-Time-Out (LLTO) cross-validation.
    Ensures that when testing on a spatial fold at time t1, the corresponding 
    fold at time t0 is EXCLUDED from training.
    """
    print(f"Starting {n_folds}-fold LLTO Validation...")
    
    # 1. Create Spatial Folds using K-Means on Coordinates
    # Assuming 'x' and 'y' columns exist
    coords = pd.concat([df_t0[['x', 'y']], df_t1[['x', 'y']]])
    kmeans = KMeans(n_clusters=n_folds, random_state=random_state, n_init='auto')
    
    # Assign cluster IDs (folds) to both datasets
    
    # Robust way: Cluster all unique locations first
    unique_locs = coords.drop_duplicates().reset_index(drop=True)
    unique_locs['fold'] = kmeans.fit_predict(unique_locs[['x', 'y']])
    
    # Map folds back to DataFrames
    df_t0 = df_t0.merge(unique_locs, on=['x', 'y'], how='left')
    df_t1 = df_t1.merge(unique_locs, on=['x', 'y'], how='left')
    
    scores = []
    
    for fold in range(n_folds):
        print(f"  Processing Fold {fold+1}/{n_folds}...")
        
        # --- TEST SET DEFINITION ---
        # We test on FOLD k at time t1
        test_mask = (df_t1['fold'] == fold)
        X_test = df_t1.loc[test_mask, features]
        y_test = df_t1.loc[test_mask, target] # Ground Truth for T1
        
        if len(X_test) == 0:
            continue

        # --- TRAINING SET DEFINITION (LLTO) ---
        # Train on ALL other folds at t0 AND t1
        # CRITICAL: Exclude FOLD k from t0 to prevent memorization
        
        train_t0 = df_t0[df_t0['fold'] != fold].copy()
        
        # For t1 training data, we follow Common Ground logic:
        # We take other folds' data, split into Stable/Changed for SSL
        train_t1 = df_t1[df_t1['fold'] != fold].copy()
        
        # --- APPLY COMMON GROUND PIPELINE ---
        
        # 1. Stage 1 (Bridge): Train on T0_other + Stable T1_other
        t1_stable = train_t1[train_t1['change'] == 0].copy()
        
        X_s1 = pd.concat([train_t0[features], t1_stable[features]])
        y_s1 = pd.concat([train_t0[target], t1_stable[target]])
        
        rf_s1 = RandomForestClassifier(n_estimators=100, n_jobs=-1, random_state=random_state)
        rf_s1.fit(X_s1, y_s1)
        
        # 2. Pseudo-Labeling: Predict Changed T1_other
        t1_changed = train_t1[train_t1['change'] == 1].copy()
        if len(t1_changed) > 0:
            t1_changed[target] = rf_s1.predict(t1_changed[features])
            
        # 3. Stage 2 (Final): Train on Everything (except test fold & t0-leakage)
        X_final = pd.concat([X_s1, t1_changed[features]])
        y_final = pd.concat([y_s1, t1_changed[target]])
        
        rf_final = RandomForestClassifier(n_estimators=200, n_jobs=-1, random_state=random_state)
        rf_final.fit(X_final, y_final)
        
        # --- EVALUATION ---
        preds = rf_final.predict(X_test)
        f1 = f1_score(y_test, preds, average='weighted')
        scores.append(f1)
        
    avg_f1 = np.mean(scores)
    print(f"Mean LLTO F1-Score: {avg_f1:.4f}")
    return avg_f1
```

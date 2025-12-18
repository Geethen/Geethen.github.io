# Uncertainty Quantification in Earth Observation

Machine learning models often make confident predictions even when they are wrong. In Earth Observation (EO), where decisions can have massive ecological and economic consequences, knowing *when* a model is uncertain is as important as the prediction itself.

## Conformal Prediction
This research explores the use of **Conformal Prediction (CP)** to provide rigorous uncertainty intervals for probabilistic machine learning models in EO.

### Why it matters:
- **Decision Support**: Practitioners can ignore predictions where uncertainty exceeds a certain threshold.
- **Model Robustness**: CP helps identify regions or conditions where the model is likely to fail.
- **Transparancy**: Provides a statistically sound framework for communicating AI reliability.

## Implementation
We applied CP to land cover classification tasks using Random Forests and Deep Neural Networks. Our results show that CP-derived intervals are more reliable than standard softmax probabilities or variance-based metrics.

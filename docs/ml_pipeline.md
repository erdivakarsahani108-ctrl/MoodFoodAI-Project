# ML Pipeline

This document describes the machine learning architecture, training pipeline, and model evaluation strategy for the MoodFood AI system.

## Core Pipelines

### Mood Detection Pipeline

- Uses a text classification pipeline with TF-IDF vectorization and logistic regression.
- Supported labels: `optimistic`, `negative`, `calm`.
- Training data is stored in `ml/data/mood_text.csv`.
- The model is persisted as a joblib artifact under `ml/artifacts/`.
- Evaluation metrics include accuracy, precision, recall, and F1 score.

### Health Risk Prediction Pipeline

- Uses a logistic regression classifier trained on structured health metrics.
- Input features include age, BMI, height, and weight.
- Target label `at_risk` identifies users who require prioritized diet and lifestyle support.
- Training data is stored in `ml/data/health_risk.csv`.
- Scaler and classifier are persisted together for robust inference.

### Recommendation Engine

- Builds item embeddings from food catalog metadata using TF-IDF.
- Uses cosine similarity and NearestNeighbors to retrieve candidate recommendations.
- The recommendation engine is persisted as a serialized artifact.
- Metrics capture item coverage and embedding dimensionality.

### Vision and OCR Support

- Provides a face landmark extractor using OpenCV Haar cascades.
- Offers an initial mood estimation from face detection.
- OCR nutrition label reading will be implemented in the AI service layer; sample data lives in `ml/data/nutrition_labels.csv`.

## Model Versioning

- Model metadata is stored in `ml/artifacts/model_registry.json`.
- Each training run registers:
  - model name
  - version identifier
  - artifact path
  - training metrics
  - UTC timestamp

## Training and Evaluation

### Training

- Run `python ml/train.py` from the repository root.
- This script trains the mood, health, and recommendation models sequentially.
- Artifacts are saved in `ml/artifacts/`.

### Evaluation

- Run `python ml/evaluate.py` to compute classification metrics for the saved models.
- Evaluation uses the same dataset split and reports accuracy and classification metrics.

## Explainability

- Text predictions can be explained using token analysis from the TF-IDF vectorizer.
- Health model explanations are derived from logistic regression coefficients.
- Recommendation explanations describe similarity-based ranking and item relevance.

## Future Enhancements

- Replace the text classifier with a Hugging Face transformer fine-tuning pipeline.
- Add a speech emotion recognition model using audio feature extraction.
- Add a facial emotion detection model with MediaPipe and deep learning.
- Expand recommendation embeddings with semantic transformers and FAISS indexing.
- Add model retraining workflows and drift detection automation.

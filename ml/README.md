# ML Module

This folder contains model training and evaluation pipelines for the AI Mood-Based Food Recommendation System.

## Purpose

The ML module supports:
- Mood detection using text, voice, and facial expressions
- Health risk prediction for diabetes, hypertension, heart disease, obesity, and PCOS
- Recommendation ranking and personalization
- Nutrition label OCR and barcode recognition inference
- Model versioning, explainability, and evaluation metrics

## Structure

- `data/` contains curated sample datasets for training and validation.
- `src/` contains reusable model, feature, trainer, and utility modules.
- `train.py` orchestrates end-to-end dataset loading, model training, evaluation, and artifact persistence.
- `evaluate.py` computes recommendation and classification metrics.

## Usage

Install ML dependencies in a Python environment:

```bash
pip install -r ml/requirements.txt
```

Train the core models:

```bash
python ml/train.py
```

Evaluate using the built-in pipeline:

```bash
python ml/evaluate.py
```

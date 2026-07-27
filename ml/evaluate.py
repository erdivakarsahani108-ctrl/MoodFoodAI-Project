import json
from pathlib import Path

import pandas as pd
from sklearn.metrics import classification_report, accuracy_score

from ml.src.config import DEFAULT_MODELS
from ml.src.data_loader import load_mood_text_dataset, load_health_risk_dataset
from ml.src.mood_model import MoodTextModel
from ml.src.health_model import HealthRiskModel


def evaluate_mood_model() -> dict:
    df = load_mood_text_dataset()
    texts = df['text'].astype(str).tolist()
    labels = df['label'].astype(str).tolist()
    model = MoodTextModel()
    model.load(Path(DEFAULT_MODELS['mood_text']))
    predictions = [model.pipeline.predict([text])[0] for text in texts]
    report = classification_report(labels, predictions, output_dict=True)
    accuracy = accuracy_score(labels, predictions)
    return {'accuracy': accuracy, 'classification_report': report}


def evaluate_health_model() -> dict:
    df = load_health_risk_dataset()
    features = df[['age', 'bmi', 'height_cm', 'weight_kg']].fillna(0.0).to_numpy(dtype=float)
    labels = df['at_risk'].astype(int).tolist()
    model = HealthRiskModel()
    model.load(Path(DEFAULT_MODELS['health_risk']))
    predictions = model.pipeline.predict(features)
    report = classification_report(labels, predictions, output_dict=True)
    accuracy = accuracy_score(labels, predictions)
    return {'accuracy': accuracy, 'classification_report': report}


def main() -> None:
    mood_metrics = evaluate_mood_model()
    print('Mood model evaluation:')
    print(json.dumps(mood_metrics, indent=2))

    health_metrics = evaluate_health_model()
    print('Health model evaluation:')
    print(json.dumps(health_metrics, indent=2))


if __name__ == '__main__':
    main()

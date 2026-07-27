import json
from pathlib import Path

import pandas as pd

from ml.src.config import ARTIFACTS_DIR, DATA_DIR, DEFAULT_MODELS, HEALTH_MODEL_VERSION, RECOMMENDATION_MODEL_VERSION, TEXT_MODEL_VERSION
from ml.src.data_loader import load_health_risk_dataset, load_mood_text_dataset, load_food_catalog
from ml.src.explainability import explain_recommendation_item
from ml.src.health_model import HealthRiskModel
from ml.src.mood_model import MoodTextModel
from ml.src.recommendation_model import RecommendationEngine
from ml.src.versioning import create_metadata, register_model
from ml.src.features import build_text_features, build_health_features, build_recommendation_embeddings


def train_mood_text_model() -> dict:
    df = load_mood_text_dataset()
    texts = df['text'].astype(str).tolist()
    labels = df['label'].astype(str).tolist()
    model = MoodTextModel()
    metrics = model.train(texts, labels)
    path = DEFAULT_MODELS['mood_text']
    model.save(path)
    register_model(create_metadata('mood_text', TEXT_MODEL_VERSION, path, metrics))
    return metrics


def train_health_model() -> dict:
    df = load_health_risk_dataset()
    features = df[['age', 'bmi', 'height_cm', 'weight_kg']].fillna(0.0).to_numpy(dtype=float)
    labels = df['at_risk'].astype(int).tolist()
    model = HealthRiskModel()
    metrics = model.train(features, labels)
    path = DEFAULT_MODELS['health_risk']
    model.save(path)
    register_model(create_metadata('health_risk', HEALTH_MODEL_VERSION, path, metrics))
    return metrics


def train_recommendation_model() -> dict:
    df = load_food_catalog()
    items = df.to_dict(orient='records')
    item_texts = [f"{row['food_name']} {row['cuisine']} {row['category']}" for row in items]
    embeddings = build_recommendation_embeddings(item_texts)
    engine = RecommendationEngine()
    engine.fit(items, embeddings)
    path = DEFAULT_MODELS['recommendation']
    engine.save(path)
    metrics = {'item_count': len(items), 'embedding_dimension': int(embeddings.shape[1])}
    register_model(create_metadata('recommendation', RECOMMENDATION_MODEL_VERSION, path, metrics))
    return metrics


def main() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

    mood_metrics = train_mood_text_model()
    print('Mood text model metrics:')
    print(json.dumps(mood_metrics, indent=2))

    health_metrics = train_health_model()
    print('Health risk model metrics:')
    print(json.dumps(health_metrics, indent=2))

    rec_metrics = train_recommendation_model()
    print('Recommendation engine metrics:')
    print(json.dumps(rec_metrics, indent=2))

    print('Training complete. Artifacts stored in', ARTIFACTS_DIR)


if __name__ == '__main__':
    main()

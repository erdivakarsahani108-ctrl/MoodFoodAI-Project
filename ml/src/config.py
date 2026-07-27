from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'
ARTIFACTS_DIR = BASE_DIR / 'artifacts'
MODEL_REGISTRY_FILE = ARTIFACTS_DIR / 'model_registry.json'

DEFAULT_MODELS = {
    'mood_text': ARTIFACTS_DIR / 'mood_text_model.pkl',
    'health_risk': ARTIFACTS_DIR / 'health_risk_model.pkl',
    'recommendation': ARTIFACTS_DIR / 'recommendation_model.pkl',
}

TEXT_MODEL_VERSION = 'mood_text_v1.0'
HEALTH_MODEL_VERSION = 'health_risk_v1.0'
RECOMMENDATION_MODEL_VERSION = 'recommendation_v1.0'

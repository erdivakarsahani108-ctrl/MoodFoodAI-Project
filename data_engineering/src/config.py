from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'datasets'
EXPORT_DIR = BASE_DIR / 'exports'
SCHEMA_DIR = BASE_DIR / 'schemas'

COUNTS = {
    'foods': 100000,
    'recipes': 20000,
    'restaurants': 10000,
    'indian_dishes': 5000,
    'international_dishes': 5000,
    'mood_categories': 100,
    'emotional_states': 500,
    'allergies': 1000,
    'diseases': 1000,
    'seasonal_categories': 100,
    'weather_categories': 100,
    'cuisine_categories': 500,
    'users': 10000,
    'recommendations': 1000000,
}

SAMPLE_COUNTS = {
    'foods': 500,
    'recipes': 200,
    'restaurants': 100,
    'users': 200,
    'recommendations': 1000,
}

DATA_DIR.mkdir(parents=True, exist_ok=True)
EXPORT_DIR.mkdir(parents=True, exist_ok=True)
SCHEMA_DIR.mkdir(parents=True, exist_ok=True)

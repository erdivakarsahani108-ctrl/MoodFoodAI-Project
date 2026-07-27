import pandas as pd
from pathlib import Path
from typing import Tuple

from ml.src.config import DATA_DIR


def load_mood_text_dataset() -> pd.DataFrame:
    path = DATA_DIR / 'mood_text.csv'
    return pd.read_csv(path)


def load_health_risk_dataset() -> pd.DataFrame:
    path = DATA_DIR / 'health_risk.csv'
    return pd.read_csv(path)


def load_food_catalog() -> pd.DataFrame:
    path = DATA_DIR / 'food_catalog.csv'
    return pd.read_csv(path)


def load_nutrition_label_samples() -> pd.DataFrame:
    path = DATA_DIR / 'nutrition_labels.csv'
    return pd.read_csv(path)

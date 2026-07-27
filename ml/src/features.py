from pathlib import Path
from typing import Tuple

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler


def build_text_features(corpus: list[str]) -> Tuple[TfidfVectorizer, np.ndarray]:
    vectorizer = TfidfVectorizer(max_features=1000, ngram_range=(1, 2), stop_words='english')
    features = vectorizer.fit_transform(corpus)
    return vectorizer, features


def build_health_features(samples: list[dict]) -> Tuple[StandardScaler, np.ndarray]:
    scaler = StandardScaler()
    numeric = np.array(
        [
            [
                sample.get('age', 0),
                sample.get('bmi', 0.0),
                sample.get('height_cm', 0.0),
                sample.get('weight_kg', 0.0),
            ]
            for sample in samples
        ],
        dtype=float,
    )
    return scaler, scaler.fit_transform(numeric)


def build_recommendation_embeddings(texts: list[str]) -> np.ndarray:
    vectorizer = TfidfVectorizer(max_features=512, stop_words='english')
    return vectorizer.fit_transform(texts).toarray()

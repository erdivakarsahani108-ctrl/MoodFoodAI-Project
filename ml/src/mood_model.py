import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer

from .config import ARTIFACTS_DIR


@dataclass
class MoodTextModel:
    pipeline: Pipeline | None = None
    labels: list[str] | None = None

    def train(self, texts: list[str], labels: list[str]) -> dict[str, Any]:
        self.labels = sorted(set(labels))
        self.pipeline = Pipeline(
            [
                ('vectorizer', TfidfVectorizer(max_features=2000, ngram_range=(1, 2), stop_words='english')),
                ('classifier', LogisticRegression(max_iter=500, solver='liblinear')),
            ]
        )
        x_train, x_test, y_train, y_test = train_test_split(texts, labels, test_size=0.2, random_state=42, stratify=labels)
        self.pipeline.fit(x_train, y_train)
        predictions = self.pipeline.predict(x_test)
        report = classification_report(y_test, predictions, output_dict=True)
        return {
            'train_size': len(x_train),
            'test_size': len(x_test),
            'report': report,
        }

    def predict(self, text: str) -> dict[str, Any]:
        if self.pipeline is None:
            raise ValueError('MoodTextModel has not been trained yet.')
        scores = self.pipeline.predict_proba([text])[0]
        classes = self.pipeline.classes_
        ranking = sorted(zip(classes, scores), key=lambda item: item[1], reverse=True)
        return {
            'mood_label': ranking[0][0],
            'confidence': float(ranking[0][1]),
            'distribution': {cls: float(score) for cls, score in ranking},
        }

    def save(self, model_path: Path) -> None:
        from joblib import dump

        if self.pipeline is None:
            raise ValueError('No model to save.')
        ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
        dump({'pipeline': self.pipeline, 'labels': self.labels}, model_path)

    def load(self, model_path: Path) -> None:
        from joblib import load

        payload = load(model_path)
        self.pipeline = payload['pipeline']
        self.labels = payload['labels']

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline

from .config import ARTIFACTS_DIR


@dataclass
class HealthRiskModel:
    pipeline: Pipeline | None = None
    label_map: dict[str, int] | None = None

    def train(self, features: np.ndarray, labels: list[int]) -> dict[str, Any]:
        self.pipeline = Pipeline(
            [
                ('scaler', StandardScaler()),
                ('classifier', LogisticRegression(max_iter=500, solver='liblinear')),
            ]
        )
        x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.25, random_state=42, stratify=labels)
        self.pipeline.fit(x_train, y_train)
        predictions = self.pipeline.predict(x_test)
        report = classification_report(y_test, predictions, output_dict=True)
        return {
            'train_size': len(x_train),
            'test_size': len(x_test),
            'report': report,
        }

    def predict(self, feature_vector: np.ndarray) -> dict[str, Any]:
        if self.pipeline is None:
            raise ValueError('HealthRiskModel has not been trained yet.')
        score = float(self.pipeline.predict_proba(feature_vector.reshape(1, -1))[0][1])
        label = int(self.pipeline.predict(feature_vector.reshape(1, -1))[0])
        return {'risk_score': score, 'label': label}

    def save(self, model_path: Path) -> None:
        from joblib import dump

        if self.pipeline is None:
            raise ValueError('No model to save.')
        ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
        dump({'pipeline': self.pipeline, 'label_map': self.label_map}, model_path)

    def load(self, model_path: Path) -> None:
        from joblib import load

        payload = load(model_path)
        self.pipeline = payload['pipeline']
        self.label_map = payload['label_map']

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List

import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

from .config import ARTIFACTS_DIR


@dataclass
class RecommendationEngine:
    neighbors: NearestNeighbors | None = None
    embeddings: np.ndarray | None = None
    items: List[Dict[str, Any]] | None = None
    scaler: StandardScaler | None = None

    def fit(self, items: List[Dict[str, Any]], embeddings: np.ndarray) -> None:
        self.items = items
        self.scaler = StandardScaler()
        self.embeddings = self.scaler.fit_transform(embeddings)
        self.neighbors = NearestNeighbors(n_neighbors=min(10, len(items)), metric='cosine')
        self.neighbors.fit(self.embeddings)

    def recommend(self, query_embedding: np.ndarray, top_k: int = 5) -> List[Dict[str, Any]]:
        if self.neighbors is None or self.embeddings is None or self.items is None:
            raise ValueError('RecommendationEngine has not been fitted.')
        emb = self.scaler.transform(query_embedding.reshape(1, -1))
        distances, indices = self.neighbors.kneighbors(emb, n_neighbors=min(top_k, len(self.items)))
        results = []
        for distance, idx in zip(distances[0], indices[0]):
            item = self.items[idx].copy()
            item['score'] = float(1.0 - distance)
            results.append(item)
        return results

    def save(self, model_path: Path) -> None:
        from joblib import dump

        if self.neighbors is None or self.embeddings is None or self.items is None or self.scaler is None:
            raise ValueError('No recommendation model to save.')
        ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
        dump(
            {
                'neighbors': self.neighbors,
                'embeddings': self.embeddings,
                'items': self.items,
                'scaler': self.scaler,
            },
            model_path,
        )

    def load(self, model_path: Path) -> None:
        from joblib import load

        payload = load(model_path)
        self.neighbors = payload['neighbors']
        self.embeddings = payload['embeddings']
        self.items = payload['items']
        self.scaler = payload['scaler']

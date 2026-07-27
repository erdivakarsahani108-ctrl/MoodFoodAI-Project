import json
from pathlib import Path
from typing import Any, Dict, List, Optional, Sequence

import numpy as np
import pandas as pd
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer

from data_engineering.src.config import EXPORT_DIR


def clean_dataframe(df: pd.DataFrame, unique_key: Optional[str] = None, tag_columns: Optional[Sequence[str]] = None) -> pd.DataFrame:
    if unique_key and unique_key in df.columns:
        df = df.drop_duplicates(subset=[unique_key])
    if tag_columns:
        for column in tag_columns:
            if column in df.columns:
                df[column] = df[column].apply(_normalize_tag_field)
    for column in df.columns:
        if tag_columns and column in tag_columns:
            continue
        if df[column].dtype == object or pd.api.types.is_string_dtype(df[column]):
            df[column] = df[column].apply(lambda value: value.strip() if isinstance(value, str) else value)
    return df


def _normalize_tag_field(value: Any) -> Any:
    if value is None:
        return []
    if isinstance(value, str):
        normalized = value.strip()
        if normalized.startswith('[') and normalized.endswith(']'):
            normalized = normalized.replace("'", '"')
            try:
                return json.loads(normalized)
            except Exception:
                return [item.strip() for item in normalized[1:-1].split(',') if item.strip()]
        return [normalized]
    if isinstance(value, list):
        return [str(item).strip() for item in value if item is not None]
    return [str(value)]


def build_combined_text(df: pd.DataFrame, fields: List[str]) -> pd.Series:
    text_fields = [field for field in fields if field in df.columns]
    if not text_fields:
        return pd.Series([''] * len(df), index=df.index)
    combined = df[text_fields].fillna('').astype(str).agg(' '.join, axis=1)
    return combined


def build_text_embeddings(df: pd.DataFrame, fields: List[str], n_components: int = 128) -> np.ndarray:
    combined_text = build_combined_text(df, fields)
    vectorizer = TfidfVectorizer(max_features=2048, stop_words='english')
    matrix = vectorizer.fit_transform(combined_text)
    n_components = min(n_components, matrix.shape[1], matrix.shape[0])
    if n_components <= 0:
        n_components = 1
    decomposer = TruncatedSVD(n_components=n_components, random_state=42)
    embeddings = decomposer.fit_transform(matrix)
    return np.round(embeddings.astype(float), 5)


def export_embeddings(embeddings: np.ndarray, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    np.save(output_path, embeddings)
    return output_path


def build_vector_document(df: pd.DataFrame, embedding_column_name: str = 'embedding_vector') -> pd.DataFrame:
    if embedding_column_name not in df.columns:
        raise ValueError(f'Embedding column {embedding_column_name} not found')
    return df[[col for col in df.columns if col.endswith('_id') or col == embedding_column_name]].copy()


def serialize_vectors(df: pd.DataFrame, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    records = df.to_dict(orient='records')
    with output_path.open('w', encoding='utf-8') as f:
        for record in records:
            record['embedding_vector'] = [float(val) for val in record.get('embedding_vector', [])]
            f.write(json.dumps(record) + '\n')
    return output_path

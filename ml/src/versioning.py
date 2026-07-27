import json
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import Dict, Any

from .config import ARTIFACTS_DIR, MODEL_REGISTRY_FILE


@dataclass
class ModelMetadata:
    name: str
    version: str
    artifact_path: str
    metrics: Dict[str, Any]
    trained_at: str


def _ensure_registry() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    if not MODEL_REGISTRY_FILE.exists():
        MODEL_REGISTRY_FILE.write_text(json.dumps({'models': []}, indent=2))


def register_model(metadata: ModelMetadata) -> None:
    _ensure_registry()
    content = json.loads(MODEL_REGISTRY_FILE.read_text())
    content['models'].append(asdict(metadata))
    MODEL_REGISTRY_FILE.write_text(json.dumps(content, indent=2))


def list_models() -> list[ModelMetadata]:
    _ensure_registry()
    content = json.loads(MODEL_REGISTRY_FILE.read_text())
    return [ModelMetadata(**item) for item in content.get('models', [])]


def latest_model(name: str) -> ModelMetadata | None:
    models = [model for model in list_models() if model.name == name]
    if not models:
        return None
    return sorted(models, key=lambda item: item.trained_at, reverse=True)[0]


def create_metadata(name: str, version: str, artifact_path: Path, metrics: Dict[str, Any]) -> ModelMetadata:
    return ModelMetadata(
        name=name,
        version=version,
        artifact_path=str(artifact_path.resolve()),
        metrics=metrics,
        trained_at=datetime.utcnow().isoformat() + 'Z',
    )

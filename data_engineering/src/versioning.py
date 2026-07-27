import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict


def compute_checksum(file_path: Path) -> str:
    hash_obj = hashlib.sha256()
    with file_path.open('rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            hash_obj.update(chunk)
    return hash_obj.hexdigest()


def build_manifest_entry(file_path: Path) -> Dict[str, str]:
    return {
        'path': str(file_path.name),
        'size_bytes': file_path.stat().st_size,
        'sha256': compute_checksum(file_path),
        'created_at': datetime.fromtimestamp(file_path.stat().st_mtime, tz=timezone.utc).isoformat(),
    }


def create_version_manifest(data_dir: Path, export_dir: Path) -> Path:
    data_dir = Path(data_dir)
    export_dir = Path(export_dir)
    manifest = {
        'version': datetime.now(timezone.utc).strftime('%Y.%m.%d.%H%M%S'),
        'generated_at': datetime.now(timezone.utc).isoformat(),
        'data_dir': str(data_dir),
        'exports_dir': str(export_dir),
        'files': [],
    }
    for path in sorted(data_dir.glob('*')):
        if path.is_file():
            manifest['files'].append(build_manifest_entry(path))
    for path in sorted(export_dir.glob('*')):
        if path.is_file():
            manifest['files'].append(build_manifest_entry(path))
    output_path = export_dir / 'dataset_version_manifest.json'
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open('w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    return output_path

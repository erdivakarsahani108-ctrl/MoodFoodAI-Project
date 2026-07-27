import json
from pathlib import Path
from typing import Any, Dict, List

import numpy as np
import pandas as pd

from data_engineering.src.config import EXPORT_DIR


def _safe_sql_value(value: Any) -> str:
    if value is None:
        return 'NULL'
    if isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return str(value)
    if isinstance(value, (list, dict)):
        payload = json.dumps(value, ensure_ascii=False)
        payload = payload.replace("'", "''")
        return f"'{payload}'::jsonb"
    escaped = str(value).replace("'", "''").replace('\n', ' ').replace('\r', '')
    return f"'{escaped}'"


def export_csv(df: pd.DataFrame, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)
    return output_path


def export_json(df: pd.DataFrame, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    records = df.where(pd.notnull(df), None).to_dict(orient='records')
    with output_path.open('w', encoding='utf-8') as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    return output_path


def export_parquet(df: pd.DataFrame, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(output_path, index=False)
    return output_path


def export_excel(df: pd.DataFrame, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_excel(output_path, index=False)
    return output_path


def export_sql(df: pd.DataFrame, output_path: Path, table_name: str) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open('w', encoding='utf-8') as f:
        f.write('BEGIN;\n')
        for _, row in df.iterrows():
            columns = ', '.join(f'"{col}"' for col in row.index)
            values = ', '.join(_safe_sql_value(row[col]) for col in row.index)
            f.write(f'INSERT INTO "{table_name}" ({columns}) VALUES ({values});\n')
        f.write('COMMIT;\n')
    return output_path


def export_mongo_dump(records: List[Dict[str, Any]], output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open('w', encoding='utf-8') as f:
        for row in records:
            json.dump(row, f, ensure_ascii=False)
            f.write('\n')
    return output_path


def export_elasticsearch_bulk(records: List[Dict[str, Any]], output_path: Path, index_name: str) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open('w', encoding='utf-8') as f:
        for row in records:
            action = {'index': {'_index': index_name, '_id': row.get('id') or row.get('food_id') or row.get('recipe_id') or row.get('restaurant_id') or row.get('user_id') or row.get('record_id')}}
            f.write(json.dumps(action, ensure_ascii=False) + '\n')
            f.write(json.dumps(row, ensure_ascii=False) + '\n')
    return output_path


def export_numpy(array: Any, output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    np.save(output_path, array)
    return output_path


def export_all(data_dir: Path, export_dir: Path) -> None:
    data_dir = Path(data_dir)
    export_dir = Path(export_dir)
    for csv_path in data_dir.glob('*.csv'):
        table_name = csv_path.stem
        df = pd.read_csv(csv_path)
        export_csv(df, export_dir / f'{table_name}.csv')
        export_json(df, export_dir / f'{table_name}.json')
        export_parquet(df, export_dir / f'{table_name}.parquet')
        export_excel(df, export_dir / f'{table_name}.xlsx')
        export_sql(df, export_dir / f'{table_name}.sql', table_name)
        export_mongo_dump(df.where(pd.notnull(df), None).to_dict(orient='records'), export_dir / f'{table_name}_mongo.jsonl')
        export_elasticsearch_bulk(df.where(pd.notnull(df), None).to_dict(orient='records'), export_dir / f'{table_name}_es_bulk.ndjson', index_name=table_name)

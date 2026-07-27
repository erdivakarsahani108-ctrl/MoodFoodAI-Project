import ast
import json
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Type

import pandas as pd
from pydantic import BaseModel, ValidationError

from data_engineering.src.schemas import (
    FoodSchema,
    ImageMetadataSchema,
    RecipeSchema,
    RestaurantSchema,
    RecommendationRecordSchema,
    UserProfileSchema,
)

SCHEMA_MAP = {
    'foods': FoodSchema,
    'recipes': RecipeSchema,
    'restaurants': RestaurantSchema,
    'user_profiles': UserProfileSchema,
    'recommendations': RecommendationRecordSchema,
    'food_images': ImageMetadataSchema,
}


def _parse_value(value: Any) -> Any:
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    if isinstance(value, str):
        stripped = value.strip()
        if stripped == '':
            return None
        if stripped.startswith(('{', '[', '"', "'")):
            try:
                return ast.literal_eval(stripped)
            except (ValueError, SyntaxError):
                try:
                    return json.loads(stripped)
                except json.JSONDecodeError:
                    return stripped
    return value


def _prepare_record(record: Dict[str, Any]) -> Dict[str, Any]:
    return {key: _parse_value(value) for key, value in record.items()}


def validate_records(records: Iterable[Dict[str, Any]], schema_model: Type[BaseModel], max_errors: int = 20) -> Dict[str, Any]:
    valid_count = 0
    errors = []
    checked = 0
    for record in records:
        if checked >= 1000:
            break
        checked += 1
        prepared = _prepare_record(record)
        try:
            schema_model.model_validate(prepared)
            valid_count += 1
        except ValidationError as err:
            errors.append({'record_index': checked, 'errors': err.errors(), 'record': prepared})
            if len(errors) >= max_errors:
                break
    return {
        'valid': len(errors) == 0,
        'checked': checked,
        'errors': len(errors),
        'details': errors,
        'valid_count': valid_count,
    }


def validate_dataframe(df: pd.DataFrame, schema_model: Type[BaseModel]) -> Dict[str, Any]:
    records = df.to_dict(orient='records')
    return validate_records(records, schema_model)


def validate_all(data_dir: Path) -> Dict[str, Any]:
    results = {}
    for file_name, schema_model in SCHEMA_MAP.items():
        file_path = Path(data_dir) / f'{file_name}.csv'
        if file_path.exists():
            df = pd.read_csv(file_path)
            results[file_name] = validate_dataframe(df, schema_model)
        else:
            results[file_name] = {
                'valid': False,
                'checked': 0,
                'errors': 1,
                'details': [{'error': 'missing_file', 'path': str(file_path)}],
            }
    return results

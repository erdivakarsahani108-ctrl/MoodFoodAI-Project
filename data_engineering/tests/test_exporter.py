import pandas as pd
from pathlib import Path
from data_engineering.src.exporter import export_csv, export_json, export_parquet, export_excel, export_sql, export_mongo_dump, export_elasticsearch_bulk


def test_exporter_creates_export_files(tmp_path):
    df = pd.DataFrame([
        {'id': '1', 'name': 'Test Food', 'tags': ['healthy', 'vegan']}
    ])
    csv_path = tmp_path / 'foods.csv'
    json_path = tmp_path / 'foods.json'
    parquet_path = tmp_path / 'foods.parquet'
    excel_path = tmp_path / 'foods.xlsx'
    sql_path = tmp_path / 'foods.sql'
    mongo_path = tmp_path / 'foods_mongo.jsonl'
    es_path = tmp_path / 'foods_es_bulk.ndjson'

    assert export_csv(df, csv_path).exists()
    assert export_json(df, json_path).exists()
    assert export_parquet(df, parquet_path).exists()
    assert export_excel(df, excel_path).exists()
    assert export_sql(df, sql_path, 'foods').exists()
    assert export_mongo_dump(df.to_dict(orient='records'), mongo_path).exists()
    assert export_elasticsearch_bulk(df.to_dict(orient='records'), es_path, 'foods').exists()

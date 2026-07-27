# Data Engineering Module

This module provides data collection, generation, cleaning, transformation, validation, and export pipelines for the AI Mood-Based Food Recommendation System.

## Objectives

- Produce enterprise-quality synthetic datasets when public sources are unavailable.
- Generate structured data for PostgreSQL, MongoDB, Elasticsearch, Redis, and FAISS.
- Create rich dataset exports in CSV, JSON, Parquet, SQL, MongoDB dump, and Excel.
- Support data validation, schema enforcement, deduplication, normalization, and bias control.

## Features

- Synthetic generation of food catalog, recipes, restaurants, users, and recommendation logs.
- Mood and emotion taxonomy generation.
- Image metadata, embeddings, OCR labels, and shelf-ready metadata.
- End-to-end ETL pipeline with cleaning, feature engineering, and data monitoring.
- Dataset versioning and export path management.
- Detailed pipeline documentation in `DATA_PIPELINE.md`.

## Quickstart

Install dependencies:

```bash
pip install -r data_engineering/requirements.txt
```

Generate sample datasets:

```bash
python -m data_engineering.generate
```

Generate full enterprise datasets:

```bash
python -m data_engineering.generate --full
```

Validate generated datasets:

```bash
python -m data_engineering.validate
```

Run module tests:

```bash
pytest data_engineering/tests
```

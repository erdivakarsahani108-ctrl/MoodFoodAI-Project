# Data Engineering Pipeline

This module implements the data engineering and dataset generation pipelines for the AI Mood-Based Food Recommendation System.

## Objective

Produce enterprise-ready synthetic datasets and exports for the platform's recommendation, nutrition, mood detection, and analytics services.

## Components

- `data_engineering/src/generator.py` - Synthesizes foods, recipes, restaurants, user profiles, recommendations, mood taxonomy, and metadata.
- `data_engineering/src/exporter.py` - Exports dataset assets to CSV, JSON, Parquet, Excel, SQL, MongoDB JSONL, and Elasticsearch bulk import formats.
- `data_engineering/src/validator.py` - Validates dataset structure and content against Pydantic schemas.
- `data_engineering/src/etl.py` - Provides cleaning, normalization, and vector embedding helpers for dataset pipelines.
- `data_engineering/src/versioning.py` - Creates dataset manifests and checksum-based version metadata.
- `data_engineering/generate.py` - CLI wrapper for generating sample or full datasets.
- `data_engineering/validate.py` - CLI wrapper for validating generated datasets.

## Output

The module writes dataset files to:

- `data_engineering/datasets/`

Optionally exports formatted files to:

- `data_engineering/exports/`

Generated datasets include:

- Foods
- Recipes
- Restaurants
- User profiles
- Recommendation history
- Food image metadata
- Mood taxonomy and metadata

## Usage

1. Install dependencies:

```bash
pip install -r data_engineering/requirements.txt
```

2. Generate sample data:

```bash
python -m data_engineering.generate
```

3. Generate full datasets:

```bash
python -m data_engineering.generate --full
```

4. Validate datasets:

```bash
python -m data_engineering.validate
```

5. Run tests:

```bash
pytest data_engineering/tests
```

## Design Principles

- Synthetic data is realistic, balanced, and schema-driven.
- The pipeline is modular for ingestion, export, and validation.
- The export layer supports modern data lake and analytics targets.
- Validation and versioning ensure dataset continuity for production data engineering.

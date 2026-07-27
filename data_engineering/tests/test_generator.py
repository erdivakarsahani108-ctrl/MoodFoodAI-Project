from pathlib import Path

import pandas as pd

from data_engineering.src import generator
from data_engineering.src.config import COUNTS


def test_sample_generator_writes_expected_files(tmp_path, monkeypatch):
    monkeypatch.setattr(generator, 'DATA_DIR', tmp_path)
    generator.main(sample=True)

    expected_files = ['foods.csv', 'recipes.csv', 'restaurants.csv', 'user_profiles.csv', 'recommendations.csv', 'mood_taxonomy.json', 'catalog_metadata.json', 'food_images.csv']
    for file_name in expected_files:
        assert (tmp_path / file_name).exists(), f'{file_name} should be generated'

    foods = pd.read_csv(tmp_path / 'foods.csv')
    assert len(foods) == 500
    assert 'food_id' in foods.columns
    assert foods['calories'].min() >= 80

    recommendations = pd.read_csv(tmp_path / 'recommendations.csv')
    assert len(recommendations) == 1000
    assert recommendations['score'].between(0.3, 0.99).all()

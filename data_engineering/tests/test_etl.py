import pandas as pd
from data_engineering.src.etl import build_text_embeddings, clean_dataframe


def test_clean_dataframe_removes_duplicates_and_normalizes_tags():
    df = pd.DataFrame([
        {'food_id': 'food_001', 'category': '  Salads  ', 'diet_options': ['Vegetarian', 'Vegan']},
        {'food_id': 'food_001', 'category': 'Salads', 'diet_options': ['Vegetarian', 'Vegan']},
    ])
    cleaned = clean_dataframe(df, unique_key='food_id', tag_columns=['diet_options'])
    assert len(cleaned) == 1
    assert cleaned.iloc[0]['category'] == 'Salads'
    assert cleaned.iloc[0]['diet_options'] == ['Vegetarian', 'Vegan']


def test_build_text_embeddings_returns_embedding_matrix():
    df = pd.DataFrame([
        {'name': 'Spicy Curry Salad', 'description': 'A flavorful evening meal'},
        {'name': 'Creamy Pasta', 'description': 'Comfort food for dinner'},
    ])
    embeddings = build_text_embeddings(df, ['name', 'description'], n_components=2)
    assert embeddings.shape == (2, 2)

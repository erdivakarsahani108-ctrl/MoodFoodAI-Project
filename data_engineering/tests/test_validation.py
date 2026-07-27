import pandas as pd
from data_engineering.src.validator import validate_dataframe
from data_engineering.src.schemas import FoodSchema


def test_validate_dataframe_with_valid_food_record():
    df = pd.DataFrame([
        {
            'food_id': 'food_000001',
            'name': 'Grilled Salad',
            'cuisine': 'Mediterranean',
            'category': 'Salads',
            'region': 'Karnataka',
            'season': 'Summer',
            'weather': 'Sunny',
            'price_tier': 'medium',
            'calories': 250,
            'protein_g': 12.5,
            'fat_g': 8.0,
            'carbs_g': 28.0,
            'allergens': ['nuts'],
            'diet_options': ['Vegetarian'],
            'mood_tags': ['Energized'],
            'health_score': 75.0,
            'taste_score': 82.5,
            'rating': 4.2,
            'description': 'A fresh salad with grilled vegetables and herbs.',
        }
    ])
    result = validate_dataframe(df, FoodSchema)
    assert result['valid'] is True
    assert result['errors'] == 0
    assert result['checked'] == 1

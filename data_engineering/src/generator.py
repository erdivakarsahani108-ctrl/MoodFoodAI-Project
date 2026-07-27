import json
import random
import string
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List

import numpy as np
import pandas as pd
from faker import Faker

from data_engineering.src.config import COUNTS, DATA_DIR
from data_engineering.src.sources import VOCABULARY

fake = Faker()
random.seed(42)
np.random.seed(42)

PRICE_TIERS = ['low', 'medium', 'high', 'premium']
DIFFICULTY_LEVELS = ['easy', 'intermediate', 'advanced']
ACTIVITY_LEVELS = ['sedentary', 'light', 'moderate', 'active', 'very_active']
GENDERS = ['male', 'female', 'non-binary', 'prefer not to say']
LIFESTYLES = ['active', 'balanced', 'relaxed', 'stressful', 'busy', 'mindful']
GOALS = ['weight_loss', 'muscle_gain', 'heart_health', 'diabetes_management', 'wellness', 'energy']
STATUSES = ['served', 'skipped', 'bookmarked', 'recommended']
VIEW_TYPES = [
    'front_view', 'top_view', 'side_view', 'restaurant_style', 'packaging',
    'healthy_version', 'premium_version', 'street_food_version', 'indian_version', 'international_version',
]
IMAGE_STYLES = ['natural', 'studio', 'street', 'plated', 'packaged', 'action', 'flatlay']


def _slug(value: str) -> str:
    return ''.join(ch for ch in value.lower().replace(' ', '_') if ch.isalnum() or ch == '_')


def _choose_tags(source: Iterable[str], count: int = 2) -> List[str]:
    return random.sample(list(source), min(count, len(source)))


def _nutrition_summary() -> Dict[str, float]:
    calories = random.randint(80, 850)
    protein = round(random.uniform(2, 40), 1)
    fat = round(random.uniform(0.5, 35), 1)
    carbs = round(max(0.0, calories - (protein * 4 + fat * 9)) / 4, 1)
    return {
        'calories': calories,
        'protein_g': protein,
        'fat_g': fat,
        'carbs_g': carbs,
    }


def _health_taste_scores() -> Dict[str, float]:
    taste_score = round(random.uniform(55, 98), 1)
    health_score = round(random.uniform(45, 98), 1)
    mood_score = round((taste_score + health_score) / 2.0, 1)
    return {'taste_score': taste_score, 'health_score': health_score, 'mood_score': mood_score}


def _generate_image_metadata(food_id: str, food_name: str) -> List[Dict[str, Any]]:
    metadata = []
    for view in VIEW_TYPES:
        caption = f"{food_name} in {view.replace('_', ' ')} style"
        metadata.append({
            'image_id': f"img_{food_id}_{view}",
            'food_id': food_id,
            'view_type': view,
            'style': random.choice(IMAGE_STYLES),
            'caption': caption,
            'embedding_vector': np.round(np.random.rand(128).astype(float), 5).tolist(),
            'thumbnail_path': f"images/{food_id}/{view}.jpg",
        })
    return metadata


def generate_mood_and_emotion_taxonomy() -> Dict[str, Any]:
    mood_categories = VOCABULARY.mood_categories.copy()
    emotion_states = VOCABULARY.emotions.copy()
    mapping = {
        mood: _choose_tags(emotion_states, count=4)
        for mood in mood_categories
    }
    return {
        'mood_categories': mood_categories,
        'emotion_states': emotion_states,
        'mood_emotion_map': mapping,
    }


def generate_allergy_catalog() -> List[Dict[str, Any]]:
    return [{'allergy_id': f'allergy_{i+1:04d}', 'name': name} for i, name in enumerate(VOCABULARY.allergens)]


def generate_disease_catalog() -> List[Dict[str, Any]]:
    return [{'disease_id': f'disease_{i+1:04d}', 'name': name, 'category': random.choice(['metabolic', 'cardiovascular', 'digestive', 'endocrine', 'immune'])} for i, name in enumerate(VOCABULARY.diseases)]


def generate_cuisine_catalog() -> List[Dict[str, Any]]:
    return [{'cuisine_id': f'cuisine_{i+1:04d}', 'name': name} for i, name in enumerate(VOCABULARY.cuisines)]


def generate_seasonal_and_weather_catalog() -> Dict[str, List[Dict[str, Any]]]:
    seasons = [{'season_id': f'season_{i+1:03d}', 'name': name} for i, name in enumerate(VOCABULARY.seasonal_tags)]
    weather = [{'weather_id': f'weather_{i+1:03d}', 'name': name} for i, name in enumerate(VOCABULARY.weather_tags)]
    return {'seasons': seasons, 'weather': weather}


def generate_food_catalog(count: int) -> pd.DataFrame:
    rows = []
    image_rows = []
    for idx in range(1, count + 1):
        cuisine = random.choice(VOCABULARY.cuisines)
        category = random.choice(VOCABULARY.food_categories)
        region = random.choice(VOCABULARY.regions)
        season = random.choice(VOCABULARY.seasonal_tags)
        weather = random.choice(VOCABULARY.weather_tags)
        name = f"{random.choice(['Spiced', 'Herbed', 'Grilled', 'Smoked', 'Roasted', 'Citrus', 'Creamy', 'Fresh', 'Zesty', 'Golden'])} {random.choice(VOCABULARY.food_categories)}"
        if idx % 7 == 0:
            name = f"{random.choice(['Masala', 'Paneer', 'Tandoori', 'Sambar', 'Idli', 'Chutney', 'Biryani'])} {random.choice(['Bowl', 'Wrap', 'Salad', 'Platter'])}"
        nutrition = _nutrition_summary()
        scores = _health_taste_scores()
        allergens = _choose_tags(VOCABULARY.allergens, count=random.randint(0, 3))
        diet_options = _choose_tags(VOCABULARY.diet_options, count=random.randint(1, 3))
        mood_tags = _choose_tags(VOCABULARY.mood_categories, count=3)
        price_tier = random.choice(PRICE_TIERS)
        food_id = f'food_{idx:06d}'
        food_name = name if len(name) < 45 else name[:44]

        row = {
            'food_id': food_id,
            'name': food_name,
            'cuisine': cuisine,
            'category': category,
            'region': region,
            'season': season,
            'weather': weather,
            'price_tier': price_tier,
            'calories': nutrition['calories'],
            'protein_g': nutrition['protein_g'],
            'fat_g': nutrition['fat_g'],
            'carbs_g': nutrition['carbs_g'],
            'allergens': allergens,
            'diet_options': diet_options,
            'mood_tags': mood_tags,
            'health_score': scores['health_score'],
            'taste_score': scores['taste_score'],
            'rating': round(random.uniform(3.0, 5.0), 1),
            'description': fake.sentence(nb_words=14),
        }
        rows.append(row)
        image_rows.extend(_generate_image_metadata(food_id, food_name))
    df = pd.DataFrame(rows)
    df_images = pd.DataFrame(image_rows)
    df_images.to_csv(DATA_DIR / 'food_images.csv', index=False)
    return df


def generate_recipe_catalog(food_df: pd.DataFrame, count: int) -> pd.DataFrame:
    rows = []
    food_ids = food_df['food_id'].tolist()
    for idx in range(1, count + 1):
        food_id = random.choice(food_ids)
        cuisine = food_df.loc[food_df['food_id'] == food_id, 'cuisine'].iloc[0]
        region = food_df.loc[food_df['food_id'] == food_id, 'region'].iloc[0]
        name = f"{fake.word().capitalize()} {random.choice(['Stew', 'Salad', 'Bowl', 'Curry', 'Grill', 'Tandoori', 'Wrap'])}"
        nutrition = _nutrition_summary()
        scores = _health_taste_scores()
        ingredient_count = random.randint(5, 12)
        ingredients = [random.choice(VOCABULARY.ingredients) for _ in range(ingredient_count)]
        steps = [fake.sentence(nb_words=12) for _ in range(random.randint(4, 8))]
        vitamins = {vit: round(random.uniform(0.1, 3.5), 2) for vit in ['Vitamin A', 'Vitamin B6', 'Vitamin C', 'Vitamin D', 'Vitamin E']}
        minerals = {mineral: round(random.uniform(0.1, 2.3), 2) for mineral in ['Iron', 'Calcium', 'Magnesium', 'Potassium', 'Zinc']}
        row = {
            'recipe_id': f'recipe_{idx:06d}',
            'name': name,
            'food_id': food_id,
            'cuisine': cuisine,
            'region': region,
            'difficulty': random.choice(DIFFICULTY_LEVELS),
            'cooking_time_minutes': random.randint(10, 120),
            'servings': random.randint(1, 6),
            'calories': nutrition['calories'],
            'protein_g': nutrition['protein_g'],
            'fat_g': nutrition['fat_g'],
            'carbs_g': nutrition['carbs_g'],
            'vitamins': vitamins,
            'minerals': minerals,
            'ingredients': ingredients,
            'steps': steps,
            'mood_score': scores['mood_score'],
            'health_score': scores['health_score'],
            'taste_score': scores['taste_score'],
            'ai_nutrition_score': round((scores['health_score'] + scores['taste_score']) / 2.0, 1),
            'dietary_tags': _choose_tags(VOCABULARY.diet_options, count=random.randint(1, 3)),
            'season': random.choice(VOCABULARY.seasonal_tags),
            'budget_level': random.choice(PRICE_TIERS),
        }
        rows.append(row)
    return pd.DataFrame(rows)


def generate_restaurant_catalog(food_df: pd.DataFrame, count: int) -> pd.DataFrame:
    rows = []
    food_ids = food_df['food_id'].tolist()
    for idx in range(1, count + 1):
        name = f"{fake.last_name()} {random.choice(['Kitchen', 'Bistro', 'Cafe', 'Tavern', 'House', 'Grill', 'Corner'])}"
        cuisine_choices = _choose_tags(VOCABULARY.cuisines, count=random.randint(1, 3))
        location_city = fake.city()
        location_area = fake.street_name()
        price_level = random.choice(['$', '$$', '$$$', '$$$$'])
        row = {
            'restaurant_id': f'restaurant_{idx:05d}',
            'name': name,
            'cuisines': cuisine_choices,
            'location_city': location_city,
            'location_area': location_area,
            'latitude': round(random.uniform(-90.0, 90.0), 6),
            'longitude': round(random.uniform(-180.0, 180.0), 6),
            'opening_hours': f"{random.randint(6, 11)}:00 - {random.randint(20, 23)}:00",
            'rating': round(random.uniform(3.0, 5.0), 1),
            'delivery_time_minutes': random.randint(20, 65),
            'price_level': price_level,
            'offers': _choose_tags(['10% off', 'Free delivery', 'Combo discount', 'Happy hours', 'Weekend special'], count=2),
            'cuisine': cuisine_choices[0],
            'diet_options': _choose_tags(VOCABULARY.diet_options, count=2),
            'healthy_menu_tags': _choose_tags(['low calorie', 'protein rich', 'low sugar', 'heart healthy', 'gluten free'], count=2),
            'mood_menu_tags': _choose_tags(VOCABULARY.mood_categories, count=2),
            'menu_item_ids': random.sample(food_ids, k=5),
        }
        rows.append(row)
    return pd.DataFrame(rows)


def generate_user_profiles(count: int) -> pd.DataFrame:
    rows = []
    for idx in range(1, count + 1):
        height = random.randint(145, 195)
        weight = random.uniform(45.0, 120.0)
        bmi = round(weight / ((height / 100) ** 2), 1)
        bmr = round(10 * weight + 6.25 * height - 5 * random.randint(18, 65) + (5 if random.choice(['male', 'female']) == 'male' else -161), 1)
        diet_preferences = _choose_tags(VOCABULARY.diet_options, count=random.randint(1, 3))
        medical_conditions = _choose_tags(VOCABULARY.diseases, count=random.randint(0, 2))
        row = {
            'user_id': f'user_{idx:05d}',
            'name': fake.name(),
            'email': fake.unique.email(),
            'age': random.randint(18, 70),
            'gender': random.choice(GENDERS),
            'bmi': bmi,
            'bmr': bmr,
            'height_cm': height,
            'weight_kg': round(weight, 1),
            'activity_level': random.choice(ACTIVITY_LEVELS),
            'lifestyle': random.choice(LIFESTYLES),
            'diet_preferences': diet_preferences,
            'medical_conditions': medical_conditions,
            'allergies': _choose_tags(VOCABULARY.allergens, count=random.randint(0, 3)),
            'moods': _choose_tags(VOCABULARY.mood_categories, count=3),
            'preferred_cuisines': _choose_tags(VOCABULARY.cuisines, count=3),
            'budget_level': random.choice(PRICE_TIERS),
            'region': random.choice(VOCABULARY.regions),
            'goals': _choose_tags(GOALS, count=2),
        }
        rows.append(row)
    return pd.DataFrame(rows)


def generate_recommendation_records(user_df: pd.DataFrame, food_df: pd.DataFrame, recipe_df: pd.DataFrame, restaurant_df: pd.DataFrame, count: int) -> pd.DataFrame:
    rows = []
    user_ids = user_df['user_id'].tolist()
    food_ids = food_df['food_id'].tolist()
    recipe_ids = recipe_df['recipe_id'].tolist()
    restaurant_ids = restaurant_df['restaurant_id'].tolist()
    for idx in range(1, count + 1):
        user_id = random.choice(user_ids)
        food_id = random.choice(food_ids)
        recipe_id = random.choice(recipe_ids) if random.random() > 0.4 else None
        restaurant_id = random.choice(restaurant_ids) if random.random() > 0.5 else None
        row = {
            'record_id': f'rec_{idx:07d}',
            'user_id': user_id,
            'food_id': food_id,
            'recipe_id': recipe_id,
            'restaurant_id': restaurant_id,
            'mood': random.choice(VOCABULARY.mood_categories),
            'emotion': random.choice(VOCABULARY.emotions),
            'weather': random.choice(VOCABULARY.weather_tags),
            'season': random.choice(VOCABULARY.seasonal_tags),
            'disease_context': random.choice(VOCABULARY.diseases) if random.random() < 0.2 else None,
            'calorie_target': float(random.randint(1400, 2600)),
            'recommended_at': datetime.now(timezone.utc).isoformat(),
            'score': round(random.uniform(0.3, 0.99), 3),
            'reason': fake.sentence(nb_words=12),
            'status': random.choice(STATUSES),
        }
        rows.append(row)
    return pd.DataFrame(rows)


def main(sample: bool = True) -> None:
    counts = {**COUNTS}
    if sample:
        counts.update({key: min(value, 200) for key, value in COUNTS.items() if key in ['users', 'restaurants']})
        counts['foods'] = 500
        counts['recipes'] = 200
        counts['recommendations'] = 1000
    food_df = generate_food_catalog(counts['foods'])
    food_df.to_csv(DATA_DIR / 'foods.csv', index=False)
    recipe_df = generate_recipe_catalog(food_df, counts['recipes'])
    recipe_df.to_csv(DATA_DIR / 'recipes.csv', index=False)
    restaurant_df = generate_restaurant_catalog(food_df, counts['restaurants'])
    restaurant_df.to_csv(DATA_DIR / 'restaurants.csv', index=False)
    user_df = generate_user_profiles(counts['users'])
    user_df.to_csv(DATA_DIR / 'user_profiles.csv', index=False)
    recommendation_df = generate_recommendation_records(user_df, food_df, recipe_df, restaurant_df, counts['recommendations'])
    recommendation_df.to_csv(DATA_DIR / 'recommendations.csv', index=False)
    taxonomy = generate_mood_and_emotion_taxonomy()
    with open(DATA_DIR / 'mood_taxonomy.json', 'w', encoding='utf-8') as f:
        json.dump(taxonomy, f, indent=2)
    with open(DATA_DIR / 'catalog_metadata.json', 'w', encoding='utf-8') as f:
        json.dump({'generated_at': datetime.now(timezone.utc).isoformat(), 'counts': counts}, f, indent=2)


if __name__ == '__main__':
    main(sample=True)

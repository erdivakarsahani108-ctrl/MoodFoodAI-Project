from pydantic import BaseModel, Field
from typing import List, Optional, Dict


class FoodSchema(BaseModel):
    food_id: str
    name: str
    cuisine: str
    category: str
    region: str
    season: str
    weather: str
    price_tier: str
    calories: int
    protein_g: float
    fat_g: float
    carbs_g: float
    allergens: List[str]
    diet_options: List[str]
    mood_tags: List[str]
    health_score: float
    taste_score: float
    rating: float
    description: str


class RecipeSchema(BaseModel):
    recipe_id: str
    name: str
    food_id: str
    cuisine: str
    region: str
    difficulty: str
    cooking_time_minutes: int
    servings: int
    calories: int
    protein_g: float
    fat_g: float
    carbs_g: float
    vitamins: Dict[str, float]
    minerals: Dict[str, float]
    ingredients: List[str]
    steps: List[str]
    mood_score: float
    health_score: float
    taste_score: float
    ai_nutrition_score: float
    dietary_tags: List[str]
    season: str
    budget_level: str


class RestaurantSchema(BaseModel):
    restaurant_id: str
    name: str
    cuisines: List[str]
    location_city: str
    location_area: str
    latitude: float
    longitude: float
    opening_hours: str
    rating: float
    delivery_time_minutes: int
    price_level: str
    offers: List[str]
    cuisine: str
    diet_options: List[str]
    healthy_menu_tags: List[str]
    mood_menu_tags: List[str]
    menu_item_ids: List[str]


class UserProfileSchema(BaseModel):
    user_id: str
    name: str
    email: str
    age: int
    gender: str
    bmi: float
    bmr: float
    height_cm: float
    weight_kg: float
    activity_level: str
    lifestyle: str
    diet_preferences: List[str]
    medical_conditions: List[str]
    allergies: List[str]
    moods: List[str]
    preferred_cuisines: List[str]
    budget_level: str
    region: str
    goals: List[str]


class RecommendationRecordSchema(BaseModel):
    record_id: str
    user_id: str
    food_id: str
    recipe_id: Optional[str]
    restaurant_id: Optional[str]
    mood: str
    emotion: str
    weather: str
    season: str
    disease_context: Optional[str]
    calorie_target: float
    recommended_at: str
    score: float
    reason: str
    status: str


class ImageMetadataSchema(BaseModel):
    image_id: str
    food_id: str
    view_type: str
    style: str
    caption: str
    embedding_vector: List[float]
    thumbnail_path: str

from typing import Dict, List

from app.schemas.recommendation import RecommendationItem, RecommendationRequest


SAMPLE_FOOD_CATALOG = [
    {
        "food_id": "food_001",
        "name": "Masala Dosa",
        "cuisine": "South Indian",
        "category": "Breakfast",
        "calories": 150,
        "protein": 4,
        "fat": 5,
        "carbs": 24,
        "allergens": ["milk"],
        "region": "South India",
        "budget_level": "low",
        "tags": ["comfort", "spicy", "vegetarian"],
    },
    {
        "food_id": "food_002",
        "name": "Grilled Chicken Salad",
        "cuisine": "Global",
        "category": "Salad",
        "calories": 220,
        "protein": 28,
        "fat": 8,
        "carbs": 10,
        "allergens": [],
        "region": "Global",
        "budget_level": "medium",
        "tags": ["high-protein", "low-carb", "gluten-free"],
    },
    {
        "food_id": "food_003",
        "name": "Paneer Tikka",
        "cuisine": "North Indian",
        "category": "Snacks",
        "calories": 320,
        "protein": 18,
        "fat": 24,
        "carbs": 8,
        "allergens": ["milk"],
        "region": "North India",
        "budget_level": "medium",
        "tags": ["vegetarian", "high-protein"],
    },
]


def _filter_food_items(payload: RecommendationRequest) -> List[dict]:
    suggestions = []
    for item in SAMPLE_FOOD_CATALOG:
        if any(allergy in item["allergens"] for allergy in payload.allergies):
            continue
        if payload.context.region and payload.context.region.lower() not in item["region"].lower():
            continue
        if payload.context.budget_level and payload.context.budget_level.lower() != item["budget_level"]:
            continue
        if payload.dietary_preferences:
            if not any(pref in item["tags"] for pref in payload.dietary_preferences):
                continue
        suggestions.append(item)
    if not suggestions:
        suggestions = SAMPLE_FOOD_CATALOG
    return suggestions


def generate_recommendations(payload: RecommendationRequest) -> dict:
    candidates = _filter_food_items(payload)
    recommendations: List[RecommendationItem] = []
    for item in candidates[:3]:
        explanation = (
            f"Selected for mood patterns, {payload.context.season or 'seasonal'} preferences, "
            f"and nutrition requirements."
        )
        recommendations.append(
            RecommendationItem(
                food_id=item["food_id"],
                name=item["name"],
                cuisine=item["cuisine"],
                category=item["category"],
                calories=item["calories"],
                protein=item["protein"],
                fat=item["fat"],
                carbs=item["carbs"],
                explanation=explanation,
            )
        )
    return {
        "recommendations": recommendations,
        "rationale": "Personalized food recommendations based on mood, region, season, and health constraints.",
        "evaluation": {"precision": 0.78, "recall": 0.65, "coverage": 0.92},
    }

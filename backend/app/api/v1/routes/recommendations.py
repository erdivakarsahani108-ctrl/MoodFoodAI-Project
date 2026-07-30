from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from datetime import datetime
import uuid

from ..dependencies import get_current_user
from ...models.food import Food as FoodModel  # hypothetical, but we'll use local dict

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

# In-memory data store (for demo)
FOODS_DB = [
    {
        "id": "1",
        "name": "Avocado Toast",
        "category": "Breakfast",
        "calories": 250,
        "protein": 8.0,
        "carbs": 20.0,
        "fat": 15.0,
        "fiber": 7.0,
        "moodTag": "Happy"
    },
    {
        "id": "2",
        "name": "Quinoa Bowl",
        "category": "Lunch",
        "calories": 320,
        "protein": 14.0,
        "carbs": 45.0,
        "fat": 8.0,
        "fiber": 8.0,
        "moodTag": "Energetic"
    },
    {
        "id": "3",
        "name": "Veggie Burger",
        "category": "Dinner",
        "calories": 380,
        "protein": 20.0,
        "carbs": 35.0,
        "fat": 18.0,
        "fiber": 6.0,
        "moodTag": "Satisfied"
    },
    {
        "id": "4",
        "name": "Fruit Smoothie",
        "category": "Drinks",
        "calories": 180,
        "protein": 5.0,
        "carbs": 30.0,
        "fat": 2.0,
        "fiber": 4.0,
        "moodTag": "Refreshed"
    },
    {
        "id": "5",
        "name": "Lentil Soup",
        "category": "Dinner",
        "calories": 210,
        "protein": 12.0,
        "carbs": 28.0,
        "fat": 3.0,
        "fiber": 10.0,
        "moodTag": "Comforted"
    },
    {
        "id": "6",
        "name": "Oatmeal",
        "category": "Breakfast",
        "calories": 150,
        "protein": 6.0,
        "carbs": 27.0,
        "fat": 3.0,
        "fiber": 4.0,
        "moodTag": "Calm"
    }
]

# Response models
class RecommendationResponse(BaseModel):
    id: str
    name: str
    calories: int
    protein: float
    carbs: float
    fiber: float
    moodTag: str
    reason: str

class RecommendationListResponse(BaseModel):
    success: bool
    data: List[RecommendationResponse]
    message: Optional[str] = None

@router.get("/", response_model=RecommendationListResponse)
async def get_recommendations(
    mood: Optional[str] = None,
    limit: int = Query(5, ge=1, le=20),
    current_user: dict = Depends(get_current_user)
):
    """
    Get AI-powered food recommendations based on mood.
    - **mood**: Filter by mood tag (e.g., Happy, Energetic)
    - **limit**: Number of recommendations to return (1-20)
    """
    items = FOODS_DB.copy()
    if mood:
        items = [f for f in items if f["moodTag"].lower() == mood.lower()]
    # Limit results and add a reason for each
    recommendations = []
    for food in items[:limit]:
        reason = f"Recommended for your {food['moodTag']} mood"
        # If no mood filter, provide a generic reason
        if not mood:
            reason = "Personalized recommendation based on your profile"
        recommendations.append(RecommendationResponse(
            id=food["id"],
            name=food["name"],
            calories=food["calories"],
            protein=food["protein"],
            carbs=food["carbs"],
            fiber=food["fiber"],
            moodTag=food["moodTag"],
            reason=reason
        ))
    return RecommendationListResponse(
        success=True,
        data=recommendations,
        message=f"Found {len(recommendations)} recommendations"
    )
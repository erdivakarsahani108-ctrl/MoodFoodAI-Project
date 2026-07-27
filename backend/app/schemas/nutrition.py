from pydantic import BaseModel
from typing import Dict, Optional


class NutritionAnalysisRequest(BaseModel):
    height_cm: float
    weight_kg: float
    age: int
    gender: str
    activity_level: str
    daily_meals: Optional[int] = 3


class NutritionAnalysisResponse(BaseModel):
    bmi: float
    bmr: float
    daily_calories: float
    macros: Dict[str, float]
    recommendation: str

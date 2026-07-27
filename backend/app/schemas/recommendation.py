from pydantic import BaseModel, Field
from typing import Dict, List, Optional


class RecommendationContext(BaseModel):
    weather: Optional[str]
    season: Optional[str]
    budget_level: Optional[str]
    region: Optional[str]
    target_goal: Optional[str]


class RecommendationItem(BaseModel):
    food_id: str
    name: str
    cuisine: str
    category: str
    calories: float
    protein: float
    fat: float
    carbs: float
    explanation: str


class RecommendationRequest(BaseModel):
    mood_signals: Dict[str, float]
    context: RecommendationContext
    dietary_preferences: List[str] = Field(default_factory=list)
    allergies: List[str] = Field(default_factory=list)
    medical_conditions: List[str] = Field(default_factory=list)


class RecommendationResponse(BaseModel):
    recommendations: List[RecommendationItem]
    rationale: str
    evaluation: Dict[str, float]

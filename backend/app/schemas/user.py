from pydantic import BaseModel, Field
from typing import Dict, List, Optional


class HealthMetrics(BaseModel):
    age: Optional[int]
    gender: Optional[str]
    height_cm: Optional[float]
    weight_kg: Optional[float]
    activity_level: Optional[str]
    bmi: Optional[float]
    bmr: Optional[float]


class UserPreferences(BaseModel):
    dietary_preferences: List[str] = Field(default_factory=list)
    medical_conditions: List[str] = Field(default_factory=list)
    allergies: List[str] = Field(default_factory=list)
    budget_level: Optional[str]
    region: Optional[str]


class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    preferred_language: str = "en"


class UserUpdate(BaseModel):
    full_name: Optional[str]
    preferred_language: Optional[str]
    health_metrics: Optional[HealthMetrics]
    preferences: Optional[UserPreferences]


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    preferred_language: str
    is_active: bool
    is_verified: bool
    roles: List[str]
    health_metrics: Optional[HealthMetrics]
    preferences: Optional[UserPreferences]

    class Config:
        orm_mode = True

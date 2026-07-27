from pydantic import BaseModel, Field
from typing import Dict, List, Optional


class HealthCheckResponse(BaseModel):
    status: str
    services: Dict[str, str]


class HealthRiskRequest(BaseModel):
    age: int
    gender: str
    bmi: float
    family_history: List[str] = Field(default_factory=list)
    lifestyle: Dict[str, str]
    medical_conditions: Optional[List[str]] = Field(default_factory=list)


class HealthRiskPrediction(BaseModel):
    condition: str
    risk_score: float
    recommendation: str


class HealthRiskResponse(BaseModel):
    risks: List[HealthRiskPrediction]
    overall_score: float
    advice: str

from pydantic import BaseModel
from typing import Dict, List


class AnalyticsMetricsResponse(BaseModel):
    active_users: int
    daily_recommendations: int
    recommendation_ctr: float
    model_accuracy: float
    engagement_score: float
    warnings: List[str] = []


class AIInsightsResponse(BaseModel):
    model_versions: List[str]
    recent_predictions: List[Dict[str, str]]
    fairness_metrics: Dict[str, float]
    latency_ms: float

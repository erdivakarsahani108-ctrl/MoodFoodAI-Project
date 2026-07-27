from fastapi import APIRouter, Depends
from app.core.dependencies import get_admin_user
from app.schemas.admin import AnalyticsMetricsResponse, AIInsightsResponse

router = APIRouter()

@router.get("/analytics", response_model=AnalyticsMetricsResponse)
def read_analytics(current_admin=Depends(get_admin_user)):
    return AnalyticsMetricsResponse(
        active_users=1250,
        daily_recommendations=4320,
        recommendation_ctr=0.42,
        model_accuracy=0.89,
        engagement_score=0.78,
        warnings=["Review anomaly detection alerts in the AI insights page."],
    )

@router.get("/ai-insights", response_model=AIInsightsResponse)
def read_ai_insights(current_admin=Depends(get_admin_user)):
    return AIInsightsResponse(
        model_versions=["recommendation_v1.2", "mood_v0.9"],
        recent_predictions=[{"id": "pred_001", "status": "accepted"}],
        fairness_metrics={"gender_balance": 0.94, "region_balance": 0.91},
        latency_ms=230.0,
    )

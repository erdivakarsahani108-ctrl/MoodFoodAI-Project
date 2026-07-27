from fastapi import APIRouter, Depends
from app.core.dependencies import get_active_user
from app.schemas.recommendation import RecommendationRequest, RecommendationResponse
from app.services.recommendation_service import generate_recommendations

router = APIRouter()

@router.post("/", response_model=RecommendationResponse)
def recommend(payload: RecommendationRequest, current_user=Depends(get_active_user)):
    response = generate_recommendations(payload)
    return RecommendationResponse(**response)

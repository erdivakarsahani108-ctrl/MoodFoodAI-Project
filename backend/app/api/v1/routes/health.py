from fastapi import APIRouter
from app.schemas.health import HealthCheckResponse, HealthRiskRequest, HealthRiskResponse
from app.services.health_service import predict_health_risks

router = APIRouter()

@router.get("/check", response_model=HealthCheckResponse)
def health_check():
    return HealthCheckResponse(status="ok", services={"database": "pending", "ai": "pending"})

@router.post("/risk", response_model=HealthRiskResponse)
def health_risk(payload: HealthRiskRequest):
    result = predict_health_risks(
        payload.age,
        payload.gender,
        payload.bmi,
        payload.family_history,
        payload.lifestyle,
        payload.medical_conditions or [],
    )
    return HealthRiskResponse(**result)

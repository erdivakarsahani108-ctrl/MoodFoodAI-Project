from fastapi import APIRouter
from app.schemas.nutrition import NutritionAnalysisRequest, NutritionAnalysisResponse
from app.services.nutrition_service import calculate_bmi, calculate_bmr, calculate_daily_calories, calculate_macros

router = APIRouter()

@router.post("/analysis", response_model=NutritionAnalysisResponse)
def analyze_nutrition(payload: NutritionAnalysisRequest):
    bmi = calculate_bmi(payload.weight_kg, payload.height_cm)
    bmr = calculate_bmr(payload.weight_kg, payload.height_cm, payload.age, payload.gender)
    daily_calories = calculate_daily_calories(bmr, payload.activity_level)
    macros = calculate_macros(daily_calories)
    recommendation = (
        "Consume a balanced diet with an emphasis on lean protein and complex carbohydrates while staying hydrated."
    )
    return NutritionAnalysisResponse(
        bmi=bmi,
        bmr=bmr,
        daily_calories=daily_calories,
        macros=macros,
        recommendation=recommendation,
    )

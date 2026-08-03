from typing import Any, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_active_user, get_db
from app.schemas.user import HealthMetrics, UserPreferences, UserResponse, UserUpdate
from app.services.user_service import update_user_profile

router = APIRouter()


def _to_health_metrics(profile: Any) -> Optional[HealthMetrics]:
    if profile is None:
        return None
    return HealthMetrics(
        age=profile.age,
        gender=profile.gender,
        height_cm=profile.height_cm,
        weight_kg=profile.weight_kg,
        activity_level=profile.activity_level,
        bmi=profile.bmi,
        bmr=profile.bmr,
    )


def _to_preferences(profile: Any) -> Optional[UserPreferences]:
    if profile is None:
        return None
    return UserPreferences(
        dietary_preferences=list(profile.dietary_preferences or []),
        medical_conditions=list(profile.medical_conditions or []),
        allergies=list(profile.allergies or []),
        budget_level=profile.budget_level,
        region=profile.region,
    )


@router.get("/me", response_model=UserResponse)
def read_current_user(current_user=Depends(get_active_user)):
    profile = getattr(current_user, "profile", None)
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        preferred_language=current_user.preferred_language,
        is_active=current_user.is_active,
        is_verified=current_user.is_verified,
        roles=current_user.roles or ["user"],
        health_metrics=_to_health_metrics(profile),
        preferences=_to_preferences(profile),
    )


@router.patch("/me", response_model=UserResponse)
def update_profile(payload: UserUpdate, db: Session = Depends(get_db), current_user=Depends(get_active_user)):
    user = update_user_profile(db, current_user, payload)
    profile = getattr(user, "profile", None)
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        preferred_language=user.preferred_language,
        is_active=user.is_active,
        is_verified=user.is_verified,
        roles=user.roles or ["user"],
        health_metrics=_to_health_metrics(profile),
        preferences=_to_preferences(profile),
    )

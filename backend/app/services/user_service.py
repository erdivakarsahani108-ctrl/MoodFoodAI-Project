from sqlalchemy.orm import Session
from typing import Optional

from app.db.models import User, UserProfile
from app.schemas.user import UserUpdate


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def update_user_profile(db: Session, user: User, payload: UserUpdate) -> User:
    if payload.full_name is not None:
        user.full_name = payload.full_name
    if payload.preferred_language is not None:
        user.preferred_language = payload.preferred_language
    if payload.health_metrics is not None:
        profile = user.profile or UserProfile(user_id=user.id)
        profile.age = payload.health_metrics.age
        profile.gender = payload.health_metrics.gender
        profile.height_cm = payload.health_metrics.height_cm
        profile.weight_kg = payload.health_metrics.weight_kg
        profile.activity_level = payload.health_metrics.activity_level
        profile.bmi = payload.health_metrics.bmi
        profile.bmr = payload.health_metrics.bmr
        db.add(profile)
        user.profile = profile
    if payload.preferences is not None:
        profile = user.profile or UserProfile(user_id=user.id)
        profile.dietary_preferences = payload.preferences.dietary_preferences
        profile.medical_conditions = payload.preferences.medical_conditions
        profile.allergies = payload.preferences.allergies
        profile.budget_level = payload.preferences.budget_level
        profile.region = payload.preferences.region
        db.add(profile)
        user.profile = profile
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_active_user, get_db
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import update_user_profile

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def read_current_user(current_user=Depends(get_active_user)):
    return current_user

@router.patch("/me", response_model=UserResponse)
def update_profile(payload: UserUpdate, db: Session = Depends(get_db), current_user=Depends(get_active_user)):
    user = update_user_profile(db, current_user, payload)
    return user

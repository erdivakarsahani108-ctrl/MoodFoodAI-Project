from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.db.models import User
from app.schemas.auth import TokenResponse, UserLoginRequest, UserRegisterRequest
from app.services.auth_service import authenticate_user, create_tokens, create_user
from app.services.user_service import get_user_by_email

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(payload: UserRegisterRequest, db: Session = Depends(get_db)):
    if get_user_by_email(db, payload.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    user = create_user(db, payload.email, payload.password, payload.full_name, payload.preferred_language)
    return {"user_id": user.id, "verification_required": True}

@router.post("/login", response_model=TokenResponse)
def login_user(payload: UserLoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token_data = create_tokens(user)
    return TokenResponse(**token_data)

@router.post("/verify-email", status_code=status.HTTP_200_OK)
def verify_email(user_id: int, otp_code: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_verified = True
    db.add(user)
    db.commit()
    return {"status": "verified"}

@router.post("/refresh", response_model=TokenResponse)
def refresh_token(refresh_token: str = ""):
    # Refresh token logic placeholder; replace with proper refresh token rotation.
    return TokenResponse(
        access_token="sample_access_token",
        refresh_token="sample_refresh_token",
        token_type="bearer",
        expires_in=1800,
    )

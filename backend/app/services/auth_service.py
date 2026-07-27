from datetime import timedelta
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.db.models import User


def create_user(db: Session, email: str, password: str, full_name: str, preferred_language: str = "en") -> User:
    hashed_password = hash_password(password)
    user = User(
        email=email,
        hashed_password=hashed_password,
        full_name=full_name,
        preferred_language=preferred_language,
        roles=["user"],
        is_verified=False,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_tokens(user: User) -> dict:
    access_token = create_access_token(subject=user.email, expires_delta=timedelta(minutes=30))
    return {
        "access_token": access_token,
        "refresh_token": "refresh_token_placeholder",
        "token_type": "bearer",
        "expires_in": 1800,
    }

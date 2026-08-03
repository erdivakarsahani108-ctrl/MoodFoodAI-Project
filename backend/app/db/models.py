from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, JSON, String, func
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    preferred_language = Column(String(5), nullable=False, default="en")
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    roles = Column(JSON, default=["user"])
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    moods = relationship("MoodEvent", back_populates="user")
    recommendation_history = relationship("RecommendationLog", back_populates="user")


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    age = Column(Integer)
    gender = Column(String(25))
    height_cm = Column(Float)
    weight_kg = Column(Float)
    activity_level = Column(String(50))
    bmi = Column(Float)
    bmr = Column(Float)
    dietary_preferences = Column(JSON, default=list)
    medical_conditions = Column(JSON, default=list)
    allergies = Column(JSON, default=list)
    budget_level = Column(String(50))
    region = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="profile")


class MoodEvent(Base):
    __tablename__ = "mood_events"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    source = Column(String(20), nullable=False)
    mood_label = Column(String(50), nullable=False)
    sentiment = Column(String(50), nullable=False)
    confidence = Column(String(10), nullable=False)
    details = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="moods")


class RecommendationLog(Base):
    __tablename__ = "recommendation_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    request_payload = Column(JSON, default={})
    response_payload = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="recommendation_history")

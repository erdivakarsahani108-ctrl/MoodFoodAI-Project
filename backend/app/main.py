from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
from app.api.v1.routes import (
    admin_router,
    ai_router,
    auth_router,
    health_router,
    mood_router,
    nutrition_router,
    recommendations_router,
    user_router,
)
from app.core.config import settings
from app.core.logging import configure_logging
from app.db.session import engine
from app.db.models import Base

# Configure structured logging for the backend service
configure_logging()

app = FastAPI(
    title="AI Mood-Based Food Recommendation API",
    description="Enterprise API for AI-powered nutrition, mood detection, recommendations, and health analytics.",
    version="0.1.0",
    openapi_url="/api/v1/openapi.json",
    docs_url="/api/v1/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_origin_regex=settings.allowed_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(mood_router, prefix="/api/v1/mood", tags=["Mood"])
app.include_router(ai_router, prefix="/api/v1/ai", tags=["AI"])
app.include_router(nutrition_router, prefix="/api/v1/nutrition", tags=["Nutrition"])
app.include_router(recommendations_router, prefix="/api/v1/recommendations", tags=["Recommendations"])
app.include_router(health_router, prefix="/api/v1/health", tags=["Health"])
app.include_router(admin_router, prefix="/api/v1/admin", tags=["Admin"])

try:
    Base.metadata.create_all(bind=engine)
except OperationalError:
    pass

@app.get("/api/v1/healthz", summary="Service health check")
def health_check() -> dict:
    return {"status": "ok", "service": "moodfood-ai"}

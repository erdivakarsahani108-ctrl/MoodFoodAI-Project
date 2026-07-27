from .auth import router as auth_router
from .admin import router as admin_router
from .ai import router as ai_router
from .health import router as health_router
from .mood import router as mood_router
from .nutrition import router as nutrition_router
from .recommendations import router as recommendations_router
from .user import router as user_router

__all__ = [
    "auth_router",
    "admin_router",
    "ai_router",
    "health_router",
    "mood_router",
    "nutrition_router",
    "recommendations_router",
    "user_router",
]

__all__ = [
    "auth_router",
    "health_router",
    "user_router",
    "mood_router",
    "nutrition_router",
    "recommendations_router",
    "admin_router",
]

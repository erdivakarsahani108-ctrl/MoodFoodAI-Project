from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "moodfood_tasks",
    broker=settings.redis_url,
    backend=settings.redis_url,
)

celery_app.conf.task_routes = {
    "app.tasks.email.send_verification_email": {"queue": "email"},
    "app.tasks.retrain.schedule_model_retrain": {"queue": "ml"},
}

celery_app.conf.beat_schedule = {
    "daily-recommendation-message": {
        "task": "app.tasks.retrain.schedule_model_retrain",
        "schedule": 86400.0,
    },
}

from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn
from typing import List


class Settings(BaseSettings):
    project_name: str = "AI Mood-Based Food Recommendation System"
    environment: str = "development"
    debug: bool = True
    allowed_origins: List[AnyHttpUrl] = ["http://localhost:3000"]
    postgres_dsn: PostgresDsn = "postgresql://postgres:postgres@localhost:5432/moodfood"
    mongodb_uri: str = "mongodb://localhost:27017/moodfood"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "CHANGE_ME"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    oauth_google_client_id: str = ""
    oauth_google_client_secret: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

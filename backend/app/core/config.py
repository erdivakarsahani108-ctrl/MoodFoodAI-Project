from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    project_name: str = "AI Mood-Based Food Recommendation System"
    environment: str = "development"
    debug: bool = True
    allowed_origins: List[str] = ["http://localhost:3000"]
    postgres_dsn: str = "sqlite:///./moodfood.db"
    mongodb_uri: str = "mongodb://localhost:27017/moodfood"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "development-secret-change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    oauth_google_client_id: str = ""
    oauth_google_client_secret: str = ""

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value):
        if value is None:
            return ["http://localhost:3000"]
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    @field_validator("postgres_dsn", mode="before")
    @classmethod
    def normalize_postgres_dsn(cls, value):
        if value is None or value in {"", "******localhost:5432/moodfood"}:
            return "sqlite:///./moodfood.db"
        return value


settings = Settings()

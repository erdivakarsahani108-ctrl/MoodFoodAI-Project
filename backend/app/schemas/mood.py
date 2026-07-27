from pydantic import BaseModel
from typing import Dict, Optional


class MoodRequest(BaseModel):
    text: str
    language: str = "en"


class VoiceMoodRequest(BaseModel):
    audio_base64: str
    language: str = "en"


class FaceMoodRequest(BaseModel):
    image_base64: str


class MoodResponse(BaseModel):
    mood_label: str
    sentiment: str
    confidence: float
    emotion_scores: Optional[Dict[str, float]]

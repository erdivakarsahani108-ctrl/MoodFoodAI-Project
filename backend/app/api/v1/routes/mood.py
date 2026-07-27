from fastapi import APIRouter, Depends

from app.core.dependencies import get_active_user
from app.schemas.mood import FaceMoodRequest, MoodRequest, MoodResponse, VoiceMoodRequest
from app.services.ai_service import analyze_face_mood, analyze_text_mood, analyze_voice_mood

router = APIRouter()

@router.post("/text", response_model=MoodResponse)
def text_mood(payload: MoodRequest, current_user=Depends(get_active_user)):
    result = analyze_text_mood(payload.text, payload.language)
    return MoodResponse(**result)

@router.post("/voice", response_model=MoodResponse)
def voice_mood(payload: VoiceMoodRequest, current_user=Depends(get_active_user)):
    result = analyze_voice_mood(payload.audio_base64, payload.language)
    return MoodResponse(**result)

@router.post("/face", response_model=MoodResponse)
def face_mood(payload: FaceMoodRequest, current_user=Depends(get_active_user)):
    result = analyze_face_mood(payload.image_base64)
    return MoodResponse(**result)

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import recognize_barcode, read_nutrition_label

router = APIRouter()

class BarcodeRequest(BaseModel):
    barcode_value: str


class OCRRequest(BaseModel):
    image_base64: str


@router.post("/barcode")
def barcode_scan(payload: BarcodeRequest):
    return recognize_barcode(payload.barcode_value)


@router.post("/ocr")
def ocr_label(payload: OCRRequest):
    return read_nutrition_label(payload.image_base64)

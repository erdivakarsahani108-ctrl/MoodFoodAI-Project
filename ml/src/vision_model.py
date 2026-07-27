import cv2
import numpy as np


def extract_face_landmarks(image_path: str) -> dict[str, float]:
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError('Image not found or could not be loaded.')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    if len(faces) == 0:
        return {'face_detected': 0}
    x, y, w, h = faces[0]
    landmarks = {'x': float(x), 'y': float(y), 'width': float(w), 'height': float(h)}
    return landmarks


def estimate_mood_from_face(image_path: str) -> dict[str, float]:
    try:
        landmarks = extract_face_landmarks(image_path)
    except ValueError:
        return {'mood_score': 0.0, 'confidence': 0.0}
    if landmarks.get('face_detected', 0) == 0:
        return {'mood_score': 0.0, 'confidence': 0.2}
    width = landmarks['width']
    score = min(1.0, max(0.0, 0.5 + (width / 300.0 - 0.2)))
    return {'mood_score': float(score), 'confidence': 0.7}

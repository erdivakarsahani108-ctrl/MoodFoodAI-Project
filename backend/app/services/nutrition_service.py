from typing import Dict


def calculate_bmi(weight_kg: float, height_cm: float) -> float:
    height_m = height_cm / 100.0
    return round(weight_kg / (height_m * height_m), 1)


def calculate_bmr(weight_kg: float, height_cm: float, age: int, gender: str) -> float:
    gender = gender.lower()
    if gender == "female":
        bmr = 447.593 + (9.247 * weight_kg) + (3.098 * height_cm) - (4.330 * age)
    else:
        bmr = 88.362 + (13.397 * weight_kg) + (4.799 * height_cm) - (5.677 * age)
    return round(bmr, 1)


def calculate_daily_calories(bmr: float, activity_level: str) -> float:
    multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9,
    }
    return round(bmr * multipliers.get(activity_level.lower(), 1.375), 1)


def calculate_macros(calories: float) -> Dict[str, float]:
    protein = round((calories * 0.25) / 4, 1)
    fat = round((calories * 0.25) / 9, 1)
    carbs = round((calories * 0.5) / 4, 1)
    return {"protein_g": protein, "fat_g": fat, "carbs_g": carbs}

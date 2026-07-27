from typing import Dict, List


def predict_health_risks(age: int, gender: str, bmi: float, family_history: List[str], lifestyle: Dict[str, str], medical_conditions: List[str]) -> dict:
    conditions = ["Diabetes", "Hypertension", "Heart Disease", "Obesity", "PCOS"]
    scores = []
    risk_base = bmi / 30.0
    for condition in conditions:
        score = min(0.99, round(risk_base * 0.2 + (0.1 if condition in family_history else 0) + (0.1 if "smoking" in lifestyle.get("habits", "") else 0) + 0.05, 2))
        scores.append({
            "condition": condition,
            "risk_score": score,
            "recommendation": f"Maintain a balanced diet, regular exercise, and consult a professional for {condition}.",
        })
    overall_score = round(sum(item["risk_score"] for item in scores) / len(scores), 2)
    advice = "Monitor key health metrics and choose diet plans aligned with your medical profile."
    return {"risks": scores, "overall_score": overall_score, "advice": advice}

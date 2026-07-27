from typing import Any, Dict, List


def explain_text_prediction(text: str, pipeline: Any) -> Dict[str, Any]:
    if not hasattr(pipeline, 'named_steps'):
        return {'reason': 'No explainability available for this pipeline.'}
    features = pipeline.named_steps['vectorizer'].build_analyzer()(text)
    return {
        'reason': 'Text sentiment analysis is based on token presence and contextual probability weights.',
        'tokens': features[:20],
    }


def explain_health_prediction(feature_vector: List[float], model: Any) -> Dict[str, Any]:
    if not hasattr(model, 'steps'):
        return {'reason': 'Model coefficients unavailable.'}
    classifier = model.named_steps['classifier']
    coef = classifier.coef_.tolist()[0] if hasattr(classifier, 'coef_') else []
    return {
        'risk_score_vector': feature_vector,
        'coefficients': coef,
        'note': 'Higher coefficients increase the probability of the positive risk label.',
    }


def explain_recommendation_item(item: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'food_id': item.get('food_id'),
        'name': item.get('name'),
        'score': item.get('score'),
        'reason': 'Recommendations are ranked by similarity to the user preference profile and mood-aware item embeddings.',
    }

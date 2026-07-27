# API Design

The platform exposes REST and GraphQL APIs to support user, recommendation, analytics, and AI interactions.

## 1. Authentication

### POST /api/v1/auth/register
- Description: Register a new user.
- Request:
  - email
  - password
  - full_name
  - preferred_language
- Response:
  - user_id
  - verification_required

### POST /api/v1/auth/login
- Description: Authenticate user and return JWT.
- Request:
  - email
  - password
- Response:
  - access_token
  - refresh_token
  - expires_in

### POST /api/v1/auth/oauth/login
- Description: OAuth login callback.
- Request:
  - provider
  - access_token
- Response:
  - access_token
  - user_profile

### POST /api/v1/auth/verify-email
- Description: Verify the user's email.
- Request:
  - user_id
  - otp_code

### POST /api/v1/auth/refresh
- Description: Refresh JWT token.
- Request:
  - refresh_token

## 2. User Profile

### GET /api/v1/users/me
- Description: Get authenticated user profile.
- Response:
  - user_id
  - full_name
  - email
  - roles
  - health_metrics
  - preferences

### PATCH /api/v1/users/me
- Description: Update profile, BMI/BMR, diet history.
- Request:
  - height_cm
  - weight_kg
  - age
  - gender
  - activity_level
  - dietary_preferences
  - medical_conditions

## 3. Mood and AI Inputs

### POST /api/v1/mood/text
- Description: Analyze mood from text.
- Request:
  - text
  - language
- Response:
  - mood_label
  - emotion_scores
  - sentiment

### POST /api/v1/mood/voice
- Description: Analyze mood from voice audio.
- Request:
  - audio_base64
  - language
- Response:
  - mood_label
  - confidence

### POST /api/v1/mood/face
- Description: Analyze mood from facial expression image.
- Request:
  - image_base64
- Response:
  - mood_label
  - confidence
  - face_landmarks

### POST /api/v1/ai/ocr
- Description: OCR nutrition label from image.
- Request:
  - image_base64
- Response:
  - nutrition_data

### POST /api/v1/ai/barcode
- Description: Recognize barcode and return food metadata.
- Request:
  - barcode_value
- Response:
  - product_name
  - nutrition_info

## 4. Recommendations

### POST /api/v1/recommendations
- Description: Get meal/recommendation suggestions.
- Request:
  - user_id
  - mood_signals
  - context: weather, season, budget, region
  - target_goal
- Response:
  - recommendations[]
  - explanation
  - metrics

### GET /api/v1/recommendations/history
- Description: Retrieve user's recommendation history.
- Response:
  - history[]

## 5. Nutrition and Health

### POST /api/v1/nutrition/analysis
- Description: Calculate BMI, BMR and macros.
- Request:
  - height_cm
  - weight_kg
  - age
  - gender
  - activity_level
  - meal_plan
- Response:
  - bmi
  - bmr
  - daily_calories
  - macros

### POST /api/v1/health/risk
- Description: Predict risk for health conditions.
- Request:
  - health_metrics
  - family_history
  - lifestyle
- Response:
  - risk_scores
  - recommendations

## 6. Dashboard and Analytics

### GET /api/v1/admin/analytics/metrics
- Description: Retrieve admin analytics metrics.
- Response:
  - active_users
  - recommendation_ctr
  - model_accuracy
  - engagement

### GET /api/v1/ai/insights
- Description: Retrieve AI usage and explainability insights.
- Response:
  - model_versions
  - recent_predictions
  - fairness_metrics

## 7. GraphQL Endpoint

### POST /graphql
- Description: Expose federated query operations for user, recommendations, and AI insights.
- Example queries:
  - `user(id: String!): User`
  - `recommendations(userId: String!, filters: RecommendationFilter): RecommendationResult`
  - `healthRisk(input: HealthRiskInput): HealthRiskOutput`

## 8. Error Handling

Error responses follow a standardized format:

```json
{
  "detail": "Invalid request payload",
  "code": "validation_error",
  "status_code": 400
}
```

## 9. Security

- Endpoints protected by JWT authentication and RBAC guards.
- OAuth login endpoints only accept verified provider tokens.
- Sensitive health data is encrypted at rest and transmitted over HTTPS.

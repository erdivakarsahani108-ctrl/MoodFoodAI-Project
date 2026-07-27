# Database Schema

This project uses PostgreSQL as the primary relational database for user profiles, health metrics, mood events, and recommendation history.

## Tables

### users
- `id` (integer, primary key)
- `email` (string, unique, indexed)
- `hashed_password` (string)
- `full_name` (string)
- `preferred_language` (string)
- `is_active` (boolean)
- `is_verified` (boolean)
- `roles` (JSON)
- `created_at` (datetime)
- `updated_at` (datetime)

### user_profiles
- `id` (integer, primary key)
- `user_id` (integer, foreign key -> users.id)
- `age` (integer)
- `gender` (string)
- `height_cm` (float)
- `weight_kg` (float)
- `activity_level` (string)
- `bmi` (float)
- `bmr` (float)
- `dietary_preferences` (JSON)
- `medical_conditions` (JSON)
- `allergies` (JSON)
- `budget_level` (string)
- `region` (string)
- `created_at` (datetime)
- `updated_at` (datetime)

### mood_events
- `id` (integer, primary key)
- `user_id` (integer, foreign key -> users.id)
- `source` (string)
- `mood_label` (string)
- `sentiment` (string)
- `confidence` (string)
- `metadata` (JSON)
- `created_at` (datetime)

### recommendation_logs
- `id` (integer, primary key)
- `user_id` (integer, foreign key -> users.id)
- `request_payload` (JSON)
- `response_payload` (JSON)
- `created_at` (datetime)

## Notes

- `users` contains authentication and authorization data.
- `user_profiles` stores health and preference details to support personalized recommendations.
- `mood_events` persists mood inference inputs for analytics and retraining.
- `recommendation_logs` captures recommendation inputs and outputs for auditing.

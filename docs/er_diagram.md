# ER Diagram

The ER diagram for the AI Mood-Based Food Recommendation System describes entities and relationships.

## Entities

- `User`
- `UserProfile`
- `MoodEvent`
- `RecommendationLog`

## Relationships

- `User` 1-to-1 `UserProfile`
- `User` 1-to-many `MoodEvent`
- `User` 1-to-many `RecommendationLog`

## Diagram

```text
+------------+      +----------------+      +--------------+
|   users    |1    1| user_profiles  |      | mood_events  |
+------------+      +----------------+      +--------------+
| id         |------| user_id        |      | id           |
| email      |      | age            |      | user_id      |----+
| hashed_pwd |      | gender         |      | source       |    |
| full_name  |      | height_cm      |      | mood_label   |    |
| preferred_language | weight_kg   |      | sentiment    |    |
| roles      |      | activity_level |      | confidence   |    |
+------------+      | bmi            |      | metadata     |    |
                    +----------------+      +--------------+    |
                                                          +--------------+
                                                          | recommendation_logs |
                                                          +--------------+
                                                          | id           |
                                                          | user_id      |----+
                                                          | request_payload |   |
                                                          | response_payload|   |
                                                          +--------------+    |
```

## Design Rationale

- A normalized schema keeps authentication, profile, and activity data separate.
- JSON fields allow storing complex preference objects and recommendation payloads without restricting future schema evolution.
- Foreign keys enforce referential integrity while maintaining flexible user-driven analytics.

# System Design

## 1. High-Level Design

The system follows a modular architecture with the following layers:

- Client layer: Web application built with Next.js and React.
- API layer: FastAPI services exposing REST and GraphQL APIs.
- AI layer: Model inference and training pipelines using TensorFlow, PyTorch, scikit-learn, OpenCV, and Hugging Face.
- Data layer: PostgreSQL, MongoDB, Elasticsearch, Redis, and FAISS vector storage.
- Infrastructure layer: Docker containers orchestrated via Kubernetes, supported by Prometheus, Grafana, and CI/CD.

## 2. Component Interaction

1. The frontend sends requests to the backend API endpoints for authentication, recommendations, nutritional analysis, and chatbot interactions.
2. The backend authenticates users and retrieves user profile data from PostgreSQL.
3. The AI orchestration service invokes specialized inference modules:
   - Mood detection service uses text and voice sentiment models.
   - Facial expression service uses computer vision models.
   - Recommendation engine uses embeddings and rule-based filters.
4. The recommendation service queries PostgreSQL for user-specific preferences and historical data, MongoDB for event logs, and Elasticsearch for recipe search.
5. Results are cached in Redis for common queries and low latency.
6. Asynchronous jobs such as email verification, model retraining, report generation, and daily recommendations are handled by Celery workers.
7. Observability is provided by Prometheus, Grafana, and structured logs to monitor API performance, model metrics, and system health.

## 3. Data Flow

- User sign-up and profile completion store health metrics, cooking preferences, dietary restrictions, and allergy information in PostgreSQL.
- Mood inputs are recorded and persisted as structured events in MongoDB for model feedback and personalization.
- Recommendations are generated from combined signals and persisted as recent activity for analytics.
- Model predictions and user confirmations feed back into training data for periodic retraining.

## 4. Non-Functional Requirements

- Performance: API responses under 300ms for cached endpoints, under 1000ms for AI-powered recommendations.
- Availability: 99.9% service uptime through Kubernetes autoscaling and health checks.
- Security: OAuth 2.0, JWT, encrypted secrets, and GDPR-compliant data handling.
- Maintainability: Clear boundaries between services and reusable modules.
- Observability: Metrics, tracing, logs, and dashboards for system health.

## 5. Deployment Architecture

- Use containerized services in AWS ECS/EKS or AKS/GKE.
- PostgreSQL and Redis provisioned as managed services.
- MongoDB Atlas for document storage.
- Elasticsearch as a managed service or self-hosted cluster.
- CI/CD pipeline builds images, runs tests, and deploys to staging/production.
- Model artifacts stored in S3-compatible object storage and versioned through the MLOps pipeline.

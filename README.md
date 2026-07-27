# AI Mood-Based Food Recommendation System

AI Mood-Based Food Recommendation System is an enterprise-grade platform for personalized nutrition, wellness, and food recommendations powered by AI. The system blends emotional state detection, dietary preferences, health risk prediction, and contextual recommendation logic to deliver tailored food, recipe, and restaurant suggestions.

## Overview

The project combines:
- AI-powered food recommendation engine
- Mood detection via text, voice, and facial expression
- Nutrition analysis, BMI/BMR/ calorie calculations
- Health risk prediction and disease-aware diet planning
- Multilingual support (English and Hindi)
- Modern responsive dashboard UI with dark/light mode
- Role-based access control with admin, user, and analytics roles
- REST and GraphQL APIs
- Machine learning, deep learning, NLP, computer vision, and MLOps pipelines
- Production-grade deployment with Docker, Kubernetes, CI/CD, monitoring, and logging

## Contents

- `backend/` - FastAPI backend microservices, API layers, ML services, data models, authentication
- `frontend/` - Next.js dashboard and customer experience web app
- `ml/` - Model training pipelines, explainability, versioning, sample notebooks
- `infra/` - Infrastructure-as-code, Kubernetes manifests, monitoring and deployment configurations
- `docs/` - Architecture, system design, API documentation, deployment guidance
- `data/` - Sample datasets, nutrition information, recipe corpus
- `tests/` - Unit tests, integration tests, and API contract tests
- `samples/` - Example payloads, CSVs, and model input fixtures

## Getting Started

### Backend

1. Create a Python virtual environment and activate it.
2. Install requirements:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Copy `.env.example` to `.env` and configure your environment values.
4. Start the backend service:
   ```bash
   uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend

1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Docker Compose

Run both backend and frontend together with Docker Compose:
```bash
docker-compose up --build
```

## Kubernetes Deployment

Apply the Kubernetes manifests in `infra/k8s` to deploy services in a cluster.

## Documentation

See the `docs/` folder for architecture, API design, system design, ML pipeline, and deployment guides.
## License

This project is licensed under the MIT License. See `LICENSE`.

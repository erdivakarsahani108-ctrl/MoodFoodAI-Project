# AWS Deployment Guide

This guide describes how to deploy the MoodFood AI platform on AWS using ECS and managed services.

## Architecture

- Backend service: ECS Fargate task running the FastAPI backend.
- Frontend service: ECS Fargate task running the Next.js web app.
- PostgreSQL: Amazon RDS for PostgreSQL.
- Redis: Amazon ElastiCache for Redis.
- MongoDB: MongoDB Atlas or Amazon DocumentDB.
- Elasticsearch: Amazon OpenSearch Service.
- S3: Artifact and model storage.
- IAM: Secure task execution roles and secrets access.

## Deployment Steps

1. Build and push Docker images to Amazon ECR.
2. Create RDS and ElastiCache instances.
3. Provision an ECS cluster and service definitions.
4. Configure load balancer and target groups.
5. Deploy backend and frontend tasks with environment variables.
6. Set up CloudWatch logs and Prometheus export metrics.

## Environment Variables

- POSTGRES_DSN
- MONGODB_URI
- REDIS_URL
- JWT_SECRET
- ALLOWED_ORIGINS
- OAUTH_GOOGLE_CLIENT_ID
- OAUTH_GOOGLE_CLIENT_SECRET

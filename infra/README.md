# Infrastructure and Deployment

This folder contains the infrastructure definitions and deployment guidance for the MoodFood AI platform.

## Components

- Kubernetes manifests for backend, frontend, data stores, monitoring, and secrets.
- GitHub Actions workflow for CI/CD.
- AWS ECS deployment guide for cloud infrastructure.
- Monitoring best practices and observability architecture.

## Deployment Goals

- Deploy the backend and frontend as containerized, scalable services.
- Use managed data services for PostgreSQL, Redis, and Elasticsearch when possible.
- Provide health checks, readiness probes, and service discovery.
- Add monitoring and logging for production observability.

## Next steps

1. Review the Kubernetes manifests in `infra/k8s/`.
2. Update secrets and image names for the production cluster.
3. Configure GitHub Actions with your cloud provider credentials.
4. Extend the AWS deployment guide with CloudFormation or Terraform as needed.

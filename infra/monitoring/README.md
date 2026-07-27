# Monitoring and Logging

This folder contains the monitoring architecture and observability design for the MoodFood AI system.

## Components

- Prometheus: collects service metrics and health data.
- Grafana: visualizes performance, error rates, and model metrics.
- Logging: use structured logs from FastAPI and container stdout.

## Setup

- Deploy Prometheus and Grafana into the Kubernetes cluster.
- Configure scraping of backend and frontend endpoints.
- Add dashboards for request latency, error counts, and model inference health.
- Collect logs via standard output, then forward to a centralized logging system.

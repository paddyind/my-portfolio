# Portfolio Deployment Guide

This guide covers deploying the portfolio application across different environments with or without proxy settings.

## Quick Start

### Docker Desktop (Local)

```bash
# Production build
docker-compose up --build

# Development with hot reload
docker-compose --profile dev up --build portfolio-dev

# Corporate environment (with proxy)
docker-compose --profile corporate up --build portfolio-corporate
```

### Direct Docker Commands

```bash
# Build and run production
./scripts/docker-build.sh production
docker run -p 8080:8080 padmanaban-portfolio:latest

# Build and run development
./scripts/docker-build.sh development  
docker run -p 5173:5173 padmanaban-portfolio:dev

# Build and run corporate (with proxy)
# Option 1: Use corporate.env file (recommended)
# Create corporate.env with your proxy settings, then:
./scripts/docker-build.sh corporate

# Option 2: Set environment variables directly
export HTTP_PROXY=http://your-proxy:port
export HTTPS_PROXY=http://your-proxy:port
./scripts/docker-build.sh corporate
docker run -p 8080:8080 padmanaban-portfolio:corporate
```

## Environment Configurations

### 1. Standard Environment (No Proxy)
- **Port**: 8080 (production), 5173 (development)
- **Usage**: Personal networks, cloud environments
- **Command**: `docker-compose up`

### 2. Corporate Environment (Proxy)
- **Proxy**: Set via HTTP_PROXY and HTTPS_PROXY environment variables
- **Port**: 8080
- **Usage**: Corporate networks behind proxy
- **Command**: `HTTP_PROXY=http://your-proxy:port docker-compose --profile corporate up`

### 3. Development Environment
- **Port**: 5173
- **Features**: Hot reload, volume mounts
- **Usage**: Local development
- **Command**: `docker-compose --profile dev up`

## Cloud Deployment

### EKS (Amazon Elastic Kubernetes Service)

1. **Build and Push Image**
```bash
# Build for production
docker build -t portfolio:latest .

# Tag for ECR
docker tag portfolio:latest <account-id>.dkr.ecr.<region>.amazonaws.com/portfolio:latest

# Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/portfolio:latest
```

2. **Deploy with Helm**
```bash
cd helm
helm install portfolio ./portfolio \
  --set image.repository=<account-id>.dkr.ecr.<region>.amazonaws.com/portfolio \
  --set image.tag=latest \
  --set ingress.enabled=true
```

### GKE (Google Kubernetes Engine)

1. **Build and Push Image**
```bash
# Build for production
docker build -t portfolio:latest .

# Tag for GCR
docker tag portfolio:latest gcr.io/<project-id>/portfolio:latest

# Push to GCR
docker push gcr.io/<project-id>/portfolio:latest
```

2. **Deploy with Kubernetes**
```bash
cd k8s
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

### Cloud Run (Google)

1. **Build and Deploy**
```bash
# Build and deploy in one command
gcloud run deploy portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --port 8080 \
  --allow-unauthenticated
```

### Docker Hub Deployment

1. **Build and Push**
```bash
# Build
docker build -t your-username/portfolio:latest .

# Push to Docker Hub  
docker push your-username/portfolio:latest
```

2. **Run Anywhere**
```bash
docker run -p 8080:8080 your-username/portfolio:latest
```

## Environment Variables

Set these environment variables to customize deployment:

```bash
# Proxy settings (optional - set these for corporate environments)
# export HTTP_PROXY=http://your-proxy:port
# export HTTPS_PROXY=http://your-proxy:port
# export NO_PROXY=localhost,127.0.0.1,.local

# Port customization
export PORT=8080        # Production port
export DEV_PORT=5173    # Development port

# Environment
export NODE_ENV=production
```

### Corporate Environment File

For corporate environments, create a `corporate.env` file in the project root:

```bash
# corporate.env
HTTP_PROXY=http://your-corporate-proxy:port
HTTPS_PROXY=http://your-corporate-proxy:port
NO_PROXY=localhost,127.0.0.1,.local,.yourdomain.com
```

**Important**: The `corporate.env` file is automatically ignored by git to prevent exposing sensitive corporate settings.

## Health Checks

The application includes built-in health checks:

- **Endpoint**: `/health`
- **Response**: `healthy` (200 OK)
- **Docker**: Automatic health check configured
- **Kubernetes**: Liveness and readiness probes available

## Troubleshooting

### Port Conflicts
```bash
# Check what's using the port
lsof -i :8080

# Kill process using port
kill -9 <PID>
```

### Proxy Issues
```bash
# Test proxy connectivity (replace with your proxy)
curl -x $HTTP_PROXY http://www.google.com

# Check Docker proxy settings
docker info | grep -i proxy
```

### Build Issues
```bash
# Clean rebuild
docker system prune -a
docker-compose build --no-cache
```

### Logs
```bash
# Docker Compose logs
docker-compose logs -f

# Direct Docker logs
docker logs <container-id> -f

# Kubernetes logs
kubectl logs -f deployment/portfolio
```

## Security Features

- ✅ Non-root user execution
- ✅ Security headers in nginx
- ✅ Health check endpoints
- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Client-side routing support

## Performance

- **Build time**: ~2-3 minutes
- **Image size**: ~50MB (Alpine-based)
- **Startup time**: ~5-10 seconds
- **Memory usage**: ~64MB RAM

## Support

For issues or questions:
1. Check the logs first
2. Verify proxy settings if in corporate environment  
3. Ensure ports are not conflicted
4. Check Docker and docker-compose versions

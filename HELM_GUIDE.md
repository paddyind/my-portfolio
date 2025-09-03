# ⚡ Helm Deployment Guide

Complete guide for deploying the portfolio application using Helm charts across different environments.

## 📋 Prerequisites

1. **Docker** - For building images
2. **Kubernetes cluster** - Local (minikube, Docker Desktop) or cloud-based
3. **Helm 3.x** - Package manager for Kubernetes
4. **kubectl** - Configured to access your cluster

## 🚀 Quick Setup

### 1. Install Helm and Dependencies
```bash
# Run the setup script
./scripts/helm-install.sh

# Or install manually
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### 2. Deploy to Environment
```bash
# Development
./scripts/k8s-deploy.sh dev

# Staging
./scripts/k8s-deploy.sh staging

# Production
./scripts/k8s-deploy.sh prod
```

## 🏗️ Chart Structure

```
helm/
├── portfolio/                 # Main chart
│   ├── Chart.yaml            # Chart metadata
│   ├── values.yaml           # Default values
│   └── templates/            # Kubernetes manifests
│       ├── deployment.yaml   # Application deployment
│       ├── service.yaml      # Service definition
│       ├── ingress.yaml      # Ingress controller
│       ├── configmap.yaml    # Configuration
│       ├── hpa.yaml          # Auto-scaling
│       ├── pdb.yaml          # Pod disruption budget
│       ├── networkpolicy.yaml # Network policies
│       └── _helpers.tpl      # Template helpers
├── values-dev.yaml           # Development overrides
├── values-staging.yaml       # Staging overrides
└── values-prod.yaml          # Production overrides
```

## 🎯 Environment Configurations

### Development Environment
- **Replicas**: 1
- **Resources**: Minimal (50m CPU, 64Mi RAM)
- **Service**: NodePort
- **Ingress**: Disabled
- **Autoscaling**: Disabled

### Staging Environment  
- **Replicas**: 2
- **Resources**: Medium (75m CPU, 96Mi RAM)
- **Service**: LoadBalancer
- **Ingress**: Enabled with staging domain
- **Autoscaling**: Disabled

### Production Environment
- **Replicas**: 3 (with autoscaling 3-10)
- **Resources**: Full (100m CPU, 128Mi RAM)
- **Service**: LoadBalancer
- **Ingress**: Enabled with SSL/TLS
- **Autoscaling**: Enabled
- **Network Policies**: Enabled
- **Pod Disruption Budget**: Enabled

## 🔧 Manual Deployment Commands

### Basic Deployment
```bash
# Deploy to development
helm upgrade --install portfolio-dev ./helm/portfolio \
  --namespace portfolio-dev \
  --values ./helm/values-dev.yaml \
  --create-namespace

# Deploy to production
helm upgrade --install portfolio-prod ./helm/portfolio \
  --namespace portfolio-prod \
  --values ./helm/values-prod.yaml \
  --create-namespace
```

### Advanced Options
```bash
# Deploy with custom values
helm upgrade --install portfolio-dev ./helm/portfolio \
  --namespace portfolio-dev \
  --values ./helm/values-dev.yaml \
  --set image.tag=v1.2.3 \
  --set replicaCount=2

# Deploy with debug mode
helm upgrade --install portfolio-dev ./helm/portfolio \
  --namespace portfolio-dev \
  --values ./helm/values-dev.yaml \
  --debug \
  --dry-run

# Force upgrade
helm upgrade --install portfolio-prod ./helm/portfolio \
  --namespace portfolio-prod \
  --values ./helm/values-prod.yaml \
  --force
```

## 📊 Managing Deployments

### View Deployed Releases
```bash
# List all releases
helm list -A

# Get release status
helm status portfolio-dev -n portfolio-dev

# Get release history
helm history portfolio-dev -n portfolio-dev
```

### Rollback Deployments
```bash
# Rollback to previous version
helm rollback portfolio-dev -n portfolio-dev

# Rollback to specific revision
helm rollback portfolio-dev 2 -n portfolio-dev
```

### Uninstall Releases
```bash
# Uninstall release
helm uninstall portfolio-dev -n portfolio-dev

# Uninstall and delete namespace
helm uninstall portfolio-dev -n portfolio-dev
kubectl delete namespace portfolio-dev
```

## 🔍 Monitoring & Debugging

### Check Application Status
```bash
# Pod status
kubectl get pods -n portfolio-dev

# Service status
kubectl get svc -n portfolio-dev

# Ingress status
kubectl get ingress -n portfolio-dev

# Logs
kubectl logs -f deployment/portfolio-dev -n portfolio-dev
```

### Debug Issues
```bash
# Describe deployment
kubectl describe deployment portfolio-dev -n portfolio-dev

# Check events
kubectl get events -n portfolio-dev --sort-by='.lastTimestamp'

# Port forward for local access
kubectl port-forward svc/portfolio-dev 8080:80 -n portfolio-dev
```

## ⚙️ Customization

### Image Configuration
```yaml
# values-custom.yaml
image:
  repository: your-registry/portfolio
  tag: "v1.0.0"
  pullPolicy: Always

imagePullSecrets:
  - name: registry-secret
```

### Resource Limits
```yaml
# values-custom.yaml
resources:
  requests:
    cpu: 200m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

### Ingress Configuration
```yaml
# values-custom.yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: your-domain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: your-domain-tls
      hosts:
        - your-domain.com
```

## 🛡️ Security Features

### Network Policies
- Restrict ingress traffic to approved sources
- Allow egress to external services
- Isolate environments

### Security Context
- Run as non-root user (UID 1000)
- Drop all capabilities
- Read-only root filesystem (optional)

### RBAC
- Dedicated service account per environment
- Minimal required permissions
- Namespace isolation

## 📈 Scaling & Performance

### Horizontal Pod Autoscaling
```yaml
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80
```

### Pod Disruption Budget
```yaml
podDisruptionBudget:
  enabled: true
  minAvailable: 2  # Ensure 2 pods always available during updates
```

## 🔄 CI/CD Integration

### GitLab CI Example
```yaml
deploy-staging:
  stage: deploy
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - helm upgrade --install portfolio-staging ./helm/portfolio 
        --namespace portfolio-staging
        --values ./helm/values-staging.yaml
        --set image.tag=$CI_COMMIT_SHA
        --create-namespace
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - helm upgrade --install portfolio-prod ./helm/portfolio
        --namespace portfolio-prod  
        --values ./helm/values-prod.yaml
        --set image.tag=$CI_COMMIT_TAG
        --create-namespace
  only:
    - tags
```

## 🆘 Troubleshooting

### Common Issues

1. **Image Pull Errors**
   ```bash
   # Check if image exists
   docker images | grep padmanaban-portfolio
   
   # Build image
   docker build -t padmanaban-portfolio:latest .
   ```

2. **Ingress Not Working**
   ```bash
   # Check ingress controller
   kubectl get pods -n ingress-nginx
   
   # Check ingress rules
   kubectl describe ingress portfolio-dev -n portfolio-dev
   ```

3. **Pod Crashes**
   ```bash
   # Check pod logs
   kubectl logs -f deployment/portfolio-dev -n portfolio-dev
   
   # Check pod description
   kubectl describe pod <pod-name> -n portfolio-dev
   ```

4. **Resource Issues**
   ```bash
   # Check node resources
   kubectl top nodes
   
   # Check pod resources
   kubectl top pods -n portfolio-dev
   ```

---

**Need more help?** Check the [README.md](README.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for additional information.

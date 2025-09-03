#!/bin/bash

# Kubernetes deployment script for portfolio using Helm

set -e

ENVIRONMENT=${1:-dev}
NAMESPACE="portfolio-${ENVIRONMENT}"

echo "🚀 Deploying Portfolio to Kubernetes using Helm (${ENVIRONMENT} environment)..."

# Check if Helm is installed
if ! command -v helm &> /dev/null; then
    echo "❌ Helm is not installed. Please install Helm first."
    exit 1
fi

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t padmanaban-portfolio:latest .
docker tag padmanaban-portfolio:latest padmanaban-portfolio:${ENVIRONMENT}

# Create namespace if it doesn't exist
echo "📦 Creating namespace..."
kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

# Deploy using Helm
echo "📦 Deploying with Helm..."
helm upgrade --install portfolio-${ENVIRONMENT} ./helm/portfolio \
  --namespace ${NAMESPACE} \
  --values ./helm/values-${ENVIRONMENT}.yaml \
  --wait \
  --timeout 300s

echo "⏳ Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/portfolio-${ENVIRONMENT} -n ${NAMESPACE}

# Get service info
echo "📋 Service Information:"
kubectl get services -n ${NAMESPACE}
kubectl get ingress -n ${NAMESPACE} 2>/dev/null || echo "No ingress configured"

echo "✅ Portfolio deployed to Kubernetes!"
echo "🔗 Environment: ${ENVIRONMENT}"
echo "🔗 Namespace: ${NAMESPACE}"

# Show access information
SERVICE_TYPE=$(kubectl get service portfolio-${ENVIRONMENT} -n ${NAMESPACE} -o jsonpath='{.spec.type}')
if [ "$SERVICE_TYPE" = "LoadBalancer" ]; then
    echo "⏳ Waiting for LoadBalancer IP..."
    kubectl get service portfolio-${ENVIRONMENT} -n ${NAMESPACE} --watch
elif [ "$SERVICE_TYPE" = "NodePort" ]; then
    NODE_PORT=$(kubectl get service portfolio-${ENVIRONMENT} -n ${NAMESPACE} -o jsonpath='{.spec.ports[0].nodePort}')
    echo "🔗 Access via NodePort: http://localhost:${NODE_PORT}"
fi



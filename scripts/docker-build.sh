#!/bin/bash

# Simple Docker build script for all environments
# Usage: ./scripts/docker-build.sh [production|development|corporate]

set -e

ENV=${1:-production}
IMAGE_NAME="padmanaban-portfolio"

echo "🔨 Building Docker image for $ENV environment..."

case $ENV in
  "development"|"dev")
    echo "🛠️  Building development image..."
    docker build -f docker/Dockerfile.frontend -t $IMAGE_NAME:dev .
    echo "✅ Development image built: $IMAGE_NAME:dev"
    echo "🚀 Run with: docker run -p 5173:5173 $IMAGE_NAME:dev"
    ;;
    
  "corporate")
    echo "🏢 Building corporate production image with proxy..."
    
    # Load corporate environment file if it exists
    if [ -f "../corporate.env" ]; then
      echo "📄 Loading corporate environment from corporate.env..."
      source ../corporate.env
    fi
    
    # Check if proxy environment variables are set
    if [ -z "$HTTP_PROXY" ] || [ -z "$HTTPS_PROXY" ]; then
      echo "⚠️  Warning: HTTP_PROXY and HTTPS_PROXY environment variables not set"
      echo "   Create a corporate.env file or set them before running:"
      echo "   export HTTP_PROXY=http://your-proxy:port"
      echo "   export HTTPS_PROXY=http://your-proxy:port"
      echo "   Building without proxy settings..."
      docker build -f docker/Dockerfile -t $IMAGE_NAME:corporate .
    else
      echo "🔧 Using proxy settings: $HTTP_PROXY"
      docker build \
        -f docker/Dockerfile \
        --build-arg HTTP_PROXY=$HTTP_PROXY \
        --build-arg HTTPS_PROXY=$HTTPS_PROXY \
        --build-arg NO_PROXY=${NO_PROXY:-localhost,127.0.0.1,.local} \
        -t $IMAGE_NAME:corporate .
    fi
    echo "✅ Corporate image built: $IMAGE_NAME:corporate"
    echo "🚀 Run with: docker run -p 8080:8080 $IMAGE_NAME:corporate"
    ;;
    
  "production"|"prod"|*)
    echo "🏭 Building production image..."
    docker build -f docker/Dockerfile -t $IMAGE_NAME:latest -t $IMAGE_NAME:prod .
    echo "✅ Production image built: $IMAGE_NAME:latest"
    echo "🚀 Run with: docker run -p 8080:8080 $IMAGE_NAME:latest"
    ;;
esac

echo ""
echo "📦 Available images:"
docker images | grep $IMAGE_NAME
echo ""
echo "🌩️  For cloud deployment, tag and push:"
echo "   docker tag $IMAGE_NAME:latest your-registry/$IMAGE_NAME:latest"
echo "   docker push your-registry/$IMAGE_NAME:latest"
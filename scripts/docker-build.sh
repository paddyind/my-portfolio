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
    docker build --target development -t $IMAGE_NAME:dev .
    echo "✅ Development image built: $IMAGE_NAME:dev"
    echo "🚀 Run with: docker run -p 5173:5173 $IMAGE_NAME:dev"
    ;;
    
  "corporate")
    echo "🏢 Building corporate production image with proxy..."
    docker build \
      --target production \
      --build-arg HTTP_PROXY=http://genproxy.amdocs.com:8080 \
      --build-arg HTTPS_PROXY=http://genproxy.amdocs.com:8080 \
      --build-arg NO_PROXY=localhost,127.0.0.1,.local,.amdocs.com,amdocs.com \
      -t $IMAGE_NAME:corporate .
    echo "✅ Corporate image built: $IMAGE_NAME:corporate"
    echo "🚀 Run with: docker run -p 8080:8080 $IMAGE_NAME:corporate"
    ;;
    
  "production"|"prod"|*)
    echo "🏭 Building production image..."
    docker build --target production -t $IMAGE_NAME:latest -t $IMAGE_NAME:prod .
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
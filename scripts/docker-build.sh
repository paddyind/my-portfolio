#!/bin/bash

# Build Docker images for different environments

echo "🔨 Building Docker images for Portfolio..."

# Build development image
echo "🛠️  Building development image..."
docker build --target development -t padmanaban-portfolio:dev .

# Build production image
echo "🏭 Building production image..."
docker build --target production -t padmanaban-portfolio:latest .
docker build --target production -t padmanaban-portfolio:prod .

echo "✅ Docker images built successfully!"
echo "📦 Available images:"
docker images | grep padmanaban-portfolio



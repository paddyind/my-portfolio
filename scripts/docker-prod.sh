#!/bin/bash

# Docker production script for portfolio

echo "🚀 Starting Portfolio Production Environment with Docker..."

# Stop any running containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start production container
echo "🔨 Building and starting production container..."
docker-compose --profile production up --build portfolio-prod

echo "✅ Production server should be running at http://localhost:8080"



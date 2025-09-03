#!/bin/bash

# Docker development script for portfolio

echo "🚀 Starting Portfolio Development Environment with Docker..."

# Stop any running containers
echo "🛑 Stopping existing containers..."
docker-compose down -v

# Build and start development container
echo "🔨 Building and starting development container..."
docker-compose up --build portfolio-dev

echo "✅ Development server should be running at http://localhost:8080"

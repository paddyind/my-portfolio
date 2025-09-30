#!/bin/bash

echo "🚀 Portfolio Deployment Script"
echo "=============================="

# Stop and remove existing container if running
echo "🛑 Stopping existing container..."
docker stop portfolio-app 2>/dev/null || true
docker rm portfolio-app 2>/dev/null || true

# Build the application locally
echo "🏗️ Building application locally..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t portfolio:latest .

# Run the container
echo "🚀 Starting container..."
docker run -d -p 8080:8080 --name portfolio-app portfolio:latest

# Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 5

# Check status
echo "📊 Container status:"
docker ps | grep portfolio

echo ""
echo "🏥 Health check:"
curl -s http://localhost:8080/health

echo ""
echo ""
echo "✅ Portfolio deployed successfully!"
echo ""
echo "🌐 Access your portfolio at:"
echo "   http://localhost:8080"
echo ""
echo "🏥 Health check:"
echo "   http://localhost:8080/health"
echo ""
echo "🛑 To stop:"
echo "   docker stop portfolio-app"
echo ""
echo "📊 To check logs:"
echo "   docker logs portfolio-app"
echo ""

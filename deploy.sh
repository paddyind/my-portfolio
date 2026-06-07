#!/bin/bash
set -euo pipefail

echo "Portfolio Docker Compose Deployment"
echo "===================================="

cd "$(dirname "$0")"

FRONTEND_PORT="${PORTFOLIO_HOST_FRONTEND_PORT:-3400}"
SERVER_PORT="${PORTFOLIO_HOST_SERVER_PORT:-3401}"

echo "Building and starting containers..."
docker compose up --build -d

echo "Waiting for services to become healthy..."
sleep 8

echo ""
echo "Container status:"
docker compose ps

echo ""
echo "Health checks:"
curl -sf "http://localhost:${FRONTEND_PORT}/health" && echo "  frontend: healthy" || echo "  frontend: not ready yet"
curl -sf "http://localhost:${SERVER_PORT}/" >/dev/null && echo "  server:   healthy" || echo "  server:   not ready yet"

echo ""
echo "Portfolio deployed successfully!"
echo ""
echo "  Frontend:  http://localhost:${FRONTEND_PORT}"
echo "  API:       http://localhost:${SERVER_PORT}"
echo "  API proxy: http://localhost:${FRONTEND_PORT}/api/ (via nginx)"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f"
echo "  docker compose down"
echo "  docker compose --profile llm up -d   # start Ollama container"
echo "  ./scripts/ollama-setup.sh medium     # pull Gemma/Llama models"
echo "  # Set LLM_ENABLED=true in .env, then: docker compose up -d portfolio-server"

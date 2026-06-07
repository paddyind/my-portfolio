#!/bin/bash
# Pull Ollama models into the portfolio-ollama container (Docker Desktop).
# Usage:
#   ./scripts/ollama-setup.sh              # uses MODEL_PROFILE from .env or "medium"
#   ./scripts/ollama-setup.sh light        # gemma2:2b only (~2GB)
#   ./scripts/ollama-setup.sh medium       # gemma2:2b + llama3.2:3b
#   ./scripts/ollama-setup.sh heavy        # adds llama3.1:8b (needs ~8GB+ RAM)
#   ./scripts/ollama-setup.sh gemma2:2b    # pull a specific model

set -euo pipefail

cd "$(dirname "$0")/.."

OLLAMA_CONTAINER="${OLLAMA_CONTAINER:-portfolio-ollama}"
OLLAMA_HOST_INTERNAL="http://127.0.0.1:11434"

profile="${1:-${MODEL_PROFILE:-medium}}"

pull_model() {
  local model="$1"
  echo "Pulling $model ..."
  docker exec -e OLLAMA_HOST="$OLLAMA_HOST_INTERNAL" "$OLLAMA_CONTAINER" ollama pull "$model"
}

if ! docker ps --format '{{.Names}}' | grep -q "^${OLLAMA_CONTAINER}$"; then
  echo "Ollama container '$OLLAMA_CONTAINER' is not running."
  echo "Start it with:  docker compose --profile llm up -d"
  exit 1
fi

case "$profile" in
  light)
    pull_model "gemma2:2b"
    ;;
  medium)
    pull_model "gemma2:2b"
    pull_model "llama3.2:3b"
    ;;
  heavy)
    pull_model "gemma2:2b"
    pull_model "llama3.2:3b"
    pull_model "llama3.1:8b"
    ;;
  *)
    pull_model "$profile"
    ;;
esac

echo ""
echo "Installed models:"
docker exec -e OLLAMA_HOST="$OLLAMA_HOST_INTERNAL" "$OLLAMA_CONTAINER" ollama list
echo ""
echo "Set in .env:  LLM_ENABLED=true  LLM_MODEL=gemma2:2b  (or your chosen model)"
echo "Restart API:   docker compose up -d portfolio-server"

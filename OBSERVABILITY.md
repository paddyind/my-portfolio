# Observability for my-portfolio

## Baseline (works without code changes)
The shared `observability-platform` stack monitors service health via **blackbox probes**, container runtime via **cAdvisor**, and **container logs** via **Promtail → Loki**.

No `/metrics` or OTLP instrumentation is required for this baseline. In Grafana, filter logs with `{container=~"portfolio-.*"}`. Default Docker host ports: frontend **`3400`**, server **`3401`** (`PORTFOLIO_HOST_*` in `.env`; see `observability-platform/docs/ARCHITECTURE.md`).

## What you already have
`my-portfolio/docker-compose.yml` and `docker-compose.override.yml` were updated to attach containers to the shared Docker network `obs_net` and to include OpenTelemetry env vars.

## How to verify
1. Start `observability-platform` (Grafana `http://localhost:23001`).
2. Start `my-portfolio` with Docker Compose.
3. In Grafana, open **Service Health, Latency, Error Rate** and check for:
   - `portfolio-server`
   - `portfolio-frontend`

## Next level (distributed traces)
**Promtail** covers Docker logs in Loki. For Tempo traces and OTLP-structured logs with trace correlation, add instrumentation (env vars alone are not enough).


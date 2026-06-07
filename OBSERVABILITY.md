# Observability for my-portfolio

## Baseline (works without code changes)
The shared `observability-platform` stack monitors service health via **blackbox probes**, container runtime via **cAdvisor**, and **container logs** via **Promtail → Loki**.

No `/metrics` or OTLP instrumentation is required for this baseline. In Grafana, filter logs with `{container=~"portfolio-.*"}`. Default Docker host ports: frontend **`3400`**, server **`3401`** (`PORTFOLIO_HOST_*` in `.env`).

## Docker Desktop (standalone)
`docker compose up --build` runs frontend + API on `portfolio-network` only. No observability stack is required.

```bash
./deploy.sh
# or
docker compose up --build -d
```

## Attach to observability-platform (optional)
When `observability-platform` is running and the `obs_net` network exists:

```bash
docker network connect obs_net portfolio-frontend
docker network connect obs_net portfolio-server
```

Verify in Grafana (`http://localhost:23001`) under **Service Health, Latency, Error Rate** for:
- `portfolio-server`
- `portfolio-frontend`

Disconnect when done:

```bash
docker network disconnect obs_net portfolio-frontend
docker network disconnect obs_net portfolio-server
```

## Next level (distributed traces)
**Promtail** covers Docker logs in Loki. For Tempo traces and OTLP-structured logs with trace correlation, add instrumentation (env vars alone are not enough).

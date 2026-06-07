# Padmanaban Varatharajan - Portfolio

A modern, responsive portfolio website built with React, Vite, and TailwindCSS. Includes a personal knowledge workspace ("My Space") backed by an Express API. Optimized for corporate networks and cloud deployment.

## Quick Start

### Local development (frontend + API)

```bash
# Install dependencies (root + server)
npm install
npm install --prefix server

# Start Vite dev server (port 5173) and Express API (port 3001)
npm run dev
```

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001
- API requests are proxied via Vite (`/api` → `VITE_API_BASE_URL`, default `http://localhost:3001`)

### Docker Desktop (production-like stack)

```bash
# Copy env defaults (optional — compose has built-in defaults)
cp .env.example .env

# Build and start frontend + API
docker compose up --build -d

# Or use the helper script
./deploy.sh
```

- **Frontend**: http://localhost:3400 (override with `PORTFOLIO_HOST_FRONTEND_PORT`)
- **API (direct)**: http://localhost:3401 (override with `PORTFOLIO_HOST_SERVER_PORT`)
- **API (via nginx proxy)**: http://localhost:3400/api/ — used automatically by the frontend in Docker
- **Logs**: `docker compose logs -f`
- **Stop**: `docker compose down`

### Private LLM (Ollama in Docker Desktop)

Runs **Gemma, Llama, or any Ollama model** in a separate container — no data leaves your machine.

```bash
# 1. Start portfolio + Ollama container
docker compose --profile llm up --build -d

# 2. Pull models for your machine (see profiles below)
chmod +x ./scripts/ollama-setup.sh
./scripts/ollama-setup.sh medium

# 3. Enable AI in .env
cp .env.example .env
# Edit: LLM_ENABLED=true  LLM_MODEL=gemma2:2b

# 4. Restart API to pick up env
docker compose up -d portfolio-server
```

| Model profile | Models pulled | Approx. RAM |
|---------------|---------------|-------------|
| `light` | gemma2:2b | ~4 GB |
| `medium` | gemma2:2b + llama3.2:3b | ~6–8 GB |
| `heavy` | + llama3.1:8b | ~12 GB+ |

**Ports:** Ollama API at http://localhost:3420 (container internal: `ollama:11434`)

**In the app:** open **Private LLM** panel → turn **AI mode** on → use on Interview Refresher (expand topic) or My Preparation (generate scenario).

Pull a specific model: `./scripts/ollama-setup.sh llama3.2:3b`

Optional observability attachment: see `OBSERVABILITY.md`.

## Static assets

Add these files to `public/` before deploying:

| File | Purpose |
|------|---------|
| `public/profile.jpg` | Hero profile photo (falls back to initials avatar if missing) |
| `public/resume.pdf` | Downloadable resume linked from Resume and Contact pages |

## Site structure

| Route | Page |
|-------|------|
| `/` | Home (hero) |
| `/professional` | Career, experience, skills |
| `/academic` | Education and certifications |
| `/resume` | Interactive resume (synced with Professional/Academic data) |
| `/contact` | Contact form and details |
| `/personal` | Personal overview |
| `/family` | Password-protected family section |
| `/hobbies` | Hobbies and interests |
| `/my-space` | Knowledge workspace hub |
| `/my-space/learnings` | Interview refresher — key points, learn-more text, article/video refs; add personal topics |
| `/my-space/knowledge-check` | Flashcards & timed MCQ from **your knowledge base** or curated bank (attempts persisted) |
| `/my-space/interviews` | Interview Q&A |
| `/my-space/preparation` | Scenario generator (AI toggle when LLM enabled) |

## Project structure

```
my-portfolio/
├── src/
│   ├── components/     # Header, Hero, Footer, My Space widgets
│   ├── pages/          # Route pages
│   ├── services/       # API client wrappers
│   └── App.jsx         # Routes and shared layout
├── server/             # Express API (JSON file database)
├── public/             # Static assets (profile.jpg, resume.pdf, favicon)
├── docker/             # Dockerfiles for frontend and backend
├── deployments/        # Helm charts and K8s manifests
├── docker-compose.yml
└── package.json
```

## Development commands

```bash
npm run dev              # Frontend + backend concurrently
npm run dev:frontend     # Vite only (port 5173)
npm run dev:backend      # Express API only (port 3001)
npm run build            # Production frontend build
npm run preview          # Preview production build
```

## Environment variables

| Variable | Default | Used by |
|----------|---------|---------|
| `VITE_API_BASE_URL` | *(empty)* | Optional override for API base URL. Leave unset for local dev (Vite proxy) and Docker (nginx proxy). |
| `LLM_ENABLED` | `false` | Enable Ollama-backed AI endpoints |
| `LLM_MODEL` | `gemma2:2b` | Model name (must be pulled in Ollama) |
| `OLLAMA_HOST` | `http://ollama:11434` | Ollama API (compose network) |
| `PORTFOLIO_HOST_OLLAMA_PORT` | `3420` | Host port to Ollama UI/API |
| `PORTFOLIO_HOST_FRONTEND_PORT` | `3400` | Docker Compose host port |
| `PORTFOLIO_HOST_SERVER_PORT` | `3401` | Docker Compose host port |

## Technical stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, React Router
- **Backend**: Express, JSON file database, optional Ollama integration
- **Production**: Nginx (frontend container), Docker Compose, Helm/K8s ready
- **Observability**: Integrated with `observability-platform` — see `OBSERVABILITY.md`

## Knowledge base workflow

1. **Review** curated topics on Interview Refresher — expand **Learn more** for depth and external links.
2. **Add** your own topics, key points, references, and notes (marked private by default for Phase 2).
3. **Test** on Knowledge Check using **My knowledge base** — questions are generated from your content.
4. **Track** attempts over time; weak areas guide what to add next.

## Troubleshooting

### API errors on My Space pages

Ensure the backend is running (`npm run dev:backend` or Docker Compose). The frontend expects the API at `VITE_API_BASE_URL`.

### Resume PDF not loading

Place your resume at `public/resume.pdf`. The interactive resume page works without it, but download/embed links require the file.

### Port already in use

```bash
lsof -i :5173   # Vite dev
lsof -i :3001   # Express API
lsof -i :3400   # Docker frontend
```

## License

Personal portfolio project — © Padmanaban Varatharajan

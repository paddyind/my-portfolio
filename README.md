# Padmanaban Varatharajan - Portfolio

A modern, responsive portfolio website built with React, Vite, and TailwindCSS. Optimized for corporate networks and cloud deployment.

## 🚀 Quick Start

### Option 1: One-Click Deployment
```bash
./deploy.sh
```

### Option 2: Manual Steps
```bash
# 1. Build locally
npm run build

# 2. Build Docker image
docker build -t portfolio:latest .

# 3. Run container
docker run -d -p 8080:8080 --name portfolio-app portfolio:latest
```

## 🌐 Access Your Portfolio

- **Main Application**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

## 📁 Project Structure

```
my-portfolio/
├── src/                    # React application source
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   └── App.jsx            # Main app component
├── public/                # Static assets
├── dist/                  # Built application (after npm run build)
├── nginx.conf            # Nginx configuration for production
├── Dockerfile            # Docker container configuration
├── docker-compose.yml    # Docker Compose for easy deployment
├── deploy.sh             # One-click deployment script
└── package.json          # Node.js dependencies and scripts
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Commands

```bash
# Build image
docker build -t portfolio:latest .

# Run container
docker run -d -p 8080:8080 --name portfolio-app portfolio:latest

# Check status
docker ps

# View logs
docker logs portfolio-app

# Stop container
docker stop portfolio-app

# Remove container
docker rm portfolio-app
```

## 🌩️ Cloud Deployment

This application is cloud-ready and can be deployed to:

- **Docker Hub**: `docker push your-username/portfolio:latest`
- **AWS EKS**: Use `helm/` directory for Kubernetes deployment
- **Google GKE**: Use `k8s/` manifests
- **Google Cloud Run**: `gcloud run deploy --source .`

## 🏥 Health Monitoring

- Health endpoint: `/health` returns "healthy" when running
- Docker health checks enabled
- Kubernetes readiness/liveness probes configured

## 🔒 Security Features

- Nginx security headers
- Gzip compression enabled
- Static asset caching
- Client-side routing support

## 📊 Technical Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Build Tool**: Vite (fast builds & dev server)
- **Web Server**: Nginx (production)
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes ready (Helm charts included)

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Container Won't Start
```bash
# Check logs
docker logs portfolio-app

# Rebuild without cache
docker build --no-cache -t portfolio:latest .
```

### Corporate Network Issues
This setup is optimized for corporate environments:
- Proxy configuration handled automatically
- Pre-built assets approach (no npm in container)
- Works behind firewalls and proxies

## 📝 License

Personal portfolio project - © Padmanaban Varatharajan

---

**Ready to use!** 🎉 Just run `./deploy.sh` and visit http://localhost:8080
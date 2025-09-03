# 🐳 Docker Quick Start Guide

This guide will get your portfolio running with Docker in minutes.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## 🚀 Quick Start Commands

### Development Mode
```bash
# Start development environment
docker-compose up --build portfolio-dev
```
**Access at:** [http://localhost:8080](http://localhost:8080)

### Production Mode
```bash
# Start production environment
docker-compose --profile production up --build portfolio-prod
```
**Access at:** [http://localhost:8081](http://localhost:8081)

## 🛠️ Development Features

- ✅ **Hot Reloading**: Changes in source code automatically refresh the browser
- ✅ **Volume Mounting**: Your local files are synced with the container
- ✅ **Node Modules**: Installed inside container, excluded from git
- ✅ **Port Mapping**: Container port 5173 mapped to host port 8080

## 🏭 Production Features

- ✅ **Optimized Build**: Multi-stage build for minimal image size
- ✅ **Nginx Server**: High-performance web server
- ✅ **Gzip Compression**: Assets are compressed for faster loading
- ✅ **Security Headers**: Production security headers configured
- ✅ **Health Checks**: Built-in health check endpoint at `/health`

## 🔧 Common Commands

```bash
# Build all images
docker-compose build

# Start in detached mode
docker-compose up -d portfolio-dev

# View logs
docker-compose logs -f portfolio-dev

# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
netstat -tulpn | grep :3000

# Kill the process or use different port
docker-compose -f docker-compose.yml up --build portfolio-dev -p 3001:3000
```

### File Permission Issues (Linux/WSL)
```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or use Docker with user mapping
docker-compose run --user $(id -u):$(id -g) portfolio-dev
```

### Hot Reload Not Working
- Ensure `CHOKIDAR_USEPOLLING=true` is set in environment variables
- Check that volumes are properly mounted in `docker-compose.override.yml`

## 📦 Image Information

- **Development Image**: ~500MB (includes dev dependencies)
- **Production Image**: ~50MB (optimized with multi-stage build)
- **Base Images**: Node.js 18 Alpine, Nginx Alpine

## 🔒 Security Notes

- Production image runs as non-root user
- Only necessary files are included in production build
- Security headers are configured in Nginx
- Health checks are configured for monitoring

---

**Need help?** Check the main [README.md](README.md) for more detailed information.

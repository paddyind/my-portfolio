# 🛠️ Troubleshooting Guide

Common issues and solutions for running the portfolio application.

## 🪟 Windows Port Issues

### Problem: Port 3000 Permission Denied
```
Error response from daemon: ports are not available: exposing port TCP 0.0.0.0:3000 -> 127.0.0.1:0: 
listen tcp 0.0.0.0:3000: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

### Solution:
This is a common Windows issue where certain ports are reserved by the system.

**Option 1: Use Different Port (Already configured)**
The project is now configured to use port 3030 instead of 3000.

**Option 2: Check Reserved Ports**
```cmd
# Check which ports are reserved
netsh int ipv4 show excludedportrange protocol=tcp
```

**Option 3: Release Reserved Ports (Advanced)**
```cmd
# Run as Administrator
net stop winnat
netsh int ipv4 add excludedportrange protocol=tcp startport=3000 numberofports=1
net start winnat
```

## 🐳 Docker Issues

### Problem: Docker Compose File Not Found
```
no configuration file provided: not found
```

### Solution:
Make sure you're in the correct directory:
```bash
cd my-portfolio
ls -la  # Should see docker-compose.yml
docker-compose up --build portfolio-dev
```

### Problem: Port Already in Use
```
Error starting userland proxy: listen tcp4 0.0.0.0:3030: bind: address already in use
```

### Solution:
```bash
# Check what's using the port
netstat -tulpn | grep :3030

# Option 1: Kill the process
lsof -ti:3030 | xargs kill -9

# Option 2: Use different port
docker-compose up --build portfolio-dev -p 3040:3030
```

### Problem: Container Build Fails
```
ERROR [development 4/6] RUN npm install
```

### Solution:
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache portfolio-dev

# Check available disk space
docker system df
```

## 🔧 Development Issues

### Problem: Hot Reloading Not Working

### Solution:
1. **Check Environment Variables:**
   ```yaml
   environment:
     - CHOKIDAR_USEPOLLING=true
     - FAST_REFRESH=true
   ```

2. **Check Volume Mounting:**
   ```yaml
   volumes:
     - .:/app
     - /app/node_modules
   ```

3. **File Permissions (Linux/WSL):**
   ```bash
   sudo chown -R $USER:$USER .
   ```

### Problem: Node Modules Issues

### Solution:
```bash
# Clear node_modules volume
docker-compose down -v
docker volume rm my-portfolio_portfolio_node_modules

# Rebuild
docker-compose up --build portfolio-dev
```

## ☸️ Kubernetes Issues

### Problem: Image Not Found
```
Failed to pull image "padmanaban-portfolio:latest": rpc error: code = NotFound
```

### Solution:
```bash
# Build the image first
docker build -t padmanaban-portfolio:latest .

# For minikube, use local registry
eval $(minikube docker-env)
docker build -t padmanaban-portfolio:latest .
```

### Problem: LoadBalancer Pending
```
EXTERNAL-IP   <pending>
```

### Solution:
```bash
# For local clusters (minikube)
minikube tunnel

# Or use NodePort instead
kubectl patch svc portfolio-service -p '{"spec":{"type":"NodePort"}}'
```

## 🌐 Network Issues

### Problem: Can't Access from Other Devices

### Solution:
1. **Check Host Binding:**
   - Ensure `host: '0.0.0.0'` in vite.config.js
   - Use your machine's IP: `http://192.168.1.100:3030`

2. **Windows Firewall:**
   ```cmd
   # Allow port through firewall
   netsh advfirewall firewall add rule name="Portfolio Dev" dir=in action=allow protocol=TCP localport=3030
   ```

3. **Docker Desktop Settings:**
   - Enable "Expose daemon on tcp://localhost:2375"

## 📱 Mobile/Responsive Issues

### Problem: Layout Breaks on Mobile

### Solution:
1. **Check Viewport Meta:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. **Test Responsive Design:**
   - Use browser dev tools
   - Test on actual devices
   - Check TailwindCSS breakpoints

## 🔍 Performance Issues

### Problem: Slow Loading

### Solution:
1. **Production Build:**
   ```bash
   docker-compose --profile production up --build
   ```

2. **Check Network Tab:**
   - Enable compression in nginx.conf
   - Optimize images
   - Use CDN for fonts

3. **Bundle Analysis:**
   ```bash
   npm run build -- --analyze
   ```

## 🆘 Getting Help

If you're still experiencing issues:

1. **Check Docker Logs:**
   ```bash
   docker-compose logs -f portfolio-dev
   ```

2. **Check System Resources:**
   ```bash
   docker stats
   ```

3. **Environment Information:**
   ```bash
   docker version
   docker-compose version
   node --version
   npm --version
   ```

4. **Create Issue:**
   Include the above information when reporting issues.

---

**Still need help?** Check the main [README.md](README.md) or create an issue with detailed information about your setup and error messages.



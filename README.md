# Padmanaban Varatharajan - Personal Portfolio

A modern, responsive personal portfolio website built with React and TailwindCSS, fully containerized with Docker and Kubernetes support.

## Features

- 🏠 **Homepage** with personal introduction, bio, and photo placeholder
- 📄 **Resume Section** with embedded PDF viewer and download functionality
- 🔗 **LinkedIn Integration** with direct profile linking
- 📧 **Contact Form** with email functionality
- 📱 **Fully Responsive** design that works on all devices
- 🎨 **Modern UI** with smooth animations and gradients
- ⚡ **Fast Performance** with Vite build tool
- 🐳 **Docker Ready** with multi-stage builds for development and production
- ☸️ **Kubernetes Ready** with complete manifests and deployment scripts

## Tech Stack

- **Frontend**: React 18
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes
- **Web Server**: Nginx (production)

## Getting Started

### 🐳 Docker Development (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd my-portfolio
   ```

2. **Start development environment:**
   ```bash
   docker-compose up --build portfolio-dev
   ```

3. **Access the application:**
   - Development: [http://localhost:8080](http://localhost:8080)

> **Note:** If you change dependencies in `package.json`, you may need to remove the `node_modules` volume to ensure dependencies are re-installed correctly. Run `docker-compose down -v` before running `docker-compose up --build`.

### Troubleshooting
- If you encounter `npm ERR! invalid` errors inside the container, it's likely due to a stale `node_modules` volume. Run `docker-compose down -v` to remove it and then rebuild.

### 🏭 Docker Production

1. **Start production environment:**
   ```bash
   docker-compose --profile production up --build portfolio-prod
   ```

2. **Access the application:**
   - Production: [http://localhost:8081](http://localhost:8081)

### 📜 Using Scripts (Linux/macOS/WSL)

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Development
./scripts/docker-dev.sh

# Production
./scripts/docker-prod.sh

# Build all images
./scripts/docker-build.sh
```

### 🛠️ Traditional Development Setup

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

#### Installation
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access at:** [http://localhost:5173](http://localhost:5173)

### 🏗️ Building for Production

```bash
# Traditional build
npm run build

# Docker build
docker build --target production -t padmanaban-portfolio:latest .
```

## Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.jsx`):
   - Update name, bio, and skills
   - Replace LinkedIn URL
   - Add your photo (replace photo placeholder)

2. **Resume Section** (`src/components/Resume.jsx`):
   - Update professional summary
   - Add your work experience
   - Update education details
   - Modify skills and certifications
   - Add your actual resume PDF to the `public` folder

3. **Contact Section** (`src/components/Contact.jsx`):
   - Update contact information
   - Replace social media links
   - Update email address

### Resume PDF

1. Add your resume PDF file to the `public` folder as `resume.pdf`
2. The website will automatically link to it for downloads and embedded viewing

### Photo

Replace the photo placeholder in the Hero section:
1. Add your photo to the `public` folder
2. Update the `Hero.jsx` component to display your actual photo

### Colors and Styling

The website uses a blue-purple color scheme. You can customize colors by:
1. Modifying the TailwindCSS classes in components
2. Updating the gradient combinations
3. Changing color variables in `tailwind.config.js`

## 🚀 Deployment Options

### 🐳 Docker Deployment

#### Docker Hub
```bash
# Tag and push to Docker Hub
docker tag padmanaban-portfolio:latest your-username/padmanaban-portfolio:latest
docker push your-username/padmanaban-portfolio:latest
```

#### Cloud Providers
- **AWS ECS/Fargate**: Use the Docker image
- **Google Cloud Run**: Deploy directly from container
- **Azure Container Instances**: Simple container deployment

### ☸️ Kubernetes Deployment with Helm

#### Prerequisites
```bash
# Install Helm (run once)
./scripts/helm-install.sh
```

#### Environment-based Deployments
```bash
# Development
./scripts/k8s-deploy.sh dev

# Staging  
./scripts/k8s-deploy.sh staging

# Production
./scripts/k8s-deploy.sh prod
```

#### Manual Helm Deployment
```bash
# Build image first
docker build -t padmanaban-portfolio:latest .

# Deploy with Helm
helm upgrade --install portfolio-dev ./helm/portfolio \
  --namespace portfolio-dev \
  --values ./helm/values-dev.yaml \
  --create-namespace

# Check deployment status
kubectl get pods -n portfolio-dev
kubectl get services -n portfolio-dev
```

#### Production Kubernetes Setup
1. **Update domain** in `helm/values-prod.yaml`
2. **Configure SSL certificates** (cert-manager)
3. **Deploy**: `./scripts/k8s-deploy.sh prod`

### 🌐 Traditional Static Hosting

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git  
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Any static hosting service**: Upload the `dist` folder

## 🐳 Docker Configuration

### Multi-stage Dockerfile
- **Development Stage**: Hot reloading with Vite
- **Production Stage**: Optimized build served by Nginx

### Docker Compose Services
- **portfolio-dev**: Development environment with hot reloading
- **portfolio-prod**: Production environment with Nginx

### Volume Management
- Node modules are installed inside the container
- Source code is mounted for development hot reloading
- Production builds are self-contained

### Environment Variables

For the contact form to work with a backend service, you may need to add:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## ☸️ Kubernetes Configuration

### Manifests Included
- **namespace.yaml**: Isolated namespace for the portfolio
- **deployment.yaml**: Application deployment with 3 replicas
- **service.yaml**: LoadBalancer service (included in deployment.yaml)
- **configmap.yaml**: Environment configuration
- **ingress.yaml**: Ingress for external access (configure your domain)

### Resource Requirements
- **CPU**: 50m requests, 100m limits
- **Memory**: 64Mi requests, 128Mi limits
- **Health Checks**: Liveness and readiness probes configured

## 📁 Project Structure

```
my-portfolio/
├── 📁 public/
│   ├── index.html
│   ├── favicon.svg
│   └── resume.pdf (add your resume here)
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Header.jsx (Navigation)
│   │   ├── Hero.jsx (Homepage)
│   │   ├── Resume.jsx (Resume section)
│   │   ├── Contact.jsx (Contact form)
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── 📁 k8s/ (Legacy Kubernetes manifests)
├── 📁 helm/ (Helm charts - recommended)
│   ├── 📁 portfolio/
│   │   ├── Chart.yaml
│   │   ├── values.yaml
│   │   └── 📁 templates/
│   ├── values-dev.yaml
│   ├── values-staging.yaml
│   └── values-prod.yaml
├── 📁 scripts/ (Deployment scripts)
│   ├── docker-dev.sh
│   ├── docker-prod.sh
│   ├── docker-build.sh
│   ├── k8s-deploy.sh (Helm-based)
│   └── helm-install.sh
├── 🐳 Dockerfile (Multi-stage build)
├── 🐳 docker-compose.yml (Container orchestration)
├── 🐳 docker-compose.override.yml (Dev overrides)
├── 📋 .dockerignore (Docker build exclusions)
├── 📋 .gitignore (Git exclusions - includes node_modules)
├── 🌐 nginx.conf (Production web server config)
├── 📦 package.json
├── ⚙️ vite.config.js
├── 🎨 tailwind.config.js
└── 📋 README.md
```

## Features Checklist

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with animations
- ✅ SEO-friendly structure
- ✅ Fast loading times
- ✅ Accessible navigation
- ✅ Contact form integration
- ✅ Resume PDF integration
- ✅ Social media links
- ✅ Professional presentation

## Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ and ☕ by Padmanaban Varatharajan**
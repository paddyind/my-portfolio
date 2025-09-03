#!/bin/bash

# Helm installation and setup script

set -e

echo "⚡ Setting up Helm for Portfolio deployment..."

# Function to install Helm
install_helm() {
    echo "📦 Installing Helm..."
    
    # Detect OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
        sudo apt-get install apt-transport-https --yes
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
        sudo apt-get update
        sudo apt-get install helm
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install helm
        else
            echo "❌ Homebrew not found. Please install Homebrew first or install Helm manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows
        if command -v choco &> /dev/null; then
            choco install kubernetes-helm
        elif command -v scoop &> /dev/null; then
            scoop install helm
        else
            echo "❌ Please install Helm manually from https://helm.sh/docs/intro/install/"
            exit 1
        fi
    else
        echo "❌ Unsupported OS. Please install Helm manually from https://helm.sh/docs/intro/install/"
        exit 1
    fi
}

# Check if Helm is installed
if ! command -v helm &> /dev/null; then
    echo "🔧 Helm not found. Installing..."
    install_helm
else
    echo "✅ Helm is already installed"
    helm version
fi

# Add commonly used Helm repositories
echo "📚 Adding Helm repositories..."

# NGINX Ingress Controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

# Cert-manager for SSL certificates
helm repo add jetstack https://charts.jetstack.io

# Prometheus for monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Update repositories
helm repo update

echo "🎯 Available deployment commands:"
echo ""
echo "Development:  ./scripts/k8s-deploy.sh dev"
echo "Staging:      ./scripts/k8s-deploy.sh staging" 
echo "Production:   ./scripts/k8s-deploy.sh prod"
echo ""
echo "📋 Helm Chart Validation:"
helm lint ./helm/portfolio

echo "✅ Helm setup complete!"
echo "🚀 You can now deploy using: ./scripts/k8s-deploy.sh [environment]"

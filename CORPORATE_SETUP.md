# Corporate Environment Setup

This document explains how to set up the portfolio application for corporate environments with proxy requirements.

## Quick Setup

1. **Create corporate environment file:**
   ```bash
   cp corporate.env.example corporate.env
   # Edit corporate.env with your actual proxy settings
   ```

2. **Build and run:**
   ```bash
   ./scripts/docker-build.sh corporate
   docker run -p 8080:8080 padmanaban-portfolio:corporate
   ```

## Corporate Environment File

The `corporate.env` file contains sensitive corporate proxy settings and is automatically ignored by git.

### Example corporate.env:
```bash
# Corporate Environment Configuration
HTTP_PROXY=http://your-corporate-proxy:port
HTTPS_PROXY=http://your-corporate-proxy:port
NO_PROXY=localhost,127.0.0.1,.local,.yourdomain.com

# Corporate-specific build settings
CORPORATE_BUILD=true
CORPORATE_PROXY_ENABLED=true
```

## Security Notes

- ✅ The `corporate.env` file is in `.gitignore`
- ✅ No hardcoded corporate settings in the codebase
- ✅ Proxy settings are loaded from environment variables
- ✅ Safe to clone and use on personal machines

## Troubleshooting

### Proxy Not Working
1. Verify your proxy settings in `corporate.env`
2. Test proxy connectivity: `curl -x $HTTP_PROXY http://www.google.com`
3. Check Docker proxy settings: `docker info | grep -i proxy`

### Build Issues
1. Ensure `corporate.env` exists and has correct proxy settings
2. Try building without proxy first: `./scripts/docker-build.sh production`
3. Check Docker daemon proxy configuration

## Migration from Hardcoded Settings

If you previously had hardcoded corporate settings in the codebase:
1. All hardcoded proxy URLs have been replaced with environment variables
2. Create `corporate.env` with your specific settings
3. The application will work the same way but with better security

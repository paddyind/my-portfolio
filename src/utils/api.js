// API utility functions
const getApiBaseUrl = () => {
  // In production, use environment variable or default to localhost:3001
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
};

export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

export const apiPost = async (endpoint, data) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const apiGet = async (endpoint) => {
  return apiRequest(endpoint);
};

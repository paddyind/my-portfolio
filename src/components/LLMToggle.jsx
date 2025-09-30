import React, { useState, useEffect } from 'react';
import { Settings, Brain, AlertCircle, CheckCircle2 } from 'lucide-react';
import { apiGet } from '../utils/api';

const LLMToggle = () => {
  const [llmStatus, setLLMStatus] = useState({
    enabled: false,
    model: 'llama2',
    features: [],
    loading: true
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchLLMStatus();
  }, []);

  const fetchLLMStatus = async () => {
    try {
      const status = await apiGet('/api/llm/status');
      setLLMStatus({ ...status, loading: false });
    } catch (error) {
      console.error('Failed to fetch LLM status:', error);
      setLLMStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (llmStatus.loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
        <span className="text-sm">Loading AI status...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleSettings}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="AI/LLM Settings"
      >
        <Brain className={`h-4 w-4 ${llmStatus.enabled ? 'text-green-600' : 'text-gray-400'}`} />
        <span className="text-sm">
          AI: {llmStatus.enabled ? 'Enabled' : 'Disabled'}
        </span>
        <Settings className="h-3 w-3 text-gray-400" />
      </button>

      {showSettings && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">AI Configuration</h3>
            <button
              onClick={toggleSettings}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center space-x-2">
              {llmStatus.enabled ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-gray-400" />
              )}
              <span className={`text-sm font-medium ${llmStatus.enabled ? 'text-green-700' : 'text-gray-500'}`}>
                {llmStatus.enabled ? 'AI Features Available' : 'AI Features Disabled'}
              </span>
            </div>

            {/* Model Info */}
            {llmStatus.enabled && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Model:</strong> {llmStatus.model}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Features: {llmStatus.features.join(', ')}
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">How to Enable AI:</h4>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. Install Ollama locally or use remote service</li>
                <li>2. Set LLM_ENABLED=true in environment</li>
                <li>3. Configure LLM_MODEL (default: llama2)</li>
                <li>4. Restart the backend service</li>
              </ol>
            </div>

            {/* Future Features Preview */}
            <div className="border-t pt-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">🚀 Coming Soon:</h4>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• MCP Tools Integration</li>
                <li>• Web Scraping (DuckDuckGo)</li>
                <li>• Smart Interview Questions</li>
                <li>• Learning Path Suggestions</li>
                <li>• Code Review Assistant</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMToggle;

import React, { useState, useEffect } from 'react';
import { Settings, Brain, AlertCircle, CheckCircle2, Wifi, WifiOff } from 'lucide-react';
import { getLlmStatus, isAiModeOn, setAiModeOn } from '../services/llmService';

const LLMToggle = () => {
  const [llmStatus, setLLMStatus] = useState({
    enabled: false,
    connected: false,
    model: 'gemma2:2b',
    available_models: [],
    features: [],
    loading: true,
  });
  const [aiMode, setAiMode] = useState(isAiModeOn());
  const [showSettings, setShowSettings] = useState(false);

  const fetchLLMStatus = async () => {
    try {
      const status = await getLlmStatus();
      setLLMStatus({ ...status, loading: false });
    } catch (error) {
      console.error('Failed to fetch LLM status:', error);
      setLLMStatus((prev) => ({ ...prev, loading: false, connected: false }));
    }
  };

  useEffect(() => {
    fetchLLMStatus();
    setAiMode(isAiModeOn());
  }, []);

  const handleAiModeToggle = () => {
    const next = !aiMode;
    setAiMode(next);
    setAiModeOn(next);
  };

  const aiReady = llmStatus.enabled && llmStatus.connected && aiMode;

  if (llmStatus.loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
        <span className="text-sm">Checking AI...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          aiReady ? 'border-green-300 bg-green-50' : ''
        }`}
        title="Private LLM (Ollama) settings"
      >
        <Brain className={`h-4 w-4 ${aiReady ? 'text-green-600' : 'text-gray-400'}`} />
        <span className="text-sm">
          AI: {aiReady ? 'On' : aiMode ? 'Waiting' : 'Off'}
        </span>
        <Settings className="h-3 w-3 text-gray-400" />
      </button>

      {showSettings && (
        <div className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50 p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Private LLM (Ollama)</h3>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm font-medium text-gray-800">Use AI mode (this browser)</span>
              <input
                type="checkbox"
                checked={aiMode}
                onChange={handleAiModeToggle}
                className="h-4 w-4 text-indigo-600 rounded"
              />
            </label>

            <div className="flex items-center space-x-2">
              {llmStatus.enabled && llmStatus.connected ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm text-gray-700">
                Server: {llmStatus.enabled ? (llmStatus.connected ? 'Ollama connected' : 'Ollama unreachable') : 'LLM_ENABLED=false'}
              </span>
            </div>

            {llmStatus.enabled && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p><strong>Model:</strong> {llmStatus.model}</p>
                {llmStatus.available_models?.length > 0 && (
                  <p className="mt-1"><strong>Pulled:</strong> {llmStatus.available_models.join(', ')}</p>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 space-y-2">
              <p className="font-semibold text-gray-800">Docker Desktop setup</p>
              <ol className="list-decimal list-inside space-y-1">
                <li><code>docker compose --profile llm up -d</code></li>
                <li><code>./scripts/ollama-setup.sh medium</code></li>
                <li>Set <code>LLM_ENABLED=true</code> in <code>.env</code></li>
                <li><code>docker compose up -d portfolio-server</code></li>
                <li>Turn on <strong>AI mode</strong> above</li>
              </ol>
            </div>

            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">When AI mode is on:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Brainstorm / expand topics on Interview Refresher</li>
                <li>• Generate scenarios on My Preparation</li>
                <li>• All inference stays in your local Ollama container</li>
              </ul>
            </div>

            <button
              onClick={fetchLLMStatus}
              className="w-full text-sm py-2 border rounded-lg hover:bg-gray-50"
            >
              Refresh connection status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMToggle;

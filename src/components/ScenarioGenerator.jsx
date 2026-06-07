import React, { useState, useEffect } from 'react';
import { generateScenarioWithAi, isAiModeOn } from '../services/llmService';
import { generateNewScenario } from '../services/preparationService';

const ScenarioGenerator = ({ initialScenarios }) => {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState('Technology Leadership');

  useEffect(() => {
    if (initialScenarios.length > 0) {
      setCurrentScenario(initialScenarios[0]);
    }
  }, [initialScenarios]);

  const handleGenerateNewScenario = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newScenario = isAiModeOn()
        ? await generateScenarioWithAi(topic)
        : await generateNewScenario({ topic, useAI: false });
      setScenarios([...scenarios, newScenario]);
      setCurrentScenario(newScenario);
    } catch (err) {
      setError('Failed to generate a new scenario. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Leadership Scenario Generator</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Scenario topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm"
          placeholder="e.g. System Design, Generative AI, Telecom BSS"
        />
        {isAiModeOn() && (
          <p className="text-xs text-green-700 mt-1">AI mode on — uses private Ollama when server LLM is enabled</p>
        )}
      </div>

      {currentScenario ? (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{currentScenario.topic}</h3>
          <p className="mt-2">{currentScenario.scenario}</p>
          {currentScenario.generated_by && (
            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {currentScenario.generated_by}
            </span>
          )}
        </div>
      ) : (
        <p>No scenarios available. Click the button to generate one.</p>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        onClick={handleGenerateNewScenario}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 mt-4"
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : isAiModeOn() ? 'Generate with AI' : 'Generate Scenario'}
      </button>
    </div>
  );
};

export default ScenarioGenerator;
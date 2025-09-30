import React, { useState, useEffect } from 'react';
import { generateNewScenario } from '../services/preparationService';

const ScenarioGenerator = ({ initialScenarios }) => {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialScenarios.length > 0) {
      setCurrentScenario(initialScenarios[0]);
    }
  }, [initialScenarios]);

  const handleGenerateNewScenario = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newScenario = await generateNewScenario();
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
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Leadership Scenario Generator</h2>

      {currentScenario ? (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{currentScenario.topic}</h3>
          <p className="mt-2">{currentScenario.scenario}</p>
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
        {isGenerating ? 'Generating...' : 'Generate New Scenario'}
      </button>
    </div>
  );
};

export default ScenarioGenerator;
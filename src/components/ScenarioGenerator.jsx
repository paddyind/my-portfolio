import React, { useState, useEffect } from 'react';
import { generateNewScenario } from '../services/preparationService';

const ScenarioGenerator = ({ initialScenarios }) => {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [currentScenario, setCurrentScenario] = useState(null);

  useEffect(() => {
    if (scenarios.length > 0) {
      setCurrentScenario(scenarios[0]);
    }
  }, [scenarios]);

  const handleGenerateNewScenario = () => {
    generateNewScenario().then((newScenario) => {
      setScenarios([...scenarios, newScenario]);
      setCurrentScenario(newScenario);
    });
  };

  if (!currentScenario) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Leadership Scenario Generator</h2>
        <p>No scenarios loaded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Leadership Scenario Generator</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{currentScenario.topic}</h3>
        <p className="mt-2">{currentScenario.scenario}</p>
      </div>
      <button
        onClick={handleGenerateNewScenario}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Generate New Scenario
      </button>
    </div>
  );
};

export default ScenarioGenerator;
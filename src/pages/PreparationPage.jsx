import React, { useState, useEffect } from 'react';
import { getPreparationScenarios } from '../services/preparationService';
import ScenarioGenerator from '../components/ScenarioGenerator';
import LLMToggle from '../components/LLMToggle';

const PreparationPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const data = await getPreparationScenarios();
        setScenarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">My Preparation</h1>
          <p className="page-hero-subtitle">
            Leadership and system-design scenario practice
          </p>
          <div className="mt-6 flex justify-center">
            <LLMToggle />
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          {loading && (
            <div className="text-center py-10 text-gray-600">Loading scenarios...</div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          )}

          {!loading && !error && <ScenarioGenerator initialScenarios={scenarios} />}
        </div>
      </main>
    </div>
  );
};

export default PreparationPage;

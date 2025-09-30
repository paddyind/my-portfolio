import React, { useState, useEffect } from 'react';
import { getPreparationScenarios } from '../services/preparationService';
import ScenarioGenerator from '../components/ScenarioGenerator';

const PreparationPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPreparationScenarios().then((data) => {
      setScenarios(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Preparation</h1>
      <ScenarioGenerator initialScenarios={scenarios} />
    </div>
  );
};

export default PreparationPage;
export const getPreparationScenarios = async () => {
  const response = await fetch('/api/preparation-scenarios');
  if (!response.ok) {
    throw new Error('Failed to fetch preparation scenarios');
  }
  return response.json();
};

export const generateNewScenario = async () => {
  const response = await fetch('/api/preparation-scenarios/generate', {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to generate new scenario');
  }
  return response.json();
};
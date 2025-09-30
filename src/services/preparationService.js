import { apiGet, apiPost } from '../utils/api';

export const getPreparationScenarios = async () => {
  return apiGet('/api/preparation-scenarios');
};

export const generateNewScenario = async (data = {}) => {
  return apiPost('/api/preparation-scenarios/generate', data);
};
import { apiGet, apiPost } from '../utils/api';

const AI_MODE_KEY = 'portfolio_ai_mode';

export const isAiModeOn = () => localStorage.getItem(AI_MODE_KEY) === 'true';

export const setAiModeOn = (enabled) => {
  localStorage.setItem(AI_MODE_KEY, enabled ? 'true' : 'false');
};

export const getLlmStatus = async () => {
  return apiGet('/api/llm/status');
};

export const brainstormTopic = async ({ topic, category, context }) => {
  return apiPost('/api/llm/brainstorm', {
    topic,
    category,
    context,
    useAI: isAiModeOn(),
  });
};

export const expandLearningWithAi = async (learningId) => {
  return apiPost('/api/llm/expand-learning', {
    learning_id: learningId,
    useAI: isAiModeOn(),
  });
};

export const applyBrainstorm = async (payload) => {
  return apiPost('/api/llm/apply-brainstorm', payload);
};

export const generateScenarioWithAi = async (topic) => {
  return apiPost('/api/preparation-scenarios/generate', {
    topic,
    useAI: isAiModeOn(),
  });
};

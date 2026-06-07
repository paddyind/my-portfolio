import { apiGet, apiPost, apiPut } from '../utils/api';

export const getLearnings = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiGet(`/api/learnings${query ? `?${query}` : ''}`);
};

export const getLearningCategories = async () => {
  return apiGet('/api/learnings/categories');
};

export const createLearning = async (data) => {
  return apiPost('/api/learnings', data);
};

export const updateLearning = async (id, data) => {
  return apiPut(`/api/learnings/${id}`, data);
};

export const addKeyPoint = async (id, point) => {
  return apiPost(`/api/learnings/${id}/key-points`, { point });
};

export const addResource = async (id, resource) => {
  return apiPost(`/api/learnings/${id}/resources`, resource);
};

export const getQuizCategories = async () => {
  return apiGet('/api/quiz/categories');
};

export const getQuizQuestions = async ({ categories = [], type, limit = 10, source = 'mixed' }) => {
  const params = new URLSearchParams();
  if (categories.length > 0) params.set('categories', categories.join(','));
  if (type) params.set('type', type);
  params.set('limit', String(limit));
  params.set('source', source);
  return apiGet(`/api/quiz/questions?${params.toString()}`);
};

export const createQuizQuestion = async (data) => {
  return apiPost('/api/quiz/questions', data);
};

export const getQuizAttempts = async () => {
  return apiGet('/api/quiz/attempts');
};

export const saveQuizAttempt = async (attempt) => {
  return apiPost('/api/quiz/attempts', attempt);
};

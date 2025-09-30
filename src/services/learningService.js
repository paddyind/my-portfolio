import { apiGet } from '../utils/api';

export const getLearnings = async () => {
  return apiGet('/api/learnings');
};
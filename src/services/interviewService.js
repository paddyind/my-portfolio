import { apiGet } from '../utils/api';

export const getInterviews = async () => {
  return apiGet('/api/interviews');
};
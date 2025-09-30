export const getInterviews = async () => {
  const response = await fetch('/api/interviews');
  if (!response.ok) {
    throw new Error('Failed to fetch interviews');
  }
  return response.json();
};
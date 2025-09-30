export const getLearnings = async () => {
  const response = await fetch('/api/learnings');
  if (!response.ok) {
    throw new Error('Failed to fetch learnings');
  }
  return response.json();
};
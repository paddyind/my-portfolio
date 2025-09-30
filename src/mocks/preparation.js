export const preparationScenarios = [
  {
    id: 1,
    scenario: 'You are tasked with designing a system for a real-time chat application. What architectural patterns would you consider, and why?',
    topic: 'System Design',
  },
  {
    id: 2,
    scenario: 'You have a legacy codebase with low test coverage. How would you approach improving the test coverage without introducing breaking changes?',
    topic: 'Testing',
  },
];

export const generateNewScenario = () => {
  const newScenario = {
    id: 3,
    scenario: 'A new feature needs to be added to a critical, high-traffic API. Describe your process for developing, testing, and deploying this feature to minimize risk.',
    topic: 'API Development',
  };
  return newScenario;
};
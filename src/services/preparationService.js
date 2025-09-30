import { preparationScenarios, generateNewScenario as mockGenerateNewScenario } from '../mocks/preparation';

export const getPreparationScenarios = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(preparationScenarios);
    }, 500);
  });
};

export const generateNewScenario = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGenerateNewScenario());
    }, 1000);
  });
};
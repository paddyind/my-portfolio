import { interviews } from '../mocks/interviews';

export const getInterviews = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(interviews);
    }, 500);
  });
};
import { learnings } from '../mocks/learnings';

export const getLearnings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(learnings);
    }, 500);
  });
};
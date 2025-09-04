import questionsData from './questions.json';

export const getQuestions = async (difficulty, topic) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredQuestions = questionsData.filter(
        q => q.difficulty === difficulty && q.topic === topic
      );
      const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
      resolve(shuffled.slice(0, 5));
    }, 1000);
  });
};

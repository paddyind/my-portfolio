import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const InterviewsPage = () => {
  const [questions, setQuestions] = useState([
    {
      question: 'What is the difference between a microservices and a monolithic architecture?',
      tags: ['system design', 'architecture'],
      answer: 'A monolithic architecture is built as a single, unified unit, while a microservices architecture is a collection of smaller, independently deployable services.'
    }
  ]);

  const addQuestion = (newQuestion) => {
    // Basic duplicate detection
    const isDuplicate = questions.some(q => q.question.toLowerCase() === newQuestion.question.toLowerCase());
    if (isDuplicate) {
      alert('This question already exists!');
      return;
    }
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Interviews</h1>
      <QuestionForm onAddQuestion={addQuestion} />
      <QuestionList questions={questions} />
    </div>
  );
};

export default InterviewsPage;
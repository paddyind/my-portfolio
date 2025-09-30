import React, { useState, useEffect } from 'react';
import { getInterviews } from '../services/interviewService';
import QuestionList from '../components/QuestionList';

const InterviewsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInterviews().then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Interviews</h1>
      <QuestionList questions={questions} />
    </div>
  );
};

export default InterviewsPage;
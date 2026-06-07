import React, { useState, useEffect } from 'react';
import { getInterviews } from '../services/interviewService';
import QuestionList from '../components/QuestionList';

const InterviewsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">My Interviews</h1>
          <p className="page-hero-subtitle">
            Interview questions, answers, and preparation notes
          </p>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          {loading && (
            <div className="text-center py-10 text-gray-600">Loading interview questions...</div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          )}

          {!loading && !error && <QuestionList questions={questions} />}
        </div>
      </main>
    </div>
  );
};

export default InterviewsPage;

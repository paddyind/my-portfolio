import React, { useState, useEffect } from 'react';
import { getLearnings } from '../services/learningService';
import KnowledgeCard from '../components/KnowledgeCard';

const LearningsPage = () => {
  const [learnings, setLearnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearnings = async () => {
      try {
        const data = await getLearnings();
        setLearnings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLearnings();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Learnings</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {learnings.map((item) => (
          <KnowledgeCard key={item.id} title={item.topic} content={item.notes} />
        ))}
      </div>
    </div>
  );
};

export default LearningsPage;
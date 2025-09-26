import React from 'react';

const KnowledgeCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default KnowledgeCard;
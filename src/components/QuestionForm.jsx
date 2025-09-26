import React, { useState } from 'react';

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question) return;
    // Basic auto-tagging logic (can be expanded)
    const newTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onAddQuestion({ question, tags: newTags, answer: 'Generated answer will appear here.' });
    setQuestion('');
    setTags('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Submit an Interview Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question</label>
          <textarea
            id="question"
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the interview question"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            className="w-full px-3 py-2 border rounded-lg"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., system design, leadership, cloud"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
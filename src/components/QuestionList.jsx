import React from 'react';

const QuestionList = ({ questions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
      {questions.length === 0 ? (
        <p>No questions submitted yet.</p>
      ) : (
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="mb-6 pb-4 border-b last:border-b-0">
              <p className="text-lg font-semibold">{q.question}</p>
              <div className="mt-2">
                {q.tags.map((tag, i) => (
                  <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-600 bg-gray-50 p-3 rounded-md">{q.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
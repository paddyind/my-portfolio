import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Search Interview Questions</h2>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-lg"
        placeholder="Search for questions, topics, or answers..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
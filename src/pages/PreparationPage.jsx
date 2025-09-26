import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import QuestionList from '../components/QuestionList';
import ScenarioGenerator from '../components/ScenarioGenerator';

// Mock data - in a real app, this would likely come from a shared store or API
const allQuestions = [
  {
    question: 'What is the difference between a microservices and a monolithic architecture?',
    tags: ['system design', 'architecture'],
    answer: 'A monolithic architecture is built as a single, unified unit, while a microservices architecture is a collection of smaller, independently deployable services.'
  },
  {
    question: 'How do you handle a situation where a key team member leaves in the middle of a project?',
    tags: ['leadership', 'team management'],
    answer: 'First, I would assess the impact on the project timeline and deliverables. Then, I would work with the team to redistribute responsibilities and identify any knowledge gaps. I would also work with HR to expedite the hiring process for a replacement.'
  },
  {
    question: 'Explain the CAP theorem.',
    tags: ['system design', 'distributed systems'],
    answer: 'The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition tolerance.'
  }
];

const PreparationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm) ||
    q.answer.toLowerCase().includes(searchTerm) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Preparation</h1>
      <SearchBar onSearch={handleSearch} />
      <QuestionList questions={filteredQuestions} />
      <ScenarioGenerator />
    </div>
  );
};

export default PreparationPage;
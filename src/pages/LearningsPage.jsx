import React from 'react';
import NewsPanel from '../components/NewsPanel';
import ToolComparisonTable from '../components/ToolComparisonTable';
import KnowledgeCard from '../components/KnowledgeCard';

const LearningsPage = () => {
  const knowledgeItems = [
    { title: 'Microservices Architecture', content: 'An architectural style that structures an application as a collection of services that are highly maintainable and testable, loosely coupled, independently deployable, organized around business capabilities, and owned by a small team.' },
    { title: 'CQRS Pattern', content: 'Command Query Responsibility Segregation (CQRS) is a design pattern that separates the read and write operations of a data store. This can improve performance, scalability, and security.' },
    { title: 'Observability', content: 'Observability is the ability to measure the internal states of a system by examining its external outputs. It is a key component of modern software development and operations.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Learnings</h1>
      <NewsPanel />
      <ToolComparisonTable />
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {knowledgeItems.map((item, index) => (
          <KnowledgeCard key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default LearningsPage;
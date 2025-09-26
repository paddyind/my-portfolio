import React from 'react';

const NewsPanel = () => {
  // Placeholder data for news items
  const newsItems = [
    { id: 1, title: 'Cloud-Native Technologies on the Rise', source: 'TechCrunch' },
    { id: 2, title: 'GenAI: The Next Frontier in AI', source: 'Wired' },
    { id: 3, title: 'The Future of Telecom: 6G and Beyond', source: 'The Verge' },
    { id: 4, title: 'Microservices vs. Monoliths: A Deep Dive', source: 'InfoQ' },
    { id: 5, title: 'The Importance of Observability in Modern Systems', source: 'Martin Fowler' },
    { id: 6, title: 'The Latest in Quantum Computing', source: 'MIT Technology Review' },
    { id: 7, title: 'The Rise of Edge Computing', source: 'Gartner' },
    { id: 8, title: 'The Role of AI in Cybersecurity', source: 'Dark Reading' },
    { id: 9, title: 'The Latest Trends in DevOps', source: 'DevOps.com' },
    { id: 10, title: 'The Future of Web Development: Web3 and Beyond', source: 'A List Apart' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Top 10 Technology News</h2>
      <div className="overflow-y-auto h-64">
        <ul>
          {newsItems.map((item) => (
            <li key={item.id} className="mb-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.source}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsPanel;
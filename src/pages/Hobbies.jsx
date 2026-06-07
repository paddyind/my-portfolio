import React from 'react';

const HobbiesPage = () => {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Hobbies</h1>
          <p className="page-hero-subtitle">
            Travel, photography, creative writing, and more
          </p>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Content for travel logs, photography, and creative pursuits will be added here.
              This page is part of the personal section of the portfolio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HobbiesPage;

import React from 'react';

const PersonalPage = () => {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Personal</h1>
          <p className="page-hero-subtitle">
            About me beyond work — values, interests, and life goals
          </p>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              This section will share more about who I am outside of my professional life —
              family, hobbies, and the values that guide me. Explore the Family and Hobbies
              pages from the navigation menu for related content.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalPage;

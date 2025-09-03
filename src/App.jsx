import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';

// A placeholder component for pages that are not yet created.
const PlaceholderPage = ({ title }) => (
  <div className="container mx-auto px-4 py-8 pt-24 text-center">
    <h1 className="text-4xl font-bold">{title}</h1>
    <p className="mt-4 text-lg">This page is under construction.</p>
  </div>
);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {/* Add top padding to main to prevent content from being hidden by the fixed header */}
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* You can create and import page components for these routes later */}
          <Route path="/personal" element={<PlaceholderPage title="Personal" />} />
          <Route path="/academic" element={<PlaceholderPage title="Academic" />} />
          <Route path="/professional" element={<PlaceholderPage title="Professional" />} />
          <Route path="/hobbies" element={<PlaceholderPage title="Hobbies" />} />
          <Route path="/resume" element={<PlaceholderPage title="Resume" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
          <Route path="/family" element={<PlaceholderPage title="Family" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
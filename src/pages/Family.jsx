import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

// IMPORTANT: This is a simple client-side password protection.
// The password and content are still visible in the source code,
// so this is NOT a secure way to protect sensitive information.
// For a real-world application, use a proper authentication system.
const VERY_INSECURE_PASSWORD = 'family'; // Replace with a more complex password, ideally from an environment variable.

const FamilyPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === VERY_INSECURE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Please try again.');
    }
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="page-shell py-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <Lock size={48} className="mx-auto text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Private Section</h1>
            <p className="text-gray-600">This section is password protected.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              <Unlock size={20} className="inline-block mr-2" />
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Family & Memories</h1>
          <p className="page-hero-subtitle">
            A private space for our stories, milestones, and shared moments
          </p>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome, family! Private content for photos, milestones, and memories will be added here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FamilyPage;

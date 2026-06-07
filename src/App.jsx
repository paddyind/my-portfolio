import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageSquare, Target, Brain } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AcademicPage from './pages/Academic';
import ProfessionalPage from './pages/Professional';
import ContactPage from './pages/ContactPage';
import LearningsPage from './pages/LearningsPage';
import InterviewsPage from './pages/InterviewsPage';
import PreparationPage from './pages/PreparationPage';
import KnowledgeCheckPage from './pages/KnowledgeCheckPage';
import PersonalPage from './pages/Personal';
import FamilyPage from './pages/Family';
import HobbiesPage from './pages/Hobbies';
import ResumePage from './pages/ResumePage';

const mySpaceSections = [
  {
    to: '/my-space/learnings',
    label: 'Interview Refresher',
    description: 'Architect & leader hot topics for 2026+ — curated from your profile.',
    icon: BookOpen,
  },
  {
    to: '/my-space/knowledge-check',
    label: 'Knowledge Check',
    description: 'Flashcards and timed MCQ to test yourself by topic area.',
    icon: Brain,
  },
  {
    to: '/my-space/interviews',
    label: 'My Interviews',
    description: 'Interview questions, answers, and preparation notes.',
    icon: MessageSquare,
  },
  {
    to: '/my-space/preparation',
    label: 'My Preparation',
    description: 'Leadership and system-design scenario practice.',
    icon: Target,
  },
];

const MySpacePage = () => (
  <div className="page-shell">
    <header className="page-hero">
      <div className="page-hero-inner">
        <h1 className="page-hero-title">My Space</h1>
        <p className="page-hero-subtitle">
          Personal knowledge workspace for learning, interviews, and preparation
        </p>
      </div>
    </header>

    <main className="page-main">
      <div className="page-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {mySpaceSections.map(({ to, label, description, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <Icon className="w-8 h-8 mr-3 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {label}
              </h2>
            </div>
            <p className="text-gray-600">{description}</p>
          </Link>
        ))}
      </div>
    </main>
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-space" element={<MySpacePage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/academic" element={<AcademicPage />} />
          <Route path="/professional" element={<ProfessionalPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/my-space/learnings" element={<LearningsPage />} />
          <Route path="/my-space/interviews" element={<InterviewsPage />} />
          <Route path="/my-space/preparation" element={<PreparationPage />} />
          <Route path="/my-space/knowledge-check" element={<KnowledgeCheckPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

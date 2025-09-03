import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import PersonalPage from './pages/Personal'
import AcademicPage from './pages/Academic'
import ProfessionalPage from './pages/Professional'
import HobbiesPage from './pages/Hobbies'
import ResumePage from './pages/Resume'
import ContactPage from './pages/Contact'
import FamilyPage from './pages/Family'


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/academic" element={<AcademicPage />} />
          <Route path="/professional" element={<ProfessionalPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/family" element={<FamilyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App


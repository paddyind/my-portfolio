import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Clock, Layers, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import {
  getQuizCategories,
  getQuizQuestions,
  getQuizAttempts,
  saveQuizAttempt,
} from '../services/learningService';

const MODES = {
  flashcard: { label: 'Flashcards', description: 'Flip cards — self-assess know vs review' },
  mcq: { label: 'Timed MCQ', description: '60 seconds per question — architect-style quick recall' },
};

const SOURCES = {
  personal: { label: 'My knowledge base', description: 'Questions from your topics, key points & learn-more notes' },
  mixed: { label: 'Mixed', description: 'Personal content + curated architect question bank' },
  curated: { label: 'Curated bank', description: 'Pre-built architect/leader questions only' },
};

const SECONDS_PER_MCQ = 60;

const KnowledgeCheckPage = () => {
  const [step, setStep] = useState('setup');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mode, setMode] = useState('flashcard');
  const [quizSource, setQuizSource] = useState('personal');
  const [questionCount, setQuestionCount] = useState(8);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashcardStats, setFlashcardStats] = useState({ know: 0, review: 0 });
  const [mcqSelection, setMcqSelection] = useState(null);
  const [mcqResults, setMcqResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_MCQ);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, pastAttempts] = await Promise.all([
          getQuizCategories(),
          getQuizAttempts(),
        ]);
        setCategories(cats);
        setSelectedCategories(cats);
        setAttempts(pastAttempts);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const startQuiz = async () => {
    const type = mode === 'mcq' ? 'mcq' : null;
    const data = await getQuizQuestions({
      categories: selectedCategories,
      type,
      limit: questionCount,
      source: quizSource,
    });
    if (data.length === 0) {
      alert('No questions found for the selected categories. Try more categories.');
      return;
    }
    setQuestions(data);
    setCurrentIndex(0);
    setFlipped(false);
    setFlashcardStats({ know: 0, review: 0 });
    setMcqSelection(null);
    setMcqResults([]);
    setTimeLeft(SECONDS_PER_MCQ);
    setStartTime(Date.now());
    setStep('quiz');
  };

  const finishQuiz = useCallback(async (finalMcqResults = mcqResults, finalFlashcardStats = flashcardStats) => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    let score = 0;
    let total = questions.length;
    let details = {};

    if (mode === 'mcq') {
      score = finalMcqResults.filter((r) => r.correct).length;
      details = { responses: finalMcqResults };
    } else {
      score = finalFlashcardStats.know;
      total = finalFlashcardStats.know + finalFlashcardStats.review;
      details = { flashcardStats: finalFlashcardStats };
    }

    setSaving(true);
    try {
      await saveQuizAttempt({
        mode,
        categories: selectedCategories,
        score,
        total,
        duration_seconds: duration,
        details,
      });
      const pastAttempts = await getQuizAttempts();
      setAttempts(pastAttempts);
    } catch (err) {
      console.error('Failed to save attempt:', err);
    } finally {
      setSaving(false);
      setStep('results');
    }
  }, [mode, mcqResults, flashcardStats, questions.length, selectedCategories, startTime]);

  useEffect(() => {
    if (step !== 'quiz' || mode !== 'mcq') return undefined;

    if (timeLeft <= 0) {
      const q = questions[currentIndex];
      const timedOut = {
        questionId: q.id,
        question: q.question,
        selected: null,
        answer: q.answer,
        correct: false,
        timedOut: true,
      };
      const updated = [...mcqResults, timedOut];
      setMcqResults(updated);
      if (currentIndex >= questions.length - 1) {
        finishQuiz(updated);
      } else {
        setCurrentIndex((i) => i + 1);
        setMcqSelection(null);
        setTimeLeft(SECONDS_PER_MCQ);
      }
      return undefined;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, mode, timeLeft, currentIndex, questions, mcqResults, finishQuiz]);

  const handleMcqSubmit = () => {
    if (!mcqSelection) return;
    const q = questions[currentIndex];
    const correct = mcqSelection === q.answer;
    const result = {
      questionId: q.id,
      question: q.question,
      selected: mcqSelection,
      answer: q.answer,
      correct,
      explanation: q.explanation,
    };
    const updated = [...mcqResults, result];
    setMcqResults(updated);

    if (currentIndex >= questions.length - 1) {
      finishQuiz(updated);
    } else {
      setCurrentIndex((i) => i + 1);
      setMcqSelection(null);
      setTimeLeft(SECONDS_PER_MCQ);
    }
  };

  const handleFlashcard = (knewIt) => {
    const updatedStats = {
      know: flashcardStats.know + (knewIt ? 1 : 0),
      review: flashcardStats.review + (knewIt ? 0 : 1),
    };
    setFlashcardStats(updatedStats);
    if (currentIndex >= questions.length - 1) {
      finishQuiz(mcqResults, updatedStats);
    } else {
      setCurrentIndex((i) => i + 1);
      setFlipped(false);
    }
  };

  const resetToSetup = () => {
    setStep('setup');
    setQuestions([]);
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="text-center py-20 text-gray-600">Loading knowledge check...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Knowledge Check</h1>
          <p className="page-hero-subtitle">
            Flashcards and timed MCQ across architect & leader topics — NotebookLM-style self-test
          </p>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content max-w-4xl mx-auto">
          {step === 'setup' && (
            <div className="space-y-8">
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Layers size={20} className="mr-2 text-indigo-600" />
                  Select topic areas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategories.includes(cat)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedCategories(categories)}
                  className="mt-3 text-sm text-indigo-600 hover:underline"
                >
                  Select all
                </button>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Brain size={20} className="mr-2 text-indigo-600" />
                  Question source
                </h2>
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {Object.entries(SOURCES).map(([key, { label, description }]) => (
                    <button
                      key={key}
                      onClick={() => setQuizSource(key)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        quizSource === key
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{label}</p>
                      <p className="text-xs text-gray-600 mt-1">{description}</p>
                    </button>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Choose mode</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(MODES).map(([key, { label, description }]) => (
                    <button
                      key={key}
                      onClick={() => setMode(key)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        mode === key
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="text-sm text-gray-600 mt-1">{description}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of questions: {questionCount}
                </label>
                <input
                  type="range"
                  min={3}
                  max={18}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full"
                />
              </section>

              <button
                onClick={startQuiz}
                disabled={selectedCategories.length === 0}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start {MODES[mode].label}
              </button>

              {attempts.length > 0 && (
                <section className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Recent attempts</h2>
                  <ul className="space-y-2 text-sm">
                    {attempts.slice(0, 5).map((a) => (
                      <li key={a.id} className="flex justify-between text-gray-700 border-b pb-2">
                        <span>
                          {a.mode} — {(a.categories || []).slice(0, 2).join(', ')}
                          {(a.categories || []).length > 2 ? '…' : ''}
                        </span>
                        <span className="font-medium">
                          {a.score}/{a.total} · {a.duration_seconds}s
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          {step === 'quiz' && currentQuestion && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                {mode === 'mcq' && (
                  <span className={`flex items-center font-medium ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700'}`}>
                    <Clock size={16} className="mr-1" />
                    {timeLeft}s
                  </span>
                )}
                <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                  {currentQuestion.category}
                </span>
                {currentQuestion.source === 'personal' && (
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                    Personal
                  </span>
                )}
              </div>

              {mode === 'flashcard' ? (
                <>
                  <button
                    onClick={() => setFlipped(!flipped)}
                    className="w-full min-h-[200px] p-6 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 text-left hover:border-indigo-400 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-wide text-indigo-600 mb-2">
                      {flipped ? 'Answer' : 'Question'}
                    </p>
                    <p className="text-xl text-gray-900 leading-relaxed">
                      {flipped ? currentQuestion.answer : currentQuestion.question}
                    </p>
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-2">Tap card to flip</p>
                  {flipped && (
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => handleFlashcard(false)}
                        className="flex-1 py-3 border-2 border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 font-medium"
                      >
                        Need review
                      </button>
                      <button
                        onClick={() => handleFlashcard(true)}
                        className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        Know it
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-xl font-medium text-gray-900 mb-6">{currentQuestion.question}</p>
                  <div className="space-y-3">
                    {(currentQuestion.options || []).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setMcqSelection(opt)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                          mcqSelection === opt
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleMcqSubmit}
                    disabled={!mcqSelection}
                    className="w-full mt-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Submit answer
                  </button>
                </>
              )}
            </div>
          )}

          {step === 'results' && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Session complete</h2>
              {saving ? (
                <p className="text-gray-500">Saving your attempt...</p>
              ) : (
                <>
                  {mode === 'mcq' ? (
                    <p className="text-4xl font-bold text-indigo-600 my-4">
                      {mcqResults.filter((r) => r.correct).length} / {questions.length}
                    </p>
                  ) : (
                    <p className="text-4xl font-bold text-indigo-600 my-4">
                      {flashcardStats.know} know · {flashcardStats.review} review
                    </p>
                  )}
                  <p className="text-gray-600 mb-6">Attempt saved — track progress over time.</p>

                  {mode === 'mcq' && mcqResults.some((r) => !r.correct) && (
                    <div className="text-left mt-6 mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Review misses</h3>
                      <ul className="space-y-3 text-sm">
                        {mcqResults.filter((r) => !r.correct).map((r) => (
                          <li key={r.questionId} className="flex items-start gap-2">
                            <XCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">{r.question}</p>
                              <p className="text-gray-600">Correct: {r.answer}</p>
                              {r.explanation && <p className="text-gray-500 mt-1">{r.explanation}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={resetToSetup}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <RotateCcw size={18} className="mr-2" />
                      Try again
                    </button>
                    <Link
                      to="/my-space/learnings"
                      className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-indigo-400"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Review refresher topics
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default KnowledgeCheckPage;

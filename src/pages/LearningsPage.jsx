import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Filter, Plus, BookMarked } from 'lucide-react';
import LLMToggle from '../components/LLMToggle';
import {
  getLearnings,
  getLearningCategories,
  createLearning,
} from '../services/learningService';
import { brainstormTopic, applyBrainstorm, isAiModeOn } from '../services/llmService';
import KnowledgeCard from '../components/KnowledgeCard';

const emptyTopic = {
  topic: '',
  category: '',
  summary: '',
  notes: '',
  key_point: '',
  is_private: true,
};

const LearningsPage = () => {
  const [learnings, setLearnings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyTopic);
  const [submitting, setSubmitting] = useState(false);
  const [aiBrainstorm, setAiBrainstorm] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [learningsData, categoriesData] = await Promise.all([
        getLearnings(),
        getLearningCategories(),
      ]);
      setLearnings(learningsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filtered = useMemo(() => {
    return learnings.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
      const matchesSource =
        selectedSource === 'all' ||
        (selectedSource === 'personal' && item.source === 'personal') ||
        (selectedSource === 'curated' && item.source !== 'personal');
      const haystack = `${item.topic} ${item.summary || ''} ${item.notes || ''} ${item.deep_dive || ''} ${(item.tags || []).join(' ')} ${(item.key_points || []).join(' ')}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      return matchesCategory && matchesPriority && matchesSource && matchesSearch;
    });
  }, [learnings, selectedCategory, selectedPriority, selectedSource, search]);

  const handleAiBrainstorm = async () => {
    if (!form.topic.trim()) return;
    if (!isAiModeOn()) {
      alert('Turn on AI mode in the Private LLM panel first.');
      return;
    }
    setAiLoading(true);
    try {
      const result = await brainstormTopic({
        topic: form.topic,
        category: form.category,
        context: form.notes,
      });
      setAiBrainstorm(result);
      if (result.summary) setForm((f) => ({ ...f, summary: result.summary }));
    } catch (err) {
      alert(err.message || 'AI brainstorm failed. Is Ollama running with a model pulled?');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!form.topic.trim() || !form.category) return;
    setSubmitting(true);
    try {
      if (aiBrainstorm) {
        await applyBrainstorm({
          topic: form.topic.trim(),
          category: form.category,
          summary: aiBrainstorm.summary || form.summary.trim(),
          key_points: aiBrainstorm.key_points || (form.key_point.trim() ? [form.key_point.trim()] : []),
          deep_dive: aiBrainstorm.deep_dive || '',
          talking_points: aiBrainstorm.talking_points || form.notes.trim(),
          merge: false,
        });
      } else {
        await createLearning({
          topic: form.topic.trim(),
          category: form.category,
          summary: form.summary.trim(),
          notes: form.notes.trim(),
          key_points: form.key_point.trim() ? [form.key_point.trim()] : [],
          is_private: form.is_private,
          status: 'Personal',
          priority: 'medium',
        });
      }
      setForm(emptyTopic);
      setAiBrainstorm(null);
      setShowAddForm(false);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Interview Refresher</h1>
          <p className="page-hero-subtitle">
            Build and review your personal knowledge base — tested via flashcards & MCQ
          </p>
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
            Each topic has key points, learn-more depth, and article/video references.
            Add your own notes — they feed personal Knowledge Check questions automatically.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
            <LLMToggle />
            <Link
              to="/my-space/knowledge-check"
              className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <Brain size={18} className="mr-2" />
              Test your knowledge
            </Link>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center px-5 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium"
            >
              <Plus size={18} className="mr-2" />
              Add topic
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          {showAddForm && (
            <form onSubmit={handleCreateTopic} className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BookMarked size={20} className="mr-2 text-indigo-600" />
                Add to your knowledge base
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  placeholder="Topic title *"
                  className="px-4 py-2 border rounded-lg"
                />
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="">Select category *</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Short summary"
                  className="md:col-span-2 px-4 py-2 border rounded-lg"
                />
                <input
                  value={form.key_point}
                  onChange={(e) => setForm({ ...form, key_point: e.target.value })}
                  placeholder="First key point (add more later)"
                  className="md:col-span-2 px-4 py-2 border rounded-lg"
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Talking points / interview narrative"
                  rows={2}
                  className="md:col-span-2 px-4 py-2 border rounded-lg"
                />
              </div>
              <label className="flex items-center mt-4 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={form.is_private}
                  onChange={(e) => setForm({ ...form, is_private: e.target.checked })}
                  className="mr-2"
                />
                Mark as private (for Phase 2 auth — hidden from public views when enabled)
              </label>
              {aiBrainstorm?.key_points?.length > 0 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm">
                  <p className="font-medium text-indigo-900 mb-2">AI preview ({aiBrainstorm.key_points.length} key points)</p>
                  <ul className="list-disc list-inside text-gray-700 max-h-32 overflow-y-auto">
                    {aiBrainstorm.key_points.slice(0, 8).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleAiBrainstorm}
                  disabled={aiLoading || !form.topic.trim()}
                  className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 disabled:opacity-50"
                >
                  {aiLoading ? 'Brainstorming...' : 'AI brainstorm first'}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : aiBrainstorm ? 'Save with AI content' : 'Save topic'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2 border rounded-lg text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex items-center text-gray-700 font-medium">
              <Filter size={18} className="mr-2 text-indigo-600" />
              Filter topics
            </div>
            <input
              type="search"
              placeholder="Search topics, tags, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All sources</option>
              <option value="curated">Curated</option>
              <option value="personal">Personal</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All priorities</option>
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
            </select>
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-600">Loading refresher topics...</div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          )}

          {!loading && !error && (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Showing {filtered.length} of {learnings.length} topics — expand any card for Learn more, references, and personal notes
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <KnowledgeCard key={item.id} item={item} onUpdated={loadData} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No topics match your filters. Try clearing search or add a new topic.
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearningsPage;

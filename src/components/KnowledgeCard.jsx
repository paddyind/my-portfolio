import React, { useState } from 'react';
import {
  ChevronDown, ChevronUp, Star, ExternalLink, BookOpen, Video, FileText, Lock, Plus, Sparkles,
} from 'lucide-react';
import { addKeyPoint, addResource, updateLearning } from '../services/learningService';
import { expandLearningWithAi, applyBrainstorm, isAiModeOn } from '../services/llmService';

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-gray-100 text-gray-700',
};

const resourceIcon = (type) => {
  if (type === 'video') return Video;
  if (type === 'doc') return FileText;
  return BookOpen;
};

const KnowledgeCard = ({ item, onUpdated }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAddPoint, setShowAddPoint] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
  const [newPoint, setNewPoint] = useState('');
  const [newResource, setNewResource] = useState({ title: '', url: '', type: 'article' });
  const [deepDiveDraft, setDeepDiveDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPreview, setAiPreview] = useState(null);
  const [aiError, setAiError] = useState(null);

  const {
    id,
    topic,
    category,
    status,
    priority,
    interview_focus,
    summary,
    key_points = [],
    notes,
    tags = [],
    deep_dive,
    resources = [],
    source,
    is_private,
  } = item;

  const handleAddPoint = async (e) => {
    e.preventDefault();
    if (!newPoint.trim()) return;
    setSaving(true);
    try {
      await addKeyPoint(id, newPoint.trim());
      setNewPoint('');
      setShowAddPoint(false);
      onUpdated?.();
    } finally {
      setSaving(false);
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!newResource.title.trim() || !newResource.url.trim()) return;
    setSaving(true);
    try {
      await addResource(id, newResource);
      setNewResource({ title: '', url: '', type: 'article' });
      setShowAddResource(false);
      onUpdated?.();
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDeepDive = async () => {
    setSaving(true);
    try {
      await updateLearning(id, { deep_dive: deepDiveDraft });
      onUpdated?.();
    } finally {
      setSaving(false);
    }
  };

  const openExpanded = () => {
    if (!expanded) setDeepDiveDraft(deep_dive || '');
    setExpanded(!expanded);
  };

  const handleAiExpand = async () => {
    if (!isAiModeOn()) {
      setAiError('Turn on AI mode in the Private LLM panel (top of page or Preparation).');
      return;
    }
    setAiLoading(true);
    setAiError(null);
    try {
      const result = await expandLearningWithAi(id);
      setAiPreview(result);
    } catch (err) {
      setAiError(err.message || 'AI expansion failed');
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAi = async () => {
    if (!aiPreview) return;
    setSaving(true);
    try {
      await applyBrainstorm({
        learning_id: id,
        key_points: aiPreview.key_points,
        deep_dive: aiPreview.deep_dive,
        talking_points: aiPreview.talking_points,
        merge: true,
      });
      setAiPreview(null);
      onUpdated?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-xl font-bold text-gray-900 leading-snug">{topic}</h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          {is_private && <Lock size={16} className="text-gray-400" title="Private topic" />}
          {priority === 'high' && <Star size={18} className="text-amber-500" fill="currentColor" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {category}
        </span>
        {status && (
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
            {status}
          </span>
        )}
        {source === 'personal' && (
          <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
            Personal
          </span>
        )}
        {priority && (
          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${priorityStyles[priority] || priorityStyles.low}`}>
            {priority} priority
          </span>
        )}
      </div>

      {interview_focus && (
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium text-gray-700">Interview focus:</span> {interview_focus}
        </p>
      )}

      {summary && <p className="text-gray-700 mb-3 leading-relaxed">{summary}</p>}

      {key_points.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Key points ({key_points.length})
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            {(expanded ? key_points : key_points.slice(0, 4)).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {!expanded && key_points.length > 4 && (
            <p className="text-xs text-indigo-600 mt-1">+{key_points.length - 4} more in Learn more</p>
          )}
        </div>
      )}

      {resources.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800 mb-2">References</p>
          <ul className="space-y-2">
            {(expanded ? resources : resources.slice(0, 2)).map((ref) => {
              const Icon = resourceIcon(ref.type);
              return (
                <li key={`${ref.title}-${ref.url}`}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    <Icon size={14} className="mr-1.5 flex-shrink-0" />
                    {ref.title}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {expanded && (
        <>
          {deep_dive && (
            <div className="mt-2 p-4 bg-indigo-50 rounded-md text-sm text-gray-700 leading-relaxed border border-indigo-100">
              <p className="font-semibold text-indigo-900 mb-2 flex items-center">
                <BookOpen size={16} className="mr-1" /> Learn more
              </p>
              <p className="whitespace-pre-wrap">{deep_dive}</p>
            </div>
          )}

          {notes && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-800">Talking points: </span>
              {notes}
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Private LLM assist</p>
            <button
              type="button"
              onClick={handleAiExpand}
              disabled={aiLoading}
              className="w-full flex items-center justify-center gap-2 text-sm py-2 px-3 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-lg hover:bg-indigo-100 disabled:opacity-50"
            >
              <Sparkles size={16} />
              {aiLoading ? 'Brainstorming with Ollama...' : 'AI expand topic (Ollama)'}
            </button>
            {aiError && <p className="text-xs text-red-600">{aiError}</p>}
            {aiPreview && (
              <div className="p-3 bg-indigo-50 rounded-lg text-sm space-y-2 border border-indigo-100">
                <p className="font-semibold text-indigo-900">AI suggestions — review before saving</p>
                {aiPreview.key_points?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700">
                    {aiPreview.key_points.slice(0, 6).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {aiPreview.deep_dive && (
                  <p className="text-gray-600 text-xs line-clamp-4">{aiPreview.deep_dive}</p>
                )}
                <button
                  type="button"
                  onClick={handleApplyAi}
                  disabled={saving}
                  className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-md"
                >
                  Merge into this topic
                </button>
              </div>
            )}

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2">Grow this topic</p>

            {showAddPoint ? (
              <form onSubmit={handleAddPoint} className="flex gap-2">
                <input
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  placeholder="Add a key point you learned..."
                  className="flex-grow text-sm px-3 py-2 border rounded-lg"
                />
                <button type="submit" disabled={saving} className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-lg">
                  Add
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddPoint(true)}
                className="text-sm text-indigo-600 hover:underline flex items-center"
              >
                <Plus size={14} className="mr-1" /> Add key point
              </button>
            )}

            {showAddResource ? (
              <form onSubmit={handleAddResource} className="space-y-2">
                <input
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="Reference title"
                  className="w-full text-sm px-3 py-2 border rounded-lg"
                />
                <input
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-sm px-3 py-2 border rounded-lg"
                />
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="text-sm px-3 py-2 border rounded-lg"
                >
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="doc">Document</option>
                </select>
                <button type="submit" disabled={saving} className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-lg">
                  Save reference
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddResource(true)}
                className="text-sm text-indigo-600 hover:underline flex items-center"
              >
                <Plus size={14} className="mr-1" /> Add article / video link
              </button>
            )}

            <div>
              <label className="text-sm text-gray-600 block mb-1">Personal learn-more notes</label>
              <textarea
                value={deepDiveDraft}
                onChange={(e) => setDeepDiveDraft(e.target.value)}
                rows={3}
                placeholder="Add your own deep-dive notes — included in personal flashcards..."
                className="w-full text-sm px-3 py-2 border rounded-lg"
              />
              {deepDiveDraft !== (deep_dive || '') && (
                <button
                  onClick={handleSaveDeepDive}
                  disabled={saving}
                  className="mt-2 text-sm px-3 py-2 bg-gray-800 text-white rounded-lg"
                >
                  Save learn-more text
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <button
        onClick={openExpanded}
        className="mt-auto pt-4 flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
      >
        {expanded ? (
          <>
            <ChevronUp size={16} className="mr-1" /> Show less
          </>
        ) : (
          <>
            <ChevronDown size={16} className="mr-1" /> Learn more
            {resources.length > 0 && ` (${resources.length} refs)`}
          </>
        )}
      </button>
    </div>
  );
};

export default KnowledgeCard;

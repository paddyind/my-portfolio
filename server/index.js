import express from 'express';
import cors from 'cors';
import db from './database.js';
import {
  getLlmStatus,
  isLlmEnabled,
  brainstormTopic,
  expandLearning,
  generateScenario,
} from './llm.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// API routes
// Learnings
app.get('/api/learnings', async (req, res) => {
  let learnings = db.getLearnings({ includePrivate: true });
  const { category, priority, source } = req.query;
  if (category) {
    learnings = learnings.filter((item) => item.category === category);
  }
  if (priority) {
    learnings = learnings.filter((item) => item.priority === priority);
  }
  if (source) {
    learnings = learnings.filter((item) => item.source === source);
  }
  res.json(learnings);
});

app.get('/api/learnings/categories', (req, res) => {
  res.json(db.getCategories());
});

app.get('/api/learnings/:id', (req, res) => {
  const learning = db.getLearningById(req.params.id);
  if (!learning) return res.status(404).json({ error: 'Learning not found' });
  res.json(learning);
});

// Interviews
app.get('/api/interviews', async (req, res) => {
  const interviews = await db.all('SELECT * FROM interviews');
  res.json(interviews);
});

// Preparation Scenarios
app.get('/api/preparation-scenarios', async (req, res) => {
  const scenarios = await db.all('SELECT * FROM preparation_scenarios');
  res.json(scenarios);
});

// POST routes for creating new items
app.post('/api/learnings', async (req, res) => {
  const created = db.createLearning(req.body);
  res.status(201).json(created);
});

app.patch('/api/learnings/:id', (req, res) => {
  const updated = db.patchLearning(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Learning not found' });
  res.json(updated);
});

app.post('/api/learnings/:id/key-points', (req, res) => {
  const learning = db.getLearningById(req.params.id);
  if (!learning) return res.status(404).json({ error: 'Learning not found' });
  const { point } = req.body;
  if (!point?.trim()) return res.status(400).json({ error: 'Point is required' });
  const key_points = [...(learning.key_points || [])];
  if (!key_points.includes(point.trim())) key_points.push(point.trim());
  const updated = db.patchLearning(req.params.id, { key_points });
  res.json(updated);
});

app.post('/api/learnings/:id/resources', (req, res) => {
  const learning = db.getLearningById(req.params.id);
  if (!learning) return res.status(404).json({ error: 'Learning not found' });
  const { title, url, type = 'article' } = req.body;
  if (!title?.trim() || !url?.trim()) {
    return res.status(400).json({ error: 'Title and URL are required' });
  }
  const resources = [...(learning.resources || []), { title: title.trim(), url: url.trim(), type }];
  const updated = db.patchLearning(req.params.id, { resources });
  res.json(updated);
});

app.post('/api/interviews', async (req, res) => {
  const { question, answer, difficulty, category } = req.body;
  const result = await db.run('INSERT INTO interviews (question, answer, difficulty, category) VALUES (?, ?, ?, ?)', question, answer, difficulty, category);
  res.status(201).json({ id: result.lastID });
});

// LLM — private Ollama (Gemma, Llama, etc.)
app.get('/api/llm/status', async (req, res) => {
  try {
    const status = await getLlmStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ enabled: false, connected: false, error: error.message });
  }
});

app.post('/api/llm/brainstorm', async (req, res) => {
  const { topic, category, context, useAI = false } = req.body;
  if (!topic?.trim()) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  if (useAI && isLlmEnabled()) {
    try {
      const result = await brainstormTopic({ topic, category, context });
      return res.json({ ...result, generated_by: 'AI' });
    } catch (error) {
      console.error('AI brainstorm failed:', error.message);
      return res.status(503).json({ error: 'AI unavailable', detail: error.message });
    }
  }

  return res.status(400).json({
    error: 'AI mode is off or LLM_ENABLED is false',
    hint: 'Enable AI mode in the UI and set LLM_ENABLED=true with Ollama running',
  });
});

app.post('/api/llm/expand-learning', async (req, res) => {
  const { learning_id, useAI = false } = req.body;
  const learning = db.getLearningById(learning_id);
  if (!learning) return res.status(404).json({ error: 'Learning not found' });

  if (useAI && isLlmEnabled()) {
    try {
      const result = await expandLearning(learning);
      return res.json({ ...result, generated_by: 'AI', learning_id });
    } catch (error) {
      console.error('AI expand failed:', error.message);
      return res.status(503).json({ error: 'AI unavailable', detail: error.message });
    }
  }

  return res.status(400).json({ error: 'AI mode is off or LLM_ENABLED is false' });
});

app.post('/api/llm/apply-brainstorm', async (req, res) => {
  const { learning_id, summary, key_points, deep_dive, talking_points, merge = true } = req.body;

  if (learning_id) {
    const learning = db.getLearningById(learning_id);
    if (!learning) return res.status(404).json({ error: 'Learning not found' });

    const updates = {};
    if (summary) updates.summary = summary;
    if (deep_dive) {
      updates.deep_dive = merge && learning.deep_dive
        ? `${learning.deep_dive}\n\n---\n\n${deep_dive}`
        : deep_dive;
    }
    if (talking_points) {
      updates.notes = merge && learning.notes
        ? `${learning.notes}\n\n${talking_points}`
        : talking_points;
    }
    if (key_points?.length) {
      const existing = learning.key_points || [];
      updates.key_points = merge
        ? [...existing, ...key_points.filter((p) => !existing.includes(p))]
        : key_points;
    }
    const updated = db.patchLearning(learning_id, updates);
    return res.json(updated);
  }

  const created = db.createLearning({
    topic: req.body.topic,
    category: req.body.category || 'Enterprise Architecture',
    summary: summary || '',
    key_points: key_points || [],
    deep_dive: deep_dive || '',
    notes: talking_points || '',
    is_private: true,
    status: 'Personal',
  });
  return res.status(201).json(created);
});

// Endpoint for generating new scenarios with AI (when enabled) or fallback
app.post('/api/preparation-scenarios/generate', async (req, res) => {
  try {
    const { topic, useAI = false } = req.body;

    if (useAI && isLlmEnabled()) {
      try {
        const scenarioText = await generateScenario(topic);
        const newScenario = {
          scenario: scenarioText,
          topic: topic || 'AI Generated',
        };

        const result = await db.run('INSERT INTO preparation_scenarios (scenario, topic) VALUES (?, ?)', newScenario.scenario, newScenario.topic);
        const createdScenario = await db.get('SELECT * FROM preparation_scenarios WHERE id = ?', result.lastID);
        res.status(201).json({ ...createdScenario, generated_by: 'AI' });
        return;
      } catch (aiError) {
        console.log('AI generation failed, falling back to curated scenarios:', aiError.message);
      }
    }
    
    // Fallback to curated scenarios
    const scenarios = [
      'Design a scalable microservices architecture for an e-commerce platform with 1M+ users. Consider service communication, data consistency, and deployment strategies.',
      'Your production database is experiencing high latency during peak hours. Walk through your systematic debugging and optimization approach.',
      'Implement a real-time notification system for a social media app. Compare WebSocket vs Server-Sent Events vs Push Notifications approaches.',
      'Design a CI/CD pipeline for a multi-service application with automated testing, security scanning, and blue-green deployment.',
      'Handle a security incident where user data may have been compromised. Outline your incident response and communication plan.',
      'Optimize a data processing pipeline that needs to handle 10M records daily with error handling and monitoring.',
      'Design a distributed caching strategy for a high-traffic web application with global users.',
      'Implement a data lake architecture for processing petabytes of unstructured data from multiple sources.',
      'Create a fault-tolerant messaging system that guarantees message delivery across microservices.',
      'Design an auto-scaling strategy for containerized applications during unpredictable traffic spikes.'
    ];
    
    const topics = ['System Design', 'Database Optimization', 'Real-time Systems', 'DevOps', 'Security', 'Data Processing', 'Caching', 'Big Data', 'Messaging', 'Scaling'];
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    
    const newScenario = {
      scenario: scenarios[randomIndex],
      topic: topic || topics[randomIndex]
    };

    const result = await db.run('INSERT INTO preparation_scenarios (scenario, topic) VALUES (?, ?)', newScenario.scenario, newScenario.topic);
    const createdScenario = await db.get('SELECT * FROM preparation_scenarios WHERE id = ?', result.lastID);
    res.status(201).json({ ...createdScenario, generated_by: 'Curated' });
  } catch (error) {
    console.error('Error generating scenario:', error);
    res.status(500).json({ error: 'Failed to generate new scenario' });
  }
});

// PUT routes for updating items
app.put('/api/learnings/:id', async (req, res) => {
  const updated = db.patchLearning(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Learning not found' });
  res.json(updated);
});

app.put('/api/interviews/:id', async (req, res) => {
  const { question, answer, difficulty, category } = req.body;
  await db.run('UPDATE interviews SET question = ?, answer = ?, difficulty = ?, category = ? WHERE id = ?', question, answer, difficulty, category, req.params.id);
  res.status(200).json({ message: 'Interview updated successfully' });
});

// DELETE routes for deleting items
app.delete('/api/learnings/:id', async (req, res) => {
  await db.run('DELETE FROM learnings WHERE id = ?', req.params.id);
  res.status(200).json({ message: 'Learning deleted successfully' });
});

app.delete('/api/interviews/:id', async (req, res) => {
  await db.run('DELETE FROM interviews WHERE id = ?', req.params.id);
  res.status(200).json({ message: 'Interview deleted successfully' });
});

// Quiz / Knowledge Check
app.get('/api/quiz/categories', (req, res) => {
  res.json(db.getCategories());
});

app.get('/api/quiz/questions', (req, res) => {
  const categories = req.query.categories ? req.query.categories.split(',').filter(Boolean) : [];
  const type = req.query.type || null;
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  const source = req.query.source || 'mixed';
  const questions = db.filterQuizQuestions({ categories, type, limit, source });
  res.json(questions);
});

app.post('/api/quiz/questions', (req, res) => {
  const { question, answer, category, type, options, learning_id } = req.body;
  if (!question?.trim() || !answer?.trim() || !category) {
    return res.status(400).json({ error: 'Question, answer, and category are required' });
  }
  const created = db.createQuizQuestion(req.body);
  res.status(201).json(created);
});

app.get('/api/quiz/attempts', async (req, res) => {
  const attempts = await db.all('SELECT * FROM quiz_attempts');
  res.json(attempts);
});

app.post('/api/quiz/attempts', async (req, res) => {
  const { mode, categories, score, total, duration_seconds, details } = req.body;
  const result = await db.run(
    'INSERT INTO quiz_attempts (mode, categories, score, total, duration_seconds, details) VALUES (?, ?, ?, ?, ?, ?)',
    mode,
    categories,
    score,
    total,
    duration_seconds,
    JSON.stringify(details || {})
  );
  const created = await db.get('SELECT * FROM quiz_attempts WHERE id = ?', result.lastID);
  res.status(201).json(created);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
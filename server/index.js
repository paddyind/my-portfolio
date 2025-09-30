import express from 'express';
import cors from 'cors';
import db from './database.js';
import ollama from 'ollama';

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
  const learnings = await db.all('SELECT * FROM learnings');
  res.json(learnings);
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
  const { topic, category, status, notes } = req.body;
  const result = await db.run('INSERT INTO learnings (topic, category, status, notes) VALUES (?, ?, ?, ?)', topic, category, status, notes);
  res.status(201).json({ id: result.lastID });
});

app.post('/api/interviews', async (req, res) => {
  const { question, answer, difficulty, category } = req.body;
  const result = await db.run('INSERT INTO interviews (question, answer, difficulty, category) VALUES (?, ?, ?, ?)', question, answer, difficulty, category);
  res.status(201).json({ id: result.lastID });
});

// LLM Configuration endpoint
app.get('/api/llm/status', (req, res) => {
  res.json({ 
    enabled: process.env.LLM_ENABLED === 'true' || false,
    model: process.env.LLM_MODEL || 'llama2',
    features: ['scenario-generation', 'interview-prep', 'learning-suggestions']
  });
});

// Endpoint for generating new scenarios with AI (when enabled) or fallback
app.post('/api/preparation-scenarios/generate', async (req, res) => {
  try {
    const { topic, useAI = false } = req.body;
    const llmEnabled = process.env.LLM_ENABLED === 'true';
    
    if (useAI && llmEnabled) {
      try {
        const prompt = `Generate a detailed technical interview scenario for ${topic || 'system design'}. 
Format: A realistic workplace challenge that requires strategic thinking, technical knowledge, and problem-solving.
Include specific requirements, constraints, and expected deliverables.
Keep it concise but comprehensive (2-3 sentences).`;
        
        const response = await ollama.chat({
          model: process.env.LLM_MODEL || 'llama2',
          messages: [{ role: 'user', content: prompt }],
        });

        const newScenario = {
          scenario: response.message.content,
          topic: topic || 'AI Generated'
        };

        const result = await db.run('INSERT INTO preparation_scenarios (scenario, topic) VALUES (?, ?)', newScenario.scenario, newScenario.topic);
        const createdScenario = await db.get('SELECT * FROM preparation_scenarios WHERE id = ?', result.lastID);
        res.status(201).json({ ...createdScenario, generated_by: 'AI' });
        return;
      } catch (aiError) {
        console.log('AI generation failed, falling back to curated scenarios:', aiError.message);
        // Fall through to curated scenarios
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
  const { topic, category, status, notes } = req.body;
  await db.run('UPDATE learnings SET topic = ?, category = ?, status = ?, notes = ? WHERE id = ?', topic, category, status, notes, req.params.id);
  res.status(200).json({ message: 'Learning updated successfully' });
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
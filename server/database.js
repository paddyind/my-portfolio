import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, 'database.json');

let database = {
  learnings: [],
  interviews: [],
  preparation_scenarios: [],
  metadata: { version: '1.0.0', created: new Date().toISOString() }
};

// Load or create database
function loadDatabase() {
  try {
    if (existsSync(dbPath)) {
      database = JSON.parse(readFileSync(dbPath, 'utf8'));
      console.log('✅ Loaded JSON database');
    } else {
      seedDatabase();
      saveDatabase();
      console.log('✅ Created database with seed data');
    }
  } catch (error) {
    console.error('Database error:', error);
    seedDatabase();
    saveDatabase();
  }
}

function saveDatabase() {
  writeFileSync(dbPath, JSON.stringify(database, null, 2));
}

function seedDatabase() {
  database.learnings = [
    { id: 1, topic: 'React Hooks', category: 'Frontend', status: 'Completed', notes: 'useState, useEffect, custom hooks', created_at: '2024-01-15T00:00:00.000Z' },
    { id: 2, topic: 'Docker Deployment', category: 'DevOps', status: 'Completed', notes: 'Containerization and cloud deployment', created_at: '2024-02-20T00:00:00.000Z' },
    { id: 3, topic: 'REST APIs', category: 'Backend', status: 'Completed', notes: 'Express, authentication, error handling', created_at: '2024-03-10T00:00:00.000Z' },
    { id: 4, topic: 'TypeScript', category: 'Language', status: 'In Progress', notes: 'Static typing and advanced types', created_at: '2024-04-05T00:00:00.000Z' },
    { id: 5, topic: 'System Design', category: 'Architecture', status: 'Learning', notes: 'Microservices and scalability', created_at: '2024-05-01T00:00:00.000Z' }
  ];

  database.interviews = [
    { id: 1, question: 'Controlled vs uncontrolled components in React?', answer: 'Controlled components use React state, uncontrolled use DOM state directly', difficulty: 'Easy', category: 'React', created_at: '2024-01-20T00:00:00.000Z' },
    { id: 2, question: 'Docker containers vs VMs?', answer: 'Containers share OS kernel, VMs include full guest OS', difficulty: 'Medium', category: 'DevOps', created_at: '2024-02-15T00:00:00.000Z' },
    { id: 3, question: 'REST API principles?', answer: 'Stateless, resource-based URLs, HTTP methods, status codes', difficulty: 'Medium', category: 'API Design', created_at: '2024-03-01T00:00:00.000Z' },
    { id: 4, question: 'React error boundaries?', answer: 'Components that catch errors using componentDidCatch or useErrorHandler', difficulty: 'Hard', category: 'React', created_at: '2024-04-10T00:00:00.000Z' },
    { id: 5, question: 'Database indexing strategies?', answer: 'B-tree for ranges, Hash for equality, consider cardinality and query patterns', difficulty: 'Hard', category: 'Database', created_at: '2024-05-15T00:00:00.000Z' }
  ];

  database.preparation_scenarios = [
    { id: 1, scenario: 'Design scalable e-commerce for 1M+ users: microservices, databases, caching, CDN', topic: 'System Design', created_at: '2024-01-25T00:00:00.000Z' },
    { id: 2, scenario: 'Debug API slowdown from 200ms to 8s: monitoring, profiling, optimization', topic: 'Performance', created_at: '2024-02-28T00:00:00.000Z' },
    { id: 3, scenario: 'Real-time document editing like Google Docs: conflict resolution, sync, offline handling', topic: 'Real-time Systems', created_at: '2024-03-15T00:00:00.000Z' },
    { id: 4, scenario: 'CI/CD for 20+ microservices: testing, security, deployments, rollbacks', topic: 'DevOps', created_at: '2024-04-20T00:00:00.000Z' },
    { id: 5, scenario: 'Security breach response: containment, forensics, communication, compliance', topic: 'Security', created_at: '2024-05-25T00:00:00.000Z' }
  ];
}

function getNextId(table) {
  return Math.max(0, ...database[table].map(item => item.id)) + 1;
}

function extractTableName(query) {
  const match = query.match(/(?:FROM|INTO|UPDATE)\s+(\w+)/i);
  return match ? match[1] : null;
}

function createItem(table, params) {
  const schemas = {
    learnings: ['topic', 'category', 'status', 'notes'],
    interviews: ['question', 'answer', 'difficulty', 'category'],
    preparation_scenarios: ['scenario', 'topic']
  };
  const item = { created_at: new Date().toISOString() };
  (schemas[table] || []).forEach((field, i) => {
    if (params[i] !== undefined) item[field] = params[i];
  });
  return item;
}

const dbInterface = {
  all: (query) => {
    const table = extractTableName(query);
    return database[table] ? [...database[table]].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];
  },
  
  get: (query, params = []) => {
    const table = extractTableName(query);
    if (!database[table]) return null;
    return params[0] ? database[table].find(item => item.id === params[0]) || null : database[table][0] || null;
  },
  
  run: (query, ...params) => {
    const table = extractTableName(query);
    if (!database[table]) return { lastID: 0, changes: 0 };
    
    try {
      if (query.includes('INSERT')) {
        const id = getNextId(table);
        const newItem = { id, ...createItem(table, params) };
        database[table].push(newItem);
        saveDatabase();
        return { lastID: id, changes: 1 };
      } else if (query.includes('UPDATE')) {
        const id = params[params.length - 1];
        const index = database[table].findIndex(item => item.id === id);
        if (index !== -1) {
          database[table][index] = { ...database[table][index], ...createItem(table, params.slice(0, -1)), updated_at: new Date().toISOString() };
          saveDatabase();
          return { lastID: 0, changes: 1 };
        }
      } else if (query.includes('DELETE')) {
        const initialLength = database[table].length;
        database[table] = database[table].filter(item => item.id !== params[0]);
        const changes = initialLength - database[table].length;
        if (changes > 0) saveDatabase();
        return { lastID: 0, changes };
      }
    } catch (error) {
      console.error('DB operation error:', error);
    }
    
    return { lastID: 0, changes: 0 };
  }
};

loadDatabase();
console.log(`📊 Database ready: ${database.learnings.length} learnings, ${database.interviews.length} interviews, ${database.preparation_scenarios.length} scenarios`);

export default dbInterface;

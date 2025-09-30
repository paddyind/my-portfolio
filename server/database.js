import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// This is a top-level await, so make sure your Node.js version supports it
// and that you're using ES modules (which we are, based on package.json "type": "module").
const db = await open({
  filename: './database.db',
  driver: sqlite3.Database
});

async function setup() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS learnings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic TEXT NOT NULL,
      category TEXT,
      status TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS interviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT,
      difficulty TEXT,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS preparation_scenarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scenario TEXT NOT NULL,
      topic TEXT
    );
  `);

  // Seed the database with some initial data if it's empty
  const learningsCount = await db.get('SELECT COUNT(*) as count FROM learnings');
  if (learningsCount.count === 0) {
    await db.run('INSERT INTO learnings (topic, category, status, notes) VALUES (?, ?, ?, ?)', 'React Hooks', 'Frontend', 'Completed', 'Covered useState, useEffect, useContext, and custom hooks.');
  }

  const interviewsCount = await db.get('SELECT COUNT(*) as count FROM interviews');
  if (interviewsCount.count === 0) {
    await db.run('INSERT INTO interviews (question, answer, difficulty, category) VALUES (?, ?, ?, ?)', 'What is the difference between a controlled and uncontrolled component in React?', 'A controlled component is one where React controls the form data...', 'Easy', 'React');
  }

  const scenariosCount = await db.get('SELECT COUNT(*) as count FROM preparation_scenarios');
  if (scenariosCount.count === 0) {
    await db.run('INSERT INTO preparation_scenarios (scenario, topic) VALUES (?, ?)', 'You are tasked with designing a system for a real-time chat application...', 'System Design');
  }
}

setup();

export default db;
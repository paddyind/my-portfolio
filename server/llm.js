import { Ollama } from 'ollama';

function normalizeHost(host) {
  const value = host || 'http://127.0.0.1:11434';
  return value.startsWith('http') ? value : `http://${value}`;
}

const ollamaHost = normalizeHost(process.env.OLLAMA_HOST);
export const ollamaClient = new Ollama({ host: ollamaHost });

export const isLlmEnabled = () => process.env.LLM_ENABLED === 'true';

export const getConfiguredModel = () => process.env.LLM_MODEL || 'gemma2:2b';

export async function getLlmStatus() {
  const enabled = isLlmEnabled();
  const model = getConfiguredModel();
  let connected = false;
  let available_models = [];

  if (enabled) {
    try {
      const { models } = await ollamaClient.list();
      available_models = (models || []).map((m) => m.name);
      connected = true;
      // verify configured model is pulled (optional warning only)
      const hasModel = available_models.some(
        (name) => name === model || name.startsWith(`${model}:`) || name.includes(model)
      );
      if (!hasModel && available_models.length > 0) {
        console.warn(`LLM model "${model}" not in Ollama list. Available: ${available_models.join(', ')}`);
      }
    } catch (error) {
      console.error('Ollama connection failed:', error.message);
      connected = false;
    }
  }

  return {
    enabled,
    connected,
    model,
    host: ollamaHost,
    available_models,
    features: [
      'scenario-generation',
      'topic-brainstorm',
      'learning-expansion',
      'quiz-generation',
    ],
  };
}

export async function generateChat(userPrompt, systemPrompt) {
  if (!isLlmEnabled()) {
    throw new Error('LLM is disabled. Set LLM_ENABLED=true to use AI features.');
  }

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: userPrompt });

  const response = await ollamaClient.chat({
    model: getConfiguredModel(),
    messages,
    stream: false,
  });

  return response.message?.content?.trim() || '';
}

const ARCHITECT_SYSTEM = `You are a private interview-prep assistant for a senior Cloud/Solutions/Enterprise Architect and Technology Leader with 19+ years in telecom BSS, multi-cloud, Kubernetes, and GenAI.
Respond with practical, interview-ready content. Be concise, structured, and technically accurate. Do not invent employers or credentials.`;

export async function brainstormTopic({ topic, category, context }) {
  const prompt = `Brainstorm interview refresher content for:
Topic: ${topic}
Category: ${category || 'General Architecture'}
${context ? `Existing notes: ${context}` : ''}

Return JSON only with this shape:
{
  "summary": "2-3 sentence overview",
  "key_points": ["5-8 bullet points"],
  "deep_dive": "2-3 paragraphs for learn-more depth",
  "talking_points": "STAR-style narrative hooks for interviews"
}`;

  const raw = await generateChat(prompt, ARCHITECT_SYSTEM);
  return parseJsonResponse(raw);
}

export async function expandLearning(learning) {
  const prompt = `Expand this knowledge-base topic for interview prep:
Topic: ${learning.topic}
Category: ${learning.category}
Summary: ${learning.summary || ''}
Key points: ${(learning.key_points || []).join('; ')}
Notes: ${learning.notes || ''}

Return JSON only:
{
  "key_points": ["5-8 additional or refined bullet points"],
  "deep_dive": "expanded learn-more section",
  "talking_points": "how to discuss this in a Solutions/EA/Leader interview"
}`;

  const raw = await generateChat(prompt, ARCHITECT_SYSTEM);
  return parseJsonResponse(raw);
}

export async function generateScenario(topic) {
  const prompt = `Generate a detailed technical leadership interview scenario for: ${topic || 'system design'}.
Format: realistic workplace challenge requiring strategic thinking and architecture decisions.
Include requirements, constraints, and expected deliverables. 2-4 sentences.`;

  return generateChat(prompt, ARCHITECT_SYSTEM);
}

function parseJsonResponse(raw) {
  const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return { raw_text: raw };
  }
}

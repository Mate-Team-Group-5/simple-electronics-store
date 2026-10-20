import dotenv from 'dotenv';
import { getCatalogText } from './catalog.js';

dotenv.config();

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';
const MAX_HISTORY = 10;
const MAX_MESSAGE_LENGTH = 1000;
const TIMEOUT_MS = 20000;

const SYSTEM_PROMPT = `You are a friendly shopping assistant of the online store "Nice Gadgets".
The store sells phones, tablets and accessories (Apple devices).
Delivery in Ukraine is by Nova Poshta (to a branch or a parcel locker).
Rules:
- Answer in the same language the user writes in (Ukrainian or English).
- Keep answers short: 2-4 sentences.
- Help only with questions about gadgets, choosing a device, the store, delivery and orders.
- If the question is not related to the store, politely say you can only help with gadgets.
- Recommend only products from the catalog below and use only its prices (USD).
- If the user asks for a product that is not in the catalog, say the store does not sell it and suggest a similar one from the catalog.

Catalog (model, category, year: sizes; colors; price):`;

function isValidMessage(message) {
  return (
    message !== null &&
    typeof message === 'object' &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

async function chatHandler(req, res) {
  const { messages } = req.body ?? {};

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    !messages.every(isValidMessage)
  ) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'AI is not configured' });
  }

  const history = messages
    .slice(-MAX_HISTORY)
    .map(({ role, content }) => ({ role, content }));

  try {
    const catalog = await getCatalogText();

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: `${SYSTEM_PROMPT}\n${catalog}` },
          ...history,
        ],
        temperature: 0.5,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error('Groq error:', response.status, await response.text());

      if (response.status === 429) {
        return res.status(429).json({ error: 'Too many requests' });
      }

      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: 'Empty AI response' });
    }

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);

    if (err.name === 'TimeoutError') {
      return res.status(504).json({ error: 'AI response timeout' });
    }

    res.status(500).json({ error: 'Server error' });
  }
}

export default chatHandler;

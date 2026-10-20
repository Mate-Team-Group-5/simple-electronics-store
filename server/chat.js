import dotenv from 'dotenv';
import { findProduct, getCatalogText } from './catalog.js';

dotenv.config();

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const MAX_HISTORY = 10;
const MAX_MESSAGE_LENGTH = 1000;
const TIMEOUT_MS = 20000;
const PRODUCT_ID_PATTERN = /^[a-z0-9-]{1,100}$/;

const SYSTEM_PROMPT = `You are a friendly shopping assistant of the online store "Nice Gadgets".
The store sells phones, tablets and accessories (Apple devices).
Delivery in Ukraine is by Nova Poshta (to a branch or a parcel locker).
Rules:
- Keep answers short: 2-4 sentences.
- Write plain text without markdown (no **, # or * lists).
- Help only with questions about gadgets, choosing a device, the store, delivery and orders.
- If the question is not related to the store, politely say you can only help with gadgets.
- Recommend only products from the catalog below and use only its prices (USD).
- If the user asks for a product that is not in the catalog, say the store does not sell it and suggest a similar one from the catalog.
- When you recommend a product from the catalog, write its id in double square brackets right after its name, exactly as in the catalog, for example: Apple iPhone 11 [[apple-iphone-11-64gb-black]]. Use only ids from the catalog and at most 3 ids per answer.

Catalog (model [[id]] (category, year): sizes; colors; price):`;

const LANGUAGE_RULES = {
  uk: 'Always answer in Ukrainian. Only if the user writes in English, answer in English.',
  en: 'Always answer in English. Only if the user writes in Ukrainian, answer in Ukrainian.',
};

function buildProductContext(product) {
  if (!product) {
    return '';
  }

  return `
The user is now on the page of this product: ${product.name} [[${product.itemId}]], price $${product.price} (old price $${product.fullPrice}), memory ${product.capacity}, RAM ${product.ram}, screen ${product.screen}, color ${product.color}, year ${product.year}.
If the user says "this", "it" or asks about the product without naming it, they mean this product.`;
}

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
  const { messages, language, currentProductId } = req.body ?? {};

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

  const languageRule =
    language === 'en' ? LANGUAGE_RULES.en : LANGUAGE_RULES.uk;

  const history = messages
    .slice(-MAX_HISTORY)
    .map(({ role, content }) => ({ role, content }));

  try {
    const catalog = await getCatalogText();
    const currentProduct =
      (
        typeof currentProductId === 'string' &&
        PRODUCT_ID_PATTERN.test(currentProductId)
      ) ?
        await findProduct(currentProductId)
      : null;

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: `${languageRule}\n${SYSTEM_PROMPT}\n${catalog}${buildProductContext(currentProduct)}`,
          },
          ...history,
        ],
        temperature: 0.5,
        max_completion_tokens: 1024,
        reasoning_effort: 'low',
        include_reasoning: false,
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

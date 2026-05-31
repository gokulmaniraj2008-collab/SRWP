import { NextResponse } from "next/server";

// ── Dual Key Config ───────────────────────────────────────────────────────────
const GROQ_KEYS = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
].filter(Boolean);

if (GROQ_KEYS.length === 0) {
  console.error("No Groq API keys found. Add GROQ_API_KEY to .env.local");
}

// Track which key is active (in-memory, resets on cold start)
let activeKeyIndex = 0;

const getKey = () => GROQ_KEYS[activeKeyIndex % GROQ_KEYS.length];

const rotateKey = () => {
  activeKeyIndex = (activeKeyIndex + 1) % GROQ_KEYS.length;
  console.warn(`Groq key rotated → using key ${activeKeyIndex + 1}`);
};

// ── Crisis Keywords ───────────────────────────────────────────────────────────
// Tamil + English crisis detection
const CRISIS_KEYWORDS = [
  // English
  "suicide", "kill myself", "end my life", "want to die", "no reason to live",
  "can't go on", "give up on life", "self harm", "hurt myself",
  // Tamil (romanized)
  "suicide pannanum", "saaga poreen", "saavanum", "vaazhkai vendum illai",
  "enakku vaazhka pidikala", "thaan kolai", "unavai maruthukirein",
];

const detectCrisis = (text) => {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(k => lower.includes(k));
};

// ── Emotion Detection ─────────────────────────────────────────────────────────
const detectEmotion = (text) => {
  const lower = text.toLowerCase();
  if (["sad", "crying", "depressed", "hopeless", "alone", "lonely", "azhukirein", "kavalai"].some(w => lower.includes(w))) return "sad";
  if (["angry", "frustrated", "useless", "hate", "kovam", "keruppu"].some(w => lower.includes(w))) return "angry";
  if (["scared", "worried", "anxious", "nervous", "bayam", "tension"].some(w => lower.includes(w))) return "anxious";
  return "neutral";
};

// ── Tone by Emotion ───────────────────────────────────────────────────────────
const getToneInstruction = (emotion) => {
  switch (emotion) {
    case "sad":     return "The user seems sad. Be gentle, compassionate and warm. Acknowledge their feelings first before giving advice.";
    case "angry":   return "The user seems frustrated or angry. Be calm, understanding and non-judgmental. Validate their feelings.";
    case "anxious": return "The user seems anxious or worried. Break your answer into small, clear steps. Be reassuring and patient.";
    default:        return "Be helpful, clear and encouraging.";
  }
};

// ── Language Detection ────────────────────────────────────────────────────────
const detectLanguage = (text) => {
  // Check for Tamil Unicode characters
  if (/[\u0B80-\u0BFF]/.test(text)) return "tamil";
  // Check for common Tanglish patterns
  const tanglish = ["naan", "enna", "epdi", "enga", "avan", "aval", "inga", "unga", "romba", "konjam", "paaru", "sollu", "vanakam", "seri"];
  if (tanglish.some(w => text.toLowerCase().includes(w))) return "tanglish";
  return "english";
};

const getLanguageInstruction = (lang) => {
  switch (lang) {
    case "tamil":    return "The user is writing in Tamil. Reply in Tamil (Unicode Tamil script).";
    case "tanglish": return "The user is writing in Tanglish (Tamil words in English script). Reply in Tanglish — Tamil words written in English letters, mixed naturally with English.";
    default:         return "Reply in clear, simple English suitable for all education levels.";
  }
};

// ── Crisis Response ───────────────────────────────────────────────────────────
const CRISIS_RESPONSE = {
  message: "I can see you're going through something very difficult right now. You are not alone. Please speak to someone you trust — a family member, friend, teacher, or a mental health professional near you.",
  helplines: [],
  followUp: "You matter. Please reach out to someone you trust right now. You do not have to face this alone.",
};

// ── Main GGE System Prompt ────────────────────────────────────────────────────
const buildSystemPrompt = (emotion, language, userName) => `
You are GGE AI — a helpful, caring assistant built by GKFXL for every Indian.
Your mission: Guide, Grow, Earn — help Indians regardless of money, location or background.

USER: ${userName || "a GGE user"}
TONE: ${getToneInstruction(emotion)}
LANGUAGE: ${getLanguageInstruction(language)}

RULES:
1. Always give practical, actionable advice suited for India
2. Keep responses concise — mobile users read on small screens
3. At the end of EVERY response, give exactly 4 follow-up options the user can click, formatted like this:
   OPTIONS:
   1. [option one]
   2. [option two]
   3. [option three]
   4. [option four]
4. Never mention other AI companies (OpenAI, Google, etc.)
5. If asked about government schemes, always mention Tamil Nadu schemes first if relevant
6. You cover: careers, farming, money, legal rights, education, health, government schemes, business
7. Be honest — if you don't know something, say so clearly
8. Never give specific medical diagnoses or legal verdicts — guide to the right professional
`.trim();

// ── Groq API Call with Auto-Rotation ─────────────────────────────────────────
const callGroq = async (messages, systemPrompt, retries = 0) => {
  if (GROQ_KEYS.length === 0) throw new Error("No Groq API keys configured");
  if (retries >= GROQ_KEYS.length) throw new Error("All Groq keys exhausted");

  const key = getKey();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });

  // Rate limit hit — rotate key and retry
  if (response.status === 429) {
    console.warn(`Groq key ${activeKeyIndex + 1} rate limited — rotating`);
    rotateKey();
    return callGroq(messages, systemPrompt, retries + 1);
  }

  // Auth error — rotate key and retry
  if (response.status === 401) {
    console.error(`Groq key ${activeKeyIndex + 1} auth failed — rotating`);
    rotateKey();
    return callGroq(messages, systemPrompt, retries + 1);
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq error ${response.status}: ${err}`);
  }

  return response.json();
};

// ── Parse Options from AI Response ───────────────────────────────────────────
const parseOptions = (text) => {
  const lines = text.split("\n");
  const options = [];
  let cleanText = text;

  const optionsIndex = lines.findIndex(l => l.trim().toUpperCase().startsWith("OPTIONS:"));
  if (optionsIndex !== -1) {
    cleanText = lines.slice(0, optionsIndex).join("\n").trim();
    for (let i = optionsIndex + 1; i < lines.length; i++) {
      const match = lines[i].match(/^\d+\.\s+(.+)/);
      if (match) options.push(match[1].trim());
    }
  }

  return { cleanText, options: options.slice(0, 4) };
};

// ── POST Handler ──────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, userName, userId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array is required" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    // Crisis check — immediate override
    if (detectCrisis(lastMessage)) {
      return NextResponse.json({
        reply: CRISIS_RESPONSE.message,
        helplines: CRISIS_RESPONSE.helplines,
        followUp: CRISIS_RESPONSE.followUp,
        isCrisis: true,
        options: [
          "I want to talk more",
          "I want to talk more",
          "I am safe, just needed to express",
          "Show me more resources",
        ],
      });
    }

    // Detect emotion + language from last message
    const emotion = detectEmotion(lastMessage);
    const language = detectLanguage(lastMessage);
    const systemPrompt = buildSystemPrompt(emotion, language, userName);

    // Call Groq with auto-rotation
    const data = await callGroq(messages, systemPrompt);
    const raw = data.choices?.[0]?.message?.content || "";
    const { cleanText, options } = parseOptions(raw);

    return NextResponse.json({
      reply: cleanText,
      options,
      emotion,
      language,
      keyUsed: activeKeyIndex + 1,
      isCrisis: false,
    });

  } catch (err) {
    console.error("Groq route error:", err.message);

    // Friendly error — never expose raw errors to user
    return NextResponse.json({
      reply: "Sorry, I couldn't process that right now. Please try again in a moment.",
      options: [
        "Try again",
        "Ask something else",
        "Check my internet connection",
        "Contact support",
      ],
      error: true,
    }, { status: 200 }); // 200 so frontend doesn't crash
  }
}

// ── GET — Health check ────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    status: "ok",
    keys: GROQ_KEYS.length,
    activeKey: activeKeyIndex + 1,
    model: "llama3-8b-8192",
  });
}

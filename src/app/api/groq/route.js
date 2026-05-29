import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, systemPrompt } = body;

    // Validate inputs
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    if (!systemPrompt || !systemPrompt.trim()) {
      return NextResponse.json({ error: "No system prompt provided" }, { status: 400 });
    }

    // Key is on SERVER only — never sent to browser
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key not configured. Add GROQ_API_KEY in Vercel environment variables." },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: err.error?.message || "Groq API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      result: data.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

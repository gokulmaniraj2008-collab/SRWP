import { useState, useEffect, useRef } from "react";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  bg: "#f8f8f6",
  white: "#ffffff",
  black: "#0c0c0c",
  gray50: "#f4f4f2",
  gray100: "#ebebea",
  gray200: "#d8d8d5",
  gray400: "#9a9a94",
  gray600: "#5c5c56",
  accent: "#0c0c0c",
  green: "#1a6b3c",
  greenBg: "#e6f4ec",
  red: "#b91c1c",
  redBg: "#fef2f2",
  blue: "#1d4ed8",
  blueBg: "#eff6ff",
  amber: "#92400e",
  amberBg: "#fffbeb",
};

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const Icon = ({ n, size = 18, color = "currentColor", stroke = 1.8 }) => {
  const paths = {
    home: <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z" />,
    problems: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
    community: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" /><circle cx="17" cy="9" r="2" /><path d="M21 21v-1.5a3 3 0 00-2-2.83" /></>,
    ai: <><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" /><path d="M12 6v6l4 2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
    help: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>,
    lightbulb: <><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
    send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
    check: <polyline points="20 6 9 12 4 10" />,
    info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
    moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
    key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
    vercel: <path d="M12 2L2 19.5h20L12 2z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[n]}
    </svg>
  );
};

// ── Groq API Call ─────────────────────────────────────────────────────────────
const callGroq = async (apiKey, messages, systemPrompt) => {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
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
    throw new Error(err.error?.message || "Groq API error");
  }
  const data = await res.json();
  return data.choices[0].message.content;
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.bg}; font-family: 'DM Sans', sans-serif; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes shimmer { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
    .fade1{animation:fadeUp 0.5s ease forwards;animation-delay:0.05s;opacity:0}
    .fade2{animation:fadeUp 0.5s ease forwards;animation-delay:0.15s;opacity:0}
    .fade3{animation:fadeUp 0.5s ease forwards;animation-delay:0.25s;opacity:0}
    .fade4{animation:fadeUp 0.5s ease forwards;animation-delay:0.35s;opacity:0}
    .fade5{animation:fadeUp 0.5s ease forwards;animation-delay:0.45s;opacity:0}
    .card{transition:transform 0.18s,box-shadow 0.18s}
    .card:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,0,0,0.07)}
    .btn{transition:all 0.18s;cursor:pointer}
    .btn:hover{opacity:0.88;transform:translateY(-1px)}
    .btn:active{transform:scale(0.97)}
    input:focus,textarea:focus{outline:none;border-color:${C.black} !important}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${C.gray200};border-radius:4px}
    .shimmer{background:linear-gradient(90deg,${C.gray100} 25%,${C.gray50} 50%,${C.gray100} 75%);background-size:400px 100%;animation:shimmer 1.4s infinite}
  `}</style>
);

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = ({ size = 20, color = C.black }) => (
  <div style={{ width: size, height: size, border: `2px solid ${C.gray200}`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
);

// ── Logo ──────────────────────────────────────────────────────────────────────
const Logo = ({ size = "md" }) => {
  const s = { lg: 56, md: 36, sm: 28 }[size];
  const fs = { lg: 22, md: 14, fs: 11 }[size];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: s, height: s, background: C.black, borderRadius: Math.round(s * 0.25), display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 3s ease-in-out infinite", flexShrink: 0 }}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: s * 0.4, fontFamily: "'Syne', sans-serif" }}>S</span>
      </div>
      {size !== "icon" && (
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: fs + 4, letterSpacing: -0.5, lineHeight: 1 }}>SRWP</div>
          {size === "lg" && <div style={{ fontSize: 12, color: C.gray400, fontWeight: 500, marginTop: 2 }}>Solving Real World Problems</div>}
        </div>
      )}
    </div>
  );
};

// ── Tag ───────────────────────────────────────────────────────────────────────
const Tag = ({ label, color = "default" }) => {
  const colors = {
    default: { bg: C.gray100, text: C.gray600 },
    green: { bg: C.greenBg, text: C.green },
    blue: { bg: C.blueBg, text: C.blue },
    amber: { bg: C.amberBg, text: C.amber },
    red: { bg: C.redBg, text: C.red },
  };
  const s = colors[color] || colors.default;
  return <span style={{ fontSize: 11, fontWeight: 700, background: s.bg, color: s.text, padding: "3px 9px", borderRadius: 6, letterSpacing: 0.2 }}>{label}</span>;
};

// ── Bottom Nav ────────────────────────────────────────────────────────────────
const BottomNav = ({ page, setPage }) => {
  const tabs = [
    { id: "home", icon: "home", label: "Home" },
    { id: "problems", icon: "problems", label: "Problems" },
    { id: "community", icon: "community", label: "Community" },
    { id: "ai", icon: "ai", label: "AI Guide" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.gray200}`, display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom, 8px)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px 6px", border: "none", background: "none", cursor: "pointer", color: page === t.id ? C.black : C.gray400, transition: "color 0.2s" }}>
          <Icon n={t.icon} size={20} color={page === t.id ? C.black : C.gray400} />
          <span style={{ fontSize: 9, fontWeight: page === t.id ? 700 : 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.3 }}>{t.label}</span>
          {page === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.black }} />}
        </button>
      ))}
    </nav>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
const LandingPage = ({ onLogin }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", background: C.bg }}>
    <div className="fade1" style={{ marginBottom: 36 }}>
      <Logo size="lg" />
    </div>
    <div className="fade2" style={{ textAlign: "center", marginBottom: 14 }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, color: C.black }}>
        Where Problems<br />Meet Solutions
      </h1>
    </div>
    <div className="fade3" style={{ textAlign: "center", marginBottom: 40, maxWidth: 300 }}>
      <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.65 }}>
        A community platform to identify real-world problems, form teams, and build solutions using AI — together.
      </p>
    </div>
    <div className="fade4" style={{ width: "100%", maxWidth: 340 }}>
      <button className="btn" onClick={onLogin} style={{ width: "100%", padding: "15px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "'DM Sans', sans-serif" }}>
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
        Continue with Google
      </button>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: C.gray400 }}>Free to join · No credit card needed</p>
    </div>
    <div className="fade5" style={{ marginTop: 52, display: "flex", gap: 28 }}>
      {["Community First", "AI Powered", "100% Free"].map(t => (
        <span key={t} style={{ fontSize: 11, fontWeight: 600, color: C.gray400, letterSpacing: 0.4 }}>{t}</span>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// API KEY SETUP PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ApiKeyPage = ({ onSave }) => {
  const [key, setKey] = useState("");
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");

  const testAndSave = async () => {
    if (!key.trim().startsWith("gsk_")) { setError("Invalid key format. Groq keys start with 'gsk_'"); return; }
    setTesting(true); setError("");
    try {
      await callGroq(key.trim(), [{ role: "user", content: "Say OK" }], "Reply with just the word OK.");
      onSave(key.trim());
    } catch (e) {
      setError("API key test failed: " + e.message);
    } finally { setTesting(false); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, background: C.bg }}>
      <div className="fade1" style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: C.black, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon n="key" size={24} color="#fff" />
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8 }}>Connect Groq AI</h2>
          <p style={{ color: C.gray600, fontSize: 14, lineHeight: 1.6 }}>Enter your Groq API key to enable real AI-powered problem analysis and prompt generation.</p>
        </div>

        <div style={{ background: C.amberBg, border: `1px solid #fcd34d`, borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 8 }}>
          <Icon n="info" size={15} color={C.amber} />
          <p style={{ fontSize: 12, color: C.amber, lineHeight: 1.5 }}>Your key is stored only in your browser session and never sent to any server except Groq.</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Groq API Key</label>
          <input value={key} onChange={e => { setKey(e.target.value); setError(""); }}
            type="password" placeholder="gsk_..." style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${error ? C.red : C.gray200}`, fontSize: 14, background: C.white, fontFamily: "monospace" }} />
          {error && <p style={{ fontSize: 12, color: C.red, marginTop: 6 }}>{error}</p>}
        </div>

        <button className="btn" onClick={testAndSave} disabled={testing || !key.trim()} style={{ width: "100%", padding: "13px", background: key.trim() ? C.black : C.gray200, color: key.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {testing ? <><Spinner size={16} color="#fff" /> Testing key...</> : "Connect & Continue"}
        </button>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: C.gray400 }}>
          Get your free key at <span style={{ color: C.blue, fontWeight: 600 }}>console.groq.com</span>
        </p>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════════════════
const HomePage = ({ user, setPage, problems }) => {
  const howItWorks = [
    { icon: "target", title: "Share Problem", desc: "Post a real problem you face" },
    { icon: "users", title: "Form Team", desc: "Min 2 members join together" },
    { icon: "lightbulb", title: "Discuss", desc: "Vote and decide solution" },
    { icon: "zap", title: "AI Prompt", desc: "Get custom AI prompt" },
    { icon: "github", title: "Build", desc: "Generate code with Claude" },
    { icon: "vercel", title: "Deploy", desc: "Go live on Vercel" },
  ];

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <div className="fade1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 13, color: C.gray400, fontWeight: 500 }}>Welcome back</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{user.name}</h2>
        </div>
        <Logo size="sm" />
      </div>

      {/* Mission Banner */}
      <div className="fade2" style={{ background: C.black, borderRadius: 18, padding: "22px 20px", marginBottom: 28, color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, opacity: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Our Mission</p>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>Solving Real World<br />Problems Together</h3>
        <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.6, marginBottom: 18 }}>
          SRWP is an open community where anyone can share problems, team up, generate AI prompts, and launch real solutions — completely free.
        </p>
        <button className="btn" onClick={() => setPage("problems")} style={{ background: "#fff", color: C.black, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
          Submit a Problem <Icon n="chevronRight" size={13} />
        </button>
      </div>

      {/* Stats — real count */}
      <div className="fade3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
        {[
          { n: problems.length, l: "Problems" },
          { n: problems.reduce((a, p) => a + p.teams, 0), l: "Teams" },
          { n: problems.filter(p => p.status === "solved").length, l: "Solved" },
        ].map((s, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 12, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 2 }}>{s.n}</p>
            <p style={{ fontSize: 11, color: C.gray400, fontWeight: 500 }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="fade4">
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>How SRWP Works</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {howItWorks.map((h, i) => (
            <div key={i} className="card" style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.gray100}` }}>
              <div style={{ width: 34, height: 34, background: C.gray50, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon n={h.icon} size={16} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{h.title}</p>
              <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.4 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PROBLEMS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ProblemsPage = ({ problems, setProblems, apiKey }) => {
  const [view, setView] = useState("feed");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", solution: "" });
  const [reply, setReply] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");

  const submit = async () => {
    if (!form.title.trim()) return;
    setAnalyzing(true);
    let analysis = "";
    try {
      analysis = await callGroq(apiKey, [{ role: "user", content: `Problem: ${form.title}\n\nDescription: ${form.desc}\n\nKnown solution idea: ${form.solution || "None"}` }],
        "You are a problem analyst. Analyze this real-world problem in 2-3 sentences. Identify who is affected, why it matters, and what category it falls under. Be concise and practical.");
    } catch { analysis = "Analysis unavailable."; }
    setProblems(p => [...p, {
      id: Date.now(), title: form.title, desc: form.desc,
      solution: form.solution, analysis, votes: 0, replies: [], teams: 0,
      tag: "General", status: "open", submittedBy: "You",
    }]);
    setForm({ title: "", desc: "", solution: "" });
    setAnalyzing(false);
    setView("feed");
  };

  const sendReply = (id) => {
    if (!reply.trim()) return;
    setProblems(ps => ps.map(p => p.id === id ? { ...p, replies: [...p.replies, { text: reply, author: "You", time: "now" }] } : p));
    setReply("");
  };

  const vote = (id) => setProblems(ps => ps.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));

  if (selected) {
    const p = problems.find(x => x.id === selected);
    if (!p) return null;
    return (
      <div style={{ padding: "24px 20px 100px" }}>
        <button onClick={() => { setSelected(null); setAiAnalysis(""); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.gray600, fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Icon n="arrowLeft" size={16} /> Back to Feed
        </button>
        <Tag label={p.tag} />
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, margin: "10px 0 8px" }}>{p.title}</h2>
        <p style={{ color: C.gray600, fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>

        {p.analysis && (
          <div style={{ background: C.blueBg, border: `1px solid #bfdbfe`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 6 }}>
              <Icon n="zap" size={13} color={C.blue} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>AI Analysis</span>
            </div>
            <p style={{ fontSize: 13, color: C.blue, lineHeight: 1.6 }}>{p.analysis}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button className="btn" onClick={() => setProblems(ps => ps.map(x => x.id === p.id ? { ...x, teams: x.teams + 1 } : x))} style={{ flex: 1, padding: 11, background: C.black, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
            Join Team ({p.teams})
          </button>
          <button className="btn" onClick={() => vote(p.id)} style={{ padding: "11px 16px", background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 10, fontWeight: 700, fontSize: 13, color: C.black }}>
            Vote {p.votes}
          </button>
        </div>

        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Replies ({p.replies.length})</h4>
        {p.replies.length === 0 ? (
          <div style={{ background: C.gray50, borderRadius: 10, padding: 16, marginBottom: 12, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: C.gray400 }}>No replies yet. Be first to suggest a solution.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {p.replies.map((r, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 10, padding: 12, border: `1px solid ${C.gray100}` }}>
                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: C.gray600 }}>{r.author} · {r.time}</p>
                <p style={{ fontSize: 13, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === "Enter" && sendReply(p.id)} placeholder="Suggest a solution..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 13, background: C.white }} />
          <button className="btn" onClick={() => sendReply(p.id)} style={{ padding: "10px 14px", background: C.black, color: "#fff", border: "none", borderRadius: 10 }}>
            <Icon n="send" size={15} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Problems</h2>
        <button className="btn" onClick={() => setView(v => v === "feed" ? "submit" : "feed")} style={{ display: "flex", alignItems: "center", gap: 6, background: C.black, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 700 }}>
          <Icon n={view === "feed" ? "plus" : "arrowLeft"} size={14} color="#fff" />
          {view === "feed" ? "Submit" : "Back"}
        </button>
      </div>

      {view === "submit" ? (
        <div style={{ background: C.white, borderRadius: 16, padding: 20, border: `1px solid ${C.gray100}` }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Share Your Problem</h3>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 18 }}>AI will analyse your problem automatically</p>
          {[
            { label: "Problem Title *", key: "title", ph: "What is the problem?", rows: 1 },
            { label: "Describe in detail", key: "desc", ph: "Who is affected? Why does it happen?", rows: 3 },
            { label: "Do you know any solution?", key: "solution", ph: "Optional — share any ideas you have", rows: 2 },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{f.label}</label>
              {f.rows === 1 ? (
                <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: 14, background: C.white }} />
              ) : (
                <textarea value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} rows={f.rows} style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: 14, resize: "none", background: C.white }} />
              )}
            </div>
          ))}
          <button className="btn" onClick={submit} disabled={analyzing || !form.title.trim()} style={{ width: "100%", padding: "13px", background: form.title.trim() ? C.black : C.gray200, color: form.title.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {analyzing ? <><Spinner size={16} color="#fff" /> AI is analysing...</> : "Submit Problem"}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {problems.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", color: C.gray400 }}>
              <Icon n="target" size={36} color={C.gray200} />
              <p style={{ marginTop: 12, fontSize: 14 }}>No problems yet. Be the first to submit one.</p>
            </div>
          )}
          {problems.map(p => (
            <div key={p.id} className="card" onClick={() => setSelected(p.id)} style={{ background: C.white, borderRadius: 14, padding: 16, border: `1px solid ${C.gray100}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <Tag label={p.tag} />
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 11, color: C.gray400 }}>{p.votes} votes</span>
                  <span style={{ fontSize: 11, color: C.gray400 }}>{p.replies.length} replies</span>
                </div>
              </div>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{p.title}</h4>
              <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.45, marginBottom: 10 }}>{p.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon n="users" size={13} color={C.gray400} />
                <span style={{ fontSize: 12, color: C.gray400 }}>{p.teams} team{p.teams !== 1 ? "s" : ""}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// COMMUNITY PAGE
// ══════════════════════════════════════════════════════════════════════════════
const CommunityPage = ({ problems }) => {
  const teams = problems.filter(p => p.teams > 0);
  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>Community</h2>
      <p style={{ color: C.gray400, fontSize: 14, marginBottom: 24 }}>Active teams solving real problems</p>

      {teams.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: C.gray400 }}>
          <Icon n="users" size={36} color={C.gray200} />
          <p style={{ marginTop: 12, fontSize: 14 }}>No active teams yet. Join a problem to start one.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {teams.map((p, i) => (
            <div key={i} className="card" style={{ background: C.white, borderRadius: 14, padding: 16, border: `1px solid ${C.gray100}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700 }}>{p.title}</h4>
                <Tag label="Active" color="green" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <Icon n="users" size={13} color={C.gray400} />
                  <span style={{ fontSize: 12, color: C.gray400 }}>{p.teams} member{p.teams !== 1 ? "s" : ""}</span>
                </div>
                <button className="btn" style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>Message</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: C.gray50, borderRadius: 16, padding: 20, textAlign: "center", border: `1px solid ${C.gray100}` }}>
        <Icon n="users" size={28} color={C.gray400} />
        <p style={{ fontWeight: 700, fontSize: 14, marginTop: 10, marginBottom: 4 }}>Start a Team</p>
        <p style={{ fontSize: 13, color: C.gray400, marginBottom: 14, lineHeight: 1.5 }}>Submit a problem, get at least 1 person to join, and start building together.</p>
        <Tag label="Min 2 members required" color="amber" />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// AI GUIDE PAGE — REAL GROQ
// ══════════════════════════════════════════════════════════════════════════════
const AIGuidePage = ({ apiKey }) => {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const analyse = async () => {
    if (!problem.trim()) return;
    setLoading(true); setError("");
    try {
      const res = await callGroq(apiKey,
        [{ role: "user", content: `Real-world problem to solve: ${problem}` }],
        `You are an expert product analyst and web developer. When given a real-world problem:
1. Analyse who is affected and why it matters (2 sentences)
2. Suggest the best web-based solution (2 sentences)  
3. List 4 core features the website needs
4. Suggest the tech stack (Next.js, Supabase, etc.)
Be concise, practical, and specific. Format with clear sections.`
      );
      setAnalysis(res);
      setStep(1);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const generatePrompt = async () => {
    setLoading(true); setError("");
    try {
      const res = await callGroq(apiKey,
        [{ role: "user", content: `Problem: ${problem}\n\nAnalysis: ${analysis}` }],
        `You are an expert at writing AI prompts for building websites. Generate a detailed, copy-paste ready prompt that a user can paste into Claude AI to build a complete website solving their problem. The prompt should specify: the exact website to build, all required pages, features, tech stack (Next.js + Tailwind + Supabase), UI design style, and ask for complete working code. Make it specific and production-ready. Start directly with "Build a..." or "Create a..."`
      );
      setPrompt(res);
      setStep(2);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard?.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const deploySteps = [
    { icon: "ai", title: "Use Prompt in Claude", desc: "Open Claude app → New chat → Paste your prompt → Claude generates complete code" },
    { icon: "github", title: "Save to GitHub", desc: "Create account at github.com → New repo → Upload code files → Your code is saved online" },
    { icon: "vercel", title: "Deploy on Vercel", desc: "Go to vercel.com → Import GitHub repo → Click Deploy → Your website is live instantly" },
    { icon: "check", title: "Fix Issues with Claude", desc: "If anything breaks → Screenshot the error → Upload to Claude → Claude gives you the fix" },
  ];

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>AI Build Guide</h2>
      <p style={{ color: C.gray400, fontSize: 14, marginBottom: 20 }}>Powered by Groq · Real AI · Not a template</p>

      {/* Progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {["Describe", "Analyse", "Prompt", "Deploy"].map((s, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? C.black : C.gray200, transition: "background 0.3s" }} />
        ))}
      </div>

      {error && (
        <div style={{ background: C.redBg, border: `1px solid #fca5a5`, borderRadius: 10, padding: 12, marginBottom: 16, display: "flex", gap: 8 }}>
          <Icon n="info" size={15} color={C.red} />
          <p style={{ fontSize: 13, color: C.red }}>{error}</p>
        </div>
      )}

      {/* Step 0 */}
      {step === 0 && (
        <div className="fade1" style={{ background: C.white, borderRadius: 16, padding: 20, border: `1px solid ${C.gray100}` }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Describe Your Problem</h3>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 16 }}>Groq AI will analyse it and generate a real solution prompt</p>
          <textarea value={problem} onChange={e => setProblem(e.target.value)}
            placeholder="e.g. Small farmers in rural India cannot find direct buyers for their produce and lose 40% of profit to middlemen..." rows={5}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, resize: "none", background: C.white, lineHeight: 1.6 }} />
          <button className="btn" onClick={analyse} disabled={loading || !problem.trim()} style={{ width: "100%", marginTop: 14, padding: 13, background: problem.trim() ? C.black : C.gray200, color: problem.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Spinner size={16} color="#fff" /> Groq is analysing...</> : <><Icon n="zap" size={15} color="#fff" /> Analyse with Groq AI</>}
          </button>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="fade1">
          <div style={{ background: C.blueBg, border: `1px solid #bfdbfe`, borderRadius: 14, padding: 18, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <Icon n="zap" size={16} color={C.blue} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>Groq AI Analysis</span>
            </div>
            <p style={{ fontSize: 13, color: C.blue, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{analysis}</p>
          </div>
          <button className="btn" onClick={generatePrompt} disabled={loading} style={{ width: "100%", padding: 13, background: C.black, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Spinner size={16} color="#fff" /> Generating prompt...</> : <><Icon n="lightbulb" size={15} color="#fff" /> Generate Website Prompt</>}
          </button>
          <button onClick={() => setStep(0)} style={{ width: "100%", marginTop: 8, padding: 11, background: "none", color: C.gray600, border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Edit Problem
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="fade1">
          <div style={{ background: C.white, borderRadius: 14, padding: 18, border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Your AI Prompt</span>
              <button className="btn" onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, background: copied ? C.greenBg : C.gray50, border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: copied ? C.green : C.black }}>
                <Icon n={copied ? "check" : "copy"} size={13} color={copied ? C.green : C.black} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ background: C.gray50, borderRadius: 9, padding: 14, maxHeight: 200, overflowY: "auto" }}>
              <pre style={{ fontSize: 12, color: C.gray600, whiteSpace: "pre-wrap", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{prompt}</pre>
            </div>
          </div>

          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Next Steps</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {deploySteps.map((s, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.gray100}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, background: C.black, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon n={s.icon} size={16} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>Step {i + 1}: {s.title}</p>
                  <p style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => { setStep(0); setProblem(""); setAnalysis(""); setPrompt(""); }} style={{ width: "100%", marginTop: 16, padding: 11, background: "none", color: C.gray600, border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Start New Problem
          </button>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const SettingsPage = ({ user, setUser, setLoggedIn, apiKey, setApiKey }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [showKey, setShowKey] = useState(false);

  const Row = ({ icon, label, value, onClick, danger, right }) => (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "none", border: "none", borderBottom: `1px solid ${C.gray50}`, cursor: "pointer", textAlign: "left" }}>
      <div style={{ width: 34, height: 34, background: danger ? C.redBg : C.gray50, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon n={icon} size={16} color={danger ? C.red : C.gray600} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: danger ? C.red : C.black, marginBottom: value ? 1 : 0 }}>{label}</p>
        {value && <p style={{ fontSize: 12, color: C.gray400 }}>{value}</p>}
      </div>
      {right || (!danger && <Icon n="chevronRight" size={15} color={C.gray400} />)}
    </button>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 22 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{title}</p>
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, overflow: "hidden" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 24 }}>Settings</h2>

      {/* Profile */}
      <div style={{ background: C.white, borderRadius: 16, padding: 18, border: `1px solid ${C.gray100}`, marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20 }}>{user.name[0]}</span>
        </div>
        <div style={{ flex: 1 }}>
          {editing ? (
            <div style={{ display: "flex", gap: 8 }}>
              <input value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontWeight: 700 }} />
              <button className="btn" onClick={() => { setUser({ ...user, name }); setEditing(false); }} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "7px 13px", fontSize: 12, fontWeight: 700 }}>Save</button>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{user.name}</p>
              <p style={{ fontSize: 13, color: C.gray400 }}>{user.email}</p>
            </>
          )}
        </div>
        {!editing && (
          <button className="btn" onClick={() => setEditing(true)} style={{ background: C.gray50, border: "none", borderRadius: 9, padding: 9, cursor: "pointer" }}>
            <Icon n="edit" size={16} />
          </button>
        )}
      </div>

      <Section title="Account">
        <Row icon="edit" label="Edit Profile" value="Update name and info" onClick={() => setEditing(true)} />
        <Row icon="bell" label="Notifications" value="Email and push alerts" onClick={() => {}} />
        <Row icon="lock" label="Privacy" value="Manage your data" onClick={() => {}} />
      </Section>

      <Section title="AI Configuration">
        <Row icon="key" label="Groq API Key" value={apiKey ? "Connected ✓" : "Not connected"} onClick={() => setShowKey(v => !v)}
          right={<Tag label={apiKey ? "Active" : "Missing"} color={apiKey ? "green" : "red"} />} />
        {showKey && (
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.gray50}` }}>
            <p style={{ fontSize: 11, color: C.gray400, marginBottom: 8 }}>Current key (hidden for security)</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="password" value={apiKey} readOnly style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.gray200}`, fontSize: 12, fontFamily: "monospace", background: C.gray50 }} />
              <button className="btn" onClick={() => setApiKey("")} style={{ background: C.redBg, color: C.red, border: "none", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 700 }}>Remove</button>
            </div>
          </div>
        )}
        <Row icon="zap" label="AI Model" value="Groq · llama-3.3-70b-versatile" onClick={() => {}} />
      </Section>

      <Section title="Preferences">
        <Row icon="globe" label="Language" value="English / Tamil / Tanglish" onClick={() => {}} />
        <Row icon="moon" label="Appearance" value="Light mode" onClick={() => {}} />
        <Row icon="shield" label="Security" value="Account protection" onClick={() => {}} />
      </Section>

      <Section title="Support">
        <Row icon="help" label="Help & FAQ" onClick={() => {}} />
        <Row icon="info" label="About SRWP" value="v1.0.0 · Real version" onClick={() => {}} />
      </Section>

      <Section title="">
        <Row icon="logout" label="Log Out" danger onClick={() => setLoggedIn(false)} />
      </Section>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [page, setPage] = useState("home");
  const [user, setUser] = useState({ name: "Gokul M", email: "gokul@gmail.com" });
  const [problems, setProblems] = useState([]);

  if (!loggedIn) return <><GlobalCSS /><LandingPage onLogin={() => setLoggedIn(true)} /></>;
  if (!apiKey) return <><GlobalCSS /><ApiKeyPage onSave={setApiKey} /></>;

  const pages = {
    home: <HomePage user={user} setPage={setPage} problems={problems} />,
    problems: <ProblemsPage problems={problems} setProblems={setProblems} apiKey={apiKey} />,
    community: <CommunityPage problems={problems} />,
    ai: <AIGuidePage apiKey={apiKey} />,
    settings: <SettingsPage user={user} setUser={setUser} setLoggedIn={setLoggedIn} apiKey={apiKey} setApiKey={setApiKey} />,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.bg, minHeight: "100vh", color: C.black }}>
      <GlobalCSS />
      {pages[page] || pages.home}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

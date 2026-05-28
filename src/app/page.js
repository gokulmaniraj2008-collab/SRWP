"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  bg: "#f8f8f6", white: "#ffffff", black: "#0c0c0c",
  gray50: "#f4f4f2", gray100: "#ebebea", gray200: "#d8d8d5",
  gray400: "#9a9a94", gray600: "#5c5c56",
  green: "#1a6b3c", greenBg: "#e6f4ec",
  red: "#b91c1c", redBg: "#fef2f2",
  blue: "#1d4ed8", blueBg: "#eff6ff",
  amber: "#92400e", amberBg: "#fffbeb",
};

// ── Secure AI call — goes to OUR server, not Groq directly ───────────────────
const callAI = async (messages, systemPrompt) => {
  const res = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "AI request failed");
  }
  const data = await res.json();
  return data.result;
};

// ── Icons ─────────────────────────────────────────────────────────────────────
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
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[n]}
    </svg>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Spinner = ({ size = 20, color = C.black }) => (
  <div style={{ width: size, height: size, border: `2px solid rgba(255,255,255,0.3)`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
);

const Tag = ({ label, color = "default" }) => {
  const s = { default: [C.gray100, C.gray600], green: [C.greenBg, C.green], blue: [C.blueBg, C.blue], amber: [C.amberBg, C.amber], red: [C.redBg, C.red] }[color] || [C.gray100, C.gray600];
  return <span style={{ fontSize: 11, fontWeight: 700, background: s[0], color: s[1], padding: "3px 9px", borderRadius: 6 }}>{label}</span>;
};

const Logo = ({ size = "md" }) => {
  const s = { lg: 56, md: 36, sm: 28 }[size] || 36;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: s, height: s, background: C.black, borderRadius: s * 0.25, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: s * 0.4, fontFamily: "Syne, sans-serif" }}>S</span>
      </div>
      {size !== "icon" && <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: size === "lg" ? 26 : 18, letterSpacing: -0.5 }}>SRWP</span>}
    </div>
  );
};

const BottomNav = ({ page, setPage }) => {
  const tabs = [
    { id: "home", icon: "home", label: "Home" },
    { id: "problems", icon: "problems", label: "Problems" },
    { id: "community", icon: "community", label: "Community" },
    { id: "ai", icon: "ai", label: "AI Guide" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.gray200}`, display: "flex", zIndex: 100, paddingBottom: 8 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px 4px", border: "none", background: "none", cursor: "pointer", color: page === t.id ? C.black : C.gray400 }}>
          <Icon n={t.icon} size={20} color={page === t.id ? C.black : C.gray400} />
          <span style={{ fontSize: 9, fontWeight: page === t.id ? 700 : 500 }}>{t.label}</span>
          {page === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.black }} />}
        </button>
      ))}
    </nav>
  );
};

// ── Landing ───────────────────────────────────────────────────────────────────
const LandingPage = ({ onLogin }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", background: C.bg }}>
    <div style={{ marginBottom: 32 }}><Logo size="lg" /></div>
    <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: -1.5, textAlign: "center", lineHeight: 1.15, marginBottom: 14 }}>
      Where Problems<br />Meet Solutions
    </h1>
    <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.65, textAlign: "center", maxWidth: 300, marginBottom: 40 }}>
      Community platform to identify real-world problems, form teams, and build AI-powered solutions — free.
    </p>
    <button onClick={onLogin} style={{ width: "100%", maxWidth: 340, padding: "15px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
    <p style={{ marginTop: 14, fontSize: 12, color: C.gray400 }}>Free to join · No credit card needed</p>
  </div>
);

// ── Home ──────────────────────────────────────────────────────────────────────
const HomePage = ({ user, setPage, problems }) => (
  <div style={{ padding: "24px 20px 100px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
      <div>
        <p style={{ fontSize: 13, color: C.gray400, fontWeight: 500 }}>Welcome back</p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{user.name}</h2>
      </div>
      <Logo size="sm" />
    </div>

    <div style={{ background: C.black, borderRadius: 18, padding: "22px 20px", marginBottom: 28, color: "#fff" }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, opacity: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Our Mission</p>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>Solving Real World<br />Problems Together</h3>
      <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.6, marginBottom: 18 }}>
        SRWP is an open community where anyone can share problems, team up, generate AI prompts, and launch real solutions — completely free.
      </p>
      <button onClick={() => setPage("problems")} style={{ background: "#fff", color: C.black, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
        Submit a Problem <Icon n="chevronRight" size={13} />
      </button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
      {[{ n: problems.length, l: "Problems" }, { n: problems.reduce((a, p) => a + p.teams, 0), l: "Teams" }, { n: problems.filter(p => p.status === "solved").length, l: "Solved" }].map((s, i) => (
        <div key={i} style={{ background: C.white, borderRadius: 12, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 2 }}>{s.n}</p>
          <p style={{ fontSize: 11, color: C.gray400 }}>{s.l}</p>
        </div>
      ))}
    </div>

    <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>How SRWP Works</h3>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {[
        { icon: "target", title: "Share Problem", desc: "Post a real problem you face" },
        { icon: "users", title: "Form Team", desc: "Min 2 members join together" },
        { icon: "lightbulb", title: "Discuss", desc: "Vote and decide on solution" },
        { icon: "zap", title: "AI Prompt", desc: "Get custom AI prompt" },
        { icon: "github", title: "Build", desc: "Generate code with Claude" },
        { icon: "globe", title: "Deploy", desc: "Go live on Vercel" },
      ].map((h, i) => (
        <div key={i} style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.gray100}` }}>
          <div style={{ width: 34, height: 34, background: C.gray50, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <Icon n={h.icon} size={16} />
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{h.title}</p>
          <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.4 }}>{h.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── Problems ──────────────────────────────────────────────────────────────────
const ProblemsPage = ({ problems, setProblems }) => {
  const [view, setView] = useState("feed");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", solution: "" });
  const [reply, setReply] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const submit = async () => {
    if (!form.title.trim()) return;
    setAnalyzing(true);
    let analysis = "";
    try {
      analysis = await callAI(
        [{ role: "user", content: `Problem: ${form.title}\nDescription: ${form.desc}\nKnown solution: ${form.solution || "None"}` }],
        "Analyse this real-world problem in 2-3 sentences. Identify who is affected, why it matters, and the category. Be concise and practical."
      );
    } catch { analysis = "Analysis unavailable — check server config."; }
    setProblems(p => [...p, { id: Date.now(), title: form.title, desc: form.desc, solution: form.solution, analysis, votes: 0, replies: [], teams: 0, tag: "General", status: "open" }]);
    setForm({ title: "", desc: "", solution: "" });
    setAnalyzing(false);
    setView("feed");
  };

  const vote = (id) => setProblems(ps => ps.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
  const joinTeam = (id) => setProblems(ps => ps.map(p => p.id === id ? { ...p, teams: p.teams + 1 } : p));
  const sendReply = (id) => {
    if (!reply.trim()) return;
    setProblems(ps => ps.map(p => p.id === id ? { ...p, replies: [...p.replies, { text: reply, author: "You", time: new Date().toLocaleTimeString() }] } : p));
    setReply("");
  };

  if (selected) {
    const p = problems.find(x => x.id === selected);
    if (!p) return null;
    return (
      <div style={{ padding: "24px 20px 100px" }}>
        <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.gray600, fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Icon n="arrowLeft" size={16} /> Back
        </button>
        <Tag label={p.tag} />
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, margin: "10px 0 8px" }}>{p.title}</h2>
        <p style={{ color: C.gray600, fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
        {p.analysis && (
          <div style={{ background: C.blueBg, border: `1px solid #bfdbfe`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 6 }}>
              <Icon n="zap" size={13} color={C.blue} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>AI Analysis (Secure)</span>
            </div>
            <p style={{ fontSize: 13, color: C.blue, lineHeight: 1.6 }}>{p.analysis}</p>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button onClick={() => joinTeam(p.id)} style={{ flex: 1, padding: 11, background: C.black, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Join Team ({p.teams})</button>
          <button onClick={() => vote(p.id)} style={{ padding: "11px 16px", background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Vote {p.votes}</button>
        </div>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Replies ({p.replies.length})</h4>
        {p.replies.length === 0
          ? <div style={{ background: C.gray50, borderRadius: 10, padding: 16, marginBottom: 12, textAlign: "center" }}><p style={{ fontSize: 13, color: C.gray400 }}>No replies yet.</p></div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {p.replies.map((r, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 10, padding: 12, border: `1px solid ${C.gray100}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: C.gray600 }}>{r.author} · {r.time}</p>
                  <p style={{ fontSize: 13 }}>{r.text}</p>
                </div>
              ))}
            </div>
        }
        <div style={{ display: "flex", gap: 8 }}>
          <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === "Enter" && sendReply(p.id)} placeholder="Suggest a solution..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 13, outline: "none" }} />
          <button onClick={() => sendReply(p.id)} style={{ padding: "10px 14px", background: C.black, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}>
            <Icon n="send" size={15} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Problems</h2>
        <button onClick={() => setView(v => v === "feed" ? "submit" : "feed")} style={{ display: "flex", alignItems: "center", gap: 6, background: C.black, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          <Icon n={view === "feed" ? "plus" : "arrowLeft"} size={14} color="#fff" />
          {view === "feed" ? "Submit" : "Back"}
        </button>
      </div>
      {view === "submit" ? (
        <div style={{ background: C.white, borderRadius: 16, padding: 20, border: `1px solid ${C.gray100}` }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Share Your Problem</h3>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 18 }}>AI analyses it securely on our server</p>
          {[
            { label: "Problem Title *", key: "title", ph: "What is the problem?", rows: 1 },
            { label: "Describe in detail", key: "desc", ph: "Who is affected? Why does it happen?", rows: 3 },
            { label: "Do you know any solution?", key: "solution", ph: "Optional", rows: 2 },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{f.label}</label>
              {f.rows === 1
                ? <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                : <textarea value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} rows={f.rows} style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: 14, resize: "none", outline: "none", boxSizing: "border-box" }} />
              }
            </div>
          ))}
          <button onClick={submit} disabled={analyzing || !form.title.trim()} style={{ width: "100%", padding: 13, background: form.title.trim() ? C.black : C.gray200, color: form.title.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {analyzing ? <><Spinner size={16} color="#fff" /> Analysing securely...</> : "Submit Problem"}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {problems.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", color: C.gray400 }}>
              <Icon n="target" size={36} color={C.gray200} />
              <p style={{ marginTop: 12, fontSize: 14 }}>No problems yet. Be the first.</p>
            </div>
          )}
          {problems.map(p => (
            <div key={p.id} onClick={() => setSelected(p.id)} style={{ background: C.white, borderRadius: 14, padding: 16, border: `1px solid ${C.gray100}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Tag label={p.tag} />
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 11, color: C.gray400 }}>{p.votes} votes</span>
                  <span style={{ fontSize: 11, color: C.gray400 }}>{p.replies.length} replies</span>
                </div>
              </div>
              <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{p.title}</h4>
              <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.45, marginBottom: 10 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 4 }}>
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

// ── Chat Room ─────────────────────────────────────────────────────────────────
const ChatRoom = ({ team, user, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  const roomId = `team_${team.id}`;

  useEffect(() => {
    if (!supabase) {
      setMessages([{ id: 1, author: "System", text: `Welcome to ${team.title} chat!`, created_at: new Date().toISOString() }]);
      setLoading(false);
      return;
    }
    const load = async () => {
      const { data } = await supabase.from("messages").select("*").eq("room_id", roomId).order("created_at", { ascending: true });
      setMessages(data || []);
      setLoading(false);
    };
    load();
    const channel = supabase.channel(roomId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` },
        p => setMessages(prev => [...prev, p.new]))
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [roomId, team.title]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!text.trim()) return;
    const msg = { room_id: roomId, author: user.name, text: text.trim() };
    setText("");
    if (!supabase) { setMessages(p => [...p, { ...msg, id: Date.now(), created_at: new Date().toISOString() }]); return; }
    await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(msg) });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: C.bg }}>
      <div style={{ padding: "14px 16px", background: C.white, borderBottom: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="arrowLeft" size={20} /></button>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700 }}>{team.title}</p>
          <p style={{ fontSize: 11, color: C.gray400 }}>{team.teams} member{team.teams !== 1 ? "s" : ""} · Live Chat</p>
        </div>
        <Tag label={supabase ? "Live" : "Demo"} color={supabase ? "green" : "amber"} />
      </div>
      {!supabase && (
        <div style={{ background: C.amberBg, padding: "8px 16px", display: "flex", gap: 6 }}>
          <Icon n="info" size={13} color={C.amber} />
          <p style={{ fontSize: 11, color: C.amber }}>Add Supabase env vars for persistent real-time chat</p>
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? <div style={{ textAlign: "center", paddingTop: 40 }}><Spinner size={24} color={C.black} /></div>
          : messages.map((m, i) => {
            const isMe = m.author === user.name;
            return (
              <div key={m.id || i} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                {!isMe && <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, marginBottom: 3 }}>{m.author}</p>}
                <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: isMe ? C.black : C.white, color: isMe ? "#fff" : C.black, border: isMe ? "none" : `1px solid ${C.gray100}`, fontSize: 14, lineHeight: 1.5 }}>
                  {m.text}
                </div>
                <p style={{ fontSize: 10, color: C.gray400, marginTop: 3 }}>{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            );
          })}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "12px 16px 20px", background: C.white, borderTop: `1px solid ${C.gray100}`, display: "flex", gap: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "11px 14px", borderRadius: 22, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none" }} />
        <button onClick={send} disabled={!text.trim()} style={{ width: 44, height: 44, borderRadius: "50%", background: text.trim() ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon n="send" size={16} color={text.trim() ? "#fff" : C.gray400} />
        </button>
      </div>
    </div>
  );
};

// ── Community ─────────────────────────────────────────────────────────────────
const CommunityPage = ({ problems, user }) => {
  const [chatTeam, setChatTeam] = useState(null);
  const teams = problems.filter(p => p.teams > 0);
  if (chatTeam) return <ChatRoom team={chatTeam} user={user} onBack={() => setChatTeam(null)} />;
  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>Community</h2>
      <p style={{ color: C.gray400, fontSize: 14, marginBottom: 24 }}>Active teams solving real problems</p>
      {teams.length === 0
        ? <div style={{ textAlign: "center", padding: "48px 20px" }}><Icon n="users" size={36} color={C.gray200} /><p style={{ marginTop: 12, fontSize: 14, color: C.gray400 }}>No active teams yet.</p></div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {teams.map((p, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 14, padding: 16, border: `1px solid ${C.gray100}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, flex: 1, paddingRight: 8 }}>{p.title}</h4>
                  <Tag label="Active" color="green" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Icon n="users" size={13} color={C.gray400} />
                    <span style={{ fontSize: 12, color: C.gray400 }}>{p.teams} member{p.teams !== 1 ? "s" : ""}</span>
                  </div>
                  <button onClick={() => setChatTeam(p)} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                    <Icon n="send" size={12} color="#fff" /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
      }
      <div style={{ background: C.gray50, borderRadius: 16, padding: 20, textAlign: "center", border: `1px solid ${C.gray100}` }}>
        <Icon n="users" size={28} color={C.gray400} />
        <p style={{ fontWeight: 700, fontSize: 14, marginTop: 10, marginBottom: 4 }}>Start a Team</p>
        <p style={{ fontSize: 13, color: C.gray400, marginBottom: 14 }}>Submit a problem, get at least 1 person to join.</p>
        <Tag label="Min 2 members required" color="amber" />
      </div>
    </div>
  );
};

// ── AI Guide ──────────────────────────────────────────────────────────────────
const AIGuidePage = () => {
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
      const res = await callAI(
        [{ role: "user", content: `Real-world problem: ${problem}` }],
        `You are a product analyst. Analyse this problem: 1) Who is affected and why it matters (2 sentences) 2) Best web-based solution (2 sentences) 3) List 4 core features needed 4) Suggest tech stack. Be concise.`
      );
      setAnalysis(res); setStep(1);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const generatePrompt = async () => {
    setLoading(true); setError("");
    try {
      const res = await callAI(
        [{ role: "user", content: `Problem: ${problem}\nAnalysis: ${analysis}` }],
        `Write a detailed copy-paste ready prompt for Claude AI to build a complete website solving this problem. Specify all pages, features, tech stack (Next.js + Tailwind + Supabase), UI style, and ask for complete working code. Start with "Build a..." or "Create a..."`
      );
      setPrompt(res); setStep(2);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard?.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>AI Build Guide</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
        <p style={{ color: C.gray400, fontSize: 13 }}>Powered by Groq ·</p>
        <Tag label="Secure — key on server" color="green" />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {["Describe", "Analyse", "Prompt", "Deploy"].map((s, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? C.black : C.gray200, transition: "background 0.3s" }} />
        ))}
      </div>
      {error && <div style={{ background: C.redBg, border: `1px solid #fca5a5`, borderRadius: 10, padding: 12, marginBottom: 16 }}><p style={{ fontSize: 13, color: C.red }}>{error}</p></div>}

      {step === 0 && (
        <div style={{ background: C.white, borderRadius: 16, padding: 20, border: `1px solid ${C.gray100}` }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Describe Your Problem</h3>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 16 }}>Groq AI analyses it securely on our server</p>
          <textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="e.g. Small farmers cannot find direct buyers..." rows={5} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, resize: "none", outline: "none", boxSizing: "border-box" }} />
          <button onClick={analyse} disabled={loading || !problem.trim()} style={{ width: "100%", marginTop: 14, padding: 13, background: problem.trim() ? C.black : C.gray200, color: problem.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Spinner size={16} color="#fff" /> Analysing...</> : "Analyse with Groq AI"}
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div style={{ background: C.blueBg, border: `1px solid #bfdbfe`, borderRadius: 14, padding: 18, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <Icon n="zap" size={16} color={C.blue} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>Groq Analysis</span>
            </div>
            <p style={{ fontSize: 13, color: C.blue, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{analysis}</p>
          </div>
          <button onClick={generatePrompt} disabled={loading} style={{ width: "100%", padding: 13, background: C.black, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Spinner size={16} color="#fff" /> Generating...</> : "Generate Website Prompt"}
          </button>
          <button onClick={() => setStep(0)} style={{ width: "100%", marginTop: 8, padding: 11, background: "none", border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.gray600 }}>Edit Problem</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ background: C.white, borderRadius: 14, padding: 18, border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Your AI Prompt</span>
              <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, background: copied ? C.greenBg : C.gray50, border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: copied ? C.green : C.black }}>
                <Icon n={copied ? "check" : "copy"} size={13} color={copied ? C.green : C.black} /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ background: C.gray50, borderRadius: 9, padding: 14, maxHeight: 200, overflowY: "auto" }}>
              <pre style={{ fontSize: 12, color: C.gray600, whiteSpace: "pre-wrap", lineHeight: 1.65, fontFamily: "DM Sans, sans-serif" }}>{prompt}</pre>
            </div>
          </div>
          {[
            { icon: "ai", title: "Use in Claude AI", desc: "Open Claude app → New chat → Paste your prompt → Get complete code" },
            { icon: "github", title: "Upload to GitHub", desc: "Create repo → Upload code files → Save online" },
            { icon: "globe", title: "Deploy on Vercel", desc: "Import GitHub repo → Click Deploy → Live website" },
            { icon: "check", title: "Fix Issues", desc: "Screenshot error → Upload to Claude → Get fix" },
          ].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.gray100}`, marginBottom: 10, display: "flex", gap: 12 }}>
              <div style={{ width: 34, height: 34, background: C.black, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={s.icon} size={16} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>Step {i + 1}: {s.title}</p>
                <p style={{ fontSize: 12, color: C.gray400, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
          <button onClick={() => { setStep(0); setProblem(""); setAnalysis(""); setPrompt(""); }} style={{ width: "100%", marginTop: 6, padding: 11, background: "none", border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.gray600 }}>Start New</button>
        </div>
      )}
    </div>
  );
};

// ── Settings ──────────────────────────────────────────────────────────────────
const SettingsPage = ({ user, setUser, setLoggedIn }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const Row = ({ icon, label, value, onClick, danger }) => (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "none", border: "none", borderBottom: `1px solid ${C.gray50}`, cursor: "pointer", textAlign: "left" }}>
      <div style={{ width: 34, height: 34, background: danger ? C.redBg : C.gray50, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon n={icon} size={16} color={danger ? C.red : C.gray600} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: danger ? C.red : C.black }}>{label}</p>
        {value && <p style={{ fontSize: 12, color: C.gray400 }}>{value}</p>}
      </div>
      {!danger && <Icon n="chevronRight" size={15} color={C.gray400} />}
    </button>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 22 }}>
      {title && <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{title}</p>}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, overflow: "hidden" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: "24px 20px 100px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 24 }}>Settings</h2>

      <div style={{ background: C.white, borderRadius: 16, padding: 18, border: `1px solid ${C.gray100}`, marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20 }}>{user.name[0]}</span>
        </div>
        <div style={{ flex: 1 }}>
          {editing
            ? <div style={{ display: "flex", gap: 8 }}>
                <input value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontWeight: 700, outline: "none" }} />
                <button onClick={() => { setUser({ ...user, name }); setEditing(false); }} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "7px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Save</button>
              </div>
            : <>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{user.name}</p>
                <p style={{ fontSize: 13, color: C.gray400 }}>{user.email}</p>
              </>
          }
        </div>
        {!editing && <button onClick={() => setEditing(true)} style={{ background: C.gray50, border: "none", borderRadius: 9, padding: 9, cursor: "pointer" }}><Icon n="edit" size={16} /></button>}
      </div>

      <div style={{ background: C.greenBg, border: `1px solid #86efac`, borderRadius: 12, padding: "10px 14px", marginBottom: 22, display: "flex", gap: 8 }}>
        <Icon n="shield" size={16} color={C.green} />
        <p style={{ fontSize: 12, color: C.green, lineHeight: 1.5 }}>Groq API key is stored securely on the server. It is never exposed to the browser.</p>
      </div>

      <Section title="Account">
        <Row icon="edit" label="Edit Profile" value="Update name and info" onClick={() => setEditing(true)} />
        <Row icon="bell" label="Notifications" value="Email and push alerts" onClick={() => {}} />
        <Row icon="lock" label="Privacy" value="Manage your data" onClick={() => {}} />
      </Section>

      <Section title="AI Configuration">
        <Row icon="shield" label="Groq API Key" value="Stored securely on server ✓" onClick={() => {}} />
        <Row icon="zap" label="AI Model" value="llama-3.3-70b-versatile" onClick={() => {}} />
      </Section>

      <Section title="Preferences">
        <Row icon="globe" label="Language" value="English / Tamil / Tanglish" onClick={() => {}} />
        <Row icon="moon" label="Appearance" value="Light mode" onClick={() => {}} />
      </Section>

      <Section title="Support">
        <Row icon="help" label="Help & FAQ" onClick={() => {}} />
        <Row icon="info" label="About SRWP" value="v2.0.0 · Next.js · Secure" onClick={() => {}} />
      </Section>

      <Section title="">
        <Row icon="logout" label="Log Out" danger onClick={() => setLoggedIn(false)} />
      </Section>
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("home");
  const [user, setUser] = useState({ name: "Gokul M", email: "gokul@gmail.com" });
  const [problems, setProblems] = useState([]);

  if (!loggedIn) return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <LandingPage onLogin={() => setLoggedIn(true)} />
    </>
  );

  const pages = {
    home: <HomePage user={user} setPage={setPage} problems={problems} />,
    problems: <ProblemsPage problems={problems} setProblems={setProblems} />,
    community: <CommunityPage problems={problems} user={user} />,
    ai: <AIGuidePage />,
    settings: <SettingsPage user={user} setUser={setUser} setLoggedIn={setLoggedIn} />,
  };

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: C.bg, minHeight: "100vh", color: C.black }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } } input:focus, textarea:focus { outline: none; border-color: ${C.black} !important; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: ${C.gray200}; border-radius: 4px; }`}</style>
      {pages[page] || pages.home}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

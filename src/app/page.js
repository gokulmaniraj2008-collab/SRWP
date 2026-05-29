"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../lib/supabase";

const C = {
  bg: "#f8f8f6", white: "#ffffff", black: "#0c0c0c",
  gray50: "#f4f4f2", gray100: "#ebebea", gray200: "#d8d8d5",
  gray400: "#9a9a94", gray600: "#5c5c56",
  green: "#1a6b3c", greenBg: "#e6f4ec",
  red: "#b91c1c", redBg: "#fef2f2",
  blue: "#1d4ed8", blueBg: "#eff6ff",
  amber: "#92400e", amberBg: "#fffbeb",
};

// ── Secure AI call ────────────────────────────────────────────────────────────
const callAI = async (messages, systemPrompt) => {
  if (!messages || messages.length === 0) throw new Error("No messages provided");
  if (!systemPrompt || !systemPrompt.trim()) throw new Error("No system prompt provided");
  const res = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt }),
  });
  if (!res.ok) {
    const e = await res.json();
    throw new Error(e.error || "AI request failed");
  }
  const data = await res.json();
  if (!data.result) throw new Error("Empty response from AI");
  return data.result;
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ n, size = 18, color = "currentColor", stroke = 1.8 }) => {
  const p = {
    home: <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z" />,
    problems: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
    community: <><circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="9" r="2"/><path d="M21 21v-1.5a3 3 0 00-2-2.83"/></>,
    ai: <><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M12 6v6l4 2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    help: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    lightbulb: <><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check: <polyline points="20 6 9 12 4 10"/>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    online: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {p[n]}
    </svg>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Spinner = ({ size = 20, color = C.black }) => (
  <div style={{ width: size, height: size, border: `2px solid rgba(0,0,0,0.1)`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
);

const Tag = ({ label, color = "default" }) => {
  const s = { default: [C.gray100, C.gray600], green: [C.greenBg, C.green], blue: [C.blueBg, C.blue], amber: [C.amberBg, C.amber], red: [C.redBg, C.red] }[color] || [C.gray100, C.gray600];
  return <span style={{ fontSize: 11, fontWeight: 700, background: s[0], color: s[1], padding: "3px 9px", borderRadius: 6, whiteSpace: "nowrap" }}>{label}</span>;
};

const Avatar = ({ name, size = 40, online = false }) => (
  <div style={{ position: "relative", flexShrink: 0 }}>
    <div style={{ width: size, height: size, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#fff", fontWeight: 800, fontSize: size * 0.38, fontFamily: "Syne, sans-serif" }}>{(name || "?")[0].toUpperCase()}</span>
    </div>
    {online && <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: C.green, border: "2px solid #fff" }} />}
  </div>
);

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
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.gray200}`, display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom, 4px)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 4px 4px", border: "none", background: "none", cursor: "pointer", color: page === t.id ? C.black : C.gray400, WebkitTapHighlightColor: "transparent" }}>
          <Icon n={t.icon} size={20} color={page === t.id ? C.black : C.gray400} />
          <span style={{ fontSize: 9, fontWeight: page === t.id ? 700 : 500, letterSpacing: 0.2 }}>{t.label}</span>
          {page === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.black }} />}
        </button>
      ))}
    </nav>
  );
};

// ── Sheet Modal ───────────────────────────────────────────────────────────────
const Sheet = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end" }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{ background: C.white, borderRadius: "20px 20px 0 0", width: "100%", padding: "20px 20px 40px", maxHeight: "85vh", overflowY: "auto" }}>
      <div style={{ width: 36, height: 4, borderRadius: 2, background: C.gray200, margin: "0 auto 16px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800 }}>{title}</h3>
        <button onClick={onClose} style={{ background: C.gray100, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

// ── Landing ───────────────────────────────────────────────────────────────────
const LandingPage = ({ onLogin }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", background: C.bg }}>
    <div style={{ marginBottom: 32 }}><Logo size="lg" /></div>
    <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: -1.5, textAlign: "center", lineHeight: 1.15, marginBottom: 14 }}>Where Problems<br />Meet Solutions</h1>
    <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.65, textAlign: "center", maxWidth: 300, marginBottom: 40 }}>Community platform to identify real-world problems, form teams, and build AI-powered solutions — free.</p>
    <button onClick={onLogin} style={{ width: "100%", maxWidth: 340, padding: "15px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, WebkitTapHighlightColor: "transparent" }}>
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Continue with Google
    </button>
    <p style={{ marginTop: 14, fontSize: 12, color: C.gray400 }}>Free to join · No credit card needed</p>
  </div>
);

// ── Public Profile Page ───────────────────────────────────────────────────────
const ProfilePage = ({ profileUser, currentUser, onBack, onMessage }) => {
  const isMe = profileUser.id === currentUser.id;
  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}?profile=${profileUser.id}` : "";
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 100 }}>
      <div style={{ padding: "14px 16px", background: C.white, borderBottom: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="arrowLeft" size={20} /></button>
        <p style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700 }}>{isMe ? "My Profile" : profileUser.name}</p>
      </div>

      <div style={{ padding: "28px 20px 20px" }}>
        {/* Avatar + name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <Avatar name={profileUser.name} size={72} online={profileUser.online} />
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, marginTop: 12, marginBottom: 4 }}>{profileUser.name}</h2>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 8 }}>@{profileUser.id}</p>
          <Tag label={profileUser.online ? "Online" : "Offline"} color={profileUser.online ? "green" : "default"} />
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {!isMe && (
            <button onClick={() => onMessage(profileUser)} style={{ flex: 1, padding: "11px", background: C.black, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Icon n="message" size={15} color="#fff" /> Message
            </button>
          )}
          <button onClick={copyLink} style={{ flex: 1, padding: "11px", background: copied ? C.greenBg : C.gray100, color: copied ? C.green : C.black, border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon n={copied ? "check" : "link"} size={15} color={copied ? C.green : C.black} />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Profile link card */}
        <div style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Profile Link</p>
          <p style={{ fontSize: 12, color: C.blue, wordBreak: "break-all", lineHeight: 1.5 }}>{profileUrl}</p>
          <p style={{ fontSize: 11, color: C.gray400, marginTop: 6 }}>Share this link so others can view your profile</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[{ n: profileUser.problemCount || 0, l: "Problems" }, { n: profileUser.teamCount || 0, l: "Teams" }].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 2 }}>{s.n}</p>
              <p style={{ fontSize: 11, color: C.gray400 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── DM Chat ───────────────────────────────────────────────────────────────────
const DMChat = ({ currentUser, otherUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  const roomId = [currentUser.id, otherUser.id].sort().join("_");

  useEffect(() => {
    if (!supabase) {
      setMessages([{ id: 1, from_id: "system", text: `Start chatting with ${otherUser.name}!`, created_at: new Date().toISOString() }]);
      setLoading(false);
      return;
    }
    const load = async () => {
      const { data } = await supabase.from("dm_messages").select("*")
        .or(`and(from_id.eq.${currentUser.id},to_id.eq.${otherUser.id}),and(from_id.eq.${otherUser.id},to_id.eq.${currentUser.id})`)
        .order("created_at", { ascending: true });
      setMessages(data || []);
      setLoading(false);
    };
    load();
    const ch = supabase.channel(`dm_${roomId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "dm_messages" },
        p => { if ((p.new.from_id === currentUser.id && p.new.to_id === otherUser.id) || (p.new.from_id === otherUser.id && p.new.to_id === currentUser.id)) setMessages(prev => [...prev, p.new]); })
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [currentUser.id, otherUser.id, roomId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!text.trim()) return;
    const msg = { from_id: currentUser.id, to_id: otherUser.id, text: text.trim() };
    setText("");
    if (!supabase) { setMessages(p => [...p, { ...msg, id: Date.now(), created_at: new Date().toISOString() }]); return; }
    await supabase.from("dm_messages").insert([msg]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: C.bg }}>
      <div style={{ padding: "12px 16px", background: C.white, borderBottom: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="arrowLeft" size={20} /></button>
        <Avatar name={otherUser.name} size={34} online={otherUser.online} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700 }}>{otherUser.name}</p>
          <p style={{ fontSize: 11, color: otherUser.online ? C.green : C.gray400 }}>{otherUser.online ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px", display: "flex", flexDirection: "column", gap: 8 }}>
        {loading ? <div style={{ textAlign: "center", paddingTop: 40 }}><Spinner size={24} color={C.black} /></div>
          : messages.map((m, i) => {
            const isMe = m.from_id === currentUser.id;
            return (
              <div key={m.id || i} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? C.black : C.white, color: isMe ? "#fff" : C.black, border: isMe ? "none" : `1px solid ${C.gray100}`, fontSize: 14, lineHeight: 1.5 }}>
                  {m.text}
                </div>
                <p style={{ fontSize: 10, color: C.gray400, marginTop: 3 }}>
                  {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            );
          })}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: "10px 16px", background: C.white, borderTop: `1px solid ${C.gray100}`, display: "flex", gap: 8, position: "fixed", bottom: 0, left: 0, right: 0, paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))" }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={`Message ${otherUser.name}...`} style={{ flex: 1, padding: "11px 14px", borderRadius: 22, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", background: C.gray50 }} />
        <button onClick={send} disabled={!text.trim()} style={{ width: 44, height: 44, borderRadius: "50%", background: text.trim() ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Icon n="send" size={16} color={text.trim() ? "#fff" : C.gray400} />
        </button>
      </div>
    </div>
  );
};

// ── Home ──────────────────────────────────────────────────────────────────────
const HomePage = ({ user, setPage, problems }) => (
  <div style={{ padding: "24px 16px 100px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div>
        <p style={{ fontSize: 13, color: C.gray400, fontWeight: 500 }}>Welcome back</p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{user.name}</h2>
      </div>
      <Logo size="sm" />
    </div>
    <div style={{ background: C.black, borderRadius: 18, padding: "20px 18px", marginBottom: 24, color: "#fff" }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, opacity: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Our Mission</p>
      <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>Solving Real World<br />Problems Together</h3>
      <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.6, marginBottom: 16 }}>SRWP is an open community where anyone can share problems, team up, generate AI prompts, and launch real solutions — completely free.</p>
      <button onClick={() => setPage("problems")} style={{ background: "#fff", color: C.black, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
        Submit a Problem <Icon n="chevronRight" size={13} />
      </button>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
      {[{ n: problems.length, l: "Problems" }, { n: problems.reduce((a, p) => a + p.teams, 0), l: "Teams" }, { n: problems.filter(p => p.status === "solved").length, l: "Solved" }].map((s, i) => (
        <div key={i} style={{ background: C.white, borderRadius: 12, padding: "14px 8px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 2 }}>{s.n}</p>
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
          <div style={{ width: 32, height: 32, background: C.gray50, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <Icon n={h.icon} size={15} />
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{h.title}</p>
          <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.4 }}>{h.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── Problems ──────────────────────────────────────────────────────────────────
const ProblemsPage = ({ problems, setProblems, userId }) => {
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
      analysis = await callAI([{ role: "user", content: `Problem: ${form.title}\nDescription: ${form.desc}\nKnown solution: ${form.solution || "None"}` }],
        "Analyse this real-world problem in 2-3 sentences. Identify who is affected, why it matters, and the category. Be concise.");
    } catch { analysis = "Analysis unavailable."; }
    setProblems(p => [...p, { id: Date.now().toString(), title: form.title, desc: form.desc, solution: form.solution, analysis, votes: 0, votedBy: [], joinedBy: [], replies: [], teams: 0, tag: "General", status: "open", submittedBy: userId }]);
    setForm({ title: "", desc: "", solution: "" });
    setAnalyzing(false);
    setView("feed");
  };

  const vote = (id) => {
    setProblems(ps => ps.map(p => {
      if (p.id !== id) return p;
      const alreadyVoted = (p.votedBy || []).includes(userId);
      if (alreadyVoted) return p; // one vote only
      return { ...p, votes: p.votes + 1, votedBy: [...(p.votedBy || []), userId] };
    }));
  };

  const joinTeam = (id) => {
    setProblems(ps => ps.map(p => {
      if (p.id !== id) return p;
      const alreadyJoined = (p.joinedBy || []).includes(userId);
      if (alreadyJoined) return p; // one join only
      return { ...p, teams: p.teams + 1, joinedBy: [...(p.joinedBy || []), userId] };
    }));
  };

  const sendReply = (id) => {
    if (!reply.trim()) return;
    setProblems(ps => ps.map(p => p.id === id ? { ...p, replies: [...p.replies, { text: reply, author: "You", time: new Date().toLocaleTimeString() }] } : p));
    setReply("");
  };

  if (selected) {
    const p = problems.find(x => x.id === selected);
    if (!p) return null;
    const hasVoted = (p.votedBy || []).includes(userId);
    return (
      <div style={{ padding: "16px 16px 100px" }}>
        <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.gray600, fontSize: 14, fontWeight: 600, marginBottom: 16, padding: 0 }}>
          <Icon n="arrowLeft" size={16} /> Back
        </button>
        <Tag label={p.tag} />
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, margin: "10px 0 8px", lineHeight: 1.2 }}>{p.title}</h2>
        <p style={{ color: C.gray600, fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
        {p.analysis && (
          <div style={{ background: C.blueBg, border: `1px solid #bfdbfe`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Icon n="zap" size={13} color={C.blue} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>AI Analysis</span>
            </div>
            <p style={{ fontSize: 13, color: C.blue, lineHeight: 1.6 }}>{p.analysis}</p>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button onClick={() => joinTeam(p.id)} disabled={(p.joinedBy || []).includes(userId)} style={{ flex: 1, padding: 11, background: (p.joinedBy || []).includes(userId) ? C.greenBg : C.black, color: (p.joinedBy || []).includes(userId) ? C.green : "#fff", border: `1px solid ${(p.joinedBy || []).includes(userId) ? C.green : "transparent"}`, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: (p.joinedBy || []).includes(userId) ? "default" : "pointer" }}>
            {(p.joinedBy || []).includes(userId) ? "Joined ✓" : `Join Team (${p.teams})`}
          </button>
          <button onClick={() => vote(p.id)} disabled={hasVoted} style={{ padding: "11px 16px", background: hasVoted ? C.greenBg : C.gray50, border: `1px solid ${hasVoted ? C.green : C.gray200}`, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: hasVoted ? "default" : "pointer", color: hasVoted ? C.green : C.black, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon n="star" size={13} color={hasVoted ? C.green : C.gray600} />
            {p.votes} {hasVoted ? "✓" : ""}
          </button>
        </div>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Replies ({p.replies.length})</h4>
        {p.replies.length === 0
          ? <div style={{ background: C.gray50, borderRadius: 10, padding: 14, marginBottom: 10, textAlign: "center" }}><p style={{ fontSize: 13, color: C.gray400 }}>No replies yet.</p></div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
              {p.replies.map((r, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 10, padding: 12, border: `1px solid ${C.gray100}` }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, marginBottom: 3 }}>{r.author} · {r.time}</p>
                  <p style={{ fontSize: 13 }}>{r.text}</p>
                </div>
              ))}
            </div>
        }
        <div style={{ display: "flex", gap: 8 }}>
          <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === "Enter" && sendReply(p.id)} placeholder="Suggest a solution..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 13, outline: "none" }} />
          <button onClick={() => sendReply(p.id)} style={{ padding: "10px 14px", background: C.black, border: "none", borderRadius: 10, cursor: "pointer" }}>
            <Icon n="send" size={15} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Problems</h2>
        <button onClick={() => setView(v => v === "feed" ? "submit" : "feed")} style={{ display: "flex", alignItems: "center", gap: 6, background: C.black, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          <Icon n={view === "feed" ? "plus" : "arrowLeft"} size={14} color="#fff" />
          {view === "feed" ? "Submit" : "Back"}
        </button>
      </div>
      {view === "submit" ? (
        <div style={{ background: C.white, borderRadius: 16, padding: 18, border: `1px solid ${C.gray100}` }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Share Your Problem</h3>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 16 }}>AI will analyse it automatically</p>
          {[{ label: "Problem Title *", key: "title", ph: "What is the problem?", rows: 1 }, { label: "Describe in detail", key: "desc", ph: "Who is affected? Why does it happen?", rows: 3 }, { label: "Do you know any solution?", key: "solution", ph: "Optional", rows: 2 }].map(f => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 5 }}>{f.label}</label>
              {f.rows === 1
                ? <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} style={{ width: "100%", padding: "11px 12px", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                : <textarea value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} rows={f.rows} style={{ width: "100%", padding: "11px 12px", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: 14, resize: "none", outline: "none", boxSizing: "border-box" }} />
              }
            </div>
          ))}
          <button onClick={submit} disabled={analyzing || !form.title.trim()} style={{ width: "100%", padding: 12, background: form.title.trim() ? C.black : C.gray200, color: form.title.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {analyzing ? <><Spinner size={16} color="#fff" /> Analysing...</> : "Submit Problem"}
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
          {problems.map(p => {
            const hasVoted = (p.votedBy || []).includes(userId);
            return (
              <div key={p.id} style={{ background: C.white, borderRadius: 14, padding: 14, border: `1px solid ${C.gray100}`, cursor: "pointer" }} onClick={() => setSelected(p.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Tag label={p.tag} />
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: hasVoted ? C.green : C.gray400, fontWeight: hasVoted ? 700 : 400 }}>{p.votes} votes</span>
                    <span style={{ fontSize: 11, color: C.gray400 }}>{p.replies.length} replies</span>
                  </div>
                </div>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{p.title}</h4>
                <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.45, marginBottom: 8 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 4 }}>
                  <Icon n="users" size={13} color={C.gray400} />
                  <span style={{ fontSize: 12, color: C.gray400 }}>{p.teams} team{p.teams !== 1 ? "s" : ""}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Community ─────────────────────────────────────────────────────────────────
const CommunityPage = ({ problems, user, onViewProfile, onOpenDM }) => {
  const [activeTab, setActiveTab] = useState("teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chatTeam, setChatTeam] = useState(null);
  const [onlineUsers] = useState([
    { id: "user_gokul", name: "Gokul M", online: true, problemCount: 3, teamCount: 2 },
    { id: "user_priya", name: "Priya S", online: true, problemCount: 1, teamCount: 1 },
    { id: "user_rajan", name: "Rajan K", online: false, problemCount: 2, teamCount: 0 },
  ]);
  const bottomRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatText, setChatText] = useState("");

  const teams = problems.filter(p => p.teams > 0);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const results = onlineUsers.filter(u =>
      u.name.toLowerCase().includes(q.toLowerCase()) || u.id.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(results);
  };

  if (chatTeam) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: C.bg }}>
        <div style={{ padding: "12px 16px", background: C.white, borderBottom: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setChatTeam(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="arrowLeft" size={20} /></button>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700 }}>{chatTeam.title}</p>
            <p style={{ fontSize: 11, color: C.gray400 }}>{chatTeam.teams} member{chatTeam.teams !== 1 ? "s" : ""} · Team Chat</p>
          </div>
          <Tag label="Live" color="green" />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 140px", display: "flex", flexDirection: "column", gap: 8 }}>
          {chatMessages.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <Icon n="message" size={28} color={C.gray200} />
              <p style={{ marginTop: 10, fontSize: 13, color: C.gray400 }}>No messages yet. Start the conversation!</p>
            </div>
          )}
          {chatMessages.map((m, i) => {
            const isMe = m.author === user.name;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                {!isMe && <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, marginBottom: 2 }}>{m.author}</p>}
                <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: isMe ? C.black : C.white, color: isMe ? "#fff" : C.black, border: isMe ? "none" : `1px solid ${C.gray100}`, fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                <p style={{ fontSize: 10, color: C.gray400, marginTop: 2 }}>{m.time}</p>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: "10px 16px", background: C.white, borderTop: `1px solid ${C.gray100}`, display: "flex", gap: 8, position: "fixed", bottom: 65, left: 0, right: 0, zIndex: 99 }}>
          <input value={chatText} onChange={e => setChatText(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && chatText.trim()) { setChatMessages(p => [...p, { text: chatText, author: user.name, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); setChatText(""); setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }}} placeholder="Type a message..." style={{ flex: 1, padding: "11px 14px", borderRadius: 22, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", background: C.gray50 }} />
          <button onClick={() => { if (chatText.trim()) { setChatMessages(p => [...p, { text: chatText, author: user.name, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); setChatText(""); }}} style={{ width: 44, height: 44, borderRadius: "50%", background: chatText.trim() ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon n="send" size={16} color={chatText.trim() ? "#fff" : C.gray400} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16 }}>Community</h2>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
          <Icon n="search" size={16} color={C.gray400} />
        </div>
        <input value={searchQuery} onChange={e => handleSearch(e.target.value)} placeholder="Search by name or @id..." style={{ width: "100%", padding: "11px 12px 11px 38px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", boxSizing: "border-box", background: C.white }} />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.gray100}`, overflow: "hidden", marginBottom: 20 }}>
          {searchResults.map((u, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < searchResults.length - 1 ? `1px solid ${C.gray100}` : "none" }}>
              <Avatar name={u.name} size={38} online={u.online} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{u.name}</p>
                <p style={{ fontSize: 12, color: C.gray400 }}>@{u.id}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onViewProfile(u)} style={{ background: C.gray100, border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Profile</button>
                <button onClick={() => onOpenDM(u)} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>DM</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.gray100, borderRadius: 10, padding: 3 }}>
        {["teams", "online"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "8px", border: "none", borderRadius: 8, background: activeTab === t ? C.white : "none", fontWeight: activeTab === t ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: activeTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none", textTransform: "capitalize" }}>
            {t === "online" ? `Online (${onlineUsers.filter(u => u.online).length})` : `Teams (${teams.length})`}
          </button>
        ))}
      </div>

      {/* Teams Tab */}
      {activeTab === "teams" && (
        <div>
          {teams.length === 0
            ? <div style={{ textAlign: "center", padding: "40px 20px", color: C.gray400 }}><Icon n="users" size={36} color={C.gray200} /><p style={{ marginTop: 12, fontSize: 14 }}>No active teams yet.</p></div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                {teams.map((p, i) => (
                  <div key={i} style={{ background: C.white, borderRadius: 14, padding: 14, border: `1px solid ${C.gray100}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, flex: 1, paddingRight: 8, lineHeight: 1.3 }}>{p.title}</h4>
                      <Tag label="Active" color="green" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 4 }}><Icon n="users" size={13} color={C.gray400} /><span style={{ fontSize: 12, color: C.gray400 }}>{p.teams} member{p.teams !== 1 ? "s" : ""}</span></div>
                      <button onClick={() => setChatTeam(p)} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                        <Icon n="message" size={12} color="#fff" /> Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
          }
          <div style={{ background: C.gray50, borderRadius: 16, padding: 18, textAlign: "center", border: `1px solid ${C.gray100}` }}>
            <Icon n="users" size={26} color={C.gray400} />
            <p style={{ fontWeight: 700, fontSize: 14, marginTop: 10, marginBottom: 4 }}>Start a Team</p>
            <p style={{ fontSize: 13, color: C.gray400, marginBottom: 12 }}>Submit a problem, get at least 1 person to join.</p>
            <Tag label="Min 2 members required" color="amber" />
          </div>
        </div>
      )}

      {/* Online Tab */}
      {activeTab === "online" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {onlineUsers.map((u, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: 14, border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={u.name} size={42} online={u.online} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700 }}>{u.name}</p>
                <p style={{ fontSize: 12, color: u.online ? C.green : C.gray400, fontWeight: u.online ? 600 : 400 }}>{u.online ? "Online now" : "Offline"}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onViewProfile(u)} style={{ background: C.gray100, border: "none", borderRadius: 8, padding: "7px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  <Icon n="user" size={14} />
                </button>
                <button onClick={() => onOpenDM(u)} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon n="message" size={13} color="#fff" /> DM
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
    if (!problem.trim()) { setError("Please describe your problem first."); return; }
    setLoading(true); setError("");
    try {
      const res = await callAI([{ role: "user", content: `Real-world problem: ${problem}` }],
        `Analyse this problem: 1) Who is affected and why (2 sentences) 2) Best web-based solution (2 sentences) 3) List 4 core features needed 4) Suggest tech stack. Be concise.`);
      setAnalysis(res); setStep(1);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const generatePrompt = async () => {
    setLoading(true); setError("");
    try {
      const res = await callAI([{ role: "user", content: `Problem: ${problem}\nAnalysis: ${analysis}` }],
        `Write a detailed copy-paste ready prompt for Claude AI to build a complete website solving this problem. Specify all pages, features, tech stack (Next.js + Tailwind + Supabase), UI style, and ask for complete working code. Start with "Build a..." or "Create a..."`);
      setPrompt(res); setStep(2);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard?.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>AI Build Guide</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
        <p style={{ color: C.gray400, fontSize: 13 }}>Powered by Groq ·</p>
        <Tag label="Key secure on server" color="green" />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
        {["Describe", "Analyse", "Prompt", "Deploy"].map((s, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? C.black : C.gray200, transition: "background 0.3s" }} />
        ))}
      </div>
      {error && error.trim() && (
        <div style={{ background: C.redBg, border: `1px solid #fca5a5`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Icon n="info" size={15} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, lineHeight: 1.5 }}>{error}</p>
          </div>
        </div>
      )}

      {step === 0 && (
        <div style={{ background: C.white, borderRadius: 16, padding: 18, border: `1px solid ${C.gray100}` }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Describe Your Problem</h3>
          <p style={{ fontSize: 13, color: C.gray400, marginBottom: 14 }}>Groq AI analyses it securely on server</p>
          <textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="e.g. Small farmers cannot find direct buyers..." rows={5} style={{ width: "100%", padding: "12px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
          <button onClick={analyse} disabled={loading || !problem.trim()} style={{ width: "100%", marginTop: 12, padding: 12, background: problem.trim() ? C.black : C.gray200, color: problem.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Spinner size={16} color="#fff" /> Analysing...</> : "Analyse with Groq AI"}
          </button>
        </div>
      )}
      {step === 1 && (
        <div>
          <div style={{ background: C.blueBg, border: `1px solid #bfdbfe`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><Icon n="zap" size={16} color={C.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>Groq Analysis</span></div>
            <p style={{ fontSize: 13, color: C.blue, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{analysis}</p>
          </div>
          <button onClick={generatePrompt} disabled={loading} style={{ width: "100%", padding: 12, background: C.black, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            {loading ? <><Spinner size={16} color="#fff" /> Generating...</> : "Generate Website Prompt"}
          </button>
          <button onClick={() => setStep(0)} style={{ width: "100%", padding: 11, background: "none", border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.gray600 }}>Edit Problem</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <div style={{ background: C.white, borderRadius: 14, padding: 16, border: `1px solid ${C.gray100}`, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Your AI Prompt</span>
              <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 5, background: copied ? C.greenBg : C.gray50, border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: copied ? C.green : C.black }}>
                <Icon n={copied ? "check" : "copy"} size={13} color={copied ? C.green : C.black} /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ background: C.gray50, borderRadius: 9, padding: 12, maxHeight: 180, overflowY: "auto" }}>
              <pre style={{ fontSize: 12, color: C.gray600, whiteSpace: "pre-wrap", lineHeight: 1.65, fontFamily: "DM Sans, sans-serif" }}>{prompt}</pre>
            </div>
          </div>
          {[{ icon: "ai", title: "Use in Claude AI", desc: "Open Claude app → New chat → Paste prompt → Get code" }, { icon: "github", title: "Upload to GitHub", desc: "Create repo → Upload code files" }, { icon: "globe", title: "Deploy on Vercel", desc: "Import GitHub repo → Click Deploy → Live!" }, { icon: "check", title: "Fix Issues", desc: "Screenshot error → Upload to Claude → Get fix" }].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.gray100}`, marginBottom: 10, display: "flex", gap: 12 }}>
              <div style={{ width: 32, height: 32, background: C.black, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={s.icon} size={15} color="#fff" />
              </div>
              <div><p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Step {i + 1}: {s.title}</p><p style={{ fontSize: 12, color: C.gray400, lineHeight: 1.5 }}>{s.desc}</p></div>
            </div>
          ))}
          <button onClick={() => { setStep(0); setProblem(""); setAnalysis(""); setPrompt(""); }} style={{ width: "100%", marginTop: 4, padding: 11, background: "none", border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.gray600 }}>Start New</button>
        </div>
      )}
    </div>
  );
};

// ── Settings ──────────────────────────────────────────────────────────────────
const SettingsPage = ({ user, setUser, setLoggedIn, onViewProfile }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [modal, setModal] = useState(null);
  const [lang, setLang] = useState("English");
  const [notif, setNotif] = useState({ email: true, push: true, newProblem: false });

  const Row = ({ icon, label, value, onClick, danger }) => (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: "none", border: "none", borderBottom: `1px solid ${C.gray50}`, cursor: "pointer", textAlign: "left", WebkitTapHighlightColor: "transparent" }}>
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
    <div style={{ marginBottom: 20 }}>
      {title && <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{title}</p>}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, overflow: "hidden" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 20 }}>Settings</h2>

      {/* Profile card */}
      <div style={{ background: C.white, borderRadius: 16, padding: 16, border: `1px solid ${C.gray100}`, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
        <Avatar name={user.name} size={52} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {editing
            ? <div style={{ display: "flex", gap: 8 }}>
                <input value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontWeight: 700, outline: "none", minWidth: 0 }} />
                <button onClick={() => { setUser({ ...user, name }); setEditing(false); }} style={{ background: C.black, color: "#fff", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Save</button>
              </div>
            : <>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 1 }}>{user.name}</p>
                <p style={{ fontSize: 13, color: C.gray400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
              </>
          }
        </div>
        {!editing && <button onClick={() => setEditing(true)} style={{ background: C.gray50, border: "none", borderRadius: 9, padding: 9, cursor: "pointer", flexShrink: 0 }}><Icon n="edit" size={16} /></button>}
      </div>

      <div style={{ background: C.greenBg, border: `1px solid #86efac`, borderRadius: 12, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 8 }}>
        <Icon n="shield" size={16} color={C.green} />
        <p style={{ fontSize: 12, color: C.green, lineHeight: 1.5 }}>Groq API key is stored securely on the server. Never exposed to browser.</p>
      </div>

      <Section title="Account">
        <Row icon="user" label="My Profile" value="View your public profile" onClick={() => onViewProfile({ ...user, id: user.id || "user_" + user.name.toLowerCase().replace(" ", ""), online: true, problemCount: 0, teamCount: 0 })} />
        <Row icon="edit" label="Edit Profile" value="Update name and info" onClick={() => setEditing(true)} />
        <Row icon="bell" label="Notifications" value="Email and push alerts" onClick={() => setModal("notifications")} />
        <Row icon="lock" label="Privacy" value="Manage your data" onClick={() => setModal("privacy")} />
      </Section>

      <Section title="Preferences">
        <Row icon="globe" label="Language" value={lang} onClick={() => setModal("language")} />
      </Section>

      <Section title="Support">
        <Row icon="help" label="Help & FAQ" onClick={() => setModal("help")} />
        <Row icon="info" label="About SRWP" value="v2.0.0 · Next.js · Secure" onClick={() => setModal("about")} />
      </Section>

      <Section title="">
        <Row icon="logout" label="Log Out" danger onClick={() => setLoggedIn(false)} />
      </Section>

      {modal === "notifications" && (
        <Sheet title="Notifications" onClose={() => setModal(null)}>
          {[{ l: "Email Alerts", d: "Get notified by email", k: "email" }, { l: "Push Notifications", d: "Browser alerts", k: "push" }, { l: "New Problems", d: "Alert on new posts", k: "newProblem" }].map(t => (
            <div key={t.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <div><p style={{ fontSize: 14, fontWeight: 600 }}>{t.l}</p><p style={{ fontSize: 12, color: C.gray400 }}>{t.d}</p></div>
              <div onClick={() => setNotif(n => ({ ...n, [t.k]: !n[t.k] }))} style={{ width: 44, height: 24, borderRadius: 12, background: notif[t.k] ? C.black : C.gray200, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 3, left: notif[t.k] ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
        </Sheet>
      )}

      {modal === "privacy" && (
        <Sheet title="Privacy" onClose={() => setModal(null)}>
          {[{ t: "Your Data", d: "SRWP stores your name, email, and problems. No data is sold." }, { t: "Chat Messages", d: "Stored in Supabase, visible to team members only." }, { t: "Delete Account", d: "Contact us to permanently delete all your data." }].map((r, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{r.t}</p>
              <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6 }}>{r.d}</p>
            </div>
          ))}
        </Sheet>
      )}

      {modal === "language" && (
        <Sheet title="Language" onClose={() => setModal(null)}>
          {["English", "Tamil", "Tanglish"].map(l => (
            <div key={l} onClick={() => { setLang(l); setModal(null); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.gray100}`, cursor: "pointer" }}>
              <p style={{ fontSize: 14, fontWeight: lang === l ? 700 : 500 }}>{l}</p>
              {lang === l && <Icon n="check" size={16} color={C.green} />}
            </div>
          ))}
        </Sheet>
      )}

      {modal === "help" && (
        <Sheet title="Help & FAQ" onClose={() => setModal(null)}>
          {[{ q: "How do I submit a problem?", a: "Tap Problems → Submit → describe your problem. AI will analyse it." }, { q: "How do teams work?", a: "Tap Join Team on any problem. Min 2 members. Then Message to chat." }, { q: "How does AI Guide work?", a: "Describe idea → Groq analyses → generates prompt → use in Claude → build website." }, { q: "Is SRWP free?", a: "Yes. Completely free for all users." }].map((f, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.q}</p>
              <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </Sheet>
      )}

      {modal === "about" && (
        <Sheet title="About SRWP" onClose={() => setModal(null)}>
          <div style={{ textAlign: "center", padding: "8px 0 18px" }}>
            <div style={{ width: 52, height: 52, background: C.black, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              <span style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20 }}>S</span>
            </div>
            <p style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800 }}>SRWP</p>
            <p style={{ fontSize: 13, color: C.gray400 }}>Solving Real World Problems</p>
          </div>
          {[{ l: "Version", v: "2.0.0" }, { l: "Framework", v: "Next.js 14" }, { l: "AI", v: "Groq llama-3.3-70b" }, { l: "Database", v: "Supabase" }, { l: "Hosting", v: "Vercel" }, { l: "Built by", v: "Gokul M" }].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.gray100}` }}>
              <p style={{ fontSize: 13, color: C.gray400 }}>{r.l}</p>
              <p style={{ fontSize: 13, fontWeight: 600 }}>{r.v}</p>
            </div>
          ))}
        </Sheet>
      )}
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("srwp_logged_in") === "true";
    return false;
  });
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("srwp_user");
      if (saved) return JSON.parse(saved);
    }
    return { name: "Gokul M", email: "gokul@gmail.com", id: "user_gokul" };
  });
  const [problems, setProblems] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(null);
  const [dmUser, setDmUser] = useState(null);

  const handleLogin = () => {
    localStorage.setItem("srwp_logged_in", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("srwp_logged_in");
    localStorage.removeItem("srwp_user");
    setLoggedIn(false);
  };

  const handleSetUser = (u) => {
    setUser(u);
    localStorage.setItem("srwp_user", JSON.stringify(u));
  };

  if (!loggedIn) return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <LandingPage onLogin={handleLogin} />
    </>
  );

  // DM view
  if (dmUser) return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <DMChat currentUser={user} otherUser={dmUser} onBack={() => setDmUser(null)} />
    </>
  );

  // Profile view
  if (viewingProfile) return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <ProfilePage profileUser={viewingProfile} currentUser={user} onBack={() => setViewingProfile(null)} onMessage={(u) => { setViewingProfile(null); setDmUser(u); }} />
    </>
  );

  const pages = {
    home: <HomePage user={user} setPage={setPage} problems={problems} />,
    problems: <ProblemsPage problems={problems} setProblems={setProblems} userId={user.id || "user_gokul"} />,
    community: <CommunityPage problems={problems} user={user} onViewProfile={setViewingProfile} onOpenDM={setDmUser} />,
    ai: <AIGuidePage />,
    settings: <SettingsPage user={user} setUser={handleSetUser} setLoggedIn={handleLogout} onViewProfile={setViewingProfile} />,
  };

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: C.bg, minHeight: "100vh", color: C.black, maxWidth: 480, margin: "0 auto" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } } input:focus, textarea:focus { outline: none; border-color: ${C.black} !important; } ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: ${C.gray200}; border-radius: 4px; } button { -webkit-tap-highlight-color: transparent; }`}</style>
      {pages[page] || pages.home}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

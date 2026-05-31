"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase Client ───────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Colors ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#f8f8f6", white: "#ffffff", black: "#0c0c0c",
  gray50: "#f4f4f2", gray100: "#ebebea", gray200: "#d8d8d5",
  gray400: "#9a9a94", gray600: "#5c5c56",
  green: "#1a6b3c", greenBg: "#e6f4ec",
  red: "#b91c1c", redBg: "#fef2f2",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ n, size = 20, color = "currentColor" }) => {
  const p = {
    home:      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z"/>,
    guide:     <><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    community: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    ai:        <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    chevron:   <polyline points="9 18 15 12 9 6"/>,
    back:      <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    send:      <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    zap:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    book:      <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    users:     <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    shield:    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    map:       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    heart:     <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    rupee:     <><path d="M6 3h12M6 8h12M6 21l7-13 7 13M10 13h8"/></>,
    target:    <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    leaf:      <path d="M17 8C8 10 5.9 16.17 3.82 19.25c1.41.46 2.98.25 4.18-.5 0 0 .82-5.25 9-7.25 0 0-3 5-11 5 1 2 4 4 10 2 5-2 7-8 7-14z"/>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    info:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    logout:    <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    bell:      <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    lock:      <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    globe:     <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    message:   <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
    phone:     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>,
    grow:      <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    earn:      <><path d="M6 3h12M6 8h12M6 21l7-13 7 13M10 13h8"/></>,
    connect:   <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {p[n]}
    </svg>
  );
};

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = ({ size = 20, color = C.black }) => (
  <div style={{ width: size, height: size, border: `2px solid rgba(0,0,0,0.1)`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
);

// ── Bottom Nav ────────────────────────────────────────────────────────────────
const BottomNav = ({ page, setPage }) => {
  const tabs = [
    { id: "home",      icon: "home",      label: "Home"      },
    { id: "guide",     icon: "guide",     label: "Guide"     },
    { id: "community", icon: "community", label: "Community" },
    { id: "ai",        icon: "ai",        label: "AI"        },
    { id: "profile",   icon: "users",     label: "Profile"   },
  ];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: C.white, borderTop: `1px solid ${C.gray200}`, display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom, 4px)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px 4px", border: "none", background: "none", cursor: "pointer", color: page === t.id ? C.black : C.gray400 }}>
          <Icon n={t.icon} size={20} color={page === t.id ? C.black : C.gray400} />
          <span style={{ fontSize: 9, fontWeight: page === t.id ? 700 : 500, fontFamily: "Nunito, sans-serif" }}>{t.label}</span>
          {page === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.green }} />}
        </button>
      ))}
    </nav>
  );
};

// ── Intro Page ────────────────────────────────────────────────────────────────
const IntroPage = ({ onGetStarted }) => {
  const features = [
    { icon: "guide",   title: "Guide",   desc: "AI-powered guidance in Tamil & English for every life situation" },
    { icon: "grow",    title: "Grow",    desc: "12 learning paths with certificates — farmers, students, job seekers" },
    { icon: "earn",    title: "Earn",    desc: "Skill Bazaar, Direct Harvest, challenges — earn without middlemen" },
    { icon: "connect", title: "Connect", desc: "Real community, mentors, government schemes — all in one place" },
  ];
  const stats = [
    { n: "10",  l: "Features" },
    { n: "12",  l: "Courses"  },
    { n: "₹0",  l: "Forever"  },
    { n: "All", l: "India"    },
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: C.black, padding: "48px 28px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: C.green, borderRadius: 18, marginBottom: 18 }}>
          <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: -1 }}>G</span>
        </div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: -1, lineHeight: 1.1 }}>
          Guide. Grow. Earn.
        </h1>
        <p style={{ color: C.gray400, fontSize: 13, margin: 0 }}>by GKFXL — Gokul Official</p>
      </div>

      <div style={{ background: C.greenBg, borderBottom: `1px solid ${C.green}20`, padding: "14px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: C.green, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
          Every Indian deserves guidance, growth and earning opportunity — regardless of money, location or background.
        </p>
      </div>

      <div style={{ padding: "24px 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "12px 6px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: "0 0 2px" }}>{s.n}</p>
              <p style={{ fontSize: 10, color: C.gray400, margin: 0, lineHeight: 1.3 }}>{s.l}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: C.black, marginBottom: 14 }}>What is GGE?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 40, height: 40, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={f.icon} size={20} color="#fff" />
              </div>
              <div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 3px" }}>{f.title}</p>
                <p style={{ fontSize: 12, color: C.gray600, margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: C.black, marginBottom: 12 }}>Built for Every Indian</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
          {["Students", "Farmers", "Job Seekers", "Parents", "Business Owners", "Anyone"].map((r, i) => (
            <div key={i} style={{ background: C.gray50, borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0 }}>{r}</p>
            </div>
          ))}
        </div>

        <div style={{ background: C.black, borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 3px" }}>100% Free Forever</p>
            <p style={{ fontSize: 12, color: C.gray400, margin: 0, lineHeight: 1.5 }}>No subscription. No hidden fees. No credit card. Ever.</p>
          </div>
          <div style={{ background: C.green, borderRadius: 10, padding: "6px 12px", flexShrink: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>₹0</p>
          </div>
        </div>

        <button onClick={onGetStarted} style={{ width: "100%", padding: "15px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          Get Started
          <Icon n="chevron" size={18} color="#fff" />
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: C.gray400, marginTop: 12 }}>Free to join — no credit card needed</p>
      </div>
    </div>
  );
};

// ── Login Page ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) setError(error.message);
    } catch (e) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "AI guidance in Tamil & English",
    "12 free learning paths with certificates",
    "Direct Harvest — sell crops without middlemen",
    "Government scheme finder",
    "Mentor match in your district",
    "100% free forever — no hidden charges",
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.black, padding: "40px 28px 36px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, background: C.green, borderRadius: 16, marginBottom: 16 }}>
          <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22 }}>G</span>
        </div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: -0.5 }}>Welcome to GGE</h1>
        <p style={{ color: C.gray400, fontSize: 13, margin: 0 }}>Guide. Grow. Earn. — by GKFXL</p>
      </div>

      <div style={{ flex: 1, padding: "28px 24px 40px" }}>
        <div style={{ background: C.white, borderRadius: 16, padding: "18px 18px 10px", border: `1px solid ${C.gray100}`, marginBottom: 24 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>What you get — free</p>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenBg, border: `1.5px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.5, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} style={{ width: "100%", padding: "15px 20px", background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", opacity: loading ? 0.7 : 1 }}>
          {loading ? <Spinner size={20} color={C.black} /> : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
        {error && (
          <div style={{ background: C.redBg, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
            <Icon n="info" size={15} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, margin: 0 }}>{error}</p>
          </div>
        )}

        <div style={{ background: C.gray50, borderRadius: 12, padding: "12px 14px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.6, margin: 0, textAlign: "center" }}>
            By continuing, you agree to GGE Terms & Privacy Policy. Your data is never sold. Google login only — no passwords stored.
          </p>
        </div>

        <button onClick={onBack} style={{ width: "100%", padding: "12px", background: "none", border: `1px solid ${C.gray200}`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.gray600, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
          Back to Intro
        </button>
      </div>

      <div style={{ padding: "12px 24px 28px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>GGE by GKFXL — Gokul Official · Free forever</p>
      </div>
    </div>
  );
};

// ── Home Page ─────────────────────────────────────────────────────────────────
const HomePage = ({ user, setPage }) => {
  const features = [
    { icon: "leaf",   title: "Direct Harvest",    desc: "Sell crops directly — no middlemen, 98% price to you", tag: "Farmers" },
    { icon: "book",   title: "Learn & Grow",       desc: "12 learning paths with certificates — free forever",    tag: "All"     },
    { icon: "shield", title: "Government Bridge",  desc: "AI finds the perfect scheme for you, step by step",     tag: "All"     },
    { icon: "users",  title: "Mentor Match",       desc: "Connect with a mentor in your district, same language", tag: "All"     },
    { icon: "rupee",  title: "Skill Bazaar",       desc: "List your skill, set your price, earn directly",        tag: "Earn"    },
    { icon: "target", title: "Challenge & Win",    desc: "Daily challenges — earn GGE points and real rewards",   tag: "All"     },
    { icon: "zap",    title: "AI Guide",           desc: "AI answers in Tamil, English, Tanglish — 24 hours",     tag: "All"     },
    { icon: "star",   title: "Purpose Finder",     desc: "10 questions — AI finds your perfect life path",        tag: "All"     },
  ];
  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={{ background: C.black, padding: "16px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
            {user.photo
              ? <img src={user.photo} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Poppins, sans-serif" }}>{(user.name || "U")[0].toUpperCase()}</span>
            }
          </div>
          <div>
            <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>Welcome back</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>{user.name || "User"}</p>
          </div>
        </div>
        <div style={{ background: C.green, borderRadius: 8, padding: "4px 10px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>GGE V2</p>
        </div>
      </div>

      {/* Mission strip */}
      <div style={{ background: C.greenBg, padding: "10px 20px", borderBottom: `1px solid ${C.green}20` }}>
        <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, textAlign: "center" }}>
          Every Indian deserves guidance, growth and earning opportunity — free forever
        </p>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 22 }}>
          {[{ n: "10", l: "Features" }, { n: "12", l: "Courses" }, { n: "₹0", l: "Forever" }, { n: "All", l: "India" }].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "12px 6px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 800, color: C.black, margin: "0 0 2px" }}>{s.n}</p>
              <p style={{ fontSize: 10, color: C.gray400, margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Hero card */}
        <div style={{ background: C.black, borderRadius: 18, padding: "20px 18px", marginBottom: 22 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Our Mission</p>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>
            Guide. Grow. Earn.<br />For Every Indian.
          </h2>
          <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6, marginBottom: 16 }}>
            GGE is a free platform by GKFXL that gives every Indian — student, farmer, job seeker or parent — the tools to grow and earn, regardless of background.
          </p>
          <button onClick={() => setPage("guide")} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Poppins, sans-serif" }}>
            Explore Features <Icon n="chevron" size={14} color="#fff" />
          </button>
        </div>

        {/* Features */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, margin: 0 }}>Core Features</h3>
          <button onClick={() => setPage("guide")} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: C.green, cursor: "pointer" }}>See all</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {features.map((f, i) => (
            <div key={i} onClick={() => setPage("guide")} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, background: C.black, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={f.icon} size={18} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{f.title}</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: C.greenBg, color: C.green, padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{f.tag}</span>
                </div>
                <p style={{ fontSize: 12, color: C.gray600, margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
              </div>
              <Icon n="chevron" size={16} color={C.gray400} />
            </div>
          ))}
        </div>

        {/* Free forever */}
        <div style={{ background: C.black, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", margin: "0 0 3px" }}>100% Free Forever</p>
            <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>No subscription. No hidden fees. No credit card. Ever.</p>
          </div>
          <div style={{ background: C.green, borderRadius: 10, padding: "8px 12px", flexShrink: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0 }}>₹0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Guide Page ────────────────────────────────────────────────────────────────
const GuidePage = ({ setSubPage }) => {
  const features = [
    { id: "harvest",      icon: "leaf",    title: "Direct Harvest",         tag: "Farmers", desc: "Sell crops directly — no middlemen, 98% price to you"         },
    { id: "learning",     icon: "book",    title: "Learn & Grow",           tag: "All",     desc: "12 learning paths with certificates — free forever"            },
    { id: "govbridge",    icon: "shield",  title: "Government Bridge",      tag: "All",     desc: "AI finds the perfect scheme for you, step by step"             },
    { id: "mentor",       icon: "users",   title: "Mentor Match",           tag: "All",     desc: "Connect with a mentor in your district, same language"         },
    { id: "skillbazar",   icon: "rupee",   title: "Skill Bazaar",           tag: "Earn",    desc: "List your skill, set your price, earn directly"                },
    { id: "challenge",    icon: "target",  title: "Challenge & Win",        tag: "All",     desc: "Daily challenges — earn GGE points and real rewards"           },
    { id: "village",      icon: "map",     title: "Village Connect",        tag: "Rural",   desc: "One phone helps 10 families — become a community rep"          },
    { id: "family",       icon: "heart",   title: "Family Dashboard",       tag: "Parents", desc: "Parents see real growth — skills, badges, achievements"        },
    { id: "purpose",      icon: "star",    title: "Purpose Finder",         tag: "All",     desc: "10 questions — AI finds your perfect life path"                },
    { id: "reels",        icon: "zap",     title: "Life Reels",             tag: "All",     desc: "Short 2-min guidance videos — agriculture, career, health"     },
    { id: "constitution", icon: "book",    title: "Kanoon & Constitution",  tag: "Rights",  desc: "Know your rights · Free legal documents in Tamil & English"   },
  ];
  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>GGE Features</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Guide Hub</p>
        </div>
        <div style={{ background: C.green, borderRadius: 8, padding: "4px 10px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>11 Features</p>
        </div>
      </div>

      <div style={{ background: C.greenBg, padding: "10px 20px", borderBottom: `1px solid ${C.green}20` }}>
        <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, textAlign: "center" }}>All tools free forever — pick what you need today</p>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* AI Quick Access */}
        <div style={{ background: C.black, borderRadius: 16, padding: "16px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, background: C.green, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon n="ai" size={20} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>AI Guide — Ask Anything</p>
            <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>Tamil · English · Tanglish · 24 hours</p>
          </div>
          <button onClick={() => setSubPage("ai")} style={{ background: C.green, border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Poppins, sans-serif", whiteSpace: "nowrap" }}>
            Open AI
          </button>
        </div>

        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 14 }}>All 10 Core Features</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {features.map((f) => (
            <button key={f.id} onClick={() => setSubPage(f.id)} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 14, textAlign: "left", cursor: "pointer", width: "100%" }}>
              <div style={{ width: 44, height: 44, background: C.black, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={f.icon} size={19} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{f.title}</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: C.greenBg, color: C.green, padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{f.tag}</span>
                </div>
                <p style={{ fontSize: 12, color: C.gray600, margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
              </div>
              <Icon n="chevron" size={16} color={C.gray400} />
            </button>
          ))}
        </div>

        <div style={{ background: C.black, borderRadius: 14, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 2px" }}>100% Free Forever</p>
            <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>No subscription. No hidden fees. Ever.</p>
          </div>
          <div style={{ background: C.green, borderRadius: 10, padding: "6px 12px" }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>₹0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Constitution & Legal Rights Page ─────────────────────────────────────────
const ConstitutionPage = ({ onBack, user }) => {
  const [activeTab, setActiveTab] = useState("rights");
  const [expandedSection, setExpandedSection] = useState(null);
  const [docType, setDocType] = useState("");
  const [docForm, setDocForm] = useState({ name: user?.name || "", district: "", details: "" });
  const [docOutput, setDocOutput] = useState("");
  const [docLoading, setDocLoading] = useState(false);

  const rights = [
    {
      id: "fundamental", icon: "shield", title: "Fundamental Rights",
      subtitle: "Articles 12–35 · Constitution of India",
      color: "#1a6b3c",
      articles: [
        { no: "Art. 14", title: "Right to Equality", desc: "The State shall not deny to any person equality before the law or equal protection of laws within India." },
        { no: "Art. 19", title: "Freedom of Speech", desc: "All citizens have the right to freedom of speech and expression, to assemble peacefully, and to form associations." },
        { no: "Art. 21", title: "Right to Life", desc: "No person shall be deprived of his life or personal liberty except according to procedure established by law." },
        { no: "Art. 21A", title: "Right to Education", desc: "The State shall provide free and compulsory education to all children aged 6 to 14 years." },
        { no: "Art. 22", title: "Protection on Arrest", desc: "You have the right to know why you are arrested, consult a lawyer, and appear before a magistrate within 24 hours." },
        { no: "Art. 32", title: "Constitutional Remedies", desc: "Every citizen can approach the Supreme Court to enforce Fundamental Rights. This right itself cannot be suspended." },
      ],
    },
    {
      id: "police", icon: "lock", title: "Police & Legal Rights",
      subtitle: "CrPC + IPC · Know before arrest",
      color: "#b91c1c",
      articles: [
        { no: "Rule 1", title: "Right to Know Charges", desc: "Police MUST tell you why you are being arrested. You have the right to remain silent. Anything you say can be used against you." },
        { no: "Rule 2", title: "24-Hour Magistrate Rule", desc: "Police cannot hold you beyond 24 hours without producing you before a magistrate. This is a fundamental right." },
        { no: "Rule 3", title: "Right to a Lawyer", desc: "You can demand a lawyer before any questioning. Police cannot interrogate you without giving you this chance." },
        { no: "Rule 4", title: "No Torture / Abuse", desc: "Any physical abuse, threat or forced confession by police is illegal. File a complaint at SP office or Human Rights Commission." },
        { no: "Rule 5", title: "Bail Rights", desc: "For bailable offences, you have the right to bail. For non-bailable offences, you can apply to a sessions court." },
        { no: "Rule 6", title: "FIR Rights", desc: "Police MUST register your FIR. If they refuse, you can complain to DSP or send complaint by post to Magistrate." },
      ],
    },
    {
      id: "farmer", icon: "leaf", title: "Farmer Rights & Land Laws",
      subtitle: "Agricultural laws · Tamil Nadu specific",
      color: "#1a6b3c",
      articles: [
        { no: "Law 1", title: "Minimum Support Price (MSP)", desc: "Government must announce MSP for major crops. Farmers can demand MSP from government procurement centres (APMC)." },
        { no: "Law 2", title: "PM-KISAN Scheme", desc: "₹6,000 per year direct income support to all farmer families. Paid in 3 instalments of ₹2,000 each." },
        { no: "Law 3", title: "Crop Insurance (PMFBY)", desc: "Pradhan Mantri Fasal Bima Yojana — low premium crop insurance. Register through your bank or CSC centre." },
        { no: "Law 4", title: "Land Record Rights", desc: "Every farmer has right to see their patta, chitta and adangal online at tnreginet.gov.in free of cost." },
        { no: "Law 5", title: "Water Rights", desc: "Farmers have right to irrigation water from government canals. Complaints go to District Collector's office." },
        { no: "Law 6", title: "No Forced Land Acquisition", desc: "Government cannot acquire farmland without fair compensation and consent under Land Acquisition Act 2013." },
      ],
    },
    {
      id: "women", icon: "heart", title: "Women's Legal Rights",
      subtitle: "POSH Act · Domestic Violence Act · IPC",
      color: "#7c3aed",
      articles: [
        { no: "POSH", title: "Workplace Safety (POSH Act)", desc: "Any woman facing sexual harassment at workplace can file complaint with Internal Complaints Committee (ICC). Employer must act within 90 days." },
        { no: "DV Act", title: "Domestic Violence Protection", desc: "Women facing domestic violence can approach magistrate directly for Protection Order, Residence Order and Monetary Relief." },
        { no: "IPC 498A", title: "Anti-Dowry Law", desc: "Demanding or giving dowry is a criminal offence. Maximum punishment 5 years imprisonment. File FIR at nearest police station." },
        { no: "IPC 354", title: "Outraging Modesty", desc: "Any assault or use of criminal force against a woman with intent to outrage her modesty is punishable up to 5 years." },
        { no: "POCSO", title: "Child Protection (POCSO)", desc: "Any sexual offence against a child under 18 is punishable under POCSO Act. Report immediately to police." },
        { no: "MTP Act", title: "Medical Termination Rights", desc: "Women have legal right to terminate pregnancy up to 24 weeks under medical advice. No consent of husband required." },
      ],
    },
    {
      id: "worker", icon: "grow", title: "Worker & Labour Rights",
      subtitle: "Labour laws · Minimum wage · ESI & PF",
      color: "#d97706",
      articles: [
        { no: "MW Act", title: "Minimum Wage Rights", desc: "Every worker is entitled to state minimum wage. Tamil Nadu minimum wage is revised every 6 months. Employer violation = criminal offence." },
        { no: "PF Act", title: "Provident Fund (EPF)", desc: "Any establishment with 20+ workers must provide PF. Employer contributes 12% of basic salary. Check balance at epfindia.gov.in." },
        { no: "ESI Act", title: "Medical Insurance (ESI)", desc: "Workers earning up to ₹21,000/month get free medical treatment for self and family under Employees State Insurance." },
        { no: "Bonus", title: "Annual Bonus Rights", desc: "Workers in establishments with 20+ employees earning up to ₹21,000/month are entitled to minimum 8.33% annual bonus." },
        { no: "Gratuity", title: "Gratuity Rights", desc: "After 5 years of continuous service, workers get gratuity = 15 days salary per year of service." },
        { no: "Leave", title: "Leave Rights", desc: "Workers entitled to: 12 days earned leave, 12 days sick leave, 12 days casual leave per year in Tamil Nadu." },
      ],
    },
    {
      id: "consumer", icon: "info", title: "Consumer & Digital Rights",
      subtitle: "Consumer Protection Act 2019 · IT Act",
      color: "#0891b2",
      articles: [
        { no: "CPA", title: "Right to Refund", desc: "Consumers have right to refund for defective goods within warranty period. Complaint to District Consumer Forum within 2 years." },
        { no: "E-Com", title: "Online Shopping Rights", desc: "E-commerce platforms must disclose seller info, return policy. You can return products and demand full refund for faulty items." },
        { no: "RTI", title: "Right to Information", desc: "Any citizen can ask any government office for information within 30 days. Application fee just ₹10. File at rtionline.gov.in." },
        { no: "IT Act", title: "Cyber Crime Rights", desc: "Online fraud, identity theft, cyber harassment are criminal offences. Report at cybercrime.gov.in." },
        { no: "Bank", title: "Banking Rights", desc: "Banks cannot charge hidden fees. Zero balance account is your right (BSBD account). Ombudsman resolves complaints free." },
        { no: "Data", title: "Data Privacy Rights", desc: "No company can share your personal data without consent under DPDP Act 2023. You can demand deletion of your data." },
      ],
    },
  ];



  const docTypes = [
    { id: "rti",      label: "RTI Application",              desc: "Ask any govt office for information" },
    { id: "landlord", label: "Legal Notice to Landlord",     desc: "Demand repairs, deposit return etc." },
    { id: "consumer", label: "Consumer Complaint Letter",    desc: "For defective product or bad service" },
    { id: "labour",   label: "Labour Complaint Letter",      desc: "Against employer for wage/leave issues" },
    { id: "police",   label: "Police Complaint Letter",      desc: "When FIR is refused by police" },
  ];

  const generateDoc = async () => {
    if (!docType || !docForm.name || !docForm.district || !docForm.details) return;
    setDocLoading(true);
    setDocOutput("");
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Generate a formal legal document in English for India.
Document type: ${docTypes.find(d => d.id === docType)?.label}
Applicant Name: ${docForm.name}
District: ${docForm.district}
Details/Issue: ${docForm.details}

Write a complete, professional letter with:
- Proper salutation and address
- Clear subject line
- Formal body with legal references
- Proper closing
- Signature line for ${docForm.name}

Keep it concise and legally appropriate for India.`
          }],
          userName: docForm.name,
        }),
      });
      const data = await res.json();
      setDocOutput(data.reply || "Could not generate document. Please try again.");
    } catch {
      setDocOutput("Error generating document. Check your internet connection.");
    } finally {
      setDocLoading(false);
    }
  };

  const tabs = [
    { id: "rights",    label: "Rights" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 90 }}>
      {/* Top Bar */}
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" size={22} color="#fff" />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Kanoon & Constitution</p>
          <p style={{ fontSize: 11, color: C.green, margin: 0 }}>Know your rights · Free legal documents</p>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: "#fff", padding: "3px 9px", borderRadius: 6 }}>Free</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.gray100}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: "12px 8px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: activeTab === t.id ? 700 : 500, color: activeTab === t.id ? C.black : C.gray400, borderBottom: activeTab === t.id ? `2px solid ${C.black}` : "2px solid transparent", fontFamily: "Nunito, sans-serif" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* ── RIGHTS TAB ── */}
        {activeTab === "rights" && (
          <div>
            <div style={{ background: C.black, borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
              <Icon n="shield" size={20} color={C.green} />
              <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.5, margin: 0 }}>
                India has <strong style={{ color: C.green }}>395 Articles</strong> in the Constitution. Here are the rights every Indian must know.
              </p>
            </div>
            {rights.map((section) => (
              <div key={section.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, marginBottom: 12, overflow: "hidden" }}>
                <div onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                  <div style={{ width: 42, height: 42, background: section.color, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon n={section.icon} size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{section.title}</p>
                    <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{section.subtitle}</p>
                  </div>
                  <div style={{ transform: expandedSection === section.id ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                    <Icon n="chevron" size={16} color={C.gray400} />
                  </div>
                </div>
                {expandedSection === section.id && (
                  <div style={{ borderTop: `1px solid ${C.gray100}`, padding: "12px 16px 16px" }}>
                    {section.articles.map((a, i) => (
                      <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < section.articles.length - 1 ? `1px solid ${C.gray50}` : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, background: section.color + "18", color: section.color, padding: "2px 8px", borderRadius: 5 }}>{a.no}</span>
                          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{a.title}</p>
                        </div>
                        <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── DOCUMENTS TAB ── */}
        {activeTab === "documents" && (
          <div>
            <div style={{ background: C.black, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Free Legal Document Generator</p>
              <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>AI writes your legal letter in seconds — Tamil & English</p>
            </div>

            {/* Step 1 — Choose doc type */}
            <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Step 1 — Choose Document</p>
            <div style={{ marginBottom: 16 }}>
              {docTypes.map(d => (
                <div key={d.id} onClick={() => { setDocType(d.id); setDocOutput(""); }} style={{ background: C.white, borderRadius: 12, padding: "13px 14px", border: `1.5px solid ${docType === d.id ? C.black : C.gray100}`, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${docType === d.id ? C.black : C.gray200}`, background: docType === d.id ? C.black : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {docType === d.id && <Icon n="check" size={11} color="#fff" />}
                  </div>
                  <div>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{d.label}</p>
                    <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2 — Fill details */}
            {docType && (
              <>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Step 2 — Your Details</p>
                <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.gray600, marginBottom: 6, display: "block" }}>Your Full Name *</label>
                    <input style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", boxSizing: "border-box" }} value={docForm.name} onChange={e => setDocForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.gray600, marginBottom: 6, display: "block" }}>Your District *</label>
                    <input style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", boxSizing: "border-box" }} value={docForm.district} onChange={e => setDocForm(f => ({ ...f, district: e.target.value }))} placeholder="e.g. Chennai, Coimbatore..." />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.gray600, marginBottom: 6, display: "block" }}>Describe Your Issue *</label>
                    <textarea style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", minHeight: 90, resize: "none", boxSizing: "border-box" }} value={docForm.details} onChange={e => setDocForm(f => ({ ...f, details: e.target.value }))} placeholder="Describe what happened, dates, amounts, names involved..." />
                  </div>
                </div>

                <button onClick={generateDoc} disabled={docLoading || !docForm.name || !docForm.district || !docForm.details} style={{ width: "100%", padding: "14px", background: docLoading || !docForm.name || !docForm.district || !docForm.details ? C.gray200 : C.black, color: docLoading || !docForm.name || !docForm.district || !docForm.details ? C.gray400 : "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                  {docLoading ? <><Spinner size={18} color={C.gray400} /> Generating...</> : "Generate Document"}
                </button>
              </>
            )}

            {/* Generated Document */}
            {docOutput && (
              <div style={{ background: C.white, borderRadius: 14, padding: "18px", border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>Your Document</p>
                  <button onClick={() => { navigator.clipboard?.writeText(docOutput); }} style={{ background: C.greenBg, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: C.green, cursor: "pointer" }}>Copy</button>
                </div>
                <div style={{ background: C.gray50, borderRadius: 10, padding: "14px", border: `1px solid ${C.gray100}` }}>
                  <p style={{ fontSize: 13, color: C.black, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{docOutput}</p>
                </div>
                <p style={{ fontSize: 11, color: C.gray400, margin: "10px 0 0", lineHeight: 1.5 }}>Review carefully before sending. GGE AI generates drafts — consult a lawyer for complex matters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Purpose Finder Page ───────────────────────────────────────────────────────
const PurposeFinderPage = ({ onBack, user }) => {
  const questions = [
    { q: "What stage of life are you in right now?", opts: ["Student / Still studying", "Looking for a job", "Working but want to grow", "Running or starting a business"] },
    { q: "What is your biggest challenge today?", opts: ["No money / financial stress", "No clear direction in life", "Lack of skills or knowledge", "Family pressure or responsibilities"] },
    { q: "What kind of work excites you most?", opts: ["Working with land / nature / animals", "Teaching or helping people learn", "Building things or solving problems", "Selling, trading or earning independently"] },
    { q: "How much time can you give daily to growth?", opts: ["Less than 30 minutes", "30 minutes to 1 hour", "1 to 3 hours", "More than 3 hours"] },
    { q: "What is your education background?", opts: ["10th or below", "12th / Diploma", "Graduate (UG)", "Postgraduate or higher"] },
    { q: "Where do you live?", opts: ["Village / Rural area", "Small town", "City", "Moving between places"] },
    { q: "What matters most to you in life?", opts: ["Financial security and stability", "Making a difference in my community", "Personal freedom and independence", "Family happiness and security"] },
    { q: "What is your biggest strength?", opts: ["I work hard and never give up", "I am good with people and communication", "I learn quickly and adapt fast", "I have deep knowledge in one area"] },
    { q: "How do you prefer to learn?", opts: ["Watching videos and examples", "Reading and studying alone", "Practicing hands-on by doing", "Learning from a mentor or guide"] },
    { q: "Where do you see yourself in 3 years?", opts: ["Financially independent with steady income", "Running my own business or farm", "Skilled professional in a good job", "Contributing to my community as a leader"] },
  ];

  const [step, setStep] = useState("intro"); // intro | questions | loading | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleOption = async (opt) => {
    const newAnswers = [...answers, { q: questions[current].q, a: opt }];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setStep("loading");
      try {
        const prompt = `You are GGE AI — a life path advisor for Indians.
A user answered 10 questions about their life. Based on their answers, give them a personalised life path.

User answers:
${newAnswers.map((a, i) => `${i + 1}. ${a.q}\n   Answer: ${a.a}`).join("\n")}

Respond in this EXACT format (no extra text, no markdown):
LIFE_PATH: [One sentence describing their ideal life path]
WHY: [2-3 sentences explaining why this fits them]
TOP_SKILL_1: [Most important skill to learn]
TOP_SKILL_2: [Second skill to learn]
TOP_SKILL_3: [Third skill to learn]
FIRST_STEP: [The single most important first action they should take this week]
MENTOR_TYPE: [Type of mentor they should find]
GGE_FEATURE: [Which GGE feature will help them most: Direct Harvest / Learn & Grow / Skill Bazaar / Mentor Match / Government Bridge / Challenge & Win]`;

        const res = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
            userName: user?.name || "GGE User",
          }),
        });
        const data = await res.json();
        const text = data.reply || "";
        const get = (key) => {
          const match = text.match(new RegExp(`${key}:\\s*(.+)`));
          return match ? match[1].trim() : "";
        };
        setResult({
          lifePath: get("LIFE_PATH"),
          why: get("WHY"),
          skills: [get("TOP_SKILL_1"), get("TOP_SKILL_2"), get("TOP_SKILL_3")].filter(Boolean),
          firstStep: get("FIRST_STEP"),
          mentorType: get("MENTOR_TYPE"),
          ggeFeature: get("GGE_FEATURE"),
        });
        setStep("result");
      } catch {
        setError("Could not generate your life path. Please check your internet and try again.");
        setStep("questions");
        setCurrent(questions.length - 1);
        setAnswers(newAnswers.slice(0, -1));
      }
    }
  };

  const reset = () => { setStep("intro"); setCurrent(0); setAnswers([]); setResult(null); setError(""); };

  if (step === "intro") return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="back" size={22} color="#fff" /></button>
        <div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Purpose Finder</p></div>
        <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: "#fff", padding: "3px 9px", borderRadius: 6 }}>AI</span>
      </div>
      <div style={{ padding: "24px 16px" }}>
        <div style={{ background: C.white, borderRadius: 18, padding: "28px 20px", border: `1px solid ${C.gray100}`, marginBottom: 16, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: C.black, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon n="star" size={28} color="#fff" />
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: C.black, margin: "0 0 10px" }}>Find Your Life Path</p>
          <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.65, margin: "0 0 20px" }}>Answer 10 simple questions. GGE AI will analyse your answers and give you a personalised life path — the right skills to learn, the first step to take, and which GGE features will help you most.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[["10", "Questions"], ["4", "Options each"], ["1", "Life path"], ["Free", "Forever"]].map(([n, l], i) => (
              <div key={i} style={{ background: C.gray50, borderRadius: 12, padding: "12px", border: `1px solid ${C.gray100}` }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: "0 0 2px" }}>{n}</p>
                <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setStep("questions")} style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
            Start — Find My Purpose
          </button>
        </div>
        <div style={{ background: C.greenBg, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.green}30` }}>
          <p style={{ fontSize: 13, color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>Your answers are private. GGE AI uses them only to give you the best guidance.</p>
        </div>
      </div>
    </div>
  );

  if (step === "questions") return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="back" size={22} color="#fff" /></button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Purpose Finder</p>
          <p style={{ fontSize: 11, color: C.green, margin: 0 }}>Question {current + 1} of {questions.length}</p>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, background: C.gray200 }}>
        <div style={{ height: "100%", background: C.green, width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.3s" }} />
      </div>
      <div style={{ padding: "28px 16px" }}>
        {error && (
          <div style={{ background: C.redBg, borderRadius: 10, padding: "12px 14px", marginBottom: 16, display: "flex", gap: 8 }}>
            <Icon n="info" size={15} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, margin: 0 }}>{error}</p>
          </div>
        )}
        <div style={{ background: C.white, borderRadius: 16, padding: "22px 18px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>Question {current + 1}</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 700, color: C.black, margin: 0, lineHeight: 1.4 }}>{questions[current].q}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {questions[current].opts.map((opt, i) => (
            <button key={i} onClick={() => handleOption(opt)} style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 14, padding: "16px 18px", fontSize: 14, fontWeight: 600, color: C.black, cursor: "pointer", textAlign: "left", fontFamily: "Nunito, sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: C.gray50, border: `1px solid ${C.gray200}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: C.gray400, margin: 0 }}>{["A", "B", "C", "D"][i]}</p>
              </div>
              {opt}
            </button>
          ))}
        </div>
        {current > 0 && (
          <button onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); }} style={{ marginTop: 16, background: "none", border: "none", fontSize: 13, color: C.gray400, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon n="back" size={14} color={C.gray400} /> Go back
          </button>
        )}
      </div>
    </div>
  );

  if (step === "loading") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "20px", fontFamily: "Nunito, sans-serif" }}>
      <Spinner size={40} color={C.green} />
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 700, color: C.black, textAlign: "center", margin: 0 }}>Analysing your answers...</p>
      <p style={{ fontSize: 14, color: C.gray400, textAlign: "center", margin: 0 }}>GGE AI is building your personalised life path</p>
    </div>
  );

  if (step === "result" && result) return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="back" size={22} color="#fff" /></button>
        <div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Your Life Path</p></div>
      </div>
      <div style={{ padding: "20px 16px" }}>
        {/* Life Path card */}
        <div style={{ background: C.black, borderRadius: 18, padding: "24px 20px", marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>Your Purpose</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.35 }}>{result.lifePath}</p>
          <p style={{ fontSize: 13, color: C.gray400, margin: 0, lineHeight: 1.65 }}>{result.why}</p>
        </div>
        {/* Skills */}
        <div style={{ background: C.white, borderRadius: 16, padding: "18px", border: `1px solid ${C.gray100}`, marginBottom: 14 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 12px" }}>Skills to Build</p>
          {result.skills.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < result.skills.length - 1 ? `1px solid ${C.gray100}` : "none" }}>
              <div style={{ width: 28, height: 28, background: C.black, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", margin: 0 }}>{i + 1}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.black, margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>
        {/* First step */}
        <div style={{ background: C.greenBg, borderRadius: 16, padding: "18px", border: `1px solid ${C.green}30`, marginBottom: 14 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.green, margin: "0 0 8px" }}>Your First Step This Week</p>
          <p style={{ fontSize: 14, color: C.black, fontWeight: 600, margin: 0, lineHeight: 1.55 }}>{result.firstStep}</p>
        </div>
        {/* Mentor + GGE Feature */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.8 }}>Mentor Type</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: 0, lineHeight: 1.4 }}>{result.mentorType}</p>
          </div>
          <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.8 }}>Use in GGE</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.green, margin: 0, lineHeight: 1.4 }}>{result.ggeFeature}</p>
          </div>
        </div>
        <button onClick={reset} style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
          Retake — Answer Again
        </button>
      </div>
    </div>
  );

  return null;
};

// ── Government Bridge Page ─────────────────────────────────────────────────────
const GovBridgePage = ({ onBack, user }) => {
  const questions = [
    { q: "Who are you?", opts: ["Student", "Farmer / Agricultural worker", "Job seeker / Unemployed", "Business owner / Self-employed", "Woman / Single mother", "Senior citizen (60+)", "Person with disability", "Other"] },
    { q: "What is your current income level?", opts: ["No income / Below poverty line", "Below ₹1 lakh per year", "₹1–3 lakh per year", "₹3–6 lakh per year", "Above ₹6 lakh per year"] },
    { q: "What kind of help do you need?", opts: ["Financial support / Money assistance", "Education or skill training", "Healthcare / Medical help", "Housing / Land related", "Business loan or startup support", "Job / Employment help", "Agriculture support"] },
    { q: "Which state do you belong to?", opts: ["Tamil Nadu", "Andhra Pradesh / Telangana", "Karnataka / Kerala", "Maharashtra / Gujarat", "North India (UP/Bihar/Rajasthan etc.)", "Other state"] },
  ];

  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState(null);
  const [error, setError] = useState("");

  const handleOption = async (opt) => {
    const newAnswers = [...answers, { q: questions[current].q, a: opt }];
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      try {
        const prompt = `You are GGE AI — an expert on Indian government schemes.
A user answered 4 questions. Find the best government schemes for them.

User profile:
${newAnswers.map((a) => `- ${a.q}: ${a.a}`).join("\n")}

List the top 3 most relevant government schemes. For each scheme use EXACTLY this format:

SCHEME_1_NAME: [Full official name of scheme]
SCHEME_1_WHO: [Who is eligible in one sentence]
SCHEME_1_BENEFIT: [What benefit they get — amount or service]
SCHEME_1_HOW: [How to apply — one clear sentence]
SCHEME_1_WEBSITE: [Official website or portal name]

SCHEME_2_NAME: [Full official name]
SCHEME_2_WHO: [Eligibility]
SCHEME_2_BENEFIT: [Benefit]
SCHEME_2_HOW: [How to apply]
SCHEME_2_WEBSITE: [Website]

SCHEME_3_NAME: [Full official name]
SCHEME_3_WHO: [Eligibility]
SCHEME_3_BENEFIT: [Benefit]
SCHEME_3_HOW: [How to apply]
SCHEME_3_WEBSITE: [Website]

NEXT_STEP: [The single most important action this person should take today to access these schemes]

Only list real, currently active Indian government schemes. Be specific with benefit amounts.`;

        const res = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", content: prompt }], userName: user?.name || "GGE User" }),
        });
        const data = await res.json();
        const text = data.reply || "";
        const get = (key) => { const m = text.match(new RegExp(`${key}:\\s*(.+)`)); return m ? m[1].trim() : ""; };
        const parsed = [1, 2, 3].map(n => ({
          name: get(`SCHEME_${n}_NAME`),
          who: get(`SCHEME_${n}_WHO`),
          benefit: get(`SCHEME_${n}_BENEFIT`),
          how: get(`SCHEME_${n}_HOW`),
          website: get(`SCHEME_${n}_WEBSITE`),
        })).filter(s => s.name);
        setSchemes({ list: parsed, nextStep: get("NEXT_STEP") });
        setStep("result");
      } catch {
        setError("Could not find schemes. Please check your internet and try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const reset = () => { setStep("intro"); setCurrent(0); setAnswers([]); setSchemes(null); setError(""); };

  if (step === "intro") return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="back" size={22} color="#fff" /></button>
        <div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Government Bridge</p></div>
        <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: "#fff", padding: "3px 9px", borderRadius: 6 }}>Free</span>
      </div>
      <div style={{ padding: "24px 16px" }}>
        <div style={{ background: C.white, borderRadius: 18, padding: "28px 20px", border: `1px solid ${C.gray100}`, marginBottom: 16, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: C.black, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon n="shield" size={28} color="#fff" />
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: C.black, margin: "0 0 10px" }}>Find Your Government Scheme</p>
          <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.65, margin: "0 0 20px" }}>Answer 4 simple questions. GGE AI will find the exact government schemes you qualify for — with step-by-step guidance on how to apply.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[["4", "Questions"], ["3", "Schemes found"], ["Free", "Forever"]].map(([n, l], i) => (
              <div key={i} style={{ background: C.gray50, borderRadius: 12, padding: "12px 8px", border: `1px solid ${C.gray100}` }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 800, color: C.black, margin: "0 0 2px" }}>{n}</p>
                <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setStep("questions")} style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
            Find My Schemes
          </button>
        </div>
        <div style={{ background: C.greenBg, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.green}30` }}>
          <p style={{ fontSize: 13, color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>Covers central + state schemes — PM-KISAN, Ayushman Bharat, Mudra Loan, scholarships and more.</p>
        </div>
      </div>
    </div>
  );

  if (step === "questions") return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="back" size={22} color="#fff" /></button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Government Bridge</p>
          <p style={{ fontSize: 11, color: C.green, margin: 0 }}>Question {current + 1} of {questions.length}</p>
        </div>
      </div>
      <div style={{ height: 4, background: C.gray200 }}>
        <div style={{ height: "100%", background: C.green, width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.3s" }} />
      </div>
      <div style={{ padding: "28px 16px" }}>
        {error && (
          <div style={{ background: C.redBg, borderRadius: 10, padding: "12px 14px", marginBottom: 16, display: "flex", gap: 8 }}>
            <Icon n="info" size={15} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, margin: 0 }}>{error}</p>
          </div>
        )}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 20 }}>
            <Spinner size={40} color={C.green} />
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: C.black, textAlign: "center", margin: 0 }}>Finding your schemes...</p>
            <p style={{ fontSize: 13, color: C.gray400, textAlign: "center", margin: 0 }}>GGE AI is searching all government databases</p>
          </div>
        ) : (
          <>
            <div style={{ background: C.white, borderRadius: 16, padding: "22px 18px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>Question {current + 1}</p>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 700, color: C.black, margin: 0, lineHeight: 1.4 }}>{questions[current].q}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {questions[current].opts.map((opt, i) => (
                <button key={i} onClick={() => handleOption(opt)} style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 14, padding: "14px 18px", fontSize: 14, fontWeight: 600, color: C.black, cursor: "pointer", textAlign: "left", fontFamily: "Nunito, sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: C.gray50, border: `1px solid ${C.gray200}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: C.gray400, margin: 0 }}>{["A","B","C","D","E","F","G","H"][i]}</p>
                  </div>
                  {opt}
                </button>
              ))}
            </div>
            {current > 0 && (
              <button onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); }} style={{ marginTop: 16, background: "none", border: "none", fontSize: 13, color: C.gray400, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon n="back" size={14} color={C.gray400} /> Go back
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  if (step === "result" && schemes) return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon n="back" size={22} color="#fff" /></button>
        <div style={{ flex: 1 }}><p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Your Schemes</p></div>
        <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: "#fff", padding: "3px 9px", borderRadius: 6 }}>{schemes.list.length} Found</span>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <div style={{ background: C.greenBg, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.green}30`, marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.green, margin: "0 0 4px" }}>Your Next Step</p>
          <p style={{ fontSize: 13, color: C.black, margin: 0, lineHeight: 1.55 }}>{schemes.nextStep}</p>
        </div>
        {schemes.list.map((s, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 16, padding: "18px", border: `1px solid ${C.gray100}`, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, background: C.black, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>{i + 1}</p>
              </div>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 800, color: C.black, margin: 0, lineHeight: 1.3 }}>{s.name}</p>
            </div>
            {[{ l: "Who can apply", v: s.who }, { l: "What you get", v: s.benefit }, { l: "How to apply", v: s.how }, { l: "Apply at", v: s.website }].map((r, j) => r.v ? (
              <div key={j} style={{ paddingTop: 10, borderTop: `1px solid ${C.gray100}`, marginTop: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 4px" }}>{r.l}</p>
                <p style={{ fontSize: 13, color: C.black, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{r.v}</p>
              </div>
            ) : null)}
          </div>
        ))}
        <button onClick={reset} style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
          Search Again
        </button>
      </div>
    </div>
  );

  return null;
};

// ── Feature Sub-Page ──────────────────────────────────────────────────────────
const FeatureSubPage = ({ featureId, onBack, user }) => {
  if (featureId === "constitution") return <ConstitutionPage onBack={onBack} user={user} />;
  if (featureId === "purpose")      return <PurposeFinderPage onBack={onBack} user={user} />;
  if (featureId === "govbridge")    return <GovBridgePage onBack={onBack} user={user} />;

  const details = {
    harvest:    { title: "Direct Harvest",    icon: "leaf",   tag: "Farmers", desc: "Sell your crops directly to buyers — no middlemen, no commission cuts. You keep 98% of the price. AI suggests fair market price based on your district.", coming: "Crop listing, buyer matching, price AI" },
    learning:   { title: "Learn & Grow",      icon: "book",   tag: "All",     desc: "12 learning paths covering farming, money, legal rights, career, health and more. Complete lessons, take exams, earn certificates — all free.", coming: "12 paths, lessons, exams, certificates" },
    mentor:     { title: "Mentor Match",      icon: "users",  tag: "All",     desc: "AI matches you with a mentor from your own district who speaks your language. Chat, call, get real guidance from someone who understands your situation.", coming: "Mentor profiles, chat, voice calls" },
    skillbazar: { title: "Skill Bazaar",      icon: "rupee",  tag: "Earn",    desc: "List any skill you have — tailoring, cooking, driving, coding, teaching. Set your own price. Buyers contact you directly. GKFXL takes only 2%.", coming: "Skill listing, buyer connect, reviews" },
    challenge:  { title: "Challenge & Win",   icon: "target", tag: "All",     desc: "Daily real-life challenges — save money, learn something, help someone. Complete them to earn GGE points. Top 10 on leaderboard win real rewards.", coming: "Daily challenges, leaderboard, rewards" },
    village:    { title: "Village Connect",   icon: "map",    tag: "Rural",   desc: "One person with a phone can help 10 families. Become a community rep for your village. AI guides your activities and connects you to resources.", coming: "Rep system, family connect, local feed" },
    family:     { title: "Family Dashboard",  icon: "heart",  tag: "Parents", desc: "Parents can see their child's real progress — skills learned, challenges completed, badges earned, GGE score. Share achievements via WhatsApp.", coming: "Progress view, badges, WhatsApp share" },
    reels:      { title: "Life Reels",        icon: "zap",    tag: "All",     desc: "Short 2-minute guidance videos on agriculture, money, career, mental health and life. AI personalises content based on your district and interests.", coming: "Video feed, like, save, AI personalise" },
    ai:         { title: "AI Guide",          icon: "ai",     tag: "All",     desc: "GGE AI understands Tamil, English and Tanglish. Ask anything — career, farming, legal rights, government schemes, money, health. Available 24 hours.", coming: "Full AI chat with 4-option interface" },
  };
  const d = details[featureId] || { title: "Feature", icon: "star", tag: "All", desc: "Coming soon.", coming: "In development" };
  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          <Icon n="back" size={22} color="#fff" />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>{d.title}</p>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: "#fff", padding: "3px 9px", borderRadius: 6 }}>{d.tag}</span>
      </div>
      <div style={{ padding: "24px 16px" }}>
        <div style={{ background: C.white, borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.gray100}`, marginBottom: 16, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: C.black, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon n={d.icon} size={28} color="#fff" />
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: "0 0 12px" }}>{d.title}</p>
          <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
        </div>
        <div style={{ background: C.greenBg, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.green}30`, marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>Building Now</p>
          <p style={{ fontSize: 13, color: C.black, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{d.coming}</p>
        </div>
        <div style={{ background: C.black, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: "0 0 2px", fontFamily: "Poppins, sans-serif" }}>Free Forever</p>
            <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>This feature will always be free</p>
          </div>
          <div style={{ background: C.green, borderRadius: 8, padding: "6px 10px" }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", margin: 0 }}>₹0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── GKFXL Application Form ────────────────────────────────────────────────────
const GKFXLApplicationPage = ({ user, onBack }) => {
  const [form, setForm] = useState({
    full_name: user?.name || "",
    dob: "",
    gender: "",
    mobile: "",
    email: user?.email || "",
    state: "",
    district: "",
    address: "",
    education: "",
    occupation: "",
    skills: "",
    role: "",
    why_join: "",
    contribution: "",
    languages: "",
    social_link: "",
    reference: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [existingStatus, setExistingStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // Check if already applied
    const checkStatus = async () => {
      if (!user?.id) { setCheckingStatus(false); return; }
      const { data } = await supabase
        .from("gkfxl_applications")
        .select("status, submitted_at")
        .eq("user_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) setExistingStatus(data);
      setCheckingStatus(false);
    };
    checkStatus();
  }, [user]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    // Validation
    if (!form.full_name || !form.dob || !form.gender || !form.mobile || !form.state || !form.district || !form.address || !form.education || !form.occupation || !form.skills || !form.role || !form.why_join || !form.contribution || !form.languages) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.why_join.trim().split(/\s+/).length < 50) {
      setError("'Why Join GKFXL' must be at least 50 words.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!form.terms) {
      setError("Please accept the terms to submit.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("gkfxl_applications").insert([{
        user_id: user?.id || null,
        full_name: form.full_name,
        dob: form.dob,
        gender: form.gender,
        mobile: form.mobile,
        email: form.email,
        state: form.state,
        district: form.district,
        address: form.address,
        education: form.education,
        occupation: form.occupation,
        skills: form.skills,
        role: form.role,
        why_join: form.why_join,
        contribution: form.contribution,
        languages: form.languages,
        social_link: form.social_link || null,
        reference: form.reference || null,
        status: "pending",
        submitted_at: new Date().toISOString(),
      }]);
      if (dbError) throw new Error(dbError.message);
      setSubmitted(true);
    } catch (e) {
      setError("Submission failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", background: C.white, color: C.black, outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, fontWeight: 700, color: C.gray600, marginBottom: 6, display: "block" };
  const fieldWrap = { marginBottom: 16 };

  // ── Status screen ──
  if (checkingStatus) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={32} color={C.green} />
    </div>
  );

  if (existingStatus) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" size={22} color="#fff" />
        </button>
        <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>GKFXL Application</p>
      </div>
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: existingStatus.status === "approved" ? C.greenBg : existingStatus.status === "rejected" ? C.redBg : C.gray100, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Icon n={existingStatus.status === "approved" ? "check" : existingStatus.status === "rejected" ? "info" : "bell"} size={32} color={existingStatus.status === "approved" ? C.green : existingStatus.status === "rejected" ? C.red : C.gray400} />
        </div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: C.black, marginBottom: 8 }}>
          {existingStatus.status === "approved" ? "Application Approved!" : existingStatus.status === "rejected" ? "Application Rejected" : "Application Pending"}
        </p>
        <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.6, marginBottom: 24 }}>
          {existingStatus.status === "approved"
            ? "You are now an official GKFXL member. Your badge has been added to your profile."
            : existingStatus.status === "rejected"
            ? "Your application was not approved this time. You can reapply after 30 days."
            : "Your application is under review. We will notify you within 7 days."}
        </p>
        <div style={{ background: C.gray50, borderRadius: 12, padding: "12px 16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>Submitted: {new Date(existingStatus.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <button onClick={onBack} style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Go Back</button>
      </div>
    </div>
  );

  // ── Success screen ──
  if (submitted) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: C.black, padding: "16px 20px" }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Application Submitted</p>
      </div>
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.greenBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Icon n="check" size={32} color={C.green} />
        </div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: C.black, marginBottom: 8 }}>Application Sent!</p>
        <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.6, marginBottom: 24 }}>Thank you for applying to GKFXL. We will review your application and notify you within 7 days.</p>
        <div style={{ background: C.greenBg, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.green}30`, marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: C.green, fontWeight: 600, margin: 0 }}>Questions? Contact: gokulmaniraj2008@gmail.com</p>
        </div>
        <button onClick={onBack} style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Back to Community</button>
      </div>
    </div>
  );

  // ── Application Form ──
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" size={22} color="#fff" />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Join GKFXL</p>
          <p style={{ fontSize: 11, color: C.green, margin: 0 }}>Free application · Takes 5 minutes</p>
        </div>
      </div>

      {/* Banner */}
      <div style={{ background: C.greenBg, padding: "12px 20px", borderBottom: `1px solid ${C.green}20` }}>
        <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, textAlign: "center" }}>Get verified GKFXL badge + ₹1000 bonus coins on approval</p>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* Section: Personal */}
        <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Personal Details</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Full Name *</label>
            <input style={inputStyle} value={form.full_name} onChange={e => set("full_name", e.target.value)} placeholder="Your full name" />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Date of Birth *</label>
            <input style={inputStyle} type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Gender *</label>
            <select style={inputStyle} value={form.gender} onChange={e => set("gender", e.target.value)}>
              <option value="">Select gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Mobile Number * (10-digit Indian)</label>
            <input style={inputStyle} value={form.mobile} onChange={e => set("mobile", e.target.value)} placeholder="9XXXXXXXXX" maxLength={10} inputMode="numeric" />
          </div>
          <div style={{ ...fieldWrap, marginBottom: 0 }}>
            <label style={labelStyle}>Email ID</label>
            <input style={{ ...inputStyle, background: C.gray50, color: C.gray400 }} value={form.email} readOnly />
          </div>
        </div>

        {/* Section: Location */}
        <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Location</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>State *</label>
            <select style={inputStyle} value={form.state} onChange={e => set("state", e.target.value)}>
              <option value="">Select state</option>
              {["Tamil Nadu","Andhra Pradesh","Karnataka","Kerala","Telangana","Maharashtra","Gujarat","Rajasthan","Uttar Pradesh","Bihar","West Bengal","Odisha","Madhya Pradesh","Punjab","Haryana","Delhi","Other"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>District *</label>
            <input style={inputStyle} value={form.district} onChange={e => set("district", e.target.value)} placeholder="Your district" />
          </div>
          <div style={{ ...fieldWrap, marginBottom: 0 }}>
            <label style={labelStyle}>Full Address *</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "none" }} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Door no, Street, Village/Town, Pincode" />
          </div>
        </div>

        {/* Section: Background */}
        <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Background</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Education *</label>
            <select style={inputStyle} value={form.education} onChange={e => set("education", e.target.value)}>
              <option value="">Select education</option>
              {["10th","12th","Diploma","UG (Bachelor's)","PG (Master's)","PhD","Other"].map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Occupation *</label>
            <select style={inputStyle} value={form.occupation} onChange={e => set("occupation", e.target.value)}>
              <option value="">Select occupation</option>
              {["Student","Employed","Self-Employed","Farmer","Business Owner","Unemployed","Homemaker","Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Your Skills *</label>
            <input style={inputStyle} value={form.skills} onChange={e => set("skills", e.target.value)} placeholder="e.g. Teaching, Farming, Coding, Cooking..." />
          </div>
          <div style={{ ...fieldWrap, marginBottom: 0 }}>
            <label style={labelStyle}>Languages Known *</label>
            <input style={inputStyle} value={form.languages} onChange={e => set("languages", e.target.value)} placeholder="e.g. Tamil, English, Hindi" />
          </div>
        </div>

        {/* Section: Role */}
        <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Role Applying For *</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          {["Community Representative","Content Creator","Mentor / Advisor","Agriculture Expert","Tech Support","Legal Aid Helper","District Coordinator","Women Support Lead","Youth Ambassador","Social Media Manager"].map(r => (
            <div key={r} onClick={() => set("role", r)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${C.gray50}`, cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${form.role === r ? C.green : C.gray200}`, background: form.role === r ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {form.role === r && <Icon n="check" size={11} color="#fff" />}
              </div>
              <p style={{ fontSize: 13, fontWeight: form.role === r ? 700 : 500, color: form.role === r ? C.black : C.gray600, margin: 0 }}>{r}</p>
            </div>
          ))}
        </div>

        {/* Section: Statement */}
        <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Your Statement</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Why do you want to join GKFXL? * <span style={{ color: C.gray400, fontWeight: 400 }}>(min 50 words)</span></label>
            <textarea style={{ ...inputStyle, minHeight: 120, resize: "none" }} value={form.why_join} onChange={e => set("why_join", e.target.value)} placeholder="Tell us why you want to be a GKFXL member and how you will contribute..." />
            <p style={{ fontSize: 11, color: form.why_join.trim().split(/\s+/).filter(Boolean).length >= 50 ? C.green : C.gray400, margin: "6px 0 0", textAlign: "right" }}>
              {form.why_join.trim().split(/\s+/).filter(Boolean).length} / 50 words
            </p>
          </div>
          <div style={{ ...fieldWrap, marginBottom: 0 }}>
            <label style={labelStyle}>Your Contribution Plan *</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "none" }} value={form.contribution} onChange={e => set("contribution", e.target.value)} placeholder="How will you specifically help your community?" />
          </div>
        </div>

        {/* Section: Optional */}
        <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Optional</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 20 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Social Media Link</label>
            <input style={inputStyle} value={form.social_link} onChange={e => set("social_link", e.target.value)} placeholder="Instagram, LinkedIn, YouTube..." />
          </div>
          <div style={{ ...fieldWrap, marginBottom: 0 }}>
            <label style={labelStyle}>Reference @username</label>
            <input style={inputStyle} value={form.reference} onChange={e => set("reference", e.target.value)} placeholder="@username of person who referred you" />
          </div>
        </div>

        {/* Terms */}
        <div onClick={() => set("terms", !form.terms)} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20, cursor: "pointer" }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${form.terms ? C.green : C.gray200}`, background: form.terms ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            {form.terms && <Icon n="check" size={13} color="#fff" />}
          </div>
          <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.55, margin: 0 }}>
            I agree to GKFXL's terms. I confirm all information is accurate. I understand approval is not guaranteed.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: C.redBg, borderRadius: 10, padding: "12px 14px", marginBottom: 16, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Icon n="info" size={16} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, margin: 0, lineHeight: 1.5 }}>{error}</p>
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "15px", background: loading ? C.gray200 : C.black, color: loading ? C.gray400 : "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {loading ? <><Spinner size={18} color={C.gray400} /> Submitting...</> : "Submit Application"}
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: C.gray400, marginTop: 10 }}>Free to apply · Response within 7 days</p>
      </div>
    </div>
  );
};

// ── Explore Page ──────────────────────────────────────────────────────────────
const ExplorePage = ({ user }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const search = async () => {
    const q = query.trim().replace(/^@/, "").toLowerCase();
    if (!q) return;
    setLoading(true);
    setSearched(true);
    setResults([]);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, username, email, role, state, district, gkfxl_badge, is_admin")
        .or(`username.ilike.%${q}%,name.ilike.%${q}%`)
        .limit(20);
      if (!error && data) setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    { icon: "users",  label: "Find farmers in your district"   },
    { icon: "book",   label: "Find students to study together" },
    { icon: "star",   label: "Find mentors near you"           },
    { icon: "rupee",  label: "Find skill sellers on GGE"       },
  ];

  if (selectedUser) return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => setSelectedUser(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" size={22} color="#fff" />
        </button>
        <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Profile</p>
      </div>
      <div style={{ padding: "24px 16px" }}>
        <div style={{ background: C.white, borderRadius: 18, padding: "28px 20px", border: `1px solid ${C.gray100}`, textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 28, fontFamily: "Poppins, sans-serif" }}>
              {(selectedUser.name || "U")[0].toUpperCase()}
            </span>
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: "0 0 4px" }}>{selectedUser.name}</p>
          <p style={{ fontSize: 13, color: C.gray400, margin: "0 0 12px" }}>@{selectedUser.username || selectedUser.email?.split("@")[0]}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {selectedUser.is_admin && (
              <span style={{ fontSize: 11, fontWeight: 700, background: C.black, color: "#fff", padding: "3px 10px", borderRadius: 6 }}>Admin</span>
            )}
            {selectedUser.gkfxl_badge && (
              <span style={{ fontSize: 11, fontWeight: 700, background: C.greenBg, color: C.green, padding: "3px 10px", borderRadius: 6 }}>GKFXL Member</span>
            )}
            <span style={{ fontSize: 11, fontWeight: 700, background: C.gray100, color: C.gray600, padding: "3px 10px", borderRadius: 6 }}>{selectedUser.role || "Member"}</span>
          </div>
        </div>
        {(selectedUser.state || selectedUser.district) && (
          <div style={{ background: C.white, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 10px" }}>Location</p>
            {[
              { l: "State",    v: selectedUser.state    },
              { l: "District", v: selectedUser.district },
            ].filter(r => r.v).map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.gray100}` : "none" }}>
                <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>{r.l}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0 }}>{r.v}</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ background: C.greenBg, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.green}30` }}>
          <p style={{ fontSize: 13, color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            Direct messaging coming soon. You will be able to chat with this member inside GGE.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>GGE</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Explore</p>
        </div>
        <div style={{ background: C.green, borderRadius: 8, padding: "4px 10px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>All India</p>
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 12, padding: "0 14px", gap: 10 }}>
            <Icon n="guide" size={16} color={C.gray400} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()}
              placeholder="Search by @username or name..."
              style={{ flex: 1, border: "none", background: "none", fontSize: 14, padding: "12px 0", outline: "none", fontFamily: "Nunito, sans-serif", color: C.black }}
            />
          </div>
          <button
            onClick={search}
            disabled={!query.trim()}
            style={{ padding: "0 18px", background: query.trim() ? C.black : C.gray200, border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, color: query.trim() ? "#fff" : C.gray400, cursor: query.trim() ? "pointer" : "not-allowed", fontFamily: "Poppins, sans-serif", whiteSpace: "nowrap" }}
          >
            Search
          </button>
        </div>

        {loading && (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
            <Spinner size={28} color={C.green} />
          </div>
        )}

        {!loading && searched && (
          results.length === 0
            ? (
              <div style={{ background: C.white, borderRadius: 14, padding: "32px 20px", border: `1px solid ${C.gray100}`, textAlign: "center", marginBottom: 20 }}>
                <Icon n="guide" size={32} color={C.gray200} />
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, margin: "14px 0 6px" }}>No users found</p>
                <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>Try a different name or username</p>
              </div>
            )
            : (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.gray400, marginBottom: 10 }}>{results.length} result{results.length !== 1 ? "s" : ""} found</p>
                {results.map((u, i) => (
                  <div key={u.id || i} onClick={() => setSelectedUser(u)} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 14, marginBottom: 10, cursor: "pointer" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "Poppins, sans-serif" }}>
                        {(u.name || "U")[0].toUpperCase()}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: 0 }}>{u.name}</p>
                        {u.is_admin && <span style={{ fontSize: 9, fontWeight: 700, background: C.black, color: "#fff", padding: "1px 6px", borderRadius: 4 }}>Admin</span>}
                        {u.gkfxl_badge && <span style={{ fontSize: 9, fontWeight: 700, background: C.greenBg, color: C.green, padding: "1px 6px", borderRadius: 4 }}>GKFXL</span>}
                      </div>
                      <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>@{u.username || u.email?.split("@")[0]} {u.district ? `· ${u.district}` : ""}</p>
                    </div>
                    <Icon n="chevron" size={16} color={C.gray400} />
                  </div>
                ))}
              </div>
            )
        )}

        {!searched && !loading && (
          <>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 12 }}>What can you find?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {suggestions.map((s, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 13, padding: "13px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon n={s.icon} size={17} color="#fff" />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: C.greenBg, borderRadius: 13, padding: "13px 16px", border: `1px solid ${C.green}30` }}>
              <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                Search by @username or full name to find GGE members across India.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Community Storage Keys ─────────────────────────────────────────────────────
const POSTS_KEY  = "gge_community_posts_v1";
const POLLS_KEY  = "gge_community_polls_v1";
const GROUPS_KEY = "gge_community_groups_v1";

const timeAgo = (ts) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)   return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

// ── Feed Tab ──────────────────────────────────────────────────────────────────
const CommunityFeedTab = ({ user }) => {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
      if (saved.length) return saved;
    } catch {}
    // Seed posts
    return [
      { id: 1, author: "Priya R", role: "Farmer", district: "Coimbatore", text: "PM-KISAN amount credited today! ₹2000 received. If you haven't registered yet, go to pmkisan.gov.in — it takes only 10 minutes.", likes: 24, liked: false, comments: [], ts: Date.now() - 3600000 },
      { id: 2, author: "Arjun M", role: "Student", district: "Chennai", text: "Cleared my 12th board with 92%. First person in my village to score above 90. GGE AI helped me with study planning. Thank you GKFXL!", likes: 61, liked: false, comments: [], ts: Date.now() - 7200000 },
      { id: 3, author: "Lakshmi V", role: "Job Seeker", district: "Madurai", text: "Got my first freelance project through Skill Bazaar — ₹3500 for data entry work. No middleman. All 3500 came to me directly.", likes: 38, liked: false, comments: [], ts: Date.now() - 86400000 },
    ];
  });
  const [newPost, setNewPost]   = useState("");
  const [posting, setPosting]   = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const savePosts = (p) => {
    setPosts(p);
    try { localStorage.setItem(POSTS_KEY, JSON.stringify(p)); } catch {}
  };

  const submitPost = () => {
    const text = newPost.trim();
    if (!text || posting) return;
    setPosting(true);
    const post = {
      id: Date.now(),
      author: user?.name || "GGE Member",
      role: "Member",
      district: "India",
      text,
      likes: 0,
      liked: false,
      comments: [],
      ts: Date.now(),
    };
    savePosts([post, ...posts]);
    setNewPost("");
    setShowCompose(false);
    setTimeout(() => setPosting(false), 300);
  };

  const toggleLike = (id) => {
    savePosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const addComment = (id) => {
    const text = (commentInputs[id] || "").trim();
    if (!text) return;
    const comment = { author: user?.name || "You", text, ts: Date.now() };
    savePosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, comment] } : p));
    setCommentInputs(ci => ({ ...ci, [id]: "" }));
  };

  const deletePost = (id) => {
    savePosts(posts.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: "0 0 90px" }}>
      {/* Compose bar */}
      <div style={{ padding: "12px 16px", background: C.white, borderBottom: `1px solid ${C.gray100}` }}>
        <div onClick={() => setShowCompose(true)} style={{ display: "flex", alignItems: "center", gap: 10, background: C.gray50, border: `1.5px solid ${C.gray200}`, borderRadius: 12, padding: "11px 14px", cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, fontFamily: "Poppins, sans-serif" }}>{(user?.name || "U")[0].toUpperCase()}</span>
          </div>
          <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>Share something with the community...</p>
          <div style={{ marginLeft: "auto", background: C.black, borderRadius: 8, padding: "5px 10px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>Post</p>
          </div>
        </div>
      </div>

      {/* Compose modal */}
      {showCompose && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowCompose(false)}>
          <div style={{ background: C.white, borderRadius: "20px 20px 0 0", padding: "20px 16px 40px", width: "100%", maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.gray200, borderRadius: 2, margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 12 }}>New Post</p>
            <textarea
              autoFocus
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share a tip, success story, question or update with the GGE community..."
              style={{ width: "100%", minHeight: 110, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", resize: "none", boxSizing: "border-box", color: C.black, background: C.gray50 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>{newPost.length}/500 characters</p>
              <button
                onClick={submitPost}
                disabled={!newPost.trim() || posting || newPost.length > 500}
                style={{ background: newPost.trim() && !posting ? C.black : C.gray200, color: newPost.trim() && !posting ? "#fff" : C.gray400, border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: newPost.trim() && !posting ? "pointer" : "not-allowed", fontFamily: "Poppins, sans-serif" }}
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div style={{ padding: "12px 16px 0" }}>
        {posts.map(post => (
          <div key={post.id} style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.gray100}`, marginBottom: 12, overflow: "hidden" }}>
            {/* Post header */}
            <div style={{ padding: "14px 16px 0", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Poppins, sans-serif" }}>{(post.author || "U")[0].toUpperCase()}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{post.author}</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: C.greenBg, color: C.green, padding: "2px 6px", borderRadius: 4 }}>{post.role}</span>
                </div>
                <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{post.district} · {timeAgo(post.ts)}</p>
              </div>
              {post.author === (user?.name || "GGE Member") && (
                <button onClick={() => deletePost(post.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <Icon n="info" size={15} color={C.gray400} />
                </button>
              )}
            </div>

            {/* Post body */}
            <div style={{ padding: "10px 16px 12px" }}>
              <p style={{ fontSize: 14, color: C.black, lineHeight: 1.65, margin: 0 }}>{post.text}</p>
            </div>

            {/* Actions */}
            <div style={{ borderTop: `1px solid ${C.gray50}`, padding: "8px 16px", display: "flex", gap: 16, alignItems: "center" }}>
              <button
                onClick={() => toggleLike(post.id)}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
              >
                <Icon n="heart" size={16} color={post.liked ? C.red : C.gray400} />
                <p style={{ fontSize: 12, fontWeight: 600, color: post.liked ? C.red : C.gray400, margin: 0 }}>{post.likes}</p>
              </button>
              <button
                onClick={() => setExpandedComments(ec => ({ ...ec, [post.id]: !ec[post.id] }))}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
              >
                <Icon n="message" size={16} color={C.gray400} />
                <p style={{ fontSize: 12, fontWeight: 600, color: C.gray400, margin: 0 }}>{post.comments.length}</p>
              </button>
              <button
                onClick={() => navigator.share?.({ text: post.text }) || navigator.clipboard?.writeText(post.text)}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginLeft: "auto" }}
              >
                <Icon n="globe" size={15} color={C.gray400} />
                <p style={{ fontSize: 12, fontWeight: 600, color: C.gray400, margin: 0 }}>Share</p>
              </button>
            </div>

            {/* Comments */}
            {expandedComments[post.id] && (
              <div style={{ borderTop: `1px solid ${C.gray50}`, padding: "10px 16px 14px" }}>
                {post.comments.map((c, ci) => (
                  <div key={ci} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.gray100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: C.gray600, fontFamily: "Poppins, sans-serif" }}>{(c.author || "U")[0].toUpperCase()}</span>
                    </div>
                    <div style={{ background: C.gray50, borderRadius: "0 10px 10px 10px", padding: "8px 12px", flex: 1 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{c.author}</p>
                      <p style={{ fontSize: 13, color: C.black, margin: 0, lineHeight: 1.5 }}>{c.text}</p>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <input
                    value={commentInputs[post.id] || ""}
                    onChange={e => setCommentInputs(ci => ({ ...ci, [post.id]: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && addComment(post.id)}
                    placeholder="Write a comment..."
                    style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: "Nunito, sans-serif", outline: "none", background: C.gray50, color: C.black }}
                  />
                  <button onClick={() => addComment(post.id)} style={{ width: 38, height: 38, borderRadius: 10, background: C.black, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                    <Icon n="send" size={14} color="#fff" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Polls Tab ─────────────────────────────────────────────────────────────────
const CommunityPollsTab = ({ user }) => {
  const [polls, setPolls] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(POLLS_KEY) || "[]");
      if (saved.length) return saved;
    } catch {}
    return [
      { id: 1, question: "Which GGE feature helped you the most?", options: ["AI Guide", "Direct Harvest", "Government Bridge", "Learn & Grow"], votes: [12, 8, 15, 9], voted: null, author: "GGE Team", ts: Date.now() - 3600000 * 5, endsAt: Date.now() + 86400000 * 2 },
      { id: 2, question: "What is the biggest challenge for farmers in your district right now?", options: ["Low crop prices", "Lack of water / irrigation", "No buyers directly", "Loan repayment stress"], votes: [20, 14, 18, 10], voted: null, author: "Farmer Community", ts: Date.now() - 86400000, endsAt: Date.now() + 86400000 * 3 },
    ];
  });
  const [showCreate, setShowCreate] = useState(false);
  const [newQ, setNewQ]       = useState("");
  const [newOpts, setNewOpts] = useState(["", "", "", ""]);

  const savePolls = (p) => {
    setPolls(p);
    try { localStorage.setItem(POLLS_KEY, JSON.stringify(p)); } catch {}
  };

  const vote = (pollId, optIdx) => {
    savePolls(polls.map(p => {
      if (p.id !== pollId || p.voted !== null) return p;
      const votes = [...p.votes];
      votes[optIdx]++;
      return { ...p, votes, voted: optIdx };
    }));
  };

  const createPoll = () => {
    const q = newQ.trim();
    const opts = newOpts.map(o => o.trim()).filter(Boolean);
    if (!q || opts.length < 2) return;
    const poll = {
      id: Date.now(),
      question: q,
      options: opts,
      votes: opts.map(() => 0),
      voted: null,
      author: user?.name || "GGE Member",
      ts: Date.now(),
      endsAt: Date.now() + 86400000 * 3,
    };
    savePolls([poll, ...polls]);
    setNewQ("");
    setNewOpts(["", "", "", ""]);
    setShowCreate(false);
  };

  const totalVotes = (p) => p.votes.reduce((a, b) => a + b, 0);
  const pct = (p, i) => { const t = totalVotes(p); return t ? Math.round((p.votes[i] / t) * 100) : 0; };

  return (
    <div style={{ padding: "12px 16px 90px" }}>
      {/* Create poll button */}
      <button
        onClick={() => setShowCreate(true)}
        style={{ width: "100%", padding: "13px", background: C.black, color: "#fff", border: "none", borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <Icon n="zap" size={16} color="#fff" />
        Create a Poll
      </button>

      {/* Create poll modal */}
      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowCreate(false)}>
          <div style={{ background: C.white, borderRadius: "20px 20px 0 0", padding: "20px 16px 40px", width: "100%", maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.gray200, borderRadius: 2, margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 14 }}>Create Poll</p>
            <input
              value={newQ}
              onChange={e => setNewQ(e.target.value)}
              placeholder="Your question..."
              style={{ width: "100%", padding: "12px 14px", borderRadius: 11, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box", color: C.black, background: C.gray50 }}
            />
            {newOpts.map((opt, i) => (
              <input
                key={i}
                value={opt}
                onChange={e => { const o = [...newOpts]; o[i] = e.target.value; setNewOpts(o); }}
                placeholder={`Option ${i + 1}${i < 2 ? " *" : " (optional)"}`}
                style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: "Nunito, sans-serif", outline: "none", marginBottom: 8, boxSizing: "border-box", color: C.black, background: C.gray50 }}
              />
            ))}
            <p style={{ fontSize: 11, color: C.gray400, marginBottom: 12 }}>Poll runs for 3 days · Visible to all GGE members</p>
            <button
              onClick={createPoll}
              disabled={!newQ.trim() || newOpts.filter(o => o.trim()).length < 2}
              style={{ width: "100%", padding: "13px", background: newQ.trim() && newOpts.filter(o => o.trim()).length >= 2 ? C.black : C.gray200, color: newQ.trim() && newOpts.filter(o => o.trim()).length >= 2 ? "#fff" : C.gray400, border: "none", borderRadius: 11, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}
            >
              Publish Poll
            </button>
          </div>
        </div>
      )}

      {/* Poll cards */}
      {polls.map(poll => (
        <div key={poll.id} style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.gray100}`, marginBottom: 12, padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, fontFamily: "Poppins, sans-serif" }}>{(poll.author || "G")[0].toUpperCase()}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, margin: 0 }}>{poll.author}</p>
              <p style={{ fontSize: 10, color: C.gray400, margin: 0 }}>{timeAgo(poll.ts)} · {totalVotes(poll)} votes</p>
            </div>
            {poll.voted !== null && (
              <span style={{ fontSize: 10, fontWeight: 700, background: C.greenBg, color: C.green, padding: "3px 8px", borderRadius: 5 }}>Voted</span>
            )}
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 12px", lineHeight: 1.4 }}>{poll.question}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {poll.options.map((opt, i) => {
              const p = pct(poll, i);
              const isVoted = poll.voted === i;
              const showResults = poll.voted !== null;
              return (
                <div
                  key={i}
                  onClick={() => !showResults && vote(poll.id, i)}
                  style={{ borderRadius: 10, border: `1.5px solid ${isVoted ? C.black : C.gray200}`, overflow: "hidden", cursor: showResults ? "default" : "pointer", position: "relative", background: C.white }}
                >
                  {showResults && (
                    <div style={{ position: "absolute", inset: 0, width: `${p}%`, background: isVoted ? C.black : C.gray100, borderRadius: 8, transition: "width 0.5s" }} />
                  )}
                  <div style={{ position: "relative", padding: "10px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 13, fontWeight: showResults && isVoted ? 700 : 500, color: showResults && isVoted ? (isVoted ? "#fff" : C.black) : C.black, margin: 0 }}>{opt}</p>
                    {showResults && <p style={{ fontSize: 12, fontWeight: 700, color: isVoted ? "#fff" : C.gray400, margin: 0 }}>{p}%</p>}
                  </div>
                </div>
              );
            })}
          </div>
          {poll.voted === null && (
            <p style={{ fontSize: 11, color: C.gray400, margin: "10px 0 0" }}>Tap an option to vote</p>
          )}
        </div>
      ))}
    </div>
  );
};

// ── Groups Tab ────────────────────────────────────────────────────────────────
// ── Realtime Group Chat ───────────────────────────────────────────────────────
const GroupChatRoom = ({ group, user, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(true);
  const bottomRef = useRef(null);
  const roomId = `group_${group.id}`;

  // Load history
  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true })
        .limit(100);
      setMessages(data || []);
      setLoading(false);
    };
    fetchHistory();

    // Subscribe to realtime inserts
    const channel = supabase
      .channel(`room_${roomId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${roomId}`,
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await supabase.from("messages").insert([{
      room_id:   roomId,
      author:    user?.name || "Member",
      author_id: user?.id   || null,
      text,
    }]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 58px)" }}>
      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.gray100}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" size={20} color={C.black} />
        </button>
        <div style={{ width: 36, height: 36, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon n="users" size={16} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{group.name}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <p style={{ fontSize: 11, color: C.green, margin: 0, fontWeight: 600 }}>Live</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {loading && <div style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}><Spinner size={24} color={C.green} /></div>}
        {!loading && messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontSize: 13, color: C.gray400 }}>No messages yet. Say hello!</p>
          </div>
        )}
        {messages.map((m, i) => {
          const isMe = m.author_id === user?.id || m.author === (user?.name || "");
          return (
            <div key={i} style={{ marginBottom: 10, display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
              {!isMe && <p style={{ fontSize: 10, color: C.gray400, margin: "0 0 3px 4px" }}>{m.author}</p>}
              <div style={{ maxWidth: "80%", padding: "10px 13px", borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: isMe ? C.black : C.white, border: isMe ? "none" : `1px solid ${C.gray100}`, color: isMe ? "#fff" : C.black, fontSize: 13, lineHeight: 1.55 }}>
                {m.text}
              </div>
              <p style={{ fontSize: 9, color: C.gray400, margin: "3px 4px 0" }}>{timeAgo(new Date(m.created_at).getTime())}</p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", background: C.white, borderTop: `1px solid ${C.gray100}`, paddingBottom: "calc(10px + env(safe-area-inset-bottom,0px) + 60px)", flexShrink: 0, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Message the group..."
          style={{ flex: 1, padding: "11px 13px", borderRadius: 11, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: "Nunito, sans-serif", outline: "none", background: C.gray50, color: C.black }}
        />
        <button onClick={send} disabled={!input.trim()} style={{ width: 42, height: 42, borderRadius: 11, background: input.trim() ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() ? "pointer" : "not-allowed", flexShrink: 0 }}>
          <Icon n="send" size={15} color={input.trim() ? "#fff" : C.gray400} />
        </button>
      </div>
    </div>
  );
};

// ── DM Chat Room (1-to-1 Realtime) ───────────────────────────────────────────
const DMChatRoom = ({ user, otherUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(true);
  const bottomRef = useRef(null);

  // Stable room id — same for both directions
  const roomId = [user.id, otherUser.id].sort().join("_dm_");

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("dm_messages")
        .select("*")
        .or(`and(from_id.eq.${user.id},to_id.eq.${otherUser.id}),and(from_id.eq.${otherUser.id},to_id.eq.${user.id})`)
        .order("created_at", { ascending: true })
        .limit(100);
      setMessages(data || []);
      setLoading(false);
    };
    fetchHistory();

    // Mark existing messages as seen
    supabase.from("dm_messages")
      .update({ seen: true })
      .eq("to_id", user.id)
      .eq("from_id", otherUser.id)
      .then(() => {});

    // Realtime subscription
    const channel = supabase
      .channel(`dm_${roomId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "dm_messages",
      }, (payload) => {
        const m = payload.new;
        const relevant = (m.from_id === user.id && m.to_id === otherUser.id) ||
                         (m.from_id === otherUser.id && m.to_id === user.id);
        if (relevant) setMessages(prev => [...prev, m]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [roomId, user.id, otherUser.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await supabase.from("dm_messages").insert([{
      from_id: user.id,
      to_id:   otherUser.id,
      text,
      seen:    false,
    }]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <div style={{ background: C.black, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" size={20} color="#fff" />
        </button>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: "Poppins, sans-serif" }}>{(otherUser.name || "U")[0].toUpperCase()}</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>{otherUser.name}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <p style={{ fontSize: 11, color: C.green, margin: 0, fontWeight: 600 }}>Live · End-to-end</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", background: C.bg }}>
        {loading && <div style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}><Spinner size={24} color={C.green} /></div>}
        {!loading && messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 56, height: 56, background: C.white, border: `1px solid ${C.gray100}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Icon n="message" size={24} color={C.gray200} />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 6px", fontFamily: "Poppins, sans-serif" }}>Start the conversation</p>
            <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>Messages are private between you and {otherUser.name}</p>
          </div>
        )}
        {messages.map((m, i) => {
          const isMe = m.from_id === user.id;
          const showSeen = isMe && m.seen && i === messages.length - 1;
          return (
            <div key={i} style={{ marginBottom: 10, display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "80%", padding: "11px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? C.black : C.white, border: isMe ? "none" : `1px solid ${C.gray100}`, color: isMe ? "#fff" : C.black, fontSize: 14, lineHeight: 1.55 }}>
                {m.text}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "3px 4px 0" }}>
                <p style={{ fontSize: 9, color: C.gray400, margin: 0 }}>{timeAgo(new Date(m.created_at).getTime())}</p>
                {showSeen && <p style={{ fontSize: 9, color: C.green, margin: 0, fontWeight: 700 }}>Seen</p>}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", background: C.white, borderTop: `1px solid ${C.gray100}`, paddingBottom: "calc(10px + env(safe-area-inset-bottom,0px) + 60px)", flexShrink: 0, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder={`Message ${otherUser.name}...`}
          style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", background: C.gray50, color: C.black }}
        />
        <button onClick={send} disabled={!input.trim()} style={{ width: 44, height: 44, borderRadius: 12, background: input.trim() ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() ? "pointer" : "not-allowed", flexShrink: 0 }}>
          <Icon n="send" size={16} color={input.trim() ? "#fff" : C.gray400} />
        </button>
      </div>
    </div>
  );
};

// ── DM Inbox ──────────────────────────────────────────────────────────────────
const DMInbox = ({ user, onOpen, onNewDM }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConvos = async () => {
      // Get all DMs involving this user
      const { data } = await supabase
        .from("dm_messages")
        .select("from_id, to_id, text, seen, created_at")
        .or(`from_id.eq.${user.id},to_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (!data) { setLoading(false); return; }

      // Group by conversation partner
      const seen = new Set();
      const convos = [];
      for (const m of data) {
        const partnerId = m.from_id === user.id ? m.to_id : m.from_id;
        if (seen.has(partnerId)) continue;
        seen.add(partnerId);
        convos.push({ partnerId, lastMsg: m.text, lastTs: m.created_at, unread: !m.seen && m.to_id === user.id });
      }

      // Fetch partner names
      const partnerIds = convos.map(c => c.partnerId).filter(Boolean);
      if (partnerIds.length > 0) {
        const { data: partners } = await supabase.from("users").select("id, name, username").in("id", partnerIds);
        const partnerMap = Object.fromEntries((partners || []).map(p => [p.id, p]));
        convos.forEach(c => { c.partner = partnerMap[c.partnerId]; });
      }

      setConversations(convos.filter(c => c.partner));
      setLoading(false);
    };
    fetchConvos();
  }, [user.id]);

  return (
    <div style={{ padding: "16px 16px 90px" }}>
      <button
        onClick={onNewDM}
        style={{ width: "100%", padding: "13px", background: C.black, color: "#fff", border: "none", borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <Icon n="send" size={16} color="#fff" /> New Message
      </button>

      {loading && <div style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}><Spinner size={24} color={C.green} /></div>}

      {!loading && conversations.length === 0 && (
        <div style={{ background: C.white, borderRadius: 14, padding: "40px 20px", border: `1px solid ${C.gray100}`, textAlign: "center" }}>
          <Icon n="message" size={32} color={C.gray200} />
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "14px 0 6px" }}>No messages yet</p>
          <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>Start a conversation from the Explore tab</p>
        </div>
      )}

      {conversations.map((c, i) => (
        <div key={i} onClick={() => onOpen(c.partner)} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1.5px solid ${c.unread ? C.black : C.gray100}`, marginBottom: 10, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, fontFamily: "Poppins, sans-serif" }}>{(c.partner.name || "U")[0].toUpperCase()}</span>
            {c.unread && <div style={{ position: "absolute", top: 0, right: 0, width: 12, height: 12, background: C.green, borderRadius: "50%", border: "2px solid #fff" }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: c.unread ? 800 : 700, color: C.black, margin: "0 0 3px" }}>{c.partner.name}</p>
            <p style={{ fontSize: 12, color: c.unread ? C.black : C.gray400, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: c.unread ? 600 : 400 }}>{c.lastMsg}</p>
          </div>
          <p style={{ fontSize: 10, color: C.gray400, margin: 0, flexShrink: 0 }}>{timeAgo(new Date(c.lastTs).getTime())}</p>
        </div>
      ))}
    </div>
  );
};

// ── New DM Search ─────────────────────────────────────────────────────────────
const NewDMSearch = ({ user, onSelect, onBack }) => {
  const [query, setQuery]   = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    const q = query.trim().replace(/^@/, "");
    if (!q) return;
    setLoading(true);
    const { data } = await supabase
      .from("users")
      .select("id, name, username, district, role")
      .neq("id", user.id)
      .or(`username.ilike.%${q}%,name.ilike.%${q}%`)
      .limit(15);
    setResults(data || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: "16px 16px 90px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", marginBottom: 16, fontSize: 13, fontWeight: 600, color: C.gray600, fontFamily: "Nunito, sans-serif" }}>
        <Icon n="back" size={16} color={C.gray600} /> Back
      </button>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 12 }}>New Message</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 12, padding: "0 14px", gap: 10 }}>
          <Icon n="guide" size={16} color={C.gray400} />
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="Search @username or name..." style={{ flex: 1, border: "none", background: "none", fontSize: 14, padding: "12px 0", outline: "none", fontFamily: "Nunito, sans-serif", color: C.black }} />
        </div>
        <button onClick={search} disabled={!query.trim()} style={{ padding: "0 16px", background: query.trim() ? C.black : C.gray200, border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, color: query.trim() ? "#fff" : C.gray400, cursor: query.trim() ? "pointer" : "not-allowed", fontFamily: "Poppins, sans-serif" }}>Find</button>
      </div>
      {loading && <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}><Spinner size={22} color={C.green} /></div>}
      {results.map((u, i) => (
        <div key={i} onClick={() => onSelect(u)} style={{ background: C.white, borderRadius: 13, padding: "13px 14px", border: `1px solid ${C.gray100}`, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Poppins, sans-serif" }}>{(u.name || "U")[0].toUpperCase()}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{u.name}</p>
            <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>@{u.username || "user"} {u.district ? `· ${u.district}` : ""}</p>
          </div>
          <Icon n="send" size={15} color={C.green} />
        </div>
      ))}
    </div>
  );
};

const CommunityGroupsTab = ({ user }) => {
  const [groups, setGroups] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(GROUPS_KEY) || "[]");
      if (saved.length) return saved;
    } catch {}
    return [
      { id: "farmers_tn",  name: "Tamil Nadu Farmers",  desc: "Crop tips, MSP updates, scheme alerts for TN farmers",   members: 142, joined: false, district: "Tamil Nadu" },
      { id: "students_in", name: "GGE Students India",  desc: "Study resources, exam tips and career guidance",          members: 289, joined: false, district: "All India"  },
      { id: "skill_net",   name: "Skill Sellers Network", desc: "List skills, find buyers, earn directly — no middlemen", members: 74,  joined: false, district: "All India"  },
    ];
  });
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName]       = useState("");
  const [newDesc, setNewDesc]       = useState("");
  const [newPrivacy, setNewPrivacy] = useState("Public");
  const [selectedGroup, setSelectedGroup] = useState(null);

  const saveGroups = (g) => {
    setGroups(g);
    try { localStorage.setItem(GROUPS_KEY, JSON.stringify(g)); } catch {}
  };

  const toggleJoin = (id) => {
    saveGroups(groups.map(g => g.id === id ? { ...g, joined: !g.joined, members: g.joined ? g.members - 1 : g.members + 1 } : g));
  };

  const createGroup = () => {
    if (!newName.trim()) return;
    const g = {
      id: `group_${Date.now()}`,
      name: newName.trim(),
      desc: newDesc.trim() || "A GGE community group",
      members: 1, joined: true, district: "All India", privacy: newPrivacy,
    };
    saveGroups([g, ...groups]);
    setNewName(""); setNewDesc(""); setNewPrivacy("Public");
    setShowCreate(false);
  };

  if (selectedGroup) {
    const g = groups.find(gr => gr.id === selectedGroup);
    const chats = groupChats[selectedGroup] || [];
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
        <div style={{ background: C.white, borderBottom: `1px solid ${C.gray100}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setSelectedGroup(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <Icon n="back" size={20} color={C.black} />
          </button>
          <div style={{ width: 36, height: 36, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon n="users" size={16} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{g?.name}</p>
            <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{g?.members} members</p>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          {chats.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <p style={{ fontSize: 13, color: C.gray400 }}>No messages yet. Start the conversation.</p>
            </div>
          )}
          {chats.map((m, i) => (
            <div key={i} style={{ marginBottom: 12, display: "flex", flexDirection: "column", alignItems: m.author === (user?.name || "You") ? "flex-end" : "flex-start" }}>
              <p style={{ fontSize: 10, color: C.gray400, margin: "0 0 3px" }}>{m.author} · {timeAgo(m.ts)}</p>
              <div style={{ maxWidth: "80%", padding: "10px 13px", borderRadius: m.author === (user?.name || "You") ? "12px 12px 4px 12px" : "12px 12px 12px 4px", background: m.author === (user?.name || "You") ? C.black : C.white, border: `1px solid ${C.gray100}`, color: m.author === (user?.name || "You") ? "#fff" : C.black, fontSize: 13, lineHeight: 1.55 }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 16px", background: C.white, borderTop: `1px solid ${C.gray100}`, paddingBottom: "calc(10px + env(safe-area-inset-bottom,0px) + 60px)", display: "flex", gap: 8 }}>
          <input
            value={groupMsg}
            onChange={e => setGroupMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendGroupMsg(selectedGroup)}
            placeholder="Message the group..."
            style={{ flex: 1, padding: "11px 13px", borderRadius: 11, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: "Nunito, sans-serif", outline: "none", background: C.gray50, color: C.black }}
          />
          <button onClick={() => sendGroupMsg(selectedGroup)} style={{ width: 42, height: 42, borderRadius: 11, background: C.black, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <Icon n="send" size={15} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 16px 90px" }}>
      <button
        onClick={() => setShowCreate(true)}
        style={{ width: "100%", padding: "13px", background: C.black, color: "#fff", border: "none", borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <Icon n="users" size={16} color="#fff" />
        Create a Group
      </button>

      {/* Create group modal */}
      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowCreate(false)}>
          <div style={{ background: C.white, borderRadius: "20px 20px 0 0", padding: "20px 16px 40px", width: "100%", maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.gray200, borderRadius: 2, margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, marginBottom: 14 }}>Create Group</p>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Group name *" style={{ width: "100%", padding: "12px 14px", borderRadius: 11, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box", color: C.black, background: C.gray50 }} />
            <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="What is this group about?" style={{ width: "100%", padding: "11px 13px", borderRadius: 11, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: "Nunito, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box", minHeight: 70, resize: "none", color: C.black, background: C.gray50 }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["Public", "Private"].map(p => (
                <div key={p} onClick={() => setNewPrivacy(p)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${newPrivacy === p ? C.black : C.gray200}`, background: newPrivacy === p ? C.black : C.white, textAlign: "center", cursor: "pointer" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: newPrivacy === p ? "#fff" : C.black, margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
            <button onClick={createGroup} disabled={!newName.trim()} style={{ width: "100%", padding: "13px", background: newName.trim() ? C.black : C.gray200, color: newName.trim() ? "#fff" : C.gray400, border: "none", borderRadius: 11, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
              Create Group
            </button>
          </div>
        </div>
      )}

      <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Discover Groups</p>
      {groups.map(g => (
        <div key={g.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, marginBottom: 10, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, background: C.black, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon n="users" size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{g.name}</p>
                {g.privacy === "Private" && <span style={{ fontSize: 9, fontWeight: 700, background: C.gray100, color: C.gray600, padding: "2px 6px", borderRadius: 4 }}>Private</span>}
              </div>
              <p style={{ fontSize: 12, color: C.gray600, margin: "0 0 4px", lineHeight: 1.45 }}>{g.desc}</p>
              <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{g.members} members · {g.district}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => toggleJoin(g.id)}
              style={{ flex: 1, padding: "9px", background: g.joined ? C.gray100 : C.black, color: g.joined ? C.black : "#fff", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
            >
              {g.joined ? "Leave Group" : "Join Group"}
            </button>
            {g.joined && (
              <button
                onClick={() => setSelectedGroup(g.id)}
                style={{ flex: 1, padding: "9px", background: C.greenBg, color: C.green, border: "none", borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
              >
                Open Chat
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Community Page ────────────────────────────────────────────────────────────
const CommunityPage = ({ user, setPage }) => {
  const [activeTab, setActiveTab] = useState("feed");
  const [showApplication, setShowApplication] = useState(false);

  if (showApplication) return <GKFXLApplicationPage user={user} onBack={() => setShowApplication(false)} />;

  const tabs = [
    { id: "feed",   label: "Feed"    },
    { id: "polls",  label: "Polls"   },
    { id: "groups", label: "Groups"  },
    { id: "gkfxl",  label: "GKFXL"  },
  ];

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: C.black, padding: "14px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>GGE</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Community</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setPage && setPage("explore")} style={{ background: C.white + "18", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon n="guide" size={14} color="#fff" />
            <p style={{ fontSize: 11, fontWeight: 600, color: "#fff", margin: 0 }}>Explore</p>
          </button>
          <div style={{ background: C.green, borderRadius: 8, padding: "4px 10px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>All India</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.gray100}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: "11px 4px", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: activeTab === t.id ? 700 : 500, color: activeTab === t.id ? C.black : C.gray400, borderBottom: activeTab === t.id ? `2px solid ${C.black}` : "2px solid transparent", fontFamily: "Nunito, sans-serif" }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "feed"   && <CommunityFeedTab  user={user} />}
      {activeTab === "polls"  && <CommunityPollsTab user={user} />}
      {activeTab === "groups" && <CommunityGroupsTab user={user} />}
      {activeTab === "gkfxl" && (
        <div style={{ padding: "16px 16px 90px" }}>
          {/* Profile card */}
          <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "Poppins, sans-serif" }}>{(user?.name || "U")[0].toUpperCase()}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{user?.name || "User"}</p>
              <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>{user?.email || "GGE Member"}</p>
            </div>
            <div style={{ background: C.greenBg, borderRadius: 8, padding: "4px 10px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.green, margin: 0 }}>Member</p>
            </div>
          </div>

          {/* Apply card */}
          <div style={{ background: C.black, borderRadius: 16, padding: "20px", marginBottom: 16 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Join GKFXL</p>
            <p style={{ fontSize: 13, color: C.gray400, margin: "0 0 16px", lineHeight: 1.55 }}>Become an official GKFXL member. Get a verified badge, ₹1000 bonus coins, and help build GGE for all Indians.</p>
            <button onClick={() => setShowApplication(true)} style={{ background: C.green, border: "none", borderRadius: 10, padding: "11px 20px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
              Apply Now — Free
            </button>
          </div>

          {/* Roles */}
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 10 }}>Available Roles</p>
          {[
            { icon: "users",  title: "Community Rep",   desc: "Help 10 families in your village with one phone" },
            { icon: "book",   title: "Content Creator", desc: "Create guidance videos and posts for your district" },
            { icon: "star",   title: "Mentor / Advisor",desc: "Guide others using your skills and experience" },
            { icon: "leaf",   title: "Farm Expert",     desc: "Share agriculture knowledge with other farmers" },
            { icon: "shield", title: "Legal Aid Helper",desc: "Help people understand their rights" },
            { icon: "heart",  title: "Women Support",   desc: "Support women in your community" },
          ].map((r, i) => (
            <div key={i} onClick={() => setShowApplication(true)} style={{ background: C.white, borderRadius: 13, padding: "13px 15px", border: `1px solid ${C.gray100}`, marginBottom: 9, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={r.icon} size={17} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{r.title}</p>
                <p style={{ fontSize: 12, color: C.gray600, margin: 0, lineHeight: 1.4 }}>{r.desc}</p>
              </div>
              <Icon n="chevron" size={15} color={C.gray400} />
            </div>
          ))}
          <div style={{ background: C.greenBg, borderRadius: 12, padding: "13px 15px", border: `1px solid ${C.green}30`, marginTop: 4 }}>
            <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0 }}>Contact: gokulmaniraj2008@gmail.com</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── AI Page ───────────────────────────────────────────────────────────────────
const HISTORY_KEY = "gge_ai_history_v1";
const RAG_KEY     = "gge_rag_docs_v1";

const INITIAL_MSG = {
  role: "assistant",
  text: "Vanakkam! I am GGE AI. Ask me anything in Tamil, English or Tanglish — career, farming, legal rights, government schemes, money, health. How can I help you today?",
  options: ["How to find government schemes?", "I am a farmer, help me sell crops", "How to earn money with my skills?", "Find a mentor in my district"],
  ts: Date.now(),
};

// ── AI Chat Tab ───────────────────────────────────────────────────────────────
const AIChatTab = ({ user, onSaveSession, initialMessages }) => {
  const [messages, setMessages]   = useState(initialMessages || [INITIAL_MSG]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Voice Input ──
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice input not supported on this browser. Try Chrome.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "ta-IN";       // Tamil first; browser falls back to English
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart  = () => setListening(true);
    rec.onend    = () => setListening(false);
    rec.onerror  = () => { setListening(false); setError("Voice input failed. Please try again."); };
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
    recognitionRef.current = rec;
    rec.start();
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // ── Send Message ──
  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    setError("");
    const newMessages = [...messages, { role: "user", text: msg, ts: Date.now() }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter(m => m.role === "user" || m.role === "assistant")
            .map(m => ({ role: m.role, content: m.text })),
          userName: user?.name || "GGE User",
        }),
      });
      const data = await res.json();
      let reply;
      if (data.isCrisis) {
        reply = { role: "assistant", text: data.reply, followUp: data.followUp, options: data.options || [], isCrisis: true, ts: Date.now() };
      } else {
        reply = { role: "assistant", text: data.reply || "Sorry, I could not process that. Please try again.", options: data.options || [], ts: Date.now() };
      }
      const finalMessages = [...newMessages, reply];
      setMessages(finalMessages);
      // Auto-save session to history after every reply
      onSaveSession(finalMessages);
    } catch (err) {
      setError("Could not reach AI. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ ...INITIAL_MSG, ts: Date.now() }]);
    setError("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Clear button */}
      <div style={{ padding: "8px 16px", background: C.white, borderBottom: `1px solid ${C.gray100}`, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={clearChat} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: C.gray400, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
          Clear chat
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.isCrisis ? (
                <div style={{ background: C.redBg, border: `1px solid #fca5a5`, borderRadius: 14, padding: "14px 16px", maxWidth: "88%" }}>
                  <p style={{ fontSize: 13, color: C.red, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.5 }}>{m.text}</p>
                  {m.followUp && <p style={{ fontSize: 12, color: C.red, margin: "8px 0 0", lineHeight: 1.5 }}>{m.followUp}</p>}
                </div>
              ) : (
                <div style={{ maxWidth: "88%", padding: "12px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? C.black : C.white, border: m.role === "user" ? "none" : `1px solid ${C.gray100}`, color: m.role === "user" ? "#fff" : C.black, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              )}
            </div>
            {m.options?.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
                {m.options.map((opt, j) => (
                  <button key={j} onClick={() => !loading && send(opt)} style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, color: C.black, cursor: loading ? "not-allowed" : "pointer", textAlign: "left", fontFamily: "Nunito, sans-serif", opacity: loading ? 0.6 : 1 }}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: "14px 14px 14px 4px", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <Spinner size={16} color={C.green} />
              <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>GGE AI is thinking...</p>
            </div>
          </div>
        )}
        {error && (
          <div style={{ background: C.redBg, borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <Icon n="info" size={15} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, margin: 0 }}>{error}</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ padding: "10px 12px", background: C.white, borderTop: `1px solid ${C.gray100}`, paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px) + 60px)", flexShrink: 0 }}>
        {listening && (
          <div style={{ background: C.greenBg, border: `1px solid ${C.green}30`, borderRadius: 10, padding: "8px 12px", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "spin 1s linear infinite" }} />
            <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0 }}>Listening... speak now in Tamil or English</p>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Voice button */}
          <button
            onClick={listening ? stopVoice : startVoice}
            style={{ width: 44, height: 44, borderRadius: 12, background: listening ? C.green : C.gray100, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
            title={listening ? "Stop voice" : "Speak in Tamil or English"}
          >
            <Icon n="phone" size={17} color={listening ? "#fff" : C.gray600} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !loading && send()}
            placeholder="Ask in Tamil, English or Tanglish..."
            style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", fontFamily: "Nunito, sans-serif", background: C.gray50, color: C.black }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{ width: 44, height: 44, borderRadius: 12, background: input.trim() && !loading ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() && !loading ? "pointer" : "not-allowed", flexShrink: 0 }}
          >
            <Icon n="send" size={16} color={input.trim() && !loading ? "#fff" : C.gray400} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── AI History Tab ────────────────────────────────────────────────────────────
const AIHistoryTab = ({ history, onDelete, onRestore }) => {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const session = history[selected];
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={() => setSelected(null)} style={{ background: C.gray100, border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: C.black, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
            Back to History
          </button>
          <button onClick={() => { onRestore(session.messages); setSelected(null); }} style={{ background: C.black, border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
            Restore Chat
          </button>
        </div>
        <p style={{ fontSize: 11, color: C.gray400, marginBottom: 14 }}>
          {new Date(session.savedAt).toLocaleString("en-IN")} · {session.messages.length} messages
        </p>
        {session.messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 12, display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "88%", padding: "10px 13px", borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px", background: m.role === "user" ? C.black : C.white, border: m.role === "user" ? "none" : `1px solid ${C.gray100}`, color: m.role === "user" ? "#fff" : C.black, fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!history.length) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", gap: 14 }}>
      <div style={{ width: 56, height: 56, background: C.gray100, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon n="book" size={26} color={C.gray400} />
      </div>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, margin: 0, textAlign: "center" }}>No saved chats yet</p>
      <p style={{ fontSize: 13, color: C.gray400, margin: 0, textAlign: "center", lineHeight: 1.55 }}>Your AI conversations are saved automatically. Start chatting to build your history.</p>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: C.gray400, marginBottom: 12 }}>{history.length} saved session{history.length !== 1 ? "s" : ""}</p>
      {history.slice().reverse().map((session, idx) => {
        const realIdx = history.length - 1 - idx;
        const preview = session.messages.find(m => m.role === "user")?.text || "Chat session";
        return (
          <div key={idx} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, marginBottom: 10, overflow: "hidden" }}>
            <div onClick={() => setSelected(realIdx)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: C.black, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n="ai" size={18} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{preview}</p>
                <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>
                  {new Date(session.savedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {session.messages.length} messages
                </p>
              </div>
              <Icon n="chevron" size={15} color={C.gray400} />
            </div>
            <div style={{ borderTop: `1px solid ${C.gray50}`, display: "flex" }}>
              <button onClick={() => onRestore(session.messages)} style={{ flex: 1, padding: "10px", background: "none", border: "none", fontSize: 12, fontWeight: 600, color: C.green, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
                Restore
              </button>
              <div style={{ width: 1, background: C.gray50 }} />
              <button onClick={() => onDelete(realIdx)} style={{ flex: 1, padding: "10px", background: "none", border: "none", fontSize: 12, fontWeight: 600, color: C.red, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── RAG Tab (Document AI) ─────────────────────────────────────────────────────
const AIRagTab = ({ user }) => {
  const [docs, setDocs]         = useState(() => {
    try { return JSON.parse(localStorage.getItem(RAG_KEY) || "[]"); } catch { return []; }
  });
  const [activeDoc, setActiveDoc] = useState(null);
  const [ragInput, setRagInput]   = useState("");
  const [ragLoading, setRagLoading] = useState(false);
  const [ragAnswer, setRagAnswer]   = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError]     = useState("");
  const fileRef = useRef(null);

  const saveDocs = (d) => {
    setDocs(d);
    try { localStorage.setItem(RAG_KEY, JSON.stringify(d)); } catch {}
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["text/plain", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(txt|pdf|doc|docx)$/i)) {
      setUploadError("Only TXT, PDF, DOC, DOCX files are supported.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File must be under 10MB.");
      return;
    }
    if (docs.length >= 10) {
      setUploadError("Maximum 10 files. Delete one to add more.");
      return;
    }
    setUploadError("");
    setUploadLoading(true);
    try {
      const text = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (ev) => res(ev.target.result);
        reader.onerror = () => rej(new Error("Could not read file"));
        reader.readAsText(file);
      });
      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        content: text.slice(0, 12000), // cap at ~12k chars for Groq context
        uploadedAt: Date.now(),
      };
      const updated = [...docs, newDoc];
      saveDocs(updated);
      setActiveDoc(newDoc.id);
    } catch {
      setUploadError("Could not read file. Make sure it is a text-based file.");
    } finally {
      setUploadLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const deleteDoc = (id) => {
    const updated = docs.filter(d => d.id !== id);
    saveDocs(updated);
    if (activeDoc === id) { setActiveDoc(null); setRagAnswer(null); }
  };

  const askRag = async () => {
    const q = ragInput.trim();
    if (!q || !activeDoc || ragLoading) return;
    const doc = docs.find(d => d.id === activeDoc);
    if (!doc) return;
    setRagLoading(true);
    setRagAnswer(null);
    try {
      const prompt = `You are a document assistant. Answer the question using ONLY the document content below. Do not use outside knowledge.

DOCUMENT: "${doc.name}"
CONTENT:
${doc.content}

QUESTION: ${q}

Answer clearly. If the answer is not in the document, say "This information is not in the document." At the end, add:
CONFIDENCE: high / medium / low
SOURCE: [quote the exact sentence from the document that supports your answer, under 20 words]`;

      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          userName: user?.name || "GGE User",
        }),
      });
      const data = await res.json();
      const text = data.reply || "";
      const confMatch = text.match(/CONFIDENCE:\s*(high|medium|low)/i);
      const srcMatch  = text.match(/SOURCE:\s*(.+)/i);
      const answer    = text.replace(/CONFIDENCE:.*/is, "").replace(/SOURCE:.*/is, "").trim();
      setRagAnswer({
        answer,
        confidence: confMatch?.[1]?.toLowerCase() || "medium",
        source: srcMatch?.[1]?.trim() || "",
      });
    } catch {
      setRagAnswer({ answer: "Could not get answer. Check your internet.", confidence: "low", source: "" });
    } finally {
      setRagLoading(false);
    }
  };

  const confColor = { high: C.green, medium: "#d97706", low: C.red };
  const fmtSize   = (b) => b < 1024 ? `${b}B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)}KB` : `${(b / (1024 * 1024)).toFixed(1)}MB`;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
      {/* Info banner */}
      <div style={{ background: C.black, borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Icon n="book" size={18} color={C.green} />
        <div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Document AI (RAG)</p>
          <p style={{ fontSize: 12, color: C.gray400, margin: 0, lineHeight: 1.55 }}>Upload your file — AI reads it and answers your questions from the document only. Max 10MB · 10 files · TXT, PDF, DOC, DOCX.</p>
        </div>
      </div>

      {/* Upload */}
      <input ref={fileRef} type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: "none" }} />
      <button
        onClick={() => !uploadLoading && fileRef.current?.click()}
        disabled={uploadLoading || docs.length >= 10}
        style={{ width: "100%", padding: "14px", background: uploadLoading || docs.length >= 10 ? C.gray100 : C.white, border: `1.5px dashed ${uploadLoading || docs.length >= 10 ? C.gray200 : C.gray400}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: uploadLoading || docs.length >= 10 ? "not-allowed" : "pointer", marginBottom: 12 }}
      >
        {uploadLoading
          ? <><Spinner size={18} color={C.green} /><p style={{ fontSize: 13, fontWeight: 600, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>Reading file...</p></>
          : <><Icon n="book" size={18} color={docs.length >= 10 ? C.gray400 : C.black} /><p style={{ fontSize: 13, fontWeight: 700, color: docs.length >= 10 ? C.gray400 : C.black, margin: 0, fontFamily: "Nunito, sans-serif" }}>Upload Document</p></>
        }
      </button>
      {uploadError && (
        <div style={{ background: C.redBg, borderRadius: 10, padding: "10px 13px", marginBottom: 12, display: "flex", gap: 8 }}>
          <Icon n="info" size={14} color={C.red} />
          <p style={{ fontSize: 12, color: C.red, margin: 0 }}>{uploadError}</p>
        </div>
      )}

      {/* Document list */}
      {docs.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Your Documents ({docs.length}/10)
          </p>
          {docs.map(doc => (
            <div
              key={doc.id}
              onClick={() => { setActiveDoc(doc.id); setRagAnswer(null); setRagInput(""); }}
              style={{ background: C.white, borderRadius: 13, border: `1.5px solid ${activeDoc === doc.id ? C.black : C.gray100}`, padding: "13px 14px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
            >
              <div style={{ width: 38, height: 38, background: activeDoc === doc.id ? C.black : C.gray100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n="book" size={16} color={activeDoc === doc.id ? "#fff" : C.gray400} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</p>
                <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{fmtSize(doc.size)} · {new Date(doc.uploadedAt).toLocaleDateString("en-IN")}</p>
              </div>
              {activeDoc === doc.id && (
                <span style={{ fontSize: 9, fontWeight: 700, background: C.greenBg, color: C.green, padding: "3px 8px", borderRadius: 5, flexShrink: 0 }}>Active</span>
              )}
              <button onClick={e => { e.stopPropagation(); deleteDoc(doc.id); }} style={{ background: C.redBg, border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", flexShrink: 0 }}>
                <Icon n="info" size={13} color={C.red} />
              </button>
            </div>
          ))}
        </>
      )}

      {/* Question box */}
      {activeDoc && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Ask About: {docs.find(d => d.id === activeDoc)?.name}
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input
              value={ragInput}
              onChange={e => setRagInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && askRag()}
              placeholder="What does this document say about..."
              style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.gray200}`, fontSize: 14, outline: "none", fontFamily: "Nunito, sans-serif", background: C.gray50, color: C.black }}
            />
            <button
              onClick={askRag}
              disabled={!ragInput.trim() || ragLoading}
              style={{ width: 46, height: 46, borderRadius: 12, background: ragInput.trim() && !ragLoading ? C.black : C.gray200, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: ragInput.trim() && !ragLoading ? "pointer" : "not-allowed", flexShrink: 0 }}
            >
              {ragLoading ? <Spinner size={16} color={C.gray400} /> : <Icon n="send" size={16} color={ragInput.trim() ? "#fff" : C.gray400} />}
            </button>
          </div>

          {/* Answer */}
          {ragAnswer && (
            <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, padding: "16px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>Answer</p>
                <span style={{ fontSize: 10, fontWeight: 700, background: confColor[ragAnswer.confidence] + "18", color: confColor[ragAnswer.confidence], padding: "2px 8px", borderRadius: 5, textTransform: "capitalize" }}>
                  {ragAnswer.confidence} confidence
                </span>
              </div>
              <p style={{ fontSize: 14, color: C.black, lineHeight: 1.65, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>{ragAnswer.answer}</p>
              {ragAnswer.source && (
                <div style={{ background: C.gray50, borderRadius: 9, padding: "10px 12px", border: `1px solid ${C.gray100}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, margin: "0 0 4px", letterSpacing: 0.8, textTransform: "uppercase" }}>Source snippet</p>
                  <p style={{ fontSize: 12, color: C.gray600, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>"{ragAnswer.source}"</p>
                </div>
              )}
            </div>
          )}

          {/* Quick prompts */}
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Quick Questions</p>
          {["Summarise this document in 3 points", "What are the main rules or requirements?", "What action do I need to take?", "Explain this in simple Tamil or English"].map((q, i) => (
            <button key={i} onClick={() => { setRagInput(q); }} style={{ width: "100%", background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, color: C.black, cursor: "pointer", textAlign: "left", fontFamily: "Nunito, sans-serif", marginBottom: 8 }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {docs.length === 0 && (
        <div style={{ background: C.greenBg, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.green}30`, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.55 }}>Upload any government letter, scheme PDF, contract, or notice — AI will read it and answer your questions.</p>
        </div>
      )}
    </div>
  );
};

// ── AI Page Shell ─────────────────────────────────────────────────────────────
const AIPage = ({ user }) => {
  const [tab, setTab]       = useState("chat");  // chat | history | rag
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
  });
  const [restoredMessages, setRestoredMessages] = useState(null);

  const saveSession = (messages) => {
    // Only save if there is at least one user message
    const hasUser = messages.some(m => m.role === "user");
    if (!hasUser) return;
    const session = { messages, savedAt: Date.now() };
    // Replace last session if saved within 10 min (same conversation), else append
    const updated = history.length > 0 && Date.now() - history[history.length - 1].savedAt < 10 * 60 * 1000
      ? [...history.slice(0, -1), session]
      : [...history, session];
    setHistory(updated);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch {}
  };

  const deleteSession = (idx) => {
    const updated = history.filter((_, i) => i !== idx);
    setHistory(updated);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch {}
  };

  const restoreSession = (messages) => {
    setRestoredMessages(messages);
    setTab("chat");
  };

  const tabs = [
    { id: "chat",    label: "Chat"      },
    { id: "history", label: "History"   },
    { id: "rag",     label: "Doc AI"    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Nunito, sans-serif", background: C.bg, maxWidth: 480, margin: "0 auto" }}>
      {/* Top Bar */}
      <div style={{ background: C.black, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, background: C.green, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon n="ai" size={18} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>GGE AI</p>
          <p style={{ fontSize: 11, color: C.green, margin: 0 }}>Tamil · English · Tanglish · Voice</p>
        </div>
        <div style={{ background: C.green, borderRadius: 6, padding: "3px 8px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#fff", margin: 0 }}>Free</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.gray100}`, flexShrink: 0 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: "11px 8px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.black : C.gray400, borderBottom: tab === t.id ? `2px solid ${C.black}` : "2px solid transparent", fontFamily: "Nunito, sans-serif", position: "relative" }}
          >
            {t.label}
            {t.id === "history" && history.length > 0 && (
              <span style={{ position: "absolute", top: 8, right: "calc(50% - 22px)", width: 16, height: 16, background: C.green, borderRadius: "50%", fontSize: 9, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {history.length > 9 ? "9+" : history.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "chat" && (
        <AIChatTab
          user={user}
          onSaveSession={saveSession}
          key={restoredMessages ? JSON.stringify(restoredMessages[0]?.ts) : "default"}
          initialMessages={restoredMessages}
        />
      )}
      {tab === "history" && (
        <AIHistoryTab
          history={history}
          onDelete={deleteSession}
          onRestore={restoreSession}
        />
      )}
      {tab === "rag" && (
        <AIRagTab user={user} />
      )}
    </div>
  );
};

// ── Settings Page ─────────────────────────────────────────────────────────────
const SettingsPage = ({ user, onLogout, onBack }) => {
  const [lang, setLang] = useState("English");
  const [modal, setModal] = useState(null);

  const Row = ({ icon, label, value, onClick, danger }) => (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: "none", border: "none", borderBottom: `1px solid ${C.gray50}`, cursor: "pointer", textAlign: "left" }}>
      <div style={{ width: 34, height: 34, background: danger ? C.redBg : C.gray50, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon n={icon} size={16} color={danger ? C.red : C.gray600} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: danger ? C.red : C.black, margin: 0 }}>{label}</p>
        {value && <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>{value}</p>}
      </div>
      {!danger && <Icon n="chevron" size={15} color={C.gray400} />}
    </button>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
      {title && <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{title}</p>}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, overflow: "hidden" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: C.black, padding: "16px 20px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <Icon n="back" size={20} color="#fff" />
          </button>
        )}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>GGE</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Settings</p>
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Profile card */}
        <div style={{ background: C.white, borderRadius: 16, padding: 16, border: `1px solid ${C.gray100}`, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "Poppins, sans-serif" }}>{(user.name || "U")[0].toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>{user.name || "User"}</p>
            <p style={{ fontSize: 13, color: C.gray400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email || "GGE Member"}</p>
          </div>
        </div>

        {/* Security notice */}
        <div style={{ background: C.greenBg, border: `1px solid ${C.green}30`, borderRadius: 12, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Icon n="shield" size={16} color={C.green} />
          <p style={{ fontSize: 12, color: C.green, lineHeight: 1.5, margin: 0 }}>Groq API key stored securely on server. Never exposed to browser.</p>
        </div>

        <Section title="AI & Usage">
          <Row icon="ai"   label="AI Usage"    value="100MB free daily — resets at midnight"  onClick={() => setModal("ai")} />
          <Row icon="lock" label="Privacy"      value="Your data is never sold"                onClick={() => setModal("privacy")} />
        </Section>

        <Section title="Preferences">
          <Row icon="globe" label="Language" value={lang} onClick={() => setModal("language")} />
          <Row icon="bell"  label="Notifications" value="Coming soon"  onClick={() => {}} />
        </Section>

        <Section title="Support">
          <Row icon="guide" label="Help & FAQ"   onClick={() => setModal("help")} />
          <Row icon="info"  label="About GGE"    value="V2 Pro · By GKFXL" onClick={() => setModal("about")} />
        </Section>

        <Section title="">
          <Row icon="logout" label="Log Out" danger onClick={onLogout} />
        </Section>
      </div>

      {/* Modals */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setModal(null)}>
          <div style={{ background: C.white, borderRadius: "20px 20px 0 0", padding: "20px 20px 40px", width: "100%", maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: C.gray200, borderRadius: 2, margin: "0 auto 20px" }} />

            {modal === "language" && (
              <>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Language</p>
                {["English", "Tamil", "Tanglish"].map(l => (
                  <div key={l} onClick={() => { setLang(l); setModal(null); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.gray100}`, cursor: "pointer" }}>
                    <p style={{ fontSize: 14, fontWeight: lang === l ? 700 : 500, margin: 0 }}>{l}</p>
                    {lang === l && <Icon n="check" size={16} color={C.green} />}
                  </div>
                ))}
              </>
            )}

            {modal === "ai" && (
              <>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>AI Usage</p>
                <div style={{ background: C.gray50, borderRadius: 12, padding: "14px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Daily AI Limit</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: C.green, margin: 0 }}>0 / 100MB</p>
                  </div>
                  <div style={{ height: 8, background: C.gray200, borderRadius: 4 }}>
                    <div style={{ width: "0%", height: "100%", background: C.green, borderRadius: 4 }} />
                  </div>
                </div>
                {[{ t: "Daily Limit", d: "100MB free AI per day" }, { t: "Resets", d: "Every midnight automatically" }, { t: "Languages", d: "Tamil, English, Tanglish" }, { t: "Model", d: "Groq llama3-8b-8192" }].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.gray100}` }}>
                    <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>{r.t}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{r.d}</p>
                  </div>
                ))}
              </>
            )}

            {modal === "privacy" && (
              <>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Privacy</p>
                {[{ t: "Your Data", d: "GGE stores your name and email in Supabase. No data is ever sold." }, { t: "Google Login", d: "We use Google OAuth only. No passwords are stored anywhere." }, { t: "API Keys", d: "Groq API key is on server only — never sent to your browser." }, { t: "Delete Account", d: "Contact gokulmaniraj2008@gmail.com to permanently delete all your data." }].map((r, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.gray100}` }}>
                    <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, margin: "0 0 4px" }}>{r.t}</p>
                    <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6, margin: 0 }}>{r.d}</p>
                  </div>
                ))}
              </>
            )}

            {modal === "help" && (
              <>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Help & FAQ</p>
                {[
                  { q: "Is GGE really free?", a: "Yes. 100% free forever. No subscription, no hidden fees, no credit card needed." },
                  { q: "What languages does AI support?", a: "Tamil (Unicode), English, and Tanglish (Tamil in English letters). AI auto-detects your language." },
                  { q: "How do I join GKFXL?", a: "Go to Community → Join GKFXL tab and contact gokulmaniraj2008@gmail.com." },
                  { q: "How does AI Guide work?", a: "Type your question → AI analyses → gives answer + 4 options to continue. Groq API key is on server, never exposed." },
                  { q: "What is Direct Harvest?", a: "Farmers can sell crops directly to buyers — no middlemen. You keep 98% of the price." },
                ].map((f, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.gray100}` }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>{f.q}</p>
                    <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                  </div>
                ))}
              </>
            )}

            {modal === "about" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, background: C.black, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22 }}>G</span>
                  </div>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>GGE — Guide, Grow, Earn</p>
                  <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>by GKFXL — Gokul Official</p>
                </div>
                {[{ l: "Version", v: "V2 Pro" }, { l: "Framework", v: "Next.js 14" }, { l: "AI", v: "Groq llama3-8b-8192" }, { l: "Database", v: "Supabase" }, { l: "Hosting", v: "Vercel" }, { l: "Cost", v: "₹0 Forever" }, { l: "Contact", v: "gokulmaniraj2008@gmail.com" }].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.gray100}` }}>
                    <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>{r.l}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{r.v}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Profile Page ──────────────────────────────────────────────────────────────
const ProfilePage = ({ user, onLogout }) => {
  const [tab, setTab]           = useState("profile");
  const [dbUser, setDbUser]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [posts, setPosts]       = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState("");

  const isAdmin = user?.email === "gokulmaniraj2008@gmail.com";

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setDbUser(data);
          setEditForm({ name: data.name, username: data.username, mobile: data.mobile || "", state: data.state, district: data.district, role: data.role });
        }
      } catch {}

      // Load community posts by this user
      try {
        const saved = JSON.parse(localStorage.getItem("gge_community_posts_v1") || "[]");
        setPosts(saved.filter(p => p.author === (user?.name || "")));
      } catch {}

      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true); setSaveMsg("");
    try {
      const { error } = await supabase.from("users").update({
        name:     editForm.name,
        username: editForm.username,
        mobile:   editForm.mobile || null,
        state:    editForm.state,
        district: editForm.district,
        role:     editForm.role,
      }).eq("id", user.id);
      if (error) throw new Error(error.message);
      setDbUser(d => ({ ...d, ...editForm }));
      setSaveMsg("Profile updated.");
      setEditMode(false);
    } catch (e) {
      setSaveMsg("Error: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const u = dbUser || user;
  const score     = dbUser?.gge_score   || 0;
  const points    = dbUser?.points      || 0;
  const level     = score >= 750 ? "Champion" : score >= 500 ? "Leader" : score >= 200 ? "Growing" : "Beginner";
  const levelColor= score >= 750 ? "#f59e0b" : score >= 500 ? C.green : score >= 200 ? "#3b82f6" : C.gray400;

  if (showSettings) return <SettingsPage user={user} onLogout={onLogout} onBack={() => setShowSettings(false)} />;

  const tabs = [
    { id: "profile", label: "Profile"  },
    { id: "posts",   label: "Posts"    },
    { id: "badges",  label: "Badges"   },
  ];

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh", paddingBottom: 90 }}>

      {/* Top Bar */}
      <div style={{ background: C.black, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 800, color: "#fff", margin: 0 }}>My Profile</p>
        <div style={{ display: "flex", gap: 8 }}>
          {isAdmin && (
            <div style={{ background: "#f59e0b", borderRadius: 7, padding: "3px 10px" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#fff", margin: 0 }}>Admin</p>
            </div>
          )}
          <button onClick={() => setShowSettings(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <Icon n="settings" size={20} color="#fff" />
          </button>
        </div>
      </div>

      {/* Profile Hero */}
      <div style={{ background: C.black, padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.green, border: `3px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {user?.photo
                ? <img src={user.photo} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ color: "#fff", fontWeight: 800, fontSize: 28, fontFamily: "Poppins, sans-serif" }}>{(u?.name || "U")[0].toUpperCase()}</span>
              }
            </div>
            {dbUser?.gkfxl_badge && (
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: "#3b82f6", borderRadius: "50%", border: "2px solid #000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n="check" size={11} color="#fff" />
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 800, color: "#fff", margin: 0 }}>{u?.name || "User"}</p>
              {isAdmin && <span style={{ fontSize: 10, fontWeight: 700, background: "#f59e0b", color: "#fff", padding: "2px 7px", borderRadius: 5 }}>Admin</span>}
              {dbUser?.gkfxl_badge && <span style={{ fontSize: 10, fontWeight: 700, background: "#3b82f6", color: "#fff", padding: "2px 7px", borderRadius: 5 }}>GKFXL</span>}
            </div>
            <p style={{ fontSize: 13, color: C.gray400, margin: "0 0 6px" }}>@{u?.username || u?.email?.split("@")[0] || "user"}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {u?.role && <span style={{ fontSize: 11, fontWeight: 600, background: C.white + "18", color: C.gray400, padding: "3px 9px", borderRadius: 6 }}>{u.role}</span>}
              {u?.district && <span style={{ fontSize: 11, fontWeight: 600, background: C.white + "18", color: C.gray400, padding: "3px 9px", borderRadius: 6 }}>{u.district}</span>}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, borderTop: `1px solid ${C.gray600}30`, marginTop: 4 }}>
          {[
            { n: score,     l: "GGE Score" },
            { n: points,    l: "Points"    },
            { n: posts.length, l: "Posts"  },
            { n: level,     l: "Level"     },
          ].map((s, i) => (
            <div key={i} style={{ padding: "12px 4px", textAlign: "center" }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 800, color: i === 3 ? levelColor : "#fff", margin: "0 0 2px" }}>{s.n}</p>
              <p style={{ fontSize: 9, color: C.gray400, margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit button */}
      <div style={{ padding: "12px 16px 0" }}>
        <button
          onClick={() => setEditMode(!editMode)}
          style={{ width: "100%", padding: "11px", background: editMode ? C.gray100 : C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 12, fontSize: 13, fontWeight: 700, color: C.black, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}
        >
          {editMode ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Edit form */}
      {editMode && (
        <div style={{ margin: "12px 16px 0", background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}` }}>
          {[
            { l: "Full Name",  k: "name",     ph: "Your name" },
            { l: "Username",   k: "username", ph: "your_username" },
            { l: "Mobile",     k: "mobile",   ph: "10-digit number" },
            { l: "State",      k: "state",    ph: "e.g. Tamil Nadu" },
            { l: "District",   k: "district", ph: "e.g. Coimbatore" },
          ].map(f => (
            <div key={f.k} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.gray600, display: "block", marginBottom: 5 }}>{f.l}</label>
              <input
                value={editForm[f.k] || ""}
                onChange={e => setEditForm(ef => ({ ...ef, [f.k]: e.target.value }))}
                placeholder={f.ph}
                style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", boxSizing: "border-box", color: C.black }}
              />
            </div>
          ))}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.gray600, display: "block", marginBottom: 5 }}>Role</label>
            <select value={editForm.role || ""} onChange={e => setEditForm(ef => ({ ...ef, role: e.target.value }))} style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", background: C.white, color: C.black }}>
              {["Student","Farmer","Job Seeker","Business Owner","Parent","Other"].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          {saveMsg && <p style={{ fontSize: 12, color: saveMsg.startsWith("Error") ? C.red : C.green, marginBottom: 10 }}>{saveMsg}</p>}
          <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "12px", background: saving ? C.gray200 : C.black, color: saving ? C.gray400 : "#fff", border: "none", borderRadius: 11, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {saving ? <><Spinner size={16} color={C.gray400} />Saving...</> : "Save Changes"}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.gray100}`, margin: "12px 0 0" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "11px 4px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.black : C.gray400, borderBottom: tab === t.id ? `2px solid ${C.black}` : "2px solid transparent", fontFamily: "Nunito, sans-serif" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* ── Profile Tab ── */}
        {tab === "profile" && (
          loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}><Spinner size={28} color={C.green} /></div>
          ) : (
            <div>
              {/* Info card */}
              <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, overflow: "hidden", marginBottom: 14 }}>
                {[
                  { l: "Email",    v: u?.email    },
                  { l: "Mobile",   v: u?.mobile   || "Not added" },
                  { l: "State",    v: u?.state    || "Not set" },
                  { l: "District", v: u?.district || "Not set" },
                  { l: "Role",     v: u?.role     || "Member" },
                  { l: "Member since", v: dbUser?.created_at ? new Date(dbUser.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: i < 5 ? `1px solid ${C.gray50}` : "none" }}>
                    <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>{r.l}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0, maxWidth: "55%", textAlign: "right", wordBreak: "break-all" }}>{r.v}</p>
                  </div>
                ))}
              </div>

              {/* GGE Score card */}
              <div style={{ background: C.black, borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>GGE Score</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: levelColor, background: levelColor + "20", padding: "3px 10px", borderRadius: 6 }}>{level}</span>
                </div>
                <div style={{ height: 6, background: C.gray600 + "40", borderRadius: 3, marginBottom: 8 }}>
                  <div style={{ height: "100%", width: `${Math.min((score / 1000) * 100, 100)}%`, background: C.green, borderRadius: 3, transition: "width 0.8s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>{score} / 1000</p>
                  <p style={{ fontSize: 12, color: C.green, margin: 0 }}>{1000 - score} to next level</p>
                </div>
              </div>

              {/* Points card */}
              <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, background: C.black, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon n="star" size={20} color="#f59e0b" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 3px" }}>GGE Points</p>
                  <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>Earn points by completing challenges and lessons</p>
                </div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: 0 }}>{points}</p>
              </div>

              {/* GKFXL status */}
              <div style={{ background: dbUser?.gkfxl_badge ? C.greenBg : C.gray50, borderRadius: 14, border: `1px solid ${dbUser?.gkfxl_badge ? C.green + "30" : C.gray100}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, background: dbUser?.gkfxl_badge ? C.green : C.gray200, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon n="shield" size={18} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: "0 0 2px" }}>GKFXL Membership</p>
                  <p style={{ fontSize: 12, color: dbUser?.gkfxl_badge ? C.green : C.gray400, margin: 0 }}>
                    {dbUser?.gkfxl_badge ? "Active member — verified badge earned" : "Not a member yet — apply in Community"}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {/* ── Posts Tab ── */}
        {tab === "posts" && (
          <div>
            {posts.length === 0 ? (
              <div style={{ background: C.white, borderRadius: 14, padding: "40px 20px", border: `1px solid ${C.gray100}`, textAlign: "center" }}>
                <Icon n="message" size={32} color={C.gray200} />
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, margin: "14px 0 6px" }}>No posts yet</p>
                <p style={{ fontSize: 13, color: C.gray400, margin: 0 }}>Share something in the Community tab</p>
              </div>
            ) : (
              posts.map((post, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, marginBottom: 10 }}>
                  <p style={{ fontSize: 14, color: C.black, lineHeight: 1.65, margin: "0 0 10px" }}>{post.text}</p>
                  <div style={{ display: "flex", gap: 14 }}>
                    <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{post.likes} likes</p>
                    <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{post.comments?.length || 0} comments</p>
                    <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>{new Date(post.ts).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Badges Tab ── */}
        {tab === "badges" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { icon: "shield", label: "GGE Member",       earned: true,               color: C.green  },
                { icon: "shield", label: "GKFXL Verified",   earned: !!dbUser?.gkfxl_badge, color: "#3b82f6" },
                { icon: "star",   label: "Admin",             earned: isAdmin,            color: "#f59e0b" },
                { icon: "book",   label: "First Lesson",      earned: false,              color: C.gray400 },
                { icon: "award",  label: "Challenge Winner",  earned: false,              color: C.gray400 },
                { icon: "leaf",   label: "Harvest Hero",      earned: false,              color: C.gray400 },
                { icon: "users",  label: "Community Builder", earned: false,              color: C.gray400 },
                { icon: "target", label: "Purpose Found",     earned: false,              color: C.gray400 },
              ].map((b, i) => (
                <div key={i} style={{ background: b.earned ? C.white : C.gray50, borderRadius: 14, padding: "16px 12px", border: `1.5px solid ${b.earned ? b.color + "40" : C.gray100}`, textAlign: "center", opacity: b.earned ? 1 : 0.5 }}>
                  <div style={{ width: 44, height: 44, background: b.earned ? b.color : C.gray200, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                    <Icon n={b.icon} size={20} color="#fff" />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: b.earned ? C.black : C.gray400, margin: "0 0 3px", lineHeight: 1.3 }}>{b.label}</p>
                  <p style={{ fontSize: 10, color: b.earned ? b.color : C.gray400, margin: 0 }}>{b.earned ? "Earned" : "Locked"}</p>
                </div>
              ))}
            </div>
            <div style={{ background: C.greenBg, borderRadius: 12, padding: "12px 14px", border: `1px solid ${C.green}30` }}>
              <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>Complete lessons, challenges and community activities to unlock more badges.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ── Main App Shell ────────────────────────────────────────────────────────────
const MainApp = ({ user, onLogout }) => {
  const [page, setPage] = useState("home");
  const [subPage, setSubPage] = useState(null);

  if (subPage) {
    return (
      <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
        <FeatureSubPage featureId={subPage} onBack={() => setSubPage(null)} user={user} />
        {subPage !== "constitution" && <BottomNav page={page} setPage={(p) => { setSubPage(null); setPage(p); }} />}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      {page === "home"      && <HomePage      user={user} setPage={setPage} />}
      {page === "guide"     && <GuidePage     setSubPage={setSubPage} />}
      {page === "community" && <CommunityPage user={user} setPage={setPage} />}
      {page === "explore"   && <ExplorePage   user={user} />}
      {page === "ai"        && <AIPage        user={user} />}
      {page === "profile"   && <ProfilePage   user={user} onLogout={onLogout} />}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
};

// ── Splash Page ───────────────────────────────────────────────────────────────
const SplashPage = ({ onDone }) => {
  const [phase, setPhase] = useState(0);
  // phase 0 → logo fade in
  // phase 1 → tagline appears
  // phase 2 → bar fills
  // phase 3 → fade out → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onDone(),    2700);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, background: C.black,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 9999, maxWidth: 480, margin: "0 auto",
      opacity: phase === 3 ? 0 : 1,
      transition: phase === 3 ? "opacity 0.5s ease" : "none",
    }}>

      {/* Logo */}
      <div style={{
        width: 80, height: 80, background: C.green, borderRadius: 22,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24,
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 0 ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: -1 }}>G</span>
      </div>

      {/* App name */}
      <p style={{
        fontFamily: "Poppins, sans-serif", fontSize: 28, fontWeight: 800,
        color: "#fff", margin: "0 0 6px", letterSpacing: -1,
        opacity: phase >= 0 ? 1 : 0,
        transition: "opacity 0.5s ease 0.2s",
      }}>
        Guide. Grow. Earn.
      </p>

      {/* Tagline */}
      <p style={{
        fontSize: 13, color: C.gray400, margin: "0 0 40px",
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        by GKFXL — Gokul Official
      </p>

      {/* Progress bar */}
      <div style={{ width: 160, height: 3, background: C.gray600 + "60", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", background: C.green, borderRadius: 2,
          width: phase >= 2 ? "100%" : "0%",
          transition: phase >= 2 ? "width 1.2s ease" : "none",
        }} />
      </div>

      {/* Mission */}
      <p style={{
        fontSize: 11, color: C.gray600, margin: "20px 32px 0",
        textAlign: "center", lineHeight: 1.6,
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 0.4s ease 0.2s",
      }}>
        Every Indian deserves guidance, growth and earning opportunity
      </p>

      {/* Free tag */}
      <div style={{
        position: "absolute", bottom: 48,
        background: C.green + "18", border: `1px solid ${C.green}40`,
        borderRadius: 20, padding: "6px 18px",
        opacity: phase >= 2 ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.green, margin: 0 }}>100% Free Forever</p>
      </div>

    </div>
  );
};

// ── Register Page ─────────────────────────────────────────────────────────────
const RegisterPage = ({ googleUser, onComplete }) => {
  const [form, setForm] = useState({
    name:     googleUser?.name  || "",
    username: "",
    mobile:   "",
    email:    googleUser?.email || "",
    state:    "",
    district: "",
    role:     "",
    terms:    false,
  });
  const [usernameStatus, setUsernameStatus] = useState("idle"); // idle | checking | available | taken
  const [gpsLoading,  setGpsLoading]  = useState(false);
  const [gpsError,    setGpsError]    = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState("");
  const usernameTimer = useRef(null);

  // Auto-generate username from name on mount
  useEffect(() => {
    if (form.name) {
      const auto = form.name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").slice(0, 20);
      setForm(f => ({ ...f, username: auto }));
    }
  }, []);

  // Auto-detect GPS location
  const detectLocation = () => {
    setGpsLoading(true);
    setGpsError("");
    if (!navigator.geolocation) {
      setGpsError("GPS not supported. Enter manually.");
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const data = await res.json();
          const addr = data.address || {};
          const state    = addr.state    || addr.region || "";
          const district = addr.county   || addr.city   || addr.town || addr.village || "";
          setForm(f => ({ ...f, state, district }));
        } catch {
          setGpsError("Could not detect location. Enter manually.");
        } finally {
          setGpsLoading(false);
        }
      },
      () => {
        setGpsError("GPS permission denied. Enter manually.");
        setGpsLoading(false);
      },
      { timeout: 8000 }
    );
  };

  // Real-time username check
  const handleUsernameChange = (val) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    setForm(f => ({ ...f, username: clean }));
    if (!clean || clean.length < 3) { setUsernameStatus("idle"); return; }
    setUsernameStatus("checking");
    clearTimeout(usernameTimer.current);
    usernameTimer.current = setTimeout(async () => {
      try {
        const { data } = await supabase.from("users").select("id").eq("username", clean).maybeSingle();
        setUsernameStatus(data ? "taken" : "available");
      } catch {
        setUsernameStatus("idle");
      }
    }, 600);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.username || !form.email || !form.state || !form.district || !form.role) {
      setError("Please fill all required fields."); return;
    }
    if (form.username.length < 3) { setError("Username must be at least 3 characters."); return; }
    if (usernameStatus === "taken") { setError("Username already taken. Choose another."); return; }
    if (form.mobile && !/^[6-9]\d{9}$/.test(form.mobile)) { setError("Enter a valid 10-digit Indian mobile number."); return; }
    if (!form.terms) { setError("Please accept the terms to continue."); return; }
    setError(""); setSubmitting(true);
    try {
      const { error: dbErr } = await supabase.from("users").upsert([{
        id:               googleUser.id,
        google_id:        googleUser.id,
        name:             form.name,
        email:            form.email,
        username:         form.username,
        mobile:           form.mobile || null,
        state:            form.state,
        district:         form.district,
        role:             form.role,
        is_admin:         form.email === "gokulmaniraj2008@gmail.com",
        gkfxl_badge:      false,
        gge_score:        0,
        points:           0,
        last_seen:        new Date().toISOString(),
        created_at:       new Date().toISOString(),
      }], { onConflict: "id" });
      if (dbErr) throw new Error(dbErr.message);
      onComplete({ ...googleUser, username: form.username, state: form.state, district: form.district, role: form.role, mobile: form.mobile });
    } catch (e) {
      setError("Registration failed: " + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inp = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 14, fontFamily: "Nunito, sans-serif", outline: "none", boxSizing: "border-box", color: C.black, background: C.white };
  const lbl = { fontSize: 12, fontWeight: 700, color: C.gray600, marginBottom: 6, display: "block" };
  const roles = ["Student", "Farmer", "Job Seeker", "Business Owner", "Parent", "Other"];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
      {/* Top */}
      <div style={{ background: C.black, padding: "32px 24px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, background: C.green, borderRadius: 14, marginBottom: 14 }}>
          <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 20 }}>G</span>
        </div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Complete Your Profile</p>
        <p style={{ fontSize: 12, color: C.gray400, margin: 0 }}>One time setup — takes 2 minutes</p>
      </div>

      {/* Google info strip */}
      <div style={{ background: C.greenBg, padding: "12px 20px", borderBottom: `1px solid ${C.green}20`, display: "flex", alignItems: "center", gap: 10 }}>
        {googleUser?.photo
          ? <img src={googleUser.photo} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} alt="profile" />
          : <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>{(googleUser?.name || "U")[0]}</span></div>
        }
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{googleUser?.name}</p>
          <p style={{ fontSize: 11, color: C.green, margin: 0 }}>Google account connected</p>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* Section: Basic */}
        <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Basic Details</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 18 }}>

          {/* Full name */}
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Full Name *</label>
            <input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
          </div>

          {/* Username */}
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Username * <span style={{ color: C.gray400, fontWeight: 400 }}>(auto-generated, can edit)</span></label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.gray400 }}>@</span>
              <input
                style={{ ...inp, paddingLeft: 26, borderColor: usernameStatus === "available" ? C.green : usernameStatus === "taken" ? C.red : C.gray200 }}
                value={form.username}
                onChange={e => handleUsernameChange(e.target.value)}
                placeholder="your_username"
              />
            </div>
            {usernameStatus === "checking"  && <p style={{ fontSize: 11, color: C.gray400, margin: "5px 0 0" }}>Checking availability...</p>}
            {usernameStatus === "available" && <p style={{ fontSize: 11, color: C.green,   margin: "5px 0 0" }}>Username available</p>}
            {usernameStatus === "taken"     && <p style={{ fontSize: 11, color: C.red,     margin: "5px 0 0" }}>Username taken — try another</p>}
          </div>

          {/* Mobile */}
          <div style={{ marginBottom: 0 }}>
            <label style={lbl}>Mobile Number <span style={{ color: C.gray400, fontWeight: 400 }}>(optional)</span></label>
            <input style={inp} value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} placeholder="10-digit Indian number" maxLength={10} inputMode="numeric" />
          </div>
        </div>

        {/* Section: Location */}
        <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Location</p>
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, marginBottom: 18 }}>
          <button
            onClick={detectLocation}
            disabled={gpsLoading}
            style={{ width: "100%", padding: "11px", background: gpsLoading ? C.gray100 : C.black, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: gpsLoading ? C.gray400 : "#fff", cursor: gpsLoading ? "not-allowed" : "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}
          >
            {gpsLoading ? <><Spinner size={15} color={C.gray400} /> Detecting location...</> : <><Icon n="map" size={15} color="#fff" /> Auto-detect my location</>}
          </button>
          {gpsError && <p style={{ fontSize: 12, color: C.red, margin: "0 0 10px" }}>{gpsError}</p>}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>State *</label>
            <input style={inp} value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} placeholder="e.g. Tamil Nadu" />
          </div>
          <div>
            <label style={lbl}>District *</label>
            <input style={inp} value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} placeholder="e.g. Coimbatore" />
          </div>
        </div>

        {/* Section: Role */}
        <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Who Are You? *</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
          {roles.map(r => (
            <div
              key={r}
              onClick={() => setForm(f => ({ ...f, role: r }))}
              style={{ background: form.role === r ? C.black : C.white, borderRadius: 12, padding: "12px 14px", border: `1.5px solid ${form.role === r ? C.black : C.gray100}`, cursor: "pointer", textAlign: "center" }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: form.role === r ? "#fff" : C.black, margin: 0 }}>{r}</p>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div onClick={() => setForm(f => ({ ...f, terms: !f.terms }))} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18, cursor: "pointer" }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${form.terms ? C.green : C.gray200}`, background: form.terms ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            {form.terms && <Icon n="check" size={13} color="#fff" />}
          </div>
          <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.55, margin: 0 }}>
            I agree to GGE Terms of Service and Privacy Policy. My data will never be sold.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: C.redBg, borderRadius: 10, padding: "11px 14px", marginBottom: 16, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Icon n="info" size={15} color={C.red} />
            <p style={{ fontSize: 13, color: C.red, margin: 0, lineHeight: 1.5 }}>{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{ width: "100%", padding: "15px", background: submitting ? C.gray200 : C.black, color: submitting ? C.gray400 : "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          {submitting ? <><Spinner size={18} color={C.gray400} /> Saving...</> : "Complete Registration"}
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: C.gray400, marginTop: 10 }}>Free forever — no credit card needed</p>
      </div>
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState("splash");
  const [user,   setUser]   = useState(null);
  const [googleUser, setGoogleUser] = useState(null);

  const resolveUser = async (session) => {
    if (!session?.user) return;
    const su = session.user;
    const base = {
      id:    su.id,
      name:  su.user_metadata?.full_name || su.email?.split("@")[0] || "User",
      email: su.email || "",
      photo: su.user_metadata?.avatar_url || null,
    };
    // Check if user already registered in Supabase
    const { data: existing } = await supabase.from("users").select("id, username, state, district, role").eq("id", su.id).maybeSingle();
    if (existing?.username && existing?.state && existing?.role) {
      // Returning user — go straight to app
      setUser({ ...base, ...existing });
      setScreen("app");
    } else {
      // New user — show register page
      setGoogleUser(base);
      setScreen("register");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => resolveUser(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        resolveUser(session);
      } else {
        setUser(null);
        setGoogleUser(null);
        setScreen("intro");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setGoogleUser(null);
    setScreen("intro");
  };

  const handleRegisterComplete = (fullUser) => {
    setUser(fullUser);
    setScreen("app");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { -webkit-tap-highlight-color: transparent; }
        input:focus { outline: none; border-color: ${C.black} !important; }
        select:focus { outline: none; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${C.gray200}; border-radius: 4px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      {screen === "splash"   && <SplashPage   onDone={() => setScreen("intro")} />}
      {screen === "intro"    && <IntroPage    onGetStarted={() => setScreen("login")} />}
      {screen === "login"    && <LoginPage    onBack={() => setScreen("intro")} />}
      {screen === "register" && <RegisterPage googleUser={googleUser} onComplete={handleRegisterComplete} />}
      {screen === "app"      && <MainApp      user={user} onLogout={handleLogout} />}
    </>
  );
}

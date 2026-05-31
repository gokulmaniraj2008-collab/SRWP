"use client";
import { useState } from "react";

// ── Colors ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#f8f8f6", white: "#ffffff", black: "#0c0c0c",
  gray50: "#f4f4f2", gray100: "#ebebea", gray200: "#d8d8d5",
  gray400: "#9a9a94", gray600: "#5c5c56",
  green: "#1a6b3c", greenBg: "#e6f4ec",
};

// ── Shared Icon Component ─────────────────────────────────────────────────────
const Icon = ({ n, size = 20, color = "currentColor" }) => {
  const p = {
    home:      <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z"/></>,
    guide:     <><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    community: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    ai:        <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    chevron:   <polyline points="9 18 15 12 9 6"/>,
    back:      <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    zap:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    book:      <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    users:     <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    shield:    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    award:     <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>,
    target:    <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    leaf:      <path d="M17 8C8 10 5.9 16.17 3.82 19.25c1.41.46 2.98.25 4.18-.5 0 0 .82-5.25 9-7.25 0 0-3 5-11 5 1 2 4 4 10 2 5-2 7-8 7-14z"/>,
    rupee:     <><path d="M6 3h12M6 8h12M6 21l7-13 7 13M10 13h8"/></>,
    trending:  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    map:       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    phone:     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>,
    heart:     <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    crop:      <><path d="M2 22L22 2"/><path d="M7 2v5a5 5 0 005 5h5"/><path d="M17 22v-5a5 5 0 00-5-5H7"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {p[n]}
    </svg>
  );
};

// ── Bottom Nav ────────────────────────────────────────────────────────────────
const BottomNav = ({ page, setPage }) => {
  const tabs = [
    { id: "home",      icon: "home",      label: "Home"      },
    { id: "guide",     icon: "guide",     label: "Guide"     },
    { id: "community", icon: "community", label: "Community" },
    { id: "ai",        icon: "ai",        label: "AI"        },
    { id: "settings",  icon: "settings",  label: "Settings"  },
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
    { n: "10",  l: "Core Features" },
    { n: "12",  l: "Learning Paths" },
    { n: "₹0",  l: "Cost Forever"  },
    { n: "All", l: "India"         },
  ];

  // FIX: Each icon now has its own unique correct SVG path
  const introIcons = {
    guide: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    grow: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    earn: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12M6 8h12M6 21l7-13 7 13M10 13h8"/>
      </svg>
    ),
    connect: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ background: C.black, padding: "48px 28px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: C.green, borderRadius: 18, marginBottom: 18 }}>
          <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: -1 }}>G</span>
        </div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: -1, lineHeight: 1.1 }}>
          Guide. Grow. Earn.
        </h1>
        <p style={{ color: C.gray400, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
          by GKFXL — Gokul Official
        </p>
      </div>

      {/* Mission Banner */}
      <div style={{ background: C.greenBg, borderBottom: `1px solid ${C.green}20`, padding: "16px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: C.green, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
          Every Indian deserves guidance, growth and earning opportunity — regardless of money, location or background.
        </p>
      </div>

      <div style={{ padding: "24px 20px 40px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "12px 6px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: "0 0 2px" }}>{s.n}</p>
              <p style={{ fontSize: 10, color: C.gray400, margin: 0, lineHeight: 1.3 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Feature Cards — FIX: unique icons */}
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: C.black, marginBottom: 14 }}>
          What is GGE?
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 40, height: 40, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                {introIcons[f.icon]}
              </div>
              <div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 3px" }}>{f.title}</p>
                <p style={{ fontSize: 12, color: C.gray600, margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Who is this for */}
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: C.black, marginBottom: 12 }}>
          Built for Every Indian
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
          {["Students", "Farmers", "Job Seekers", "Parents", "Business Owners", "Anyone"].map((r, i) => (
            <div key={i} style={{ background: C.gray50, borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0 }}>{r}</p>
            </div>
          ))}
        </div>

        {/* Free forever */}
        <div style={{ background: C.black, borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 3px" }}>100% Free Forever</p>
            <p style={{ fontSize: 12, color: C.gray400, margin: 0, lineHeight: 1.5 }}>No subscription. No hidden fees. No credit card. Ever.</p>
          </div>
          <div style={{ background: C.green, borderRadius: 10, padding: "6px 12px", flexShrink: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>₹0</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onGetStarted}
          style={{ width: "100%", padding: "15px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          Get Started
          <Icon n="chevron" size={18} color="#fff" />
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: C.gray400, marginTop: 12 }}>
          Free to join — no credit card needed
        </p>

      </div>
    </div>
  );
};

// ── Login Page ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, onBack }) => {
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
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: -0.5 }}>
          Welcome to GGE
        </h1>
        <p style={{ color: C.gray400, fontSize: 13, margin: 0 }}>
          Guide. Grow. Earn. — by GKFXL
        </p>
      </div>

      <div style={{ flex: 1, padding: "28px 24px 40px" }}>

        <div style={{ background: C.white, borderRadius: 16, padding: "18px 18px 10px", border: `1px solid ${C.gray100}`, marginBottom: 24 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>
            What you get — free
          </p>
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

        <button
          onClick={onLogin}
          style={{ width: "100%", padding: "15px 20px", background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ background: C.gray50, borderRadius: 12, padding: "12px 14px", border: `1px solid ${C.gray100}`, marginBottom: 24 }}>
          <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.6, margin: 0, textAlign: "center" }}>
            By continuing, you agree to GGE Terms of Service and Privacy Policy. Your data is never sold. Google login only — no passwords stored.
          </p>
        </div>

        {/* FIX: uses onBack prop instead of window.location.reload() */}
        <button
          onClick={onBack}
          style={{ width: "100%", padding: "12px", background: "none", border: `1px solid ${C.gray200}`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.gray600, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
        >
          Back to Intro
        </button>

      </div>

      <div style={{ padding: "12px 24px 28px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>
          GGE by GKFXL — Gokul Official · Free forever
        </p>
      </div>

    </div>
  );
};

// ── Guide Page ────────────────────────────────────────────────────────────────
const GuidePage = ({ user, setSubPage }) => {
  const features = [
    { id: "harvest",    icon: "leaf",      title: "Direct Harvest",     tag: "Farmers",    desc: "Sell crops directly — no middlemen, 98% price to you",         color: "#e8f5e9" },
    { id: "learning",   icon: "book",      title: "Learn & Grow",       tag: "All",        desc: "12 learning paths with certificates — free forever",            color: "#e3f2fd" },
    { id: "govbridge",  icon: "shield",    title: "Government Bridge",  tag: "All",        desc: "AI finds the perfect scheme for you, step by step",             color: "#fff3e0" },
    { id: "mentor",     icon: "users",     title: "Mentor Match",       tag: "All",        desc: "Connect with a mentor in your district, same language",         color: "#fce4ec" },
    { id: "skillbazar", icon: "rupee",     title: "Skill Bazaar",       tag: "Earn",       desc: "List your skill, set your price, earn directly",                color: "#f3e5f5" },
    { id: "challenge",  icon: "target",    title: "Challenge & Win",    tag: "All",        desc: "Daily challenges — earn GGE points and real rewards",           color: "#e0f2f1" },
    { id: "village",    icon: "map",       title: "Village Connect",    tag: "Rural",      desc: "One phone helps 10 families — become a community rep",          color: "#fff8e1" },
    { id: "family",     icon: "heart",     title: "Family Dashboard",   tag: "Parents",    desc: "Parents see real growth — skills, badges, achievements",        color: "#fbe9e7" },
    { id: "purpose",    icon: "star",      title: "Purpose Finder",     tag: "All",        desc: "10 questions — AI finds your perfect life path",                color: "#e8eaf6" },
    { id: "reels",      icon: "zap",       title: "Life Reels",         tag: "All",        desc: "Short 2-min guidance videos — agriculture, career, health",     color: "#e0f7fa" },
  ];

  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>

      {/* Top Bar */}
      <div style={{ background: C.black, padding: "16px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>GGE Features</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>Guide Hub</p>
        </div>
        <div style={{ background: C.green, borderRadius: 8, padding: "4px 10px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>10 Features</p>
        </div>
      </div>

      {/* Mission strip */}
      <div style={{ background: C.greenBg, padding: "10px 20px", borderBottom: `1px solid ${C.green}20` }}>
        <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, textAlign: "center" }}>
          All tools free forever — pick what you need today
        </p>
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
          <button
            onClick={() => setSubPage("ai")}
            style={{ background: C.green, border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Poppins, sans-serif", whiteSpace: "nowrap" }}
          >
            Open AI
          </button>
        </div>

        {/* Section heading */}
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 14 }}>
          All 10 Core Features
        </p>

        {/* Feature Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setSubPage(f.id)}
              style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 14, textAlign: "left", cursor: "pointer", width: "100%" }}
            >
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

        {/* Free forever footer */}
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

// ── Feature Sub-Page (stub for each feature) ──────────────────────────────────
const FeatureSubPage = ({ featureId, onBack }) => {
  const details = {
    harvest:    { title: "Direct Harvest",    icon: "leaf",   tag: "Farmers", desc: "Sell your crops directly to buyers — no middlemen, no commission cuts. You keep 98% of the price. AI suggests fair market price based on your district.", coming: "Crop listing, buyer matching, price AI" },
    learning:   { title: "Learn & Grow",      icon: "book",   tag: "All",     desc: "12 learning paths covering farming, money, legal rights, career, health and more. Complete lessons, take exams, earn certificates — all free.", coming: "12 paths, lessons, exams, certificates" },
    govbridge:  { title: "Government Bridge", icon: "shield", tag: "All",     desc: "AI asks you 4 simple questions and finds the exact government scheme you qualify for. Step-by-step apply guide in Tamil and English.", coming: "Scheme finder, apply guide, documents" },
    mentor:     { title: "Mentor Match",      icon: "users",  tag: "All",     desc: "AI matches you with a mentor from your own district who speaks your language. Chat, call, get real guidance from someone who understands your situation.", coming: "Mentor profiles, chat, voice calls" },
    skillbazar: { title: "Skill Bazaar",      icon: "rupee",  tag: "Earn",    desc: "List any skill you have — tailoring, cooking, driving, coding, teaching. Set your own price. Buyers contact you directly. GKFXL takes only 2%.", coming: "Skill listing, buyer connect, reviews" },
    challenge:  { title: "Challenge & Win",   icon: "target", tag: "All",     desc: "Daily real-life challenges — save money, learn something, help someone. Complete them to earn GGE points. Top 10 on leaderboard win real rewards.", coming: "Daily challenges, leaderboard, rewards" },
    village:    { title: "Village Connect",   icon: "map",    tag: "Rural",   desc: "One person with a phone can help 10 families. Become a community rep for your village. AI guides your activities and connects you to resources.", coming: "Rep system, family connect, local feed" },
    family:     { title: "Family Dashboard",  icon: "heart",  tag: "Parents", desc: "Parents can see their child's real progress — skills learned, challenges completed, badges earned, GGE score. Share achievements via WhatsApp.", coming: "Progress view, badges, WhatsApp share" },
    purpose:    { title: "Purpose Finder",    icon: "star",   tag: "All",     desc: "AI asks you 10 deep questions — 4 click options each. Based on your answers, it gives you a personalised life path, recommended skills and mentors.", coming: "10-question flow, life path, skill plan" },
    reels:      { title: "Life Reels",        icon: "zap",    tag: "All",     desc: "Short 2-minute guidance videos on agriculture, money, career, mental health and life. AI personalises content based on your district and interests.", coming: "Video feed, like, save, AI personalise" },
  };

  const d = details[featureId] || { title: "Feature", icon: "star", tag: "All", desc: "Coming soon.", coming: "In development" };

  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>

      {/* Top Bar */}
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

        {/* Icon + description */}
        <div style={{ background: C.white, borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.gray100}`, marginBottom: 16, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: C.black, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon n={d.icon} size={28} color="#fff" />
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.black, margin: "0 0 12px" }}>{d.title}</p>
          <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
        </div>

        {/* Coming soon card */}
        <div style={{ background: C.greenBg, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.green}30`, marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>Building Now</p>
          <p style={{ fontSize: 13, color: C.black, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{d.coming}</p>
        </div>

        {/* Free note */}
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


// ── Home Page ─────────────────────────────────────────────────────────────────
const HomePage = ({ user, setPage }) => {
  const features = [
    { icon: "leaf",   title: "Direct Harvest",    desc: "Sell crops directly — no middlemen, 98% price to farmer", tag: "Farmers" },
    { icon: "book",   title: "Learn & Grow",       desc: "12 learning paths with certificates — free forever",      tag: "All"     },
    { icon: "shield", title: "Government Bridge",  desc: "Find schemes made for you — AI guided, step by step",     tag: "All"     },
    { icon: "users",  title: "Mentor Match",       desc: "Connect with a mentor in your district, same language",   tag: "All"     },
    { icon: "rupee",  title: "Skill Bazaar",       desc: "List your skill, set your price, earn directly",          tag: "Earn"    },
    { icon: "target", title: "Challenge & Win",    desc: "Daily challenges — earn GGE points and real rewards",     tag: "All"     },
    { icon: "zap",    title: "AI Guide",           desc: "AI answers in Tamil, English, Tanglish — 24 hours",       tag: "All"     },
    { icon: "star",   title: "Purpose Finder",     desc: "10 questions — AI finds your perfect life path",          tag: "All"     },
  ];

  const quickStats = [
    { n: "10",  l: "Features" },
    { n: "12",  l: "Courses"  },
    { n: "₹0",  l: "Forever"  },
    { n: "All", l: "India"    },
  ];

  return (
    <div style={{ padding: "0 0 90px", fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh" }}>

      {/* Top Bar */}
      <div style={{ background: C.black, padding: "16px 20px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {/* FIX: uses actual user state, not hardcoded "Gokul" */}
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Poppins, sans-serif" }}>{(user.name || "U")[0].toUpperCase()}</span>
          </div>
          <div>
            <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>Welcome back</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Poppins, sans-serif" }}>{user.name || "User"}</p>
          </div>
        </div>
        <div style={{ background: C.green, borderRadius: 8, padding: "4px 10px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>GGE</p>
        </div>
      </div>

      {/* Mission strip */}
      <div style={{ background: C.greenBg, padding: "10px 20px", borderBottom: `1px solid ${C.green}20` }}>
        <p style={{ fontSize: 12, color: C.green, fontWeight: 600, margin: 0, textAlign: "center" }}>
          Every Indian deserves guidance, growth and earning opportunity — free forever
        </p>
      </div>

      <div style={{ padding: "20px 16px 0" }}>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
          {quickStats.map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "12px 6px", textAlign: "center", border: `1px solid ${C.gray100}` }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 800, color: C.black, margin: "0 0 2px" }}>{s.n}</p>
              <p style={{ fontSize: 10, color: C.gray400, margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Hero card */}
        <div style={{ background: C.black, borderRadius: 18, padding: "20px 18px", marginBottom: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Our Mission</p>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>
            Guide. Grow. Earn.<br />For Every Indian.
          </h2>
          <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6, marginBottom: 16 }}>
            GGE is a free platform by GKFXL that gives every Indian — student, farmer, job seeker or parent — the tools to grow and earn, regardless of background.
          </p>
          <button onClick={() => setPage("guide")} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Poppins, sans-serif" }}>
            Explore Features
            <Icon n="chevron" size={14} color="#fff" />
          </button>
        </div>

        {/* Core Features */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, margin: 0 }}>Core Features</h3>
          <button onClick={() => setPage("guide")} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 600, color: C.green, cursor: "pointer" }}>See all</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {features.map((f, i) => (
            <div key={i} onClick={() => setPage("guide")} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, background: C.black, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon n={f.icon} size={18} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{f.title}</p>
                  <span style={{ fontSize: 9, fontWeight: 700, background: C.greenBg, color: C.green, padding: "2px 7px", borderRadius: 5 }}>{f.tag}</span>
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
            <p style={{ fontSize: 12, color: C.gray400, margin: 0, lineHeight: 1.5 }}>No subscription. No hidden fees. No credit card. Ever.</p>
          </div>
          <div style={{ background: C.green, borderRadius: 10, padding: "8px 12px", flexShrink: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0 }}>₹0</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// ── Main App Shell ────────────────────────────────────────────────────────────
const MainApp = ({ user }) => {
  const [page, setPage] = useState("home");
  const [subPage, setSubPage] = useState(null);

  // If a sub-page is active (feature detail), show it over everything
  if (subPage) {
    return (
      <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
        <FeatureSubPage featureId={subPage} onBack={() => setSubPage(null)} />
        <BottomNav page={page} setPage={(p) => { setSubPage(null); setPage(p); }} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      {page === "home"      && <HomePage user={user} setPage={setPage} />}
      {page === "guide"     && <GuidePage user={user} setSubPage={setSubPage} />}
      {page === "community" && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: C.black }}>Community — coming next</p>
        </div>
      )}
      {page === "ai" && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: C.black }}>AI Guide — coming next</p>
        </div>
      )}
      {page === "settings" && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: C.black }}>Settings — coming next</p>
        </div>
      )}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState("intro");
  // FIX: user is now state, not a hardcoded constant
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Google OAuth will be wired here
    // For now, creates a placeholder user from Google session
    setUser({ name: "User", email: "" });
    setScreen("app");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #d8d8d5; border-radius: 4px; }
      `}</style>
      {screen === "intro" && <IntroPage onGetStarted={() => setScreen("login")} />}
      {screen === "login" && <LoginPage onLogin={handleLogin} onBack={() => setScreen("intro")} />}
      {screen === "app"   && <MainApp user={user} />}
    </>
  );
            }

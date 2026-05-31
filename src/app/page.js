"use client";
import { useState } from "react";

// ── Colors (SRWP palette unchanged) ──────────────────────────────────────────
const C = {
  bg: "#f8f8f6", white: "#ffffff", black: "#0c0c0c",
  gray50: "#f4f4f2", gray100: "#ebebea", gray200: "#d8d8d5",
  gray400: "#9a9a94", gray600: "#5c5c56",
  green: "#1a6b3c", greenBg: "#e6f4ec",
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
    { n: "0",   l: "Cost Forever" },
    { n: "All", l: "India" },
  ];

  const Icon = ({ type }) => {
    const paths = {
      guide:   <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
      grow:    <><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M12 8v4l3 3"/></>,
      earn:    <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2"/><line x1="12" y1="12" x2="12" y2="16"/><circle cx="12" cy="12" r="1"/></>,
      connect: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
      arrow:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    };
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[type]}
      </svg>
    );
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

        {/* Feature Cards */}
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: C.black, marginBottom: 14 }}>
          What is GGE?
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 40, height: 40, background: C.black, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                <Icon type={f.icon} />
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

        {/* Free forever badge */}
        <div style={{ background: C.black, borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 3px" }}>100% Free Forever</p>
            <p style={{ fontSize: 12, color: C.gray400, margin: 0, lineHeight: 1.5 }}>No subscription. No hidden fees. No credit card. Ever.</p>
          </div>
          <div style={{ background: C.green, borderRadius: 10, padding: "6px 12px", flexShrink: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>Rs. 0</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onGetStarted}
          style={{ width: "100%", padding: "15px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: "Poppins, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: C.gray400, marginTop: 12 }}>
          Free to join — no credit card needed
        </p>

      </div>
    </div>
  );
};

// ── Login Page ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
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

      {/* Top */}
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

        {/* What you get */}
        <div style={{ background: C.white, borderRadius: 16, padding: "18px 18px 10px", border: `1px solid ${C.gray100}`, marginBottom: 24 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>
            What you get — free
          </p>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenBg, border: `1.5px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 12 4 10"/>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.5, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>

        {/* Google Sign In */}
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

        {/* Privacy note */}
        <div style={{ background: C.gray50, borderRadius: 12, padding: "12px 14px", border: `1px solid ${C.gray100}`, marginBottom: 24 }}>
          <p style={{ fontSize: 11, color: C.gray400, lineHeight: 1.6, margin: 0, textAlign: "center" }}>
            By continuing, you agree to GGE Terms of Service and Privacy Policy. Your data is never sold. Google login only — no passwords stored.
          </p>
        </div>

        {/* Back */}
        <button
          onClick={() => window.location.reload()}
          style={{ width: "100%", padding: "12px", background: "none", border: `1px solid ${C.gray200}`, borderRadius: 12, fontSize: 13, fontWeight: 600, color: C.gray600, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
        >
          Back to Intro
        </button>

      </div>

      {/* Footer */}
      <div style={{ padding: "12px 24px 28px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: C.gray400, margin: 0 }}>
          GGE by GKFXL — Gokul Official · Free forever
        </p>
      </div>

    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState("intro");

  const handleLogin = () => {
    // Google OAuth will be wired here — for now goes to main app
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
      {screen === "login" && <LoginPage onLogin={handleLogin} />}
      {screen === "app"   && (
        <div style={{ padding: 40, textAlign: "center", fontFamily: "Nunito, sans-serif", color: C.black }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Logged in!</p>
          <p style={{ color: C.gray400, fontSize: 13 }}>Main app coming next...</p>
        </div>
      )}
    </>
  );
}

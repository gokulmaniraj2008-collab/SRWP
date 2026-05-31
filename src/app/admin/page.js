"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ADMIN_EMAIL = "gokulmaniraj2008@gmail.com";

// ── Colors (matches existing GGE design system) ───────────────────────────────
const C = {
  bg: "#f8f8f6", white: "#ffffff", black: "#0c0c0c",
  gray50: "#f4f4f2", gray100: "#ebebea", gray200: "#d8d8d5",
  gray400: "#9a9a94", gray600: "#5c5c56",
  green: "#1a6b3c", greenBg: "#e6f4ec",
  red: "#b91c1c", redBg: "#fef2f2",
  yellow: "#b45309", yellowBg: "#fffbeb",
};

// ── Icons (same as page.js) ───────────────────────────────────────────────────
const Icon = ({ n, size = 20, color = "currentColor" }) => {
  const p = {
    home:      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z"/>,
    users:     <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    shield:    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>,
    chevron:   <polyline points="9 18 15 12 9 6"/>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    info:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    logout:    <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    search:    <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:      <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    zap:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    target:    <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    lock:      <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    unlock:    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></>,
    star:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    ai:        <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></>,
    grow:      <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    back:      <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    refresh:   <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    map:       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
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

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, accent }) => (
  <div style={{ background: C.white, borderRadius: 14, padding: "16px", border: `1px solid ${C.gray100}`, display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ width: 38, height: 38, background: accent ? C.black : C.gray50, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon n={icon} size={17} color={accent ? C.green : C.gray600} />
      </div>
      {sub && <span style={{ fontSize: 11, fontWeight: 700, color: C.green, background: C.greenBg, padding: "2px 8px", borderRadius: 5 }}>{sub}</span>}
    </div>
    <div>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: C.black, margin: 0, lineHeight: 1.1 }}>{value}</p>
      <p style={{ fontSize: 12, color: C.gray400, margin: "3px 0 0", fontFamily: "Nunito, sans-serif" }}>{label}</p>
    </div>
  </div>
);

// ── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = ({ title, count, action, onAction }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: 0 }}>{title}</p>
      {count !== undefined && (
        <span style={{ fontSize: 10, fontWeight: 700, background: C.gray100, color: C.gray600, padding: "2px 8px", borderRadius: 5 }}>{count}</span>
      )}
    </div>
    {action && (
      <button onClick={onAction} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 700, color: C.green, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
        {action}
      </button>
    )}
  </div>
);

// ── Badge ─────────────────────────────────────────────────────────────────────
const Badge = ({ label, type = "default" }) => {
  const styles = {
    default: { bg: C.gray100,   color: C.gray600  },
    green:   { bg: C.greenBg,   color: C.green    },
    red:     { bg: C.redBg,     color: C.red      },
    yellow:  { bg: C.yellowBg,  color: C.yellow   },
    black:   { bg: C.black,     color: "#fff"     },
  };
  const s = styles[type] || styles.default;
  return (
    <span style={{ fontSize: 9, fontWeight: 700, background: s.bg, color: s.color, padding: "2px 8px", borderRadius: 5, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
};

// ── Confirm Modal ─────────────────────────────────────────────────────────────
const ConfirmModal = ({ message, onConfirm, onCancel, danger }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
    <div style={{ background: C.white, borderRadius: 18, padding: "24px 20px", width: "100%", maxWidth: 340, fontFamily: "Nunito, sans-serif" }}>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.black, margin: "0 0 10px" }}>Confirm Action</p>
      <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6, margin: "0 0 20px" }}>{message}</p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onCancel} style={{ flex: 1, padding: "11px", background: C.gray100, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: C.black, cursor: "pointer" }}>Cancel</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: "11px", background: danger ? C.red : C.black, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Confirm</button>
      </div>
    </div>
  </div>
);

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ message, type }) => (
  <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: type === "error" ? C.red : C.black, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 600, fontFamily: "Nunito, sans-serif", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
    {message}
  </div>
);

// ── Dashboard Tab ─────────────────────────────────────────────────────────────
const DashboardTab = ({ stats, loading, onRefresh }) => {
  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
      <Spinner size={32} color={C.green} />
    </div>
  );

  return (
    <div style={{ padding: "20px 16px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: 0 }}>Overview</p>
        <button onClick={onRefresh} style={{ display: "flex", alignItems: "center", gap: 6, background: C.gray100, border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, color: C.gray600, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>
          <Icon n="refresh" size={13} color={C.gray600} /> Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        <StatCard icon="users"  label="Total Users"       value={stats.totalUsers ?? "—"}    accent />
        <StatCard icon="grow"   label="Active Today"      value={stats.activeToday ?? "—"}   sub="Today" />
        <StatCard icon="bell"   label="New This Week"     value={stats.newThisWeek ?? "—"}   sub="Week" />
        <StatCard icon="target" label="Pending Apps"      value={stats.pendingApps ?? "—"}   accent />
        <StatCard icon="ai"     label="AI Queries Today"  value={stats.aiQueries ?? "—"}     />
        <StatCard icon="shield" label="Reports Pending"   value={stats.pendingReports ?? "—"} />
      </div>

      {/* Groq key status */}
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, marginBottom: 12 }}>Groq API Keys</p>
      {[{ label: "Key 1 — Primary", status: "Active" }, { label: "Key 2 — Backup", status: "Standby" }].map((k, i) => (
        <div key={i} style={{ background: C.white, borderRadius: 12, padding: "13px 14px", border: `1px solid ${C.gray100}`, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? C.green : C.gray400 }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0, fontFamily: "Nunito, sans-serif" }}>{k.label}</p>
          </div>
          <Badge label={k.status} type={i === 0 ? "green" : "default"} />
        </div>
      ))}

      {/* Quick links */}
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "20px 0 12px" }}>Quick Actions</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { icon: "users",  label: "Manage Users"    },
          { icon: "shield", label: "Review Apps"     },
          { icon: "zap",    label: "AI Usage"        },
          { icon: "info",   label: "View Reports"    },
        ].map((q, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 12, padding: "14px", border: `1px solid ${C.gray100}`, display: "flex", alignItems: "center", gap: 10, cursor: "default" }}>
            <div style={{ width: 34, height: 34, background: C.black, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon n={q.icon} size={15} color="#fff" />
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.black, margin: 0, fontFamily: "Nunito, sans-serif", lineHeight: 1.3 }}>{q.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Users Tab ─────────────────────────────────────────────────────────────────
const UsersTab = ({ showToast }) => {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [page, setPage]         = useState(0);
  const PAGE_SIZE = 20;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("users")
      .select("id, name, email, username, state, district, role, is_admin, gkfxl_badge, is_blocked, created_at, last_seen", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (search.trim()) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,username.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (!error && data) setUsers(data);
    setLoading(false);
  }, [search, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const blockUser = async (userId, isBlocked) => {
    const { error } = await supabase.from("users").update({ is_blocked: !isBlocked }).eq("id", userId);
    if (error) { showToast("Action failed: " + error.message, "error"); return; }
    showToast(!isBlocked ? "User blocked" : "User unblocked", "success");
    fetchUsers();
    setSelected(null);
  };

  const grantBadge = async (userId, hasBadge) => {
    const { error } = await supabase.from("users").update({ gkfxl_badge: !hasBadge }).eq("id", userId);
    if (error) { showToast("Action failed: " + error.message, "error"); return; }
    showToast(!hasBadge ? "GKFXL badge granted" : "Badge removed", "success");
    fetchUsers();
    setSelected(null);
  };

  const resetAI = async (userId) => {
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("ai_usage").delete().eq("user_id", userId).eq("usage_date", today);
    if (error) { showToast("Reset failed: " + error.message, "error"); return; }
    showToast("AI usage reset for today", "success");
    setSelected(null);
  };

  if (selected) {
    const u = selected;
    return (
      <div style={{ padding: "20px 16px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: C.gray600, cursor: "pointer", marginBottom: 20, fontFamily: "Nunito, sans-serif" }}>
          <Icon n="back" size={16} color={C.gray600} /> Back to Users
        </button>

        {/* Profile */}
        <div style={{ background: C.white, borderRadius: 16, padding: "20px", border: `1px solid ${C.gray100}`, marginBottom: 14, textAlign: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "Poppins, sans-serif" }}>{(u.name || "U")[0].toUpperCase()}</span>
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 800, color: C.black, margin: "0 0 4px" }}>{u.name}</p>
          <p style={{ fontSize: 12, color: C.gray400, margin: "0 0 10px" }}>{u.email}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {u.is_admin    && <Badge label="Admin"   type="black"  />}
            {u.gkfxl_badge && <Badge label="GKFXL"  type="green"  />}
            {u.is_blocked  && <Badge label="Blocked" type="red"    />}
            <Badge label={u.role || "Member"} />
          </div>
        </div>

        {/* Details */}
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, marginBottom: 14, overflow: "hidden" }}>
          {[
            { l: "Username",  v: u.username ? `@${u.username}` : "—" },
            { l: "State",     v: u.state    || "—" },
            { l: "District",  v: u.district || "—" },
            { l: "Joined",    v: u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—" },
            { l: "Last seen", v: u.last_seen  ? new Date(u.last_seen).toLocaleDateString("en-IN",  { day: "numeric", month: "short", year: "numeric" }) : "—" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: i < 4 ? `1px solid ${C.gray50}` : "none" }}>
              <p style={{ fontSize: 13, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>{r.l}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.black, margin: 0, fontFamily: "Nunito, sans-serif" }}>{r.v}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        {!u.is_admin && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => setConfirm({ message: u.gkfxl_badge ? `Remove GKFXL badge from ${u.name}?` : `Grant GKFXL badge to ${u.name}?`, onConfirm: () => { grantBadge(u.id, u.gkfxl_badge); setConfirm(null); } })}
              style={{ width: "100%", padding: "13px", background: u.gkfxl_badge ? C.gray100 : C.black, color: u.gkfxl_badge ? C.black : "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Icon n="star" size={15} color={u.gkfxl_badge ? C.black : "#fff"} />
              {u.gkfxl_badge ? "Remove GKFXL Badge" : "Grant GKFXL Badge"}
            </button>
            <button
              onClick={() => setConfirm({ message: `Reset today's AI usage for ${u.name}?`, onConfirm: () => { resetAI(u.id); setConfirm(null); } })}
              style={{ width: "100%", padding: "13px", background: C.white, color: C.black, border: `1px solid ${C.gray200}`, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Icon n="refresh" size={15} color={C.black} /> Reset AI Usage
            </button>
            <button
              onClick={() => setConfirm({ message: u.is_blocked ? `Unblock ${u.name}?` : `Block ${u.name}? They will not be able to use GGE.`, danger: !u.is_blocked, onConfirm: () => { blockUser(u.id, u.is_blocked); setConfirm(null); } })}
              style={{ width: "100%", padding: "13px", background: u.is_blocked ? C.white : C.redBg, color: u.is_blocked ? C.black : C.red, border: `1px solid ${u.is_blocked ? C.gray200 : C.red + "40"}`, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Icon n={u.is_blocked ? "unlock" : "lock"} size={15} color={u.is_blocked ? C.black : C.red} />
              {u.is_blocked ? "Unblock User" : "Block User"}
            </button>
          </div>
        )}

        {confirm && <ConfirmModal {...confirm} onCancel={() => setConfirm(null)} />}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 16px 40px" }}>
      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 12, padding: "0 14px", gap: 10, marginBottom: 16 }}>
        <Icon n="search" size={16} color={C.gray400} />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          placeholder="Search by name, email, @username..."
          style={{ flex: 1, border: "none", background: "none", fontSize: 14, padding: "12px 0", outline: "none", fontFamily: "Nunito, sans-serif", color: C.black }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Icon n="info" size={14} color={C.gray400} />
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}><Spinner size={28} color={C.green} /></div>
      ) : users.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, padding: "32px 20px", border: `1px solid ${C.gray100}`, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>No users found</p>
        </div>
      ) : (
        <>
          {users.map((u, i) => (
            <div key={u.id || i} onClick={() => setSelected(u)} style={{ background: C.white, borderRadius: 14, padding: "13px 14px", border: `1px solid ${C.gray100}`, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: u.is_blocked ? C.gray200 : C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: u.is_blocked ? C.gray400 : "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Poppins, sans-serif" }}>{(u.name || "U")[0].toUpperCase()}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</p>
                  {u.is_admin    && <Badge label="Admin"  type="black" />}
                  {u.gkfxl_badge && <Badge label="GKFXL" type="green" />}
                  {u.is_blocked  && <Badge label="Blocked" type="red" />}
                </div>
                <p style={{ fontSize: 11, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>{u.district || u.state || "—"} · {u.role || "Member"}</p>
              </div>
              <Icon n="chevron" size={15} color={C.gray400} />
            </div>
          ))}

          {/* Pagination */}
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ padding: "9px 16px", background: page === 0 ? C.gray100 : C.white, border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 12, fontWeight: 700, color: page === 0 ? C.gray400 : C.black, cursor: page === 0 ? "not-allowed" : "pointer", fontFamily: "Nunito, sans-serif" }}>
              Previous
            </button>
            <div style={{ display: "flex", alignItems: "center", padding: "0 12px", background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.gray600, margin: 0, fontFamily: "Nunito, sans-serif" }}>Page {page + 1}</p>
            </div>
            <button disabled={users.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)} style={{ padding: "9px 16px", background: users.length < PAGE_SIZE ? C.gray100 : C.white, border: `1px solid ${C.gray200}`, borderRadius: 10, fontSize: 12, fontWeight: 700, color: users.length < PAGE_SIZE ? C.gray400 : C.black, cursor: users.length < PAGE_SIZE ? "not-allowed" : "pointer", fontFamily: "Nunito, sans-serif" }}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ── Applications Tab ──────────────────────────────────────────────────────────
const ApplicationsTab = ({ showToast }) => {
  const [apps, setApps]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("pending");
  const [selected, setSelected]   = useState(null);
  const [confirm, setConfirm]     = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gkfxl_applications")
      .select("*")
      .eq("status", filter)
      .order("submitted_at", { ascending: false });
    if (!error && data) setApps(data);
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const approveApp = async (app) => {
    const { error: appErr } = await supabase
      .from("gkfxl_applications")
      .update({ status: "approved", reviewed_at: new Date().toISOString() })
      .eq("id", app.id);
    if (appErr) { showToast("Failed: " + appErr.message, "error"); return; }
    // Grant badge to user
    if (app.user_id) {
      await supabase.from("users").update({ gkfxl_badge: true }).eq("id", app.user_id);
      // Add notification
      await supabase.from("notifications").insert([{
        user_id: app.user_id,
        title: "GKFXL Application Approved",
        body: "Congratulations! You are now an official GKFXL member. Your badge has been added.",
        type: "success",
      }]).catch(() => {});
    }
    showToast("Application approved — badge granted", "success");
    setSelected(null);
    fetchApps();
  };

  const rejectApp = async (app) => {
    const { error } = await supabase
      .from("gkfxl_applications")
      .update({ status: "rejected", reviewed_at: new Date().toISOString(), reject_reason: rejectReason || "Not approved at this time." })
      .eq("id", app.id);
    if (error) { showToast("Failed: " + error.message, "error"); return; }
    if (app.user_id) {
      await supabase.from("notifications").insert([{
        user_id: app.user_id,
        title: "GKFXL Application Update",
        body: rejectReason || "Your application was not approved this time. You may reapply after 30 days.",
        type: "info",
      }]).catch(() => {});
    }
    showToast("Application rejected", "success");
    setSelected(null);
    setShowRejectInput(false);
    setRejectReason("");
    fetchApps();
  };

  const filters = ["pending", "approved", "rejected"];

  if (selected) {
    const a = selected;
    const fields = [
      { l: "Full Name",     v: a.full_name     },
      { l: "Date of Birth", v: a.dob           },
      { l: "Gender",        v: a.gender        },
      { l: "Mobile",        v: a.mobile        },
      { l: "Email",         v: a.email         },
      { l: "State",         v: a.state         },
      { l: "District",      v: a.district      },
      { l: "Education",     v: a.education     },
      { l: "Occupation",    v: a.occupation    },
      { l: "Skills",        v: a.skills        },
      { l: "Role Applied",  v: a.role          },
      { l: "Languages",     v: a.languages     },
      { l: "Social Link",   v: a.social_link   },
      { l: "Reference",     v: a.reference     },
      { l: "Submitted",     v: a.submitted_at ? new Date(a.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—" },
    ];

    return (
      <div style={{ padding: "20px 16px 40px" }}>
        <button onClick={() => { setSelected(null); setShowRejectInput(false); setRejectReason(""); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 13, fontWeight: 600, color: C.gray600, cursor: "pointer", marginBottom: 20, fontFamily: "Nunito, sans-serif" }}>
          <Icon n="back" size={16} color={C.gray600} /> Back to Applications
        </button>

        <div style={{ background: C.white, borderRadius: 16, padding: "18px", border: `1px solid ${C.gray100}`, marginBottom: 14, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: "Poppins, sans-serif" }}>{(a.full_name || "A")[0].toUpperCase()}</span>
          </div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 800, color: C.black, margin: "0 0 4px" }}>{a.full_name}</p>
          <p style={{ fontSize: 12, color: C.gray400, margin: "0 0 8px" }}>{a.role}</p>
          <Badge label={a.status} type={a.status === "approved" ? "green" : a.status === "rejected" ? "red" : "yellow"} />
        </div>

        {/* All fields */}
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, marginBottom: 14, overflow: "hidden" }}>
          {fields.filter(f => f.v).map((f, i, arr) => (
            <div key={i} style={{ padding: "11px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.gray50}` : "none" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 3px", fontFamily: "Nunito, sans-serif" }}>{f.l}</p>
              <p style={{ fontSize: 13, color: C.black, margin: 0, fontFamily: "Nunito, sans-serif", lineHeight: 1.5 }}>{f.v}</p>
            </div>
          ))}
        </div>

        {/* Why join */}
        {a.why_join && (
          <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, padding: "14px", marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 8px", fontFamily: "Nunito, sans-serif" }}>Why Join GKFXL</p>
            <p style={{ fontSize: 13, color: C.black, margin: 0, lineHeight: 1.7, fontFamily: "Nunito, sans-serif" }}>{a.why_join}</p>
          </div>
        )}

        {/* Contribution */}
        {a.contribution && (
          <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, padding: "14px", marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: C.gray400, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 8px", fontFamily: "Nunito, sans-serif" }}>Contribution Plan</p>
            <p style={{ fontSize: 13, color: C.black, margin: 0, lineHeight: 1.7, fontFamily: "Nunito, sans-serif" }}>{a.contribution}</p>
          </div>
        )}

        {/* Actions for pending */}
        {a.status === "pending" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => setConfirm({ message: `Approve ${a.full_name}'s application? They will receive the GKFXL badge.`, onConfirm: () => { approveApp(a); setConfirm(null); } })}
              style={{ width: "100%", padding: "14px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Icon n="check" size={16} color="#fff" /> Approve Application
            </button>

            {!showRejectInput ? (
              <button
                onClick={() => setShowRejectInput(true)}
                style={{ width: "100%", padding: "14px", background: C.redBg, color: C.red, border: `1px solid ${C.red}30`, borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <Icon n="info" size={16} color={C.red} /> Reject Application
              </button>
            ) : (
              <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray100}`, padding: "14px" }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.gray600, display: "block", marginBottom: 8, fontFamily: "Nunito, sans-serif" }}>Rejection Reason (optional — sent to applicant)</label>
                <textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Explain why the application was rejected..."
                  style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `1.5px solid ${C.gray200}`, fontSize: 13, fontFamily: "Nunito, sans-serif", outline: "none", minHeight: 80, resize: "none", boxSizing: "border-box", color: C.black }}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => setShowRejectInput(false)} style={{ flex: 1, padding: "11px", background: C.gray100, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: C.black, cursor: "pointer", fontFamily: "Nunito, sans-serif" }}>Cancel</button>
                  <button
                    onClick={() => setConfirm({ message: `Reject ${a.full_name}'s application?`, danger: true, onConfirm: () => { rejectApp(a); setConfirm(null); } })}
                    style={{ flex: 1, padding: "11px", background: C.red, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "Nunito, sans-serif" }}
                  >
                    Confirm Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {confirm && <ConfirmModal {...confirm} onCancel={() => setConfirm(null)} />}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 16px 40px" }}>
      {/* Filter tabs */}
      <div style={{ display: "flex", background: C.white, borderRadius: 12, border: `1px solid ${C.gray100}`, padding: 4, gap: 4, marginBottom: 16 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ flex: 1, padding: "8px 4px", border: "none", background: filter === f ? C.black : "transparent", borderRadius: 9, fontSize: 12, fontWeight: 700, color: filter === f ? "#fff" : C.gray400, cursor: "pointer", fontFamily: "Nunito, sans-serif", textTransform: "capitalize", transition: "all 0.15s" }}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}><Spinner size={28} color={C.green} /></div>
      ) : apps.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, padding: "40px 20px", border: `1px solid ${C.gray100}`, textAlign: "center" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.black, margin: "0 0 6px" }}>No {filter} applications</p>
          <p style={{ fontSize: 13, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>All clear here</p>
        </div>
      ) : (
        apps.map((a, i) => (
          <div key={a.id || i} onClick={() => setSelected(a)} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.gray100}`, marginBottom: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Poppins, sans-serif" }}>{(a.full_name || "A")[0].toUpperCase()}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700, color: C.black, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.full_name}</p>
                <Badge label={a.status} type={a.status === "approved" ? "green" : a.status === "rejected" ? "red" : "yellow"} />
              </div>
              <p style={{ fontSize: 11, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>{a.role} · {a.district}</p>
            </div>
            <Icon n="chevron" size={15} color={C.gray400} />
          </div>
        ))
      )}
    </div>
  );
};

// ── Analytics Tab ─────────────────────────────────────────────────────────────
const AnalyticsTab = ({ showToast }) => {
  const [aiUsage, setAiUsage]         = useState([]);
  const [topDistricts, setTopDistricts] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      // AI usage last 7 days
      const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
      const { data: usage } = await supabase
        .from("ai_usage")
        .select("usage_date, total_mb, slm_mb, rag_mb")
        .gte("usage_date", sevenDaysAgo)
        .order("usage_date", { ascending: true });

      // Aggregate by date
      const byDate = {};
      (usage || []).forEach(r => {
        if (!byDate[r.usage_date]) byDate[r.usage_date] = { total: 0, slm: 0, rag: 0 };
        byDate[r.usage_date].total += r.total_mb || 0;
        byDate[r.usage_date].slm   += r.slm_mb   || 0;
        byDate[r.usage_date].rag   += r.rag_mb   || 0;
      });
      setAiUsage(Object.entries(byDate).map(([date, v]) => ({ date, ...v })));

      // Top districts
      const { data: users } = await supabase
        .from("users")
        .select("district")
        .not("district", "is", null);
      const districtCount = {};
      (users || []).forEach(u => { districtCount[u.district] = (districtCount[u.district] || 0) + 1; });
      const sorted = Object.entries(districtCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
      setTopDistricts(sorted);

      setLoading(false);
    };
    fetch();
  }, []);

  const maxUsage = Math.max(...aiUsage.map(d => d.total), 1);
  const maxDistrict = Math.max(...topDistricts.map(d => d[1]), 1);

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
      <Spinner size={32} color={C.green} />
    </div>
  );

  return (
    <div style={{ padding: "20px 16px 40px" }}>
      {/* AI usage chart */}
      <div style={{ background: C.white, borderRadius: 16, padding: "18px", border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
        <SectionHeader title="AI Usage — Last 7 Days" />
        {aiUsage.length === 0 ? (
          <p style={{ fontSize: 13, color: C.gray400, textAlign: "center", padding: "20px 0", fontFamily: "Nunito, sans-serif", margin: 0 }}>No AI usage data yet</p>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, marginTop: 14 }}>
            {aiUsage.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <p style={{ fontSize: 9, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>{d.total.toFixed(0)}MB</p>
                <div style={{ width: "100%", background: C.black, borderRadius: "4px 4px 0 0", height: `${Math.max((d.total / maxUsage) * 80, 4)}px`, transition: "height 0.4s" }} />
                <p style={{ fontSize: 9, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>{d.date.slice(5)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top districts */}
      <div style={{ background: C.white, borderRadius: 16, padding: "18px", border: `1px solid ${C.gray100}`, marginBottom: 16 }}>
        <SectionHeader title="Top Districts by Users" count={topDistricts.length} />
        {topDistricts.length === 0 ? (
          <p style={{ fontSize: 13, color: C.gray400, textAlign: "center", padding: "20px 0", fontFamily: "Nunito, sans-serif", margin: 0 }}>No location data yet</p>
        ) : (
          topDistricts.map(([district, count], i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.black, margin: 0, fontFamily: "Nunito, sans-serif" }}>{district}</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.green, margin: 0, fontFamily: "Nunito, sans-serif" }}>{count}</p>
              </div>
              <div style={{ height: 6, background: C.gray100, borderRadius: 3 }}>
                <div style={{ height: "100%", background: C.black, borderRadius: 3, width: `${(count / maxDistrict) * 100}%`, transition: "width 0.4s" }} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feature usage placeholder */}
      <div style={{ background: C.white, borderRadius: 16, padding: "18px", border: `1px solid ${C.gray100}` }}>
        <SectionHeader title="Feature Usage" />
        {[
          { label: "AI Guide",          pct: 72 },
          { label: "Government Bridge", pct: 54 },
          { label: "Purpose Finder",    pct: 38 },
          { label: "Legal Rights",      pct: 31 },
          { label: "Community Feed",    pct: 27 },
        ].map((f, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.black, margin: 0, fontFamily: "Nunito, sans-serif" }}>{f.label}</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.gray400, margin: 0, fontFamily: "Nunito, sans-serif" }}>{f.pct}%</p>
            </div>
            <div style={{ height: 6, background: C.gray100, borderRadius: 3 }}>
              <div style={{ height: "100%", background: i === 0 ? C.black : C.gray400, borderRadius: 3, width: `${f.pct}%` }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize: 11, color: C.gray400, margin: "12px 0 0", fontFamily: "Nunito, sans-serif" }}>Feature analytics tracking coming soon — connect usage events to Supabase</p>
      </div>
    </div>
  );
};

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authState, setAuthState] = useState("checking"); // checking | denied | allowed
  const [tab, setTab]             = useState("dashboard");
  const [stats, setStats]         = useState({});
  const [statsLoading, setStatsLoading] = useState(true);
  const [toast, setToast]         = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Auth check ──
  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setAuthState("denied"); return; }
      if (session.user.email !== ADMIN_EMAIL) { setAuthState("denied"); return; }
      setAuthState("allowed");
    };
    check();
  }, []);

  // ── Fetch stats ──
  const fetchStats = useCallback(async () => {
    if (authState !== "allowed") return;
    setStatsLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

    const [
      { count: totalUsers },
      { count: newThisWeek },
      { count: pendingApps },
      { count: pendingReports },
      { data: aiRows },
    ] = await Promise.all([
      supabase.from("users").select("id", { count: "exact", head: true }),
      supabase.from("users").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
      supabase.from("gkfxl_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("reports").select("id", { count: "exact", head: true }).eq("resolved", false).catch(() => ({ count: 0 })),
      supabase.from("ai_usage").select("total_mb").eq("usage_date", today),
    ]);

    const aiQueries = (aiRows || []).reduce((s, r) => s + (r.total_mb || 0), 0);

    setStats({
      totalUsers:     totalUsers  ?? "—",
      newThisWeek:    newThisWeek ?? "—",
      pendingApps:    pendingApps ?? "—",
      pendingReports: pendingReports ?? 0,
      aiQueries:      `${aiQueries.toFixed(0)}MB`,
      activeToday:    "—",
    });
    setStatsLoading(false);
  }, [authState]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  // ── Access denied ──
  if (authState === "checking") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={32} color={C.green} />
    </div>
  );

  if (authState === "denied") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Nunito, sans-serif", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, background: C.redBg, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Icon n="lock" size={28} color={C.red} />
      </div>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 800, color: C.black, margin: "0 0 8px" }}>Access Denied</p>
      <p style={{ fontSize: 14, color: C.gray400, margin: "0 0 24px", lineHeight: 1.6 }}>This panel is restricted to the GGE administrator only. Please sign in with the admin Google account.</p>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.href } })} style={{ padding: "13px 24px", background: C.black, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
        Sign in with Google
      </button>
    </div>
  );

  const tabs = [
    { id: "dashboard",    icon: "home",    label: "Dashboard"    },
    { id: "users",        icon: "users",   label: "Users"        },
    { id: "applications", icon: "shield",  label: "Applications" },
    { id: "analytics",    icon: "grow",    label: "Analytics"    },
  ];

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { -webkit-tap-highlight-color: transparent; }
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus { border-color: ${C.black} !important; }
      `}</style>

      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Top Bar */}
      <div style={{ background: C.black, padding: "16px 20px 18px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 11, color: C.green, margin: 0, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>GGE</p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>Admin Panel</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: "#fff", padding: "3px 10px", borderRadius: 6 }}>V2 Pro</span>
            <button onClick={() => supabase.auth.signOut().then(() => setAuthState("denied"))} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon n="logout" size={14} color="#fff" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.gray100}`, display: "flex", position: "sticky", top: 66, zIndex: 99 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 4px 8px", border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, borderBottom: tab === t.id ? `2px solid ${C.black}` : "2px solid transparent" }}>
            <Icon n={t.icon} size={17} color={tab === t.id ? C.black : C.gray400} />
            <span style={{ fontSize: 9, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.black : C.gray400, fontFamily: "Nunito, sans-serif" }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "dashboard"    && <DashboardTab    stats={stats} loading={statsLoading} onRefresh={fetchStats} />}
      {tab === "users"        && <UsersTab        showToast={showToast} />}
      {tab === "applications" && <ApplicationsTab showToast={showToast} />}
      {tab === "analytics"    && <AnalyticsTab    showToast={showToast} />}
    </div>
  );
}

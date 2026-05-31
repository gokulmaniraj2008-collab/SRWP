import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn("Supabase env vars missing — database features disabled");
}

export const supabase = url && key ? createClient(url, key) : null;

// ── User helpers ──────────────────────────────────────────────────────────────
export const db = {

  // Save or update user after login
  upsertUser: async (user) => {
    if (!supabase) return;
    await supabase.from("users").upsert([{
      id: user.id,
      google_id: user.google_id || user.id,
      name: user.name,
      email: user.email,
      username: user.username || user.email.split("@")[0],
      state: user.state || null,
      district: user.district || null,
      role: user.role || "Other",
      is_admin: user.email === "gokulmaniraj2008@gmail.com",
      last_seen: new Date().toISOString(),
    }], { onConflict: "id" });
  },

  // Get user by id
  getUser: async (id) => {
    if (!supabase) return null;
    const { data } = await supabase.from("users").select("*").eq("id", id).single();
    return data;
  },

  // Update last seen
  ping: async (userId) => {
    if (!supabase) return;
    await supabase.from("users").update({ last_seen: new Date().toISOString() }).eq("id", userId);
  },

  // Get online users (last 5 min)
  getOnlineUsers: async () => {
    if (!supabase) return [];
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data } = await supabase.from("users").select("id, name, district, role, gkfxl_badge").gte("last_seen", fiveMinAgo);
    return data || [];
  },

  // Track AI usage
  trackAIUsage: async (userId, mbUsed) => {
    if (!supabase) return;
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("ai_usage").upsert([{
      user_id: userId,
      usage_date: today,
      slm_mb: mbUsed,
      total_mb: mbUsed,
    }], { onConflict: "user_id,usage_date", ignoreDuplicates: false });
  },

  // Get today's AI usage
  getAIUsage: async (userId) => {
    if (!supabase) return 0;
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase.from("ai_usage").select("total_mb").eq("user_id", userId).eq("usage_date", today).single();
    return data?.total_mb || 0;
  },

  // Add notification
  notify: async (userId, title, body, type = "info") => {
    if (!supabase) return;
    await supabase.from("notifications").insert([{ user_id: userId, title, body, type }]);
  },

  // Get notifications
  getNotifications: async (userId) => {
    if (!supabase) return [];
    const { data } = await supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
    return data || [];
  },

  // Mark notification read
  markRead: async (notifId) => {
    if (!supabase) return;
    await supabase.from("notifications").update({ read: true }).eq("id", notifId);
  },
};

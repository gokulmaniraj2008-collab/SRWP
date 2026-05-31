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
    if (!supabase) return null;
    const { data, error } = await supabase.from("users").upsert([{
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
    if (error) console.error("upsertUser error:", error.message);
    return data;
  },

  // Get user by id
  getUser: async (id) => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) console.error("getUser error:", error.message);
    return data;
  },

  // Update last seen
  ping: async (userId) => {
    if (!supabase) return;
    await supabase
      .from("users")
      .update({ last_seen: new Date().toISOString() })
      .eq("id", userId);
  },

  // Get online users (active in last 5 min)
  getOnlineUsers: async () => {
    if (!supabase) return [];
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data } = await supabase
      .from("users")
      .select("id, name, district, role, gkfxl_badge")
      .gte("last_seen", fiveMinAgo);
    return data || [];
  },

  // ── AI Usage ───────────────────────────────────────────────────────────────

  // FIX: increments usage instead of overwriting it
  trackAIUsage: async (userId, mbUsed, type = "slm") => {
    if (!supabase) return;
    const today = new Date().toISOString().split("T")[0];

    // Check if a row exists for today
    const { data: existing } = await supabase
      .from("ai_usage")
      .select("id, slm_mb, rag_mb, voice_mb, total_mb")
      .eq("user_id", userId)
      .eq("usage_date", today)
      .single();

    if (existing) {
      // Row exists — increment the right column
      const update = {
        total_mb: (existing.total_mb || 0) + mbUsed,
      };
      if (type === "slm")   update.slm_mb   = (existing.slm_mb   || 0) + mbUsed;
      if (type === "rag")   update.rag_mb   = (existing.rag_mb   || 0) + mbUsed;
      if (type === "voice") update.voice_mb = (existing.voice_mb || 0) + mbUsed;

      await supabase
        .from("ai_usage")
        .update(update)
        .eq("id", existing.id);
    } else {
      // No row yet — create it
      const insert = {
        user_id: userId,
        usage_date: today,
        slm_mb: type === "slm" ? mbUsed : 0,
        rag_mb: type === "rag" ? mbUsed : 0,
        voice_mb: type === "voice" ? mbUsed : 0,
        total_mb: mbUsed,
      };
      await supabase.from("ai_usage").insert([insert]);
    }
  },

  // Get today's AI usage (returns object with breakdown)
  getAIUsage: async (userId) => {
    if (!supabase) return { slm_mb: 0, rag_mb: 0, voice_mb: 0, total_mb: 0 };
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("ai_usage")
      .select("slm_mb, rag_mb, voice_mb, total_mb")
      .eq("user_id", userId)
      .eq("usage_date", today)
      .single();
    return data || { slm_mb: 0, rag_mb: 0, voice_mb: 0, total_mb: 0 };
  },

  // Check if user has exceeded 100MB daily limit
  checkAILimit: async (userId) => {
    if (!supabase) return { allowed: true, used: 0, remaining: 100 };
    const usage = await db.getAIUsage(userId);
    const used = usage.total_mb || 0;
    const limit = 100;
    return {
      allowed: used < limit,
      used: used,
      remaining: Math.max(0, limit - used),
      resetAt: "midnight",
    };
  },

  // ── Notifications ──────────────────────────────────────────────────────────

  notify: async (userId, title, body, type = "info") => {
    if (!supabase) return;
    const { error } = await supabase
      .from("notifications")
      .insert([{ user_id: userId, title, body, type }]);
    if (error) console.error("notify error:", error.message);
  },

  getNotifications: async (userId) => {
    if (!supabase) return [];
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    return data || [];
  },

  markRead: async (notifId) => {
    if (!supabase) return;
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notifId);
  },

  markAllRead: async (userId) => {
    if (!supabase) return;
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);
  },

  // ── Posts / Real Talk ──────────────────────────────────────────────────────

  createPost: async (userId, content, isAnonymous = false) => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("problems")
      .insert([{
        user_id: userId,
        content,
        is_anonymous: isAnonymous,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();
    if (error) console.error("createPost error:", error.message);
    return data;
  },

  getPosts: async (limit = 20, offset = 0) => {
    if (!supabase) return [];
    const { data } = await supabase
      .from("problems")
      .select("*, users(name, district, gkfxl_badge)")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    return data || [];
  },

  // ── Wallet / Points ────────────────────────────────────────────────────────

  getPoints: async (userId) => {
    if (!supabase) return 0;
    const { data } = await supabase
      .from("users")
      .select("points")
      .eq("id", userId)
      .single();
    return data?.points || 0;
  },

  addPoints: async (userId, amount, reason) => {
    if (!supabase) return;
    // Log the transaction
    await supabase.from("wallet_transactions").insert([{
      user_id: userId,
      amount,
      type: "credit",
      reason,
      created_at: new Date().toISOString(),
    }]);
    // Update user total
    const current = await db.getPoints(userId);
    await supabase
      .from("users")
      .update({ points: current + amount })
      .eq("id", userId);
  },

  // ── GKFXL Application ─────────────────────────────────────────────────────

  submitGKFXLApplication: async (userId, formData) => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("gkfxl_applications")
      .insert([{
        user_id: userId,
        ...formData,
        status: "pending",
        submitted_at: new Date().toISOString(),
      }])
      .select()
      .single();
    if (error) console.error("GKFXL application error:", error.message);
    return data;
  },

  getGKFXLStatus: async (userId) => {
    if (!supabase) return null;
    const { data } = await supabase
      .from("gkfxl_applications")
      .select("status, submitted_at, reviewed_at")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .single();
    return data;
  },

  // ── Learning Progress ──────────────────────────────────────────────────────

  saveProgress: async (userId, pathId, lessonId, score = null) => {
    if (!supabase) return;
    await supabase.from("user_progress").upsert([{
      user_id: userId,
      path_id: pathId,
      lesson_id: lessonId,
      completed: true,
      score,
      completed_at: new Date().toISOString(),
    }], { onConflict: "user_id,lesson_id" });
  },

  getProgress: async (userId, pathId) => {
    if (!supabase) return [];
    const { data } = await supabase
      .from("user_progress")
      .select("lesson_id, score, completed_at")
      .eq("user_id", userId)
      .eq("path_id", pathId);
    return data || [];
  },

};

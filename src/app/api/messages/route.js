import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const getSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

// GET /api/messages?room_id=team_123
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("room_id");

  if (!roomId) {
    return NextResponse.json({ error: "room_id required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data });
}

// POST /api/messages
export async function POST(request) {
  const { room_id, author, text } = await request.json();

  if (!room_id || !author || !text) {
    return NextResponse.json({ error: "Missing fields: room_id, author, text" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .insert([{ room_id, author, text }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: data });
}

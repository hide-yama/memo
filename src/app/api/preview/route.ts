import { NextRequest, NextResponse } from "next/server";
import { getAllPostsIncludingScheduled } from "@/lib/posts";

const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD ?? "preview";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== PREVIEW_PASSWORD) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  const posts = getAllPostsIncludingScheduled();
  return NextResponse.json({ posts });
}

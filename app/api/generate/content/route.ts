import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { sanitizeInput, checkRateLimit } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`content:${ip}`, 5, 86400000)) {
      return NextResponse.json({ error: "Daily limit reached. Upgrade to Pro for more." }, { status: 429 });
    }

    const { input, platforms, tone } = await req.json();
    if (!input || !platforms?.length || !tone) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const sanitized = sanitizeInput(input);
    if (sanitized.length < 10) return NextResponse.json({ error: "Input too short" }, { status: 400 });

    const platformMap: Record<string, string> = {
      twitter: "X/Twitter Thread (5-7 tweets, numbered 1/ 2/ etc.)",
      linkedin: "LinkedIn Post (professional, line breaks, 1000-1300 chars)",
      instagram: "Instagram Caption (engaging, hashtags, under 2200 chars)",
      newsletter: "Newsletter Section (subject line + 200-400 words)",
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are an expert content repurposer. Tone: ${tone}. Output ONLY a valid JSON array with objects: {"platform": "id", "content": "text"}. No markdown fences.` },
        { role: "user", content: `Transform for: ${platforms.map((p: string) => platformMap[p] || p).join(", ")}\n\nContent:\n${sanitized}` },
      ],
      temperature: 0.8,
      max_tokens: 3000,
    });

    const raw = completion.choices[0]?.message?.content || "[]";
    let results;
    try { results = JSON.parse(raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim()); }
    catch { results = platforms.map((p: string) => ({ platform: p, content: "Generation error — please try again." })); }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Content gen error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

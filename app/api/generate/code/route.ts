import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { sanitizeInput, checkRateLimit } from "@/lib/utils";

const prompts: Record<string, string> = {
  readme: "Generate a professional README.md. Include: title, description, features, tech stack, installation, usage, contributing, license. Clean markdown.",
  docs: "Generate comprehensive documentation. Include: overview, architecture, function docs with params/returns, usage examples. Clean markdown.",
  changelog: "Generate a changelog in Keep a Changelog format. Infer changes from the code. Be specific.",
  review: "Perform a thorough code review. Check: logic errors, performance, security, readability, error handling, type safety. For each issue: severity, location, fix.",
};

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`code:${ip}`, 3, 86400000)) {
      return NextResponse.json({ error: "Daily limit reached. Upgrade to Pro." }, { status: 429 });
    }

    const { input, inputType, tool } = await req.json();
    if (!input || !tool || !prompts[tool]) return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });

    const sanitized = sanitizeInput(input);
    if (sanitized.length < 5) return NextResponse.json({ error: "Input too short" }, { status: 400 });

    let codeContent = sanitized;

    if (inputType === "url" && sanitized.includes("github.com")) {
      try {
        const match = sanitized.match(/github\.com\/([^/]+)\/([^/\s]+)/);
        if (match) {
          const [, owner, repo] = match;
          const cleanRepo = repo.replace(/\.git$/, "");
          const repoRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers: { Accept: "application/vnd.github.v3+json" } });
          if (repoRes.ok) {
            const data = await repoRes.json();
            const treeRes = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/git/trees/${data.default_branch}?recursive=1`, { headers: { Accept: "application/vnd.github.v3+json" } });
            let tree = "";
            if (treeRes.ok) {
              const td = await treeRes.json();
              tree = td.tree?.slice(0, 50).map((f: { path: string }) => f.path).join("\n") || "";
            }
            codeContent = `Repo: ${data.full_name}\nDescription: ${data.description || "N/A"}\nLanguage: ${data.language || "N/A"}\nStars: ${data.stargazers_count}\n\nFiles:\n${tree}`;
          }
        }
      } catch { /* fallback to raw input */ }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are a senior software engineer. ${prompts[tool]}` },
        { role: "user", content: `${inputType === "url" ? "Repository info" : "Code"}:\n\n${codeContent}` },
      ],
      temperature: 0.4,
      max_tokens: 4000,
    });

    return NextResponse.json({ result: completion.choices[0]?.message?.content || "Generation failed." });
  } catch (error) {
    console.error("Code gen error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

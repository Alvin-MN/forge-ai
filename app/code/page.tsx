"use client";
import { useState } from "react";

const TOOLS = [
  { id: "readme", label: "README Generator", icon: "\uD83D\uDCC4" },
  { id: "docs", label: "Documentation", icon: "\uD83D\uDCDA" },
  { id: "changelog", label: "Changelog", icon: "\uD83D\uDCCB" },
  { id: "review", label: "Code Review", icon: "\uD83D\uDD0D" },
];

export default function CodeForgePage() {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<"code" | "url">("code");
  const [tool, setTool] = useState("readme");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim(), inputType, tool }),
      });
      if (!res.ok) { alert((await res.json()).error || "Failed"); return; }
      setResult((await res.json()).result);
    } catch { alert("Something went wrong."); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-2xl mb-10">
        <h1 className="text-4xl font-bold mb-2">Code<span className="text-[var(--accent)]">Forge</span></h1>
        <p className="text-[var(--muted-foreground)] text-lg">Generate READMEs, docs, changelogs, and code reviews from code or GitHub repos.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Input Type</label>
            <div className="flex gap-2">
              {(["code", "url"] as const).map((t) => (
                <button key={t} onClick={() => setInputType(t)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${inputType === t ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]" : "border-[var(--border)] text-[var(--muted-foreground)]"}`}>
                  {t === "code" ? "Paste Code" : "GitHub URL"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{inputType === "url" ? "GitHub Repository URL" : "Your Code"}</label>
            {inputType === "url" ? (
              <input type="url" value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://github.com/user/repo" className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-sm focus:border-[var(--accent)] focus:outline-none" />
            ) : (
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your code here..." className="w-full h-48 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-sm font-mono resize-none focus:border-[var(--accent)] focus:outline-none" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Tool</label>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS.map((t) => (
                <button key={t.id} onClick={() => setTool(t.id)} className={`px-4 py-3 rounded-lg text-sm border transition-all text-left ${tool === t.id ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]" : "border-[var(--border)] text-[var(--muted-foreground)]"}`}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={loading || !input.trim()} className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Generating..." : "Generate"}
          </button>
          <p className="text-xs text-[var(--muted)] text-center">Free: 3/day &middot; <a href="/pricing" className="text-[var(--accent)]">Upgrade for more</a></p>
        </div>
        <div>
          {!result && !loading && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center text-[var(--muted-foreground)]">
              <div className="text-4xl mb-4">&#128736;&#65039;</div>
              <p>Generated output appears here.</p>
            </div>
          )}
          {loading && <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center"><div className="animate-pulse text-[var(--accent)]">Analyzing...</div></div>}
          {result && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{TOOLS.find((t) => t.id === tool)?.icon} {TOOLS.find((t) => t.id === tool)?.label}</span>
                <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-xs px-3 py-1 rounded border border-[var(--border)] hover:bg-[var(--border)]">{copied ? "Copied!" : "Copy"}</button>
              </div>
              <div className="bg-[var(--background)] rounded-lg p-4 text-sm font-mono whitespace-pre-wrap leading-relaxed text-[var(--muted-foreground)] max-h-[600px] overflow-y-auto">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

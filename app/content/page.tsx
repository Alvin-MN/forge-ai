"use client";
import { useState } from "react";

const PLATFORMS = [
  { id: "twitter", label: "X Thread", icon: "\uD835\uDD4F" },
  { id: "linkedin", label: "LinkedIn", icon: "in" },
  { id: "instagram", label: "Instagram", icon: "\uD83D\uDCF8" },
  { id: "newsletter", label: "Newsletter", icon: "\uD83D\uDCE7" },
];
const TONES = ["Professional", "Casual", "Witty", "Bold"];

export default function ContentForgePage() {
  const [input, setInput] = useState("");
  const [platforms, setPlatforms] = useState(["twitter", "linkedin"]);
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ platform: string; content: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) => setPlatforms((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const generate = async () => {
    if (!input.trim() || !platforms.length) return;
    setLoading(true);
    setResults([]);
    setError(null);
    try {
      const res = await fetch("/api/generate/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim(), platforms, tone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setResults(data.results);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-2xl mb-10">
        <h1 className="text-4xl font-bold mb-2">Content<span className="text-[var(--accent)]">Forge</span></h1>
        <p className="text-[var(--muted-foreground)] text-lg">Paste any content — get perfectly formatted posts for every platform.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Content or Topic</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste a blog post, article, or describe what you want..." className="w-full h-48 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-sm resize-none focus:border-[var(--accent)] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button key={p.id} onClick={() => toggle(p.id)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${platforms.includes(p.id) ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]" : "border-[var(--border)] text-[var(--muted-foreground)]"}`}>
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Tone</label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button key={t} onClick={() => setTone(t)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${tone === t ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]" : "border-[var(--border)] text-[var(--muted-foreground)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={loading || !input.trim() || !platforms.length} className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Generating..." : "Generate Content"}
          </button>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400">
              {error}
              <button onClick={generate} className="ml-2 underline">Try again</button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {!results.length && !loading && !error && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center text-[var(--muted-foreground)]">
              <div className="text-4xl mb-4">&#9997;&#65039;</div>
              <p>Generated content appears here.</p>
            </div>
          )}
          {loading && <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center"><div className="animate-pulse text-[var(--accent)]">Generating (may take a few seconds)...</div></div>}
          {results.map((r) => {
            const p = PLATFORMS.find((x) => x.id === r.platform);
            return (
              <div key={r.platform} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{p?.icon} {p?.label}</span>
                  <button onClick={() => copy(r.content, r.platform)} className="text-xs px-3 py-1 rounded border border-[var(--border)] hover:bg-[var(--border)]">{copied === r.platform ? "Copied!" : "Copy"}</button>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-[var(--muted-foreground)]">{r.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

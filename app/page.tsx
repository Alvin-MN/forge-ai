export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 relative text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full px-4 py-1.5 text-sm text-[var(--accent)] mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            3 AI tools, 1 platform, zero fluff
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            AI Tools That<br />
            <span className="text-[var(--accent)]">Actually Work</span>
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] mb-10 max-w-xl mx-auto">
            Premium prompts, instant content repurposing, and developer tools — all powered by AI, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/prompts" className="bg-[var(--accent)] text-black px-8 py-3 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors text-lg">Explore Tools</a>
            <a href="/pricing" className="border border-[var(--border)] px-8 py-3 rounded-lg font-medium hover:bg-[var(--card)] transition-colors text-lg">View Pricing</a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "\uD83D\uDCE3", name: "Prompt Store", tagline: "Battle-tested AI prompts", desc: "Premium prompt packs for marketing, development, and business. Copy, paste, profit.", href: "/prompts", cta: "Browse Prompts", price: "From $19" },
            { icon: "\u270D\uFE0F", name: "ContentForge", tagline: "One input, every platform", desc: "Paste any content and get perfectly formatted posts for X, LinkedIn, and Instagram in seconds.", href: "/content", cta: "Try ContentForge", price: "$9/mo" },
            { icon: "\uD83D\uDEE0\uFE0F", name: "CodeForge", tagline: "Ship docs, not excuses", desc: "Generate READMEs, documentation, changelogs, and code reviews from any GitHub repo.", href: "/code", cta: "Try CodeForge", price: "$12/mo" },
          ].map((p) => (
            <a key={p.name} href={p.href} className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)]/30 hover:bg-[var(--card-hover)] transition-all">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{p.name}</h3>
              <p className="text-[var(--accent)] text-sm mb-3">{p.tagline}</p>
              <p className="text-[var(--muted-foreground)] text-sm mb-6">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">{p.cta} &rarr;</span>
                <span className="text-sm text-[var(--muted)]">{p.price}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Faster?</h2>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-lg mx-auto">Join creators and developers who use Forge AI to ship better work, faster.</p>
        <a href="/pricing" className="inline-block bg-[var(--accent)] text-black px-8 py-3 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors text-lg">Get Started Free</a>
      </section>
    </div>
  );
}

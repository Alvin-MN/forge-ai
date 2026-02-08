export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-medium text-green-400 mb-2">Purchase Successful!</h2>
        <p className="text-sm text-[var(--muted-foreground)]">Thank you! Check your email for the receipt and access details.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: "\uD83D\uDCE3", name: "Prompt Store", desc: "Browse prompt packs", href: "/prompts" },
          { icon: "\u270D\uFE0F", name: "ContentForge", desc: "Generate content", href: "/content" },
          { icon: "\uD83D\uDEE0\uFE0F", name: "CodeForge", desc: "Generate docs & reviews", href: "/code" },
        ].map((t) => (
          <a key={t.name} href={t.href} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)]/30 transition-all">
            <div className="text-2xl mb-2">{t.icon}</div>
            <h3 className="font-medium">{t.name}</h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{t.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

import { PROMPT_PACKS } from "@/lib/prompts-data";

export default function PromptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Prompt Store</h1>
        <p className="text-[var(--muted-foreground)] text-lg">Battle-tested AI prompts that get results. Copy, paste, profit.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROMPT_PACKS.map((pack) => (
          <a key={pack.id} href={"/prompts/" + pack.id} className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-all">
            <div className="text-4xl mb-4">{pack.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{pack.name}</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2">{pack.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted)]">{pack.promptCount} prompts</span>
              <span className="font-semibold text-[var(--accent)]">{"$" + (pack.price / 100).toFixed(0)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

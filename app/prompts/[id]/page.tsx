import { PROMPT_PACKS } from "@/lib/prompts-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROMPT_PACKS.map((pack) => ({ id: pack.id }));
}

export default async function PromptPackPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const pack = PROMPT_PACKS.find((p) => p.id === id);
  if (!pack) notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <a href="/prompts" className="text-sm text-[var(--muted-foreground)] hover:text-white mb-6 inline-block">&larr; Back</a>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl">{pack.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{pack.name}</h1>
              <p className="text-[var(--muted-foreground)]">{pack.description}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Included Prompts ({pack.promptCount})</h2>
          <div className="space-y-4">
            {pack.prompts.map((prompt, i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{prompt.title}</h3>
                  <span className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full">{prompt.category}</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">{prompt.description}</p>
                <div className="bg-[var(--background)] rounded-lg p-4 text-sm font-mono text-[var(--muted-foreground)]">
                  {prompt.prompt.slice(0, 120)}...
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-[var(--accent)]">{"$" + (pack.price / 100).toFixed(0)}</div>
              <p className="text-sm text-[var(--muted-foreground)]">One-time purchase</p>
            </div>
            <a href={"/api/checkout?product=" + pack.productId} className="block w-full bg-[var(--accent)] text-black text-center py-3 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors mb-4">Buy Now</a>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>&#10003; {pack.promptCount} expert prompts</li>
              <li>&#10003; Instant delivery</li>
              <li>&#10003; Works with any AI</li>
              <li>&#10003; Lifetime access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

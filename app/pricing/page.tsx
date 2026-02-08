import { PRODUCTS } from "@/lib/polar";

const sections = [
  {
    name: "Prompt Packs",
    desc: "One-time purchase, lifetime access",
    plans: [
      { name: "Marketing Mastery", price: "$19", features: ["18 expert prompts", "Marketing & copywriting", "Social templates"], productId: PRODUCTS.MARKETING_PACK, pop: false },
      { name: "Developer Toolkit", price: "$29", features: ["16 expert prompts", "Code review & architecture", "DevOps & testing"], productId: PRODUCTS.DEVELOPER_PACK, pop: false },
      { name: "Ultimate Bundle", price: "$49", features: ["34+ prompts (all packs)", "Marketing + Dev + Business", "Future updates included"], productId: PRODUCTS.ULTIMATE_BUNDLE, pop: true },
    ],
  },
  {
    name: "ContentForge",
    desc: "AI content repurposer",
    plans: [
      { name: "Free", price: "$0", features: ["5 generations/day", "X + LinkedIn + Instagram", "Basic tones"], productId: null, pop: false },
      { name: "Pro", price: "$9/mo", features: ["100 generations/month", "All platforms + Newsletter", "All tones"], productId: PRODUCTS.CONTENT_PRO, pop: true },
      { name: "Business", price: "$29/mo", features: ["Unlimited generations", "Everything in Pro", "Priority processing"], productId: PRODUCTS.CONTENT_BIZ, pop: false },
    ],
  },
  {
    name: "CodeForge",
    desc: "AI developer toolkit",
    plans: [
      { name: "Free", price: "$0", features: ["3 generations/day", "README generator", "Basic code review"], productId: null, pop: false },
      { name: "Pro", price: "$12/mo", features: ["50 generations/month", "All tools", "GitHub repo analysis"], productId: PRODUCTS.CODE_PRO, pop: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-[var(--muted-foreground)] text-lg">Start free. Upgrade when you need more.</p>
      </div>
      {sections.map((s) => (
        <div key={s.name} className="mb-16">
          <h2 className="text-2xl font-bold mb-1">{s.name}</h2>
          <p className="text-[var(--muted-foreground)] mb-6">{s.desc}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {s.plans.map((p) => (
              <div key={p.name} className={`bg-[var(--card)] border rounded-2xl p-6 flex flex-col ${p.pop ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/20" : "border-[var(--border)]"}`}>
                {p.pop && <div className="text-xs font-medium text-[var(--accent)] mb-2">Most Popular</div>}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="text-3xl font-bold my-4">{p.price}</div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"><span className="text-green-500">&#10003;</span>{f}</li>)}
                </ul>
                {p.productId ? (
                  <a href={`/api/checkout?product=${p.productId}`} className={`block text-center py-3 rounded-lg font-medium transition-colors ${p.pop ? "bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)]" : "border border-[var(--border)] hover:bg-[var(--card-hover)]"}`}>
                    Get {p.name}
                  </a>
                ) : (
                  <div className="text-center py-3 rounded-lg border border-[var(--border)] text-[var(--muted)]">Current Plan</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-sm text-[var(--muted)]">All payments via Polar. Cancel anytime.</p>
    </div>
  );
}

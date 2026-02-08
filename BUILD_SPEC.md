# BUILD SPEC: Forge AI — AI Tools Platform

## Overview
Build a Next.js 15 app with Convex backend and Polar payments. Three products under one roof:
1. **Prompt Store** — Digital prompt packs for purchase
2. **ContentForge** — AI content repurposer (subscription SaaS)
3. **CodeForge** — AI developer toolkit (subscription SaaS)

## Tech Stack
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Convex (real-time database + serverless functions)
- **Payments:** Polar (@polar-sh/sdk, checkout links)
- **AI:** OpenAI API (GPT-4o for generation)
- **Auth:** Convex Auth (email magic link via Resend, or simple email/password)
- **Deployment:** Vercel

## Project Structure
```
forge-ai/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page (marketing)
│   ├── pricing/page.tsx        # Pricing page
│   ├── prompts/
│   │   ├── page.tsx            # Prompt store - browse packs
│   │   └── [id]/page.tsx       # Individual prompt pack detail
│   ├── content/
│   │   ├── page.tsx            # ContentForge - main tool
│   │   └── history/page.tsx    # Past generations
│   ├── code/
│   │   ├── page.tsx            # CodeForge - main tool
│   │   └── history/page.tsx    # Past generations
│   ├── dashboard/page.tsx      # User dashboard
│   ├── api/
│   │   ├── checkout/route.ts   # Polar checkout redirect
│   │   ├── webhook/polar/route.ts # Polar webhooks
│   │   └── generate/
│   │       ├── content/route.ts   # AI content generation
│   │       └── code/route.ts      # AI code generation
│   └── auth/
│       ├── login/page.tsx
│       └── signup/page.tsx
├── convex/
│   ├── schema.ts               # Database schema
│   ├── users.ts                # User management
│   ├── prompts.ts              # Prompt pack data
│   ├── generations.ts          # Content/code generations
│   ├── subscriptions.ts        # Subscription tracking
│   └── auth.config.ts          # Convex Auth config
├── components/
│   ├── ui/                     # shadcn components
│   ├── landing/                # Landing page sections
│   ├── prompt-store/           # Prompt browsing components
│   ├── content-forge/          # Content generation UI
│   └── code-forge/             # Code generation UI
├── lib/
│   ├── polar.ts                # Polar SDK setup
│   ├── openai.ts               # OpenAI client
│   └── utils.ts                # Shared utilities
├── .env.local                  # Environment variables (template)
├── convex.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Convex Schema

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    polarCustomerId: v.optional(v.string()),
    plan: v.string(), // "free" | "content_pro" | "content_biz" | "code_pro"
    promptPurchases: v.array(v.string()), // product IDs
    contentGenerationsUsed: v.number(),
    contentGenerationsLimit: v.number(),
    codeGenerationsUsed: v.number(),
    codeGenerationsLimit: v.number(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_polar_customer", ["polarCustomerId"]),

  promptPacks: defineTable({
    productId: v.string(), // Polar product ID
    name: v.string(),
    description: v.string(),
    category: v.string(), // "marketing" | "development" | "business" | "writing"
    promptCount: v.number(),
    price: v.number(), // cents
    prompts: v.array(v.object({
      title: v.string(),
      description: v.string(),
      prompt: v.string(),
      category: v.string(),
      tags: v.array(v.string()),
    })),
    featured: v.boolean(),
  }).index("by_product", ["productId"]),

  generations: defineTable({
    userId: v.id("users"),
    type: v.string(), // "content" | "code"
    input: v.string(),
    output: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  webhookEvents: defineTable({
    eventType: v.string(),
    payload: v.any(),
    processedAt: v.number(),
  }),
});
```

## Polar Product IDs (from POLAR_PRODUCTS.md)
```
MARKETING_PACK=2d59331b-62dd-47af-8d00-856a13939a5f  ($19)
DEVELOPER_PACK=c5f1da9f-b328-4474-9e72-aa0358556b44  ($29)
ULTIMATE_BUNDLE=ed88eef6-9785-4667-9fe9-a95809540a82  ($49)
CONTENT_PRO=05100fad-ecdf-4ac1-bd6b-2f1da6dd9850     ($9/mo)
CONTENT_BIZ=0062fcd6-6f8e-45b7-a475-225ed3134cba     ($29/mo)
CODE_PRO=eceed797-2140-461b-9ba4-735b5cd1861a         ($12/mo)
```

## Environment Variables Needed
```
NEXT_PUBLIC_CONVEX_URL=         # From Convex dashboard
CONVEX_DEPLOY_KEY=              # From Convex dashboard
POLAR_ACCESS_TOKEN=             # Already in Doppler
POLAR_WEBHOOK_SECRET=           # Create in Polar dashboard
OPENAI_API_KEY=                 # Already in Doppler
NEXT_PUBLIC_APP_URL=            # Vercel deployment URL
```

## Landing Page Design
- Hero: "AI Tools That Actually Work" — bold, clean, dark mode
- Three product cards below hero (Prompt Store, ContentForge, CodeForge)
- Social proof section (placeholder testimonials)
- Pricing section with all tiers
- CTA: "Get Started Free"
- Footer with links
- Color scheme: Dark bg (#0a0a0a), Gold accent (#F9C33A), White text
- Font: Inter or similar clean sans-serif
- Minimal, Apple-style aesthetic

## Prompt Store Feature
- Grid of prompt pack cards
- Each card shows: name, category, prompt count, price, preview
- Click to see details + sample prompts
- "Buy Now" button → Polar checkout
- After purchase: full prompts visible in dashboard
- Pre-populate with 3 packs (Marketing, Developer, Ultimate Bundle)

## ContentForge Feature
- Simple textarea: paste content or describe topic
- Platform selector: X Thread, LinkedIn Post, Instagram Caption, Newsletter
- Tone selector: Professional, Casual, Witty, Bold
- "Generate" button → calls OpenAI API
- Output displayed in formatted cards per platform
- Copy button on each output
- History of past generations
- Free: 5/day, Pro: 100/mo, Business: Unlimited

## CodeForge Feature
- Input: GitHub repo URL or paste code
- Tool selector: README Generator, Documentation, Changelog, Code Review
- "Generate" button → calls OpenAI API (+ GitHub API for repo analysis)
- Output in markdown with copy button
- History of past generations
- Free: 3/day, Pro: 50/mo

## Security Requirements (CRITICAL)
1. **Input sanitization** — All user inputs sanitized before processing
2. **Rate limiting** — Per-user rate limits on API routes
3. **API key protection** — All API keys server-side only, never exposed to client
4. **CSRF protection** — Next.js built-in
5. **XSS prevention** — React's built-in escaping + no dangerouslySetInnerHTML
6. **Webhook verification** — Polar webhook signature validation
7. **No PII storage** — Only email for auth, no names/addresses stored unnecessarily
8. **Content filtering** — Basic check that AI inputs aren't injection attempts
9. **Error handling** — Never expose internal errors/stack traces to users

## Auth Flow (Simplified)
For MVP: Use simple email-based auth stored in Convex.
- Sign up: email + password → create user in Convex
- Login: email + password → verify → set session cookie
- OR: Skip auth for prompt store (just checkout links), require auth for SaaS tools

## Key Implementation Notes
- Use Polar checkout LINKS (not embedded checkout) for simplicity
- Checkout URL format: `https://buy.polar.sh/polar_cl_XXXX?products=PRODUCT_ID`
- OR use API: `POST /v1/checkouts/` to create checkout session
- Webhook handles: order.paid → grant access, subscription.active → update plan
- All AI generation happens in Next.js API routes (not Convex) to use OpenAI SDK
- Convex stores user state, generation history, prompt data
- Use @tanstack/react-query or SWR for data fetching alongside Convex real-time

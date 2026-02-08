export interface Prompt {
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
}

export interface PromptPack {
  id: string;
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  promptCount: number;
  featured: boolean;
  icon: string;
  prompts: Prompt[];
}

export const PROMPT_PACKS: PromptPack[] = [
  {
    id: "marketing",
    productId: "2d59331b-62dd-47af-8d00-856a13939a5f",
    name: "Marketing Mastery",
    description: "50+ battle-tested prompts for marketing, copywriting, and growth. Turn AI into your full marketing team.",
    category: "marketing",
    price: 1900,
    promptCount: 18,
    featured: true,
    icon: "\uD83D\uDCE3",
    prompts: [
      { title: "Landing Page Copy Generator", description: "High-converting landing page copy for any product", prompt: "You are a world-class conversion copywriter. Write landing page copy for [PRODUCT]. Include: headline (max 10 words), subheadline addressing core pain, 3 benefit sections, social proof placeholder, CTA. Use PAS framework. Confident but not salesy. Output markdown.", category: "copywriting", tags: ["landing page", "conversion"] },
      { title: "Email Sequence Builder", description: "5-email nurture sequence that converts", prompt: "Create a 5-email welcome sequence for [BUSINESS]. Email 1: Welcome + quick win. Email 2: Story + authority. Email 3: Overcome objection. Email 4: Social proof. Email 5: Urgency + offer. Include subject lines, preview text, body (under 200 words each). Conversational tone.", category: "email", tags: ["email", "nurture"] },
      { title: "Social Media Calendar", description: "Generate a week of social posts", prompt: "Create a 7-day social media calendar for [BRAND]. For each day: Platform (rotate X, LinkedIn, Instagram), Post type, Full copy, Hashtags (5-7), Best posting time. Mix: 40% value, 30% engagement, 20% authority, 10% promo.", category: "social", tags: ["social media", "calendar"] },
      { title: "Ad Copy Variations", description: "10 ad copy variations for testing", prompt: "Generate 10 ad copy variations for [PRODUCT] targeting [AUDIENCE]. Each: Headline (40 chars), Primary text (125 chars), Description (30 chars), CTA. Use AIDA, PAS, Before-After-Bridge frameworks.", category: "advertising", tags: ["ads", "A/B testing"] },
      { title: "SEO Blog Outline", description: "SEO-optimized blog post structure", prompt: "Create SEO blog outline for keyword: [KEYWORD]. Include: Title tag (60 chars), Meta description (155 chars), H1, 5-7 H2 sections with H3s, Introduction hook, Key points per section, Featured snippet optimization. Target: 2000-2500 words.", category: "seo", tags: ["SEO", "blog"] },
      { title: "Product Launch Copy", description: "Multi-channel launch announcement", prompt: "Write product launch for [PRODUCT]: 1) Press release (400 words), 2) X thread (7 tweets), 3) LinkedIn post, 4) Customer email, 5) Instagram caption. Key messaging: [VALUE PROP]. Launch date: [DATE].", category: "launch", tags: ["launch", "multi-channel"] },
      { title: "Competitor Analysis", description: "Analyze competitors and find gaps", prompt: "Competitive analysis for [PRODUCT] vs [COMPETITORS]. Analyze: Value prop, Pricing, Target audience, Feature gaps, Messaging, Weaknesses to exploit. Output as comparison table + recommendations.", category: "strategy", tags: ["competitor", "strategy"] },
      { title: "Customer Avatar Builder", description: "Create detailed buyer personas", prompt: "Create 2 buyer personas for [PRODUCT]. Each: Name, demographics, Job title, Goals, Pain points, Online hangouts, Purchase triggers, Objections, Content preferences. Make distinct but both viable.", category: "strategy", tags: ["persona", "targeting"] },
      { title: "Cold Outreach Templates", description: "Cold DMs and emails that get replies", prompt: "Write 5 cold outreach templates for [PRODUCT] targeting [ROLE]. Under 100 words each, personalization hooks, no salesy language, soft CTA. Approaches: curiosity, mutual connection, insight, compliment, direct.", category: "outreach", tags: ["cold outreach", "DM"] },
      { title: "Value Proposition Canvas", description: "Define your unique value prop", prompt: "Value Proposition Canvas for [PRODUCT]. Fill: Customer jobs, Pains, Gains, Pain relievers, Gain creators, Final statement (one sentence, under 20 words).", category: "strategy", tags: ["value prop", "positioning"] },
      { title: "Content Repurposing", description: "Turn one piece into 10 formats", prompt: "Repurpose this content into 10 formats: [CONTENT]. Create: 1) X thread, 2) LinkedIn post, 3) Instagram carousel (8 slides), 4) YouTube Shorts script, 5) Newsletter intro, 6) Quote graphics (3), 7) Podcast talking points, 8) Reddit post, 9) Quora answer, 10) TikTok script.", category: "content", tags: ["repurposing", "multi-format"] },
      { title: "Pricing Page Copy", description: "Pricing copy that converts", prompt: "Write pricing page for [PRODUCT] with [N] tiers. Each: Name, Tagline (who it's for), Features, Price, CTA. Add FAQ (6 questions), guarantee copy, best-value highlight. Transparent tone.", category: "copywriting", tags: ["pricing", "SaaS"] },
      { title: "Brand Voice Guidelines", description: "Define consistent brand voice", prompt: "Brand voice guidelines for [BRAND] in [INDUSTRY]. Include: 3 voice attributes, Tone spectrum, Do's and don'ts with examples, Vocabulary preferences, Platform-specific adjustments, Sample sentences.", category: "branding", tags: ["brand voice", "guidelines"] },
      { title: "Referral Program Design", description: "Design a viral referral program", prompt: "Design referral program for [PRODUCT]. Include: Program name, Landing page copy, Reward structure (both sides), Email invitation template, Social sharing messages, Terms, Success metrics.", category: "growth", tags: ["referral", "growth"] },
      { title: "Case Study Template", description: "Turn success into compelling stories", prompt: "Case study for [CUSTOMER]. Structure: Title (result-focused), Summary (3 lines), Challenge, Solution, Implementation, Results (numbers), Key quote, CTA. Under 800 words, scannable.", category: "content", tags: ["case study", "social proof"] },
      { title: "Growth Experiments", description: "10 testable growth hypotheses", prompt: "Generate 10 growth experiments for [PRODUCT]. Each: Hypothesis (If-Then-Because), Effort (1-5), Impact (1-5), Success metric, Timeline. Prioritize by ICE score. Cover: acquisition, activation, retention, referral, revenue.", category: "growth", tags: ["growth", "experiments"] },
      { title: "Webinar Promotion", description: "Fill your webinar seats", prompt: "Webinar promotion for [TOPIC]. Include: Registration page copy, 3 promo emails, 5 social posts, Reminder sequence, Attendee follow-up, No-show follow-up. Emphasize FOMO and outcomes.", category: "events", tags: ["webinar", "promotion"] },
      { title: "Testimonial Extraction", description: "Get powerful testimonials", prompt: "Testimonial request system: 1) Request email, 2) 7 guiding questions (before/after focus), 3) Follow-up template, 4) Template to polish raw responses (keep authentic voice). For [PRODUCT].", category: "social proof", tags: ["testimonials", "reviews"] },
    ],
  },
  {
    id: "developer",
    productId: "c5f1da9f-b328-4474-9e72-aa0358556b44",
    name: "Developer Toolkit",
    description: "40+ expert prompts for software development. From architecture to deployment, make AI your senior engineer.",
    category: "development",
    price: 2900,
    promptCount: 16,
    featured: true,
    icon: "\uD83D\uDEE0\uFE0F",
    prompts: [
      { title: "Code Review Assistant", description: "Thorough code reviews with actionable feedback", prompt: "Review with FAANG rigor. Check: logic errors, performance (O(n)), security (XSS/SQLi/CSRF), error handling, DRY, type safety. For each: severity, line ref, explanation, fix. Code: [CODE]", category: "review", tags: ["code review", "quality"] },
      { title: "Architecture Decision Record", description: "Document decisions professionally", prompt: "ADR for [DECISION]. Format: Title, Status, Context, Decision Drivers, 3+ Options (pros/cons), Outcome, Consequences, Compliance. Concise but thorough.", category: "architecture", tags: ["ADR", "architecture"] },
      { title: "API Design Reviewer", description: "Design APIs developers love", prompt: "Design REST API for [FEATURE]. Include: Resources, Endpoints (method/path/desc), Request/response schemas (TypeScript), Auth approach, Pagination, Error format, Rate limiting, Versioning. OpenAPI-style.", category: "api", tags: ["API", "REST"] },
      { title: "Debug Detective", description: "Systematic debugging framework", prompt: "Debug: [BUG]. Steps: 1) Reproduce, 2) Isolate (what changed?), 3) 5 hypotheses ranked by probability, 4) Test plan for each, 5) Safest fix with minimal blast radius. Code: [CODE]", category: "debugging", tags: ["debugging", "troubleshooting"] },
      { title: "Database Schema Designer", description: "Design performant schemas", prompt: "Schema for [APP]. Requirements: [FEATURES]. Include: Tables/columns/types, Keys/relationships, Indexes for queries, Constraints, Migration strategy. Consider query performance, integrity, scalability.", category: "database", tags: ["database", "schema"] },
      { title: "Test Suite Generator", description: "Comprehensive test coverage", prompt: "Test suite for: [CODE]. Include: Unit (happy + edge), Integration scenarios, Error cases, Boundary values, Mock setup. Use [FRAMEWORK]. Descriptive names, AAA structure. Target >90% coverage.", category: "testing", tags: ["testing", "unit tests"] },
      { title: "README Generator", description: "Professional README files", prompt: "README.md for [PROJECT]. Include: Title + badges, One-liner, Demo link, Features, Tech stack, Getting Started (prereqs, install, env, run), API docs, Structure, Contributing, License. Welcoming tone.", category: "docs", tags: ["README", "documentation"] },
      { title: "Refactoring Advisor", description: "Smart refactoring recommendations", prompt: "Analyze and recommend refactoring: [CODE]. Each rec: Pattern/smell, Why problematic, Approach, Refactored example, Risk assessment. Prioritize by maintainability impact. Only meaningful improvements.", category: "refactoring", tags: ["refactoring", "clean code"] },
      { title: "Security Audit", description: "Comprehensive security review", prompt: "Security audit for [LANGUAGE/FRAMEWORK]. Check: Auth, AuthZ, Input validation, API security, Data protection, Dependencies, Config, Headers. For each: severity, finding, remediation. Code: [CODE]", category: "security", tags: ["security", "audit"] },
      { title: "Performance Optimizer", description: "Find and fix bottlenecks", prompt: "Performance analysis: [CODE/SYSTEM]. Find: N+1 queries, Re-renders, Memory leaks, Slow queries, Missing caching, Bundle issues, Network waterfalls. Each: impact, fix with code, expected improvement.", category: "performance", tags: ["performance", "optimization"] },
      { title: "CI/CD Pipeline", description: "Robust pipeline design", prompt: "CI/CD pipeline for [PROJECT] using [PLATFORM]. Include: Stages (lint/test/build/deploy), YAML config, Env management, Secret handling, Caching, Parallelism, Deploy strategy, Rollback, Notifications.", category: "devops", tags: ["CI/CD", "DevOps"] },
      { title: "Error Handling Strategy", description: "Robust error handling design", prompt: "Error handling for [APP] in [LANGUAGE]. Include: Error hierarchy, Global handler, Per-layer handling, User messages, Logging strategy, Retry logic, Circuit breaker, Monitoring. Code examples.", category: "architecture", tags: ["error handling", "resilience"] },
      { title: "Git Workflow Guide", description: "Scalable branching strategy", prompt: "Git workflow for team of [SIZE] on [PROJECT]. Include: Branching strategy, Naming conventions, Commit format, PR template, Merge strategy, Release process, Hotfix procedure, Branch protection.", category: "workflow", tags: ["git", "workflow"] },
      { title: "TypeScript Utilities", description: "Advanced utility types", prompt: "Create TypeScript utility types for [USE CASE]. Include: Type definitions with JSDoc, Usage examples, Edge cases, Generic constraints, Conditional types. Explain complex ones.", category: "typescript", tags: ["TypeScript", "types"] },
      { title: "Microservices Patterns", description: "Inter-service communication design", prompt: "Communication for [N] services: [LIST]. Each interaction: Sync/async, Protocol, Contracts, Error/retry, Circuit breaker, Event schema, Idempotency. Mermaid sequence diagram for main flow.", category: "architecture", tags: ["microservices", "distributed"] },
      { title: "Migration Planner", description: "Safe migration planning", prompt: "Migration plan for [MIGRATION]. Include: Pre-migration checklist, Step-by-step procedure, Data transformation, Rollback per step, Zero-downtime strategy, Verification tests, Communication plan, Timeline.", category: "operations", tags: ["migration", "operations"] },
    ],
  },
  {
    id: "ultimate",
    productId: "ed88eef6-9785-4667-9fe9-a95809540a82",
    name: "Ultimate Business Bundle",
    description: "The complete collection. 150+ prompts across marketing, development, business strategy. All packs + future updates.",
    category: "business",
    price: 4900,
    promptCount: 34,
    featured: true,
    icon: "\uD83D\uDC8E",
    prompts: [
      { title: "Business Model Canvas", description: "Complete BMC with AI", prompt: "Business Model Canvas for [IDEA]. Fill all 9 blocks: Customer Segments, Value Props, Channels, Relationships, Revenue, Resources, Activities, Partnerships, Costs. Be specific.", category: "strategy", tags: ["business model", "planning"] },
      { title: "Pitch Deck Writer", description: "Investor-ready content", prompt: "Pitch deck for [STARTUP]. Slides: Cover, Problem, Solution, Market (TAM/SAM/SOM), Product, Business Model, Traction, Team, Competition, Ask. 3-4 bullets per slide max.", category: "fundraising", tags: ["pitch deck", "investors"] },
    ],
  },
];

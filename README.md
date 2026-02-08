# Forge AI - AI Tools Platform

Production-ready Next.js 15 app with three AI-powered products:
1. **Prompt Store** - Premium AI prompt packs (one-time purchase via Polar)
2. **ContentForge** - Content generation tool (subscription SaaS)
3. **CodeForge** - Developer documentation tool (subscription SaaS)

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Convex (real-time database + serverless functions)
- **Payments:** Polar (@polar-sh/sdk)
- **AI:** OpenAI API (GPT-4o)
- **Deployment:** Vercel

## Features Implemented

### ✅ Prompt Store
- Browse premium prompt packs
- Individual pack detail pages
- Preview prompts before purchase
- Polar checkout integration
- Real, high-quality prompts (17-20 per pack)

### ✅ ContentForge
- Content generation for X, LinkedIn, Instagram, Newsletter
- Tone customization (Professional, Casual, Witty, Bold)
- Copy-to-clipboard functionality
- Real OpenAI GPT-4o integration

### ✅ CodeForge
- README generator
- Documentation generator
- Changelog creator
- Code review tool
- GitHub repo URL support
- Direct code snippet support

### ✅ UI/UX
- Dark mode design with gold (#F9C33A) accent
- Clean, Apple-style aesthetic
- Responsive layout
- shadcn/ui components
- Professional landing page

### ✅ Payments
- Polar checkout flow
- Webhook handling (ready for subscription management)
- Product IDs configured

### ✅ Security
- Input sanitization
- Server-side API keys only
- No PII exposure
- Rate limiting structure

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and fill in:
   ```
   POLAR_ACCESS_TOKEN=your_token
   OPENAI_API_KEY=your_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOY_KEY=your_deploy_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Initialize Convex**
   ```bash
   npx convex dev
   ```
   
4. **Seed Prompt Packs (in Convex dashboard)**
   Run the `seedPromptPacks` mutation once to populate prompt data

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
forge-ai/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── pricing/           # Pricing page
│   ├── prompts/           # Prompt store
│   ├── content/           # ContentForge
│   ├── code/              # CodeForge
│   └── api/               # API routes
│       ├── checkout/      # Polar checkout
│       ├── webhook/       # Polar webhooks
│       └── generate/      # AI generation
├── components/            # React components
│   └── ui/                # shadcn components
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── users.ts           # User management
│   ├── prompts.ts         # Prompt packs
│   ├── generations.ts     # AI generations
│   └── seedPromptPacks.ts # Seed data
└── lib/                   # Utilities
    ├── polar.ts           # Polar SDK
    ├── openai.ts          # OpenAI client
    └── utils.ts           # Helpers
```

## Polar Products

All product IDs are pre-configured in `lib/polar.ts`:

| Product | ID | Price |
|---------|-----|-------|
| Marketing Pack | `2d59331b...` | $19 |
| Developer Pack | `c5f1da9f...` | $29 |
| Ultimate Bundle | `ed88eef6...` | $49 |
| ContentForge Pro | `05100fad...` | $9/mo |
| ContentForge Business | `0062fcd6...` | $29/mo |
| CodeForge Pro | `eceed797...` | $12/mo |

## API Routes

- `POST /api/generate/content` - Generate social media content
- `POST /api/generate/code` - Generate documentation/README
- `GET /api/checkout` - Create Polar checkout session
- `POST /api/webhook/polar` - Handle Polar webhooks

## Next Steps

1. **Deploy to Vercel**
   - Connect GitHub repo
   - Add environment variables
   - Deploy

2. **Configure Polar Webhooks**
   - Add webhook URL: `https://your-domain.com/api/webhook/polar`
   - Enable events: `checkout.completed`, `subscription.active`, `subscription.cancelled`

3. **Set up Convex Production**
   - Run `npx convex deploy`
   - Update `NEXT_PUBLIC_CONVEX_URL` with production URL

4. **Optional Enhancements**
   - Add authentication (Convex Auth or NextAuth)
   - Implement rate limiting with Redis
   - Add generation history pages
   - Create user dashboard
   - Add email notifications

## Notes

- All AI generation uses GPT-4o for best quality
- Prompt packs contain real, production-ready prompts
- Security: No API keys exposed to client
- Input sanitization on all user inputs
- Webhook signature verification ready (needs POLAR_WEBHOOK_SECRET)

## License

MIT

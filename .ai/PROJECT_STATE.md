# OpenClaw Project State

**Last Updated:** 2026-02-03
**Status:** Live on Vercel

---

## PROJECT OVERVIEW

**Name:** OpenClaw AI Survival Guide
**Description:** Battle-tested guide for running DeepSeek R1 locally with OpenClaw
**Goal:** Help developers avoid OOM errors and successfully run local LLMs

**Deployed URLs:**
- Production (DNS issues): https://openclaw-ai.org
- Vercel URL (working): https://openclaw-landing.vercel.app
- GitHub: https://github.com/hoskingxxx/openclaw-landing

---

## TECH STACK

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19.2.4, Tailwind CSS 3.4.17
- **Components:** Shadcn UI (in `components/ui/`)
- **Icons:** Lucide React
- **Theme:** Dark mode first, orange/red brand colors (#FF4500)

### Content
- **Format:** MDX for blog posts
- **Processing:** gray-matter, remark, remark-html
- **Location:** `content/posts/*.mdx`

### SEO Infrastructure
- `app/robots.ts` - Robots.txt generator
- `app/sitemap.ts` - Dynamic sitemap with blog posts
- `app/icon.tsx` - Favicon generator
- `app/apple-icon.tsx` - iOS icon
- `app/manifest.ts` - PWA manifest
- Breadcrumb schema on guide pages

### Analytics
- Umami Analytics (ID: 5db90e55-9103-490f-8df0-9636a84942c8)
- Google Search Console verified

---

## CURRENT PAGES/ROUTES

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | ✅ Home |
| `/guides` | `app/guides/page.tsx` | ✅ Guide listing |
| `/guides/[slug]` | `app/guides/[slug]/page.tsx` | ✅ Dynamic guides |
| `/docs` | `app/docs/page.tsx` | ✅ Documentation |
| `/faq` | `app/faq/page.tsx` | ✅ FAQ |
| `/troubleshooting` | `app/troubleshooting/page.tsx` | ✅ Troubleshooting |
| `/oom` | `app/oom/page.tsx` | ✅ OOM help |
| `/quick-start` | `app/quick-start/page.tsx` | ✅ Quick start |
| `/resources` | `app/resources/page.tsx` | ✅ Resources |

---

## CONTENT LIBRARY

### Blog Posts (in `lib/blog.ts`)

| Slug | Title | Date | Category |
|------|-------|------|----------|
| `how-to-use-deepseek-with-openclaw` | Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide | 2026-02-01 | Tutorial |

**Total Posts:** 1

### Content Files (in `content/posts/`)
- `how-to-use-deepseek-with-openclaw.mdx`

---

## KEY FILES TO KNOW

| File | Purpose |
|------|---------|
| `lib/blog.ts` | Blog post metadata (SSOT) |
| `lib/content.ts` | FAQ and other content data |
| `app/layout.tsx` | Root layout with global metadata |
| `app/globals.css` | Global styles with mobile-first rules |
| `next.config.mjs` | Next.js config (minimal - no redirects) |
| `components/SEO/StructuredData.tsx` | Schema.org components |

---

## KNOWN ISSUES

1. **DNS Configuration:** Domain `openclaw-ai.org` points to wrong IPs (Heroku instead of Vercel)
   - Vercel URL works: https://openclaw-landing.vercel.app
   - Need to update DNS to point to `cname.vercel-dns.com`

2. **Redirect Loop (FIXED):** Previously had infinite redirect due to trailing slash rules
   - Resolved by simplifying `next.config.mjs`
   - Hardcoded `FEATURED_POST_PATH` in `app/page.tsx`

---

## SEO KEYWORDS TARGETING

### Primary Focus
- DeepSeek R1
- OpenClaw configuration
- Local LLM setup
- CUDA OOM errors
- VRAM requirements
- torch.cuda.OutOfMemoryError

### Long-tail Keywords
- "DeepSeek R1 crash"
- "OpenClaw OOM"
- "Ollama crash"
- "MPS out of memory"

---

## DEPLOYMENT

- **Platform:** Vercel (auto-deploy on push to main)
- **Build:** `npm run build`
- **Validate:** `npm run validate`
- **Branch:** main

---

## NEXT STEPS (from TASK_BOARD.md)

1. Create more content targeting long-tail DeepSeek keywords
2. Fix DNS for openclaw-ai.org domain
3. Add "OpenClaw security" content

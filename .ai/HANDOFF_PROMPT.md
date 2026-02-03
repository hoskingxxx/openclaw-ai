# AI Handoff Prompt

**Copy and paste this when switching to Gemini, ChatGPT, or another AI:**

---

## Context: OpenClaw Project Handoff

I'm working on the **OpenClaw AI Survival Guide** - a Next.js 14 website that helps developers run DeepSeek R1 locally without OOM errors.

### Please Read These Files First:
1. `.ai/PROTOCOL.md` - Rules for working on this project
2. `.ai/PROJECT_STATE.md` - Current tech stack and pages
3. `.ai/DECISIONS.md` - Strategic and technical decisions made
4. `.ai/TASK_BOARD.md` - Current to-do list

### Quick Overview:
- **Framework:** Next.js 14 (App Router), Tailwind CSS, React 19
- **Deployed:** https://openclaw-landing.vercel.app
- **GitHub:** https://github.com/hoskingxxx/openclaw-landing
- **Theme:** Dark mode, orange brand (#FF4500), "survivor/hacker" aesthetic

### Key Files:
- `lib/blog.ts` - Blog post metadata (SSOT)
- `app/guides/[slug]/page.tsx` - Dynamic guide pages
- `content/posts/*.mdx` - Blog content
- `app/robots.ts` - Robots.txt generator
- `app/sitemap.ts` - Sitemap generator

### Important Rules:
1. **NEVER hallucinate files** - verify existence before referencing
2. Blog posts use `/guides` route (not `/blog`)
3. All new content must be added to `lib/blog.ts`
4. Run `npm run validate` before deploying

### Current Task:
[Describe what you need help with here]

---

## After Reading the .ai Files:

**Please confirm you understand:**
1. The project structure and tech stack
2. What task you're being asked to do
3. Any questions before proceeding

**Do NOT:**
- Suggest creating files that already exist
- Assume routes work without checking
- Ignore the coding standards in PROTOCOL.md

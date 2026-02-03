# OpenClaw Task Board

**Last Updated:** 2026-02-03

---

## 🔴 HIGH PRIORITY

### Fix DNS Configuration
- **Issue:** Domain `openclaw-ai.org` points to wrong IPs (64.29.17.1, 216.198.79.1)
- **Action:** Update DNS to point to `cname.vercel-dns.com`
- **Status:** BLOCKED - User needs to update at domain registrar
- **Impact:** Site not accessible via main domain

### Create "OpenClaw Security" Content
- **Type:** New guide/article
- **Keywords:** "OpenClaw security", "local AI security", "private LLM"
- **Action Items:**
  - [ ] Add entry to `lib/blog.ts`
  - [ ] Create `content/posts/openclaw-security.mdx`
  - [ ] Run `npm run validate`
- **Status:** TODO

### Create More DeepSeek R1 Content
- **Type:** Multiple guides targeting long-tail keywords
- **Topics:**
  - "DeepSeek R1 vs other models"
  - "DeepSeek R1 quantization guide"
  - "DeepSeek R1 on Mac M1/M2/M3"
  - "DeepSeek R1 CUDA errors explained"
- **Status:** TODO

---

## 🟡 NEXT UP

### Add Internal Linking
- **Action:** Add related posts section to guide pages
- **File:** `app/guides/[slug]/page.tsx`
- **Status:** TODO

### Improve Mobile Experience
- **Action:** Test all pages on mobile viewport
- **Focus:** Code blocks, tables, navigation
- **Status:** MOSTLY DONE (CSS has overflow rules)

### Add Table of Contents to Guides
- **Action:** Auto-generate TOC from headings
- **File:** `app/guides/[slug]/page.tsx`
- **Status:** TODO

---

## 🟢 BACKLOG

### Add Search Functionality
- **Type:** Feature
- **Options:** Algolia, Pagefind, or custom
- **Status:** BACKLOG

### Add Comments
- **Type:** Feature
- **Options:** giscus, Disqus, or custom
- **Status:** BACKLOG

### Create Newsletter
- **Type:** Feature
- **Action:** Decide on provider (Resend, ConvertKit, etc.)
- **Status:** BACKLOG

### Add Reading Time Estimates
- **Action:** Calculate and display reading time
- **File:** `app/guides/[slug]/page.tsx`
- **Status:** BACKLOG

---

## ✅ COMPLETED

### Fix Redirect Loop (2026-02-03)
- **Issue:** Infinite redirect on deployed site
- **Fix:** Simplified `next.config.mjs`, hardcoded paths
- **Status:** ✅ DONE

### Add Crawler Infrastructure (2026-02-03)
- **Items:**
  - ✅ robots.ts
  - ✅ sitemap.ts
  - ✅ icon.tsx
  - ✅ apple-icon.tsx
  - ✅ manifest.ts
- **Status:** ✅ DONE

### Implement SEO Infrastructure (2026-02-03)
- **Items:**
  - ✅ Breadcrumb schema
  - ✅ Article schema
  - ✅ FAQ schema
  - ✅ Canonical URLs
  - ✅ Open Graph metadata
- **Status:** ✅ DONE

### Fix Mobile Overflow Issues (2026-02-02)
- **Issue:** Code blocks overflowing on mobile
- **Fix:** Added global CSS rules for overflow
- **Status:** ✅ DONE

---

## 🚫 BLOCKED

### Fix openclaw-ai.org DNS
- **Blocker:** User needs to update DNS at domain registrar
- **Impact:** Main domain not accessible
- **Workaround:** Use https://openclaw-landing.vercel.app

---

## 📊 METRICS TO TRACK

- [ ] Google Search Console impressions/clicks
- [ ] Umami analytics page views
- [ ] 404 error rate (target: <5%)
- [ ] Core Web Vitals (LCP, FID, CLS)

---

## 💡 IDEAS

### Content Ideas
- "OpenClaw for specific use cases" (coding, writing, research)
- "Model comparison: DeepSeek R1 vs Llama 3 vs Mistral"
- "Cost analysis: local vs API LLMs"
- "OpenClaw + specific tools" (Obsidian, VS Code, etc.)

### Feature Ideas
- Model compatibility checker
- VRAM calculator
- Dark/light mode toggle
- Print-friendly CSS
- PDF export for guides

---

## NOTES

- All content changes require updating `lib/blog.ts`
- Run `npm run validate` before deploying
- Vercel auto-deploys on push to `main`

# OpenClaw Site Architecture Snapshot

> **Generated:** 2026-02-05
> **Purpose:** Single-source truth for site structure, routing, content, and rendering pipeline.
> **When to update:** After adding routes, changing MDX pipeline, or modifying analytics.

---

## 1) Route Map (路由地图)

### Static Routes (SSG)
| Route | File Path | Render Type | Notes |
|-------|-----------|-------------|-------|
| `/` | `app/page.tsx` | Static | Homepage with hero + Vultr CTA |
| `/guides` | `app/guides/page.tsx` | Static | Guide listing page |
| `/guides/[slug]` | `app/guides/[slug]/page.tsx` | SSG (`generateStaticParams`) | **MDX renderer** - main content route |
| `/faq` | `app/faq/page.tsx` | Static | FAQ page |
| `/resources` | `app/resources/page.tsx` | Static | External resources |
| `/troubleshooting` | `app/troubleshooting/page.tsx` | Static | Troubleshooting landing + VRAM trap |
| `/docs` | `app/docs/page.tsx` | Static | Docs index |
| `/quick-start` | `app/quick-start/page.tsx` | Static | Quick start guide |
| `/oom` | `app/oom/page.tsx` | Static | OOM error redirect target |
| `/tools/recommended-setup` | `app/tools/recommended-setup/page.tsx` | Static | Tools page |

### Redirects (301)
| Source | Destination | Config Location |
|--------|-------------|-----------------|
| `/blog/:slug*` | `/guides/:slug*` | `next.config.mjs` |

### Dynamic Generation
- `/guides/[slug]` uses `generateStaticParams()` from `lib/blog.ts` -> `blogPosts` array
- All 15 posts are pre-rendered at build time

---

## 2) Content Map (内容来源)

### Directory Structure
```
content/
└── posts/                           # ALL guides live here (NOT content/guides)
    ├── openclaw-security-rce-cve-2026-25253.mdx
    ├── how-to-use-deepseek-with-openclaw.mdx
    ├── fix-openclaw-json-mode-errors.mdx
    ├── fix-openclaw-cuda-oom-errors.mdx
    ├── fix-openclaw-slow-inference.mdx
    ├── fix-openclaw-spawn-npm-enoent.mdx
    ├── fix-openclaw-spawn-npm-enoent-windows.mdx
    ├── fix-openclaw-spawn-einval-windows.mdx
    ├── fix-openclaw-docker-eacces-permission-denied.mdx
    ├── fix-openclaw-cannot-find-module-clipboard-linux-arm.mdx
    ├── fix-openclaw-install-ps1-npm-enoent-windows.mdx
    ├── fix-openclaw-package-json-missing-openclaw-extensions.mdx
    ├── openclaw-error-index.mdx
    ├── hardware-requirements-reality-check.mdx
    └── openclaw-agent-api-cost-model.mdx
```

### Content Source of Truth
**File:** `lib/blog.ts`
- Defines `blogPosts` array with metadata for ALL posts
- Each post has: `slug`, `title`, `description`, `date`, `author`, `tags`, `category`, `featured`, `seoKeywords`, `canonicalPath`
- `canonicalPath` is AUTO-GENERATED: `createCanonicalPath(slug)` → `/guides/${slug}`
- Build-time validation checks for dead links

### MDX Frontmatter Schema
```yaml
---
title: "Post Title"
description: "Meta description for SEO"
date: "YYYY-MM-DD"
author: "LazyDev"
tags: ["tag1", "tag2"]
category: "Troubleshooting"  # or "Tutorial", "Security"
featured: false              # true for featured post
seoKeywords: ["keyword1", "keyword2"]
---
```

**IMPORTANT:** MDX files in `content/posts/` are matched to `blogPosts` entries by `slug`. If you add a new MDX file, you MUST add corresponding entry to `lib/blog.ts`.

---

## 3) Rendering Pipeline (MDX 渲染链路)

### File: `app/guides/[slug]/page.tsx`

### Unified/Remark/Rehype Pipeline (Current)
```typescript
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

// Custom sanitize schema - WHITELIST approach
const schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "a", "strong", "em", "code", "blockquote",
    "p", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "hr", "br", "div", "span",
    "table", "thead", "tbody", "tr", "td", "th", "pre",
  ],
  attributes: {
    ...(defaultSchema.attributes || {}),
    a: [
      "href", "title", "target", "rel",
      // Umami tracking attributes (ALLOWED)
      "data-umami-event",
      "data-umami-event-post",
      "data-umami-event-placement",
      "data-umami-event-cta-id",
      "data-umami-event-ref",
      "data-umami-event-utm_content",
      "data-umami-event-verdict",
    ],
    "*": ["className"],  // For styled components
  },
  protocols: {
    ...(defaultSchema.protocols || {}),
    href: ["http", "https"],
  },
};

// Processing pipeline
const processedContent = await remark()
  .use(remarkGfm)                              // GitHub Flavored Markdown
  .use(remarkRehype, { allowDangerousHtml: false })  // Convert MD to HTML AST
  .use(rehypeSanitize, schema)                 // XSS protection (WHITELIST)
  .use(rehypeExternalLinks, {                  // Auto-inject target/rel
    target: "_blank",
    rel: ["nofollow", "noopener", "noopener noreferrer"],
  })
  .use(rehypeStringify)                        // Convert AST back to HTML string
  .process(content);
```

### Pipeline Settings Summary
| Setting | Value | Notes |
|---------|-------|-------|
| `allowDangerousHtml` | `false` | Raw HTML in MDX is **SANITIZED**, not passed through |
| `rehypeRaw` | **NOT USED** | DO NOT use - causes build errors |
| `rehypeSanitize` | **ENABLED** | Whitelist schema for security |
| `rehypeExternalLinks` | **ENABLED** | Auto-adds `target="_blank"` + `rel="nofollow noopener noreferrer"` |
| `rehypeSlug` | Not used | Heading IDs are MANUAL in MDX (e.g., `<div id="group-1">`) |
| `rehypeAutolinkHeadings` | Not used | No auto-anchor links on headings |

### MDX Link Syntax Rules
- ✅ **DO:** `[Text](https://example.com)` - pure Markdown
- ❌ **DON'T:** `<a href="...">Text</a>` - HTML tags will be sanitized/stripped

---

## 4) Navigation / TOC (目录与锚点策略)

### Quick Navigation (Error Index)
**File:** `content/posts/openclaw-error-index.mdx`
- **Manual MDX** - NOT auto-generated
- Uses anchor links to manual IDs: `[*Group 1*](#group-1)`
- Section IDs are manual `<div id="group-1" className="scroll-mt-20"></div>`

### Breadcrumbs
**Component:** `components/features/Breadcrumbs.tsx`
- **Props-driven** - NOT auto-generated from path
- Used in `app/guides/[slug]/page.tsx`:
  ```tsx
  <Breadcrumbs
    items={[
      { label: "Guides", href: "/guides" },
      { label: post.title, href: post.canonicalPath },
    ]}
  />
  ```

### Hash Link Scrolling
- **No special handling** - relies on browser default behavior
- `scroll-mt-20` class adds top offset for sticky header
- Next.js `<Link>` does NOT intercept hash links

### Table of Contents (TOC)
- **NOT IMPLEMENTED** - no auto-generated TOC component
- All section navigation is manual MDX

---

## 5) Global Components (全站注入)

### Root Layout
**File:** `app/layout.tsx`
```tsx
<html lang="en">
  <head>
    {/* Structured Data */}
    <WebSiteStructuredData />
    <SoftwareStructuredData />
    <FAQStructuredData />

    {/* Umami Analytics */}
    <script defer src="https://analytics.umami.is/script.js"
            data-website-id="5db90e55-9103-490f-8df0-9636a84942c8" />
  </head>
  <body>
    <NextTopLoader color="#FF4500" />
    {children}  {/* No persistent nav/footer here */}
  </body>
</html>
```

### Per-Page Components
Each page component adds its own:
- **Navigation:** `<Navigation />` - added in every page component (NOT in layout)
- **Footer:** `<Footer />` - added in every page component (NOT in layout)
- **Breadcrumbs:** Only on guide pages

### Conditional Rendering by Route
- **RealityCheck:** Only on `hardware-requirements-reality-check` and `fix-openclaw-install-ps1-npm-enoent-windows`
  ```tsx
  {(post.slug === "hardware-requirements-reality-check" || post.slug === "fix-openclaw-install-ps1-npm-enoent-windows") && <RealityCheck />}
  ```
- **Article Bottom CTA:** On all guide pages (hardcoded in `app/guides/[slug]/page.tsx`)

### CTA Locations
| Location | Component | Placement |
|----------|-----------|-----------|
| Hero | `app/page.tsx` | Top of homepage |
| Stop Debugging Box | `components/stop-debugging-cta.tsx` | Embedded in content |
| Sticky Banner | `components/sticky-cta.tsx` | Fixed bottom (guide pages) |
| VRAM Calculator | `components/tools/vram-calculator.tsx` | Embedded in content |
| Reality Check | `components/RealityCheck.tsx` | Specific posts only |
| Troubleshooting Page | `app/troubleshooting/page.tsx` | Inline CTAs |

---

## 6) Analytics (Umami 埋点)

### Umami Setup
**Site ID:** `5db90e55-9103-490f-8df0-9636a84942c8`
**Script Location:** `app/layout.tsx` (global, deferred)

### Event Naming Convention
All Vultr CTA clicks use:
```tsx
data-umami-event="vultr_click"
data-umami-event-post="{post_slug}"          // or "homepage", "troubleshooting"
data-umami-event-placement="{location}"       // hero_section, reality_check, sticky_banner, etc.
data-umami-event-cta-id="{unique_id}"         // hero_rent_gpu_button, rc_unsafe_button, etc.
data-umami-event-ref="9863490"                // Vultr affiliate ID
data-umami-event-utm_content="{context}"      // hero_section, article_link, etc.
data-umami-event-verdict="{verdict}"          // "safe", "unsafe", etc. (RealityCheck only)
```

### Event Tracking Locations
| Component | File | Placement | CTA ID |
|-----------|------|-----------|--------|
| Homepage | `app/page.tsx` | hero_section | hero_rent_gpu_button |
| Guide Articles | `app/guides/[slug]/page.tsx` | MDX content | From markdown links |
| Reality Check | `components/RealityCheck.tsx` | reality_check | rc_{verdict}_button |
| Stop Debugging | `components/stop-debugging-cta.tsx` | stop_debugging_box | stop_debugging_button |
| Sticky CTA | `components/sticky-cta.tsx` | sticky_banner | sticky_deploy_button |
| VRAM Calculator | `components/tools/vram-calculator.tsx` | vram_calc | vram_calc_{status}_button |
| Troubleshooting | `app/troubleshooting/page.tsx` | low_vram_trap, page_cta | trap_rent_gpu_button, page_deploy_button |

### Vultr Affiliate Link Format
```
https://www.vultr.com/?ref=9863490&utm_source=openclaw&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

| Parameter | Value | Notes |
|-----------|-------|-------|
| `ref` | `9863490` | **REQUIRED** - affiliate ID |
| `utm_source` | `openclaw` | Fixed |
| `utm_medium` | `content`, `error_index`, etc. | Varies by placement |
| `utm_campaign` | `hardware-requirements-reality-check`, `bottom_intercept`, etc. | Post-specific |
| `utm_content` | `hero_section`, `article_link`, `reality_check`, etc. | Location-specific |

---

## 7) One-liners for Debug (排查命令)

### Find Vultr affiliate links (ref=9863490)
```bash
rg "ref=9863490" --type mdx --type tsx
```

### Find old GitHub Code Search links (should return nothing)
```bash
rg "github\.com/search\?q=repo%3Am1heng%2Fopenclaw\+issues" --type mdx && exit 1 || echo "✅ No old code search links found"
```

### Check for HTML `<a>` tags in MDX (should return nothing)
```bash
rg "<a\s+href=" content/posts/ --type mdx && exit 1 || echo "✅ No HTML links in MDX"
```

### Verify all posts have corresponding content files
```bash
node -e "const {blogPosts} = require('./lib/blog.ts'); const fs = require('fs'); blogPosts.forEach(p => { const path = \`content/posts/\${p.slug}.mdx\`; if (!fs.existsSync(path)) console.log('MISSING:', path); });"
```

### Count Vultr links in production build
```bash
npm run build && rg 'href="https://www.vultr.com/\?ref=9863490' .next/server/app -c | tail -1
```

### Check Umami event attributes
```bash
rg "data-umami-event" --type tsx --type mdx -A 1
```

### Verify MDX frontmatter completeness
```bash
rg "^---$" content/posts/ -A 10 | rg -E "title|description|date|author|tags|category"
```

---

## Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Next.js config (redirects, page extensions) |
| `lib/blog.ts` | **Single source of truth** for all post metadata |
| `lib/site-config.ts` | Navigation links, footer links, site info |
| `app/layout.tsx` | Root layout, global analytics |
| `app/guides/[slug]/page.tsx` | **MDX rendering pipeline** |
| `components/features/Navigation.tsx` | Header nav (client component) |
| `components/features/Footer.tsx` | Footer (server component) |
| `components/features/Breadcrumbs.tsx` | Breadcrumb navigation |

---

## Common Issues & Fixes

### Issue: Vultr links not clickable
**Cause:** HTML `<a>` tags in MDX are being sanitized
**Fix:** Convert to markdown: `[Text](url)`
**Location:** Check `app/guides/[slug]/page.tsx` for `rehypeSanitize` schema

### Issue: Build fails with "Cannot compile blockquote"
**Cause:** Using `rehypeRaw` with `remarkHtml`
**Fix:** Use `remarkRehype` instead, do NOT use `rehypeRaw`

### Issue: New post not appearing
**Cause:** Added MDX file but forgot to update `lib/blog.ts`
**Fix:** Add entry to `blogPosts` array with matching `slug`

### Issue: Umami events not firing
**Cause:** Missing `data-umami-event` attributes or wrong format
**Fix:** Ensure all 6 attributes are present on the `<a>` tag

---

## Quick Reference: Post Metadata Flow

```
1. Create MDX file: content/posts/my-post.mdx
2. Add frontmatter: title, description, date, etc.
3. Update lib/blog.ts: Add entry to blogPosts array
4. Build runs: generateStaticParams() creates /guides/my-post
5. Page renders: MDX processed through remark/rehype pipeline
6. HTML output: Sanitized, external links get target/rel
```

---

**END OF SNAPSHOT**

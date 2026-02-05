# OpenClaw Project Rules & Protocol

**Last Updated:** 2026-02-05
**Version:** 2.0

---

## MANDATORY FIRST STEP

**Before ANY work, you MUST:**

1. Read `.ai/STATE.md` - Current project state
2. Read `.ai/DECISIONS.md` - Strategic decisions made
3. Check `lib/blog.ts` - Single source of truth for content
4. **NEVER hallucinate** - Verify files exist before referencing

---

## CORE CONSTRAINTS

### Content
- ✅ Static content only (no user accounts, no databases)
- ✅ No SaaS features (focus on education/authority)
- ✅ "Survivor" tone (write for developers who crashed systems)
- ✅ Honest, technical, no exaggerated claims

### Monetization
- ✅ Vultr affiliate: `https://www.vultr.com/?ref=9863490`
- ✅ CTA: "Deploy on Vultr (Limited Time Offer)"
- ❌ No hardcoded amounts ($100, etc.)
- ❌ No sponsored content without disclosure

### Technical
- ✅ Server Components by default
- ✅ Semantic HTML, mobile-first
- ✅ No "any" types in TypeScript
- ✅ Semantic CSS variables only (`bg-background`, `text-primary`)

---

## PROJECT STRUCTURE

```
app/
├── guides/[slug]/page.tsx  # Dynamic article pages
├── (static pages)/page.tsx
├── layout.tsx
├── robots.ts / sitemap.ts   # SEO
└── icon.*                   # Favicon

components/
├── ui/                      # Dumb components (Button, Input)
├── features/                # Feature components (Hero, Footer)
└── SEO/                     # Schema components

lib/
├── blog.ts                  # Blog metadata (SSOT)
└── content.ts               # FAQ data

content/posts/               # MDX article files
```

---

## CONTENT WORKFLOW

**When creating a new article:**

1. Add entry to `lib/blog.ts` (APPEND ONLY)
2. Create `content/posts/your-slug.mdx`
3. Run `npm run validate`
4. Update `.ai/STATE.md` content count

**Metadata Format:**
```typescript
{
  slug: "your-slug",
  canonicalPath: "/guides/your-slug",
  title: "Your Title",
  description: "Meta description",
  date: "2026-02-05",
  author: "LazyDev",
  tags: ["tag1", "tag2"],
  category: "Troubleshooting",
  featured: false,
  seoKeywords: ["keyword1", "keyword2"],
}
```

---

## SEO RULES

- **Route prefix:** `/guides` (NOT `/blog`)
- **Internal links:** Use `canonicalPath` from `lib/blog.ts`
- **ZERO 404 Policy:** All links must work before pushing
- **Schema:** BreadcrumbList, Article, FAQPage, WebSite, SoftwareApplication

---

## DEPLOYMENT CHECKLIST

**BEFORE `git push`:**
1. Run `npm run validate` (must pass)
2. Run `npm run check:links` (zero failures)
3. Verify no broken internal links
4. Update relevant `.ai/` files

---

## PROHIBITED

❌ Hallucinating files or routes
❌ Assuming something exists without checking
❌ Using "any" types
❌ Arbitrary color values
❌ Creating `/blog/` routes (use `/guides`)
❌ Publishing `.ai/` files to public
❌ Hardcoded internal links (use `canonicalPath`)

---

## FILES TO UPDATE AFTER WORK

| Action | File |
|--------|-------|
| New page | STATE.md |
| New article | STATE.md, lib/blog.ts |
| Strategic decision | DECISIONS.md |
| Completed task | TASK_BOARD.md |

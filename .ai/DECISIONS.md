# OpenClaw Project Decisions Log

**Last Updated:** 2026-02-05

---

## STRATEGIC DECISIONS

### Profit-First Pivot (2026-02-03)
**Decision:** Stop building complex systems, focus on traffic and monetization
**Rationale:**
- VPS affiliate links offer immediate monetization path
- Content marketing faster than building SaaS features
- Validate business model before further investment

### AEO-First Approach (2026-02-03)
**Decision:** Pivot to Answer Engine Optimization instead of traditional SEO
**Rationale:**
- Google AI Overviews are becoming dominant
- Users want direct answers, not just links
- FAQ structured data helps AI extract answers
- "Survivor" tone matches the audience (people who broke things)

### DeepSeek R1 Long-tail Focus (2026-02-03)
**Decision:** Focus content on DeepSeek R1 specific problems
**Rationale:**
- DeepSeek R1 is trending (Feb 2026)
- High intent users searching for crash fixes
- Less competition than general "AI" keywords
- Target error messages: "torch.cuda.OutOfMemoryError", "MPS out of memory"

### No SaaS Yet (2026-02-01)
**Decision:** Focus on content/education first, delay SaaS monetization
**Rationale:**
- Build authority first
- Understand user pain points through content
- SaaS can come later once we know what features matter

---

## CONTENT DECISIONS

### /guides Route (Not /blog)
**Decision:** Use `/guides` instead of `/blog` for content
**Rationale:**
- "Guides" sounds more helpful than "blog"
- Better for user intent
- Matches the "survival guide" theme

### "Survivor/Hacker" Aesthetic
**Decision:** Dark theme, orange accents, terminal vibes
**Rationale:**
- Target audience (developers who crashed)
- Stands out from generic SaaS sites
- Matches the OpenClaw brand

### "Resource Mismatch" Mother Motif (2026-02-04)
**Decision:** All content reinforces "OpenClaw assumes infinite resources"
**Rationale:**
- Every error (OOM, Slow, Crash) is a symptom of Resource Mismatch
- Every security issue is a symptom of Trust Mismatch
- We advocate for correct architecture, not band-aid fixes

### "Trust Trio" Content Format (2026-02-05)
**Decision:** Standardize troubleshooting article structure
**Format:**
1. The Log - Real error output
2. The Physics - Why it happens
3. The Fix - Step-by-step solution
4. The Sell - VPS as correct architecture

### Clickbait Title Strategy (2026-02-04)
**Decision:** Update article titles for higher US CTR
**Rationale:**
- US CTR was low (1.7%) with descriptive titles
- Format: "Problem: The Comparison/Hook"
- Keep frontmatter descriptive for SEO

---

## MONETIZATION DECISIONS

### Vultr Partnership (2026-02-05)
**Decision:** Standardize on Vultr as primary VPS affiliate
**Rationale:**
- Single affiliate ID (9863490) across all content
- Consistent CTA format
- Removed hardcoded amounts to avoid compliance issues

### "Engineering Rule of Thumb" (2026-02-05)
**Decision:** Add "2+ errors = switch to VPS" rule to error index
**Rationale:**
- Users hitting multiple environment errors are in "debugging hell"
- Clear decision rule: stop debugging, use VPS
- Positions VPS as "correct architecture" not "giving up"

### Affiliate Link Placement (2026-02-03)
**Decision:** Affiliate recommendations go AFTER technical solution
**Rationale:**
- Build trust first with real fixes
- Position as technical recommendation, not sales pitch
- Never push before showing solution

---

## SEO DECISIONS

### AEO > Traditional SEO (2026-02-03)
**Decision:** Optimize for AI Overviews, not just crawlers
**Changes:**
- Direct answers in first paragraph
- Question-based H1 titles
- FAQ structured data on all pages

### Long-tail Keyword Strategy
**Focus:** "OpenClaw [specific error]" format
**Examples:**
- "OpenClaw spawn npm ENOENT"
- "OpenClaw CUDA out of memory"
- "OpenClaw JSON parsing failed"

---

## BRANDING DECISIONS

### "LazyDev" Author Name
**Decision:** Use "LazyDev" as author instead of real name
**Rationale:**
- Matches the survivor/hacker tone
- Relatable to target audience
- Can be changed later

### "OpenClaw Hub" Publisher
**Decision:** Use "OpenClaw Hub" as organization name
**Rationale:**
- Sounds like a community resource
- Not tied to individual
- Professional enough for search engines

---

## CONTENT CLUSTER DECISIONS (2026-02-05)

### Troubleshooting Cluster Architecture
**Decision:** Organize content into interconnected clusters
**Clusters:**
- **Windows:** install.ps1 → ENOENT → EINVAL (progressive failure)
- **Docker/Linux:** EACCES → ARM Clipboard (platform issues)
- **Performance:** OOM → Slow → JSON (hardware limits)
- **Plugin:** metadata → install errors (ecosystem issues)
- **Index:** Master dictionary linking to all

**Rationale:**
- Cross-link all articles within clusters
- Error index serves as cluster hub
- Users can follow error progression

---

## UX DECISIONS

### Troubleshooting CTA at Footer (2026-02-05)
**Decision:** Add high-converting CTA card to `/troubleshooting` page
**Design:**
- Orange border (#FF4500) for visibility
- Text: "Still broken?" → emotional resonance
- Targets frustrated users who scrolled entire page

### Offline Install Method (2026-02-05)
**Decision:** Add manual .tgz installation method for Windows
**Rationale:**
- Some Windows environments can't be fixed
- Nuclear option for stubborn PATH/permission issues
- Bypasses spawn problems entirely

---

## REVERSED DECISIONS

### ~~Trailing Slash Removal~~ (2026-02-03)
**Originally:** Remove trailing slashes via redirects
**Reversed:** Was causing redirect loops
**Resolution:** Let Next.js handle defaults

---

## FORMAT STANDARDS (2026-02-05)

### Affiliate Link Format
```
[Deploy on Vultr (Limited Time Offer)](https://www.vultr.com/?ref=9863490)
```

### CLI Command Standards
- Use official CLI: `openclaw plugins install`
- Show full command with flags
- Include verification steps

### GitHub Link Format
```
https://github.com/search?q=repo%3Am1heng%2Fopenclaw+issues
```
- Use search queries (more resilient than direct issue links)

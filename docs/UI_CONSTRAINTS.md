# UI Constitution - Minimum Rendering Constraints (P0.5)

**Effective**: 2026-02-06
**Status**: Non-negotiable constraints for /guides/* pages
**Version**: 1.0

---

## Core Principle

> **Single Authority Pattern**:
> - ONE width authority: `ContentRail` (960px, no padding)
> - ONE edge authority per page: `ContentEdge` (px-4 sm:px-6 padding)
> - ONE prose override: `max-width: none !important`

---

## Constraint 1: MDX Content Rules

### Forbidden: Naked HTML in MDX Files

**Prohibited patterns in `/content/posts/*.mdx`:**

| Pattern | Example | Fix |
|---------|---------|-----|
| `<div class="...">` | `<div class="glass-card">` | Create component or use markdown |
| `<a href="...">` | `<a href="/link">text</a>` | Use `[text](/link)` markdown |
| `<span class="...">` | `<span class="badge">` | Create component |
| Inline styles | `<div style="color: red">` | Use component with className |

**Allowed MDX patterns:**

```tsx
// ✅ Component imports at top of file
import RealityCheck from "@/components/RealityCheck";
import SecondaryExitButton from "@/components/SecondaryExitButton";

// ✅ Component usage
<RealityCheck />
<SecondaryExitButton href="...">Button Text</SecondaryExitButton>

// ✅ Markdown links
[Link text](/path/to/page)
[External link](https://example.com)

// ✅ Standard markdown
## Heading
**Bold**, *italic*, `code`

// ✅ Code blocks
```bash
npm install
```

// ✅ Tables
| Column 1 | Column 2 |
|----------|----------|
| Data     | More data |
```

**Rationale:** Raw HTML in MDX bypasses rehype-sanitize and cannot be controlled via CSS variables. Components provide type safety, tracking hooks, and centralized styling.

---

## Constraint 2: CSS Scope Rules

### Forbidden: Block-Layout-Affecting Universal Rules

**Prohibited in `/app/globals.css`:**

```css
/* ❌ FORBIDDEN: Universal selectors with layout properties */
div, span {
  max-width: 100%;  /* Breaks flex/grid layout */
}

/* ❌ FORBIDDEN: Universal width constraints */
* {
  width: 100%;
}

/* ❌ FORBIDDEN: Global margin/padding on elements */
p, span, a {
  margin: 1rem;
}
```

**Required: Scoped rules only**

```css
/* ✅ ALLOWED: Scoped to specific contexts */
.prose p, .prose li, .prose td {
  overflow-wrap: anywhere;  /* Text safety only, not layout */
}

/* ✅ ALLOWED: Explicit class targeting */
.glass-card {
  width: 100%;  /* Within known container */
}

/* ✅ ALLOWED: Flex/Grid child fixes */
.flex > * {
  min-width: 0;  /* Prevent overflow in flex containers */
}
```

**Rationale:** Universal layout rules break component composition. Scoped rules preserve layout predictability.

---

## Constraint 3: Link Style Guarantee

### Required: Unified Blue Link Token

**All prose links MUST render blue:**

```css
/* app/globals.css - REQUIRED */
.prose a {
  color: #60a5fa !important;
}

.prose a:hover {
  color: #93c5fd !important;
  text-decoration: underline;
}
```

**Verification via DevTools:**
1. Inspect any link inside `.prose`
2. Computed color must be `rgb(96, 165, 250)` (#60a5fa)
3. Source must be `.prose a` selector

**Rationale:** User expects consistent link styling across all guide pages.

---

## Constraint 4: Single-Rail Hard Constraints

### Width Authority: ContentRail Only

```tsx
// components/features/ContentRail.tsx
export function ContentRail({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[960px] ${className}`}>
      {children}
    </div>
  );
}
```

**Rules:**
1. **NEVER** add padding to ContentRail (`px-4`, `px-6` prohibited)
2. **NEVER** create alternative width containers
3. **ALL** content MUST use ContentRail as outer wrapper
4. **ONLY ONE** ContentRail per page section

### Edge Authority: ContentEdge Per Page

```tsx
// components/features/ContentEdge.tsx
export function ContentEdge({ children, className = "" }) {
  return (
    <div className={`w-full px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
```

**Rules:**
1. **ONLY ONE** ContentEdge wrapper per aligned section
2. **ALL** padded content must share the same ContentEdge
3. **DO NOT** nest multiple ContentEdge wrappers (causes misalignment)

### Prose Max-Width Override

```tsx
// In guides detail page glass-card
<div
  className="glass-card w-full p-6 prose prose-invert prose-max-w-none break-words"
  style={{ maxWidth: 'unset' }}  {/* CRITICAL: Override Tailwind Typography */}
  dangerouslySetInnerHTML={{ __html: postContent.content }}
/>
```

**Rationale:** Single source of truth prevents visual misalignment between header and content.

---

## Constraint 5: Table Width Rules

### Required: Prose Tables Fill Content Boundary

```css
/* app/globals.css - REQUIRED */
.prose table {
  display: table;               /* CRITICAL: Undo display:block */
  width: 100%;
  min-width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Table cells wrap if needed */
.prose td, .prose th {
  overflow-wrap: anywhere;
  word-break: break-word;
  min-width: 0;
  white-space: normal;
}
```

**Prohibited:** Global `table { display: table; }` affecting non-prose tables.

**Rationale:** Markdown tables must stretch to content boundary while preserving text wrapping.

---

## Automated Checking

### Run all constraint checks:

```bash
# Check MDX for naked HTML
node scripts/check-mdx-naked-html.js

# Check globals.css for layout-affecting universal rules
node scripts/check-globals-css-scope.js

# Add to package.json scripts
npm run check:constraints
```

### CI/CD Integration

```json
// package.json
{
  "scripts": {
    "check:constraints": "node scripts/check-mdx-naked-html.js && node scripts/check-globals-css-scope.js",
    "precommit": "npm run check:constraints && lint-staged"
  }
}
```

---

## Manual Acceptance Testing

### Test Plan (5+ Pages)

For each page, verify in DevTools:

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Rail alignment | Measure header width | Exactly 960px |
| Glass-card boundary | Inspect `.glass-card` | `width: 100%`, `max-width: none` |
| Link color | Inspect `.prose a` | `color: rgb(96, 165, 250)` |
| No HTML code leakage | Visual scan | No `<a href...>` rendered as text |
| Table width | Inspect `.prose table` | `display: table`, `width: 100%` |

**Required test pages:**
1. /guides/fix-openclaw-cuda-oom-errors
2. /guides/hardware-requirements-reality-check
3. /guides/fix-openclaw-json-mode-errors
4. /guides/openclaw-error-index
5. /guides/fix-openclaw-install-ps1-npm-enoent-windows

---

## Violation Response

**If constraints are violated:**

1. **Stop** the current work
2. **Identify** which constraint was violated
3. **Revert** the violating change
4. **Fix** using approved pattern
5. **Verify** with automated checks
6. **Document** the violation in changelog

**No exceptions.** These constraints are non-negotiable for /guides/* pages.

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-06 | Initial constitution established | Claude (glm-4.7) |

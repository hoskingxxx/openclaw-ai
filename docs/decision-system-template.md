# Decision System Template

**Status:** HARD RULE — Not a guideline, not a style preference.

Articles violating this structure must not be published. This is part of site architecture, not content strategy.

---

## Purpose & Scope

This document defines the canonical structure for all troubleshooting articles on OpenClaw Hub.

**This is NOT:**
- A style guide
- A set of suggestions
- Optional formatting

**This IS:**
- A publication-blocking requirement
- A security and governance standard
- The single source of truth for article structure

Any article that deviates from this structure without explicit architectural review must be rejected.

---

## Required Sections (Ordered, All Mandatory)

Every troubleshooting article MUST contain the following sections, in this order:

### 1. Error Confirmation

A colored block (`glass-card` with red/amber border) displaying:
- The exact error message
- Stack trace (if relevant)
- Error code explanation (e.g., "ENOENT = Error NO ENTry")
- Scope: when and where this error occurs

### 2. Verified Environment

A colored block (`glass-card` with blue border) displaying a table of:
- Operating System versions affected
- Component versions (Node.js, OpenClaw, etc.)
- Last verification date
- Notes on platform-specific behavior

### 3. 3-Minute Sanity Check

A section of terminal commands that the user can run in under 3 minutes to:
- Verify the problem exists
- Rule out trivial causes
- Confirm their environment matches expectations

**Format:** Provide copy-pasteable commands with expected output.

**Stop condition:** If any sanity check fails, the user must not proceed further.

### 4. Decision Gate

A `:::decision-gate` block containing:
- A question: "Should you keep fixing this locally?"
- A "Continue local debugging only if" checklist (3-5 bullets)
- A "Stop here if any apply" checklist (3-5 bullets)
- A time-cost threshold statement

**Example:**

```markdown
:::decision-gate
### Should you keep fixing this locally?

**Continue local debugging only if:**
- You can reinstall Node.js without breaking other projects
- You are allowed to modify system PATH and PowerShell policy
- You have not already spent more than ~1 hour on this issue

**Stop here if any apply:**
- You already reinstalled Node once and the error persists
- This is a locked-down corporate Windows machine
- You are debugging PATH / npm resolution for more than an hour

Past this point, debugging cost usually grows faster than results.
:::
```

### 5. Primary Exit Path

A colored block (`glass-card` with green border) presenting the FIRST solution to try.

**Rules:**
- Exactly ONE Primary Exit Path per article
- Must be local / user-controlled when feasible
- Must have the highest probability of success
- Must NOT be cloud-first or require external services
- Can include affiliate links ONLY if compliant with overall policy

**Time investment:** Include estimated time to complete.

### 6. Secondary Exit Path (Conditional)

A colored block (`glass-card` with blue border) presenting an alternative solution.

**Rules:**
- Marked as "Conditional" — only for specific situations
- Used when Primary Exit is blocked or unavailable
- Cloud providers may appear here (VPS, hosted services)
- Must explain WHEN to use this path

### 7. Why NOT Other Options

A colored block (`glass-card` with orange border) explaining why common alternatives were rejected.

**Required format:** A table with columns:
- Option
- Rejection Reason

**Purpose:** Prevents users from wasting time on ineffective solutions.

### 8. Summary / Decision Table

A concise summary table with:
- Check name
- Command to run
- Pass/fail criteria

**Decision logic:** Clear branching for "All pass" vs "Any fail" outcomes.

---

## Decision Gate Rules (CRITICAL)

Decision Gates are the core of the Decision System. They must:

1. **Explicit "Continue only if" checklist**
   - 3-5 bullet points
   - Actionable, verifiable conditions
   - No vague statements

2. **Explicit "Stop here if" checklist**
   - 3-5 bullet points
   - Clear failure signals
   - Time-based thresholds

3. **Time-cost threshold**
   - MUST include a statement about time investment
   - Example: "Past this point, debugging cost usually grows faster than results"
   - Typical threshold: >1 hour of local debugging

4. **Fail-closed behavior**
   - Malformed `:::decision-gate` blocks must NOT render
   - Unclosed gates must NOT transform
   - Validation happens at build time

---

## Exit Path Hierarchy (HARD RULE)

The order and framing of Exit Paths is intentional and non-negotiable:

### Primary Exit Path

- **Exactly ONE** per article
- **First option** presented to users
- **Local / user-controlled** when feasible
- **Highest probability of success**
- **NOT cloud-first**

Examples of valid Primary Exit Paths:
- WSL2 on Windows (local Linux environment)
- Reinstall Node.js (local action)
- Modify configuration file (local change)
- Upgrade hardware (user-controlled purchase)

Examples of INVALID Primary Exit Paths:
- "Use our hosted service" (cloud-first)
- "Rent a GPU server" (external dependency first)
- "Switch to SaaS product" (not user-controlled)

### Secondary Exit Path (Conditional)

- **Alternative** when Primary Exit is blocked
- **Conditional** — only for specific situations
- **May include** cloud providers (VPS, hosted services)
- **Must explain** WHEN to use this path

Examples of valid Secondary Exit Paths:
- Remote Linux VPS (when WSL2 is blocked by policy)
- Cloud GPU (when local hardware is insufficient)
- Docker container (when native install is impossible)

### Why NOT Section (Required)

- **MANDATORY** — every article must have this section
- **Table format** with rejection reasons
- **Prevents** wasted effort on dead ends

---

## Directive Syntax Policy

Only `:::decision-gate` is currently supported for custom MDX directives.

### Adding New Directives

Any new directive MUST meet ALL of the following:

1. **Security Review**
   - HTML escaping for all injected content
   - Fixed class allowlist
   - No inline styles or dynamic attributes

2. **Fail-Closed Behavior**
   - Malformed blocks must not transform
   - Validation must happen at build time
   - Original content must be preserved on error

3. **Tests**
   - Unit tests for normal cases
   - Unit tests for malformed input
   - Security tests (XSS, injection)
   - Performance tests (no catastrophic regex)

4. **rehype-sanitize Compatibility**
   - No changes to the allowlist schema
   - All classes must be pre-approved
   - No data-* attributes except explicitly whitelisted (e.g., Umami tracking)

**Process:** Do not add directives without explicit architectural review.

---

## Prohibited Content

The following content is FORBIDDEN in Decision System articles:

### Language

- Marketing phrases ("best in class," "industry-leading")
- Absolute performance claims ("2x faster," "zero latency")
- Urgency language ("limited time," "act now")
- First-person plural ("we recommend," "our solution")

### Technical Content

- Unsafe system commands without warnings
- Multiple "recommended" solutions (creates decision paralysis)
- Hidden or obscured affiliate links
- Solution rankings without explicit criteria

### Structure

- Multiple Primary Exit Paths
- Cloud-first framing
- Missing "Why NOT" section
- Decision Gates without "Stop here if" checklist

---

## Enforcement

### Publication Blocking

Articles that violate this specification must not be published. This includes:

- Missing required sections
- Incorrect Exit Path hierarchy
- Malformed Decision Gates
- Prohibited content
- Non-compliant directives

### Review Process

Before publishing a troubleshooting article:

1. Verify all required sections are present
2. Confirm Exit Path hierarchy (Primary = local/user-controlled)
3. Validate `:::decision-gate` syntax
4. Check for prohibited content
5. Run build to catch malformed directives

### Exceptions

Exceptions to this specification require explicit architectural review. Do not make unilateral decisions about structure changes.

---

## Template Reference

For a complete example of a compliant Decision System article, see:

`content/posts/fix-openclaw-spawn-npm-enoent-windows.mdx`

This article demonstrates all required sections, proper Exit Path hierarchy, and correct `:::decision-gate` usage.

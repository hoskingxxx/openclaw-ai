/**
 * Decision Gate preprocessor for :::decision-gate blocks
 *
 * Transforms:
 * :::decision-gate
 * ### Should you...
 * **Continue only if:**
 * - ...
 * :::
 *
 * Into styled HTML components.
 *
 * STRICT RULES:
 * - Only matches exact :::decision-gate ... ::: pattern
 * - Malformed blocks are left unchanged (FAIL-CLOSED)
 * - All text is HTML-escaped before insertion
 * - Only uses fixed class allowlist
 * - No inline styles, no dynamic ids/data-* attributes
 * - Class strings are normalized (no trailing spaces, no duplicates)
 */

const DECISION_GATE_START = ":::decision-gate";
const DECISION_GATE_END = ":::";

// Fixed class allowlist (must match rehypeSanitize schema)
const ALLOWED_CLASSES = [
  "glass-card",
  "p-6",
  "border-l-4",
  "border-orange-500",
  "mb-8",
  "mb-4",
  "mb-2",
  "mt-6",
  "mt-4",
  "text-xl",
  "font-bold",
  "text-text-primary",
  "font-semibold",
  "text-text-secondary",
  "text-text-tertiary",
  "text-sm",
  "italic",
  "ml-4"
];

/**
 * Normalize class string
 * - Split by whitespace
 * - Filter empty strings
 * - De-duplicate
 * - Join with single spaces
 *
 * @param classNames - Space-separated class names
 * @returns Normalized class string
 */
function normalizeClassName(classNames: string): string {
  return classNames
    .split(/\s+/)
    .filter(Boolean)
    .filter((cls, idx, arr) => arr.indexOf(cls) === idx)
    .join(" ");
}

// HTML escape function
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Preprocess :::decision-gate blocks in MDX content
 *
 * @param content - Raw MDX content
 * @returns Content with :::decision-gate blocks transformed to HTML
 */
export function preprocessDecisionGates(content: string): string {
  // FAIL-CLOSED: Use state machine to validate gate structure
  const lines = content.split("\n");
  let inGate = false;
  let gateStartLine = -1;
  const gateRanges: Array<{ start: number; end: number }> = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (trimmed === DECISION_GATE_START) {
      if (inGate) {
        // Nested directive detected - malformed
        return content;
      }
      inGate = true;
      gateStartLine = i;
    } else if (trimmed === DECISION_GATE_END) {
      if (!inGate) {
        // End delimiter without start - malformed
        return content;
      }
      inGate = false;
      gateRanges.push({ start: gateStartLine, end: i });

      // Check for immediate back-to-back gates (suspicious pattern)
      // Look ahead for the next non-empty line
      let nextNonEmptyLine = -1;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim().length > 0) {
          nextNonEmptyLine = j;
          break;
        }
      }

      if (nextNonEmptyLine >= 0) {
        const nextLineTrimmed = lines[nextNonEmptyLine].trim();
        // If the next non-empty line is another :::decision-gate, be suspicious
        if (nextLineTrimmed === DECISION_GATE_START) {
          // Check if the gate we just closed has "substantial" content
          // If it's very short (like just a heading or empty), it might be malformed
          const gateContent = lines.slice(gateStartLine + 1, i).filter(l => l.trim().length > 0);
          if (gateContent.length <= 2) {
            // Very short gate followed immediately by another gate - suspicious
            // This could be a malformed pattern where ::: was actually part of content
            // For fail-closed safety, reject this
            return content;
          }
        }
      }
    } else if (trimmed.includes(":::")) {
      // Line contains ::: but is not a valid delimiter
      // This could be :::other or embedded ::: in content
      // Only allowed if we're NOT inside a gate
      if (inGate) {
        // ::: inside gate content - malformed
        return content;
      }
      // Outside gate, :::other or similar is fine (just won't be transformed)
    }
  }

  // If we're still in a gate at the end, it's malformed (missing end)
  if (inGate) {
    return content;
  }

  // All validations passed, find and transform gate blocks
  const gatePattern = new RegExp(
    `^${DECISION_GATE_START}\\n([\\s\\S]*?)^${DECISION_GATE_END}`,
    "gm"
  );

  const matches: Array<{ fullMatch: string; content: string; startIndex: number }> = [];
  let match: RegExpExecArray | null;

  // Collect all matches with their positions
  while ((match = gatePattern.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      content: match[1],
      startIndex: match.index
    });
  }

  // If no matches after validation (shouldn't happen, but be safe)
  if (matches.length === 0) {
    return content;
  }

  // Transform each block
  let result = content;
  let offset = 0;

  for (const { fullMatch, content: gateContent, startIndex } of matches) {
    try {
      const transformed = transformDecisionGate(gateContent);
      // Replace in result, accounting for previous replacements
      const actualIndex = startIndex + offset;
      result = result.slice(0, actualIndex) + transformed + result.slice(actualIndex + fullMatch.length);
      offset += transformed.length - fullMatch.length;
    } catch {
      // On any error, return original content unchanged
      return content;
    }
  }

  return result;
}

/**
 * Transform gate content into styled HTML
 */
function transformDecisionGate(gateContent: string): string {
  const lines = gateContent.split("\n");
  const parts: string[] = [];

  parts.push('<div class="' + normalizeClassName('glass-card p-6 border-l-4 border-orange-500 mb-8') + '">');

  let inContinueSection = false;
  let inStopSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      continue;
    }

    // Heading: ### Something
    if (trimmed.startsWith("### ")) {
      parts.push('<h3 class="' + normalizeClassName('text-xl font-bold text-text-primary mb-4') + '">' + escapeHtml(trimmed.slice(4)) + '</h3>');
      continue;
    }

    // Continue section header
    if (trimmed === "**Continue local debugging only if:**") {
      inContinueSection = true;
      inStopSection = false;
      parts.push('<div class="' + normalizeClassName('mb-4') + '">');
      parts.push('<p class="' + normalizeClassName('font-semibold text-text-primary mb-2') + '">Continue local debugging only if:</p>');
      continue;
    }

    // Stop section header
    if (trimmed === "**Stop here if any apply:**") {
      inContinueSection = false;
      inStopSection = true;
      parts.push('<div class="' + normalizeClassName('mt-6') + '">');
      parts.push('<p class="' + normalizeClassName('font-semibold text-text-primary mb-2') + '">Stop here if any apply:</p>');
      continue;
    }

    // Bullet points
    if (trimmed.startsWith("- ")) {
      const bulletContent = trimmed.slice(2);
      parts.push('<div class="' + normalizeClassName('text-text-secondary ml-4') + '">' + escapeHtml(bulletContent) + '</div>');
      continue;
    }

    // Closing note
    if (trimmed.startsWith("Past this point,") && trimmed.endsWith(".")) {
      parts.push('<p class="' + normalizeClassName('text-sm text-text-tertiary mt-4 italic') + '">' + escapeHtml(trimmed) + '</p>');
      continue;
    }

    // Other content - treat as paragraph
    if (trimmed) {
      parts.push('<p class="' + normalizeClassName('text-text-secondary') + '">' + escapeHtml(trimmed) + '</p>');
    }
  }

  parts.push("</div>");
  return parts.join("\n");
}

/**
 * Empty plugin for rehype pipeline compatibility
 */
export function rehypeDecisionGate() {
  return () => {
    // Placeholder - actual processing happens in preprocessDecisionGates
  };
}

/**
 * Validate that classes are in the allowlist
 * Called by tests
 */
export function validateAllowedClasses(classes: string[]): boolean {
  return classes.every((cls) => ALLOWED_CLASSES.includes(cls));
}

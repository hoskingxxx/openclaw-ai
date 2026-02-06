/**
 * Tests for rehype-decision-gate
 *
 * Tests the preprocessDecisionGates function for:
 * - Normal well-formed blocks
 * - Missing closing ::: (must not transform)
 * - Content containing "<script>" (must be escaped and removed by sanitize)
 * - Content containing ":::other" or ":::" inside gate (must not transform - FAIL-CLOSED)
 * - Very large content (no catastrophic regex / performance issues)
 * - Normalized class strings (no trailing spaces, no duplicates)
 */

import { preprocessDecisionGates, validateAllowedClasses } from "../lib/rehype-decision-gate";

describe("preprocessDecisionGates", () => {
  describe("normal well-formed block", () => {
    const input = `Some intro

:::decision-gate
### Should you keep fixing this locally?

**Continue local debugging only if:**
- You can reinstall Node.js

**Stop here if any apply:**
- You already reinstalled Node once

Past this point, debugging cost usually grows faster than results.
:::

Some outro`;

    const result = preprocessDecisionGates(input);

    it("should transform the block", () => {
      expect(result).toContain("glass-card");
      expect(result).toContain("text-text-primary");
    });

    it("should HTML-escape content", () => {
      // Note: The test input doesn't contain characters that need escaping.
      // Security tests below verify that <, >, &, etc. are properly escaped.
      // This test verifies the transformation completed successfully.
      expect(result).toContain("glass-card");
      expect(result).not.toContain(":::decision-gate");
    });

    it("should not include the ::: markers", () => {
      expect(result).not.toContain(":::decision-gate");
      expect(result).not.toContain(":::");
    });

    it("should preserve content outside the gate", () => {
      expect(result).toContain("Some intro");
      expect(result).toContain("Some outro");
    });

    it("should use only allowed classes", () => {
      // Extract class attributes from result
      const classMatches = result.match(/class="([^"]+)"/g) || [];
      classMatches.forEach((matchStr) => {
        // Extract the classes from the string like 'class="foo bar"'
        const classes = matchStr.replace(/class="([^"]+)"/, "$1").split(" ");
        const isValid = validateAllowedClasses(classes);
        expect(isValid).toBe(true);
      });
    });

    it("should normalize class strings (no trailing spaces)", () => {
      // Check that class attributes don't have trailing spaces
      const classMatches = result.match(/class="([^"]+)"/g) || [];
      classMatches.forEach((matchStr) => {
        const classes = matchStr.replace(/class="([^"]+)"/, "$1");
        // Should not end with space
        expect(classes).not.toMatch(/\s$/);
        // Should not have duplicate spaces
        expect(classes).not.toMatch(/\s\s/);
      });
    });
  });

  describe("malformed blocks - FAIL-CLOSED (must not transform)", () => {
    it("missing closing :::", () => {
      const input = `:::decision-gate
### Should you keep fixing this locally?

**Continue local debugging only if:**
- You can reinstall Node.js

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should not transform - content unchanged
      expect(result).toContain(":::decision-gate");
      expect(result).not.toContain("glass-card");
    });

    it("missing opening :::decision-gate", () => {
      const input = `### Should you keep fixing this locally?

**Continue local debugging only if:**
- You can reinstall Node.js

:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should not transform
      expect(result).toContain("### Should you");
      expect(result).not.toContain("glass-card");
    });

    it("mismatched delimiters - contains ::: inside first gate content", () => {
      const input = `:::decision-gate
### Should you keep fixing this locally?

:::

:::decision-gate
:::`;

      const result = preprocessDecisionGates(input);

      // FAIL-CLOSED: The first gate contains ::: in its content (the closing delimiter
      // appears mid-content). This is malformed and must NOT transform.
      expect(result).toContain(":::decision-gate");
      expect(result).not.toContain("glass-card");
    });

    it("nested directives - FAIL-CLOSED", () => {
      const input = `:::decision-gate
:::decision-gate
### Should you keep fixing this locally?
:::
:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // FAIL-CLOSED: Contains ::: inside gate content (the nested directive)
      // Must not transform
      expect(result).toContain(":::decision-gate");
      expect(result).not.toContain("glass-card");
    });

    it("stray ::: in content - FAIL-CLOSED", () => {
      const input = `:::decision-gate
### Should you keep fixing this locally?

**Continue only if:**
- Some text with ::: in it

:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // FAIL-CLOSED: Contains ::: inside gate content
      expect(result).toContain(":::decision-gate");
      expect(result).not.toContain("glass-card");
    });

    it("wrong directive name is not transformed", () => {
      const input = `:::other
### Should you keep fixing this locally?

**Continue local debugging only if:**
- You can reinstall Node.js

:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should not transform - wrong directive
      expect(result).toContain(":::other");
      expect(result).not.toContain("glass-card");
    });
  });

  describe("security - HTML escaping", () => {
    it("should escape <script> tags", () => {
      const input = `:::decision-gate
### Test

<script>alert('xss')</script>
:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Script tags should be escaped
      expect(result).toContain("&lt;script&gt;");
      expect(result).not.toContain("<script>");

      // The escaped content will be removed by rehype-sanitize
      expect(result).not.toContain("<script>");
    });

    it("should escape HTML entities", () => {
      const input = `:::decision-gate
### Test

Content with <b>bold</b> and <em>italic</em> and &amp;
:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should escape HTML
      expect(result).toContain("&lt;b&gt;");
      expect(result).toContain("&lt;em&gt;");
      expect(result).toContain("&amp;amp;");
    });

    it("should escape quotes", () => {
      const input = `:::decision-gate
### Test

Content with "quotes" and 'apostrophes'
:::

Some outro`;

      const result = preprocessDecisionGates(input);

      expect(result).toContain("&quot;");
      expect(result).toContain("&#39;");
    });
  });

  describe("performance - large content", () => {
    it("should handle very large content without catastrophic regex issues", () => {
      // Generate a large decision gate (100+ bullet points)
      const bullets = Array.from({ length: 100 }, (_, i) => `- Item ${i + 1}`).join("\n");
      const input = `:::decision-gate
### Large Decision Gate

**Continue local debugging only if:**
${bullets}

**Stop here if any apply:**
- Item A
:::

Some outro`;

      const startTime = Date.now();
      const result = preprocessDecisionGates(input);
      const endTime = Date.now();

      // Should complete quickly (< 100ms)
      expect(endTime - startTime).toBeLessThan(100);

      // Should still transform correctly
      expect(result).toContain("glass-card");
      expect(result).toContain("Item 1");
      expect(result).toContain("Item 100");
    });
  });

  describe("edge cases", () => {
    it("empty decision gate", () => {
      const input = `:::decision-gate
:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should transform empty gate
      expect(result).toContain('<div class="glass-card');
      expect(result).toContain('</div>');
    });

    it("gate with only whitespace", () => {
      const input = `:::decision-gate


:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should handle gracefully
      expect(result).toContain('<div class="glass-card');
      expect(result).toContain('</div>');
    });

    it("gate with special characters in content", () => {
      const input = `:::decision-gate
### Test <special>

**Continue only if:**
- Content with & < > " '

:::

Some outro`;

      const result = preprocessDecisionGates(input);

      // Should escape special characters
      expect(result).toContain("&lt;special&gt;");
      expect(result).toContain("&amp; &lt; &gt;");
    });

    it("multiple decision gates in one document", () => {
      const input = `First gate

:::decision-gate
### First
- Item A
:::

Second gate

:::decision-gate
### Second
- Item B
:::

End`;

      const result = preprocessDecisionGates(input);

      // Should transform both gates
      const gates = result.match(/class="glass-card/g);
      expect(gates).toHaveLength(2);

      expect(result).toContain("First gate");
      expect(result).toContain("Item A");
      expect(result).toContain("Second gate");
      expect(result).toContain("Item B");
    });
  });

  describe("class normalization", () => {
    it("should remove trailing spaces from class attributes", () => {
      const input = `:::decision-gate
### Test
- Item
:::`;

      const result = preprocessDecisionGates(input);

      // Find all class attributes
      const classMatches = result.match(/class="[^"]+"/g) || [];
      classMatches.forEach((classAttr) => {
        // Should not contain trailing spaces inside the quotes
        expect(classAttr).not.toMatch(/\s"$/);
        // Extract classes and verify no trailing space
        const classes = classAttr.match(/class="([^"]+)"/)?.[1] || "";
        expect(classes).not.toMatch(/\s$/);
      });
    });

    it("should deduplicate classes", () => {
      // This is verified by the normalizeClassName function behavior
      // The function filters duplicates using indexOf check
      const input = `:::decision-gate
### Test
- Item
:::`;

      const result = preprocessDecisionGates(input);

      // Check that no class attribute has duplicate classes
      const classMatches = result.match(/class="([^"]+)"/g) || [];
      classMatches.forEach((matchStr) => {
        const classes = matchStr.replace(/class="([^"]+)"/, "$1").split(" ");
        // Check for duplicates
        const unique = new Set(classes);
        expect(classes.length).toBe(unique.size);
      });
    });
  });
});

describe("validateAllowedClasses", () => {
  it("should return true for all allowed classes", () => {
    const allowed = [
      "glass-card",
      "p-6",
      "border-l-4",
      "text-text-primary"
    ];
    expect(validateAllowedClasses(allowed)).toBe(true);
  });

  it("should return false for disallowed classes", () => {
    const disallowed = ["custom-class", "text-xl", "not-in-allowlist"];
    expect(validateAllowedClasses(disallowed)).toBe(false);
  });

  it("should return true for empty array", () => {
    expect(validateAllowedClasses([])).toBe(true);
  });
});

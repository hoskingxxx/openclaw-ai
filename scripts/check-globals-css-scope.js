#!/usr/bin/env node

/**
 * Global CSS Scope Checker
 *
 * SCANS: app/globals.css for rules that affect block layout globally
 * VIOLATIONS: Universal selectors (*, div, span) with layout properties
 *
 * Layout properties that affect block sizing:
 * - display (block, flex, grid, inline-block, etc.)
 * - width, max-width, min-width
 * - height, max-height, min-height
 * - margin, padding (on universal selectors)
 * - position (absolute, fixed, sticky)
 *
 * Usage: node scripts/check-globals-css-scope.js
 * Exit code: 0 = pass, 1 = violations found
 */

const fs = require('fs');
const path = require('path');

const GLOBALS_CSS_PATH = path.join(__dirname, '../app/globals.css');

const LAYOUT_PROPERTIES = [
  'display:',
  'width:',
  'max-width:',
  'min-width:',
  'max-height:',
  'min-height:',
  // NOTE: 'height:' must NOT match 'line-height:' - use word boundary
  // We'll handle this with regex instead
  'margin:',
  'margin-top:',
  'margin-right:',
  'margin-bottom:',
  'margin-left:',
  'padding:',
  'padding-top:',
  'padding-right:',
  'padding-bottom:',
  'padding-left:',
  'position:',
];

// NOTE: line-height is NOT a layout property - it's typography
// NOTE: letter-spacing, word-spacing are typography, not layout

// NOTE: line-height is NOT a layout property - it's typography and acceptable
// NOTE: overflow-wrap, word-break are text safety properties and acceptable

const UNIVERSAL_SELECTORS = [
  '\\*',           // Universal
  'div',           // All divs
  'span',          // All spans
  'p',             // All paragraphs
  'a',             // All links
];

function checkCSSFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  const lines = content.split('\n');
  let inRule = false;
  let currentSelector = '';
  let ruleStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip comments
    if (trimmed.startsWith('/*') || trimmed.startsWith('*')) continue;

    // Detect selector (lines ending with {)
    if (trimmed.endsWith('{')) {
      currentSelector = trimmed.substring(0, trimmed.length - 1).trim();
      ruleStartLine = i + 1;
      inRule = true;
      continue;
    }

    // End of rule
    if (trimmed === '}' && inRule) {
      inRule = false;
      currentSelector = '';
      continue;
    }

    // Check for layout properties within rule
    if (inRule && currentSelector) {
      for (const prop of LAYOUT_PROPERTIES) {
        if (trimmed.includes(prop)) {
          // Check if this is a universal or element selector
          const isUniversal = UNIVERSAL_SELECTORS.some(selector => {
            const regex = new RegExp(`^${selector}[\\s,]`);
            return regex.test(currentSelector) || currentSelector.includes(selector + ',') || currentSelector.includes(', ' + selector);
          });

          if (isUniversal) {
            violations.push({
              line: ruleStartLine,
              selector: currentSelector,
              property: prop,
              content: trimmed.trim(),
            });
          }
        }
      }

      // Special check for 'height:' property (NOT 'line-height', 'max-height', 'min-height')
      // Match 'height:' but not when preceded by 'line-', 'max-', or 'min-'
      if (/(?:^|\s)height\s*:/.test(trimmed) && !/line-height/.test(trimmed)) {
        const isUniversal = UNIVERSAL_SELECTORS.some(selector => {
          const regex = new RegExp(`^${selector}[\\s,]`);
          return regex.test(currentSelector) || currentSelector.includes(selector + ',') || currentSelector.includes(', ' + selector);
        });

        if (isUniversal) {
          violations.push({
            line: ruleStartLine,
            selector: currentSelector,
            property: 'height:',
            content: trimmed.trim(),
          });
        }
      }
    }
  }

  return violations;
}

function main() {
  if (!fs.existsSync(GLOBALS_CSS_PATH)) {
    console.error('❌ globals.css not found at', GLOBALS_CSS_PATH);
    process.exit(1);
  }

  const violations = checkCSSFile(GLOBALS_CSS_PATH);

  if (violations.length > 0) {
    console.error('\n❌ Global CSS Scope Check Failed\n');
    console.error('Found', violations.length, 'block-layout-affecting rules:\n');
    violations.forEach(v => {
      console.error(`  Line ${v.line}: ${v.selector}`);
      console.error(`    Property: ${v.property}`);
      console.error(`    ${v.content}\n`);
    });
    console.error('Guidelines:');
    console.error('1. Scope layout rules to specific classes (e.g., .prose, .glass-card)');
    console.error('2. Avoid universal selectors (*) for layout properties');
    console.error('3. Prefer min-width: 0 on flex/grid children, not global rules\n');
    process.exit(1);
  } else {
    console.log('✅ Global CSS Scope Check Passed');
    console.log('No block-layout-affecting universal rules found');
    process.exit(0);
  }
}

main();

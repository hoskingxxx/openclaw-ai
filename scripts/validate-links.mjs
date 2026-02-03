#!/usr/bin/env node

/**
 * OpenClaw Link Validator
 * Scans MDX files for broken internal links, placeholders, and suspicious patterns
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../content/posts');
const BLOG_ROUTE_PREFIX = '/guides';

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

// Read lib/blog.ts to get valid slugs (SSOT)
function getValidSlugs() {
  const blogPath = path.join(__dirname, '../lib/blog.ts');

  if (!fs.existsSync(blogPath)) {
    log(colors.yellow, '⚠️  lib/blog.ts not found, skipping internal link validation');
    return new Set();
  }

  const content = fs.readFileSync(blogPath, 'utf-8');
  const slugMatches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  const slugs = new Set();

  for (const match of slugMatches) {
    slugs.add(match[1]);
  }

  return slugs;
}

// Extract all markdown links from content
function extractLinks(content, filepath) {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      fullMatch: match[0],
      position: match.index,
    });
  }

  return links;
}

// Check if link is internal (starts with /)
function isInternalLink(url) {
  return url.startsWith('/');
}

// Check if link is a placeholder or suspicious
function isPlaceholderOrSuspicious(link) {
  const { url, text } = link;

  // Empty links
  if (!url || url === '') {
    return { issue: 'empty', message: 'Empty URL' };
  }

  // Placeholder patterns in URL or text
  const placeholderPatterns = [
    { pattern: /\[AFFILIATE/i, name: 'AFFILIATE placeholder' },
    { pattern: /TODO/i, name: 'TODO placeholder' },
    { pattern: /placeholder/i, name: 'placeholder text' },
    { pattern: /coming soon/i, name: 'coming soon reference' },
  ];

  for (const { pattern, name } of placeholderPatterns) {
    if (pattern.test(url) || pattern.test(text)) {
      return { issue: 'placeholder', message: `Contains ${name}` };
    }
  }

  // Empty link text with URL
  if (!text || text.trim() === '') {
    return { issue: 'empty-text', message: 'Empty link text' };
  }

  return null;
}

// Validate internal link against known slugs
function validateInternalLink(url, validSlugs) {
  // Remove query params and anchors
  const cleanUrl = url.split('?')[0].split('#')[0];

  // Check if it's a /guides/ link
  if (cleanUrl.startsWith(BLOG_ROUTE_PREFIX)) {
    const slug = cleanUrl.replace(`${BLOG_ROUTE_PREFIX}/`, '');
    if (validSlugs.has(slug)) {
      return { valid: true };
    }
    return {
      valid: false,
      reason: `Slug "${slug}" not found in lib/blog.ts`,
    };
  }

  // Check if it's a /tools/ link (we created this)
  if (cleanUrl.startsWith('/tools/')) {
    return { valid: true, note: 'Tools route' };
  }

  // Check if it's a known root route
  const knownRootRoutes = ['/', '/faq', '/docs', '/resources', /\/oom\/.*/, /\/quick-start\/.*/, /\/troubleshooting\/.*/];
  for (const route of knownRootRoutes) {
    if (typeof route === 'string' && cleanUrl === route) {
      return { valid: true, note: 'Known root route' };
    }
    if (route instanceof RegExp && route.test(cleanUrl)) {
      return { valid: true, note: 'Known route pattern' };
    }
  }

  return {
    valid: false,
    reason: 'Unknown internal route',
  };
}

// Main validation function
function validateLinks() {
  log(colors.cyan, '🔍 OpenClaw Link Validator\n');

  // Get valid slugs from lib/blog.ts
  const validSlugs = getValidSlugs();
  log(colors.blue, `📋 Found ${validSlugs.size} valid slugs in lib/blog.ts`);

  // Get all MDX files
  if (!fs.existsSync(CONTENT_DIR)) {
    log(colors.red, `❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(CONTENT_DIR, f));

  log(colors.blue, `📁 Scanning ${files.length} MDX file(s)\n`);

  const results = {
    totalFiles: files.length,
    totalLinks: 0,
    internalLinks: 0,
    externalLinks: 0,
    issues: [],
    externalUrls: [],
  };

  // Scan each file
  for (const filepath of files) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const links = extractLinks(content, filepath);
    const filename = path.basename(filepath);

    for (const link of links) {
      results.totalLinks++;

      // Check for placeholders
      const placeholderIssue = isPlaceholderOrSuspicious(link);
      if (placeholderIssue) {
        results.issues.push({
          file: filename,
          type: 'placeholder',
          severity: 'warning',
          link,
          message: placeholderIssue.message,
        });
        continue;
      }

      // Categorize and validate
      if (isInternalLink(link.url)) {
        results.internalLinks++;
        const validation = validateInternalLink(link.url, validSlugs);
        if (!validation.valid) {
          results.issues.push({
            file: filename,
            type: 'broken-internal',
            severity: 'error',
            link,
            message: validation.reason,
          });
        }
      } else {
        results.externalLinks++;
        // Track external URLs for visibility
        if (!results.externalUrls.includes(link.url)) {
          results.externalUrls.push(link.url);
        }
      }
    }
  }

  // Print report
  printReport(results);

  // Exit with appropriate code
  const hasErrors = results.issues.some(i => i.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

function printReport(results) {
  console.log('━'.repeat(60));

  // Summary
  log(colors.cyan, '\n📊 SUMMARY');
  console.log(`   Total Files:     ${results.totalFiles}`);
  console.log(`   Total Links:     ${results.totalLinks}`);
  console.log(`   Internal Links:  ${results.internalLinks}`);
  console.log(`   External Links:  ${results.externalLinks}`);
  console.log(`   Issues Found:    ${results.issues.length}`);

  // Issues
  if (results.issues.length > 0) {
    console.log('\n' + '━'.repeat(60));
    const hasErrors = results.issues.some(i => i.severity === 'error');

    if (hasErrors) {
      log(colors.red, '\n❌ VALIDATION FAILED\n');
    } else {
      log(colors.yellow, '\n⚠️  WARNINGS FOUND\n');
    }

    // Group issues by file
    const issuesByFile = {};
    for (const issue of results.issues) {
      if (!issuesByFile[issue.file]) {
        issuesByFile[issue.file] = [];
      }
      issuesByFile[issue.file].push(issue);
    }

    // Print issues by file
    for (const [file, fileIssues] of Object.entries(issuesByFile)) {
      const hasErrorsInFile = fileIssues.some(i => i.severity === 'error');
      const color = hasErrorsInFile ? colors.red : colors.yellow;
      const icon = hasErrorsInFile ? '❌' : '⚠️';

      log(color, `\n${icon} ${file}`);

      for (const issue of fileIssues) {
        const issueColor = issue.severity === 'error' ? colors.red : colors.yellow;
        log(issueColor, `   [${issue.type.toUpperCase()}] ${issue.message}`);
        console.log(`      Link: [${issue.link.text}](${issue.link.url})`);
      }
    }
  } else {
    console.log('\n' + '━'.repeat(60));
    log(colors.green, '\n✅ ALL CHECKS PASSED\n');
    log(colors.green, '   No broken internal links or placeholders found.\n');
  }

  // External URLs (for visibility)
  if (results.externalUrls.length > 0) {
    console.log('━'.repeat(60));
    log(colors.cyan, '\n🌐 EXTERNAL LINKS (for manual review)\n');
    for (const url of results.externalUrls) {
      console.log(`   ${url}`);
    }
    console.log('');
  }

  console.log('━'.repeat(60));
}

// Run the validator
validateLinks();

#!/bin/bash
# Build-level verification script for link rendering
# Run after: npm run build

set -e

BUILD_DIR=".next/server/app/guides"
TARGET_FILE="$BUILD_DIR/how-to-use-deepseek-with-openclaw.html"
CLUSTER_FILE="$BUILD_DIR/hardware-requirements-reality-check.html"

echo "======================================"
echo "Link Rendering Verification"
echo "======================================"

if [ ! -f "$TARGET_FILE" ]; then
  echo "❌ FAIL: $TARGET_FILE not found. Run 'npm run build' first."
  exit 1
fi

# Test 1: Affiliate link must exist with data-link="affiliate" and ref=9864821-9J
echo ""
echo "Test 1: Vultr affiliate link..."
AFFILIATE_COUNT=$(grep -o 'href="https://www.vultr.com/[^"]*ref=9864821-9J[^"]*"[^>]*data-link="affiliate"' "$TARGET_FILE" | wc -l | tr -d ' ')
if [ "$AFFILIATE_COUNT" -ge 1 ]; then
  echo "✅ PASS: Found $AFFILIATE_COUNT affiliate link(s) with data-link=\"affiliate\" and ref=9864821-9J"
  # Show actual link for verification
  grep -o 'href="https://www.vultr.com/[^"]*ref=9864821-9J[^"]*"' "$TARGET_FILE" | head -1
else
  echo "❌ FAIL: No affiliate link found with data-link=\"affiliate\" and ref=9864821-9J"
  grep 'vultr.com' "$TARGET_FILE" | head -3 || true
  exit 1
fi

# Test 2: Cluster links in Related sections must have data-link="cluster"
echo ""
echo "Test 2: Related Articles cluster links..."
if [ -f "$CLUSTER_FILE" ]; then
  CLUSTER_COUNT=$(grep -o 'href="/guides/[^"]*"[^>]*data-link="cluster"' "$CLUSTER_FILE" | wc -l | tr -d ' ')
  if [ "$CLUSTER_COUNT" -ge 2 ]; then
    echo "✅ PASS: Found $CLUSTER_COUNT cluster link(s) with data-link=\"cluster\""
    grep -o 'href="/guides/[^"]*"[^>]*data-link="cluster"' "$CLUSTER_FILE" | head -3
  else
    echo "❌ FAIL: Expected at least 2 cluster links, found $CLUSTER_COUNT"
    exit 1
  fi
else
  echo "⚠️  SKIP: $CLUSTER_FILE not found"
fi

# Test 3: External links must NOT have data-link="cluster" or "affiliate"
echo ""
echo "Test 3: External links (nodejs.org, github.com)..."
EXTERNAL_LINKS=$(grep -o 'href="https://\(nodejs\.org\|github\.com\)[^"]*"' "$TARGET_FILE" | wc -l | tr -d ' ')
WRONG_CLUSTER=$(grep 'href="https://\(nodejs\.org\|github\.com\)[^"]*"[^>]*data-link="cluster"' "$TARGET_FILE" | wc -l | tr -d ' ')
WRONG_AFFILIATE=$(grep 'href="https://\(nodejs\.org\|github\.com\)[^"]*"[^>]*data-link="affiliate"' "$TARGET_FILE" | wc -l | tr -d ' ')

if [ "$EXTERNAL_LINKS" -gt 0 ]; then
  if [ "$WRONG_CLUSTER" -eq 0 ] && [ "$WRONG_AFFILIATE" -eq 0 ]; then
    echo "✅ PASS: $EXTERNAL_LINKS external link(s) without incorrect data-link attributes"
  else
    echo "❌ FAIL: Found external links with incorrect data-link:"
    [ "$WRONG_CLUSTER" -gt 0 ] && echo "  - cluster: $WRONG_CLUSTER"
    [ "$WRONG_AFFILIATE" -gt 0 ] && echo "  - affiliate: $WRONG_AFFILIATE"
    exit 1
  fi
else
  echo "⚠️  SKIP: No external links found in $TARGET_FILE"
fi

# Test 4: Verify no raw HTML <a> in MDX source (content guard)
echo ""
echo "Test 4: MDX content guard (no raw <a href=> in source)..."
RAW_ANCHOR_COUNT=$(find content/posts -name "*.mdx" -exec grep -l '<a href=' {} \; | wc -l | tr -d ' ')
if [ "$RAW_ANCHOR_COUNT" -eq 0 ]; then
  echo "✅ PASS: No raw <a href=> found in MDX files"
else
  echo "❌ FAIL: Found raw <a href=> in $RAW_ANCHOR_COUNT MDX file(s):"
  find content/posts -name "*.mdx" -exec grep -l '<a href=' {} \;
  echo ""
  echo "Please convert to Markdown link syntax: [](url)"
  exit 1
fi

# Test 5: Verify data-block="related" wrapper exists
echo ""
echo "Test 5: Related section structural anchor..."
if [ -f "$CLUSTER_FILE" ]; then
  WRAPPER_COUNT=$(grep -o 'data-block="related"' "$CLUSTER_FILE" | wc -l | tr -d ' ')
  if [ "$WRAPPER_COUNT" -ge 1 ]; then
    echo "✅ PASS: Found $WRAPPER_COUNT Related section(s) with data-block=\"related\""
  else
    echo "❌ FAIL: No data-block=\"related\" wrapper found"
    exit 1
  fi
fi

echo ""
echo "======================================"
echo "✅ All tests passed!"
echo "======================================"

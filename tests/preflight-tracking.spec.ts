/**
 * Automated acceptance test for /preflight tracking
 *
 * Tests:
 * 1. RED state: Windows + 8GB + 70B → Vultr CTA
 * 2. YELLOW state: macOS + 16GB + 32B → Gumroad CTA
 * 3. GREEN state: Windows + 24GB + 8B → Copy Link (no share errors)
 *
 * Validates:
 * - page_type="preflight" (not "homepage")
 * - path="/preflight" or page_path="/preflight"
 * - verdict matches expected status
 * - No navigator.share errors
 */

import { test, expect } from '@playwright/test';

interface UmamiEvent {
  eventName: string;
  payload: {
    path?: string;
    page_path?: string;
    page_type?: string;
    pageType?: string;
    verdict?: string;
    status?: string;
    cta_id?: string;
    placement?: string;
    model?: string;
    vram?: string;
    environment?: string;
    [key: string]: unknown;
  };
}

test.describe('Preflight Tracking Acceptance', () => {
  test.beforeEach(async ({ page }) => {
    // Enable umami debug mode BEFORE navigation
    await page.goto('/preflight');

    // Set umami debug and wait for it to take effect
    await page.evaluate(() => {
      localStorage.setItem('umami_debug', '1');
    });

    // Capture console logs IMMEDIATELY
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[Umami]')) {
        // Store synchronously in window
        page.evaluate((log: string) => {
          (window as any).__umamiLogs = (window as any).__umamiLogs || [];
          (window as any).__umamiLogs.push(log);
        }, text).catch(() => {});
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      const errorStr = error.toString();
      // Filter out extension-related errors
      if (
        errorStr.includes('content_script') ||
        errorStr.includes('Immersive Translate') ||
        errorStr.includes('chrome-extension') ||
        errorStr.includes('moz-extension')
      ) {
        return;
      }
      page.evaluate((err: string) => {
        (window as any).__pageErrors = (window as any).__pageErrors || [];
        (window as any).__pageErrors.push(err);
      }, errorStr).catch(() => {});
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  /**
   * Helper: Get captured Umami events
   * Parses console.log output like: [Umami] revenue_outbound {dest: vultr, ...}
   */
  async function getUmamiEvents(page: any): Promise<UmamiEvent[]> {
    return await page.evaluate(() => {
      const logs = (window as any).__umamiLogs || [];

      return logs.map((log: string) => {
        // Match: [Umami] eventName {key: value, ...}
        // Handle format: [Umami] revenue_outbound {dest: vultr, offer: cloud_gpu, ...}
        const match = log.match(/\[Umami\]\s+(\w+)\s+\{(.*)\}/);
        if (!match) return null;

        const eventName = match[1];
        const objContent = match[2];

        // Parse key-value pairs like: dest: vultr, offer: cloud_gpu, page_type: preflight
        const pairs = objContent.split(',').map((p: string) => p.trim().split(':'));
        const payload: any = {};

        pairs.forEach(([key, value]: string[]) => {
          key = key.trim();
          value = value.trim();
          // Remove trailing comma or closing brace
          value = value.replace(/[,}]\s*$/, '');
          // Convert to string
          payload[key] = value;
        });

        return { eventName, payload };
      }).filter((e: any) => e !== null && e.eventName);
    });
  }

  /**
   * Helper: Get captured page errors
   */
  async function getPageErrors(page: any): Promise<string[]> {
    return await page.evaluate(() => {
      return (window as any).__pageErrors || [];
    });
  }

  /**
   * Helper: Clear captured logs
   */
  async function clearLogs(page: any) {
    await page.evaluate(() => {
      (window as any).__umamiLogs = [];
      (window as any).__pageErrors = [];
    });
  }

  /**
   * Helper: Select calculator inputs by label
   */
  async function selectCalculatorInputs(page: any, environment: string, vram: string, model: string) {
    // Find all selects in the calculator
    const selects = page.locator('.grid.grid-cols-1.md\\:grid-cols-3 select');
    const count = await selects.count();

    if (count < 3) {
      throw new Error(`Expected 3 selects, found ${count}`);
    }

    // Select by index: 0=Environment, 1=VRAM, 2=Model
    await selects.nth(0).selectOption(environment);
    await selects.nth(1).selectOption(vram);
    await selects.nth(2).selectOption(model);
  }

  /**
   * Helper: Get path from any event (supports both 'path' and 'page_path')
   */
  function getPathFromEvent(event: UmamiEvent): string | undefined {
    return event.payload.path || event.payload.page_path;
  }

  /**
   * Helper: Get verdict from any event (supports both 'verdict' and 'status')
   */
  function getVerdictFromEvent(event: UmamiEvent): string | undefined {
    return event.payload.verdict || event.payload.status;
  }

  /**
   * Scenario A: RED state - Windows + 8GB + 70B
   * Expected: revenue_outbound OR affiliate_click with page_type/preflight + verdict=red
   */
  test('A) RED: Windows + 8GB + 70B → Vultr CTA tracking', async ({ page }) => {
    // Select inputs for RED state
    await selectCalculatorInputs(page, 'windows', '8gb', '70b');

    // Wait for status update
    await page.waitForTimeout(500);

    // Clear logs before CTA click
    await clearLogs(page);

    // Click Vultr CTA (primary button in RED state)
    const vultrButton = page.getByText('Run on Cloud GPU').first();
    await vultrButton.click();

    // Wait for tracking to fire
    await page.waitForTimeout(1000);

    // Get captured events
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Print all events for debugging
    console.log('\n=== SCENARIO A: RED STATE ===');
    console.log('All captured logs:', await page.evaluate(() => (window as any).__umamiLogs || []));
    console.log('Parsed events:', events.length);
    events.forEach((e: any) => {
      console.log(`  ${e.eventName}:`, {
        page_type: e.payload.page_type,
        path: getPathFromEvent(e),
        verdict: getVerdictFromEvent(e),
        model: e.payload.model,
        vram: e.payload.vram,
      });
    });

    // Must have revenue_outbound OR affiliate_click event
    const revenueEvent = events.find((e: any) => e.eventName === 'revenue_outbound' || e.eventName === 'affiliate_click');
    expect(revenueEvent, 'Must have revenue_outbound or affiliate_click event').toBeDefined();

    // Validate page_type from revenue_outbound (if present)
    const revenueOutbound = events.find((e: any) => e.eventName === 'revenue_outbound');
    if (revenueOutbound) {
      expect(revenueOutbound!.payload.page_type, 'page_type must be "preflight"').toBe('preflight');
    }

    // Validate path and verdict across ALL events (different events have different field names)
    const allPaths = events.map(getPathFromEvent).filter(Boolean);
    const allVerdicts = events.map(getVerdictFromEvent).filter(Boolean);
    expect(allPaths.some(p => p === '/preflight'), 'path must be "/preflight" in at least one event').toBe(true);
    expect(allVerdicts.some(v => v === 'red'), 'verdict must be "red" in at least one event').toBe(true);

    // No share-related errors
    const shareErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError') ||
      e.includes('navigator.share')
    );
    expect(shareErrors.length, 'Must have no share-related errors').toBe(0);

    console.log('✅ Scenario A PASSED\n');
  });

  /**
   * Scenario B: YELLOW state - macOS + 16GB + 32B
   * Expected: revenue_outbound with page_type=preflight, verdict=yellow
   */
  test('B) YELLOW: macOS + 16GB + 32B → Gumroad CTA tracking', async ({ page }) => {
    // Select inputs for YELLOW state
    await selectCalculatorInputs(page, 'macos', '16gb', '32b');

    // Wait for status update
    await page.waitForTimeout(500);

    // Clear logs before CTA click
    await clearLogs(page);

    // Click Gumroad CTA (primary button in YELLOW state)
    const gumroadButton = page.getByText('Download Survival Kit').first();
    await gumroadButton.click();

    // Wait for tracking
    await page.waitForTimeout(1000);

    // Get captured events
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Assertions
    console.log('\n=== SCENARIO B: YELLOW STATE ===');
    console.log('Captured events:', events.length);
    events.forEach((e: any) => {
      console.log(`  ${e.eventName}:`, {
        page_type: e.payload.page_type,
        path: getPathFromEvent(e),
        verdict: getVerdictFromEvent(e),
        model: e.payload.model,
        vram: e.payload.vram,
      });
    });

    // Must have revenue_outbound event
    const revenueOutbound = events.find((e: any) => e.eventName === 'revenue_outbound');
    expect(revenueOutbound, 'Must have revenue_outbound event').toBeDefined();

    // Validate payload
    expect(revenueOutbound!.payload.page_type, 'page_type must be "preflight"').toBe('preflight');
    expect(getPathFromEvent(revenueOutbound!), 'path must be "/preflight"').toBe('/preflight');
    expect(getVerdictFromEvent(revenueOutbound!), 'verdict must be "yellow"').toBe('yellow');

    // No share-related errors
    const shareErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError') ||
      e.includes('navigator.share')
    );
    expect(shareErrors.length, 'Must have no share-related errors').toBe(0);

    console.log('✅ Scenario B PASSED\n');
  });

  /**
   * Scenario C: GREEN state - Windows + 24GB + 8B
   * Expected: cta_click with page_type=preflight, verdict=green, NO share errors
   */
  test('C) GREEN: Windows + 24GB + 8B → Copy Link tracking (no share errors)', async ({ page }) => {
    // Select inputs for GREEN state
    await selectCalculatorInputs(page, 'windows', '24gb', '8b');

    // Wait for status update
    await page.waitForTimeout(500);

    // Clear logs before CTA click
    await clearLogs(page);

    // Click Copy Link button (Save / Share)
    const copyButton = page.getByText('Save / Share').first();
    await copyButton.click();

    // Wait for tracking and toast
    await page.waitForTimeout(1000);

    // Get captured events
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Assertions
    console.log('\n=== SCENARIO C: GREEN STATE ===');
    console.log('Captured events:', events.length);
    events.forEach((e: any) => {
      console.log(`  ${e.eventName}:`, {
        page_type: e.payload.page_type,
        path: getPathFromEvent(e),
        verdict: getVerdictFromEvent(e),
        cta_id: e.payload.cta_id,
        model: e.payload.model,
        vram: e.payload.vram,
      });
    });

    // Must have cta_click event
    const ctaClick = events.find((e: any) => e.eventName === 'cta_click');
    expect(ctaClick, 'Must have cta_click event').toBeDefined();

    // Validate payload
    expect(ctaClick!.payload.page_type, 'page_type must be "preflight"').toBe('preflight');
    expect(getPathFromEvent(ctaClick!), 'path must be "/preflight"').toBe('/preflight');
    expect(getVerdictFromEvent(ctaClick!), 'verdict must be "green"').toBe('green');
    expect(ctaClick!.payload.cta_id, 'cta_id must contain "copy_link"').toContain('copy_link');

    // Critical: NO share-related errors
    const shareErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError') ||
      e.includes('navigator.share')
    );

    if (shareErrors.length > 0) {
      console.error('❌ Share errors found:', shareErrors);
    }
    expect(shareErrors.length, 'Must have NO share-related errors (AbortError/InvalidStateError)').toBe(0);

    // Verify toast appeared (link copied feedback)
    const toast = page.getByText('Link copied');
    expect(await toast.isVisible(), 'Toast "Link copied" must appear').toBe(true);

    console.log('✅ Scenario C PASSED\n');
  });

  /**
   * Scenario D: Impression deduplication check (WARNING, not blocking)
   */
  test('D) Impression deduplication - warn if duplicate impressions', async ({ page }) => {
    // Select any state
    await selectCalculatorInputs(page, 'windows', '16gb', '32b');

    await page.waitForTimeout(500);

    // Get impressions
    const events = await getUmamiEvents(page);
    const impressions = events.filter((e: any) => e.eventName === 'cta_impression');

    console.log('\n=== SCENARIO D: IMPRESSION DEDUPE CHECK ===');
    console.log(`Total impressions: ${impressions.length}`);

    // Check for duplicates
    const impressionKeys: string[] = [];
    const duplicates: string[] = [];

    impressions.forEach((imp: any) => {
      const key = `${imp.payload.placement}_${imp.payload.cta_id || 'no_id'}`;
      if (impressionKeys.includes(key)) {
        duplicates.push(key);
      } else {
        impressionKeys.push(key);
      }
    });

    if (duplicates.length > 0) {
      console.warn(`⚠️  WARNING: Duplicate impressions found: ${duplicates.join(', ')}`);
    } else {
      console.log('✅ No duplicate impressions detected');
    }

    console.log('Impression details:');
    impressions.forEach((imp: any, i: number) => {
      console.log(`  ${i + 1}. placement=${imp.payload.placement}, cta_id=${imp.payload.cta_id || 'N/A'}`);
    });
    console.log('');
  });
});

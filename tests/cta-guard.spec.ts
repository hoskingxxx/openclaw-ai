/**
 * CTA Guard E2E Test - Per-page CTA Limits
 *
 * Validates:
 * - Homepage (/, /) has max 2 strong CTAs
 * - Preflight (/preflight) has max 1 strong CTA
 * - OOM (/oom) has max 1 strong CTA
 * - Troubleshooting (/troubleshooting) has 0 strong CTAs
 * - Guide pages have max 1 strong CTA
 * - Preflight RED state shows 1 CTA, GREEN state shows 0
 *
 * Strong CTA defined by: data-cta-strong="1" attribute
 */

import { test, expect } from '@playwright/test';
import { blogPosts } from '../lib/blog';

test.describe('CTA Guard: Per-page limits', () => {

  /**
   * Helper: Count strong CTAs on current page
   */
  async function countStrongCTAs(page: any) {
    return await page.locator('[data-cta-strong="1"]').count();
  }

  test('Homepage (/) - max 2 strong CTAs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const count = await countStrongCTAs(page);
    expect(count, `Homepage has ${count} strong CTAs (max 2 allowed)`).toBeLessThanOrEqual(2);
  });

  test('Preflight (/preflight) - max 1 strong CTA', async ({ page }) => {
    await page.goto('/preflight');
    await page.waitForLoadState('domcontentloaded');

    const count = await countStrongCTAs(page);
    expect(count, `Preflight has ${count} strong CTAs (max 1 allowed)`).toBeLessThanOrEqual(1);
  });

  test('OOM (/oom) - max 1 strong CTA', async ({ page }) => {
    await page.goto('/oom');
    await page.waitForLoadState('domcontentloaded');

    const count = await countStrongCTAs(page);
    expect(count, `OOM page has ${count} strong CTAs (max 1 allowed)`).toBeLessThanOrEqual(1);
  });

  test('Troubleshooting (/troubleshooting) - 0 strong CTAs', async ({ page }) => {
    await page.goto('/troubleshooting');
    await page.waitForLoadState('domcontentloaded');

    const count = await countStrongCTAs(page);
    expect(count, `Troubleshooting has ${count} strong CTAs (0 allowed)`).toBe(0);
  });

  test('Guide page - max 1 strong CTA', async ({ page }) => {
    // Use first blog post as deterministic guide slug
    const guideSlug = blogPosts[0].slug;
    const guideUrl = `/guides/${guideSlug}`;

    await page.goto(guideUrl);
    await page.waitForLoadState('domcontentloaded');

    const count = await countStrongCTAs(page);
    expect(count, `Guide page has ${count} strong CTAs (max 1 allowed)`).toBeLessThanOrEqual(1);
  });

  test.describe('Preflight verdict-based CTA display', () => {

    /**
     * Helper: Select calculator inputs
     */
    async function selectCalculatorInputs(page: any, environment: string, vram: string, model: string) {
      const selects = page.locator('.grid.grid-cols-1.md\\:grid-cols-3 select');
      await selects.nth(0).selectOption(environment);
      await selects.nth(1).selectOption(vram);
      await selects.nth(2).selectOption(model);
      await page.waitForTimeout(500); // Wait for verdict to update
    }

    test('RED state - shows exactly 1 strong CTA', async ({ page }) => {
      await page.goto('/preflight');
      await page.waitForLoadState('domcontentloaded');

      // Select RED verdict (low VRAM + big model)
      await selectCalculatorInputs(page, 'windows', '8gb', '70b');

      const count = await countStrongCTAs(page);
      expect(count, `Preflight RED state has ${count} strong CTAs (expected 1)`).toBe(1);
    });

    test('GREEN state - shows 0 strong CTAs', async ({ page }) => {
      await page.goto('/preflight');
      await page.waitForLoadState('domcontentloaded');

      // Select GREEN verdict (sufficient VRAM + small model)
      await selectCalculatorInputs(page, 'windows', '24gb', '8b');

      const count = await countStrongCTAs(page);
      expect(count, `Preflight GREEN state has ${count} strong CTAs (expected 0)`).toBe(0);
    });
  });
});

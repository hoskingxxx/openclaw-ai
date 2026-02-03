#!/usr/bin/env node

/**
 * OpenClaw SEO Link Crawler
 * Simulates GoogleBot to ensure zero 404 errors before indexing
 */

import { check } from 'linkinator';

async function run() {
  const results = await check({
    path: process.env.START_URL || 'http://localhost:3000',
    recurse: true,
    linksToSkip: [
      /^(?!http:\/\/localhost:3000)/ // Skip external links
    ]
  });

  console.log(`\n📊 Total Links: ${results.links.length}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏭️ Skipped: ${results.skipped}\n`);

  if (!results.passed) {
    console.error('❌ BROKEN LINKS FOUND:\n');
    results.links
      .filter(x => x.state === 'BROKEN')
      .forEach(x => console.error(`   ❌ ${x.url} (on ${x.parent})`));
    console.log('');
    process.exit(1);
  }

  console.log('✅ SEO Health Check Passed!\n');
}

run().catch(err => {
  console.error('❌ FATAL ERROR:', err.message);
  process.exit(1);
});

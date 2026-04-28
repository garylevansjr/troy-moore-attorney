#!/usr/bin/env node
// a11y-check.mjs — axe-core/playwright accessibility check against each route.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync, appendFileSync } from 'fs';

const PREVIEW_URL = (process.env.PREVIEW_URL || '').replace(/\/$/, '');
const ROUTES      = JSON.parse(process.env.ROUTES_JSON || '["/"]');

if (!PREVIEW_URL) {
  console.error('[a11y] PREVIEW_URL not set');
  process.exit(1);
}

const violations = [];
let blockingCount = 0;
let warningCount  = 0;

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const context  = await browser.newContext({ ignoreHTTPSErrors: true });

for (const route of ROUTES) {
  const url = `${PREVIEW_URL}${route}`;
  const page = await context.newPage();

  try {
    console.log(`[a11y] Checking ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    for (const v of results.violations) {
      // serious/critical → blocking; moderate/minor → warning
      const severity = ['critical', 'serious'].includes(v.impact) ? 'blocking' : 'warning';
      if (severity === 'blocking') blockingCount++;
      else warningCount++;

      violations.push({
        route,
        id:          v.id,
        impact:      v.impact,
        severity,
        description: v.description,
        nodes:       v.nodes.length,
        help_url:    v.helpUrl,
      });

      console.log(`  [${severity}] ${v.impact} — ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
    }
  } catch (err) {
    console.error(`[a11y] Failed to check ${url}:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();

const passed = blockingCount === 0;
const output = { violations, blocking_count: blockingCount, warning_count: warningCount, passed };
writeFileSync('a11y-results.json', JSON.stringify(output, null, 2));
console.log(`[a11y] Done — ${blockingCount} blocking, ${warningCount} warnings`);

// Set GitHub Actions step outputs
const ghaOut = process.env.GITHUB_OUTPUT;
if (ghaOut) {
  try {
    appendFileSync(ghaOut, `blocking_count=${blockingCount}\nwarning_count=${warningCount}\npassed=${passed}\n`);
  } catch { /* */ }
}

if (!passed) process.exit(1);

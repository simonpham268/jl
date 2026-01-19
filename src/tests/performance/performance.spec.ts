import { test } from '@playwright/test';

// Simple performance test: measure page load time

test('Performance: Home page load time', async ({ page }) => {
  const start = Date.now();
  await page.goto('https://www.demoblaze.com/');
  const loadTime = Date.now() - start;
  test.info().annotations.push({ type: 'performance', description: `Load time: ${loadTime}ms` });
  // Example threshold
  if (loadTime > 5000) {
    throw new Error(`Page load time too high: ${loadTime}ms`);
  }
});

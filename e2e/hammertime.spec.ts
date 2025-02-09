import { test, expect } from '@playwright/test';

test('Go to page', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/It's Hammertime!/);
});


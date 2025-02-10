import { test, expect } from '@playwright/test';

test('Go to page', async ({ page }) => {
  await page.goto('https://localhost:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/It's Hammertime!/);
});


test.describe('Whack-a-Mole Game', () => {
    test('Start the game and whack a mole', async ({ page }) => {
        await page.goto('https://localhost:8080/');

        // Verify the title
        await expect(page).toHaveTitle(/It's Hammertime!/);

        // Ensure the start button is visible and click it
        const startButton = page.getByRole('button', { name: 'Start Game' });
        await expect(startButton).toBeVisible();
        await startButton.click();

        // Allow game logic to process
        await page.waitForTimeout(3000); // Let the game loop run

        const activeMoles = await page.locator('[data-testid="mole"]').filter({ hasText: /Whack me!/ }).all();
        if (activeMoles.length > 0) {
            const randomMole = activeMoles[Math.floor(Math.random() * activeMoles.length)];
            await randomMole.click();
        }

        const scoreElement = page.locator('text=Score:');

        // Allow state update
        await page.waitForTimeout(500);

        // Verify the score has increased
        const updatedScoreText = await scoreElement.textContent();
        const updatedScore = parseInt(updatedScoreText?.split(':')[1] ?? '0', 10);

        expect(updatedScore).toBeGreaterThan(0);
    });
});




import { test, expect } from '@playwright/test';

test('create and confirm a payment intent with a saved payment method', async ({ page }) => {
await page.goto('/');
    
test('create a payment intent', async ({ page }) => {
  // expect to see the cart summary
  // this confirms that we were able to successfully create a payment intent
  await expect(page.getByTestId('cart-summary-container')).toBeVisible();
});

});
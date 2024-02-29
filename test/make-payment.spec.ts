import { test, expect } from '@playwright/test';
import {
  generateRegexFromArray,
  DelimiterEnum
} from '@dpatt/delimiterized-regex-builder';

test('creates a new payment intent', async ({ page }) => {
  await page.goto('/');
  // expect to see the cart summary
  // this confirms that we were able to successfully create a payment intent
  await expect(page.getByTestId('cart-summary-container')).toBeVisible();
});

test('create and confirm a payment intent with a new card payment method', async ({
  page
}) => {
  const paymentFormContainer = page.getByTestId('payment-form-container');
  const billingDetailsNameContainer = paymentFormContainer.getByTestId(
    'billing-details-name-element'
  );
  const consoleMsgArr: string[] = [];

  await page.goto('/');

  // Listen for all console logs
  page.on('console', (msg) => {
    console.log(msg.text());
    consoleMsgArr.push(msg.text());
  });

  // Fail the test if there is an error
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log(`Error text: "${msg.text()}"`);

    expect(msg.type()).not.toBe('error');
  });

  // Fill out the billing details form
  await billingDetailsNameContainer.locator('input').fill('Testy McTesterson');
  await page.keyboard.press('Tab');
  await page.keyboard.type('123 Test St');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.getByText('United States').click();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.getByText('Alaska').click();
  await page.keyboard.press('Tab');
  await page.keyboard.type('Test City');
  await page.keyboard.press('Tab');
  await page.keyboard.type('12345');

  // Fill out the payment form
  await paymentFormContainer.getByTestId('card-number-element').click();
  await page.keyboard.type('4111111111111111');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1234');
  await page.keyboard.press('Tab');
  await page.keyboard.type('123');

  // submit the payment form
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  // paymentFormContainer.getByTestId('submit-button').click();

  // Wait for the payment intent to be confirmed
  await new Promise((r) => setTimeout(r, 2000));

  // expect console.log to show the payment intent status
  // this confirms that we were able to successfully confirm the payment intent
  expect(consoleMsgArr.join('\n')).toMatch(
    generateRegexFromArray(
      [
        'creating new pm card {name: Testy McTesterson, address: Object}',
        'new pm {ach_debit: null, billing_details: Object, card: Object, card_present: null, chargeable: true}',
        'attaching pm to customer {ach_debit: null, billing_details: Object, card: Object, card_present: null, chargeable: true}',
        'using saved pm {ach_debit: null, billing_details: Object, card: Object, card_present: null, chargeable: true}'
      ],
      DelimiterEnum.wildcards
    )
  );
});

test('confirm a payment intent with a saved card payment method', async ({
  page
}) => {
  const paymentFormContainer = page.getByTestId('payment-form-container');
  const paymentMethodSelect = paymentFormContainer.getByTestId(
    'payment-method-select'
  );
  const consoleMsgArr: string[] = [];

  await page.goto('/');

  // Listen for all console logs
  page.on('console', (msg) => {
    console.log(msg.text());
    consoleMsgArr.push(msg.text());
  });

  // Fail the test if there is an error
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log(`Error text: "${msg.text()}"`);

    expect(msg.type()).not.toBe('error');
  });

  // expect payment method select to be visible and select the saved card payment method
  await expect(paymentMethodSelect).toBeVisible();
  await paymentMethodSelect.click();
  await page.getByTestId('pm-option-visa-1111').click(); // this element is dynamically generated. It's not in the initial HTML

  // submit the payment form
  paymentFormContainer.getByTestId('submit-button').click();

  // Wait for the payment intent to be confirmed
  await new Promise((r) => setTimeout(r, 2000));

  // expect console.log to show the payment intent status
  // this confirms that we were able to successfully confirm the payment intent
  expect(consoleMsgArr.join('\n')).toMatch(
    generateRegexFromArray(
      [
        'Processing payment with selected pm: pm_',
        'confirmed payment',
        'creating subscriptions',
        'subscription created for sub_',
        'subscription created for sub_'
      ],
      DelimiterEnum.wildcards
    )
  );
});

import { test, expect } from '@playwright/test';

test('Home page loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check if the page title is correct
  await expect(page).toHaveTitle(/Home/);
  
  // Check if the main heading is present
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Welcome to Our App');
  
  // Check if the navigation menu is present
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  
  // Check if there's a login button
  const loginButton = page.locator('button:has-text("Login")');
  await expect(loginButton).toBeVisible();
});
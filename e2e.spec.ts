import { test, expect } from '@playwright/test';

test('full user flow: register -> vp login -> add timetable', async ({ page }) => {
  // 1. Register Student
  await page.goto('http://localhost:5173/register');
  await page.fill('input[name="name"]', 'Test Student');
  await page.fill('input[name="registrationNumber"]', 'FUD/TEST/26/001');
  await page.fill('input[name="email"]', 'test@student.fudma.edu.ng');
  
  // Select department
  await page.click('button[role="combobox"]'); 
  await page.click('div[role="option"]:has-text("Software Engineering")');
  
  await page.click('button:has-text("Complete Registration")');
  
  // Expect success
  await expect(page.locator('text=Registration Successful!')).toBeVisible({ timeout: 10000 });
  const nacosIdElement = page.locator('.text-4xl');
  await expect(nacosIdElement).toBeVisible();
  const nacosId = await nacosIdElement.innerText();
  expect(nacosId).toContain('NACOS-26-');

  // 2. VP Login
  await page.goto('http://localhost:5173/executives');
  
  // Ensure we are on the login screen
  await expect(page.locator('text=VP Admin Portal')).toBeVisible();

  await page.fill('input[id="username"]', 'vp_software');
  await page.fill('input[id="code"]', 'vp-soft-2026');
  await page.click('button:has-text("Login")');
  
  await expect(page.locator('text=VP Dashboard')).toBeVisible();

  // 3. Add Schedule
  await page.fill('input[placeholder="e.g. CSC 301"]', 'TEST 101');
  
  // Select Day
  await page.click('button:has-text("Select Day")');
  await page.click('div[role="option"]:has-text("Monday")');
  
  await page.fill('input[placeholder="e.g. 10:00 AM"]', '9:00 AM');
  await page.fill('input[placeholder="e.g. Lab 1"]', 'Test Venue');
  
  await page.click('button:has-text("Add Schedule")');
  
  await expect(page.locator('text=Schedule Added')).toBeVisible();
  await expect(page.locator('text=TEST 101')).toBeVisible();

  // 4. Verify Public Timetable
  await page.goto('http://localhost:5173/timetable');
  await page.click('button:has-text("Departmental Tutorials")');
  
  // Wait for tabs to be interactive
  await page.click('button:has-text("Software Engineering")');
  
  await expect(page.locator('text=TEST 101')).toBeVisible();
});
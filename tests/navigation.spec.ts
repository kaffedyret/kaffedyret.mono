import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Navigation menu", () => {
  test("should display the same menu items on desktop and mobile", async ({
    page,
  }) => {
    const desktopNavText = await page
      .locator("nav[role=navigation] [data-test-id=navigation-desktop] ul li a")
      .allInnerTexts();
    const mobileNavText = await page
      .locator("nav[role=navigation] [data-test-id=navigation-mobile] ul li a")
      .allInnerTexts();

    expect(desktopNavText).toEqual(mobileNavText);
  });
});

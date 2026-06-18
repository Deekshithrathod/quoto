import { expect, test } from "@playwright/test";

test("homepage quote details and theme toggle work", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Random Quote/);
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  const quote = page.locator("blockquote summary").first();
  const details = page.locator("blockquote details").first();

  await expect(details).not.toHaveAttribute("open", "");
  await quote.click();
  await expect(details).toHaveAttribute("open", "");

  await expect(page.getByText("Author").first()).toBeVisible();
  await expect(page.getByText("Genre").first()).toBeVisible();
});

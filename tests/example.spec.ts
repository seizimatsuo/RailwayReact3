import { test, expect } from "@playwright/test";

/*テストグループ*/
test.describe("フォーム", () => {
  /*最初に実行される処理*/
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("メールアドレスが空の場合エラー", async ({ page }) => {
    await page.fill('input[type="password"]', "pass");
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator(".error-message").innerText();
    expect(errorMessage).toBe("入力してください");
  });

  test("パスワードが空の場合エラー", async ({ page }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator(".error-message").innerText();
    expect(errorMessage).toBe("入力してください");
  });

  test("メールアドレスとパスワードが入力されている場合", async ({ page }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "pass");
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator(".error-message");
    expect(await errorMessage.count()).toBe(0);
  });
});

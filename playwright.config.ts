import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests" /*ディレクトリの指定 */,
  /* Run tests in files in parallel */
  fullyParallel: true /*テストが並列に実行される*/,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly:
    !!process.env
      .CI /*ソースコード内にtest.onlyが残っている場合、CI環境でビルドを失敗させる。process.env.CIがtrueの場合にtrueになる。*/,
  /* Retry on CI only */
  retries: process.env.CI
    ? 2
    : 0 /*テストの再試行回数を指定する。CI環境では2回再試行する*/,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI
    ? 1
    : undefined /*CI環境では並列実行をオプトアウトし、1つのワーカーでテストを実行する。*/,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html" /*テストレポートの形式指定 html*/,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry" /*失敗したテストを再試行する際にトレースを収集*/,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev", // サーバーを起動するコマンド
    url: "http://localhost:5173/", // アクセス可能なURL
    reuseExistingServer: !process.env.CI, // 既存のサーバーを再利用するか
  },
});

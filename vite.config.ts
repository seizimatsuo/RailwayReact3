import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";
import type { InlineConfig } from "vitest";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  test: {
    include: [
      "src/_tests_/**/*.test.{js,ts,jsx,tsx}",
      "src/_tests_/**/*.spec.{js,ts,jsx,tsx}",
    ],
    environment: "jsdom",
  },
} as VitestConfigExport);

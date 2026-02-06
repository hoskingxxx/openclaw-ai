import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Test files location
    include: ["lib/**/*.test.ts"],

    // Exclude non-test files
    exclude: ["node_modules", "dist", ".next"],

    // TypeScript support (uses project's tsconfig.json)
    typecheck: {
      enabled: false,
    },

    // Test environment (node for unit tests)
    environment: "node",

    // Coverage (optional, disabled for now)
    coverage: {
      enabled: false,
    },

    // Enable global test APIs (describe, it, expect)
    globals: true,

    // Reporter (use default)
    reporters: ["default"],
  },
});

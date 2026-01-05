import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 1. Shared Rules (JS/TS)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "no-console": ["error", { allow: ["warn", "error"] }],

      // ... your other rules
      "@next/next/no-assign-module-variable": "off", // If it's a module variable error
      "react-hooks/exhaustive-deps": "off",
      // Next.js often uses the internal React rules for this specific error:
      "react/jsx-no-bind": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // 2. TypeScript-Specific (Type-Checked)
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true, // Modern way to handle tsconfig in ESLint 9
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Spreads the recommended rules that require type information
      ...tseslint.configs.recommendedTypeChecked.rules,
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

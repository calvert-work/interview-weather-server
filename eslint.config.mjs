import eslint from "@eslint/js"
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,ts}"], languageOptions: { globals: globals.node } },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "indent": ["error", "tab"],
      "prefer-const": "error",
      "eqeqeq": "error",
      "no-plusplus": ["error"]
    }
  },
  globalIgnores([
    "*.config.*",
    "node_modules",
    ".*",
    "coverage",
    "build"
  ])
]);

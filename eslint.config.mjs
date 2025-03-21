import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow `any` type
      "@typescript-eslint/no-unused-vars": "warn", // Change unused vars from error to warning
      "react/no-unescaped-entities": "off", // Allow unescaped entities in JSX
      "react/jsx-no-comment-textnodes": "off", // Allow comments inside JSX text nodes
      "next/next/no-html-link-for-pages": "off", // Allow <a> tags instead of <Link />
      "no-var": "warn", // Change 'no-var' to warning instead of error
      "prefer-const": "warn", // Change 'prefer-const' to warning instead of error
    },
  },
];
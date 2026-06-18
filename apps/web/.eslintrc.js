/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  env: {
    browser: true,
  },
  ignorePatterns: [
    "postcss.config.js",
    "tailwind.config.js",
    "public/service-worker.js",
    "public/workbox-*.js",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};

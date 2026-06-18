// Loads @testing-library/jest-dom's custom matcher types into the Vitest
// `expect` so `tsc` recognises matchers (toHaveAttribute, toBeInTheDocument,
// ...) used in test files. The matchers themselves are registered at runtime
// by the root vitest.setup.ts, which lives outside this project's tsconfig.
import "@testing-library/jest-dom/vitest";

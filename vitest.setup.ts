import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map<string, string>();

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      clear: () => store.clear(),
      getItem: (key: string) => store.get(key) ?? null,
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      removeItem: (key: string) => store.delete(key),
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      get length() {
        return store.size;
      },
    },
  });
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];

  disconnect = () => {};
  observe = () => {};
  takeRecords = () => [];
  unobserve = () => {};
}

Object.defineProperty(window, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(window, "scrollTo", {
  configurable: true,
  writable: true,
  value: () => {},
});

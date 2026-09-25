import '@testing-library/jest-dom/vitest'

// jsdom does not implement layout APIs used by the palette and section links.
Element.prototype.scrollIntoView = () => {}

// jsdom has no matchMedia; GSAP and the reduced-motion hooks query it.
window.matchMedia ??= (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList

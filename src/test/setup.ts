import '@testing-library/jest-dom/vitest'

// jsdom does not implement layout APIs used by the palette and section links.
Element.prototype.scrollIntoView = () => {}

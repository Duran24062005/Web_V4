import { useSyncExternalStore } from 'react'

const noopSubscribe = () => () => {}

/**
 * Reads a browser-only value without breaking hydration: the prerendered HTML and the
 * first client render use `serverValue`, then React re-renders with `getClientValue()`.
 * `getClientValue` must return a primitive (or a cached reference) so it stays stable.
 */
export const useClientValue = <T>(
  getClientValue: () => T,
  serverValue: T,
  subscribe: (onChange: () => void) => () => void = noopSubscribe,
) => useSyncExternalStore(subscribe, getClientValue, () => serverValue)

export const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  query?.addEventListener('change', onChange)
  return () => query?.removeEventListener('change', onChange)
}

export const getPrefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export const usePrefersReducedMotion = () =>
  useClientValue(getPrefersReducedMotion, false, subscribeToReducedMotion)

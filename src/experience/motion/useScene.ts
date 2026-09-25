import { useEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion, useSafeEffects } from '../../shared/hooks/useReducedMotion'
import { ensureMotionRuntime } from './runtime'

export interface SceneTools {
  /** Glitch/flash effects are off (safe mode or reduced motion). */
  safe: boolean
  /** ScrollTrigger defaults for "play once when the section scrolls in". */
  onEnter: (trigger?: Element | string, start?: string) => ScrollTrigger.Vars
}

/**
 * Runs a section's choreography inside a GSAP context scoped to `ref`: selectors resolve
 * inside the section and everything (tweens, ScrollTriggers, inline styles) is reverted on
 * unmount. Skipped entirely under reduced motion, so the static markup is the fallback.
 *
 *   useScene(ref, (root, { onEnter }) => {
 *     gsap.from('.card', { rotateY: -90, stagger: 0.1, scrollTrigger: onEnter() })
 *   })
 */
export const useScene = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (root: T, tools: SceneTools) => void | (() => void),
  deps: DependencyList = [],
) => {
  const reduced = useReducedMotion()
  const safe = useSafeEffects()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) {
      return
    }

    ensureMotionRuntime()
    let cleanup: void | (() => void)
    const context = gsap.context(() => {
      cleanup = setup(root, {
        safe,
        onEnter: (trigger = root, start = 'top 72%') => ({ trigger, start, once: true }),
      })
    }, root)

    return () => {
      cleanup?.()
      context.revert()
    }
    // `setup` is intentionally not a dependency: sections pass inline functions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, safe, ...deps])
}

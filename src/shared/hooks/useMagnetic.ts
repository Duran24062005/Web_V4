import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { isFinePointer } from '../../experience/motion/pointer'
import { useReducedMotion } from './useReducedMotion'

/**
 * Pulls an element toward the cursor while the pointer is over it and snaps back with an
 * elastic ease on leave. Fine pointers only; off under reduced motion.
 * `strength` is the fraction of the cursor offset the element follows (0.3 ≈ subtle).
 */
export const useMagnetic = <T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.3) => {
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = ref.current

    if (!element || reduced || strength === 0 || !isFinePointer()) {
      return
    }

    const toX = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power3.out' })
    const toY = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power3.out' })

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      toX((event.clientX - (rect.left + rect.width / 2)) * strength)
      toY((event.clientY - (rect.top + rect.height / 2)) * strength)
    }

    const handleLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)', overwrite: true })
    }

    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', handleLeave)

    return () => {
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', handleLeave)
      gsap.set(element, { clearProps: 'transform' })
    }
  }, [ref, reduced, strength])
}

import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { isFinePointer } from '../../experience/motion/pointer'
import { useReducedMotion } from './useReducedMotion'

/**
 * 3D tilt toward the cursor plus a holographic glare. Writes `--glare-x` / `--glare-y`
 * (0–100%) and `--glare-o` (0–1) on the element so CSS can paint the sheen.
 * The parent should set `perspective`.
 */
export const useTilt = <T extends HTMLElement>(ref: RefObject<T | null>, maxDeg = 9) => {
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = ref.current

    if (!element || reduced || !isFinePointer()) {
      return
    }

    const rotateX = gsap.quickTo(element, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const rotateY = gsap.quickTo(element, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    gsap.set(element, { transformPerspective: 900 })

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      rotateY((x - 0.5) * 2 * maxDeg)
      rotateX(-(y - 0.5) * 2 * maxDeg)
      element.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`)
      element.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`)
      element.style.setProperty('--glare-o', '1')
    }

    const handleLeave = () => {
      rotateX(0)
      rotateY(0)
      element.style.setProperty('--glare-o', '0')
    }

    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', handleLeave)

    return () => {
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', handleLeave)
      gsap.set(element, { clearProps: 'transform' })
    }
  }, [ref, reduced, maxDeg])
}

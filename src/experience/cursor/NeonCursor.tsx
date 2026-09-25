import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useClientValue } from '../../shared/hooks/useClientValue'
import { isFinePointer } from '../motion/pointer'

const TRAIL = 7
const interactive = 'a[href], button, [role="option"], [role="switch"], input, textarea, select, label, [data-cursor]'

/**
 * Crosshair cursor with a neon trail. Fine pointers only and never under reduced motion.
 * The native cursor comes back over text fields (see components.css).
 */
export const NeonCursor = ({ enabled }: { enabled: boolean }) => {
  const finePointer = useClientValue(isFinePointer, false)
  return enabled && finePointer ? <CursorLayer /> : null
}

const CursorLayer = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const html = document.documentElement
    html.dataset.cursor = 'on'
    const dot = root.querySelector<HTMLElement>('.yk-cursor-dot')!
    const ring = root.querySelector<HTMLElement>('.yk-cursor-ring')!
    const trail = Array.from(root.querySelectorAll<HTMLElement>('.yk-cursor-trail'))

    const movers = [
      { x: gsap.quickTo(dot, 'x', { duration: 0.05 }), y: gsap.quickTo(dot, 'y', { duration: 0.05 }) },
      { x: gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' }), y: gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' }) },
      ...trail.map((element, index) => ({
        x: gsap.quickTo(element, 'x', { duration: 0.12 + index * 0.045, ease: 'power2.out' }),
        y: gsap.quickTo(element, 'y', { duration: 0.12 + index * 0.045, ease: 'power2.out' }),
      })),
    ]

    const onMove = (event: PointerEvent) => {
      root.classList.add('is-visible')
      movers.forEach((mover) => {
        mover.x(event.clientX)
        mover.y(event.clientY)
      })
    }
    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest(interactive)
      root.classList.toggle('is-hover', Boolean(target))
      root.classList.toggle('is-text', Boolean(target?.matches('input, textarea, select')))
    }
    const onDown = () => root.classList.add('is-press')
    const onUp = () => root.classList.remove('is-press')
    const onLeave = () => root.classList.remove('is-visible')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      delete html.dataset.cursor
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={rootRef} className="yk-cursor" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, index) => (
        <span key={index} className="yk-cursor-trail" style={{ '--i': index } as React.CSSProperties} />
      ))}
      <span className="yk-cursor-ring" />
      <span className="yk-cursor-dot" />
    </div>
  )
}

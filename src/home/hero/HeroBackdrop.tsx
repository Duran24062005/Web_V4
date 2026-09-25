import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { detectGfxTier } from '../../experience/gfx'
import { useClientValue } from '../../shared/hooks/useClientValue'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import { cn } from '../../lib/utils'

const HeroScene = lazy(() => import('./HeroScene'))

/**
 * Static stand-in for the 3D scene: horizon glow, a perspective grid and a neon ring.
 * It is what the prerendered HTML, low-end phones, Save-Data and no-WebGL browsers show,
 * and it stays underneath while the canvas loads so nothing pops.
 */
const HeroFallback = () => (
  <div className="yk-hero-fallback">
    <div className="yk-hero-fallback-glow" />
    <svg className="yk-hero-fallback-ring" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="yk-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00f0ff" />
          <stop offset="1" stopColor="#ff2bd6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#yk-ring)" strokeWidth="2">
        <ellipse cx="200" cy="200" rx="150" ry="58" transform="rotate(-24 200 200)" />
        <ellipse cx="200" cy="200" rx="150" ry="58" transform="rotate(36 200 200)" opacity="0.7" />
        <ellipse cx="200" cy="200" rx="150" ry="58" transform="rotate(96 200 200)" opacity="0.45" />
      </g>
      <circle cx="200" cy="200" r="34" fill="none" stroke="#ff2bd6" strokeDasharray="4 6" />
    </svg>
    <div className="yk-hero-fallback-floor" />
  </div>
)

export const HeroBackdrop = () => {
  const reduced = useReducedMotion()
  const tier = useClientValue(detectGfxTier, 'off')
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '80px' })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={cn('yk-hero-backdrop', ready && 'is-ready')} aria-hidden="true">
      <HeroFallback />
      {tier !== 'off' ? (
        <Suspense fallback={null}>
          <HeroScene tier={tier} animate={!reduced} running={inView} onReady={() => setReady(true)} />
        </Suspense>
      ) : null}
    </div>
  )
}

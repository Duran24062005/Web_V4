import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useReducedMotion, useSafeEffects } from '../shared/hooks/useReducedMotion'
import { audio } from './audio/engine'
import { ensureMotionRuntime, scrollToTarget } from './motion/runtime'

/**
 * "Scene change" between routes: two neon panels slam shut along a diagonal and slide away
 * over the new page, like an anime cut. The new route renders immediately underneath, so this
 * never delays navigation. Also resets the scroll (and focus) to the top of the new page.
 * Hash-only changes (in-page anchors) are ignored.
 */
export const SceneTransition = () => {
  const { pathname, hash } = useLocation()
  const reduced = useReducedMotion()
  const safe = useSafeEffects()
  const ref = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (!hash) {
      scrollToTarget(0, true)
      document.getElementById('main')?.focus({ preventScroll: true })
    }

    const root = ref.current
    if (!root || reduced) {
      return
    }

    ensureMotionRuntime()
    audio.play('transition')
    const panels = root.querySelectorAll('.yk-scene-panel')
    const timeline = gsap
      .timeline()
      .set(root, { autoAlpha: 1 })
      .fromTo(panels, { xPercent: 0 }, { xPercent: (index) => (index === 0 ? -110 : 110), duration: 0.75, ease: 'expo.inOut', delay: 0.08 })
      .set(root, { autoAlpha: 0 })

    if (!safe) {
      timeline.fromTo(root.querySelector('.yk-scene-flash'), { opacity: 0.9 }, { opacity: 0, duration: 0.25 }, 0)
    }

    return () => {
      timeline.kill()
      gsap.set(root, { autoAlpha: 0 })
    }
    // Only a new pathname is a scene change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div ref={ref} className="yk-scene" aria-hidden="true">
      <div className="yk-scene-panel yk-scene-panel--a" />
      <div className="yk-scene-panel yk-scene-panel--b" />
      <div className="yk-scene-flash" />
    </div>
  )
}

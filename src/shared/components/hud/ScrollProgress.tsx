import { useEffect, useRef } from 'react'

/** Thin neon bar across the top of the HUD showing how far the page has been read. */
export const ScrollProgress = () => {
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      barRef.current?.style.setProperty('transform', `scaleX(${progress})`)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <span className="yk-hud-progress" aria-hidden="true">
      <span ref={barRef} />
    </span>
  )
}

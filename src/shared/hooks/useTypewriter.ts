import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './useClientValue'

/** Types `text` once, one character per `stepMs`. Shows the full text at once with reduced motion. */
export const useTypewriter = (text: string, { stepMs = 55, delayMs = 250 } = {}) => {
  const reducedMotion = usePrefersReducedMotion()
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setLength((current) => {
          if (current >= text.length) {
            window.clearInterval(interval)
            return current
          }
          return current + 1
        })
      }, stepMs)
    }, delayMs)

    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [text, stepMs, delayMs, reducedMotion])

  const visible = reducedMotion ? text.length : length
  return { typed: text.slice(0, visible), done: visible >= text.length }
}

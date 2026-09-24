import { useEffect } from 'react'

/**
 * Fades `[data-reveal]` elements in once, the first time they enter the viewport.
 * Elements stay visible if JS or IntersectionObserver is unavailable, because the
 * hidden state only applies under `html.js-reveal`.
 */
export const useReveal = (refreshKey: unknown = null) => {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    // Anything already on screen (e.g. after hydrating prerendered HTML) stays visible
    // instead of flashing out and back in.
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add('is-visible')
      }
    })
    document.documentElement.classList.add('js-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    document
      .querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [refreshKey])
}

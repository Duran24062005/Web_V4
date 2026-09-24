import { useEffect, useState } from 'react'

/**
 * Tracks which section crosses the middle band of the viewport.
 * Returns null while the hero (or nothing) is in that band.
 */
export const useActiveSection = (ids: readonly string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return
    }

    const visible = new Map<string, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        setActiveId(ids.find((id) => visible.get(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

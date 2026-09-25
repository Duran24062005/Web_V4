/**
 * Viewport pointer shared by everything that reacts to the mouse (3D camera rig, cursor,
 * parallax). One passive listener instead of one per component.
 * x/y are normalized to -1…1 from the viewport center; px/py are pixels.
 */
export const pointer = { x: 0, y: 0, px: 0, py: 0, active: false }

let listening = false

export const trackPointer = () => {
  if (listening || typeof window === 'undefined') {
    return
  }

  listening = true
  pointer.px = window.innerWidth / 2
  pointer.py = window.innerHeight / 2

  window.addEventListener(
    'pointermove',
    (event) => {
      pointer.px = event.clientX
      pointer.py = event.clientY
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
      pointer.active = true
    },
    { passive: true },
  )
}

export const isFinePointer = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false)

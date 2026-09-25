/**
 * How much 3D this device gets.
 *  - off:  no WebGL, Save-Data, or a low-end phone → static CSS/SVG fallback
 *  - lite: phones/tablets and modest CPUs → 3D without post-processing, fewer particles, dpr ≤ 1.25
 *  - full: desktop → bloom, chromatic aberration, scanlines, noise
 */
export type GfxTier = 'off' | 'lite' | 'full'

interface NavigatorHints {
  connection?: { saveData?: boolean }
  deviceMemory?: number
}

const hasWebGL = () => {
  if (typeof WebGLRenderingContext === 'undefined') {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

let cached: GfxTier | null = null

export const detectGfxTier = (): GfxTier => {
  if (cached) {
    return cached
  }

  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'off'
  }

  const hints = navigator as Navigator & NavigatorHints
  const cores = navigator.hardwareConcurrency || 4
  const memory = hints.deviceMemory ?? 4
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false

  if (hints.connection?.saveData || !hasWebGL()) {
    cached = 'off'
  } else if (coarse && (cores <= 4 || memory <= 3)) {
    cached = 'off'
  } else if (coarse || window.innerWidth < 900 || cores <= 4) {
    cached = 'lite'
  } else {
    cached = 'full'
  }

  return cached
}

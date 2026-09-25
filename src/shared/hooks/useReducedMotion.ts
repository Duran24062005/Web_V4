import { useSettings } from '../../experience/settings.store'
import { usePrefersReducedMotion } from './useClientValue'

/** True when the OS asks for reduced motion or the viewer turned on "calm" mode. */
export const useReducedMotion = () => {
  const prefersReduced = usePrefersReducedMotion()
  const calm = useSettings((state) => state.calm)
  return prefersReduced || calm
}

/** True when glitch, flicker and flashes must stay off (photosensitive-safe). */
export const useSafeEffects = () => {
  const reduced = useReducedMotion()
  const safeMode = useSettings((state) => state.safeMode)
  return reduced || safeMode
}

import { useEffect } from 'react'
import { useReducedMotion, useSafeEffects } from '../shared/hooks/useReducedMotion'
import { useAudioRuntime } from './audio/useSound'
import { BootScreen } from './boot/BootScreen'
import { NeonCursor } from './cursor/NeonCursor'
import { ensureMotionRuntime, startSmoothScroll } from './motion/runtime'
import { SceneTransition } from './SceneTransition'
import { trackPointer } from './motion/pointer'
import { useSettings } from './settings.store'

/** Film grain, CRT scanlines and a vignette over the whole site. Pure CSS, decorative. */
const Atmosphere = () => (
  <div className="yk-atmos" aria-hidden="true">
    <div className="yk-atmos-grain animate-grain" />
    <div className="yk-atmos-scan" />
    <div className="yk-atmos-vignette" />
  </div>
)

/**
 * Everything the public site needs once, above the routes: preferences, the shared motion
 * loop, smooth scroll, audio, cursor, the intro. Renders nothing meaningful on the server.
 */
export const ExperienceRuntime = () => {
  const reduced = useReducedMotion()
  const safe = useSafeEffects()

  useEffect(() => {
    void useSettings.persist.rehydrate()
    ensureMotionRuntime()
    trackPointer()
  }, [])

  // CSS hooks: html[data-fx='safe'] kills flicker/glitch, html[data-motion='reduce'] the rest.
  useEffect(() => {
    const html = document.documentElement
    html.dataset.fx = safe ? 'safe' : 'full'
    html.dataset.motion = reduced ? 'reduce' : 'full'
  }, [safe, reduced])

  useEffect(() => {
    if (reduced) {
      return
    }
    return startSmoothScroll()
  }, [reduced])

  useAudioRuntime(reduced)

  return (
    <>
      <Atmosphere />
      <SceneTransition />
      <BootScreen />
      <NeonCursor enabled={!reduced} />
    </>
  )
}

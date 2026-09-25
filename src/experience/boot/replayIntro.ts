import { clearIntroSeen } from '../../lib/preferences'
import { scrollToTarget } from '../motion/runtime'
import { useRuntime, useSettings } from '../settings.store'

/** Plays the intro again (palette command / SYS panel). Does nothing in calm mode. */
export const replayIntro = () => {
  const reduced =
    useSettings.getState().calm || (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  if (reduced) {
    return
  }

  clearIntroSeen()
  scrollToTarget(0, true)
  const html = document.documentElement
  html.dataset.boot = 'pending'
  html.dataset.intro = 'pending'
  useRuntime.getState().setBoot('pending')
}

import { useCallback, useEffect, useRef } from 'react'
import { isFinePointer } from '../motion/pointer'
import { useSettings } from '../settings.store'
import { audio, type SfxName } from './engine'

export type { SfxName }

const playSfx = (name: SfxName) => audio.play(name)

/**
 * The one entry point components use for sound.
 * `play` is a no-op until the viewer turns sound on, so callers never check first.
 */
export const useSound = () => {
  const enabled = useSettings((state) => state.sound)
  const volume = useSettings((state) => state.volume)
  const setVolume = useSettings((state) => state.setVolume)
  const toggle = useCallback(() => {
    const { sound, setSound } = useSettings.getState()
    setSound(!sound)
  }, [])

  return { enabled, volume, setVolume, toggle, play: playSfx }
}

const interactiveSelector = 'a[href], button, [role="option"], [role="switch"], [data-sfx]'

const sfxFor = (element: HTMLElement, fallback: SfxName) => {
  const name = element.dataset.sfx
  return name === 'none' ? null : ((name as SfxName | undefined) ?? fallback)
}

/**
 * Mounted once by ExperienceRuntime. Keeps the engine in sync with the settings, respects the
 * autoplay policy (waits for a gesture when sound was persisted as on), pauses with the tab, and
 * gives every link and button hover/click sounds through event delegation.
 * Elements can pick a sprite with `data-sfx="start"` or opt out with `data-sfx="none"`.
 */
export const useAudioRuntime = (gentle: boolean) => {
  const sound = useSettings((state) => state.sound)
  const volume = useSettings((state) => state.volume)
  const wasOn = useRef(false)

  useEffect(() => {
    audio.setGentle(gentle)
  }, [gentle])

  useEffect(() => {
    audio.setVolume(volume)
  }, [volume])

  useEffect(() => {
    if (!sound) {
      if (wasOn.current) {
        audio.play('off')
        audio.disable()
      }
      wasOn.current = false
      return
    }

    wasOn.current = true
    const start = () => {
      void audio.enable().then(() => audio.play('on'))
    }

    // Browsers only allow audio after the viewer has interacted with the page.
    if (navigator.userActivation?.hasBeenActive ?? false) {
      start()
      return
    }

    const events = ['pointerdown', 'keydown'] as const
    const onGesture = () => {
      events.forEach((type) => window.removeEventListener(type, onGesture, true))
      start()
    }
    events.forEach((type) => window.addEventListener(type, onGesture, true))
    return () => events.forEach((type) => window.removeEventListener(type, onGesture, true))
  }, [sound])

  useEffect(() => {
    const onVisibility = () => audio.setHidden(document.visibilityState === 'hidden')
    document.addEventListener('visibilitychange', onVisibility)

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(interactiveSelector)
      if (!target || target.contains(event.relatedTarget as Node | null)) {
        return
      }
      const name = sfxFor(target, 'hover')
      if (name === 'hover') {
        audio.play('hover')
      }
    }

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(interactiveSelector)
      const name = target ? sfxFor(target, 'click') : null
      if (name && name !== 'hover') {
        audio.play(name)
      }
    }

    const hover = isFinePointer()
    if (hover) {
      document.addEventListener('pointerover', onOver)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('click', onClick)
    }
  }, [])
}

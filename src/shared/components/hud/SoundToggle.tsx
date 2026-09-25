import { audio } from '../../../experience/audio/engine'
import { useSound } from '../../../experience/audio/useSound'

/**
 * SOUND ON/OFF with a 4-bar visualizer. The bars only move while sound is on
 * (and never under reduced motion). Hovering prefetches the audio code.
 */
export const SoundToggle = ({ label, onLabel, offLabel }: { label: string; onLabel: string; offLabel: string }) => {
  const { enabled, toggle } = useSound()

  return (
    <button
      type="button"
      className="yk-hud-button yk-sound"
      aria-pressed={enabled}
      aria-label={label}
      title={enabled ? onLabel : offLabel}
      onClick={toggle}
      onPointerEnter={() => void audio.preload()}
      onFocus={() => void audio.preload()}
      data-sfx="none"
    >
      <span className="yk-sound-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="yk-sound-state" aria-hidden="true">
        {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}

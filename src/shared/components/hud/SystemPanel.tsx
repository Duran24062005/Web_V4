import { useEffect, useId, useRef, useState } from 'react'
import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import type { ExperienceCopy } from '../../../experience/experience.copy'
import { useSettings } from '../../../experience/settings.store'
import { replayIntro } from '../../../experience/boot/replayIntro'

const Switch = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (next: boolean) => void }) => (
  <button type="button" role="switch" aria-checked={checked} className="yk-switch" onClick={() => onChange(!checked)}>
    <span>{label}</span>
    <span className="yk-switch-track" aria-hidden="true">
      <span className="yk-switch-thumb" />
    </span>
  </button>
)

/** "SYS" popover: sound, master volume, photosensitive-safe mode, reduced motion, replay intro. */
export const SystemPanel = ({ copy }: { copy: ExperienceCopy['hud'] }) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const settings = useSettings()

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        rootRef.current?.querySelector<HTMLButtonElement>('.yk-sys-trigger')?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="yk-sys">
      <button
        type="button"
        className="yk-hud-button yk-sys-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={copy.settings}
        title={copy.settings}
        onClick={() => setOpen((value) => !value)}
      >
        <SlidersHorizontal aria-hidden="true" />
        <span className="hud-label max-md:sr-only" aria-hidden="true">
          SYS
        </span>
      </button>

      {open ? (
        <div id={panelId} className="yk-sys-panel clip-hud" role="group" aria-label={copy.settings} data-lenis-prevent>
          <p className="hud-label text-neon-cyan" aria-hidden="true">
            SYS.CONFIG // 設定
          </p>
          <Switch label={copy.sound} checked={settings.sound} onChange={settings.setSound} />
          <label className="yk-range">
            <span>
              {copy.volume} <output className="text-neon-cyan">{Math.round(settings.volume * 100)}%</output>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={Math.round(settings.volume * 100)}
              disabled={!settings.sound}
              onChange={(event) => settings.setVolume(Number(event.target.value) / 100)}
            />
          </label>
          <Switch label={copy.safeMode} checked={settings.safeMode} onChange={settings.setSafeMode} />
          <Switch label={copy.calm} checked={settings.calm} onChange={settings.setCalm} />
          <button
            type="button"
            className="yk-sys-replay"
            onClick={() => {
              setOpen(false)
              replayIntro()
            }}
          >
            <RotateCcw aria-hidden="true" />
            {copy.replayIntro}
          </button>
        </div>
      ) : null}
    </div>
  )
}

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { preferenceStorage, settingsKey } from '../lib/preferences'

export interface ExperienceSettings {
  /** Opt-in audio. Never plays before a user gesture, even when persisted as on. */
  sound: boolean
  /** Master volume, 0–1. */
  volume: number
  /** Photosensitive-safe: no glitch, flicker or flashes. */
  safeMode: boolean
  /** Forces the reduced-motion experience even if the OS does not ask for it. */
  calm: boolean
}

interface SettingsActions {
  setSound: (sound: boolean) => void
  setVolume: (volume: number) => void
  setSafeMode: (safeMode: boolean) => void
  setCalm: (calm: boolean) => void
}

export const defaultSettings: ExperienceSettings = { sound: false, volume: 0.6, safeMode: false, calm: false }

/**
 * Persisted viewer preferences. `skipHydration` keeps the prerendered HTML and the first client
 * render identical; ExperienceRuntime rehydrates once mounted.
 */
export const useSettings = create<ExperienceSettings & SettingsActions>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setSound: (sound) => set({ sound }),
      setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
      setSafeMode: (safeMode) => set({ safeMode }),
      setCalm: (calm) => set({ calm }),
    }),
    {
      name: settingsKey,
      version: 1,
      storage: createJSONStorage(() => preferenceStorage),
      skipHydration: true,
      partialize: ({ sound, volume, safeMode, calm }) => ({ sound, volume, safeMode, calm }),
    },
  ),
)

export type BootPhase = 'pending' | 'running' | 'done'

interface RuntimeState {
  /** Intro state. The hero waits for `done` before playing its title sequence. */
  boot: BootPhase
  setBoot: (boot: BootPhase) => void
}

// index.html marks the document before first paint when the intro should play.
const initialBoot = (): BootPhase =>
  typeof document !== 'undefined' && document.documentElement.dataset.boot ? 'pending' : 'done'

export const useRuntime = create<RuntimeState>()((set) => ({
  boot: initialBoot(),
  setBoot: (boot) => set({ boot }),
}))

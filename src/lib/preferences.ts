import type { StateStorage } from 'zustand/middleware'

/**
 * Browser storage for UI preferences (sound, effects, intro). Every access is guarded:
 * storage can be missing (prerender), blocked (privacy settings) or throw (quota).
 */
const safeStorage = (kind: 'local' | 'session'): StateStorage => ({
  getItem: (key) => {
    try {
      return (kind === 'local' ? window.localStorage : window.sessionStorage).getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key, value) => {
    try {
      ;(kind === 'local' ? window.localStorage : window.sessionStorage).setItem(key, value)
    } catch {
      // Preferences are a convenience; losing them is fine.
    }
  },
  removeItem: (key) => {
    try {
      ;(kind === 'local' ? window.localStorage : window.sessionStorage).removeItem(key)
    } catch {
      // Same as above.
    }
  },
})

export const preferenceStorage = safeStorage('local')
export const sessionPreferenceStorage = safeStorage('session')

/** Must match the inline script in index.html that decides whether to cover the page for the intro. */
export const introSeenKey = 'dg-os.intro-seen'
export const settingsKey = 'dg-os.settings'

export const markIntroSeen = () => sessionPreferenceStorage.setItem(introSeenKey, '1')
export const clearIntroSeen = () => sessionPreferenceStorage.removeItem(introSeenKey)

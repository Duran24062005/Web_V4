import type { Howl } from 'howler'
import type { Music } from './music'
import { sfxSprite, type SfxName } from './sfx.sprite'

/**
 * The site's single audio engine. Howler plays the SFX sprite (/audio/sfx.wav, one request),
 * Tone.js synthesizes the ambient music. Both libraries load lazily the first time the viewer
 * turns sound on, so a silent visit never downloads them.
 *
 * Rules: nothing plays before a user gesture; music fades in/out; everything pauses while the
 * tab is hidden; "gentle" mode (reduced motion) drops the sudden sounds.
 */
const suddenSounds: ReadonlySet<SfxName> = new Set(['glitch', 'boot', 'transition', 'error'])
const HOVER_GAP_MS = 70

type Modules = {
  Howl: typeof Howl
  Howler: typeof import('howler').Howler
  Tone: typeof import('tone')
  createMusic: () => Music
}

class AudioEngine {
  private modules: Promise<Modules> | null = null
  private sfx: Howl | null = null
  private music: Music | null = null
  private howler: Modules['Howler'] | null = null
  private enabled = false
  private enabling: Promise<void> | null = null
  private hidden = false
  private gentle = false
  private volume = 0.6
  private lastHover = 0

  /** Starts downloading the audio code without making a sound (e.g. while the intro runs). */
  preload() {
    if (!this.modules) {
      this.modules = Promise.all([import('howler'), import('tone'), import('./music')]).then(
        ([howler, Tone, music]) => ({
          Howl: howler.Howl,
          Howler: howler.Howler,
          Tone,
          createMusic: music.createMusic,
        }),
      )
      this.modules.catch(() => {
        this.modules = null
      })
    }
    return this.modules
  }

  get isEnabled() {
    return this.enabled
  }

  /** Call from a user gesture (click / key). Resolves once sound is actually playing. */
  enable() {
    this.enabling ??= this.start()
    return this.enabling
  }

  private async start() {
    this.enabled = true
    const { Howl, Howler, Tone, createMusic } = await this.preload()

    await Tone.start()

    // The viewer may have switched sound off again while the modules loaded.
    if (!this.enabled) {
      return
    }

    this.howler = Howler
    Howler.volume(this.volume)
    this.sfx ??= new Howl({ src: ['/audio/sfx.wav'], sprite: sfxSprite, preload: true })
    this.music ??= createMusic()
    this.music.setVolume(this.volume)

    if (!this.hidden) {
      this.music.start(this.gentle ? 6 : 3)
    }
  }

  disable() {
    if (!this.enabled) {
      return
    }

    this.enabled = false
    this.enabling = null
    this.music?.stop(1.2)
    // Let a toggle-off blip finish before silencing the sprite.
    window.setTimeout(() => {
      if (!this.enabled) {
        this.sfx?.stop()
      }
    }, 200)
  }

  setVolume(volume: number) {
    this.volume = volume
    this.howler?.volume(volume)
    this.music?.setVolume(volume)
  }

  setGentle(gentle: boolean) {
    this.gentle = gentle
  }

  /** Tab visibility: fade the music out while hidden, back in on return. */
  setHidden(hidden: boolean) {
    this.hidden = hidden
    this.howler?.mute(hidden)

    if (!this.enabled || !this.music) {
      return
    }

    if (hidden) {
      this.music.stop(0.4)
    } else {
      this.music.start(1.5)
    }
  }

  play(name: SfxName) {
    if (!this.enabled || !this.sfx || this.hidden) {
      return
    }

    if (this.gentle && suddenSounds.has(name)) {
      return
    }

    if (name === 'hover') {
      const now = performance.now()
      if (now - this.lastHover < HOVER_GAP_MS) {
        return
      }
      this.lastHover = now
    }

    this.sfx.play(name)
  }
}

export const audio = new AudioEngine()
export type { SfxName }

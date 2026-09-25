import type { Language } from '../i18n/config'
import type { SectionId } from '../home/home.content'

/**
 * Interface copy for the DG-OS layer (intro, HUD, settings). Portfolio content stays in
 * home.content.ts / copy.ts; this file only holds the words the new design adds.
 */
const experienceCopy = {
  es: {
    boot: {
      label: 'Intro',
      lines: [
        'DG-OS 4.0 // 夜行 kernel',
        'montando /dev/neon ............ OK',
        'calibrando rain.sys ........... OK',
        'cargando episodios 00–06 ...... OK',
        'enlazando portafolio + blog ... OK',
        'sincronizando zona UTC−5 ...... OK',
      ],
      pressStart: 'Pulsa para empezar',
      pressStartShort: 'PRESS START',
      continue: 'Continúa en',
      skip: 'Saltar intro',
      soundOn: 'Con sonido',
      soundOff: 'Sin sonido',
      flashWarning: 'Este sitio usa destellos y efectos glitch.',
      safeModeOn: 'Modo seguro activado',
      safeModeOff: 'Activar modo seguro',
    },
    hud: {
      episode: 'Episodio',
      episodeShort: 'EP',
      sound: 'Sonido',
      soundOn: 'Sonido activado',
      soundOff: 'Sonido desactivado',
      settings: 'Ajustes del sistema',
      volume: 'Volumen',
      safeMode: 'Modo seguro (sin destellos ni glitch)',
      calm: 'Reducir movimiento',
      replayIntro: 'Repetir intro',
      close: 'Cerrar',
      scroll: 'Desliza',
      progress: 'Progreso de lectura',
    },
    palette: {
      soundOn: 'Activar sonido',
      soundOff: 'Silenciar',
      safeOn: 'Activar modo seguro (sin destellos)',
      safeOff: 'Desactivar modo seguro',
      calmOn: 'Reducir movimiento',
      calmOff: 'Restaurar movimiento',
      replayIntro: 'Repetir la intro',
    },
    hero: {
      episodeKanji: '第零話',
    },
    ending: {
      toBeContinued: 'Continuará',
      nextEpisode: 'Próximo episodio',
      pages: 'Páginas',
    },
  },
  en: {
    boot: {
      label: 'Intro',
      lines: [
        'DG-OS 4.0 // 夜行 kernel',
        'mounting /dev/neon ............ OK',
        'calibrating rain.sys .......... OK',
        'loading episodes 00–06 ........ OK',
        'linking portfolio + blog ...... OK',
        'syncing zone UTC−5 ............ OK',
      ],
      pressStart: 'Press to start',
      pressStartShort: 'PRESS START',
      continue: 'Continuing in',
      skip: 'Skip intro',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      flashWarning: 'This site uses flashes and glitch effects.',
      safeModeOn: 'Safe mode on',
      safeModeOff: 'Turn on safe mode',
    },
    hud: {
      episode: 'Episode',
      episodeShort: 'EP',
      sound: 'Sound',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      settings: 'System settings',
      volume: 'Volume',
      safeMode: 'Safe mode (no flashes or glitch)',
      calm: 'Reduce motion',
      replayIntro: 'Replay intro',
      close: 'Close',
      scroll: 'Scroll',
      progress: 'Reading progress',
    },
    palette: {
      soundOn: 'Turn sound on',
      soundOff: 'Mute',
      safeOn: 'Turn on safe mode (no flashes)',
      safeOff: 'Turn off safe mode',
      calmOn: 'Reduce motion',
      calmOff: 'Restore motion',
      replayIntro: 'Replay the intro',
    },
    hero: {
      episodeKanji: '第零話',
    },
    ending: {
      toBeContinued: 'To be continued',
      nextEpisode: 'Next episode',
      pages: 'Pages',
    },
  },
} satisfies Record<Language, unknown>

export type ExperienceCopy = (typeof experienceCopy)['es']

export const getExperienceCopy = (language: Language): ExperienceCopy => experienceCopy[language]

export type EpisodeId = 'hero' | SectionId

/**
 * Each home section is an episode. `code` is the HUD codename, `kana` the decorative
 * Japanese title (aria-hidden everywhere it appears).
 */
export const episodes: Record<EpisodeId, { number: number; code: string; kana: string }> = {
  hero: { number: 0, code: 'OPENING', kana: 'オープニング' },
  'about-me': { number: 1, code: 'PROFILE', kana: 'プロフィール' },
  skills: { number: 2, code: 'LOADOUT', kana: '装備' },
  projects: { number: 3, code: 'MISSIONS', kana: 'ミッション' },
  experience: { number: 4, code: 'LOG', kana: '記録' },
  services: { number: 5, code: 'CONTRACTS', kana: '契約' },
  contact: { number: 6, code: 'UPLINK', kana: '通信' },
}

export const lastEpisode = 6

export const episodeNumber = (number: number) => String(number).padStart(2, '0')

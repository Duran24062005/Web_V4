export const supportedLanguages = ['es', 'en'] as const

export type Language = (typeof supportedLanguages)[number]

export const defaultLanguage: Language = 'es'

export const languageStorageKey = 'portfolio.language'

export const localeByLanguage: Record<Language, string> = {
  es: 'es-CO',
  en: 'en-US',
}


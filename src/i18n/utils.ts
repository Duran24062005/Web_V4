import { defaultLanguage, languageStorageKey, supportedLanguages, type Language } from './config'

const externalProtocolPattern = /^(https?:|mailto:|tel:)/

export const isLanguage = (value?: string | null): value is Language =>
  Boolean(value && supportedLanguages.includes(value as Language))

export const getPreferredLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey)

  if (isLanguage(storedLanguage)) {
    return storedLanguage
  }

  return window.navigator.language.toLowerCase().startsWith('en') ? 'en' : defaultLanguage
}

export const persistLanguage = (language: Language) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(languageStorageKey, language)
}

export const stripLanguageFromPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return '/'
  }

  if (isLanguage(segments[0])) {
    const nextPath = `/${segments.slice(1).join('/')}`
    return nextPath === '/' ? '/' : nextPath.replace(/\/+$/, '')
  }

  return pathname === '' ? '/' : pathname.replace(/\/+$/, '') || '/'
}

export const replaceLeadingSegment = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)
  const nextPath = `/${segments.slice(1).join('/')}`

  return nextPath === '/' ? '/' : nextPath.replace(/\/+$/, '')
}

export const buildLocalizedPath = (language: Language, path: string) => {
  if (!path || path === '/') {
    return `/${language}`
  }

  if (path.startsWith('#') || externalProtocolPattern.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return normalizedPath === '/' ? `/${language}` : `/${language}${normalizedPath}`
}

export const localizeHref = (language: Language, href: string) => {
  if (href.startsWith('#') || externalProtocolPattern.test(href)) {
    return href
  }

  return buildLocalizedPath(language, href)
}

export const changeLanguageInPath = (pathname: string, language: Language) =>
  buildLocalizedPath(language, stripLanguageFromPath(pathname))

export const formatReadingTime = (minutes: number, language: Language) =>
  language === 'es' ? `${minutes} min lectura` : `${minutes} min read`


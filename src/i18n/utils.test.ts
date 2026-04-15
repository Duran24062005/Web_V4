import { defaultLanguage } from './config'
import {
  buildLocalizedPath,
  changeLanguageInPath,
  formatReadingTime,
  getPreferredLanguage,
  localizeHref,
  stripLanguageFromPath,
} from './utils'

describe('i18n utils', () => {
  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('builds localized paths for internal routes', () => {
    expect(buildLocalizedPath('es', '/projects')).toBe('/es/projects')
    expect(buildLocalizedPath('en', '/')).toBe('/en')
  })

  it('keeps anchors and external links untouched', () => {
    expect(localizeHref('es', '#contact')).toBe('#contact')
    expect(localizeHref('en', 'mailto:test@example.com')).toBe('mailto:test@example.com')
    expect(localizeHref('en', 'https://example.com')).toBe('https://example.com')
  })

  it('strips language prefixes from paths', () => {
    expect(stripLanguageFromPath('/es/projects')).toBe('/projects')
    expect(stripLanguageFromPath('/en')).toBe('/')
    expect(stripLanguageFromPath('/contact')).toBe('/contact')
  })

  it('swaps the language while preserving the rest of the path', () => {
    expect(changeLanguageInPath('/es/projects', 'en')).toBe('/en/projects')
    expect(changeLanguageInPath('/en', 'es')).toBe('/es')
  })

  it('resolves preferred language from storage before navigator', () => {
    localStorage.setItem('portfolio.language', 'en')

    expect(getPreferredLanguage()).toBe('en')
  })

  it('falls back to navigator language when storage is empty', () => {
    vi.stubGlobal('navigator', {
      language: 'en-US',
    })

    expect(getPreferredLanguage()).toBe('en')
  })

  it('falls back to default language when navigator is not english', () => {
    vi.stubGlobal('navigator', {
      language: 'fr-FR',
    })

    expect(getPreferredLanguage()).toBe(defaultLanguage)
  })

  it('formats reading time by locale', () => {
    expect(formatReadingTime(3, 'es')).toBe('3 min lectura')
    expect(formatReadingTime(3, 'en')).toBe('3 min read')
  })
})


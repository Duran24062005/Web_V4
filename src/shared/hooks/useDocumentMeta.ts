import { useEffect } from 'react'
import type { Language } from '../../i18n/config'

export const SITE_URL = 'https://alexidg.vercel.app'

const ogLocaleByLanguage: Record<Language, string> = {
  es: 'es_CO',
  en: 'en_US',
}

const setMeta = (selector: string, attribute: 'content' | 'href', value: string) => {
  document.head.querySelector(selector)?.setAttribute(attribute, value)
}

/** Keeps the static head tags from index.html in sync with the active language. */
export const useDocumentMeta = ({
  title,
  description,
  language,
  path = '',
}: {
  title: string
  description: string
  language: Language
  path?: string
}) => {
  useEffect(() => {
    const url = `${SITE_URL}/${language}${path}`

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:locale"]', 'content', ogLocaleByLanguage[language])
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description, language, path])
}

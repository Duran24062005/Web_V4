import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { localeByLanguage, type Language } from './config'
import { changeLanguageInPath, persistLanguage } from './utils'

interface LanguageContextValue {
  language: Language
  locale: string
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export const LanguageProvider = ({
  children,
  language,
}: PropsWithChildren<{ language: Language }>) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    persistLanguage(language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      locale: localeByLanguage[language],
      setLanguage: (nextLanguage) => {
        if (nextLanguage === language) {
          return
        }

        const nextPath = changeLanguageInPath(location.pathname, nextLanguage)
        navigate(`${nextPath}${location.search}${location.hash}`)
      },
    }),
    [language, location.hash, location.pathname, location.search, navigate],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}


import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { LanguageProvider } from './LanguageContext'
import { buildLocalizedPath, getPreferredLanguage, isLanguage, replaceLeadingSegment } from './utils'

export const LanguageLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()

  if (!isLanguage(lang)) {
    const preferredLanguage = getPreferredLanguage()
    const nextPath = buildLocalizedPath(preferredLanguage, replaceLeadingSegment(location.pathname))

    return <Navigate to={`${nextPath}${location.search}${location.hash}`} replace />
  }

  return (
    <LanguageProvider language={lang}>
      <Outlet />
    </LanguageProvider>
  )
}


import { Navigate, useLocation } from 'react-router-dom'
import { buildLocalizedPath, getPreferredLanguage } from './utils'

export const LocalizedRedirect = ({ preservePath = false }: { preservePath?: boolean }) => {
  const location = useLocation()
  const preferredLanguage = getPreferredLanguage()
  const path = preservePath ? location.pathname : '/'
  const nextPath = buildLocalizedPath(preferredLanguage, path)

  return <Navigate to={`${nextPath}${location.search}${location.hash}`} replace />
}


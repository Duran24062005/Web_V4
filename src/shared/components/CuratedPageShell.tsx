import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getHomeContent } from '../../home/home.content'
import { useLanguage } from '../../i18n/LanguageContext'
import { stripLanguageFromPath } from '../../i18n/utils'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'

interface CuratedPageShellProps {
  /** Kept for the existing call sites; the shared nav links to home sections. */
  activePath?: string
  children: ReactNode
}

export const CuratedPageShell = ({ children }: CuratedPageShellProps) => {
  const { language } = useLanguage()
  const { pathname } = useLocation()
  const path = stripLanguageFromPath(pathname)

  useDocumentMeta({ ...getHomeContent(language).meta, language, path: path === '/' ? '' : path })

  return (
    <>
      <SiteNav />
      {/* Each page renders its own <main>; this wrapper is only the skip-link target. */}
      <div id="main" className="min-h-screen text-[var(--curated-text)] outline-none" tabIndex={-1}>
        {children}
      </div>
      <SiteFooter />
    </>
  )
}

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import { getHomeContent } from './home/home.content'
import type { Language } from './i18n/config'

/** Build-time only: renders a route to HTML for scripts/prerender.mjs. */
export const render = (url: string) =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  )

export const getMeta = (language: Language) => getHomeContent(language).meta

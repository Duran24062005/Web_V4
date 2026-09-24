import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Copy, FileDown, Grid3x3, Hash, Languages, Linkedin, Menu, X } from 'lucide-react'
import { siGithub, siWhatsapp } from 'simple-icons'
import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitch } from '../../i18n/LanguageSwitch'
import { LocalizedLink } from '../../i18n/LocalizedLink'
import { buildLocalizedPath, stripLanguageFromPath } from '../../i18n/utils'
import {
  buildWhatsAppLink,
  contactData,
  getHomeContent,
  sectionIds,
  type SectionId,
} from '../../home/home.content'
import { useActiveSection } from '../hooks/useActiveSection'
import { getPrefersReducedMotion, useClientValue } from '../hooks/useClientValue'
import { copyText } from '../hooks/useCopyToClipboard'
import { getSessionToken } from '../../lib/session'
import { BrandIcon } from './BrandIcon'
import { CommandPalette, type PaletteCommand } from './CommandPalette'
import { toast } from 'sonner'

const noSections: readonly string[] = []

const isApplePlatform = () =>
  typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.userAgent)

const hasSession = () => Boolean(getSessionToken())

const GridOverlay = () => (
  <div className="grid-overlay" aria-hidden="true">
    <div className="wrap">
      <div className="grid-12">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  </div>
)

const toggleGridOverlay = () => {
  const root = document.documentElement
  root.dataset.grid = root.dataset.grid === 'on' ? 'off' : 'on'
}

export const SiteNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const isAuthenticated = useClientValue(hasSession, false)
  const location = useLocation()
  const navigate = useNavigate()
  const content = getHomeContent(language)
  const isHome = stripLanguageFromPath(location.pathname) === '/'
  const activeSection = useActiveSection(isHome ? sectionIds : noSections)
  const shortcutLabel = useClientValue(isApplePlatform, false) ? '⌘K' : 'Ctrl K'

  const goToSection = useCallback(
    (id: SectionId | 'hero') => {
      if (!isHome) {
        navigate(`${buildLocalizedPath(language, '/')}#${id}`)
        return
      }

      const target = document.getElementById(id)
      target?.scrollIntoView({ behavior: getPrefersReducedMotion() ? 'auto' : 'smooth' })
      target?.focus({ preventScroll: true })
      window.history.replaceState(window.history.state, '', `#${id}`)
    },
    [isHome, language, navigate],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }

      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const commands = useMemo<PaletteCommand[]>(() => {
    const { palette } = content
    const sectionCommands: PaletteCommand[] = [
      {
        id: 'go-hero',
        group: 'navigate',
        label: `${palette.goTo} ${palette.top}`,
        keywords: 'home inicio hero top',
        hint: '00',
        icon: <Hash aria-hidden="true" />,
        run: () => goToSection('hero'),
      },
      ...sectionIds.map((id, index) => ({
        id: `go-${id}`,
        group: 'navigate' as const,
        label: `${palette.goTo} ${content.sections[id].label}`,
        keywords: `${content.sections[id].code} ${id}`,
        hint: String(index + 1).padStart(2, '0'),
        icon: <Hash aria-hidden="true" />,
        run: () => goToSection(id),
      })),
    ]

    return [
      ...sectionCommands,
      {
        id: 'switch-language',
        group: 'actions',
        label: palette.switchLanguage,
        keywords: 'language idioma english español es en',
        hint: language === 'es' ? 'EN' : 'ES',
        icon: <Languages aria-hidden="true" />,
        run: () => setLanguage(language === 'es' ? 'en' : 'es'),
      },
      {
        id: 'copy-email',
        group: 'actions',
        label: palette.copyEmail,
        keywords: 'email correo mail contact contacto',
        icon: <Copy aria-hidden="true" />,
        run: () => {
          copyText(contactData.email)
            .then(() => toast.success(palette.emailCopied))
            .catch(() => toast.error(content.contact.copyFailed))
        },
      },
      {
        id: 'download-cv',
        group: 'actions',
        label: palette.downloadCv,
        keywords: 'cv resume curriculum pdf hoja de vida',
        icon: <FileDown aria-hidden="true" />,
        run: () => window.open(contactData.cv, '_blank', 'noopener'),
      },
      {
        id: 'toggle-grid',
        group: 'actions',
        label: palette.toggleGrid,
        keywords: 'grid grilla columns columnas layout debug',
        icon: <Grid3x3 aria-hidden="true" />,
        run: toggleGridOverlay,
      },
      {
        id: 'open-github',
        group: 'links',
        label: palette.openGithub,
        keywords: 'github repos code codigo',
        icon: <BrandIcon icon={siGithub} size={16} />,
        run: () => window.open(contactData.github, '_blank', 'noopener'),
      },
      {
        id: 'open-linkedin',
        group: 'links',
        label: palette.openLinkedin,
        keywords: 'linkedin cv work',
        icon: <Linkedin aria-hidden="true" />,
        run: () => window.open(contactData.linkedin, '_blank', 'noopener'),
      },
      {
        id: 'open-whatsapp',
        group: 'links',
        label: palette.openWhatsapp,
        keywords: 'whatsapp chat mensaje message',
        icon: <BrandIcon icon={siWhatsapp} size={16} />,
        run: () =>
          window.open(
            buildWhatsAppLink(contactData.whatsapp, content.contact.whatsappMessage),
            '_blank',
            'noopener',
          ),
      },
    ]
  }, [content, goToSection, language, setLanguage])

  const renderSectionLink = (id: SectionId, index: number) => {
    const isActive = isHome && activeSection === id
    const body = (
      <>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        {content.sections[id].label}
      </>
    )

    return (
      <li key={id}>
        {isHome ? (
          <a
            href={`#${id}`}
            className="site-nav-link"
            aria-current={isActive ? 'true' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {body}
          </a>
        ) : (
          <LocalizedLink to={`/#${id}`} className="site-nav-link" onClick={() => setMenuOpen(false)}>
            {body}
          </LocalizedLink>
        )}
      </li>
    )
  }

  const languageSwitch = (
    <div role="group" aria-label={content.nav.language}>
      <LanguageSwitch
        className="lang-switch"
        buttonClassName="lang-button"
        activeButtonClassName="lang-button-active"
        inactiveButtonClassName="lang-button-inactive"
      />
    </div>
  )

  return (
    <>
      <a href="#main" className="skip-link">
        {content.nav.skip}
      </a>

      <header className="site-nav">
        <div className="wrap site-nav-inner">
          <LocalizedLink to="/" className="site-brand">
            <span className="site-brand-mark" aria-hidden="true">
              AD
            </span>
            <span>Alexi Dg</span>
            <span className="site-brand-rev" aria-hidden="true">
              REV {__APP_VERSION__.split('.').slice(0, 2).join('.')}
            </span>
          </LocalizedLink>

          <nav aria-label={content.nav.primary} className="site-nav-primary">
            <ul className="site-nav-links">{sectionIds.map(renderSectionLink)}</ul>
          </nav>

          <div className="site-nav-actions">
            <button
              type="button"
              className="palette-trigger"
              onClick={() => setPaletteOpen(true)}
              aria-haspopup="dialog"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <span>{content.nav.commandHint}</span>
              <span className="kbd">{shortcutLabel}</span>
            </button>
            {languageSwitch}
            {isAuthenticated ? (
              <LocalizedLink to="/dashboard" className="button site-nav-dashboard">
                {content.nav.dashboard}
                <ArrowUpRight aria-hidden="true" />
              </LocalizedLink>
            ) : null}
            <button
              type="button"
              className="icon-button site-nav-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-nav-mobile"
              aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="site-nav-mobile" className="site-nav-mobile" aria-label={content.nav.primary}>
            <ul className="wrap">{sectionIds.map(renderSectionLink)}</ul>
          </nav>
        ) : null}
      </header>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
        labels={content.palette}
      />
      <GridOverlay />
    </>
  )
}

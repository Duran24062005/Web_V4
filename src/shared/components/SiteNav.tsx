import { lazy, Suspense, useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  Copy,
  FileDown,
  Grid3x3,
  Hash,
  Languages,
  Linkedin,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  Volume2,
  Waves,
  X,
} from 'lucide-react'
import { siGithub, siWhatsapp } from 'simple-icons'
import { toast } from 'sonner'
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
import { replayIntro } from '../../experience/boot/replayIntro'
import { episodeNumber, episodes, getExperienceCopy, lastEpisode } from '../../experience/experience.copy'
import { scrollToTarget } from '../../experience/motion/runtime'
import { useSettings } from '../../experience/settings.store'
import { getSessionToken } from '../../lib/session'
import { useActiveSection } from '../hooks/useActiveSection'
import { useClientValue } from '../hooks/useClientValue'
import { copyText } from '../hooks/useCopyToClipboard'
import { Kana } from '../neon/primitives'
import { BrandIcon } from './BrandIcon'
import { CommandPalette, type PaletteCommand } from './CommandPalette'
import { ScrollProgress } from './hud/ScrollProgress'
import { SoundToggle } from './hud/SoundToggle'
import { SystemPanel } from './hud/SystemPanel'

const MobileMenu = lazy(() => import('./hud/MobileMenu'))

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

/**
 * DG-OS HUD: a top bar (brand, current episode, palette, language, sound, system settings),
 * a floating episode dock as the primary navigation on tablet/desktop, and a fullscreen
 * menu on phones. Ctrl/Cmd+K opens the command palette everywhere.
 */
export const SiteNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  // The menu chunk (with Motion) loads on first open and then stays mounted for exit animations.
  const [menuLoaded, setMenuLoaded] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const isAuthenticated = useClientValue(hasSession, false)
  const location = useLocation()
  const navigate = useNavigate()
  const content = getHomeContent(language)
  const system = getExperienceCopy(language)
  const isHome = stripLanguageFromPath(location.pathname) === '/'
  const activeSection = useActiveSection(isHome ? sectionIds : noSections) as SectionId | null
  const shortcutLabel = useClientValue(isApplePlatform, false) ? '⌘K' : 'Ctrl K'
  const settings = useSettings()
  const currentEpisode = episodes[activeSection ?? 'hero']

  const goToSection = useCallback(
    (id: SectionId | 'hero') => {
      if (!isHome) {
        navigate(`${buildLocalizedPath(language, '/')}#${id}`)
        return
      }

      const target = document.getElementById(id)
      if (target) {
        scrollToTarget(target)
        target.focus({ preventScroll: true })
      }
      window.history.replaceState(window.history.state, '', `#${id}`)
    },
    [isHome, language, navigate],
  )

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
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
        keywords: 'home inicio hero top opening',
        hint: 'EP00',
        icon: <Hash aria-hidden="true" />,
        run: () => goToSection('hero'),
      },
      ...sectionIds.map((id) => ({
        id: `go-${id}`,
        group: 'navigate' as const,
        label: `${palette.goTo} ${content.sections[id].label}`,
        keywords: `${content.sections[id].code} ${episodes[id].code} ${id}`,
        hint: `EP${episodeNumber(episodes[id].number)}`,
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
        id: 'toggle-sound',
        group: 'actions',
        label: settings.sound ? system.palette.soundOff : system.palette.soundOn,
        keywords: 'sound sonido audio music musica mute silencio',
        icon: <Volume2 aria-hidden="true" />,
        run: () => settings.setSound(!settings.sound),
      },
      {
        id: 'toggle-safe',
        group: 'actions',
        label: settings.safeMode ? system.palette.safeOff : system.palette.safeOn,
        keywords: 'safe seguro flash destellos glitch epilepsy fotosensible accesibilidad accessibility',
        icon: <ShieldCheck aria-hidden="true" />,
        run: () => settings.setSafeMode(!settings.safeMode),
      },
      {
        id: 'toggle-calm',
        group: 'actions',
        label: settings.calm ? system.palette.calmOff : system.palette.calmOn,
        keywords: 'motion movimiento animaciones animations reduce reducir calm',
        icon: <Waves aria-hidden="true" />,
        run: () => settings.setCalm(!settings.calm),
      },
      {
        id: 'replay-intro',
        group: 'actions',
        label: system.palette.replayIntro,
        keywords: 'intro boot start opening',
        icon: <RotateCcw aria-hidden="true" />,
        run: replayIntro,
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
  }, [content, goToSection, language, setLanguage, settings, system])

  const onSectionClick = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    if (isHome) {
      event.preventDefault()
      goToSection(id)
    }
  }

  const sectionLink = (id: SectionId, variant: 'dock' | 'menu') => {
    const isActive = isHome && activeSection === id
    const episode = episodes[id]
    const className = variant === 'dock' ? 'yk-dock-link' : 'yk-menu-link'
    const body = (
      <>
        <span className="yk-ep-num" aria-hidden="true">
          {episodeNumber(episode.number)}
        </span>
        <span className="yk-ep-label">{content.sections[id].label}</span>
        {variant === 'menu' ? <Kana className="yk-ep-kana">{episode.kana}</Kana> : null}
      </>
    )

    return isHome ? (
      <a href={`#${id}`} className={className} aria-current={isActive ? 'true' : undefined} onClick={onSectionClick(id)}>
        {body}
      </a>
    ) : (
      <LocalizedLink to={`/#${id}`} className={className} onClick={closeMenu}>
        {body}
      </LocalizedLink>
    )
  }

  return (
    <>
      <a href="#main" className="skip-link">
        {content.nav.skip}
      </a>

      <header className="yk-hud">
        <ScrollProgress />
        <div className="yk-hud-bar">
          <LocalizedLink to="/" className="yk-brand">
            <span className="yk-brand-mark" aria-hidden="true">
              DG
            </span>
            <span className="yk-brand-name">Alexi Dg</span>
            <Kana className="yk-brand-kana">夜行</Kana>
          </LocalizedLink>

          {isHome ? (
            <p className="yk-hud-episode hud-label" aria-hidden="true">
              <span className="text-neon-cyan">
                {system.hud.episodeShort}.{episodeNumber(currentEpisode.number)}
              </span>
              <span className="text-dim">/{episodeNumber(lastEpisode)}</span>
              <span className="yk-hud-episode-code">{currentEpisode.code}</span>
              <Kana className="text-neon-magenta">{currentEpisode.kana}</Kana>
            </p>
          ) : null}

          <div className="yk-hud-actions">
            <button
              type="button"
              className="yk-hud-button yk-palette-trigger"
              onClick={() => setPaletteOpen(true)}
              aria-haspopup="dialog"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <Search aria-hidden="true" />
              <span className="max-lg:sr-only">{content.nav.commandHint}</span>
              <span className="kbd" aria-hidden="true">
                {shortcutLabel}
              </span>
            </button>
            <div role="group" aria-label={content.nav.language}>
              <LanguageSwitch
                className="yk-lang"
                buttonClassName="yk-lang-button"
                activeButtonClassName="is-active"
              />
            </div>
            <SoundToggle label={system.hud.sound} onLabel={system.hud.soundOn} offLabel={system.hud.soundOff} />
            <SystemPanel copy={system.hud} />
            {isAuthenticated ? (
              <LocalizedLink to="/dashboard" className="yk-hud-button yk-hud-dashboard">
                {content.nav.dashboard}
                <ArrowUpRight aria-hidden="true" />
              </LocalizedLink>
            ) : null}
            <button
              type="button"
              className="yk-hud-button yk-menu-toggle"
              onClick={() => {
                setMenuLoaded(true)
                setMenuOpen((open) => !open)
              }}
              aria-expanded={menuOpen}
              aria-controls="site-nav-mobile"
              aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <nav aria-label={content.nav.primary} className="yk-dock">
        <ul>
          {sectionIds.map((id) => (
            <li key={id}>{sectionLink(id, 'dock')}</li>
          ))}
        </ul>
      </nav>

      {menuLoaded ? (
        <Suspense fallback={null}>
          <MobileMenu
            open={menuOpen}
            id="site-nav-mobile"
            label={content.nav.primary}
            onClose={closeMenu}
            items={sectionIds.map((id) => sectionLink(id, 'menu'))}
          />
        </Suspense>
      ) : null}

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

import { useRef, type MouseEvent } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { LocalizedLink } from '../../i18n/LocalizedLink'
import { getCopy } from '../../i18n/copy'
import { getHomeContent } from '../../home/home.content'
import { getExperienceCopy } from '../../experience/experience.copy'
import { scrollToTarget } from '../../experience/motion/runtime'
import { useScene } from '../../experience/motion/useScene'
import { useClientValue } from '../hooks/useClientValue'
import { Onomatopoeia } from '../neon/primitives'

const currentYear = () => new Date().getFullYear()
const buildYear = Number(__BUILD_DATE__.slice(0, 4))

/**
 * ED — the ending credits. Build info rolls up like staff credits, a brush "つづく" stamps
 * the frame, and the "next episode" preview is the way into the other pages (blog first).
 */
export const SiteFooter = () => {
  const { language } = useLanguage()
  const { footer } = getHomeContent(language)
  const { navigation } = getCopy(language)
  const { ending } = getExperienceCopy(language)
  const year = useClientValue(currentYear, buildYear)
  const ref = useRef<HTMLElement>(null)

  const blog = navigation.legacy.find((item) => item.href === '/blog')
  const pages = [...(blog ? [blog] : []), ...navigation.curated.filter((item) => item.href !== '/')]

  useScene(ref, (root, { onEnter }) => {
    gsap
      .timeline({ scrollTrigger: onEnter(root, 'top 90%') })
      .from('.yk-ed-roll > *', { yPercent: 120, duration: 1.4, ease: 'power2.out', stagger: 0.35 }, 0)
      .from('.yk-ed-stamp', { scale: 2.8, rotation: -25, autoAlpha: 0, duration: 0.5, ease: 'back.out(2.5)' }, 0.8)
      .from('.yk-ed-next li', { x: 40, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: 'expo.out' }, 0.4)
  })

  const backToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToTarget(0)
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer ref={ref} className="yk-ed">
      <div className="wrap yk-ed-grid">
        <div className="yk-ed-sign">
          <Onomatopoeia className="yk-ed-stamp">つづく</Onomatopoeia>
          <p className="hud-label">
            <span className="text-neon-magenta" aria-hidden="true">
              ED //
            </span>{' '}
            {ending.toBeContinued}
          </p>
        </div>

        <div className="yk-ed-roll">
          <p className="yk-ed-line">
            <strong>© {year} Alexi Durán Gómez</strong>
          </p>
          <p className="yk-ed-line">
            REV {__APP_VERSION__} · {footer.build}{' '}
            <a
              href={`https://github.com/Duran24062005/Web_V4/commit/${__BUILD_SHA__}`}
              target="_blank"
              rel="noreferrer"
              className="yk-ed-sha"
            >
              {__BUILD_SHA__}
            </a>{' '}
            · <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
          </p>
          <p className="yk-ed-line text-mute">{footer.stack}</p>
        </div>

        <nav className="yk-ed-next" aria-label={ending.pages}>
          <p className="hud-label text-neon-cyan">
            {ending.nextEpisode} <span className="font-jp text-neon-magenta" aria-hidden="true">次回予告</span>
          </p>
          <ul>
            {pages.map((page) => (
              <li key={page.href}>
                <LocalizedLink to={page.href} className="yk-ed-link">
                  {page.label}
                  <ArrowRight aria-hidden="true" />
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#main" className="yk-ed-top hud-label" onClick={backToTop}>
          <ArrowUp aria-hidden="true" width={14} height={14} /> {footer.backToTop}
        </a>
      </div>
    </footer>
  )
}

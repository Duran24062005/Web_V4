import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { useScene } from '../../experience/motion/useScene'
import { Letters } from '../neon/Letters'
import { Kana } from '../neon/primitives'

interface PageHeroProps {
  /** HUD file code, e.g. "FILE // MISSION ARCHIVE". Decorative. */
  code: string
  kana: string
  /** Optional small line above the title that is real content (e.g. the services eyebrow). */
  eyebrow?: string
  titleLead: string
  titleAccent?: string
  body?: ReactNode
  aside?: ReactNode
}

/**
 * Title card for the inner pages (services, projects, contact; the blog in Phase C).
 * The lead line rises letter by letter through its mask, the accent line slides in on a skew.
 */
export const PageHero = ({ code, kana, eyebrow, titleLead, titleAccent, body, aside }: PageHeroProps) => {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, () => {
    gsap
      .timeline({ delay: 0.15 })
      .from('.yk-page-code', { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.6, ease: 'power3.inOut' }, 0)
      .from('.yk-page-title-lead .yk-char', { yPercent: 115, rotate: 8, duration: 0.9, stagger: 0.025, ease: 'expo.out' }, 0.1)
      .from('.yk-page-title-accent', { xPercent: -8, skewX: -20, autoAlpha: 0, duration: 0.8, ease: 'expo.out' }, 0.45)
      .from('.yk-page-body', { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }, 0.6)
      .from('.yk-page-aside', { autoAlpha: 0, scale: 0.92, rotate: -2, duration: 0.8, ease: 'expo.out' }, 0.5)
  })

  return (
    <header ref={ref} className={`yk-page-hero ${aside ? 'has-aside' : ''}`.trim()}>
      <div className="yk-page-hero-copy">
        <p className="yk-page-code hud-label" aria-hidden="true">
          <span className="text-neon-magenta">{code}</span>
          <Kana className="text-neon-cyan">{kana}</Kana>
        </p>
        {eyebrow ? <p className="yk-page-eyebrow hud-label">{eyebrow}</p> : null}
        <h1 className="yk-page-title">
          <span className="sr-only">
            {titleLead}
            {titleAccent ? ` ${titleAccent}` : ''}
          </span>
          <span className="yk-page-title-lead" aria-hidden="true">
            <Letters text={titleLead} />
          </span>
          {titleAccent ? (
            <span className="yk-page-title-accent" aria-hidden="true">
              {titleAccent}
            </span>
          ) : null}
        </h1>
        {body ? <p className="yk-page-body">{body}</p> : null}
      </div>
      {aside ? <div className="yk-page-aside">{aside}</div> : null}
    </header>
  )
}

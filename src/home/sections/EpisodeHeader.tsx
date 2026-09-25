import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { episodeNumber, episodes } from '../../experience/experience.copy'
import { useScene } from '../../experience/motion/useScene'
import { Kana } from '../../shared/neon/primitives'
import type { SectionId } from '../home.content'

interface EpisodeHeaderProps {
  id: SectionId
  /** The section's original datasheet code (PROFILE, STACK, WORK…), kept as a secondary tag. */
  code: string
  title: ReactNode
  description?: ReactNode
  aside?: ReactNode
  className?: string
}

/**
 * The title card every episode opens with: a giant outlined episode number, the codename in
 * the HUD font with its Japanese title, and the heading cut in along a manga-panel diagonal.
 * Same motif in every section, like an anime's episode card; the content choreography after
 * it is what changes per episode.
 */
export const EpisodeHeader = ({ id, code, title, description, aside, className }: EpisodeHeaderProps) => {
  const ref = useRef<HTMLElement>(null)
  const episode = episodes[id]

  useScene(ref, (root, { onEnter }) => {
    gsap
      .timeline({ scrollTrigger: onEnter(root, 'top 80%') })
      .from('.yk-ep-bignum', { xPercent: 40, skewX: -20, autoAlpha: 0, duration: 1.1, ease: 'expo.out' }, 0)
      .from('.yk-ep-rule', { scaleX: 0, duration: 0.7, ease: 'power3.inOut' }, 0.05)
      .from('.yk-ep-eyebrow > *:not(.yk-ep-rule)', { autoAlpha: 0, x: -12, stagger: 0.06, duration: 0.4 }, 0.15)
      .from(
        '.yk-ep-title',
        { clipPath: 'polygon(-5% -20%, -5% -20%, -25% 120%, -25% 120%)', duration: 0.9, ease: 'expo.inOut' },
        0.2,
      )
      .from('.yk-ep-desc', { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }, 0.6)
      .from('.yk-ep-aside', { autoAlpha: 0, x: 24, duration: 0.5 }, 0.9)
  })

  return (
    <header ref={ref} className={`yk-ep-head ${className ?? ''}`.trim()}>
      <span className="yk-ep-bignum" aria-hidden="true">
        {episodeNumber(episode.number)}
      </span>
      <p className="yk-ep-eyebrow hud-label" aria-hidden="true">
        <span className="text-neon-magenta">EP.{episodeNumber(episode.number)}</span>
        <span className="yk-ep-rule" />
        <span className="text-neon-cyan">{episode.code}</span>
        <span className="text-dim">// {code}</span>
        <Kana className="yk-ep-kana">{episode.kana}</Kana>
      </p>
      <h2 id={`${id}-title`} className="yk-ep-title">
        {title}
      </h2>
      {description ? <p className="yk-ep-desc">{description}</p> : null}
      {aside ? <div className="yk-ep-aside">{aside}</div> : null}
    </header>
  )
}

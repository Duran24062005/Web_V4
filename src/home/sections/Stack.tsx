import { useRef } from 'react'
import { animate, stagger } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Language } from '../../i18n/config'
import { useScene } from '../../experience/motion/useScene'
import { BrandIcon } from '../../shared/components/BrandIcon'
import { useTilt } from '../../shared/hooks/useTilt'
import type { HomeContent } from '../home.content'
import { stackCount, stackGroups, type StackGroup } from '../stack.data'
import { EpisodeHeader } from './EpisodeHeader'

interface StackProps {
  content: HomeContent
  language: Language
}

// Two balanced columns on wide screens: 7 + 3 + 2 rows | 9 + 3 rows.
const columns: StackGroup['layer'][][] = [
  ['frontend', 'data', 'systems'],
  ['backend', 'devops'],
]

const largestLayer = Math.max(...stackGroups.map((group) => group.items.length))
const showLevels = stackGroups.some((group) => group.items.some((item) => item.level))

/**
 * One equipment slot group. The XP bar is the layer's share of the whole stack (real data);
 * per-technology levels only appear once `level` is filled in stack.data.ts.
 */
const LoadoutCard = ({ group, content, language }: { group: StackGroup; content: HomeContent; language: Language }) => {
  const ref = useRef<HTMLDivElement>(null)
  useTilt(ref, 5)
  const count = String(group.items.length).padStart(2, '0')

  return (
    <div ref={ref} className="yk-loadout-card yk-holo" data-cursor>
      <table className="yk-loadout-table">
        <caption>
          <span className="yk-loadout-code">{group.code}</span>
          <span className="yk-loadout-layer">{content.stack.layers[group.layer]}</span>
          <span className="yk-loadout-count" aria-hidden="true">
            {count}/{stackCount}
          </span>
          <span
            className="yk-xp"
            aria-hidden="true"
            style={{ '--xp': group.items.length / largestLayer } as React.CSSProperties}
          >
            <span className="yk-xp-fill" />
          </span>
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{content.stack.columns.technology}</th>
            <th scope="col">{content.stack.columns.usage}</th>
            {showLevels ? <th scope="col">Level</th> : null}
          </tr>
        </thead>
        <tbody>
          {group.items.map((item, index) => (
            <tr key={item.name} className="yk-loadout-row">
              <th scope="row">
                <span className="yk-loadout-icon">
                  <BrandIcon icon={item.icon} glyph={item.glyph} size={18} />
                </span>
                <span>{item.name}</span>
              </th>
              <td>
                <span>{item.usage[language]}</span>
                <span className="yk-loadout-ref" aria-hidden="true">
                  {group.code}.{String(index + 1).padStart(2, '0')}
                </span>
              </td>
              {showLevels ? <td className="yk-loadout-level">{item.level ?? '—'}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * EP.02 LOADOUT — the stack as an RPG equipment screen. Cards are dealt in with a 3D flip,
 * rows slide out from the center of each card, and the XP bars charge with an elastic ease.
 */
export const Stack = ({ content, language }: StackProps) => {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (root, { onEnter }) => {
    const cards = gsap.utils.toArray<HTMLElement>('.yk-loadout-card', root)
    gsap.set(cards, { transformPerspective: 1100, transformOrigin: '50% 100%' })
    gsap.from(cards, {
      rotationX: -75,
      y: 60,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: { each: 0.12, from: 'center' },
      scrollTrigger: onEnter('.yk-loadout-grid', 'top 80%'),
    })

    // Rows and XP bars run on Anime.js once each card is on screen.
    const triggers = cards.map((card) =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          animate(card.querySelectorAll('.yk-loadout-row'), {
            opacity: [0, 1],
            translateX: { from: (_target: unknown, index: number, total: number) => (index - total / 2) * 14, to: 0 },
            delay: stagger(45, { from: 'center', start: 250 }),
            duration: 700,
            ease: 'outExpo',
          })
          animate(card.querySelectorAll('.yk-xp-fill'), {
            scaleX: [0, 1],
            delay: 350,
            duration: 1400,
            ease: 'outElastic(1, .6)',
          })
          animate(card.querySelectorAll('.yk-loadout-icon'), {
            scale: [0, 1],
            rotate: [-90, 0],
            delay: stagger(40, { from: 'center', start: 300 }),
            duration: 600,
            ease: 'outBack(2)',
          })
        },
      }),
    )

    return () => triggers.forEach((trigger) => trigger.kill())
  })

  return (
    <section ref={ref} id="skills" className="yk-episode yk-loadout" aria-labelledby="skills-title" tabIndex={-1}>
      <div className="wrap">
        <EpisodeHeader
          id="skills"
          code={`${content.sections.skills.code} / SPEC`}
          title={content.stack.title}
          description={content.stack.description}
        />
        <div className="yk-loadout-grid">
          {columns.map((layers) => (
            <div key={layers.join()} className="yk-loadout-column">
              {layers.map((layer) => {
                const group = stackGroups.find((candidate) => candidate.layer === layer)
                return group ? <LoadoutCard key={layer} group={group} content={content} language={language} /> : null
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

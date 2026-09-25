import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScene } from '../../experience/motion/useScene'
import { scrambleText } from '../../shared/neon/scramble'
import type { HomeContent } from '../home.content'
import { EpisodeHeader } from './EpisodeHeader'

interface ExperienceProps {
  content: HomeContent
}

/** Inclusive month count between two `YYYY-MM` stamps. */
const monthsBetween = (start: string, end: string) => {
  const [startYear, startMonth] = start.split('-').map(Number)
  const [endYear, endMonth] = end.split('-').map(Number)
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1
}

const toDisplay = (stamp: string) => stamp.replace('-', '.')

/**
 * EP.04 LOG — the career as `git log`. The rail draws itself with the scroll (scrubbed),
 * each commit node lights up as the rail reaches it, the role decodes out of katakana noise
 * and the highlights land like diff lines being applied.
 */
export const Experience = ({ content }: ExperienceProps) => {
  const { experience } = content
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (root, { onEnter }) => {
    gsap.from('.yk-log-cmd-text', {
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 0.6,
      ease: `steps(${experience.command.length})`,
      scrollTrigger: onEnter('.yk-log-console', 'top 80%'),
    })

    gsap.fromTo(
      '.yk-log-rail-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.yk-log-list', start: 'top 70%', end: 'bottom 55%', scrub: 0.5 },
      },
    )

    const entries = gsap.utils.toArray<HTMLElement>('.yk-log-entry', root)
    entries.forEach((entry) => {
      // Nodes are lit in the static markup; the choreography dims them until the rail arrives.
      entry.classList.add('is-dim')
      gsap.set(entry.querySelectorAll('.yk-log-diff li'), { clipPath: 'inset(0% 100% 0% 0%)' })
      ScrollTrigger.create({
        trigger: entry,
        start: 'top 62%',
        once: true,
        onEnter: () => {
          entry.classList.remove('is-dim')
          const role = entry.querySelector<HTMLElement>('.yk-log-role-fx')
          if (role) scrambleText(role, role.dataset.text ?? '', { duration: 0.8 })
          gsap
            .timeline()
            .from(entry.querySelector('.yk-log-meta'), { x: -30, autoAlpha: 0, duration: 0.6, ease: 'expo.out' })
            .to(
              entry.querySelectorAll('.yk-log-diff li'),
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.out', stagger: 0.12 },
              0.2,
            )
            .from(
              entry.querySelectorAll('.yk-log-diff li'),
              { backgroundColor: 'rgba(0, 240, 255, 0.22)', duration: 1.2, ease: 'power2.out', stagger: 0.12 },
              0.2,
            )
        },
      })
    })

    return () => entries.forEach((entry) => entry.classList.remove('is-dim'))
  })

  return (
    <section ref={ref} id="experience" className="yk-episode yk-log" aria-labelledby="experience-title" tabIndex={-1}>
      <div className="wrap">
        <EpisodeHeader
          id="experience"
          code={content.sections.experience.code}
          title={experience.title}
          description={experience.description}
        />

        <div className="yk-log-console">
          <p className="yk-log-cmd">
            <span className="text-neon-magenta">~/alexi $</span>{' '}
            <span className="yk-log-cmd-text">{experience.command}</span>
          </p>

          <div className="yk-log-timeline">
            <span className="yk-log-rail" aria-hidden="true">
              <span className="yk-log-rail-fill" />
            </span>
            <ol className="yk-log-list">
              {experience.items.map((item) => {
                const months = monthsBetween(item.start, item.end)

                return (
                  <li key={`${item.company}-${item.start}`} className="yk-log-entry">
                    <span className="yk-log-node" aria-hidden="true" />
                    <div className="yk-log-meta">
                      <p>
                        <time dateTime={item.start}>{toDisplay(item.start)}</time>
                        {' → '}
                        <time dateTime={item.end}>{toDisplay(item.end)}</time>
                      </p>
                      <p className="yk-log-months">
                        {months} {months === 1 ? experience.monthsSingular : experience.monthsPlural}
                      </p>
                    </div>
                    <div className="yk-log-body">
                      <h3>
                        <span className="sr-only">{item.role}</span>
                        <span className="yk-log-role-fx" data-text={item.role} aria-hidden="true">
                          {item.role}
                        </span>{' '}
                        <span className="yk-log-at">@ {item.company}</span>
                      </h3>
                      <ul className="yk-log-diff">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>
                            <span className="yk-log-plus" aria-hidden="true">
                              +
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

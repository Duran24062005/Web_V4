import { useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { siGithub } from 'simple-icons'
import type { Language } from '../../i18n/config'
import { useScene } from '../../experience/motion/useScene'
import { BrandIcon } from '../../shared/components/BrandIcon'
import { useTilt } from '../../shared/hooks/useTilt'
import { NeonButton } from '../../shared/neon/NeonButton'
import { contactData, type HomeContent } from '../home.content'
import type { CaseStudy } from '../projects.data'
import { EpisodeHeader } from './EpisodeHeader'

interface ProjectsProps {
  content: HomeContent
  language: Language
  cases: CaseStudy[]
}

const hostOf = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

const repoPath = (url?: string) => (url ? url.replace(/^https:\/\/github\.com\//, '') : undefined)

/** Without a screenshot, the preview draws the project's stack as a lit circuit. */
const StackCircuit = ({ project }: { project: CaseStudy }) => (
  <div className="yk-circuit" aria-hidden="true">
    <p className="yk-circuit-path">{repoPath(project.repoUrl) ?? project.name}</p>
    <ol className="yk-circuit-chain">
      {project.stack.slice(0, 4).map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ol>
    {project.demoUrl ? <p className="yk-circuit-meta">→ {hostOf(project.demoUrl)}</p> : null}
  </div>
)

const MissionCard = ({
  project,
  position,
  content,
  language,
}: {
  project: CaseStudy
  position: number
  content: HomeContent
  language: Language
}) => {
  const { projects: copy } = content
  const titleId = `case-${project.id}`
  // Tilt lives on the inner body: the article itself is turned by the scroll timeline.
  const bodyRef = useRef<HTMLDivElement>(null)
  useTilt(bodyRef, 6)

  return (
    <article className="yk-mission" aria-labelledby={titleId}>
      <div ref={bodyRef} className="yk-mission-body yk-holo" data-cursor>
        <p className="yk-mission-top hud-label">
          <span className="text-neon-magenta" aria-hidden="true">
            MISSION
          </span>
          <span>
            CASE.{String(position).padStart(2, '0')}
            {project.year ? ` · ${project.year}` : ''}
          </span>
        </p>

        <div className="yk-mission-preview">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt="" loading="lazy" decoding="async" width={800} height={450} />
          ) : (
            <StackCircuit project={project} />
          )}
          <span className="yk-mission-preview-label hud-label" aria-hidden="true">
            {copy.previewLabel}
          </span>
        </div>

        <h3 id={titleId} className="yk-mission-title">
          {project.name}
        </h3>

        <dl className="yk-mission-spec">
          <div>
            <dt>{copy.fields.problem}</dt>
            <dd>{project.problem[language]}</dd>
          </div>
          <div>
            <dt>{copy.fields.stack}</dt>
            <dd>
              <ul className="yk-tags" aria-label={copy.fields.stack}>
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>{copy.fields.role}</dt>
            <dd>{project.role ? project.role[language] : <span className="todo">{copy.pendingRole}</span>}</dd>
          </div>
          <div>
            <dt>{copy.fields.result}</dt>
            <dd>{project.result ? project.result[language] : <span className="todo">{copy.pendingResult}</span>}</dd>
          </div>
        </dl>

        <div className="yk-mission-links">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="yk-hud-link">
              {copy.demo}
              <span className="sr-only">: {project.name}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="yk-hud-link">
              {copy.repo}
              <span className="sr-only">: {project.name}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

const EmptyState = ({ content }: { content: HomeContent }) => (
  <div className="yk-missions-empty">
    <ol className="yk-empty-slots" aria-hidden="true">
      {[1, 2, 3].map((slot) => (
        <li key={slot}>
          <span>
            {content.projects.slot} {String(slot).padStart(2, '0')}
          </span>
          <span>DNP · {content.projects.slotEmpty}</span>
        </li>
      ))}
    </ol>
    <div>
      <h3>{content.projects.emptyTitle}</h3>
      <p>{content.projects.emptyBody}</p>
      <NeonButton
        href={contactData.github}
        target="_blank"
        rel="noreferrer"
        variant="ghost"
        icon={<BrandIcon icon={siGithub} size={16} />}
      >
        {content.projects.emptyCta}
      </NeonButton>
    </div>
  </div>
)

/**
 * EP.03 MISSIONS — on desktop the section pins and the mission cards travel sideways with the
 * scroll, each one turning in perspective as it crosses the screen. Phones get a native
 * horizontal carousel with scroll snap; reduced motion gets a plain grid.
 */
export const Projects = ({ content, language, cases }: ProjectsProps) => {
  const ref = useRef<HTMLElement>(null)

  useScene(
    ref,
    (root) => {
      const track = root.querySelector<HTMLElement>('.yk-missions-track')
      if (!track || cases.length === 0) {
        return
      }

      const media = gsap.matchMedia()
      media.add('(min-width: 1024px)', () => {
        root.classList.add('is-pinned')
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
        const progress = root.querySelector<HTMLElement>('.yk-missions-progress span')

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.yk-missions-stage',
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => progress?.style.setProperty('transform', `scaleX(${self.progress})`),
          },
        })

        gsap.utils.toArray<HTMLElement>('.yk-mission', root).forEach((card) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                containerAnimation: travel,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            })
            .fromTo(
              card,
              { rotationY: -32, scale: 0.88, transformPerspective: 1200 },
              { rotationY: 0, scale: 1, ease: 'power2.out' },
            )
            .to(card, { rotationY: 28, scale: 0.9, ease: 'power2.in' })
        })

        return () => root.classList.remove('is-pinned')
      })

      return () => media.revert()
    },
    [cases.length],
  )

  return (
    <section ref={ref} id="projects" className="yk-episode yk-missions" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="yk-missions-stage">
        <div className="wrap">
          <EpisodeHeader
            id="projects"
            code={content.sections.projects.code}
            title={content.projects.title}
            description={content.projects.description}
            aside={
              cases.length > 0 ? (
                <a href={contactData.github} target="_blank" rel="noreferrer" className="yk-hud-link">
                  {content.projects.moreCta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : null
            }
          />
        </div>

        {cases.length > 0 ? (
          <>
            <div className="yk-missions-track">
              {cases.map((project, position) => (
                <MissionCard
                  key={project.id}
                  project={project}
                  position={position + 1}
                  content={content}
                  language={language}
                />
              ))}
            </div>
            <div className="wrap">
              <p className="yk-missions-progress" aria-hidden="true">
                <span />
              </p>
            </div>
          </>
        ) : (
          <div className="wrap">
            <EmptyState content={content} />
          </div>
        )}
      </div>
    </section>
  )
}

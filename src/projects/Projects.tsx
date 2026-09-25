import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { ArrowRight, ChevronRight, Github } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { getCopy } from '../i18n/copy'
import type { Project } from '../interfaces/Project.interfaces'
import { techNames } from '../mock/data/tech.data'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { PageHero } from '../shared/components/PageHero'
import { useProjects } from '../shared/hooks/useProjects'
import { useReducedMotion } from '../shared/hooks/useReducedMotion'
import { useTilt } from '../shared/hooks/useTilt'
import { NeonRouteLink } from '../shared/neon/NeonRouteLink'

const filterOptions = ['all', ...techNames]

type Copy = ReturnType<typeof getCopy>

/** Links differ by slot, as on the previous layout: featured, side, then the rest. */
const linksFor = (project: Project, slot: number, copy: Copy) => {
  if (slot === 0) {
    return [
      { href: project.demoUrl, label: copy.common.liveDemo, icon: <ArrowRight aria-hidden="true" /> },
      { href: project.repoUrl, label: 'GitHub', icon: <Github aria-hidden="true" /> },
    ]
  }
  if (slot === 1) {
    return [{ href: project.demoUrl, label: copy.common.viewProject, icon: <ChevronRight aria-hidden="true" /> }]
  }
  return [
    { href: project.demoUrl, label: copy.common.deploy, icon: <ArrowRight aria-hidden="true" /> },
    { href: project.repoUrl, label: copy.common.code, icon: <Github aria-hidden="true" /> },
  ]
}

const ArchiveCard = ({ project, slot, copy }: { project: Project; slot: number; copy: Copy }) => {
  const ref = useRef<HTMLDivElement>(null)
  useTilt(ref, 5)
  const technologies = project.technologies.slice(0, slot === 0 ? 3 : 2)

  return (
    <article className={`yk-archive-card ${slot === 0 ? 'is-featured' : ''}`.trim()}>
      <div ref={ref} className="yk-archive-body yk-holo" data-cursor>
        <div className="yk-archive-media">
          <img src={project.imageUrl} alt={project.title} loading={slot < 2 ? 'eager' : 'lazy'} decoding="async" />
          <span className="yk-archive-index hud-label" aria-hidden="true">
            FILE.{String(slot + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="yk-archive-copy">
          <ul className="yk-tags">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="yk-archive-links">
            {linksFor(project, slot, copy).map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="yk-hud-link">
                {link.label}
                <span className="sr-only">: {project.title}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

const ArchiveSkeleton = () => (
  <div className="yk-archive-grid" aria-hidden="true">
    {[0, 1, 2, 3].map((index) => (
      <div key={index} className={`yk-archive-skeleton ${index === 0 ? 'is-featured' : ''}`.trim()}>
        <span />
        <span />
        <span />
      </div>
    ))}
  </div>
)

/**
 * /projects — the mission archive. Every filter change redeals the grid from the center out
 * (Anime.js stagger); the filter chips are toggle buttons (aria-pressed).
 */
export const Projects = () => {
  const { projectsList, handleSearch, loading, error } = useProjects()
  const [activeFilter, setActiveFilter] = useState('all')
  const { language } = useLanguage()
  const copy = getCopy(language)
  const reduced = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)

  const applyFilter = (filter: string) => {
    setActiveFilter(filter)
    handleSearch(filter)
  }

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.yk-archive-card')
    if (!cards?.length || reduced) {
      return
    }

    const animation = animate(cards, {
      opacity: [0, 1],
      scale: [0.9, 1],
      rotateX: [-25, 0],
      delay: stagger(70, { from: 'center' }),
      duration: 700,
      ease: 'outExpo',
    })
    return () => {
      animation.pause()
    }
  }, [projectsList, reduced])

  return (
    <CuratedPageShell activePath="/projects">
      <main className="yk-page">
        <div className="wrap">
          <PageHero
            code="FILE // MISSION ARCHIVE"
            kana="作戦記録"
            titleLead={copy.projects.title}
            body={copy.projects.description}
          />

          <section className="yk-filter" aria-labelledby="project-filter-label">
            <p id="project-filter-label" className="hud-label">
              {copy.common.filterBy}
            </p>
            <div className="yk-filter-chips">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => applyFilter(filter)}
                  className="yk-chip"
                >
                  {filter === 'all' ? copy.common.allProjects : filter}
                </button>
              ))}
            </div>
          </section>

          {error ? (
            <p className="yk-alert" role="alert">
              {error}
            </p>
          ) : null}

          {loading ? (
            <ArchiveSkeleton />
          ) : projectsList.length > 0 ? (
            <div ref={gridRef} className="yk-archive-grid">
              {projectsList.map((project, slot) => (
                <ArchiveCard key={project.id} project={project} slot={slot} copy={copy} />
              ))}
            </div>
          ) : (
            <div className="yk-empty-panel">
              <p className="hud-label text-neon-warn" aria-hidden="true">
                NO SIGNAL // 信号なし
              </p>
              <p>{copy.projects.empty}</p>
            </div>
          )}

          <section className="yk-page-cta" aria-labelledby="projects-cta-title">
            <h2 id="projects-cta-title">{copy.projects.ctaTitle}</h2>
            <p>{copy.projects.ctaBody}</p>
            <NeonRouteLink to="/contact" size="lg">
              {copy.common.startConversation}
            </NeonRouteLink>
          </section>
        </div>
      </main>
    </CuratedPageShell>
  )
}

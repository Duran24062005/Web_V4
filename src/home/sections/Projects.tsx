import { ArrowUpRight } from 'lucide-react'
import { siGithub } from 'simple-icons'
import type { Language } from '../../i18n/config'
import { BrandIcon } from '../../shared/components/BrandIcon'
import { contactData, type HomeContent } from '../home.content'
import type { CaseStudy } from '../projects.data'
import { SectionHeader } from './SectionHeader'

interface ProjectsProps {
  content: HomeContent
  language: Language
  index: number
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

/** Without a screenshot, the preview draws the project's stack as a chain of blocks. */
const StackDiagram = ({ project }: { project: CaseStudy }) => (
  <div className="case-diagram" aria-hidden="true">
    <p className="case-diagram-path mono">{repoPath(project.repoUrl) ?? project.name}</p>
    <ol className="case-diagram-chain mono">
      {project.stack.slice(0, 4).map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ol>
    {project.demoUrl ? <p className="case-diagram-meta mono">→ {hostOf(project.demoUrl)}</p> : null}
  </div>
)

const CaseCard = ({
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

  return (
    <article className="case" aria-labelledby={titleId} data-reveal>
      <div className="case-preview">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt="" loading="lazy" decoding="async" width={800} height={450} />
        ) : (
          <StackDiagram project={project} />
        )}
        <span className="case-preview-label mono" aria-hidden="true">
          {copy.previewLabel}
        </span>
      </div>

      <div className="case-body">
        <p className="label">
          CASE.{String(position).padStart(2, '0')}
          {project.year ? ` · ${project.year}` : ''}
        </p>
        <h3 id={titleId}>{project.name}</h3>

        <dl className="case-spec">
          <div>
            <dt>{copy.fields.problem}</dt>
            <dd>{project.problem[language]}</dd>
          </div>
          <div>
            <dt>{copy.fields.stack}</dt>
            <dd>
              <ul className="tag-list" aria-label={copy.fields.stack}>
                {project.stack.map((technology) => (
                  <li key={technology} className="tag">
                    {technology}
                  </li>
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
            <dd>
              {project.result ? project.result[language] : <span className="todo">{copy.pendingResult}</span>}
            </dd>
          </div>
        </dl>

        <div className="case-links">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-link">
              {copy.demo}
              <span className="sr-only">: {project.name}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-link">
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
  <div className="projects-empty" data-reveal>
    <ol className="empty-slots mono" aria-hidden="true">
      {[1, 2, 3].map((slot) => (
        <li key={slot}>
          <span>
            {content.projects.slot} {String(slot).padStart(2, '0')}
          </span>
          <span>DNP · {content.projects.slotEmpty}</span>
        </li>
      ))}
    </ol>
    <div className="projects-empty-copy">
      <h3>{content.projects.emptyTitle}</h3>
      <p>{content.projects.emptyBody}</p>
      <a href={contactData.github} target="_blank" rel="noreferrer" className="button">
        <BrandIcon icon={siGithub} size={16} />
        {content.projects.emptyCta}
      </a>
    </div>
  </div>
)

export const Projects = ({ content, language, index, cases }: ProjectsProps) => (
  <section id="projects" className="section" aria-labelledby="projects-title" tabIndex={-1}>
    <div className="wrap">
      <SectionHeader
        id="projects"
        index={index}
        code={content.sections.projects.code}
        title={content.projects.title}
        description={content.projects.description}
        aside={
          cases.length > 0 ? (
            <a href={contactData.github} target="_blank" rel="noreferrer" className="text-link">
              {content.projects.moreCta}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null
        }
      />

      {cases.length > 0 ? (
        <div className="grid-12 cases-grid">
          {cases.map((project, position) => (
            <CaseCard
              key={project.id}
              project={project}
              position={position + 1}
              content={content}
              language={language}
            />
          ))}
        </div>
      ) : (
        <EmptyState content={content} />
      )}
    </div>
  </section>
)

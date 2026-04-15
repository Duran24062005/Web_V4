import { ArrowRight, ChevronRight, Github } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { getCopy } from '../i18n/copy'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { techNames } from '../mock/data/tech.data'
import { useProjects } from '../shared/hooks/useProjects'
import { LocalizedLink } from '../i18n/LocalizedLink'

const filterOptions = ['all', ...techNames]

const ProjectCardSkeleton = ({ tall = false }: { tall?: boolean }) => (
  <article className={`overflow-hidden bg-[var(--curated-surface)] ${tall ? 'md:col-span-4' : ''}`}>
    <div className={`${tall ? 'aspect-[3/4]' : 'aspect-video'} animate-pulse bg-[rgba(255,255,255,0.06)]`} />
    <div className="space-y-4 p-8">
      <div className="h-4 w-1/3 animate-pulse rounded bg-[rgba(255,255,255,0.06)]" />
      <div className="h-8 w-3/4 animate-pulse rounded bg-[rgba(255,255,255,0.08)]" />
      <div className="h-4 w-full animate-pulse rounded bg-[rgba(255,255,255,0.06)]" />
    </div>
  </article>
)

export const Projects = () => {
  const { projectsList, handleSearch, loading, error } = useProjects()
  const [activeFilter, setActiveFilter] = useState('all')
  const { language } = useLanguage()
  const copy = getCopy(language)

  const applyFilter = (filter: string) => {
    setActiveFilter(filter)
    handleSearch(filter)
  }

  const [featuredProject, sideProject, ...remainingProjects] = projectsList

  return (
    <CuratedPageShell activePath="/projects">
      <main className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-8">
        <header className="mb-20">
          <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-[-0.06em] md:text-7xl">
            {copy.projects.title}
          </h1>
          <p className="max-w-3xl font-editorial text-2xl italic leading-relaxed text-[var(--curated-muted)] md:text-3xl">
            {copy.projects.description}
          </p>
        </header>

        <section className="mb-16 flex flex-wrap items-center gap-4">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--curated-muted)]">
            {copy.common.filterBy}
          </span>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => applyFilter(filter)}
              className={`rounded-full px-6 py-2 font-label text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-[var(--curated-surface-strong)] text-[var(--curated-accent)]'
                  : 'bg-[var(--curated-surface)] text-[var(--curated-muted)] hover:text-[var(--curated-accent)]'
              }`}
            >
              {filter === 'all' ? copy.common.allProjects : filter}
            </button>
          ))}
        </section>

        {error && <p className="mb-8 text-center text-red-400">{error}</p>}

        {loading ? (
          <section className="grid gap-8 md:grid-cols-12">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton tall />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </section>
        ) : projectsList.length > 0 ? (
          <section className="grid gap-8 md:grid-cols-12">
            {featuredProject && (
              <article className="group overflow-hidden bg-[var(--curated-surface)] md:col-span-8">
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--curated-surface-strong)]">
                  <img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(19,19,19,0.8)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-8 md:p-12">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProject.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-[var(--curated-surface-lowest)] px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-[var(--curated-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-4 font-headline text-3xl font-bold transition-colors group-hover:text-[var(--curated-accent)]">
                    {featuredProject.title}
                  </h3>
                  <p className="mb-8 max-w-2xl font-editorial text-lg italic leading-relaxed text-[var(--curated-muted)]">
                    {featuredProject.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <a
                      href={featuredProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-accent)] transition-all hover:gap-4"
                    >
                      {copy.common.liveDemo}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={featuredProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-text)]"
                    >
                      GitHub
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {sideProject && (
              <article className="group overflow-hidden bg-[var(--curated-surface)] md:col-span-4">
                <div className="flex h-full flex-col">
                  <div className="aspect-[3/4] overflow-hidden bg-[var(--curated-surface-strong)]">
                    <img
                      src={sideProject.imageUrl}
                      alt={sideProject.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-6 flex flex-wrap gap-2">
                      {sideProject.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="bg-[var(--curated-surface-lowest)] px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-[var(--curated-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-4 font-headline text-2xl font-bold transition-colors group-hover:text-[var(--curated-accent)]">
                      {sideProject.title}
                    </h3>
                    <p className="mb-8 font-editorial text-base italic text-[var(--curated-muted)]">
                      {sideProject.description}
                    </p>
                    <div className="mt-auto">
                      <a
                        href={sideProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-accent)]"
                      >
                        {copy.common.viewProject}
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {remainingProjects.map((project) => (
              <article key={project.id} className="group overflow-hidden bg-[var(--curated-surface)] md:col-span-6">
                <div className="aspect-video overflow-hidden bg-[var(--curated-surface-strong)]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="bg-[var(--curated-surface-lowest)] px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-[var(--curated-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-4 font-headline text-2xl font-bold transition-colors group-hover:text-[var(--curated-accent)]">
                    {project.title}
                  </h3>
                  <p className="mb-8 font-editorial text-base italic text-[var(--curated-muted)]">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-accent)]"
                    >
                      {copy.common.deploy}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-muted)]"
                    >
                      {copy.common.code}
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="bg-[var(--curated-surface)] p-12 text-center">
            <p className="font-editorial text-2xl italic text-[var(--curated-muted)]">{copy.projects.empty}</p>
          </div>
        )}

        <section className="relative mt-32 overflow-hidden bg-[var(--curated-surface)] p-16 text-center">
          <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_center,#fdc562_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="mb-6 font-headline text-4xl font-bold">{copy.projects.ctaTitle}</h2>
            <p className="mx-auto mb-10 max-w-2xl font-editorial text-xl italic text-[var(--curated-muted)]">
              {copy.projects.ctaBody}
            </p>
            <LocalizedLink
              to="/contact"
              className="inline-flex bg-[var(--curated-accent)] px-10 py-4 font-label text-sm font-bold uppercase tracking-[0.24em] text-[#422c00] transition-all hover:shadow-[0_0_30px_rgba(253,197,98,0.3)]"
            >
              {copy.common.startConversation}
            </LocalizedLink>
          </div>
        </section>
      </main>
    </CuratedPageShell>
  )
}

import { useState } from 'react'
import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Database,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
  X,
} from 'lucide-react'
import { useAuthSession } from '../shared/hooks/useAuthSession'
import { useProjects } from '../shared/hooks/useProjects'
import { techNames } from '../mock/data/tech.data'
import { homeContent, homeNavigation } from './home.content'

const techIconMap = {
  html: Code2,
  css: Blocks,
  javascript: Code2,
  react: MonitorSmartphone,
  tailwind: Sparkles,
  bootstrap: Blocks,
  node: ServerCog,
  express: ServerCog,
  python: Code2,
  fastapi: ServerCog,
  mongodb: Database,
  postgresql: Database,
  docker: BriefcaseBusiness,
}

const statItems = (projectCount: number) => [
  { value: '2+', label: 'Años de experiencia práctica' },
  { value: `${projectCount}+`, label: 'Proyectos registrados en el sistema' },
  { value: `${techNames.length}`, label: 'Tecnologías activas en mi stack' },
]

const serviceIcons = [MonitorSmartphone, ServerCog, Sparkles]

const resolveTechIcon = (tech: string) => {
  const techKey = tech.toLowerCase()
  const entry = Object.entries(techIconMap).find(([key]) => techKey.includes(key))

  return entry?.[1] ?? Code2
}

const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`

const HomeNavigation = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const cta = isAuthenticated
    ? { label: 'Dashboard', href: '/dashboard' }
    : { label: 'Hablemos', href: '#contact' }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between border border-[rgba(153,144,124,0.12)] bg-[rgba(19,19,19,0.94)] px-5 py-4 shadow-[0_40px_60px_-15px_rgba(229,226,225,0.06)] backdrop-blur-xl md:px-8">
        <a href="#hero" className="font-headline text-xl font-extrabold tracking-[-0.04em] text-[var(--curated-text)] md:text-2xl">
          Alexi Dg
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {homeNavigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-label text-xs font-semibold uppercase tracking-[0.28em] text-[var(--curated-muted)] transition-colors duration-300 hover:text-[var(--curated-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 bg-[var(--curated-accent)] px-6 py-2.5 font-label text-sm font-semibold tracking-[0.08em] text-[#422c00] transition-transform duration-300 hover:scale-[1.02]"
          >
            {cta.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(153,144,124,0.16)] bg-[var(--curated-surface-soft)] text-[var(--curated-text)] md:hidden"
          aria-label="Abrir navegación"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 w-full max-w-[1440px] border border-[rgba(153,144,124,0.12)] bg-[rgba(19,19,19,0.98)] p-4 shadow-[0_40px_60px_-15px_rgba(229,226,225,0.06)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {homeNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-3 font-label text-xs font-semibold uppercase tracking-[0.28em] text-[var(--curated-muted)] transition-colors duration-300 hover:bg-[rgba(253,197,98,0.08)] hover:text-[var(--curated-accent)]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={cta.href}
              className="mt-2 inline-flex items-center justify-center bg-[var(--curated-accent)] px-4 py-3 font-label text-sm font-semibold tracking-[0.08em] text-[#422c00]"
              onClick={() => setMenuOpen(false)}
            >
              {cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

const ProjectSkeletonCard = ({ large = false }: { large?: boolean }) => (
  <div
    className={`overflow-hidden border border-[rgba(153,144,124,0.08)] bg-[var(--curated-surface-soft)] ${
      large ? 'md:col-span-8' : 'md:col-span-4'
    }`}
  >
    <div className={`${large ? 'aspect-video' : 'aspect-[4/3]'} animate-pulse bg-[rgba(255,255,255,0.06)]`} />
    <div className="space-y-4 p-6 md:p-8">
      <div className="h-6 w-3/4 animate-pulse rounded bg-[rgba(255,255,255,0.08)]" />
      <div className="h-4 w-full animate-pulse rounded bg-[rgba(255,255,255,0.06)]" />
      <div className="h-4 w-4/5 animate-pulse rounded bg-[rgba(255,255,255,0.06)]" />
    </div>
  </div>
)

function Home() {
  const { projectsList, loading } = useProjects()
  const { isAuthenticated } = useAuthSession()

  const featuredProjects = projectsList.filter((project) => project.featured)
  const curatedProjects = (featuredProjects.length > 0 ? featuredProjects : projectsList).slice(0, 4)
  const [featuredHeroProject, ...secondaryProjects] = curatedProjects
  const stats = statItems(projectsList.length)
  const whatsAppUrl = buildWhatsAppLink(
    homeContent.contact.whatsapp,
    homeContent.contact.whatsappMessage,
  )

  return (
    <>
      <HomeNavigation isAuthenticated={isAuthenticated} />

      <main className="overflow-x-hidden bg-[var(--curated-bg)] text-[var(--curated-text)]">
        <section
          id="hero"
          className="relative flex min-h-[860px] flex-col gap-16 px-4 pb-24 pt-36 md:px-8 md:pb-28 md:pt-40 lg:flex-row lg:items-center lg:gap-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(253,197,98,0.08),transparent_60%)]" />

          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-16 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-8">
              <div className="flex w-fit items-center gap-3 bg-[var(--curated-surface)] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[var(--curated-accent)] shadow-[0_0_20px_rgba(253,197,98,0.8)]" />
                <span className="font-label text-[10px] uppercase tracking-[0.36em] text-[var(--curated-muted)]">
                  {homeContent.status}
                </span>
              </div>

              <div className="space-y-6">
                <p className="font-label text-sm uppercase tracking-[0.4em] text-[var(--curated-accent)]">
                  {homeContent.role}
                </p>
                <h1 className="font-headline text-5xl font-extrabold leading-none tracking-[-0.07em] md:text-7xl xl:text-[5.5rem]">
                  Construyo productos
                  <span className="font-editorial ml-3 inline italic font-normal text-[var(--curated-accent)]">
                    digitales
                  </span>
                  <br />
                  con criterio técnico.
                </h1>
                <p className="max-w-2xl font-editorial text-2xl italic leading-relaxed text-[var(--curated-muted)] md:text-[2rem]">
                  {homeContent.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center bg-[var(--curated-accent)] px-8 py-4 font-headline text-sm font-bold uppercase tracking-[0.14em] text-[#422c00] transition-all hover:shadow-[0_0_30px_rgba(253,197,98,0.2)]"
                >
                  Ver proyectos seleccionados
                </a>
                <a
                  href="#about-me"
                  className="inline-flex items-center justify-center border border-[rgba(153,144,124,0.2)] px-8 py-4 font-headline text-sm font-bold uppercase tracking-[0.14em] text-[var(--curated-text)] transition-colors hover:bg-[var(--curated-surface)]"
                >
                  Mi proceso
                </a>
              </div>
            </div>

            <div className="relative flex-1">
              <div className="overflow-hidden bg-[var(--curated-surface-strong)] shadow-2xl">
                <img
                  src="/image/image_94f2750b.png"
                  alt="Retrato profesional de Alexi Durán Gómez"
                  className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>

              <div className="absolute -bottom-8 left-0 hidden border border-[rgba(153,144,124,0.12)] bg-[rgba(42,42,42,0.82)] p-6 backdrop-blur-md md:block">
                <div className="font-headline text-4xl font-bold text-[var(--curated-accent)]">
                  {stats[0].value}
                </div>
                <div className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--curated-muted)]">
                  {stats[0].label}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-me" className="bg-[var(--curated-surface)] px-4 py-28 md:px-8 md:py-32">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:flex-row md:items-start md:gap-24">
            <div className="md:w-1/3 md:sticky md:top-32">
              <h2 className="mb-6 font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-accent)]">
                Perfil y criterio
              </h2>
              <p className="font-headline text-3xl font-bold leading-snug md:text-4xl">
                Un portafolio no solo muestra lo que hago. También deja ver cómo pienso.
              </p>
            </div>

            <div className="space-y-10 md:w-2/3">
              <p className="font-editorial text-2xl italic leading-relaxed text-[var(--curated-text)] md:text-3xl">
                {homeContent.aboutLead}
              </p>

              <div className="grid gap-8 border-t border-[rgba(153,144,124,0.12)] pt-8 md:grid-cols-2">
                {homeContent.methodology.slice(0, 2).map((item) => (
                  <article key={item.title}>
                    <h3 className="font-headline text-lg font-bold">{item.title}</h3>
                    <p className="mt-3 leading-8 text-[var(--curated-muted)]">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="space-y-5">
                {homeContent.aboutBody.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-8 text-[var(--curated-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="px-4 py-28 md:px-8 md:py-32">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
              <h2 className="font-headline text-5xl font-extrabold leading-none tracking-[-0.06em] md:text-6xl">
                Arsenal
                <br />
                técnico
              </h2>

              <div className="max-w-xl md:text-right">
                <span className="font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-muted)]">
                  Stack actual del portafolio
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {techNames.map((tech) => {
                const Icon = resolveTechIcon(tech)

                return (
                  <article
                    key={tech}
                    className="group bg-[var(--curated-surface-soft)] p-6 transition-all duration-300 hover:bg-[var(--curated-surface-strong)]"
                  >
                    <div className="mb-4 text-[var(--curated-accent)]">
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="font-label text-sm font-semibold tracking-[0.04em] text-[var(--curated-text)]">
                      {tech}
                    </span>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-[var(--curated-surface-lowest,#0e0e0e)] px-4 py-28 md:px-8 md:py-32">
          <div className="mx-auto w-full max-w-[1440px]">
            <h2 className="mb-12 text-center font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-accent)]">
              Proyectos seleccionados
            </h2>

            {loading ? (
              <div className="grid gap-8 md:grid-cols-12">
                <ProjectSkeletonCard large />
                <ProjectSkeletonCard />
                <ProjectSkeletonCard />
                <ProjectSkeletonCard large />
              </div>
            ) : curatedProjects.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-12">
                {featuredHeroProject && (
                  <article className="group overflow-hidden border border-[rgba(153,144,124,0.08)] bg-[var(--curated-surface-soft)] md:col-span-8">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={featuredHeroProject.imageUrl}
                        alt={featuredHeroProject.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--curated-bg)] via-transparent to-transparent opacity-70" />
                    </div>

                    <div className="flex flex-col gap-6 p-6 md:p-10 lg:flex-row lg:items-end lg:justify-between">
                      <div className="space-y-4">
                        <h3 className="font-headline text-3xl font-bold tracking-[-0.04em]">
                          {featuredHeroProject.title}
                        </h3>
                        <p className="max-w-2xl font-editorial text-xl italic leading-relaxed text-[var(--curated-muted)]">
                          {featuredHeroProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {featuredHeroProject.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="bg-[var(--curated-bg)] px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-[var(--curated-muted)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={featuredHeroProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-headline text-sm font-bold text-[var(--curated-accent)] transition-all hover:gap-3"
                        >
                          Ver proyecto
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                          href={featuredHeroProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.22em] text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-text)]"
                        >
                          <Github className="h-4 w-4" />
                          Código
                        </a>
                      </div>
                    </div>
                  </article>
                )}

                {secondaryProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className={`group overflow-hidden border border-[rgba(153,144,124,0.08)] bg-[var(--curated-surface-soft)] ${
                      index === 2 ? 'md:col-span-8' : 'md:col-span-4'
                    }`}
                  >
                    <div className={`${index === 2 ? 'aspect-[21/10]' : 'h-64'} overflow-hidden`}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-4 p-6 md:p-8">
                      <h3 className={`${index === 2 ? 'text-3xl' : 'text-2xl'} font-headline font-bold tracking-[-0.04em]`}>
                        {project.title}
                      </h3>
                      <p className="font-editorial text-lg italic leading-relaxed text-[var(--curated-muted)]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="bg-[var(--curated-bg)] px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-[var(--curated-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="pt-3">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-headline text-sm font-bold text-[var(--curated-accent)] transition-all hover:gap-3"
                        >
                          Ver demo
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-[rgba(153,144,124,0.08)] bg-[var(--curated-surface-soft)] p-10 text-center">
                <p className="font-editorial text-2xl italic text-[var(--curated-muted)]">
                  Aún no hay proyectos disponibles para mostrar en esta vista.
                </p>
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              >
                Ver catálogo completo
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-5xl px-4 py-28 md:px-8 md:py-32">
          <h2 className="mb-16 font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-accent)]">
            Experiencia profesional
          </h2>

          <div className="space-y-12">
            {homeContent.experience.map((item) => (
              <article
                key={`${item.company}-${item.period}`}
                className="border-l border-[rgba(153,144,124,0.16)] pl-8 md:pl-12"
              >
                <p className="font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                  {item.period}
                </p>
                <h3 className="mt-4 font-headline text-3xl font-bold tracking-[-0.04em]">
                  {item.role}
                  <span className="text-[var(--curated-accent)]"> — {item.company}</span>
                </h3>
                <ul className="mt-6 space-y-3">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="leading-8 text-[var(--curated-muted)]">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="bg-[var(--curated-surface)] px-4 py-28 md:px-8 md:py-32">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-accent)]">
                  Servicios
                </p>
                <h2 className="mt-4 font-headline text-4xl font-extrabold tracking-[-0.05em] md:text-5xl">
                  Cómo aporto a un producto digital
                </h2>
              </div>
              <p className="max-w-xl text-[var(--curated-muted)] md:text-right">
                Arquitectura, implementación y criterio técnico para convertir una idea en una experiencia web mantenible.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {homeContent.services.map((service, index) => {
                const Icon = serviceIcons[index] ?? Sparkles

                return (
                  <article
                    key={service.title}
                    className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface-soft)] p-8"
                  >
                    <div className="mb-6 text-[var(--curated-accent)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-headline text-2xl font-bold">{service.title}</h3>
                    <p className="mt-4 leading-8 text-[var(--curated-muted)]">{service.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden px-4 py-32 text-center md:px-8 md:py-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,197,98,0.12),transparent_60%)]" />

          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center">
            <span className="font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-accent)]">
              Contacto
            </span>
            <h2 className="mt-6 font-headline text-5xl font-extrabold leading-none tracking-[-0.06em] md:text-7xl">
              ¿Listo para construir tu próximo
              <br />
              <span className="font-editorial italic font-normal text-[var(--curated-accent)]">
                proyecto
              </span>
              ?
            </h2>
            <p className="mt-8 max-w-3xl font-editorial text-2xl italic leading-relaxed text-[var(--curated-muted)]">
              Estoy abierto a colaboraciones, desarrollo por encargo y conversaciones técnicas sobre productos web.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={`mailto:${homeContent.contact.email}`}
                className="inline-flex items-center justify-center gap-2 bg-[var(--curated-accent)] px-8 py-4 font-headline text-sm font-bold uppercase tracking-[0.14em] text-[#422c00]"
              >
                <Mail className="h-4 w-4" />
                Escribir por email
              </a>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(153,144,124,0.18)] px-8 py-4 font-headline text-sm font-bold uppercase tracking-[0.14em] text-[var(--curated-text)] transition-colors hover:bg-[var(--curated-surface)]"
              >
                WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-14 grid w-full gap-4 md:grid-cols-3">
              <a
                href={`mailto:${homeContent.contact.email}`}
                className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface)] p-5 text-left transition-colors hover:border-[rgba(253,197,98,0.3)]"
              >
                <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--curated-muted)]">
                  Email
                </p>
                <p className="mt-3 font-headline text-lg font-bold text-[var(--curated-text)]">
                  {homeContent.contact.email}
                </p>
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface)] p-5 text-left transition-colors hover:border-[rgba(253,197,98,0.3)]"
              >
                <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--curated-muted)]">
                  WhatsApp
                </p>
                <p className="mt-3 font-headline text-lg font-bold text-[var(--curated-text)]">
                  {homeContent.contact.whatsapp}
                </p>
              </a>

              <div className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface)] p-5 text-left">
                <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--curated-muted)]">
                  Redes
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={homeContent.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={homeContent.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={homeContent.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={homeContent.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgba(153,144,124,0.12)] bg-[var(--curated-surface)] px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-headline text-sm font-extrabold uppercase tracking-[0.3em] text-[var(--curated-text)]">
              Alexi Dg
            </p>
            <p className="mt-2 text-sm text-[var(--curated-muted)]">
              © {new Date().getFullYear()} Portafolio personal. Home alineado con Stitch y contenido real del sistema.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={homeContent.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={homeContent.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={homeContent.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home

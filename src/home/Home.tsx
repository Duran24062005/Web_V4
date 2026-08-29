import { useState, type ReactNode } from 'react'
import {
  ArrowUpRight,
  Blocks,
  BriefcaseBusiness,
  Code2,
  Database,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Menu,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
  X,
} from 'lucide-react'
import { useAuthSession } from '../shared/hooks/useAuthSession'
import { useProjects } from '../shared/hooks/useProjects'
import { techNames } from '../mock/data/tech.data'
import { contactData, getHomeContent } from './home.content'
import { useLanguage } from '../i18n/LanguageContext'
import { LanguageSwitch } from '../i18n/LanguageSwitch'
import { LocalizedLink } from '../i18n/LocalizedLink'
import { getCopy } from '../i18n/copy'

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

const serviceIcons = [MonitorSmartphone, ServerCog, Sparkles]

const resolveTechIcon = (tech: string) => {
  const techKey = tech.toLowerCase()
  const entry = Object.entries(techIconMap).find(([key]) => techKey.includes(key))

  return entry?.[1] ?? Code2
}

const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`

const SectionHeading = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) => (
  <div className="section-heading">
    {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
    <h2 className="section-title">{title}</h2>
    {children ? <div className="section-heading-copy">{children}</div> : null}
  </div>
)

const HomeNavigation = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language } = useLanguage()
  const copy = getCopy(language)

  const cta = isAuthenticated
    ? { label: copy.navigation.dashboard, href: '/dashboard' }
    : { label: copy.navigation.talk, href: '#contact' }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="home-nav">
      <div className="home-nav-inner">
        <a href="#hero" className="home-brand" aria-label="Alexi Dg, inicio">
          <span className="home-brand-mark">AD</span>
          <span>Alexi Dg</span>
        </a>

        <nav className="home-nav-links" aria-label="Navegación principal">
          {copy.navigation.home.map((item) =>
            item.href.startsWith('#') ? (
              <a key={item.href} href={item.href} className="home-nav-link">
                {item.label}
              </a>
            ) : (
              <LocalizedLink key={item.href} to={item.href} className="home-nav-link">
                {item.label}
              </LocalizedLink>
            ),
          )}
        </nav>

        <div className="home-nav-actions">
          <LanguageSwitch
            className="language-switch"
            buttonClassName="language-button"
            activeButtonClassName="language-button-active"
            inactiveButtonClassName="language-button-inactive"
          />
          {cta.href.startsWith('#') ? (
            <a href={cta.href} className="button button-small button-accent">
              {cta.label}
            </a>
          ) : (
            <LocalizedLink to={cta.href} className="button button-small button-accent">
              {cta.label}
            </LocalizedLink>
          )}
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={copy.navigation.openMenu}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="mobile-nav-panel">
          <div className="mobile-nav-language">
            <LanguageSwitch
              className="language-switch"
              buttonClassName="language-button"
              activeButtonClassName="language-button-active"
              inactiveButtonClassName="language-button-inactive"
            />
          </div>
          <nav className="mobile-nav-links" aria-label="Navegación móvil">
            {copy.navigation.home.map((item) =>
              item.href.startsWith('#') ? (
                <a key={item.href} href={item.href} className="mobile-nav-link" onClick={closeMenu}>
                  {item.label}
                </a>
              ) : (
                <LocalizedLink key={item.href} to={item.href} className="mobile-nav-link" onClick={closeMenu}>
                  {item.label}
                </LocalizedLink>
              ),
            )}
            {cta.href.startsWith('#') ? (
              <a href={cta.href} className="button button-accent mobile-nav-cta" onClick={closeMenu}>
                {cta.label}
              </a>
            ) : (
              <LocalizedLink to={cta.href} className="button button-accent mobile-nav-cta" onClick={closeMenu}>
                {cta.label}
              </LocalizedLink>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

const ProjectSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <article className={featured ? 'project-card project-card-featured skeleton-card' : 'project-card skeleton-card'}>
    <div className="skeleton-media" />
    <div className="skeleton-copy">
      <span />
      <span />
      <span />
    </div>
  </article>
)

const ProjectMeta = ({ technologies }: { technologies: string[] }) => (
  <div className="project-meta" aria-label="Tecnologías">
    {technologies.slice(0, 3).map((technology) => (
      <span key={technology}>{technology}</span>
    ))}
  </div>
)

function Home() {
  const { projectsList, loading } = useProjects()
  const { isAuthenticated } = useAuthSession()
  const { language } = useLanguage()
  const homeContent = getHomeContent(language)

  const featuredProjects = projectsList.filter((project) => project.featured)
  const curatedProjects = (featuredProjects.length > 0 ? featuredProjects : projectsList).slice(0, 4)
  const [featuredProject, ...secondaryProjects] = curatedProjects
  const whatsappUrl = buildWhatsAppLink(homeContent.contact.whatsapp, homeContent.contact.whatsappMessage)
  const yearsLabel = language === 'es' ? 'Años de práctica' : 'Years of practice'
  const projectsLabel = language === 'es' ? 'Proyectos publicados' : 'Published projects'
  const stackLabel = language === 'es' ? 'Tecnologías en uso' : 'Technologies in use'
  const selectedWorkLabel = language === 'es' ? 'Trabajo seleccionado' : 'Selected work'
  const featuredProjectLabel = language === 'es' ? 'Proyecto destacado' : 'Featured project'
  const projectLabel = language === 'es' ? 'Proyecto' : 'Project'

  return (
    <>
      <HomeNavigation isAuthenticated={isAuthenticated} />

      <main className="home-page">
        <section id="hero" className="hero-section">
          <div className="hero-grid page-width">
            <div className="hero-copy reveal reveal-delay-1">
              <p className="hero-kicker">{homeContent.role}</p>
              <h1>
                {homeContent.titleLead}{' '}
                <span>{homeContent.titleAccent}</span>
                <br />
                {homeContent.titleTail}
              </h1>
              <p className="hero-subtitle">{homeContent.subtitle}</p>
              <div className="hero-actions">
                <a href="#projects" className="button button-accent">
                  {homeContent.ctas.featuredProjects}
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a href="#about-me" className="text-link">
                  {homeContent.ctas.process}
                  <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>

            <div className="hero-visual reveal reveal-delay-2">
              <div className="hero-texture" aria-hidden="true">
                <img src="/image/portfolio-creative-texture.png" alt="" />
              </div>
              <figure className="hero-portrait">
                <img src="/image/image_94f2750b.png" alt="Retrato profesional de Alexi Durán Gómez" />
              </figure>
              <div className="hero-note">
                <span>{homeContent.status}</span>
              </div>
              <div className="hero-stat">
                <strong>2+</strong>
                <span>{yearsLabel}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about-me" className="about-section section-block">
          <div className="about-layout page-width">
            <div className="about-intro reveal">
              <SectionHeading eyebrow={homeContent.aboutTitle} title={homeContent.aboutHeadline} />
            </div>
            <div className="about-content reveal reveal-delay-1">
              <p className="lead-copy">{homeContent.aboutLead}</p>
              <div className="methodology-list">
                {homeContent.methodology.map((item, index) => (
                  <article key={item.title} className="methodology-item">
                    <span className="methodology-index">0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="about-body">
                {homeContent.aboutBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section section-block">
          <div className="page-width">
            <div className="skills-header reveal">
              <SectionHeading title={language === 'es' ? 'Un stack que resuelve' : 'A stack that solves'}>
                <p>{homeContent.ctas.stackLabel}</p>
              </SectionHeading>
              <div className="stats-strip" aria-label="Resumen profesional">
                <div>
                  <strong>2+</strong>
                  <span>{yearsLabel}</span>
                </div>
                <div>
                  <strong>{projectsList.length}+</strong>
                  <span>{projectsLabel}</span>
                </div>
                <div>
                  <strong>{techNames.length}</strong>
                  <span>{stackLabel}</span>
                </div>
              </div>
            </div>

            <div className="tech-grid reveal reveal-delay-1">
              {techNames.map((technology) => {
                const Icon = resolveTechIcon(technology)

                return (
                  <div key={technology} className="tech-item">
                    <Icon aria-hidden="true" />
                    <span>{technology}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section section-block">
          <div className="page-width">
            <div className="projects-header reveal">
              <SectionHeading eyebrow={selectedWorkLabel} title={homeContent.ctas.projectsTitle}>
                <p>{language === 'es' ? 'Productos, experimentos y sistemas construidos para llegar a algo que funcione.' : 'Products, experiments and systems built to reach something that works.'}</p>
              </SectionHeading>
              <LocalizedLink to="/projects" className="text-link">
                {homeContent.ctas.fullCatalog}
                <ArrowUpRight aria-hidden="true" />
              </LocalizedLink>
            </div>

            {loading ? (
              <div className="projects-grid">
                <ProjectSkeleton featured />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </div>
            ) : featuredProject ? (
              <div className="projects-grid reveal reveal-delay-1">
                <article className="project-card project-card-featured">
                  <a href={featuredProject.demoUrl} target="_blank" rel="noreferrer" className="project-image-link">
                    <img src={featuredProject.imageUrl} alt={featuredProject.title} />
                    <span className="project-arrow" aria-hidden="true"><ArrowUpRight /></span>
                  </a>
                  <div className="project-card-copy">
                    <div className="project-card-topline">
                      <span>{featuredProjectLabel}</span>
                      <span>{featuredProject.createdAt ? new Date(featuredProject.createdAt).getFullYear() : ''}</span>
                    </div>
                    <h3>{featuredProject.title}</h3>
                    <p>{featuredProject.description}</p>
                    <ProjectMeta technologies={featuredProject.technologies} />
                  </div>
                </article>

                {secondaryProjects.map((project, index) => (
                  <article key={project.id} className={`project-card project-card-secondary project-card-secondary-${index + 1}`}>
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="project-image-link">
                      <img src={project.imageUrl} alt={project.title} />
                      <span className="project-arrow" aria-hidden="true"><ArrowUpRight /></span>
                    </a>
                    <div className="project-card-copy">
                      <div className="project-card-topline">
                        <span>{projectLabel}</span>
                        <span>{project.createdAt ? new Date(project.createdAt).getFullYear() : ''}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <ProjectMeta technologies={project.technologies} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-projects">
                <p>{homeContent.ctas.emptyProjects}</p>
              </div>
            )}
          </div>
        </section>

        <section id="experience" className="experience-section section-block">
          <div className="experience-layout page-width">
            <div className="experience-heading reveal">
              <SectionHeading title={homeContent.ctas.experienceTitle}>
                <p>{language === 'es' ? 'Trabajo entre producto, interfaz y arquitectura para que cada parte tenga una razón.' : 'I work across product, interface and architecture so every part has a reason.'}</p>
              </SectionHeading>
            </div>
            <div className="experience-list reveal reveal-delay-1">
              {homeContent.experience.map((item) => (
                <article key={`${item.company}-${item.period}`} className="experience-item">
                  <p className="experience-period">{item.period}</p>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                    <ul>
                      {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-block">
          <div className="page-width">
            <SectionHeading eyebrow={homeContent.ctas.servicesEyebrow} title={homeContent.ctas.servicesTitle}>
              <p>{homeContent.ctas.servicesDescription}</p>
            </SectionHeading>
            <div className="services-list reveal reveal-delay-1">
              {homeContent.services.map((service, index) => {
                const Icon = serviceIcons[index] ?? Sparkles

                return (
                  <article key={service.title} className="service-item">
                    <span className="service-index">0{index + 1}</span>
                    <Icon aria-hidden="true" />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-block">
          <div className="contact-layout page-width reveal">
            <div className="contact-copy">
              <p className="section-eyebrow">{homeContent.ctas.contactEyebrow}</p>
              <h2>
                {homeContent.ctas.contactTitleLead}{' '}
                <span>{homeContent.ctas.contactTitleAccent}</span>{homeContent.ctas.contactTitleTail}
              </h2>
              <p>{homeContent.ctas.contactDescription}</p>
            </div>
            <div className="contact-actions">
              <a href={`mailto:${contactData.email}`} className="contact-action">
                <span>{homeContent.ctas.emailAction}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-action">
                <span>WhatsApp</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <div className="contact-socials">
                <span>{homeContent.ctas.networks}</span>
                <a href={contactData.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
                <a href={contactData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
                <a href={contactData.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
                <a href={contactData.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home

import type { Language } from '../i18n/config'
import type { Project } from '../interfaces/Project.interfaces'

type Localized = Record<Language, string>

export interface CaseStudy {
  id: string
  name: string
  problem: Localized
  stack: string[]
  /** TODO(owner): what you did on the project. Missing → visible placeholder. */
  role?: Localized
  /** TODO(owner): a measurable outcome. Missing → visible placeholder. */
  result?: Localized
  year?: number
  demoUrl?: string
  repoUrl?: string
  /** Real screenshot (e.g. /image/projects/<id>.webp). Without it the card draws the stack as a diagram. */
  imageUrl?: string
}

/**
 * Public repositories already listed in the old project seed data.
 * Problem lines are condensed from those descriptions; role and result are pending.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'web-v4-backend',
    name: 'web_v4_backend',
    problem: {
      es: 'Backend de este portafolio: una API MVC entre el cliente y la base de datos, con endpoints CRUD bien definidos.',
      en: 'Backend for this portfolio: an MVC API between the client and the database, with well-defined CRUD endpoints.',
    },
    stack: ['Node.js', 'Express.js', 'MongoDB'],
    demoUrl: 'https://web-v4-backend.vercel.app/',
    repoUrl: 'https://github.com/Duran24062005/web_v4_backend',
  },
  {
    id: 'user-manager-express',
    name: 'UserManagerExpress',
    problem: {
      es: 'API REST de gestión de usuarios con CRUD completo y autenticación, sobre MongoDB y MySQL.',
      en: 'User management REST API with full CRUD and authentication, on MongoDB and MySQL.',
    },
    stack: ['Node.js', 'Express.js', 'MongoDB', 'MySQL'],
    demoUrl: 'https://user-manager-express.vercel.app/api/users2/all',
    repoUrl: 'https://github.com/Duran24062005/UserManagerExpress',
  },
  {
    id: 'email-python-fastapi',
    name: 'Email_Python_FastAPI',
    problem: {
      es: 'API REST para enviar correos con plantillas HTML personalizables, estructurada con principios SOLID.',
      en: 'REST API for sending email from customizable HTML templates, structured around SOLID principles.',
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    demoUrl: 'https://email-python-fast-api.vercel.app/',
    repoUrl: 'https://github.com/Duran24062005/Email_Python_FastAPI',
  },
  {
    id: 'vibra-cultural',
    name: 'vibra_cultural',
    problem: {
      es: 'Sitio tipo blog para documentar la identidad cultural de un pueblo: artículos, historias, personajes, fotos y video.',
      en: 'Blog-style site documenting a hometown’s cultural identity: articles, stories, people, photos and video.',
    },
    stack: ['TypeScript', 'React', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Duran24062005/vibra_cultural',
  },
]

/** Projects published from the dashboard API take precedence; duplicates (same repo) are dropped. */
export const mergeCaseStudies = (apiProjects: Project[], local: CaseStudy[], limit = 4): CaseStudy[] => {
  const fromApi: CaseStudy[] = [...apiProjects]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .map((project) => ({
      id: project.id,
      name: project.title,
      problem: { es: project.description, en: project.description },
      stack: project.technologies,
      year: project.createdAt ? new Date(project.createdAt).getFullYear() : undefined,
      demoUrl: project.demoUrl || undefined,
      repoUrl: project.repoUrl || undefined,
      imageUrl: project.imageUrl || undefined,
    }))

  const seen = new Set(fromApi.map((project) => project.repoUrl).filter(Boolean))
  const rest = local.filter((project) => !project.repoUrl || !seen.has(project.repoUrl))

  return [...fromApi, ...rest].slice(0, limit)
}

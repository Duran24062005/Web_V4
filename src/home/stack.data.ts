import {
  siBootstrap,
  siCss,
  siDart,
  siDocker,
  siDotnet,
  siExpress,
  siFastapi,
  siGit,
  siHtml5,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRust,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'
import type { Language } from '../i18n/config'

export type StackLayer = 'frontend' | 'backend' | 'data' | 'devops' | 'systems'

export interface StackItem {
  name: string
  /** Brand mark from simple-icons. C# has no official mark there, so it renders `glyph`. */
  icon?: SimpleIcon
  glyph?: string
  usage: Record<Language, string>
  /**
   * TODO(owner): optional proficiency, e.g. 'core' | 'solid' | 'learning'.
   * The table only shows a level column once at least one item has it.
   */
  level?: string
}

export interface StackGroup {
  layer: StackLayer
  code: string
  items: StackItem[]
}

// Usage lines reuse claims already present on the site (services copy, recruiter
// skills and public repositories). Review them in the pending list.
export const stackGroups: StackGroup[] = [
  {
    layer: 'frontend',
    code: 'FE',
    items: [
      { name: 'HTML', icon: siHtml5, usage: { es: 'Maquetación semántica y accesible', en: 'Semantic, accessible markup' } },
      { name: 'CSS', icon: siCss, usage: { es: 'Diseño responsivo y animaciones', en: 'Responsive layout and animation' } },
      { name: 'JavaScript', icon: siJavascript, usage: { es: 'ES6+, asincronía y DOM', en: 'ES6+, async flows and the DOM' } },
      { name: 'TypeScript', icon: siTypescript, usage: { es: 'Tipado de interfaces y contratos (este sitio)', en: 'Typed interfaces and contracts (this site)' } },
      { name: 'React', icon: siReact, usage: { es: 'SPA y librerías de componentes', en: 'SPAs and component libraries' } },
      { name: 'Tailwind CSS', icon: siTailwindcss, usage: { es: 'Sistemas de estilos utilitarios', en: 'Utility-first styling systems' } },
      { name: 'Bootstrap', icon: siBootstrap, usage: { es: 'Interfaces responsivas', en: 'Responsive interfaces' } },
    ],
  },
  {
    layer: 'backend',
    code: 'BE',
    items: [
      { name: 'Node.js', icon: siNodedotjs, usage: { es: 'APIs RESTful', en: 'RESTful APIs' } },
      { name: 'Express.js', icon: siExpress, usage: { es: 'APIs REST con arquitectura MVC', en: 'REST APIs with MVC architecture' } },
      { name: 'Python', icon: siPython, usage: { es: 'Backend y herramientas de consola', en: 'Backend and console tools' } },
      { name: 'FastAPI', icon: siFastapi, usage: { es: 'APIs RESTful', en: 'RESTful APIs' } },
      { name: 'Laravel', icon: siLaravel, usage: { es: 'APIs RESTful y microservicios', en: 'RESTful APIs and microservices' } },
      { name: 'Java', icon: siOpenjdk, usage: { es: 'APIs RESTful y microservicios', en: 'RESTful APIs and microservices' } },
      { name: 'Spring Boot', icon: siSpringboot, usage: { es: 'Servicios REST sobre Java', en: 'REST services on Java' } },
      { name: 'ASP.NET', icon: siDotnet, usage: { es: 'Servicios web sobre .NET', en: 'Web services on .NET' } },
      { name: 'C#', glyph: 'C#', usage: { es: 'Backend sobre .NET', en: 'Backend on .NET' } },
    ],
  },
  {
    layer: 'data',
    code: 'DB',
    items: [
      { name: 'PostgreSQL', icon: siPostgresql, usage: { es: 'Modelado relacional con SQLAlchemy', en: 'Relational modeling with SQLAlchemy' } },
      { name: 'MySQL', icon: siMysql, usage: { es: 'Persistencia relacional en APIs Express', en: 'Relational persistence for Express APIs' } },
      { name: 'MongoDB', icon: siMongodb, usage: { es: 'Documentos y esquemas flexibles', en: 'Documents and flexible schemas' } },
    ],
  },
  {
    layer: 'devops',
    code: 'OPS',
    items: [
      { name: 'Docker', icon: siDocker, usage: { es: 'Entornos reproducibles', en: 'Reproducible environments' } },
      { name: 'Git', icon: siGit, usage: { es: 'Control de versiones y ramas', en: 'Version control and branching' } },
      { name: 'Vercel', icon: siVercel, usage: { es: 'Despliegue de frontends y APIs', en: 'Deploying frontends and APIs' } },
    ],
  },
  {
    layer: 'systems',
    code: 'SYS',
    items: [
      { name: 'Rust', icon: siRust, usage: { es: 'Programación de sistemas', en: 'Systems programming' } },
      { name: 'Dart', icon: siDart, usage: { es: 'Apps multiplataforma', en: 'Cross-platform apps' } },
    ],
  },
]

export const stackCount = stackGroups.reduce((total, group) => total + group.items.length, 0)

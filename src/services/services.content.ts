import { Blocks, BriefcaseBusiness, LayoutTemplate, MonitorSmartphone, ServerCog } from 'lucide-react'
import type { Language } from '../i18n/config'

const servicesPageContentByLanguage = {
  es: {
    heroEyebrow: 'Arquitectura y ejecución',
    heroTitleLead: 'Construyendo sistemas',
    heroTitleAccent: 'digitales sostenibles.',
    heroBody:
      'Trabajo desde la interfaz hasta la lógica de negocio para convertir ideas en experiencias web mantenibles, medibles y listas para evolucionar.',
    ctaTitleLead: 'Construyamos algo',
    ctaTitleAccent: 'que',
    ctaTitleTail: 'pueda crecer sin perder claridad.',
    ctaBody:
      'Si necesitas apoyo puntual o llevar un producto completo desde idea hasta implementación, puedo ayudarte a definir y ejecutar el camino técnico.',
    cards: [
      {
        icon: LayoutTemplate,
        title: 'Frontend Engineering',
        description:
          'Interfaces responsivas con React, TypeScript y Tailwind CSS, orientadas a legibilidad, rendimiento y consistencia visual.',
        features: [
          'Diseño de interfaces y flujos',
          'Implementación responsive',
          'Consistencia visual con componentes reutilizables',
        ],
      },
      {
        icon: ServerCog,
        title: 'System Architecture',
        description:
          'Diseño de APIs, estructura de servicios y reglas de negocio para que el sistema sea entendible, escalable y fácil de mantener.',
        features: [
          'APIs REST con Node.js, FastAPI y Laravel',
          'Diseño de contratos entre capas',
          'Organización backend orientada a crecimiento',
        ],
      },
      {
        icon: BriefcaseBusiness,
        title: 'Technical Strategy',
        description:
          'Acompaño decisiones técnicas desde una visión de producto para evitar soluciones rápidas que luego se vuelven deuda.',
        features: [
          'Definición de alcance técnico',
          'Evaluación de stack y tradeoffs',
          'Priorización de implementación',
        ],
      },
      {
        icon: MonitorSmartphone,
        title: 'Full Stack Delivery',
        description:
          'Puedo asumir el ciclo completo de un producto web: frontend, backend, persistencia y despliegue, manteniendo coherencia entre capas.',
        features: [
          'Desarrollo de punta a punta',
          'Integración frontend-backend',
          'Entrega progresiva y validable',
        ],
      },
      {
        icon: Blocks,
        title: 'Optimization & Maintenance',
        description:
          'Mejora incremental de proyectos existentes para reducir fricción técnica, mejorar carga y dejar una base más sostenible.',
        features: [
          'Refactor y orden estructural',
          'Optimización de performance',
          'Corrección de bugs y deuda visible',
        ],
      },
    ],
  },
  en: {
    heroEyebrow: 'Architecture and delivery',
    heroTitleLead: 'Building',
    heroTitleAccent: 'sustainable digital systems.',
    heroBody:
      'I work from interface to business logic to turn ideas into maintainable, measurable web experiences that are ready to evolve.',
    ctaTitleLead: "Let's build something",
    ctaTitleAccent: 'that',
    ctaTitleTail: 'can grow without losing clarity.',
    ctaBody:
      'Whether you need focused support or want to move a full product from idea to implementation, I can help define and execute the technical path.',
    cards: [
      {
        icon: LayoutTemplate,
        title: 'Frontend Engineering',
        description:
          'Responsive interfaces built with React, TypeScript and Tailwind CSS, focused on readability, performance and visual consistency.',
        features: [
          'Interface and flow design',
          'Responsive implementation',
          'Visual consistency through reusable components',
        ],
      },
      {
        icon: ServerCog,
        title: 'System Architecture',
        description:
          'API design, service structure and business rules so the system stays understandable, scalable and easy to maintain.',
        features: [
          'REST APIs with Node.js, FastAPI and Laravel',
          'Contract design between layers',
          'Growth-oriented backend organization',
        ],
      },
      {
        icon: BriefcaseBusiness,
        title: 'Technical Strategy',
        description:
          'I support technical decisions from a product perspective to avoid quick fixes that later become debt.',
        features: [
          'Technical scope definition',
          'Stack and tradeoff evaluation',
          'Implementation prioritization',
        ],
      },
      {
        icon: MonitorSmartphone,
        title: 'Full Stack Delivery',
        description:
          'I can own the full lifecycle of a web product: frontend, backend, persistence and deployment, keeping coherence across layers.',
        features: [
          'End-to-end development',
          'Frontend-backend integration',
          'Progressive and testable delivery',
        ],
      },
      {
        icon: Blocks,
        title: 'Optimization & Maintenance',
        description:
          'Incremental improvement of existing projects to reduce technical friction, improve load performance and leave a more sustainable base.',
        features: [
          'Refactoring and structural cleanup',
          'Performance optimization',
          'Bug fixing and visible debt reduction',
        ],
      },
    ],
  },
} satisfies Record<Language, unknown>

export const getServicesPageContent = (language: Language) => servicesPageContentByLanguage[language]

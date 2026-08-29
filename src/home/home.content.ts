import type { Language } from '../i18n/config'

export const contactData = {
  email: 'alexisdurangomez588@gmail.com',
  whatsapp: '+573216123545',
  linkedin: 'https://www.linkedin.com/in/alexi-duran-gomez-6b17042a3/',
  github: 'https://github.com/Duran24062005',
  instagram: 'https://www.instagram.com/alexis_duran_dg/',
  facebook: 'https://www.facebook.com/profile.php?id=61573188309392',
}

const homeContentByLanguage = {
  es: {
    status: 'Disponible para nuevos proyectos',
    role: 'Full Stack Web Developer',
    titleLead: 'Construyo',
    titleAccent: 'productos',
    titleTail: 'que funcionan.',
    subtitle:
      'Desarrollo experiencias web completas que conectan frontend, backend y arquitectura en soluciones mantenibles, escalables y listas para producción.',
    aboutTitle: 'Perfil y criterio',
    aboutHeadline: 'Un portafolio no solo muestra lo que hago. También deja ver cómo pienso.',
    aboutLead:
      'Soy Alexi Durán Gómez, desarrollador full stack enfocado en construir soluciones web con una base técnica sólida y una presentación cuidada.',
    aboutBody: [
      'Trabajo entre frontend y backend para entregar productos completos: interfaces claras, APIs bien estructuradas y decisiones técnicas que no se vuelvan deuda al mes siguiente.',
      'Mi experiencia abarca React, Node.js, FastAPI, Laravel y bases de datos SQL y NoSQL. Me interesa especialmente que el software sea útil, mantenible y fácil de escalar.',
      'Fuera del código también me inspiran la música, la pintura y la lectura de ciencia ficción. Esa mezcla me ayuda a pensar con criterio técnico sin perder sensibilidad por la experiencia final.',
    ],
    methodology: [
      {
        title: 'Arquitectura antes de velocidad',
        description:
          'Prefiero una base limpia y bien organizada antes que una solución rápida difícil de sostener.',
      },
      {
        title: 'Frontend con intención',
        description:
          'Busco interfaces responsivas, comprensibles y alineadas con el objetivo real del producto.',
      },
      {
        title: 'Backend confiable',
        description:
          'Diseño servicios y APIs pensando en validación, claridad de contratos y crecimiento del sistema.',
      },
    ],
    stats: {
      years: 'Años de experiencia práctica',
      projects: 'Proyectos registrados en el sistema',
      technologies: 'Tecnologías activas en mi stack',
    },
    ctas: {
      featuredProjects: 'Ver proyectos seleccionados',
      process: 'Mi proceso',
      fullCatalog: 'Ver catálogo completo',
      project: 'Ver proyecto',
      code: 'Código',
      demo: 'Ver demo',
      emptyProjects: 'Aún no hay proyectos disponibles para mostrar en esta vista.',
      projectsTitle: 'Proyectos seleccionados',
      experienceTitle: 'Experiencia profesional',
      servicesEyebrow: 'Servicios',
      servicesTitle: 'Cómo aporto a un producto digital',
      servicesDescription:
        'Arquitectura, implementación y criterio técnico para convertir una idea en una experiencia web mantenible.',
      contactEyebrow: 'Contacto',
      contactTitleLead: '¿Listo para construir tu próximo',
      contactTitleAccent: 'proyecto',
      contactTitleTail: '?',
      contactDescription:
        'Estoy abierto a colaboraciones, desarrollo por encargo y conversaciones técnicas sobre productos web.',
      emailAction: 'Escribir por email',
      networks: 'Redes',
      stackLabel: 'Stack actual del portafolio',
    },
    services: [
      {
        title: 'Desarrollo Frontend',
        description:
          'Interfaces modernas con React, TypeScript y Tailwind CSS, enfocadas en rendimiento, accesibilidad y claridad visual.',
      },
      {
        title: 'Desarrollo Backend',
        description:
          'APIs y lógica de negocio con Node.js, Python y Laravel, priorizando escalabilidad y mantenibilidad.',
      },
      {
        title: 'Diseño de solución',
        description:
          'Acompaño la definición técnica del producto para convertir ideas en flujos implementables y sostenibles.',
      },
    ],
    experience: [
      {
        period: '06/2023 - 05/2024',
        company: 'Palestina Digital',
        role: 'Desarrollador Full Stack',
        highlights: [
          'Participé en el desarrollo de una plataforma de e-learning orientada a alto volumen de usuarios.',
          'Trabajé sobre una arquitectura basada en microservicios para mejorar escalabilidad y organización del sistema.',
          'Optimicé el rendimiento del frontend para reducir tiempos de carga y mejorar la experiencia de uso.',
        ],
      },
      {
        period: '07/2024 - 08/2024',
        company: 'Tensor S.A.S',
        role: 'Analista y Desarrollador de Software',
        highlights: [
          'Construí interfaces responsivas para clientes de distintos sectores y necesidades.',
          'Colaboré en la evolución de una librería interna de componentes en React.',
          'Aporté en procesos de migración desde una base legacy hacia una arquitectura frontend más moderna.',
        ],
      },
    ],
    contact: {
      ...contactData,
      whatsappMessage:
        'Hola Alexi, quiero conversar sobre un proyecto web y conocer tu disponibilidad.',
    },
  },
  en: {
    status: 'Available for new projects',
    role: 'Full Stack Web Developer',
    titleLead: 'I build',
    titleAccent: 'products',
    titleTail: 'that hold up.',
    subtitle:
      'I build complete web experiences that connect frontend, backend and architecture into maintainable, scalable and production-ready solutions.',
    aboutTitle: 'Profile and judgment',
    aboutHeadline: 'A portfolio does more than show what I do. It also reveals how I think.',
    aboutLead:
      'I am Alexi Durán Gómez, a full stack developer focused on building web solutions on top of solid technical foundations and careful presentation.',
    aboutBody: [
      'I work across frontend and backend to deliver complete products: clear interfaces, well-structured APIs and technical decisions that do not become debt a month later.',
      'My experience includes React, Node.js, FastAPI, Laravel and both SQL and NoSQL databases. I care especially about software being useful, maintainable and easy to scale.',
      'Outside of code, music, painting and science fiction also inspire me. That mix helps me think with technical judgment without losing sensitivity for the final experience.',
    ],
    methodology: [
      {
        title: 'Architecture before speed',
        description:
          'I prefer a clean and well-organized base over a fast solution that becomes hard to sustain.',
      },
      {
        title: 'Intentional frontend',
        description:
          'I aim for responsive, understandable interfaces aligned with the real product goal.',
      },
      {
        title: 'Reliable backend',
        description:
          'I design services and APIs with validation, clear contracts and system growth in mind.',
      },
    ],
    stats: {
      years: 'Years of hands-on experience',
      projects: 'Projects registered in the system',
      technologies: 'Active technologies in my stack',
    },
    ctas: {
      featuredProjects: 'View selected projects',
      process: 'My process',
      fullCatalog: 'View full catalog',
      project: 'View project',
      code: 'Code',
      demo: 'View demo',
      emptyProjects: 'There are no projects available to show in this view yet.',
      projectsTitle: 'Selected projects',
      experienceTitle: 'Professional experience',
      servicesEyebrow: 'Services',
      servicesTitle: 'How I contribute to a digital product',
      servicesDescription:
        'Architecture, implementation and technical judgment to turn an idea into a maintainable web experience.',
      contactEyebrow: 'Contact',
      contactTitleLead: 'Ready to build your next',
      contactTitleAccent: 'project',
      contactTitleTail: '?',
      contactDescription:
        'I am open to collaborations, contract development and technical conversations around web products.',
      emailAction: 'Write by email',
      networks: 'Social',
      stackLabel: 'Current portfolio stack',
    },
    services: [
      {
        title: 'Frontend development',
        description:
          'Modern interfaces with React, TypeScript and Tailwind CSS, focused on performance, accessibility and visual clarity.',
      },
      {
        title: 'Backend development',
        description:
          'APIs and business logic with Node.js, Python and Laravel, prioritizing scalability and maintainability.',
      },
      {
        title: 'Solution design',
        description:
          'I support the technical definition of the product to turn ideas into implementable and sustainable flows.',
      },
    ],
    experience: [
      {
        period: '06/2023 - 05/2024',
        company: 'Palestina Digital',
        role: 'Full Stack Developer',
        highlights: [
          'Contributed to the development of an e-learning platform designed for a high-volume user base.',
          'Worked within a microservices-based architecture to improve scalability and system organization.',
          'Optimized frontend performance to reduce load times and improve the user experience.',
        ],
      },
      {
        period: '07/2024 - 08/2024',
        company: 'Tensor S.A.S',
        role: 'Software Analyst and Developer',
        highlights: [
          'Built responsive interfaces for clients across different sectors and needs.',
          'Contributed to the evolution of an internal React component library.',
          'Supported migration efforts from a legacy base toward a more modern frontend architecture.',
        ],
      },
    ],
    contact: {
      ...contactData,
      whatsappMessage:
        'Hi Alexi, I would like to talk about a web project and learn about your availability.',
    },
  },
} satisfies Record<Language, unknown>

export const getHomeContent = (language: Language) => homeContentByLanguage[language]

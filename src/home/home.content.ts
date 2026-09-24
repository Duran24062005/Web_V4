import type { Language } from '../i18n/config'

export const contactData = {
  email: 'alexisdurangomez588@gmail.com',
  whatsapp: '+573216123545',
  linkedin: 'https://www.linkedin.com/in/alexi-duran-gomez-6b17042a3/',
  github: 'https://github.com/Duran24062005',
  instagram: 'https://www.instagram.com/alexis_duran_dg/',
  facebook: 'https://www.facebook.com/profile.php?id=61573188309392',
  cv: '/image/AlexiDuranGomez%20Tecnolog%C3%ADa%20Curr%C3%ADculum%20(2).pdf',
  /** IANA zone shown in the hero status panel. TODO(owner): confirm. */
  timeZone: 'America/Bogota',
}

/** Month the first professional role started; drives "uptime" and hero metrics. */
export const careerStart = new Date(2023, 5, 1)

/** Home sections in page order. `id` keeps the historical anchors working. */
export const sectionIds = ['about-me', 'skills', 'projects', 'experience', 'services', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]

/** A value the owner still has to provide. Rendered as a visible placeholder. */
export interface InfoField {
  key: string
  value: string
  todo?: boolean
}

const homeContentByLanguage = {
  es: {
    meta: {
      title: 'Alexi Durán Gómez — Desarrollador Full Stack',
      description:
        'Desarrollador full stack: interfaces en React y TypeScript, APIs en Node.js, FastAPI y Laravel, y la arquitectura que las sostiene en producción.',
    },
    sections: {
      'about-me': { code: 'PROFILE', label: 'Perfil' },
      skills: { code: 'STACK', label: 'Stack' },
      projects: { code: 'WORK', label: 'Proyectos' },
      experience: { code: 'LOG', label: 'Experiencia' },
      services: { code: 'API', label: 'Servicios' },
      contact: { code: 'I/O', label: 'Contacto' },
    } satisfies Record<SectionId, { code: string; label: string }>,
    hero: {
      command: 'whoami',
      output: 'alexi-duran-gomez · full stack developer',
      titleLead: 'Construyo',
      titleAccent: 'productos',
      titleTail: 'que funcionan.',
      subtitle:
        'Desarrollo full stack de punta a punta: interfaces en React y TypeScript, APIs en Node.js, FastAPI y Laravel, y la arquitectura que las sostiene en producción.',
      primaryCta: 'Ver proyectos',
      secondaryCta: 'Descargar CV',
      chip: {
        designator: 'U1',
        part: 'ADG-FS',
        inputs: ['REQS', 'DISEÑO', 'DATOS'],
        outputs: ['UI', 'API', 'DEPLOY'],
        caption:
          'Retrato de Alexi Durán Gómez dibujado como un componente electrónico: entran requisitos, diseño y datos; salen interfaz, API y despliegue.',
        photoAlt: 'Alexi Durán Gómez, con camisa blanca y gafas, de brazos cruzados frente a un fondo verde.',
      },
      status: {
        title: 'Estado',
        available: 'Disponible para nuevos proyectos',
        stackKey: 'Stack',
        stackValue: 'React · Node.js · FastAPI',
        locationKey: 'Zona',
        locationValue: 'Colombia · UTC−5',
        localTime: 'hora local',
        languagesKey: 'Idiomas',
        languagesValue: 'ES / EN',
      },
      metrics: {
        since: 'primer rol profesional',
        companies: 'empresas',
        technologies: 'tecnologías en el stack',
        projects: 'casos de estudio',
      },
    },
    profile: {
      title: 'Un portafolio no solo muestra lo que hago. También deja ver cómo pienso.',
      lead:
        'Soy Alexi Durán Gómez, desarrollador full stack enfocado en construir soluciones web con una base técnica sólida y una presentación cuidada.',
      body: [
        'Trabajo entre frontend y backend para entregar productos completos: interfaces claras, APIs bien estructuradas y decisiones técnicas que no se vuelvan deuda al mes siguiente.',
        'Fuera del código también me inspiran la música, la pintura y la lectura de ciencia ficción. Esa mezcla me ayuda a pensar con criterio técnico sin perder sensibilidad por la experiencia final.',
      ],
      modulesLabel: 'Principios',
      modules: [
        {
          code: 'M.01',
          title: 'Arquitectura antes de velocidad',
          description:
            'Prefiero una base limpia y bien organizada antes que una solución rápida difícil de sostener.',
        },
        {
          code: 'M.02',
          title: 'Frontend con intención',
          description:
            'Busco interfaces responsivas, comprensibles y alineadas con el objetivo real del producto.',
        },
        {
          code: 'M.03',
          title: 'Backend confiable',
          description:
            'Diseño servicios y APIs pensando en validación, claridad de contratos y crecimiento del sistema.',
        },
      ],
      systemInfo: {
        command: 'neofetch',
        user: 'alexi@dg',
        uptimeKey: 'Uptime',
        uptimeSuffix: 'desde el primer rol',
        fields: [
          { key: 'OS', value: 'pendiente: sistema operativo', todo: true },
          { key: 'Shell', value: 'pendiente: shell', todo: true },
          { key: 'Editor', value: 'pendiente: editor / IDE', todo: true },
          { key: 'Langs', value: 'TypeScript, Python, Java, C#, Rust, Dart' },
          { key: 'Stack', value: 'React · Node.js · FastAPI · Laravel' },
          { key: 'Locale', value: 'es-CO / en-US' },
        ] as InfoField[],
      },
      hardware: {
        title: 'Por debajo de la abstracción',
        body:
          'Me interesa entender qué pasa debajo del framework: del runtime al sistema operativo, y del sistema operativo al hardware. Esa curiosidad es la que me lleva a mirar lenguajes como Rust y a leer más allá de la documentación de la API.',
        fields: [
          { key: 'Setup', value: 'pendiente: equipo principal (CPU, RAM, monitor)', todo: true },
          { key: 'Teclado', value: 'pendiente: modelo / switches', todo: true },
          { key: 'Homelab', value: 'pendiente: servidor casero o Raspberry Pi', todo: true },
          { key: 'Electrónica', value: 'pendiente: Arduino, ESP32, soldadura…', todo: true },
        ] as InfoField[],
      },
    },
    stack: {
      title: 'Un stack que resuelve.',
      description: 'Organizado por capa. Cada fila dice dónde y para qué uso la tecnología.',
      columns: { technology: 'Tecnología', usage: 'Uso' },
      layers: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Datos',
        devops: 'DevOps',
        systems: 'Sistemas y multiplataforma',
      },
    },
    projects: {
      title: 'Proyectos seleccionados',
      description: 'Repositorios públicos contados como casos de estudio: el problema, el stack, mi rol y el resultado.',
      fields: { problem: 'Problema', role: 'Rol', result: 'Resultado', stack: 'Stack' },
      demo: 'Demo',
      repo: 'Repositorio',
      placeholderBadge: 'Placeholder',
      pendingRole: 'pendiente: tu rol en el proyecto',
      pendingResult: 'pendiente: resultado medible',
      previewLabel: 'vista previa',
      emptyTitle: 'Documentando casos de estudio',
      emptyBody:
        'Estoy escribiendo mis proyectos como casos de estudio: problema, decisiones, stack y resultado. Mientras tanto, el código está en GitHub.',
      emptyCta: 'Ver repositorios en GitHub',
      slot: 'slot',
      slotEmpty: 'sin poblar',
      moreCta: 'Todos los repositorios',
    },
    experience: {
      title: 'Experiencia profesional',
      description: 'Trabajo entre producto, interfaz y arquitectura para que cada parte tenga una razón.',
      command: 'git log --career',
      monthsSingular: 'mes',
      monthsPlural: 'meses',
      items: [
        {
          start: '2024-07',
          end: '2024-08',
          company: 'Tensor S.A.S',
          role: 'Analista y Desarrollador de Software',
          highlights: [
            'Construí interfaces responsivas para clientes de distintos sectores y necesidades.',
            'Colaboré en la evolución de una librería interna de componentes en React.',
            'Aporté en procesos de migración desde una base legacy hacia una arquitectura frontend más moderna.',
          ],
        },
        {
          start: '2023-06',
          end: '2024-05',
          company: 'Palestina Digital',
          role: 'Desarrollador Full Stack',
          highlights: [
            'Participé en el desarrollo de una plataforma de e-learning orientada a alto volumen de usuarios.',
            'Trabajé sobre una arquitectura basada en microservicios para mejorar escalabilidad y organización del sistema.',
            'Optimicé el rendimiento del frontend para reducir tiempos de carga y mejorar la experiencia de uso.',
          ],
        },
      ],
    },
    services: {
      title: 'Cómo aporto a un producto digital',
      description:
        'Arquitectura, implementación y criterio técnico para convertir una idea en una experiencia web mantenible.',
      keys: { input: 'Entrada', output: 'Salida', deliverables: 'Entregables' },
      items: [
        {
          endpoint: '/frontend',
          title: 'Desarrollo Frontend',
          description:
            'Interfaces modernas con React, TypeScript y Tailwind CSS, enfocadas en rendimiento, accesibilidad y claridad visual.',
          input: 'Diseños, requisitos o un producto existente',
          output: 'Interfaz responsiva y accesible en React + TypeScript',
          deliverables: ['Componentes reutilizables', 'Código documentado', 'Despliegue'],
        },
        {
          endpoint: '/backend',
          title: 'Desarrollo Backend',
          description:
            'APIs y lógica de negocio con Node.js, Python y Laravel, priorizando escalabilidad y mantenibilidad.',
          input: 'Reglas de negocio y modelo de datos',
          output: 'API con contratos claros, validación y persistencia',
          deliverables: ['Endpoints documentados', 'Esquema de datos', 'Entorno en Docker'],
        },
        {
          endpoint: '/solution-design',
          title: 'Diseño de solución',
          description:
            'Acompaño la definición técnica del producto para convertir ideas en flujos implementables y sostenibles.',
          input: 'Una idea o un problema de negocio',
          output: 'Un plan técnico que se puede construir por fases',
          deliverables: ['Arquitectura propuesta', 'Alcance por fases', 'Decisiones justificadas'],
        },
      ],
    },
    contact: {
      titleLead: '¿Listo para construir tu próximo',
      titleAccent: 'proyecto',
      titleTail: '?',
      description:
        'Estoy abierto a colaboraciones, desarrollo por encargo y conversaciones técnicas sobre productos web.',
      command: 'contact --email',
      copy: 'Copiar',
      copied: 'copiado al portapapeles',
      copyFailed: 'no se pudo copiar; selecciona el correo manualmente',
      responseTime: 'respondo en 24–48 h',
      email: 'Escribir por email',
      whatsapp: 'WhatsApp',
      whatsappMessage: 'Hola Alexi, quiero conversar sobre un proyecto web y conocer tu disponibilidad.',
      networks: 'Redes',
    },
    footer: {
      build: 'build',
      stack: 'Vite · React 19 · TypeScript · Tailwind v4 · Vercel',
      backToTop: 'Volver arriba',
    },
    nav: {
      home: 'Inicio',
      primary: 'Navegación principal',
      openMenu: 'Abrir navegación',
      closeMenu: 'Cerrar navegación',
      language: 'Idioma',
      commandHint: 'Buscar…',
      dashboard: 'Dashboard',
      skip: 'Saltar al contenido',
    },
    palette: {
      title: 'Paleta de comandos',
      placeholder: 'Escribe un comando o una sección…',
      empty: 'Sin resultados. Prueba con “stack” o “correo”.',
      groups: { navigate: 'Navegar', actions: 'Acciones', links: 'Enlaces' },
      goTo: 'Ir a',
      top: 'Inicio',
      switchLanguage: 'Cambiar a English',
      copyEmail: 'Copiar correo',
      emailCopied: 'Correo copiado al portapapeles',
      downloadCv: 'Descargar CV (PDF)',
      toggleGrid: 'Mostrar / ocultar grilla de 12 columnas',
      openGithub: 'Abrir GitHub',
      openLinkedin: 'Abrir LinkedIn',
      openWhatsapp: 'Abrir WhatsApp',
      hints: { navigate: 'navegar', run: 'ejecutar', close: 'cerrar' },
    },
  },
  en: {
    meta: {
      title: 'Alexi Durán Gómez — Full Stack Developer',
      description:
        'Full stack developer: React and TypeScript interfaces, APIs in Node.js, FastAPI and Laravel, and the architecture that keeps them running in production.',
    },
    sections: {
      'about-me': { code: 'PROFILE', label: 'Profile' },
      skills: { code: 'STACK', label: 'Stack' },
      projects: { code: 'WORK', label: 'Projects' },
      experience: { code: 'LOG', label: 'Experience' },
      services: { code: 'API', label: 'Services' },
      contact: { code: 'I/O', label: 'Contact' },
    } satisfies Record<SectionId, { code: string; label: string }>,
    hero: {
      command: 'whoami',
      output: 'alexi-duran-gomez · full stack developer',
      titleLead: 'I build',
      titleAccent: 'products',
      titleTail: 'that hold up.',
      subtitle:
        'End-to-end full stack development: React and TypeScript interfaces, APIs in Node.js, FastAPI and Laravel, and the architecture that keeps them running in production.',
      primaryCta: 'View projects',
      secondaryCta: 'Download CV',
      chip: {
        designator: 'U1',
        part: 'ADG-FS',
        inputs: ['SPEC', 'DESIGN', 'DATA'],
        outputs: ['UI', 'API', 'DEPLOY'],
        caption:
          'Portrait of Alexi Durán Gómez drawn as an electronic component: requirements, design and data go in; interface, API and deployment come out.',
        photoAlt: 'Alexi Durán Gómez in a white shirt and glasses, arms crossed, against a green background.',
      },
      status: {
        title: 'Status',
        available: 'Available for new projects',
        stackKey: 'Stack',
        stackValue: 'React · Node.js · FastAPI',
        locationKey: 'Zone',
        locationValue: 'Colombia · UTC−5',
        localTime: 'local time',
        languagesKey: 'Languages',
        languagesValue: 'ES / EN',
      },
      metrics: {
        since: 'first professional role',
        companies: 'companies',
        technologies: 'technologies in the stack',
        projects: 'case studies',
      },
    },
    profile: {
      title: 'A portfolio does more than show what I do. It also reveals how I think.',
      lead:
        'I am Alexi Durán Gómez, a full stack developer focused on building web solutions on top of solid technical foundations and careful presentation.',
      body: [
        'I work across frontend and backend to deliver complete products: clear interfaces, well-structured APIs and technical decisions that do not become debt a month later.',
        'Outside of code, music, painting and science fiction also inspire me. That mix helps me think with technical judgment without losing sensitivity for the final experience.',
      ],
      modulesLabel: 'Principles',
      modules: [
        {
          code: 'M.01',
          title: 'Architecture before speed',
          description:
            'I prefer a clean and well-organized base over a fast solution that becomes hard to sustain.',
        },
        {
          code: 'M.02',
          title: 'Intentional frontend',
          description:
            'I aim for responsive, understandable interfaces aligned with the real product goal.',
        },
        {
          code: 'M.03',
          title: 'Reliable backend',
          description:
            'I design services and APIs with validation, clear contracts and system growth in mind.',
        },
      ],
      systemInfo: {
        command: 'neofetch',
        user: 'alexi@dg',
        uptimeKey: 'Uptime',
        uptimeSuffix: 'since first role',
        fields: [
          { key: 'OS', value: 'pending: operating system', todo: true },
          { key: 'Shell', value: 'pending: shell', todo: true },
          { key: 'Editor', value: 'pending: editor / IDE', todo: true },
          { key: 'Langs', value: 'TypeScript, Python, Java, C#, Rust, Dart' },
          { key: 'Stack', value: 'React · Node.js · FastAPI · Laravel' },
          { key: 'Locale', value: 'es-CO / en-US' },
        ] as InfoField[],
      },
      hardware: {
        title: 'Below the abstraction',
        body:
          'I care about what happens under the framework: from the runtime to the operating system, and from the operating system to the hardware. That curiosity is what pulls me toward languages like Rust and past the API docs.',
        fields: [
          { key: 'Setup', value: 'pending: main machine (CPU, RAM, monitor)', todo: true },
          { key: 'Keyboard', value: 'pending: model / switches', todo: true },
          { key: 'Homelab', value: 'pending: home server or Raspberry Pi', todo: true },
          { key: 'Electronics', value: 'pending: Arduino, ESP32, soldering…', todo: true },
        ] as InfoField[],
      },
    },
    stack: {
      title: 'A stack that solves.',
      description: 'Grouped by layer. Each row says where and what I use the technology for.',
      columns: { technology: 'Technology', usage: 'Usage' },
      layers: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Data',
        devops: 'DevOps',
        systems: 'Systems & cross-platform',
      },
    },
    projects: {
      title: 'Selected projects',
      description: 'Public repositories told as case studies: the problem, the stack, my role and the result.',
      fields: { problem: 'Problem', role: 'Role', result: 'Result', stack: 'Stack' },
      demo: 'Demo',
      repo: 'Repository',
      placeholderBadge: 'Placeholder',
      pendingRole: 'pending: your role in the project',
      pendingResult: 'pending: measurable result',
      previewLabel: 'preview',
      emptyTitle: 'Writing up case studies',
      emptyBody:
        'I am writing my projects up as case studies: problem, decisions, stack and result. In the meantime, the code is on GitHub.',
      emptyCta: 'Browse repositories on GitHub',
      slot: 'slot',
      slotEmpty: 'not populated',
      moreCta: 'All repositories',
    },
    experience: {
      title: 'Professional experience',
      description: 'I work across product, interface and architecture so every part has a reason.',
      command: 'git log --career',
      monthsSingular: 'month',
      monthsPlural: 'months',
      items: [
        {
          start: '2024-07',
          end: '2024-08',
          company: 'Tensor S.A.S',
          role: 'Software Analyst and Developer',
          highlights: [
            'Built responsive interfaces for clients across different sectors and needs.',
            'Contributed to the evolution of an internal React component library.',
            'Supported migration efforts from a legacy base toward a more modern frontend architecture.',
          ],
        },
        {
          start: '2023-06',
          end: '2024-05',
          company: 'Palestina Digital',
          role: 'Full Stack Developer',
          highlights: [
            'Contributed to an e-learning platform designed for a high-volume user base.',
            'Worked within a microservices-based architecture to improve scalability and system organization.',
            'Optimized frontend performance to reduce load times and improve the user experience.',
          ],
        },
      ],
    },
    services: {
      title: 'How I contribute to a digital product',
      description:
        'Architecture, implementation and technical judgment to turn an idea into a maintainable web experience.',
      keys: { input: 'Input', output: 'Output', deliverables: 'Deliverables' },
      items: [
        {
          endpoint: '/frontend',
          title: 'Frontend development',
          description:
            'Modern interfaces with React, TypeScript and Tailwind CSS, focused on performance, accessibility and visual clarity.',
          input: 'Designs, requirements or an existing product',
          output: 'Responsive, accessible React + TypeScript interface',
          deliverables: ['Reusable components', 'Documented code', 'Deployment'],
        },
        {
          endpoint: '/backend',
          title: 'Backend development',
          description:
            'APIs and business logic with Node.js, Python and Laravel, prioritizing scalability and maintainability.',
          input: 'Business rules and data model',
          output: 'API with clear contracts, validation and persistence',
          deliverables: ['Documented endpoints', 'Data schema', 'Docker environment'],
        },
        {
          endpoint: '/solution-design',
          title: 'Solution design',
          description:
            'I support the technical definition of the product to turn ideas into implementable and sustainable flows.',
          input: 'An idea or a business problem',
          output: 'A technical plan that can be built in phases',
          deliverables: ['Proposed architecture', 'Phased scope', 'Justified decisions'],
        },
      ],
    },
    contact: {
      titleLead: 'Ready to build your next',
      titleAccent: 'project',
      titleTail: '?',
      description:
        'I am open to collaborations, contract development and technical conversations around web products.',
      command: 'contact --email',
      copy: 'Copy',
      copied: 'copied to clipboard',
      copyFailed: 'could not copy; select the address manually',
      responseTime: 'I reply within 24–48 h',
      email: 'Write by email',
      whatsapp: 'WhatsApp',
      whatsappMessage: 'Hi Alexi, I would like to talk about a web project and learn about your availability.',
      networks: 'Social',
    },
    footer: {
      build: 'build',
      stack: 'Vite · React 19 · TypeScript · Tailwind v4 · Vercel',
      backToTop: 'Back to top',
    },
    nav: {
      home: 'Home',
      primary: 'Main navigation',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      language: 'Language',
      commandHint: 'Search…',
      dashboard: 'Dashboard',
      skip: 'Skip to content',
    },
    palette: {
      title: 'Command palette',
      placeholder: 'Type a command or a section…',
      empty: 'No results. Try “stack” or “email”.',
      groups: { navigate: 'Navigate', actions: 'Actions', links: 'Links' },
      goTo: 'Go to',
      top: 'Home',
      switchLanguage: 'Cambiar a Español',
      copyEmail: 'Copy email',
      emailCopied: 'Email copied to clipboard',
      downloadCv: 'Download CV (PDF)',
      toggleGrid: 'Show / hide 12-column grid',
      openGithub: 'Open GitHub',
      openLinkedin: 'Open LinkedIn',
      openWhatsapp: 'Open WhatsApp',
      hints: { navigate: 'navigate', run: 'run', close: 'close' },
    },
  },
} satisfies Record<Language, unknown>

export type HomeContent = (typeof homeContentByLanguage)['es']

export const getHomeContent = (language: Language): HomeContent => homeContentByLanguage[language]

export const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`

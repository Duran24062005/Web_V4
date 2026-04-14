import { Blocks, BriefcaseBusiness, LayoutTemplate, MonitorSmartphone, ServerCog } from 'lucide-react'

export const servicesPageContent = {
  heroEyebrow: 'Arquitectura y ejecución',
  heroTitle: 'Diseño y desarrollo de soluciones web con criterio de producto.',
  heroBody:
    'Trabajo desde la interfaz hasta la lógica de negocio para convertir ideas en experiencias web mantenibles, medibles y listas para evolucionar.',
  ctaTitle: 'Construyamos algo que pueda crecer sin perder claridad.',
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
}

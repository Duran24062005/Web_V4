import type { Blog } from "../../interfaces/blog.interface";

export const BlogsMockData: Blog[] = [
  {
    id: "693a0083b549aa61123d166b",
    title: "Implementando SOLID en Node.js: Guía Práctica",
    content: `Los principios SOLID son fundamentales para escribir código mantenible y escalable. En este artículo, exploramos cómo implementar cada uno de estos principios en una aplicación Node.js real. **Single Responsibility Principle (SRP)** Cada clase debe tener una única razón para cambiar. En Express, esto significa separar controllers, services y repositories. Los controllers solo manejan HTTP, los services contienen lógica de negocio, y los repositories acceden a datos. **Open/Closed Principle (OCP)** El código debe estar abierto para extensión pero cerrado para modificación. Usamos interfaces y dependencias inyectadas para lograr esto. **Liskov Substitution Principle (LSP)** Los objetos de una superclase deben poder ser reemplazados por objetos de sus subclases. Nuestros repositories pueden ser intercambiados sin afectar los services. **Interface Segregation Principle (ISP)** Es mejor tener muchas interfaces específicas que una interfaz general. Creamos servicios especializados para cada entidad. **Dependency Inversion Principle (DIP)** Dependemos de abstracciones, no de concreciones. Los controllers reciben services, no acceden directamente a la base de datos. La implementación de SOLID nos ha permitido crear un código más testeable, mantenible y escalable. El tiempo invertido en estructurar correctamente la aplicación se recupera rápidamente cuando necesitamos agregar nuevas funcionalidades o realizar cambios.`,
    excerpt:
      "Los principios SOLID son fundamentales para escribir código mantenible y escalable. En este artículo, exploramos cómo implementar cada uno...",
    author: "Alexi Durán Gómez",
    tags: ["Node.js", "SOLID", "Arquitectura", "Clean Code", "Best Practices"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    published: true,
    views: 1247,
    createdAt: "2024-10-25T00:00:00.000Z",
    updatedAt: "2024-10-25T00:00:00.000Z",
  },
  {
    id: "693a0083b549aa61123d166c",
    title: "MongoDB vs PostgreSQL: ¿Cuál elegir en 2024?",
    content:
      "La elección entre MongoDB y PostgreSQL es una de las decisiones más importantes en el desarrollo backend. Ambas son excelentes opciones, pero tienen casos de uso diferentes. **MongoDB - Base de Datos NoSQL** MongoDB brilla en aplicaciones que requieren flexibilidad de esquema y escalabilidad horizontal. Es ideal para: - Datos no estructurados o semi-estructurados - Prototipado rápido donde el esquema puede cambiar - Aplicaciones que necesitan escalar horizontalmente - Datos jerárquicos o anidados **PostgreSQL - Base de Datos SQL** PostgreSQL es la mejor opción cuando necesitas: - Transacciones ACID robustas - Relaciones complejas entre datos - Integridad referencial estricta - Consultas complejas con JOINs **Mi Recomendación** Para un portfolio o blog, MongoDB es excelente por su flexibilidad. Para e-commerce o finanzas, PostgreSQL es más adecuado por sus garantías ACID. En proyectos grandes, muchas empresas usan ambas (polyglot persistence). La tendencia actual es usar la herramienta correcta para cada problema específico, en lugar de forzar todo en una sola tecnología.",
    excerpt:
      "La elección entre MongoDB y PostgreSQL es una de las decisiones más importantes en el desarrollo backend. Comparamos ambas tecnologías...",
    author: "Alexi Durán Gómez",
    tags: ["MongoDB", "PostgreSQL", "Databases", "Backend", "Architecture"],
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    published: true,
    views: 2134,
    createdAt: "2024-10-20T00:00:00.000Z",
    updatedAt: "2024-10-20T00:00:00.000Z",
  },
  {
    id: "693a0083b549aa61123d166d",
    title: "REST API Best Practices en Express.js",
    content: `Crear una API RESTful bien diseñada es crucial para el éxito de cualquier aplicación. Aquí están las mejores prácticas que debes seguir: **1. Usa Sustantivos, No Verbos** - ✅ GET /api/users - ❌ GET /api/getUsers **2. Códigos de Estado HTTP Correctos** - 200: Success - 201: Created - 400: Bad Request - 401: Unauthorized - 404: Not Found - 500: Server Error **3. Versionado de API** Usa /api/v1/ para permitir cambios sin romper clientes existentes. **4. Filtrado, Ordenamiento y Paginación** - GET /api/users?limit=10&page=2 - GET /api/users?sort=-createdAt **5. Manejo de Errores Consistente** Retorna siempre el mismo formato: { "status": "error", "message": "Descripción del error" } **6. Validación de Datos** Valida todos los inputs del usuario antes de procesarlos. **7. Documentación** Usa Swagger/OpenAPI para documentar tu API automáticamente. Seguir estas prácticas hará que tu API sea más intuitiva, fácil de usar y mantener.`,
    excerpt: `Crear una API RESTful bien diseñada es crucial. Descubre las mejores prácticas para Express.js que todo desarrollador debe conocer...`,
    author: "Alexi Durán Gómez",
    tags: ["REST API", "Express.js", "Best Practices", "Node.js", "Backend"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    published: true,
    views: 3421,
    createdAt: "2024-10-15T00:00:00.000Z",
    updatedAt: "2024-10-15T00:00:00.000Z",
  },
  {
    id: "693a0083b549aa61123d166e",
    title: "Autenticación JWT: Guía Completa 2024",
    content:
      "JSON Web Tokens (JWT) es el estándar de facto para autenticación en APIs modernas. En este tutorial completo aprenderás a implementarlo correctamente. **¿Qué es JWT?** JWT es un estándar abierto (RFC 7519) que define una forma compacta y autocontenida de transmitir información de forma segura entre partes como un objeto JSON. **Estructura de un JWT** Un JWT consta de tres partes separadas por puntos: 1. Header: Tipo de token y algoritmo 2. Payload: Claims (datos del usuario) 3. Signature: Firma para verificar integridad **Implementación en Node.js** Usa la librería jsonwebtoken: - Genera tokens al login - Valida tokens en middleware - Refresca tokens cuando expiran - Maneja logout invalidando tokens **Seguridad** - Usa HTTPS siempre - Tokens de corta duración (15 min) - Refresh tokens de larga duración - Almacena en httpOnly cookies - Nunca guardes información sensible en el payload **Mejores Prácticas** - Implementa refresh token rotation - Lista negra para tokens revocados - Rate limiting en endpoints de auth - 2FA para usuarios sensibles JWT es potente pero debe implementarse correctamente para ser seguro. Sigue estas guías y tendrás un sistema de autenticación robusto.",
    excerpt:
      "JSON Web Tokens (JWT) es el estándar para autenticación en APIs modernas. Aprende a implementarlo correctamente con seguridad...",
    author: "Alexi Durán Gómez",
    tags: ["JWT", "Authentication", "Security", "Node.js", "Express.js"],
    imageUrl:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
    published: true,
    views: 4567,
    createdAt: "2024-10-10T00:00:00.000Z",
    updatedAt: "2024-10-10T00:00:00.000Z",
  },
  {
    id: "693a0083b549aa61123d166f",
    title: "Microservicios con Node.js: Arquitectura Escalable",
    content:
      "La arquitectura de microservicios ha revolucionado cómo construimos aplicaciones escalables. Exploremos cómo implementarla con Node.js. **¿Por Qué Microservicios?** - Escalabilidad independiente de cada servicio - Despliegues independientes - Tecnologías específicas por servicio - Tolerancia a fallos mejorada - Equipos autónomos **Componentes Clave** 1. API Gateway (Kong, Express Gateway) 2. Service Discovery (Consul, Eureka) 3. Message Broker (RabbitMQ, Kafka) 4. Containerización (Docker) 5. Orquestación (Kubernetes) **Patrones de Comunicación** - Síncrona: REST, gRPC - Asíncrona: Message Queues, Event Bus **Desafíos** - Complejidad operacional - Debugging distribuido - Consistencia de datos - Network latency **Cuándo Usar Microservicios** No para todo proyecto. Evalúa: - ¿Tu equipo es grande? - ¿Necesitas escalar partes específicas? - ¿Tienes experiencia en DevOps? Para proyectos pequeños, un monolito bien estructurado es mejor. Microservicios son poderosos pero complejos.",
    excerpt:
      "La arquitectura de microservicios ha revolucionado cómo construimos aplicaciones. Descubre cómo implementarla con Node.js...",
    author: "Alexi Durán Gómez",
    tags: ["Microservices", "Node.js", "Architecture", "Scalability", "DevOps"],
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    published: true,
    views: 2891,
    createdAt: "2024-10-05T00:00:00.000Z",
    updatedAt: "2024-10-05T00:00:00.000Z",
  },
  {
    id: "693a0083b549aa61123d1670",
    title: "Testing en Node.js: Jest y Supertest",
    content:
      "El testing es fundamental para código confiable. Aprende a testear tu API de Node.js con Jest y Supertest. **Tipos de Tests** 1. **Unit Tests**: Funciones individuales 2. **Integration Tests**: Múltiples componentes 3. **E2E Tests**: Flujos completos de usuario **Configuración de Jest** Jest es un framework de testing completo con todo incluido: test runner, assertions, mocking y coverage. **Testing con Supertest** Supertest permite hacer requests HTTP a tu API en tests: - Simula peticiones reales - Valida responses y status codes - Test endpoints sin levantar servidor **Estructura de Tests** - Arrange: Preparar datos - Act: Ejecutar función - Assert: Verificar resultado **Mocking** Mock servicios externos, bases de datos y APIs para tests aislados y rápidos. **Coverage** Objetivo: 80%+ de cobertura - Statements - Branches - Functions - Lines **CI/CD** Integra tests en tu pipeline: - Tests en cada commit - Bloquea merges si fallan tests - Reports automáticos Tests bien escritos son documentación viva de tu código. Invierte tiempo en testing y ahorrarás horas debuggeando.",
    excerpt:
      "El testing es fundamental para código confiable. Guía completa de testing en Node.js con Jest y Supertest...",
    author: "Alexi Durán Gómez",
    tags: ["Testing", "Jest", "Node.js", "TDD", "Quality Assurance"],
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    published: true,
    views: 1876,
    createdAt: "2024-09-28T00:00:00.000Z",
    updatedAt: "2024-09-28T00:00:00.000Z",
  },
  {
    id: "693a0083b549aa61123d1671",
    title: "Docker para Desarrolladores: De Cero a Deploy",
    content: `Docker ha cambiado cómo desplegamos aplicaciones. Aprende los fundamentos y lleva tu app de desarrollo a producción. **¿Qué es Docker?** Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores. Un contenedor incluye tu app y todas sus dependencias. **Conceptos Clave** - **Imagen**: Template para contenedores - **Contenedor**: Instancia de una imagen - **Dockerfile**: Instrucciones para crear imagen - **Docker Compose**: Orquestar múltiples contenedores **Dockerfile Básico** FROM node:18-alpine WORKDIR /app COPY package*.json ./ RUN npm install COPY . . EXPOSE 3000 CMD ["npm", "start"] **Docker Compose** Perfecto para desarrollo local con múltiples servicios (app, DB, Redis, etc.) **Best Practices** - Usa imágenes Alpine (más ligeras) - Multi-stage builds para producción - .dockerignore para excluir archivos - No corras como root - Health checks - Volumes para datos persistentes **Deploy** - Docker Hub para imágenes - AWS ECS, Google Cloud Run, Azure Container Instances - Kubernetes para orquestación avanzada Docker simplifica desarrollo y deployment. Una vez que lo adoptas, no vuelves atrás.`,
    excerpt:
      "Docker ha cambiado cómo desplegamos aplicaciones. Guía completa desde fundamentos hasta producción...",
    author: "Alexi Durán Gómez",
    tags: ["Docker", "DevOps", "Containers", "Deployment", "Cloud"],
    imageUrl:
      "https://images.unsplash.com/photo-1605745341075-681a7b0f8081?w=800",
    published: false,
    views: 0,
    createdAt: "2024-11-01T00:00:00.000Z",
    updatedAt: "2024-11-01T00:00:00.000Z",
  },
];

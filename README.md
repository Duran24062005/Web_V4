<div align="center">
  <h1>Alexi Dg</h1>
  <p>Mi Portafolios Web</p>
  <img src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/Alexi_foto_perfil.jpeg](https://scontent.fbga1-3.fna.fbcdn.net/v/t39.30808-6/481244298_122106189866772943_9067979887008012429_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=egmFJZ_V7swQ7kNvwEOsCvw&_nc_oc=Adl0dZ_IJSyHApoP2Q9Rj_D1rujNSNo4vS2U4ppoOQTFdnTCIRqBs8Vk6Z1dA_irTP8&_nc_zt=23&_nc_ht=scontent.fbga1-3.fna&_nc_gid=KJmqT19_yrhfpDs5E-svBQ&oh=00_AfoG7P3P-CJxq3IlQnYseR5pKFpwVrKdOv9uzBu3eA3l0A&oe=6970AD63" alt="">
</div>

# Web V4 Frontend - Documentación Técnica

Portafolio profesional interactivo desarrollado con React.js, TypeScript y Tailwind CSS.

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Componentes Principales](#componentes-principales)
6. [Rutas y Navegación](#rutas-y-navegación)
7. [Gestión de Estado](#gestión-de-estado)
8. [Integración con API](#integración-con-api)
9. [Estilos y Diseño](#estilos-y-diseño)
10. [Instalación y Configuración](#instalación-y-configuración)
11. [Build y Despliegue](#build-y-despliegue)
12. [Optimización y Performance](#optimización-y-performance)
13. [Mantenimiento y Contribución](#mantenimiento-y-contribución)

---

## Descripción General

Web V4 es un portafolio profesional moderno y dinámico que muestra proyectos, artículos de blog, habilidades y experiencia profesional. El frontend consume una API RESTful para obtener y mostrar contenido de forma dinámica.

### Características Principales

- Interfaz de usuario moderna y responsive
- Navegación fluida con React Router
- Animaciones y efectos visuales con Anime.js
- Partículas interactivas en el hero section
- Sistema de blog con Markdown
- Formulario de contacto integrado con WhatsApp
- Búsqueda y filtrado de proyectos y blogs
- Modo oscuro optimizado
- Skeleton loaders para mejor UX
- SEO optimizado

---

## Arquitectura del Sistema

### Patrón de Arquitectura

El proyecto sigue una arquitectura basada en componentes con separación clara de responsabilidades:

```
Presentación (Components)
        ↓
Lógica de Negocio (Custom Hooks)
        ↓
Servicios (Actions/API)
        ↓
Backend API
```

### Flujo de Datos

```
Usuario → Componente → Hook → Action → API → Backend
                ↓
            State Update
                ↓
            Re-render
```

---

## Stack Tecnológico

### Core

- **React** v19.2.0 - Librería de UI
- **TypeScript** v5.9.3 - Superset tipado de JavaScript
- **Vite** v7.2.4 - Build tool y dev server
- **React Router DOM** v7.10.1 - Enrutamiento

### UI y Estilos

- **Tailwind CSS** v4.1.18 - Framework de utilidades CSS
- **Lucide React** v0.561.0 - Iconos
- **Anime.js** v4.2.2 - Animaciones
- **React Loading Skeleton** v3.5.0 - Skeleton screens

### Efectos y Visualización

- **tsParticles** v3.9.1 - Sistema de partículas
- **React Markdown** v10.1.0 - Renderizado de Markdown

### HTTP Client

- **Axios** v1.13.2 - Cliente HTTP

### Herramientas de Desarrollo

- **ESLint** v9.39.1 - Linting
- **@vitejs/plugin-react-swc** - Compilación rápida con SWC

---

## Estructura del Proyecto

```
frontend/
│
├── public/
│   └── image/
│       ├── Alexi_foto_perfil.jpeg
│       └── Alexi_Logo.png
│
├── src/
│   ├── actions/
│   │   ├── get.projects.actions.ts     # Obtener proyectos de la API
│   │   └── getblogs.action.ts          # Obtener blogs de la API
│   │
│   ├── api/
│   │   └── base.api.ts                 # Configuración de Axios
│   │
│   ├── assets/
│   │   └── fonts/
│   │       └── Japanese_Brush/         # Fuente personalizada
│   │
│   ├── blog/
│   │   ├── Blogs.tsx                   # Página principal de blogs
│   │   └── components/
│   │       ├── BlogDetail.tsx          # Vista detallada de blog
│   │       ├── BlogsList.tsx           # Lista de blogs
│   │       ├── PreSearch.tsx           # Búsquedas predefinidas
│   │       └── SearchBar.tsx           # Barra de búsqueda
│   │
│   ├── contact/
│   │   ├── Contact.tsx                 # Página de contacto
│   │   ├── components/
│   │   │   └── ContactComponent.tsx    # Formulario de contacto
│   │   └── hook/
│   │       └── useWhats.tsx            # Hook de WhatsApp
│   │
│   ├── dashboard/
│   │   ├── Index.tsx                   # Dashboard (en desarrollo)
│   │   └── components/
│   │       └── SideBar.tsx
│   │
│   ├── home/
│   │   ├── Home.tsx                    # Página principal
│   │   └── components/
│   │       ├── AboutMe.tsx             # Sección sobre mí
│   │       ├── AnimatedBackground.tsx  # Fondo con partículas
│   │       ├── Header.tsx              # Hero section
│   │       ├── MySkills.tsx            # Sección de habilidades
│   │       ├── MySperience.tsx         # Experiencia laboral
│   │       └── TopProjects.tsx         # Proyectos destacados
│   │
│   ├── projects/
│   │   ├── Projects.tsx                # Página de proyectos
│   │   └── components/
│   │       ├── FilterProjects.tsx      # Filtros por tecnología
│   │       └── ProjectLists.tsx        # Lista de proyectos
│   │
│   ├── services/
│   │   ├── Services.tsx                # Página de servicios
│   │   └── components/
│   │       └── ServiceComponent.tsx    # Tarjetas de servicios
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Footer.tsx              # Pie de página
│   │   │   └── NavBar.tsx              # Barra de navegación
│   │   ├── hooks/
│   │   │   ├── useAnimation.tsx        # Hook de animaciones
│   │   │   └── useProjects.tsx         # Hook de proyectos
│   │   └── skeletons/
│   │       └── ProjectsSkeleton.tsx    # Skeletons de carga
│   │
│   ├── interfaces/
│   │   ├── Project.interfaces.ts       # Tipos de proyectos
│   │   ├── blog.interface.ts           # Tipos de blogs
│   │   ├── blog.response.ts            # Respuesta API blogs
│   │   └── project.response.ts         # Respuesta API proyectos
│   │
│   ├── mock/
│   │   └── data/
│   │       ├── navBarItems.ts          # Items del menú
│   │       ├── tech.data.ts            # Lista de tecnologías
│   │       ├── blog.mock.data.ts       # Datos mock de blogs
│   │       └── project.mock.data.ts    # Datos mock de proyectos
│   │
│   ├── App.tsx                         # Componente raíz
│   ├── main.tsx                        # Punto de entrada
│   └── index.css                       # Estilos globales
│
├── .env.example                        # Ejemplo de variables de entorno
├── .gitignore
├── index.html                          # HTML base
├── package.json
├── tsconfig.json                       # Configuración TypeScript
├── vite.config.ts                      # Configuración Vite
├── vercel.json                         # Configuración de despliegue
└── README.md
```

---

## Componentes Principales

### Home (Página Principal)

**Ubicación**: `src/home/Home.tsx`

Página principal que integra todas las secciones del portafolio:

- Header/Hero con animación de partículas
- Sección "Sobre mí"
- Habilidades técnicas
- Experiencia laboral
- Servicios ofrecidos
- Proyectos destacados
- Formulario de contacto

### NavBar (Barra de Navegación)

**Ubicación**: `src/shared/components/NavBar.tsx`

Navegación responsive con:

- Menú desktop y mobile
- Indicador de ruta activa
- Animaciones de scroll suave
- Logo personalizado

**Características:**

- Sticky header con efecto glassmorphism
- Detección automática de ruta activa
- Menú hamburguesa en mobile
- Transiciones suaves

### Header (Hero Section)

**Ubicación**: `src/home/components/Header.tsx`

Sección principal con:

- Fondo animado con partículas (tsParticles)
- Imagen de perfil con efectos hover
- Texto animado con Anime.js
- CTAs (Call to Action)
- Indicador de disponibilidad

### BlogDetail

**Ubicación**: `src/blog/components/BlogDetail.tsx`

Vista detallada de artículos con:

- Renderizado de Markdown
- Sintaxis highlighting para código
- Metadata (autor, fecha, vistas, tags)
- Botones de compartir en redes sociales
- Navegación entre artículos

**Componentes Markdown personalizados:**

```typescript
const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-bold...">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold...">{children}</h2>,
  code: ({ children }) => <code className="bg-gray-800...">{children}</code>,
  // ... más componentes
}
```

### SearchBar

**Ubicación**: `src/blog/components/SearchBar.tsx`

Componente de búsqueda con:

- Input controlado
- Búsqueda en tiempo real
- Soporte para Enter key
- Reset de búsqueda

### ProjectLists

**Ubicación**: `src/projects/components/ProjectLists.tsx`

Grid de proyectos con:

- Layout responsive (1/2/3 columnas)
- Tarjetas con hover effects
- Badges de tecnologías
- Links a demo y repositorio
- Skeleton loading

---

## Rutas y Navegación

### Configuración de Rutas

**Archivo**: `src/App.tsx`

```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<Services />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/blog" element={<Blogs />} />
  <Route path="/blog/:id" element={<BlogDetail />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/dashboard" element={<Index />} />
</Routes>
```

### Navegación del Sitio

| Ruta         | Componente | Descripción                              |
| ------------ | ---------- | ---------------------------------------- |
| `/`          | Home       | Página principal con todas las secciones |
| `/services`  | Services   | Servicios ofrecidos                      |
| `/projects`  | Projects   | Todos los proyectos con filtros          |
| `/blog`      | Blogs      | Lista de artículos del blog              |
| `/blog/:id`  | BlogDetail | Vista detallada de un artículo           |
| `/contact`   | Contact    | Formulario de contacto                   |
| `/dashboard` | Index      | Panel de administración (en desarrollo)  |

### Navegación Interna (Anchors)

Además de las rutas, existen enlaces internos en la página principal:

- `#about-me` - Sección sobre mí
- `#skills` - Habilidades
- `#experiencia` - Experiencia laboral
- `#projects` - Proyectos destacados

---

## Gestión de Estado

### Custom Hooks

#### useProjects

**Ubicación**: `src/shared/hooks/useProjects.tsx`

Hook personalizado para gestión de proyectos:

```typescript
const { projectsList, hanlderSerach, loading } = useProjects();
```

**Funcionalidades:**

- Carga inicial de proyectos desde API
- Filtrado por tecnologías
- Estado de carga (loading)
- Búsqueda con query "all" para resetear filtros

**Implementación:**

```typescript
const hanlderSerach = (query: string) => {
  if (query === "all") {
    setProjects(allProjects);
    return;
  }

  const search = allProjects.filter((project) =>
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(query.toLowerCase()),
    ),
  );
  setProjects(search);
};
```

#### useAnimationUpDown

**Ubicación**: `src/shared/hooks/useAnimation.tsx`

Hook para animaciones de texto con Anime.js:

```typescript
useAnimationUpDown("#title");
```

Crea efecto de texto animado con movimiento vertical.

---

## Integración con API

### Configuración de Axios

**Archivo**: `src/api/base.api.ts`

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE_API || "http://localhost:4000",
});
```

### Actions (Servicios de API)

#### getProjects

**Ubicación**: `src/actions/get.projects.actions.ts`

```typescript
export default async function getProjects(path: string): Promise<Project[]> {
  try {
    const response = await api.get<ProjectResponse>(`api/projects/${path}`);

    return response.data.data.map((datum) => ({
      id: datum.id,
      title: datum.title,
      description: datum.description,
      technologies: datum.technologies,
      imageUrl: datum.imageUrl,
      demoUrl: datum.demoUrl,
      repoUrl: datum.repoUrl,
      featured: datum.featured,
      createdAt: datum.createdAt,
      updatedAt: datum.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
```

**Uso:**

```typescript
const projects = await getProjects("all"); // Todos
const featured = await getProjects("featured"); // Destacados
```

#### getBlogs

**Ubicación**: `src/actions/getblogs.action.ts`

Similar a getProjects, pero para artículos del blog:

```typescript
export default async function getBlogs(path: string): Promise<Blog[]>;
```

**Rutas disponibles:**

- `'all'` - Todos los blogs
- `'published'` - Solo publicados

---

## Estilos y Diseño

### Tailwind CSS

El proyecto utiliza Tailwind CSS v4 con configuración personalizada.

**Archivo de configuración**: `vite.config.ts`

```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Estilos Globales

**Archivo**: `src/index.css`

#### Fuente Personalizada

```css
@font-face {
  font-family: "japonesa";
  src: url("/src/assets/fonts/Japanese_Brush/JAPAB___.TTF") format("truetype");
}
```

#### Clases Personalizadas

**Gradiente de Texto:**

```css
.gradient-text {
  color: white;
}
```

**Links de Navegación:**

```css
.nav-link {
  position: relative;
  color: white;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: red;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.nav-link:hover::after {
  transform: scaleX(1);
}
```

**Fuente Japonesa:**

```css
.Alexi {
  color: red;
  font-family: "japonesa";
}

.japonesa {
  font-family: "japonesa";
}
```

### Sistema de Colores

El diseño usa principalmente:

- **Negro** (#000000) - Fondo principal
- **Blanco** (#FFFFFF) - Textos principales
- **Púrpura** (#A855F7, #8B5CF6) - Acentos y botones
- **Rojo** (#DC2626, #EF4444) - CTAs y elementos destacados
- **Grises** (escala) - Bordes y fondos secundarios

### Responsive Design

**Breakpoints de Tailwind:**

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Ejemplo de uso:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

---

## Instalación y Configuración

### Requisitos Previos

- Node.js v18 o superior
- npm o yarn
- Git

### Pasos de Instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/Duran24062005/Web_V4.git
cd Web_V4
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar variables de entorno**

Crear archivo `.env` en la raíz:

```env
VITE_URL_BASE_API=https://web-v4-backend.vercel.app
```

Para desarrollo local con backend local:

```env
VITE_URL_BASE_API=http://localhost:5000
```

**4. Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## Build y Despliegue

### Build de Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados para producción.

### Preview de Build

```bash
npm run preview
```

Previsualiza el build de producción localmente.

### Despliegue en Vercel

**Configuración**: `vercel.json`

```json
{
  "buildCommand": "yarn build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

**Pasos de despliegue:**

1. Instalar Vercel CLI:

```bash
npm install -g vercel
```

2. Autenticarse:

```bash
vercel login
```

3. Desplegar:

```bash
vercel --prod
```

**Variables de entorno en Vercel:**

En el dashboard de Vercel:

1. Settings → Environment Variables
2. Agregar: `VITE_URL_BASE_API=https://web-v4-backend.vercel.app`

---

## Optimización y Performance

### Estrategias Implementadas

#### 1. Code Splitting

React Router realiza code splitting automático por ruta.

#### 2. Lazy Loading de Imágenes

Todas las imágenes usan carga diferida nativa:

```tsx
<img loading="lazy" src={imageUrl} alt={title} />
```

#### 3. Skeleton Screens

Mejora la percepción de velocidad con skeletons durante la carga:

```tsx
{
  loading ? (
    <ProjectCardSkeletonGrid quantity={6} />
  ) : (
    <ProjectLists projects={projectsList} />
  );
}
```

#### 4. Memoization

Uso de `useMemo` y `useEffect` con dependencias optimizadas:

```typescript
useEffect(() => {
  const setProjectsList = async () => {
    const dat = await getProjects("all");
    setProjects(dat);
    setAllProjects(dat);
    setLoading(false);
  };
  setProjectsList();
}, []);
```

#### 5. Vite + SWC

Build ultra rápido con Vite y compilación con SWC (Speedy Web Compiler).

### Métricas de Performance

**Lighthouse Score (target):**

- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### Mejoras Futuras

**Performance:**

- Implementar PWA (Progressive Web App)
- Service Workers para cache
- Image optimization con next-gen formats (WebP, AVIF)
- Prefetching de rutas críticas
- Virtual scrolling para listas largas

**SEO:**

- Meta tags dinámicos por ruta
- Open Graph tags
- Sitemap.xml
- Structured data (JSON-LD)

---

## Mantenimiento y Contribución

### Scripts Disponibles

```json
{
  "dev": "vite", // Servidor de desarrollo
  "build": "tsc -b && vite build", // Build de producción
  "lint": "eslint .", // Linting de código
  "preview": "vite preview" // Preview del build
}
```

### Convenciones de Código

#### Nomenclatura

**Componentes**: PascalCase

```typescript
export const NavBar = () => { ... }
```

**Archivos de componentes**: PascalCase

```
NavBar.tsx
BlogDetail.tsx
```

**Hooks**: camelCase con prefijo "use"

```typescript
export const useProjects = () => { ... }
```

**Interfaces**: PascalCase

```typescript
interface BlogListProps { ... }
```

**Constantes**: UPPER_SNAKE_CASE

```typescript
const TOP_PROJECT_TITLES = [...]
```

#### Organización de Imports

```typescript
// 1. Librerías externas
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// 2. Componentes
import { NavBar } from "../shared/components/NavBar";

// 3. Hooks
import { useProjects } from "../shared/hooks/useProjects";

// 4. Tipos
import type { Project } from "../interfaces/Project.interfaces";

// 5. Assets y estilos
import "../styles/custom.css";
```

### Testing (Recomendado)

Aunque no hay tests implementados actualmente, se recomienda:

**Instalar dependencias:**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Estructura de tests:**

```
src/
├── __tests__/
│   ├── components/
│   │   ├── NavBar.test.tsx
│   │   └── SearchBar.test.tsx
│   ├── hooks/
│   │   └── useProjects.test.tsx
│   └── utils/
```

### Guía de Contribución

**1. Fork y clone**

**2. Crear rama**

```bash
git checkout -b feature/nueva-funcionalidad
```

**3. Desarrollo**

- Seguir convenciones de código
- Mantener componentes pequeños y reutilizables
- Agregar TypeScript types para todo
- Documentar props complejas

**4. Commit**

```bash
git commit -m "feat: agregar componente de filtro avanzado"
```

**Tipos de commit:**

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Documentación
- `style:` - Formato de código
- `refactor:` - Refactorización
- `test:` - Tests
- `chore:` - Mantenimiento

**5. Push y Pull Request**

---

## Arquitectura de Datos

### Flujo de Datos en Proyectos

```
API (/api/projects/all)
        ↓
getProjects() action
        ↓
useProjects() hook
        ↓
Projects.tsx component
        ↓
ProjectLists.tsx
        ↓
Project cards (render)
```

### Transformación de Datos

**API Response:**

```typescript
{
  status: "success",
  results: 10,
  data: [{ _id, title, description, ... }]
}
```

**Transformado a:**

```typescript
Project[] = [{
  id: string,
  title: string,
  description: string,
  technologies: string[],
  imageUrl: string,
  ...
}]
```

---

## Solución de Problemas Comunes

### Build Errors

**Error: Cannot find module**

```bash
npm install
rm -rf node_modules package-lock.json
npm install
```

**Error: TypeScript types**

```bash
npm install --save-dev @types/node
```

### Development Issues

**Puerto 5173 en uso**

```bash
# Cambiar puerto en vite.config.ts
export default defineConfig({
  server: { port: 3000 }
});
```

**CORS errors**

Verificar que la URL de la API en `.env` sea correcta:

```env
VITE_URL_BASE_API=https://web-v4-backend.vercel.app
```

---

## Recursos Adicionales

### Documentación de Librerías

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/en/main)

### Assets y Recursos

- **Fuente**: Japanese Brush (incluida en `/src/assets/fonts/`)
- **Iconos**: Lucide React
- **Imágenes**: Unsplash, assets propios en `/public/image/`

---

## Licencia

Este proyecto es de uso educativo y personal.

---

## Contacto y Links

**Desarrollador**: Alexi Durán Gómez  
**Email**: alexisdurangomez588@gmail.com  
**GitHub**: [Duran24062005](https://github.com/Duran24062005)

**Links del Proyecto:**

- **Frontend**: [https://my-web-production-xi.vercel.app](https://my-web-production-xi.vercel.app)
- **Backend**: [https://web-v4-backend.vercel.app](https://web-v4-backend.vercel.app)
- **Repositorio Frontend**: [Web_V4](https://github.com/Duran24062005/Web_V4)
- **Repositorio Backend**: [web_v4_backend](https://github.com/Duran24062005/web_v4_backend)

---

## Changelog

### Versión 1.0.0

**Características Implementadas:**

- Diseño responsive completo
- Sistema de navegación con React Router
- Integración con API backend
- Sistema de blog con Markdown
- Filtrado de proyectos por tecnología
- Búsqueda de blogs
- Animaciones con Anime.js y tsParticles
- Formulario de contacto con WhatsApp
- Skeleton loaders
- SEO básico

**Mejoras Técnicas:**

- TypeScript en todo el proyecto
- Custom hooks para lógica reutilizable
- Separación de componentes
- API client centralizado
- Manejo de errores

---

**Última actualización**: Enero 2025

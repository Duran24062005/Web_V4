# Web_V4 Frontend

Frontend del portafolio personal construido con Vite, React 19, TypeScript y Tailwind CSS.

## Objetivo

Esta aplicación consume la API de `web_v4_backend` y expone las pantallas públicas del portafolio, además de las vistas de autenticación y la zona privada básica.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Axios
- Lucide React
- Sonner

## Estructura real

```text
src/
├── actions/                # Wrappers legacy delegando a la capa de servicios
├── api/                    # Re-export de cliente HTTP compartido
├── auth/                   # Páginas y layout de autenticación
├── blog/                   # Pantallas y componentes del blog
├── contact/                # Pantalla y componentes de contacto
├── home/                   # Landing principal
├── interfaces/             # Tipos de dominio y contratos HTTP
├── lib/                    # Cliente HTTP, manejo de errores y sesión
├── projects/               # Pantallas de proyectos
├── recruiter/              # Variantes para reclutadores y zona privada
├── services/               # Acceso a API por dominio
└── shared/                 # Hooks y componentes reutilizables
```

## Convenciones

- Los componentes no deben leer ni escribir `localStorage` directamente; eso vive en `src/lib/session.ts`.
- Las requests HTTP se concentran en `src/services/*` usando `src/lib/http.ts`.
- Las páginas usan hooks de datos o servicios; no deberían contener lógica de fetch extensa.
- Las respuestas del backend se consumen como envelopes `status/message/data/meta`.

## Variables de entorno

Crear un archivo `.env` local:

```env
VITE_URL_BASE_API=http://localhost:8000
```

## Scripts

```bash
yarn dev
yarn build
yarn lint
yarn preview
```

## Flujo principal

- `Home`, `Projects`, `Blogs` y `BlogDetail` consumen datos desde la API.
- `Login` y `Register` persisten sesión mediante helpers compartidos.
- `NavBar` consume la sesión de forma centralizada y ejecuta logout contra la API.

## Deuda conocida

- El dashboard y la zona recruiter siguen siendo básicos y no representan un módulo completo de producto.
- Hay componentes heredados con naming inconsistente que conviene seguir normalizando en iteraciones posteriores.

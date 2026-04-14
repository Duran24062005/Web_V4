# Refactor Notes

## Scope

Este repo fue normalizado para mejorar mantenibilidad sin reescribir el producto. Se preserva el diseño y flujo actual, pero se movió la lógica técnica a capas más claras.

## Cambios clave

- Se centralizó el acceso HTTP en `src/lib/http.ts`.
- Se centralizó la sesión en `src/lib/session.ts`.
- Se añadieron servicios por dominio en `src/services/*`.
- Los hooks de datos ahora gestionan `loading` y `error` (`src/shared/hooks/useProjects.tsx`, `src/shared/hooks/useBlogs.ts`).
- `Login` y `Register` usan servicios y helpers compartidos, evitando `localStorage` directo.
- `NavBar` consume sesión centralizada y ejecuta logout contra la API.
- Se agregó `AuthLayout` para agrupar rutas de autenticación.
- Se añadió `Toaster` global para feedback unificado.

## Contrato esperado desde la API

La app consume envelopes:

```json
{
  "status": "success",
  "message": "optional",
  "data": {},
  "meta": {
    "total": 0
  }
}
```

## Archivos relevantes

- `src/lib/http.ts`
- `src/lib/session.ts`
- `src/services/auth/auth.service.ts`
- `src/services/projects/projects.service.ts`
- `src/services/blogs/blogs.service.ts`
- `src/shared/hooks/useBlogs.ts`
- `src/shared/hooks/useProjects.tsx`
- `src/shared/components/NavBar.tsx`
- `src/auth/pages/login/Login.tsx`
- `src/auth/pages/register/Register.tsx`

## Notas

- Se mantiene compatibilidad con la estructura actual de rutas.
- Los componentes evitan `console.log` y side effects imperativos.

# Frontend Language Routing PRD

## Problema y objetivo
- El frontend `Web_V4` tenía texto hardcodeado en español e inglés sin una estrategia única de i18n.
- La navegación no soportaba URLs compartibles por idioma ni una forma consistente de mantener el locale activo.
- El objetivo es dejar el portfolio completo bilingüe en español e inglés, con selector visible y rutas localizadas mediante prefijos `/es` y `/en`.

## Alcance
- Incluye home, services, projects, blog, blog detail, contact, login, register, recruiter, private zone, dashboard, `CuratedPageShell`, `NavBar`, `Footer` y `CustomLogo`.
- Incluye persistencia del idioma en navegador y sincronización con la URL.
- Incluye documentación del patrón para futuras pantallas.
- No incluye traducción de contenido dinámico que llegue desde API; en esta fase solo se localiza la UI y el contenido controlado en frontend.

## Implementación
- Crear infraestructura propia de i18n con:
  - `LanguageProvider`
  - `useLanguage`
  - utilidades para locale, persistencia y construcción de rutas localizadas
- Reestructurar el router a `/:lang/...`.
- Redirigir rutas sin prefijo al idioma preferido.
- Centralizar textos por dominio en archivos de contenido tipados.
- Reemplazar links y `navigate()` absolutos por construcción de rutas localizada.
- Aplicar selector de idioma reutilizable en navegación pública curada y navegación legacy.

## Contratos e impacto
- Nuevo contrato de rutas: `/:lang`, `/:lang/services`, `/:lang/projects`, `/:lang/blog/:id`, `/:lang/login`, etc.
- `localStorage` conserva la preferencia con fallback a `es`.
- Los componentes que construyen navegación deben pasar por helpers localizados.
- Las fechas y labels de lectura deben usar locale derivado del idioma activo.

## Riesgos y validaciones
- Riesgo de dejar rutas absolutas sin prefijo en componentes legacy.
- Riesgo de inconsistencia entre navegación curada y legacy si no comparten helpers.
- Riesgo de romper navegación directa a rutas antiguas sin prefijo.
- Validar build, navegación completa en ambos idiomas, persistencia tras recarga y consistencia del selector en desktop/mobile.

# PRD: Rediseño Home desde Stitch

## Problema y objetivo

La pantalla `Home` actual del frontend no refleja el lenguaje visual definido en Stitch para el proyecto `Portafolio Personal Refinado`. Además, la composición vigente depende de varios componentes heredados con estilos inconsistentes entre sí.

El objetivo es implementar la nueva dirección visual del home en `Web_V4`, manteniendo el contenido real del sistema actual y sin introducir datos ficticios provenientes de la maqueta.

## Alcance

- Rediseñar únicamente la pantalla `Home`.
- Mantener navegación real, enlaces existentes, proyectos reales y datos de contacto actuales.
- Reutilizar los datos funcionales ya presentes en el sistema para experiencia, servicios, stack y contacto.
- No modificar contratos con backend ni la carga actual de proyectos.

## Enfoque de implementación

- Reemplazar la composición actual del home por una estructura editorial inspirada en Stitch:
  - hero asimétrico
  - bloque de presentación
  - stack técnico
  - proyectos destacados
  - experiencia profesional
  - servicios clave
  - CTA final
- Extraer el contenido textual del home a un archivo propio para mejorar trazabilidad y mantenimiento.
- Mantener la carga de proyectos desde `useProjects`, usando el estado real del frontend.
- Limitar los cambios globales a tipografía, variables base y utilidades necesarias para soportar el nuevo lenguaje visual.

## Resultado implementado

- La navegación superior se ajusta al patrón del screen de Stitch, priorizando `Servicios`, `Proyectos`, `Blog`, `Experiencia` y `Contacto`.
- El hero adopta una jerarquía editorial más cercana al diseño fuente:
  - titular dominante
  - retrato lateral
  - CTA principal y secundario
  - métrica superpuesta
- La página conserva el contenido real del portafolio actual:
  - proyectos cargados desde `useProjects`
  - datos de contacto reales
  - experiencia y servicios definidos en `home.content.ts`
- El bloque de proyectos usa una grilla tipo bento para reinterpretar la composición de Stitch sin introducir contenido ficticio.

## Actores impactados

- Visitantes del portafolio público.
- Reclutadores o clientes que usan la landing como entrada principal.
- Mantenedores del frontend, al centralizar contenido que antes estaba repartido en componentes heredados.

## Impacto en datos, contratos e integraciones

- Sin cambios en API ni en contratos frontend-backend.
- Se conserva `useProjects` como fuente de proyectos destacados.
- Se conservan email, WhatsApp, enlaces sociales y navegación ya existentes.

## Validaciones y reglas

- El rediseño debe usar contenido real del sistema actual.
- La página debe seguir funcionando sin autenticación.
- Si no existen proyectos destacados, el home debe degradar con una selección de proyectos disponibles.
- La navegación del home debe seguir ofreciendo acceso a rutas públicas y anchors relevantes.

## Riesgos y edge cases

- El diseño de Stitch usa contenido de ejemplo; por eso el contenido final debe reinterpretarse con datos reales del portafolio.
- El cambio convive con componentes heredados aún presentes en otras pantallas; por eso el rediseño se aísla en `Home`.
- La disponibilidad de proyectos depende de la API; se requiere fallback visual durante carga.

# PRD: Rediseño Home desde Stitch

## Auditoría de diseño premium - 2026-08-29

**Design Read:** portafolio de desarrollador full stack para reclutadores y clientes, con lenguaje editorial oscuro y premium, apoyado en una composición asimétrica de alto contraste.

**Modo:** redesign-preserve. Se conserva la arquitectura de rutas, el contenido bilingüe, la fuente real de proyectos, los enlaces de contacto y los anchors existentes. El cambio se concentra en la expresión visual del home.

**Diales:** `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, `VISUAL_DENSITY 4`. La variación permite un hero asimétrico y una grilla de proyectos con ritmo; el movimiento se limita a entradas, hover y feedback; la densidad deja espacio para que el trabajo sea lo primero.

### Hallazgos

- El home actual ya tiene una base oscura y dorada, pero mezcla patrones de la maqueta anterior con reglas heredadas del sitio original.
- El hero ocupa más altura de la necesaria, repite etiquetas de estado y usa una composición centrada en el contenido en vez de una jerarquía clara entre mensaje, retrato y prueba de trabajo.
- La navegación y las secciones repiten demasiadas etiquetas en mayúsculas y tarjetas con el mismo peso visual.
- `index.css` carga tipografías externas y conserva utilidades rojas/violetas que ya no representan el sistema visual actual.
- El componente `NavBar` global usa un listener de scroll para animación genérica. El home no depende de él, pero la deuda afecta las rutas públicas heredadas.
- La experiencia y el stack contienen información útil, pero necesitan una presentación más escaneable y con menos ruido decorativo.

### Dirección aplicada

- Sistema propio de tokens CSS con carbón cálido, blanco humo y un único acento saffron.
- Tipografía local/sistémica sin serif decorativa en titulares. El énfasis se resuelve con peso, color y cursiva de la misma familia.
- Hero split: copy a la izquierda, retrato real y textura editorial generada a la derecha.
- Proyectos en composición asimétrica, con un proyecto principal y secundarios con proporciones distintas.
- Sobre mí y experiencia con jerarquía editorial y divisores funcionales, sin líneas decorativas superfluas.
- Servicios como lista numerada de tres capacidades, no como tres tarjetas idénticas.
- Contacto como cierre de una sola intención: iniciar conversación por email o WhatsApp.
- Movimiento limitado a reveal y estados hover, respetando `prefers-reduced-motion`.

### Asset visual

Se incorpora `public/image/portfolio-editorial-texture.png`, una textura abstracta vertical generada específicamente para el hero. El retrato y las imágenes de proyectos continúan usando assets reales del portafolio.

## Segunda dirección visual: moderna y creativa - 2026-08-29

**Design Read:** portafolio de desarrollador para reclutadores y clientes, con lenguaje de estudio digital contemporáneo, tipografía sans de gran escala y composición asimétrica.

**Diales:** `DESIGN_VARIANCE 8`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 4`. La interfaz gana personalidad mediante una paleta cobalt + ink, celdas suaves y una textura gráfica, manteniendo el contenido escaneable.

### Ajustes aplicados

- La paleta pública pasa de carbón y saffron a un fondo claro con acento cobalt y soporte dark mode por preferencia del sistema.
- Se mantiene un solo acento visual en botones, iconos, enlaces activos y textura.
- Las formas adoptan un radio consistente de 18 px para separar la nueva dirección de la versión editorial rígida.
- La grilla de tecnologías utiliza celdas individuales con hover corto para expresar exploración sin convertir la página en un dashboard.
- El asset principal del hero pasa a `public/image/portfolio-creative-texture.png`.
- No se modifican rutas, anchors, contratos API, navegación principal ni datos de contacto.

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

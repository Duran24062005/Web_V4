# PRD: Rediseño Stitch para páginas públicas secundarias

## Problema y objetivo

Las rutas públicas `Services`, `Projects`, `Blog`, `Contact` y `Blog Detail` siguen mostrando una interfaz anterior que no corresponde al lenguaje visual definido en Stitch para `Portafolio Personal Refinado`.

El objetivo es alinear estas pantallas al sistema visual editorial ya aplicado al home, preservando los datos, rutas y comportamientos reales del frontend actual.

## Alcance

- Rediseñar únicamente las pantallas públicas:
  - `Services`
  - `Projects`
  - `Blog`
  - `Contact`
  - `Blog Detail`
- Mantener las fuentes de datos existentes:
  - `useProjects`
  - `useBlogs`
  - `getBlogById`
- Mantener enlaces reales de contacto y navegación.
- No modificar contratos con backend.

## Enfoque de implementación

- Crear un shell visual compartido para las páginas públicas rediseñadas:
  - navegación superior
  - CTA principal
  - footer editorial
- Reinterpretar cada export de Stitch con contenido real del proyecto:
  - `Services`: servicios y capacidades reales del portafolio
  - `Projects`: proyectos reales con filtros por tecnología
  - `Blog`: listado real con búsqueda y tags derivados del dataset
  - `Contact`: canales reales y formulario orientado a contacto funcional
  - `Blog Detail`: cabecera editorial, imagen destacada, markdown y acciones de compartir
- Evitar depender de componentes visuales heredados que mantengan el estilo anterior.

## Actores impactados

- Visitantes del portafolio.
- Reclutadores y clientes que navegan distintas rutas públicas.
- Mantenedores del frontend, al quedar un sistema visual más consistente entre pantallas.

## Impacto en datos, contratos e integraciones

- Sin cambios en APIs ni contratos.
- `Projects` y `Blog` siguen consumiendo datos remotos existentes.
- `Contact` no introduce backend nuevo; el formulario se orienta a email/acciones directas.

## Validaciones y reglas

- Cada página debe seguir el patrón editorial de Stitch sin copiar contenido ficticio.
- Los datos visibles deben salir del sistema actual o de contenido explícito del repositorio.
- Si faltan datos remotos:
  - `Projects` y `Blog` deben degradar con estados vacíos o mensajes claros.
- El detalle del blog debe seguir soportando markdown.

## Riesgos y edge cases

- Las pantallas de Stitch tienen copy y metadata ficticia; se deben reinterpretar con datos reales.
- `Blog` no expone tiempos de lectura desde backend; ese valor debe inferirse desde el contenido.
- `Contact` no tiene un endpoint de envío real; el formulario debe mantenerse útil sin prometer una integración inexistente.

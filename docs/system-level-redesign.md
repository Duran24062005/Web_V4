# Rediseño "Ingeniería a nivel de sistema" (REV 4.0)

Referencia rápida del sistema visual y de lo que falta completar. El código fuente manda; este documento solo orienta.

## Tokens (`src/index.css`)

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo | `--color-bg` | `#080d1a` |
| Superficie | `--color-surface` / `-2` / `-3` | `#0d1426` / `#121b31` / `#18233d` |
| Borde | `--color-border` / `-strong` | `#1c2742` / `#2a3858` |
| Texto primario | `--color-text` | `#e7ecf6` |
| Texto secundario | `--color-text-2` | `#aeb9d0` |
| Texto atenuado | `--color-text-3` | `#8491ad` (AA ≥ 4.5:1 sobre todas las superficies) |
| Acento | `--color-accent` / `-hover` | `#4d7cff` / `#6b92ff` |
| Éxito / fósforo | `--color-phosphor` | `#7fbf98`: solo LEDs, estados y prompts |
| Error | `--color-danger` | `#f2a0a0` |

- Tipografía: **Geist** (sans, titulares y cuerpo) + **JetBrains Mono** (etiquetas, metadatos, código), self-hosted vía `@fontsource-variable`, `font-display: swap` y subconjuntos por `unicode-range`.
- Escala: display `clamp(2.6rem, 6.2vw, 5rem)`, h2 `clamp(2rem, 3.8vw, 3.25rem)`, cuerpo 17px, etiquetas mono 13px.
- Espaciado: `--space-1…9` = 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Grilla: 12 columnas, gap 24px, máx. 1280px, gutter 16/24/40px. Se puede ver con la paleta (`Ctrl K` → "grilla").
- Radios: 3px / 6px. Sombras: solo en la paleta de comandos.
- Movimiento: 150–300 ms, `prefers-reduced-motion` desactiva cursor, tipeo y reveals.

## Dónde se edita cada cosa

| Contenido | Archivo |
| --- | --- |
| Textos ES/EN del home, nav, paleta, footer | `src/home/home.content.ts` |
| Stack (logos, uso, nivel opcional) | `src/home/stack.data.ts` |
| Casos de estudio | `src/home/projects.data.ts` |
| Imágenes optimizadas y OG | `yarn assets` (`scripts/generate-assets.mjs`) |

## Pendientes del propietario

Todo lo marcado con `todo: true` o con estilo punteado en la web.

1. **Setup y hardware** (`profile.systemInfo.fields` y `profile.hardware.fields`): OS, shell, editor, equipo, teclado, homelab, electrónica.
2. **Rol y resultado medible** de cada caso de estudio (`role`, `result` en `projects.data.ts`).
3. **Capturas reales** de cada proyecto en `public/image/projects/<id>.webp` (campo `imageUrl`).
4. **Años de los proyectos** (`year`): los datos antiguos tenían fechas de relleno y no se muestran.
5. **Métricas por experiencia**: cifras reales (usuarios, % de mejora de carga, etc.) para Palestina Digital y Tensor.
6. **Columna "Uso" del stack**: revisar redacción y, si se quiere, añadir `level` (`core` / `solid` / `learning`).
7. **Zona horaria / ciudad** (`contactData.timeZone`, `hero.status.locationValue`).
8. **Foto**: el retrato actual muestra la marca de edición de Gemini (esquina inferior derecha). Reemplazar `public/image/image_94f2750b.png` por una foto sin marca y ejecutar `yarn assets`.
9. **CV**: renombrar el PDF sin espacios ni tildes y actualizar `contactData.cv`.
10. **Servicios**: validar entradas, salidas y entregables.
11. **API**: definir `VITE_URL_BASE_API` en Vercel o dejarla vacía. Sin ella el home usa los casos locales y no hace la petición.

// Build step: renders /es and /en to static HTML so the first paint does not wait for JS,
// then adds font preloads. Runs after `vite build` and the SSR build of src/entry-server.tsx.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')
const siteUrl = 'https://alexidg.vercel.app'
const languages = ['es', 'en']
const ogLocale = { es: 'es_CO', en: 'en_US' }

const { render, getMeta } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const setAttr = (html, pattern, value) => {
  if (!pattern.test(html)) {
    throw new Error(`prerender: pattern not found in index.html: ${pattern}`)
  }
  return html.replace(pattern, (match) => match.replace(/(content|href)="[^"]*"/, `$1="${escapeAttr(value)}"`))
}

const assets = await readdir(path.join(dist, 'assets'))
const fontPreloads = assets
  .filter((file) => /^(geist|jetbrains-mono)-latin-wght-normal-.*\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

if (!fontPreloads) {
  throw new Error('prerender: latin font files not found in dist/assets')
}

const template = (await readFile(path.join(dist, 'index.html'), 'utf-8')).replace(
  '</title>',
  `</title>\n    ${fontPreloads}`,
)

for (const language of languages) {
  const url = `${siteUrl}/${language}`
  const { title, description } = getMeta(language)
  let html = template

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
  html = setAttr(html, /<meta name="description" content="[^"]*"/, description)
  html = setAttr(html, /<link rel="canonical" href="[^"]*"/, url)
  html = setAttr(html, /<meta property="og:title" content="[^"]*"/, title)
  html = setAttr(html, /<meta property="og:description" content="[^"]*"/, description)
  html = setAttr(html, /<meta property="og:url" content="[^"]*"/, url)
  html = setAttr(html, /<meta property="og:locale" content="[^"]*"/, ogLocale[language])
  html = setAttr(
    html,
    /<meta property="og:locale:alternate" content="[^"]*"/,
    ogLocale[languages.find((other) => other !== language)],
  )
  html = setAttr(html, /<meta name="twitter:title" content="[^"]*"/, title)
  html = setAttr(html, /<meta name="twitter:description" content="[^"]*"/, description)
  html = html.replace('<div id="root"></div>', `<div id="root">${render(`/${language}`)}</div>`)

  await mkdir(path.join(dist, language), { recursive: true })
  await writeFile(path.join(dist, language, 'index.html'), html)
  console.log(`prerender: /${language} → dist/${language}/index.html (${(html.length / 1024).toFixed(1)} kB)`)
}

// The SPA shell serves every other route: keep the font preloads, drop the hero image preload.
const shell = template.replace(/\s*<link rel="preload" as="image"[^>]*\/>/, '')
await writeFile(path.join(dist, 'index.html'), shell)
await rm(serverDir, { recursive: true, force: true })

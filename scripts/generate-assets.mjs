// Generates optimized static assets from the sources in /public.
// Run with `yarn assets` after replacing the portrait or changing the OG copy.
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const portraitSource = path.join(publicDir, 'image', 'image_94f2750b.png')

const colors = {
  bg: '#080d1a',
  surface: '#0d1426',
  border: '#2a3858',
  grid: 'rgba(120,150,210,0.08)',
  text: '#e7ecf6',
  text2: '#aeb9d0',
  text3: '#8491ad',
  accent: '#4d7cff',
  phosphor: '#7fbf98',
}

const sans = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
const mono = "Consolas, 'JetBrains Mono', Menlo, monospace"

async function portraits() {
  for (const width of [480, 720]) {
    const base = sharp(portraitSource).resize({ width })
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(publicDir, 'image', `portrait-${width}.avif`))
    await base.clone().webp({ quality: 78 }).toFile(path.join(publicDir, 'image', `portrait-${width}.webp`))
  }
}

async function ogImage() {
  const width = 1200
  const height = 630
  const photoWidth = 300
  const photoHeight = Math.round((photoWidth * 1184) / 864)
  const packageX = 790
  const packageY = (height - photoHeight - 64) / 2
  const pins = ['REQS', 'DESIGN', 'DATA']
  const outs = ['UI', 'API', 'DEPLOY']
  const pinY = (index) => packageY + 32 + ((photoHeight + 16) / 4) * (index + 1)

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="${colors.grid}" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="${colors.bg}"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>

    <text x="72" y="120" font-family="${mono}" font-size="22" fill="${colors.phosphor}">~/alexi $ <tspan fill="${colors.text2}">whoami</tspan></text>
    <text x="72" y="228" font-family="${sans}" font-size="68" font-weight="600" fill="${colors.text}" letter-spacing="-1.5">Alexi Durán Gómez</text>
    <text x="72" y="300" font-family="${sans}" font-size="40" font-weight="500" fill="${colors.text2}">Full Stack Developer<tspan fill="${colors.accent}"> ▍</tspan></text>
    <text x="72" y="380" font-family="${mono}" font-size="22" fill="${colors.text3}">React · TypeScript · Node.js · FastAPI · Laravel</text>
    <line x1="72" y1="470" x2="640" y2="470" stroke="${colors.border}"/>
    <circle cx="72" cy="470" r="4" fill="${colors.bg}" stroke="${colors.accent}"/>
    <text x="72" y="520" font-family="${mono}" font-size="22" fill="${colors.text2}">alexidg.vercel.app</text>
    <text x="640" y="520" text-anchor="end" font-family="${mono}" font-size="18" fill="${colors.text3}">REV 4.0 · ES / EN</text>

    <rect x="${packageX}" y="${packageY}" width="${photoWidth + 16}" height="${photoHeight + 64}" rx="6" fill="${colors.surface}" stroke="${colors.border}"/>
    <path d="M${packageX + photoWidth / 2 - 5} ${packageY} a13 13 0 0 0 26 0" fill="${colors.bg}" stroke="${colors.border}"/>
    <text x="${packageX + 10}" y="${packageY + 22}" font-family="${mono}" font-size="13" fill="${colors.text3}">U1 · ADG-FS</text>
    <text x="${packageX + photoWidth + 6}" y="${packageY + 22}" text-anchor="end" font-family="${mono}" font-size="13" fill="${colors.text3}">REV 4.0</text>
    <text x="${packageX + 10}" y="${packageY + photoHeight + 54}" font-family="${mono}" font-size="13" fill="${colors.text3}">ALEXI DURÁN GÓMEZ</text>
    ${pins
      .map(
        (pin, index) => `
    <line x1="${packageX - 30}" y1="${pinY(index)}" x2="${packageX}" y2="${pinY(index)}" stroke="${colors.accent}" stroke-width="2"/>
    <text x="${packageX - 38}" y="${pinY(index) + 5}" text-anchor="end" font-family="${mono}" font-size="14" fill="${colors.text3}">${pin}</text>`,
      )
      .join('')}
    ${outs
      .map(
        (pin, index) => `
    <line x1="${packageX + photoWidth + 16}" y1="${pinY(index)}" x2="${packageX + photoWidth + 46}" y2="${pinY(index)}" stroke="${colors.accent}" stroke-width="2"/>
    <text x="${packageX + photoWidth + 54}" y="${pinY(index) + 5}" font-family="${mono}" font-size="14" fill="${colors.text3}">${pin}</text>`,
      )
      .join('')}
  </svg>`

  const photo = await sharp(portraitSource).resize({ width: photoWidth }).modulate({ saturation: 0.85 }).toBuffer()

  await sharp(Buffer.from(svg))
    .composite([{ input: photo, left: packageX + 8, top: Math.round(packageY + 32) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'og.png'))
}

async function appleTouchIcon() {
  const favicon = await readFile(path.join(publicDir, 'favicon.svg'))
  await sharp(favicon, { density: 600 }).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
}

await Promise.all([portraits(), ogImage(), appleTouchIcon()])
console.log('assets: portrait-{480,720}.{avif,webp}, og.png, apple-touch-icon.png')

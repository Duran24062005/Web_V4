// Synthesizes every UI sound effect into one WAV sprite (public/audio/sfx.wav) and writes the
// sprite map to src/experience/audio/sfx.sprite.ts. Original synthesis: no third-party samples,
// no license to track. Run with `node scripts/generate-sfx.mjs` after changing a sound.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RATE = 22050
const GAP = 0.06

// Deterministic noise so the file only changes when a sound does.
let seed = 0x2f6e2b1
const noise = () => {
  seed ^= seed << 13
  seed ^= seed >>> 17
  seed ^= seed << 5
  return ((seed >>> 0) / 0xffffffff) * 2 - 1
}

const TAU = Math.PI * 2
const env = (t, attack, decay) => (t < attack ? t / attack : Math.exp(-(t - attack) / decay))
// Band-limited-ish square: first odd harmonics only, so blips stay soft on laptop speakers.
const square = (phase) => Math.sin(phase) + Math.sin(3 * phase) / 3 + Math.sin(5 * phase) / 5

const render = (duration, fn) => {
  const out = new Float32Array(Math.round(duration * RATE))
  for (let i = 0; i < out.length; i += 1) {
    out[i] = fn(i / RATE, duration)
  }
  return out
}

const tone = (duration, freqAt, { attack = 0.004, decay = 0.08, shape = square, gain = 0.5 } = {}) => {
  let phase = 0
  return render(duration, (t) => {
    phase += (TAU * freqAt(t)) / RATE
    return shape(phase) * env(t, attack, decay) * gain
  })
}

const concat = (...parts) => {
  const out = new Float32Array(parts.reduce((sum, part) => sum + part.length, 0))
  let offset = 0
  for (const part of parts) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

const sounds = {
  // Short high blip for hovering interactive elements.
  hover: tone(0.045, () => 2100, { decay: 0.012, shape: Math.sin, gain: 0.28 }),

  // Two-step click: a pitch jump reads as "confirmed".
  click: tone(0.08, (t) => (t < 0.025 ? 880 : 1320), { decay: 0.03, gain: 0.38 }),

  // Arcade coin for PRESS START.
  start: concat(
    tone(0.07, () => 987.77, { decay: 0.2, gain: 0.4 }),
    tone(0.42, () => 1318.51, { decay: 0.12, gain: 0.4 }),
  ),

  // Boot: detuned saw chord sweeping up an octave, with a shimmer on top.
  boot: (() => {
    const phases = [0, 0, 0, 0]
    const ratios = [1, 1.005, 1.5, 2.002]
    return render(1.15, (t, d) => {
      const base = 110 * 2 ** Math.min(t / 0.7, 1)
      let sample = 0
      ratios.forEach((ratio, index) => {
        phases[index] += (TAU * base * ratio) / RATE
        const p = (phases[index] / TAU) % 1
        sample += (p * 2 - 1) * 0.16
      })
      const shimmer = Math.sin(TAU * 3520 * t) * 0.05 * Math.max(0, 1 - Math.abs(t - 0.75) / 0.3)
      const fade = Math.min(1, t / 0.08) * Math.min(1, (d - t) / 0.35)
      return (sample + shimmer) * fade
    })
  })(),

  // Scene change: noise through a sweeping low-pass (a "whoosh").
  transition: (() => {
    let low = 0
    return render(0.62, (t, d) => {
      const cutoff = 300 + 5200 * Math.sin((Math.PI * t) / d) ** 2
      const alpha = 1 - Math.exp((-TAU * cutoff) / RATE)
      low += alpha * (noise() - low)
      return low * Math.sin((Math.PI * t) / d) ** 1.5 * 0.7
    })
  })(),

  // Glitch: bit-crushed bursts that alternate between noise and square.
  glitch: (() => {
    let held = 0
    return render(0.26, (t) => {
      const slice = Math.floor(t / 0.032)
      if (Math.floor(t * RATE) % (slice % 2 ? 9 : 4) === 0) {
        held = slice % 3 === 0 ? Math.sign(Math.sin(TAU * (180 + slice * 90) * t)) : noise()
      }
      const gate = slice % 4 === 2 ? 0.15 : 1
      return Math.round(held * 6) / 6 * 0.32 * gate
    })
  })(),

  // Error: two low buzzes.
  error: concat(
    tone(0.12, () => 110, { decay: 0.2, gain: 0.45 }),
    render(0.04, () => 0),
    tone(0.16, () => 98, { decay: 0.2, gain: 0.45 }),
  ),

  // Easter egg: a fast major arpeggio ending on a held note.
  secret: concat(
    ...[523.25, 659.25, 783.99, 1046.5, 1318.51].map((f) => tone(0.085, () => f, { decay: 0.06, gain: 0.35 })),
    tone(0.5, (t) => 1567.98 * (1 + 0.006 * Math.sin(TAU * 6 * t)), { decay: 0.25, gain: 0.35 }),
  ),

  // Toggle feedback.
  on: tone(0.12, (t) => (t < 0.05 ? 660 : 990), { decay: 0.05, gain: 0.35 }),
  off: tone(0.12, (t) => (t < 0.05 ? 990 : 660), { decay: 0.05, gain: 0.35 }),
}

// Lay the sprite out with silent gaps and record [offsetMs, durationMs].
const gap = new Float32Array(Math.round(GAP * RATE))
const sprite = {}
const chunks = []
let cursor = 0
for (const [name, samples] of Object.entries(sounds)) {
  sprite[name] = [Math.round((cursor / RATE) * 1000), Math.round((samples.length / RATE) * 1000)]
  chunks.push(samples, gap)
  cursor += samples.length + gap.length
}
const pcm = concat(...chunks)

// Normalize to -1 dBFS with a soft clip.
const peak = pcm.reduce((max, value) => Math.max(max, Math.abs(value)), 0) || 1
const target = 10 ** (-1 / 20)
const data = Buffer.alloc(pcm.length * 2)
pcm.forEach((value, index) => {
  const sample = Math.tanh((value / peak) * 1.2) / Math.tanh(1.2)
  data.writeInt16LE(Math.round(sample * target * 32767), index * 2)
})

const header = Buffer.alloc(44)
header.write('RIFF', 0)
header.writeUInt32LE(36 + data.length, 4)
header.write('WAVE', 8)
header.write('fmt ', 12)
header.writeUInt32LE(16, 16)
header.writeUInt16LE(1, 20) // PCM
header.writeUInt16LE(1, 22) // mono
header.writeUInt32LE(RATE, 24)
header.writeUInt32LE(RATE * 2, 28)
header.writeUInt16LE(2, 32)
header.writeUInt16LE(16, 34)
header.write('data', 36)
header.writeUInt32LE(data.length, 40)

await mkdir(path.join(root, 'public', 'audio'), { recursive: true })
await writeFile(path.join(root, 'public', 'audio', 'sfx.wav'), Buffer.concat([header, data]))

const entries = Object.entries(sprite)
  .map(([name, [start, length]]) => `  ${name}: [${start}, ${length}],`)
  .join('\n')
await writeFile(
  path.join(root, 'src', 'experience', 'audio', 'sfx.sprite.ts'),
  `// Generated by scripts/generate-sfx.mjs. Do not edit by hand.\n` +
    `/** [offsetMs, durationMs] of each sound inside /audio/sfx.wav. */\n` +
    `export const sfxSprite = {\n${entries}\n} satisfies Record<string, [number, number]>\n\n` +
    `export type SfxName = keyof typeof sfxSprite\n`,
)

console.log(`sfx: ${entries.split('\n').length} sounds, ${(pcm.length / RATE).toFixed(2)} s, ${(data.length / 1024).toFixed(0)} kB`)

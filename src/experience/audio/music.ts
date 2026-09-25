import * as Tone from 'tone'

/**
 * Generative synthwave loop, synthesized live (no audio files, no license).
 * Am – F – C – G at 88 BPM: detuned pad, 8th-note bass, a 16th arpeggio that picks its notes
 * at random from the chord so it never repeats exactly, soft kick and hats.
 * This module is only imported after the viewer turns sound on.
 */
const progression = [
  { pad: ['A3', 'C4', 'E4'], bass: 'A1', arp: ['A4', 'C5', 'E5', 'A5', 'B4'] },
  { pad: ['F3', 'A3', 'C4'], bass: 'F1', arp: ['F4', 'A4', 'C5', 'E5', 'G4'] },
  { pad: ['C3', 'E3', 'G3'], bass: 'C2', arp: ['C5', 'E5', 'G5', 'G4', 'D5'] },
  { pad: ['G3', 'B3', 'D4'], bass: 'G1', arp: ['G4', 'B4', 'D5', 'F#5', 'A4'] },
]

const MUSIC_GAIN = 0.32 // at full master volume; music sits under the UI sounds.

export interface Music {
  start: (fadeSeconds: number) => void
  stop: (fadeSeconds: number) => void
  setVolume: (volume: number) => void
}

export const createMusic = (): Music => {
  const transport = Tone.getTransport()
  transport.bpm.value = 88

  // Linear gain (not dB) so fades can reach true silence.
  const out = new Tone.Gain(0).toDestination()
  const reverb = new Tone.Reverb({ decay: 6, wet: 0.35 }).connect(out)
  const delay = new Tone.PingPongDelay({ delayTime: '8n.', feedback: 0.32, wet: 0.3 }).connect(reverb)
  const padFilter = new Tone.Filter(1300, 'lowpass').connect(reverb)
  const hatFilter = new Tone.Filter(7500, 'highpass').connect(out)

  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'fatsawtooth', count: 3, spread: 28 },
    envelope: { attack: 1.4, decay: 0.6, sustain: 0.7, release: 2.8 },
  }).connect(padFilter)
  pad.volume.value = -22

  const bass = new Tone.MonoSynth({
    oscillator: { type: 'sawtooth' },
    filter: { Q: 2, type: 'lowpass' },
    filterEnvelope: { attack: 0.005, decay: 0.18, sustain: 0.25, baseFrequency: 110, octaves: 2.6 },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.45, release: 0.15 },
  }).connect(out)
  bass.volume.value = -15

  const arp = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.004, decay: 0.12, sustain: 0, release: 0.08 },
  }).connect(delay)
  arp.volume.value = -27

  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.03,
    octaves: 5,
    envelope: { attack: 0.001, decay: 0.32, sustain: 0 },
  }).connect(out)
  kick.volume.value = -16

  const hat = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.001, decay: 0.045, sustain: 0 } }).connect(
    hatFilter,
  )
  hat.volume.value = -32

  const chordAt = (time: number) => {
    const bar = Math.floor(Tone.Time(time).toTicks() / Tone.Time('1m').toTicks())
    return progression[bar % progression.length]
  }

  const padLoop = new Tone.Loop((time) => pad.triggerAttackRelease(chordAt(time).pad, '1m', time, 0.6), '1m')
  const bassLoop = new Tone.Loop((time) => {
    const chord = chordAt(time)
    const octaveUp = Tone.Frequency(chord.bass).transpose(12).toNote()
    bass.triggerAttackRelease(Math.random() < 0.25 ? octaveUp : chord.bass, '16n', time)
  }, '8n')
  const arpLoop = new Tone.Loop((time) => {
    // Rests and random picks keep the line generative.
    if (Math.random() < 0.18) {
      return
    }
    const notes = chordAt(time).arp
    arp.triggerAttackRelease(notes[Math.floor(Math.random() * notes.length)], '32n', time, 0.4 + Math.random() * 0.4)
  }, '16n')
  const kickLoop = new Tone.Loop((time) => kick.triggerAttackRelease('A0', '8n', time), '4n')
  const hatLoop = new Tone.Loop((time) => hat.triggerAttackRelease('32n', time), '4n')
  hatLoop.start('8n')
  ;[padLoop, bassLoop, arpLoop, kickLoop].forEach((loop) => loop.start(0))

  let volume = 0.6
  let playing = false
  const levelFor = (value: number) => value * MUSIC_GAIN

  return {
    start: (fadeSeconds) => {
      if (!playing) {
        transport.start('+0.05')
        playing = true
      }
      out.gain.cancelScheduledValues(Tone.now())
      out.gain.rampTo(levelFor(volume), fadeSeconds)
    },
    stop: (fadeSeconds) => {
      out.gain.cancelScheduledValues(Tone.now())
      out.gain.rampTo(0, fadeSeconds)
      window.setTimeout(() => {
        if (out.gain.value < 0.0005) {
          transport.pause()
          playing = false
        }
      }, fadeSeconds * 1000 + 60)
    },
    setVolume: (next) => {
      volume = next
      if (playing) {
        out.gain.rampTo(levelFor(volume), 0.15)
      }
    },
  }
}

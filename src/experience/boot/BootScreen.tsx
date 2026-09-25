import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { gsap } from 'gsap'
import { useLanguage } from '../../i18n/LanguageContext'
import { markIntroSeen } from '../../lib/preferences'
import { useSafeEffects } from '../../shared/hooks/useReducedMotion'
import { Kana } from '../../shared/neon/primitives'
import { audio } from '../audio/engine'
import { getExperienceCopy } from '../experience.copy'
import { pauseScroll, resumeScroll } from '../motion/runtime'
import { useRuntime, useSettings } from '../settings.store'

type Stage = 'log' | 'title' | 'ready'

const LINE_MS = 150
const COUNTDOWN_FROM = 9

/**
 * Opening sequence, once per browser session: kernel log → title card → PRESS START with an
 * arcade "continue?" countdown that starts the site on its own. PRESS START is also the user
 * gesture that unlocks audio. Esc or "Skip intro" leaves at any moment. Never shown under
 * reduced motion (index.html does not mark the document in that case).
 */
export const BootScreen = () => {
  const boot = useRuntime((state) => state.boot)
  return boot === 'done' ? null : <BootSequence />
}

const BootSequence = () => {
  const { language } = useLanguage()
  const { boot: copy, hud } = getExperienceCopy(language)
  const safe = useSafeEffects()
  const sound = useSettings((state) => state.sound)
  const setSound = useSettings((state) => state.setSound)
  const safeMode = useSettings((state) => state.safeMode)
  const setSafeMode = useSettings((state) => state.setSafeMode)
  const setBoot = useRuntime((state) => state.setBoot)

  const [stage, setStage] = useState<Stage>('log')
  const [lines, setLines] = useState(0)
  const [countdown, setCountdown] = useState(COUNTDOWN_FROM)
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLButtonElement>(null)
  const leaving = useRef(false)

  const finish = useCallback(() => {
    markIntroSeen()
    delete document.documentElement.dataset.boot
    resumeScroll()
    setBoot('done')
  }, [setBoot])

  const leave = useCallback(
    (withStart: boolean) => {
      if (leaving.current) {
        return
      }
      leaving.current = true

      if (withStart) {
        audio.play('start')
      }

      const root = rootRef.current
      if (!root || !withStart) {
        // Skip: a quick fade, no theatrics.
        gsap.to(root, { autoAlpha: 0, duration: 0.25, onComplete: finish })
        return
      }

      // Manga-panel cut: the screen splits along a diagonal and the halves fly apart.
      audio.play('transition')
      gsap
        .timeline({ onComplete: finish })
        .to(root.querySelectorAll('.yk-boot-content'), { scale: 1.08, autoAlpha: 0, duration: 0.3, ease: 'power2.in' })
        .to(root.querySelector('.yk-boot-half--a'), { xPercent: -110, yPercent: -12, duration: 0.75, ease: 'expo.inOut' }, 0.12)
        .to(root.querySelector('.yk-boot-half--b'), { xPercent: 110, yPercent: 12, duration: 0.75, ease: 'expo.inOut' }, 0.12)
        .to(root.querySelector('.yk-boot-slash'), { scaleX: 1, duration: 0.25, ease: 'power4.out' }, 0.05)
        .to(root.querySelector('.yk-boot-slash'), { autoAlpha: 0, duration: 0.3 }, 0.35)
    },
    [finish],
  )

  // Mount: freeze the page and start the kernel log.
  useEffect(() => {
    setBoot('running')
    pauseScroll()
    rootRef.current?.focus()

    if (useSettings.getState().sound) {
      void audio.preload()
    }

    const progress = progressRef.current
    const bar = progress
      ? animate(progress, { scaleX: [0, 1], duration: copy.lines.length * LINE_MS + 250, ease: 'inOutQuad' })
      : null

    const timer = window.setInterval(() => {
      setLines((count) => {
        if (count + 1 >= copy.lines.length) {
          window.clearInterval(timer)
          window.setTimeout(() => setStage((current) => (current === 'log' ? 'title' : current)), 280)
        }
        return Math.min(count + 1, copy.lines.length)
      })
    }, LINE_MS)

    return () => {
      window.clearInterval(timer)
      bar?.pause()
    }
    // Runs once; copy length is stable per language.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Title card: letters drop in, then (unless safe) a short RGB jitter.
  useEffect(() => {
    if (stage !== 'title' || !titleRef.current) {
      return
    }

    audio.play('boot')
    const letters = titleRef.current.querySelectorAll('.yk-boot-letter')
    const intro = animate(letters, {
      opacity: [0, 1],
      translateY: ['0.6em', '0em'],
      rotateX: [-90, 0],
      delay: stagger(40, { from: 'center' }),
      duration: 520,
      ease: 'outExpo',
    })

    const jitter = safe
      ? null
      : animate(titleRef.current, {
          translateX: [0, -7, 6, -3, 2, 0],
          skewX: [0, 9, -7, 4, 0, 0],
          delay: 520,
          duration: 380,
          ease: 'linear',
          onBegin: () => audio.play('glitch'),
        })

    const next = window.setTimeout(() => setStage('ready'), safe ? 700 : 950)
    return () => {
      window.clearTimeout(next)
      intro.pause()
      jitter?.pause()
    }
  }, [stage, safe])

  // Ready: focus PRESS START and run the arcade countdown.
  useEffect(() => {
    if (stage !== 'ready') {
      return
    }

    startRef.current?.focus()
    const timer = window.setInterval(() => setCountdown((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [stage])

  useEffect(() => {
    if (countdown === 0) {
      leave(true)
    }
  }, [countdown, leave])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      leave(false)
    } else if ((event.key === 'Enter' || event.key === ' ') && stage !== 'ready') {
      event.preventDefault()
      setStage('ready')
    }
  }

  const title = 'ALEXI DG'

  return (
    <div
      ref={rootRef}
      className="yk-boot"
      role="dialog"
      aria-modal="true"
      aria-label={copy.label}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      data-lenis-prevent
    >
      <div className="yk-boot-half yk-boot-half--a" aria-hidden="true" />
      <div className="yk-boot-half yk-boot-half--b" aria-hidden="true" />
      <div className="yk-boot-slash" aria-hidden="true" />

      <button type="button" className="yk-boot-skip hud-label" onClick={() => leave(false)} data-sfx="none">
        {copy.skip} <span aria-hidden="true">[esc]</span>
      </button>

      <div className="yk-boot-content">
        {stage === 'log' ? (
          <div className="yk-boot-log" aria-hidden="true">
            <ol>
              {copy.lines.slice(0, lines).map((line) => (
                <li key={line}>
                  <span className="text-neon-magenta">&gt;</span> {line}
                </li>
              ))}
            </ol>
            <span className="yk-boot-progress">
              <span ref={progressRef} />
            </span>
          </div>
        ) : (
          <div className="yk-boot-card">
            <div ref={titleRef} className="yk-boot-title" aria-hidden="true">
              {title.split('').map((letter, index) => (
                <span key={index} className="yk-boot-letter" data-text={letter}>
                  {letter === ' ' ? ' ' : letter}
                </span>
              ))}
            </div>
            <p className="yk-boot-sub hud-label" aria-hidden="true">
              <Kana className="text-neon-magenta">夜行</Kana> // DG-OS · アレクシ・デュラン
            </p>

            {stage === 'ready' ? (
              <div className="yk-boot-ready">
                <button ref={startRef} type="button" className="yk-boot-start" onClick={() => leave(true)} data-sfx="none">
                  <span className="sr-only">{copy.pressStart}</span>
                  <span aria-hidden="true" className="yk-boot-start-label">
                    {copy.pressStartShort}
                  </span>
                </button>
                <p className="yk-boot-continue hud-label" aria-live="polite">
                  {copy.continue} <span className="text-neon-warn">{countdown}</span>
                </p>

                <div className="yk-boot-options">
                  <div role="group" aria-label={hud.sound} className="yk-boot-toggle">
                    <button type="button" aria-pressed={!sound} onClick={() => setSound(false)} data-sfx="none">
                      {copy.soundOff}
                    </button>
                    <button type="button" aria-pressed={sound} onClick={() => setSound(true)} data-sfx="none">
                      ♪ {copy.soundOn}
                    </button>
                  </div>
                  <p className="yk-boot-warning">
                    <span aria-hidden="true" className="text-neon-warn">
                      ⚠
                    </span>{' '}
                    {copy.flashWarning}{' '}
                    <button type="button" aria-pressed={safeMode} onClick={() => setSafeMode(!safeMode)} data-sfx="none">
                      {safeMode ? copy.safeModeOn : copy.safeModeOff}
                    </button>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

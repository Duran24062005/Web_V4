import { useEffect, useRef, type MouseEvent } from 'react'
import { animate } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, FileDown } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { episodes, getExperienceCopy } from '../../experience/experience.copy'
import { ensureMotionRuntime, scrollToTarget } from '../../experience/motion/runtime'
import { useRuntime } from '../../experience/settings.store'
import { useLocalTime } from '../../shared/hooks/useLocalTime'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import { useTilt } from '../../shared/hooks/useTilt'
import { NeonButton } from '../../shared/neon/NeonButton'
import { HudPanel, Kana, Onomatopoeia } from '../../shared/neon/primitives'
import { Letters } from '../../shared/neon/Letters'
import { scrambleText } from '../../shared/neon/scramble'
import { HeroBackdrop } from '../hero/HeroBackdrop'
import { heroScroll } from '../hero/heroScroll'
import { careerStart, contactData, type HomeContent } from '../home.content'
import { stackGroups } from '../stack.data'
import '../hero/hero.css'

interface HeroProps {
  content: HomeContent
  technologies: number
  caseStudies: number
}

const PortraitPanel = ({ chip }: { chip: HomeContent['hero']['chip'] }) => {
  const tiltRef = useRef<HTMLDivElement>(null)
  useTilt(tiltRef, 7)

  return (
    <figure className="yk-hero-figure">
      <div ref={tiltRef} className="yk-hero-panel" data-cursor>
        <div className="yk-hero-panel-frame">
          <div className="yk-hero-panel-lines speedlines" aria-hidden="true" />
          <picture>
            <source
              type="image/avif"
              srcSet="/image/portrait-480.avif 480w, /image/portrait-720.avif 720w"
              sizes="(min-width: 1024px) 380px, 70vw"
            />
            <source
              type="image/webp"
              srcSet="/image/portrait-480.webp 480w, /image/portrait-720.webp 720w"
              sizes="(min-width: 1024px) 380px, 70vw"
            />
            <img src="/image/portrait-720.webp" alt={chip.photoAlt} width={720} height={987} fetchPriority="high" />
          </picture>
          <div className="yk-hero-panel-tone halftone" aria-hidden="true" />
          <div className="yk-hero-panel-glare" aria-hidden="true" />
        </div>
        <span className="yk-hero-panel-tag hud-label" aria-hidden="true">
          {chip.designator} · {chip.part}
        </span>
        <span className="yk-hero-panel-foot hud-label" aria-hidden="true">
          <span>ALEXI DURÁN GÓMEZ</span>
          <span>REV {__APP_VERSION__.split('.').slice(0, 2).join('.')}</span>
        </span>
      </div>
      <Onomatopoeia className="yk-hero-don">ドン</Onomatopoeia>
      <span className="yk-hero-sign font-jp animate-flicker" aria-hidden="true">
        夜行
      </span>
      <p className="yk-hero-pipeline hud-label" aria-hidden="true">
        <span className="text-dim">IN</span> {chip.inputs.join(' · ')}
        <span className="yk-hero-pipeline-arrow" />
        <span className="text-dim">OUT</span> <span className="text-neon-cyan">{chip.outputs.join(' · ')}</span>
      </p>
      <figcaption className="sr-only">{chip.caption}</figcaption>
    </figure>
  )
}

/** Stack names for the arcade marquee, straight from stack.data. */
const marqueeItems = stackGroups.flatMap((group) => group.items.map((item) => item.name))

export const Hero = ({ content, technologies, caseStudies }: HeroProps) => {
  const { language, locale } = useLanguage()
  const { hero } = content
  const system = getExperienceCopy(language)
  const localTime = useLocalTime(contactData.timeZone, locale)
  const boot = useRuntime((state) => state.boot)
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  // Survives StrictMode's effect replay, so the intro still plays after the first cleanup.
  const introArmed = useRef(false)

  const metrics = [
    { value: careerStart.getFullYear(), from: 2000, label: hero.metrics.since },
    { value: content.experience.items.length, from: 0, label: hero.metrics.companies },
    { value: technologies, from: 0, label: hero.metrics.technologies },
    // Only shown once there is something to count.
    ...(caseStudies > 0 ? [{ value: caseStudies, from: 0, label: hero.metrics.projects }] : []),
  ]

  // Title sequence: letterbox opens, title slams in, portrait panel wipes in, counters run.
  useEffect(() => {
    const root = rootRef.current
    const html = document.documentElement

    if (boot !== 'done' || !root) {
      return
    }

    if (html.dataset.intro === 'pending') {
      introArmed.current = true
    }

    if (!introArmed.current || reduced) {
      delete html.dataset.intro
      return
    }

    ensureMotionRuntime()
    const context = gsap.context(() => {
      const accent = root.querySelector<HTMLElement>('.yk-hero-accent-text')
      const term = root.querySelector<HTMLElement>('.yk-hero-term-typed')
      const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'))

      gsap.set('.yk-hero-line--lead .yk-hero-char, .yk-hero-line--tail .yk-hero-char', { yPercent: 118, rotate: 9 })
      gsap.set('.yk-letterbox', { scaleY: 1 })
      counters.forEach((counter) => (counter.textContent = counter.dataset.from ?? '0'))
      if (term) term.textContent = ''
      delete html.dataset.intro

      const timeline = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          introArmed.current = false
        },
      })

      timeline
        .to('.yk-letterbox', { scaleY: 0, duration: 1.2, ease: 'expo.inOut' }, 0)
        .from('.yk-hero-ep', { clipPath: 'inset(0 100% 0 0)', duration: 0.7 }, 0.25)
        .to('.yk-hero-line--lead .yk-hero-char', { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.035 }, 0.35)
        .from('.yk-hero-line--accent', { scaleX: 1.35, skewX: -18, autoAlpha: 0, duration: 0.6, ease: 'power4.out' }, 0.6)
        .add(() => {
          if (accent) scrambleText(accent, hero.titleAccent)
        }, 0.6)
        .to('.yk-hero-line--tail .yk-hero-char', { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.022 }, 0.8)
        .from(
          '.yk-hero-panel',
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 91%, 0% 100%, 0% 100%, 0% 14%)', duration: 1.1, ease: 'expo.inOut' },
          0.3,
        )
        .from('.yk-hero-don', { scale: 2.6, autoAlpha: 0, rotate: -30, duration: 0.55, ease: 'back.out(3)' }, 1.15)
        .add(() => {
          if (!term) return
          const typed = { length: 0 }
          gsap.to(typed, {
            length: hero.command.length,
            duration: hero.command.length * 0.06,
            ease: 'none',
            onUpdate: () => (term.textContent = hero.command.slice(0, Math.round(typed.length))),
          })
        }, 0.9)
        .from('.yk-hero-reveal', { autoAlpha: 0, y: 18, stagger: 0.07, duration: 0.8 }, 1.0)
        .from('.yk-status-row', { autoAlpha: 0, x: 28, stagger: 0.07, duration: 0.7 }, 1.15)
        .from('.yk-hero-marquee', { yPercent: 120, rotate: 0, duration: 1, ease: 'expo.out' }, 1.2)
        .add(() => {
          counters.forEach((counter, index) => {
            const from = Number(counter.dataset.from ?? 0)
            const to = Number(counter.dataset.count)
            const value = { n: from }
            animate(value, {
              n: to,
              duration: 1400,
              delay: index * 120,
              ease: 'outExpo',
              onUpdate: () => (counter.textContent = String(Math.round(value.n))),
            })
          })
        }, 1.3)
    }, root)

    return () => context.revert()
  }, [boot, reduced, hero.titleAccent, hero.command])

  // Scroll: copy and panel drift apart at different speeds; the 3D scene reads heroScroll.
  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) {
      heroScroll.progress = 0
      return
    }

    ensureMotionRuntime()
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          heroScroll.progress = self.progress
        },
      })
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to('.yk-hero-copy', { yPercent: -18, autoAlpha: 0.15, ease: 'none' }, 0)
        .to('.yk-hero-figure', { yPercent: -8, ease: 'none' }, 0)
        .to('.yk-hero-sign', { yPercent: 40, ease: 'none' }, 0)
    }, root)

    return () => context.revert()
  }, [reduced])

  const onPrimaryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('projects')
    if (target) {
      event.preventDefault()
      scrollToTarget(target)
      target.focus({ preventScroll: true })
    }
  }

  return (
    <section ref={rootRef} id="hero" className="yk-hero" aria-labelledby="hero-title" tabIndex={-1}>
      <HeroBackdrop />
      <div className="yk-letterbox yk-letterbox--top" aria-hidden="true" />
      <div className="yk-letterbox yk-letterbox--bottom" aria-hidden="true" />

      <div className="wrap yk-hero-grid">
        <div className="yk-hero-copy">
          <p className="yk-hero-ep hud-label" aria-hidden="true">
            <span className="font-jp text-neon-magenta">{system.hero.episodeKanji}</span>
            <span>EP.00</span>
            <span className="yk-hero-ep-rule" />
            <span className="text-neon-cyan">{episodes.hero.code}</span>
          </p>

          <p className="yk-hero-term yk-hero-reveal">
            <span className="sr-only">
              ~/alexi $ {hero.command}: {hero.output}
            </span>
            <span aria-hidden="true">
              <span className="text-neon-magenta">~/alexi $</span> <span className="yk-hero-term-typed">{hero.command}</span>
              <span className="yk-caret animate-blink" />
              <span className="yk-hero-term-output">&gt; {hero.output}</span>
            </span>
          </p>

          <h1 id="hero-title" className="yk-hero-title">
            <span className="sr-only">
              {hero.titleLead} {hero.titleAccent} {hero.titleTail}
            </span>
            <span className="yk-hero-line yk-hero-line--lead" aria-hidden="true">
              <Letters text={hero.titleLead} />
            </span>
            <span className="yk-hero-line yk-hero-line--accent" aria-hidden="true">
              <span className="yk-hero-accent yk-glitch yk-glitch--idle" data-text={hero.titleAccent}>
                <span className="yk-hero-accent-text">{hero.titleAccent}</span>
              </span>
            </span>
            <span className="yk-hero-line yk-hero-line--tail" aria-hidden="true">
              <Letters text={hero.titleTail} />
            </span>
          </h1>

          <p className="yk-hero-sub yk-hero-reveal">{hero.subtitle}</p>

          <div className="yk-hero-ctas yk-hero-reveal">
            <NeonButton href="#projects" size="lg" icon={<ArrowDown aria-hidden="true" />} onClick={onPrimaryClick}>
              {hero.primaryCta}
            </NeonButton>
            <NeonButton
              href={contactData.cv}
              variant="ghost"
              size="lg"
              target="_blank"
              rel="noreferrer"
              icon={<FileDown aria-hidden="true" />}
            >
              {hero.secondaryCta}
            </NeonButton>
          </div>
        </div>

        <div className="yk-hero-visual">
          <PortraitPanel chip={hero.chip} />

          <HudPanel as="dl" tab="STATUS // 状態" className="yk-status" aria-label={hero.status.title}>
            <div className="yk-status-row">
              <dt>{hero.status.title}</dt>
              <dd className="yk-status-live">
                <span className="yk-led" aria-hidden="true" />
                {hero.status.available}
              </dd>
            </div>
            <div className="yk-status-row">
              <dt>{hero.status.stackKey}</dt>
              <dd>{hero.status.stackValue}</dd>
            </div>
            <div className="yk-status-row">
              <dt>{hero.status.locationKey}</dt>
              <dd>
                {hero.status.locationValue} ·{' '}
                <time aria-label={`${localTime} ${hero.status.localTime}`}>{localTime}</time>
              </dd>
            </div>
            <div className="yk-status-row">
              <dt>{hero.status.languagesKey}</dt>
              <dd>{hero.status.languagesValue}</dd>
            </div>
          </HudPanel>
        </div>
      </div>

      <div className="wrap">
        <dl className="yk-metrics yk-hero-reveal">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="hud-label">{metric.label}</dt>
              <dd data-count={metric.value} data-from={metric.from}>
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="yk-hero-marquee" aria-hidden="true">
        <div className="yk-marquee-track animate-marquee">
          {[0, 1].map((copy) => (
            <span key={copy} className="yk-marquee-set">
              {marqueeItems.map((name) => (
                <span key={name}>
                  {name}
                  <Kana className="yk-marquee-star">✦</Kana>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <span className="yk-hero-scroll hud-label" aria-hidden="true">
        {system.hud.scroll} <span className="text-neon-cyan">EP.01</span>
        <span className="yk-hero-scroll-line" />
      </span>
    </section>
  )
}

import { useRef } from 'react'
import { gsap } from 'gsap'
import type { Language } from '../../i18n/config'
import { useScene } from '../../experience/motion/useScene'
import { useClientValue } from '../../shared/hooks/useClientValue'
import { Onomatopoeia } from '../../shared/neon/primitives'
import { careerStart, type HomeContent, type InfoField } from '../home.content'
import { EpisodeHeader } from './EpisodeHeader'

interface ProfileProps {
  content: HomeContent
  language: Language
}

// The neofetch colour row doubles as a legend of the site's own palette.
const paletteSwatches = ['#07060f', '#131029', '#7b2ff7', '#ff2bd6', '#00f0ff', '#ffe600', '#ece9ff']

const monthsSinceCareerStart = (now: Date) =>
  (now.getFullYear() - careerStart.getFullYear()) * 12 + (now.getMonth() - careerStart.getMonth())

const monthsAtBuild = monthsSinceCareerStart(new Date(`${__BUILD_DATE__}T12:00:00`))
const monthsNow = () => monthsSinceCareerStart(new Date())

const formatUptime = (language: Language, months: number) => {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const labels =
    language === 'es'
      ? { y: years === 1 ? 'año' : 'años', m: rest === 1 ? 'mes' : 'meses' }
      : { y: years === 1 ? 'year' : 'years', m: rest === 1 ? 'month' : 'months' }

  return `${years} ${labels.y}, ${rest} ${labels.m}`
}

/** A value the owner still has to provide renders as a visible "data pending" chip. */
export const InfoValue = ({ field }: { field: InfoField }) =>
  field.todo ? <span className="todo">{field.value}</span> : <>{field.value}</>

/**
 * EP.01 PROFILE — a manga page. Each block is a panel with its own slanted cut; the panels
 * wipe in along their diagonal in manga reading order (right to left), and the neofetch
 * readout types itself line by line.
 */
export const Profile = ({ content, language }: ProfileProps) => {
  const { profile, sections } = content
  const { systemInfo, hardware } = profile
  const uptimeMonths = useClientValue(monthsNow, monthsAtBuild)
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (root, { onEnter }) => {
    // Right-to-left reading order: sort panels by their right edge, rightmost first.
    const panels = gsap.utils
      .toArray<HTMLElement>('.yk-manga-panel', root)
      .sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right || a.offsetTop - b.offsetTop)

    gsap.from(panels, {
      clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      duration: 0.9,
      ease: 'expo.inOut',
      stagger: 0.14,
      scrollTrigger: onEnter('.yk-manga-page', 'top 78%'),
    })

    gsap.from('.yk-neofetch-info > div, .yk-neofetch-cmd', {
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 0.45,
      ease: 'steps(14)',
      stagger: 0.12,
      scrollTrigger: onEnter('.yk-neofetch', 'top 75%'),
    })

    gsap.from('.yk-gogogo', {
      autoAlpha: 0,
      scale: 1.8,
      rotate: 12,
      duration: 0.6,
      ease: 'back.out(3)',
      scrollTrigger: onEnter('.yk-gogogo', 'top 85%'),
    })
  })

  return (
    <section ref={ref} id="about-me" className="yk-episode yk-profile" aria-labelledby="about-me-title" tabIndex={-1}>
      <div className="wrap">
        <EpisodeHeader id="about-me" code={sections['about-me'].code} title={profile.title} />

        <div className="yk-manga-page">
          <div className="yk-manga-panel yk-panel-lead">
            <Onomatopoeia className="yk-gogogo">ゴゴゴ</Onomatopoeia>
            <p className="yk-profile-lead">{profile.lead}</p>
          </div>

          <div className="yk-manga-panel yk-panel-body">
            {profile.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="yk-manga-panel yk-panel-term yk-neofetch">
            <p className="yk-term-bar hud-label" aria-hidden="true">
              <span>tty1</span>
              <span>80×24</span>
            </p>
            <p className="yk-neofetch-cmd">
              <span className="text-neon-magenta">~/alexi $</span> {systemInfo.command}
            </p>
            <div className="yk-neofetch-grid">
              <div className="yk-neofetch-logo" aria-hidden="true">
                <span>DG</span>
              </div>
              <dl className="yk-neofetch-info">
                <div className="yk-neofetch-user">
                  <dt className="sr-only">user</dt>
                  <dd>{systemInfo.user}</dd>
                </div>
                {systemInfo.fields.map((field) => (
                  <div key={field.key}>
                    <dt>{field.key}</dt>
                    <dd>
                      <InfoValue field={field} />
                    </dd>
                  </div>
                ))}
                <div>
                  <dt>{systemInfo.uptimeKey}</dt>
                  <dd>
                    {formatUptime(language, uptimeMonths)}{' '}
                    <span className="text-mute">({systemInfo.uptimeSuffix})</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="yk-neofetch-swatches" aria-hidden="true">
              {paletteSwatches.map((color) => (
                <span key={color} style={{ background: color }} />
              ))}
            </div>
          </div>

          <div className="yk-manga-panel yk-panel-hardware">
            <h3>{hardware.title}</h3>
            <p>{hardware.body}</p>
            <dl className="yk-spec-list">
              {hardware.fields.map((field) => (
                <div key={field.key}>
                  <dt>{field.key}</dt>
                  <dd>
                    <InfoValue field={field} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="yk-manga-panel yk-panel-modules">
            <p className="hud-label text-neon-cyan">{profile.modulesLabel}</p>
            <ol className="yk-modules">
              {profile.modules.map((module) => (
                <li key={module.code}>
                  <p className="yk-module-code" aria-hidden="true">
                    {module.code}
                  </p>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

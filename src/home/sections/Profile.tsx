import type { Language } from '../../i18n/config'
import { useClientValue } from '../../shared/hooks/useClientValue'
import { careerStart, type HomeContent, type InfoField } from '../home.content'
import { SectionHeader } from './SectionHeader'

interface ProfileProps {
  content: HomeContent
  language: Language
  index: number
}

// The neofetch colour row doubles as a legend of the site's own design tokens.
const paletteSwatches = [
  'var(--color-bg)',
  'var(--color-surface-3)',
  'var(--color-border-strong)',
  'var(--color-text-3)',
  'var(--color-text)',
  'var(--color-accent)',
  'var(--color-phosphor)',
]

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

export const InfoValue = ({ field }: { field: InfoField }) =>
  field.todo ? <span className="todo">{field.value}</span> : <>{field.value}</>

export const Profile = ({ content, language, index }: ProfileProps) => {
  const { profile, sections } = content
  const { systemInfo, hardware } = profile
  const uptimeMonths = useClientValue(monthsNow, monthsAtBuild)

  return (
    <section id="about-me" className="section" aria-labelledby="about-me-title" tabIndex={-1}>
      <div className="wrap">
        <SectionHeader id="about-me" index={index} code={sections['about-me'].code} title={profile.title} />

        <div className="grid-12 profile-grid">
          <div className="profile-copy" data-reveal>
            <p className="lead">{profile.lead}</p>
            {profile.body.map((paragraph) => (
              <p key={paragraph} className="body-copy">
                {paragraph}
              </p>
            ))}

            <div className="hardware">
              <h3>{hardware.title}</h3>
              <p className="body-copy">{hardware.body}</p>
              <dl className="spec-list mono">
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
          </div>

          <div className="terminal neofetch" data-reveal>
            <p className="terminal-bar mono" aria-hidden="true">
              <span>tty1</span>
              <span>80×24</span>
            </p>
            <div className="terminal-body mono">
              <p className="terminal-line">
                <span className="term-prompt">~/alexi $</span> {systemInfo.command}
              </p>
              <div className="neofetch-grid">
                <div className="neofetch-logo" aria-hidden="true">
                  <span>AD</span>
                </div>
                <dl className="neofetch-info">
                  <div className="neofetch-user">
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
                      {formatUptime(language, uptimeMonths)} <span className="dim">({systemInfo.uptimeSuffix})</span>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="neofetch-swatches" aria-hidden="true">
                {paletteSwatches.map((color) => (
                  <span key={color} style={{ background: color }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modules">
          <p className="label modules-label">{profile.modulesLabel}</p>
          <div className="grid-12 modules-grid">
            {profile.modules.map((module) => (
              <article key={module.code} className="module" data-reveal>
                <p className="module-code mono">{module.code}</p>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

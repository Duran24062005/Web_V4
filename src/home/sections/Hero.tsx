import type { CSSProperties } from 'react'
import { ArrowDown, FileDown } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useLocalTime } from '../../shared/hooks/useLocalTime'
import { useTypewriter } from '../../shared/hooks/useTypewriter'
import { careerStart, contactData, type HomeContent } from '../home.content'

interface HeroProps {
  content: HomeContent
  technologies: number
  caseStudies: number
}

const Chip = ({ chip }: { chip: HomeContent['hero']['chip'] }) => (
  <figure className="chip">
    <div className="chip-body">
      <ul className="chip-pins chip-pins-in" aria-hidden="true">
        {chip.inputs.map((pin, index) => (
          <li key={pin} style={{ '--pin': index } as CSSProperties}>
            <span className="pin-label">{pin}</span>
            <span className="pin-lead">
              <span className="pin-num">{index + 1}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="chip-package">
        <div className="chip-marking mono" aria-hidden="true">
          <span>
            {chip.designator} · {chip.part}
          </span>
          <span>REV {__APP_VERSION__.split('.').slice(0, 2).join('.')}</span>
        </div>
        <picture>
          <source
            type="image/avif"
            srcSet="/image/portrait-480.avif 480w, /image/portrait-720.avif 720w"
            sizes="(min-width: 1024px) 300px, 56vw"
          />
          <source
            type="image/webp"
            srcSet="/image/portrait-480.webp 480w, /image/portrait-720.webp 720w"
            sizes="(min-width: 1024px) 300px, 56vw"
          />
          <img
            src="/image/portrait-720.webp"
            alt={chip.photoAlt}
            width={720}
            height={987}
            fetchPriority="high"
          />
        </picture>
        <div className="chip-marking chip-marking-foot mono" aria-hidden="true">
          <span>ALEXI DURÁN GÓMEZ</span>
          <span>I/O 6</span>
        </div>
      </div>

      <ul className="chip-pins chip-pins-out" aria-hidden="true">
        {chip.outputs.map((pin, index) => (
          <li key={pin} style={{ '--pin': index + 3 } as CSSProperties}>
            <span className="pin-lead">
              <span className="pin-num">{chip.outputs.length * 2 - index}</span>
            </span>
            <span className="pin-label">{pin}</span>
          </li>
        ))}
      </ul>
    </div>
    <figcaption className="sr-only">{chip.caption}</figcaption>
  </figure>
)

export const Hero = ({ content, technologies, caseStudies }: HeroProps) => {
  const { locale } = useLanguage()
  const { hero } = content
  const { typed, done } = useTypewriter(hero.command)
  const localTime = useLocalTime(contactData.timeZone, locale)

  const metrics = [
    { value: String(careerStart.getFullYear()), label: hero.metrics.since },
    { value: String(content.experience.items.length), label: hero.metrics.companies },
    { value: String(technologies), label: hero.metrics.technologies },
    // Only shown once there is something to count.
    ...(caseStudies > 0 ? [{ value: String(caseStudies), label: hero.metrics.projects }] : []),
  ]

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="wrap grid-12 hero-grid">
        <div className="hero-copy">
          <p className="hero-term mono">
            <span className="sr-only">
              ~/alexi $ {hero.command}: {hero.output}
            </span>
            <span aria-hidden="true">
              <span className="term-prompt">~/alexi $</span> {typed}
              {!done ? <span className="term-caret" /> : null}
            </span>
          </p>
          <p className={`hero-term-output mono ${done ? 'is-shown' : ''}`} aria-hidden="true">
            {hero.output}
          </p>

          <h1 id="hero-title" className="hero-title">
            {hero.titleLead} <span className="accent">{hero.titleAccent}</span> {hero.titleTail}
            <span className="block-cursor" aria-hidden="true" />
          </h1>
          <p className="hero-subtitle">{hero.subtitle}</p>

          <div className="hero-ctas">
            <a href="#projects" className="button button-primary">
              {hero.primaryCta}
              <ArrowDown aria-hidden="true" />
            </a>
            <a href={contactData.cv} className="button" target="_blank" rel="noreferrer">
              <FileDown aria-hidden="true" />
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <Chip chip={hero.chip} />

          <dl className="status-panel mono" aria-label={hero.status.title}>
            <div>
              <dt>{hero.status.title}</dt>
              <dd className="status-live">
                <span className="led" aria-hidden="true" />
                {hero.status.available}
              </dd>
            </div>
            <div>
              <dt>{hero.status.stackKey}</dt>
              <dd>{hero.status.stackValue}</dd>
            </div>
            <div>
              <dt>{hero.status.locationKey}</dt>
              <dd>
                {hero.status.locationValue} ·{' '}
                <time aria-label={`${localTime} ${hero.status.localTime}`}>{localTime}</time>
              </dd>
            </div>
            <div>
              <dt>{hero.status.languagesKey}</dt>
              <dd>{hero.status.languagesValue}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="wrap">
        <dl className="metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="label">{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

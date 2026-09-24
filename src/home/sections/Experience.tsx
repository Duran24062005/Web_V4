import type { HomeContent } from '../home.content'
import { SectionHeader } from './SectionHeader'

interface ExperienceProps {
  content: HomeContent
  index: number
}

/** Inclusive month count between two `YYYY-MM` stamps. */
const monthsBetween = (start: string, end: string) => {
  const [startYear, startMonth] = start.split('-').map(Number)
  const [endYear, endMonth] = end.split('-').map(Number)
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1
}

const toDisplay = (stamp: string) => stamp.replace('-', '.')

export const Experience = ({ content, index }: ExperienceProps) => {
  const { experience } = content

  return (
    <section id="experience" className="section" aria-labelledby="experience-title" tabIndex={-1}>
      <div className="wrap">
        <SectionHeader
          id="experience"
          index={index}
          code={content.sections.experience.code}
          title={experience.title}
          description={experience.description}
        />

        <div className="log" data-reveal>
          <p className="log-command mono">
            <span className="term-prompt">~/alexi $</span> {experience.command}
          </p>
          <ol className="log-list">
            {experience.items.map((item) => {
              const months = monthsBetween(item.start, item.end)

              return (
                <li key={`${item.company}-${item.start}`} className="log-entry grid-12">
                  <div className="log-meta mono">
                    <p>
                      <time dateTime={item.start}>{toDisplay(item.start)}</time>
                      {' → '}
                      <time dateTime={item.end}>{toDisplay(item.end)}</time>
                    </p>
                    <p className="dim">
                      {months} {months === 1 ? experience.monthsSingular : experience.monthsPlural}
                    </p>
                  </div>
                  <div className="log-body">
                    <h3>
                      {item.role} <span className="log-at">@ {item.company}</span>
                    </h3>
                    <ul className="log-diff">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>
                          <span className="log-plus mono" aria-hidden="true">
                            +
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

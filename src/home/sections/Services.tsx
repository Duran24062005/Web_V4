import type { HomeContent } from '../home.content'
import { SectionHeader } from './SectionHeader'

interface ServicesProps {
  content: HomeContent
  index: number
}

export const Services = ({ content, index }: ServicesProps) => {
  const { services } = content

  return (
    <section id="services" className="section" aria-labelledby="services-title" tabIndex={-1}>
      <div className="wrap">
        <SectionHeader
          id="services"
          index={index}
          code={content.sections.services.code}
          title={services.title}
          description={services.description}
        />

        <div className="grid-12 endpoints">
          {services.items.map((service) => (
            <article key={service.endpoint} className="endpoint" data-reveal>
              <p className="endpoint-route mono">
                <span className="endpoint-method">POST</span> {service.endpoint}
              </p>
              <h3>{service.title}</h3>
              <p className="endpoint-description">{service.description}</p>
              <dl className="endpoint-io">
                <div>
                  <dt className="label">{services.keys.input}</dt>
                  <dd>{service.input}</dd>
                </div>
                <div>
                  <dt className="label">{services.keys.output}</dt>
                  <dd>{service.output}</dd>
                </div>
                <div>
                  <dt className="label">{services.keys.deliverables}</dt>
                  <dd>
                    <ul className="tag-list">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="tag">
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

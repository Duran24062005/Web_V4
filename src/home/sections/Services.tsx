import { useRef } from 'react'
import { gsap } from 'gsap'
import { audio } from '../../experience/audio/engine'
import { useScene } from '../../experience/motion/useScene'
import type { HomeContent } from '../home.content'
import { EpisodeHeader } from './EpisodeHeader'

interface ServicesProps {
  content: HomeContent
}

/**
 * EP.05 CONTRACTS — each service is an API contract: request line, input, output and
 * deliverables. Cards glitch in through horizontal slices with an RGB split; in safe mode they
 * print top to bottom like a receipt instead.
 */
export const Services = ({ content }: ServicesProps) => {
  const { services } = content
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (root, { onEnter, safe }) => {
    const cards = gsap.utils.toArray<HTMLElement>('.yk-contract', root)
    const timeline = gsap.timeline({ scrollTrigger: onEnter('.yk-contracts', 'top 78%') })

    if (safe) {
      timeline.from(cards, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.15,
      })
      return
    }

    timeline.add(() => audio.play('glitch'), 0)
    cards.forEach((card, index) => {
      timeline.fromTo(
        card,
        { clipPath: 'inset(48% 0% 48% 0%)', x: -24, autoAlpha: 0 },
        {
          keyframes: [
            { clipPath: 'inset(12% 0% 70% 0%)', x: 18, autoAlpha: 1, duration: 0.06 },
            { clipPath: 'inset(62% 0% 6% 0%)', x: -10, duration: 0.06 },
            { clipPath: 'inset(30% 0% 38% 0%)', x: 6, duration: 0.05 },
            { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 0.08 },
          ],
          ease: 'none',
        },
        index * 0.16,
      )
      timeline.from(
        card,
        {
          '--rgb': 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        index * 0.16 + 0.1,
      )
    })
  })

  return (
    <section ref={ref} id="services" className="yk-episode yk-contracts-ep" aria-labelledby="services-title" tabIndex={-1}>
      <div className="wrap">
        <EpisodeHeader
          id="services"
          code={content.sections.services.code}
          title={services.title}
          description={services.description}
        />

        <div className="yk-contracts">
          {services.items.map((service) => (
            <article key={service.endpoint} className="yk-contract">
              <p className="yk-contract-req">
                <span className="yk-contract-method">POST</span>
                <span className="yk-contract-path">{service.endpoint}</span>
                <span className="yk-contract-status" aria-hidden="true">
                  200 OK
                </span>
              </p>
              <h3>{service.title}</h3>
              <p className="yk-contract-desc">{service.description}</p>
              <dl className="yk-contract-io">
                <div>
                  <dt>{services.keys.input}</dt>
                  <dd>{service.input}</dd>
                </div>
                <div>
                  <dt>{services.keys.output}</dt>
                  <dd>{service.output}</dd>
                </div>
                <div>
                  <dt>{services.keys.deliverables}</dt>
                  <dd>
                    <ul className="yk-tags">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable}>{deliverable}</li>
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

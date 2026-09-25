import { useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import { useScene } from '../experience/motion/useScene'
import { useLanguage } from '../i18n/LanguageContext'
import { LocalizedLink } from '../i18n/LocalizedLink'
import { getCopy } from '../i18n/copy'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { PageHero } from '../shared/components/PageHero'
import { NeonRouteLink } from '../shared/neon/NeonRouteLink'
import { getServicesPageContent } from './services.content'

type ServiceCard = ReturnType<typeof getServicesPageContent>['cards'][number]

const ContractCard = ({
  card,
  index,
  link,
  wide = false,
}: {
  card: ServiceCard
  index: number
  link: { to: string; label: string }
  wide?: boolean
}) => {
  const Icon = card.icon

  return (
    <article className={`yk-service ${wide ? 'is-wide' : ''}`.trim()}>
      <div className="yk-service-copy">
        <p className="yk-service-head" aria-hidden="true">
          <span className="yk-service-icon">
            <Icon />
          </span>
          <span className="hud-label">C-{String(index + 1).padStart(2, '0')}</span>
        </p>
        <h3>{card.title}</h3>
        <p className="yk-service-desc">{card.description}</p>
        {!wide ? (
          <ul className="yk-service-features">
            {card.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : null}
        <LocalizedLink to={link.to} className="yk-hud-link">
          {link.label}
          <ArrowRight aria-hidden="true" />
        </LocalizedLink>
      </div>
      {wide ? (
        <div className="yk-service-media">
          <img src="/image/setup.jpg" alt="Espacio de trabajo y desarrollo" loading="lazy" decoding="async" />
        </div>
      ) : null}
    </article>
  )
}

/**
 * /services — the contract board. Cards swing open like doors (3D turn on their left edge),
 * one after another; the closing call to action is stamped in.
 */
export const Services = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)
  const content = getServicesPageContent(language)
  const ref = useRef<HTMLDivElement>(null)

  useScene(ref, (_root, { onEnter }) => {
    gsap.from('.yk-service', {
      rotationY: -85,
      transformOrigin: '0% 50%',
      transformPerspective: 1200,
      autoAlpha: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: onEnter('.yk-service-grid', 'top 82%'),
    })
    gsap.from('.yk-page-cta', {
      scale: 1.25,
      rotation: -3,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      scrollTrigger: onEnter('.yk-page-cta', 'top 80%'),
    })
  })

  const exploreLink = { to: '/contact', label: copy.common.exploreCapabilities }

  return (
    <CuratedPageShell activePath="/services">
      <main className="yk-page">
        <div ref={ref} className="wrap">
          <PageHero
            code="FILE // CONTRACT BOARD"
            kana="契約書"
            eyebrow={content.heroEyebrow}
            titleLead={content.heroTitleLead}
            titleAccent={content.heroTitleAccent}
            body={content.heroBody}
          />

          <section className="yk-service-grid">
            {content.cards.slice(0, 3).map((card, index) => (
              <ContractCard key={card.title} card={card} index={index} link={exploreLink} />
            ))}
            <ContractCard
              card={content.cards[3]}
              index={3}
              wide
              link={{ to: '/projects', label: copy.common.viewRelatedProjects }}
            />
            <ContractCard card={content.cards[4]} index={4} link={{ to: '/contact', label: copy.common.letsTalk }} />
          </section>

          <section className="yk-page-cta" aria-labelledby="services-cta-title">
            <p className="hud-label text-neon-cyan">{copy.common.nextStep}</p>
            <h2 id="services-cta-title">
              {content.ctaTitleLead} <span className="text-neon-magenta">{content.ctaTitleAccent}</span>{' '}
              {content.ctaTitleTail}
            </h2>
            <p>{content.ctaBody}</p>
            <div className="yk-page-cta-actions">
              <NeonRouteLink to="/contact" size="lg">
                {copy.common.startConversation}
              </NeonRouteLink>
              <NeonRouteLink to="/projects" variant="ghost" size="lg">
                {copy.common.viewProjects}
              </NeonRouteLink>
            </div>
          </section>
        </div>
      </main>
    </CuratedPageShell>
  )
}

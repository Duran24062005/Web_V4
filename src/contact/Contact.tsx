import { useRef, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { Github, Instagram, Linkedin, Mail, MessageSquare, Send, Timer } from 'lucide-react'
import { contactData } from '../home/home.content'
import { useScene } from '../experience/motion/useScene'
import { useLanguage } from '../i18n/LanguageContext'
import { getCopy } from '../i18n/copy'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { PageHero } from '../shared/components/PageHero'
import { NeonButton } from '../shared/neon/NeonButton'
import { HudPanel } from '../shared/neon/primitives'

const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`

/** Portrait as a manga panel with action lines, for the page hero. */
const PortraitPanel = () => (
  <figure className="yk-contact-portrait">
    <div className="yk-contact-portrait-frame">
      <img src="/image/perfil2.jpg" alt="Alexi Durán Gómez" loading="eager" decoding="async" />
      <span className="yk-contact-portrait-lines speedlines" aria-hidden="true" />
    </div>
    <figcaption className="hud-label" aria-hidden="true">
      SIGNAL // ONLINE
    </figcaption>
  </figure>
)

/**
 * /contact — the uplink terminal. Info cards on the left; on the right the form boots field
 * by field (label types in, the input line draws). Submitting still opens a prefilled email.
 */
export const Contact = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)
  const ref = useRef<HTMLDivElement>(null)
  const whatsAppUrl = buildWhatsAppLink(
    contactData.whatsapp,
    language === 'es'
      ? 'Hola Alexi, quiero conversar sobre un proyecto web y conocer tu disponibilidad.'
      : 'Hi Alexi, I would like to talk about a web project and learn about your availability.',
  )

  useScene(ref, (_root, { onEnter }) => {
    gsap.from('.yk-contact-info > *', {
      x: -40,
      skewX: -8,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: onEnter('.yk-contact-grid', 'top 85%'),
    })

    const fields = gsap.utils.toArray<HTMLElement>('.yk-field')
    const timeline = gsap.timeline({ scrollTrigger: onEnter('.yk-contact-form', 'top 80%') })
    timeline.from('.yk-contact-form-head > *', { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.6, stagger: 0.1 })
    fields.forEach((field, index) => {
      const label = field.querySelector('label')
      timeline
        .from(label, { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.4, ease: 'steps(12)' }, 0.3 + index * 0.18)
        .from(
          field.querySelector('input, select, textarea'),
          { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.6, ease: 'power3.inOut' },
          0.4 + index * 0.18,
        )
    })
    timeline.from('.yk-contact-submit', { autoAlpha: 0, y: 20, duration: 0.5 }, '-=0.2')
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const interest = String(formData.get('interest') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const subject = encodeURIComponent(
      `${copy.contactPage.mailSubjectPrefix}: ${interest || copy.contactPage.generalInquiry}`,
    )
    const body = encodeURIComponent(
      `${copy.contactPage.nameLabel}: ${name}\n${copy.common.email}: ${email}\n${copy.contactPage.interestLabel}: ${interest}\n\n${copy.contactPage.messageLabel}:\n${message}`,
    )

    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`
  }

  return (
    <CuratedPageShell activePath="/contact">
      <main className="yk-page">
        <div ref={ref} className="wrap">
          <PageHero
            code="FILE // UPLINK TERMINAL"
            kana="通信端末"
            titleLead={copy.contactPage.heroTitleLead}
            titleAccent={copy.contactPage.heroTitleAccent}
            body={copy.contactPage.heroBody}
            aside={<PortraitPanel />}
          />

          <section className="yk-contact-grid">
            <div className="yk-contact-info">
              <HudPanel as="article" tab="LOC // 位置">
                <h3 className="yk-info-title">
                  <MessageSquare aria-hidden="true" />
                  {copy.common.locationReach}
                </h3>
                <p className="yk-info-big">Colombia</p>
                <p className="yk-info-note">{copy.contactPage.locationLabel}</p>
              </HudPanel>

              <HudPanel as="article" tab="CH // 回線" tone="magenta">
                <h3 className="yk-info-title">{copy.common.directChannels}</h3>
                <ul className="yk-channels">
                  <li>
                    <a href={`mailto:${contactData.email}`} className="yk-channel">
                      <Mail aria-hidden="true" />
                      <span>
                        <span className="hud-label">{copy.common.email}</span>
                        <span className="yk-channel-value">{contactData.email}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={whatsAppUrl} target="_blank" rel="noreferrer" className="yk-channel">
                      <MessageSquare aria-hidden="true" />
                      <span>
                        <span className="hud-label">{copy.common.whatsapp}</span>
                        <span className="yk-channel-value">{contactData.whatsapp}</span>
                      </span>
                    </a>
                  </li>
                  <li className="yk-channel">
                    <Timer aria-hidden="true" />
                    <span>
                      <span className="hud-label">{copy.common.response}</span>
                      <span className="yk-channel-value">{copy.contactPage.responseValue}</span>
                    </span>
                  </li>
                </ul>
              </HudPanel>

              <HudPanel as="article" tab="NET // 網" tone="violet">
                <h3 className="yk-info-title">{copy.contactPage.followProcessTitle}</h3>
                <ul className="yk-socials-row">
                  <li>
                    <a href={contactData.github} target="_blank" rel="noreferrer" className="yk-social" aria-label="GitHub">
                      <Github aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href={contactData.linkedin} target="_blank" rel="noreferrer" className="yk-social" aria-label="LinkedIn">
                      <Linkedin aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={contactData.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="yk-social"
                      aria-label="Instagram"
                    >
                      <Instagram aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </HudPanel>
            </div>

            <section className="yk-contact-form" aria-labelledby="contact-form-title">
              <div className="yk-contact-form-head">
                <p className="yk-term-bar hud-label" aria-hidden="true">
                  <span>tty3</span>
                  <span>uplink.form</span>
                </p>
                <h2 id="contact-form-title">{copy.common.sendMessage}</h2>
                <p>{copy.contactPage.sendMessageDescription}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="yk-form-row">
                  <div className="yk-field">
                    <label htmlFor="contact-name">{copy.common.fullName}</label>
                    <input
                      id="contact-name"
                      name="fullName"
                      placeholder={copy.contactPage.yourName}
                      required
                      type="text"
                      autoComplete="name"
                    />
                    <span className="yk-field-line" aria-hidden="true" />
                  </div>
                  <div className="yk-field">
                    <label htmlFor="contact-email">{copy.common.emailAddress}</label>
                    <input
                      id="contact-email"
                      name="email"
                      placeholder="tu@email.com"
                      required
                      type="email"
                      autoComplete="email"
                    />
                    <span className="yk-field-line" aria-hidden="true" />
                  </div>
                </div>

                <div className="yk-field">
                  <label htmlFor="contact-interest">{copy.common.interestType}</label>
                  <select id="contact-interest" name="interest">
                    <option>{copy.contactPage.fullStack}</option>
                    <option>{copy.contactPage.frontend}</option>
                    <option>{copy.contactPage.backend}</option>
                    <option>{copy.contactPage.consulting}</option>
                    <option>{copy.contactPage.other}</option>
                  </select>
                  <span className="yk-field-line" aria-hidden="true" />
                </div>

                <div className="yk-field">
                  <label htmlFor="contact-message">{copy.common.message}</label>
                  <textarea id="contact-message" name="message" placeholder={copy.contactPage.yourIdea} required rows={5} />
                  <span className="yk-field-line" aria-hidden="true" />
                </div>

                <div className="yk-contact-submit">
                  <NeonButton as="button" type="submit" size="lg" icon={<Send aria-hidden="true" />} data-sfx="start">
                    {copy.contactPage.submit}
                  </NeonButton>
                </div>
              </form>
            </section>
          </section>
        </div>
      </main>
    </CuratedPageShell>
  )
}

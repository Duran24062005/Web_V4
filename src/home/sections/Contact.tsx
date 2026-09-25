import { useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight, Copy, Linkedin, Mail } from 'lucide-react'
import { siFacebook, siGithub, siInstagram, siWhatsapp } from 'simple-icons'
import { Mascot } from '../../experience/mascot/Mascot'
import { useScene } from '../../experience/motion/useScene'
import { BrandIcon } from '../../shared/components/BrandIcon'
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard'
import { NeonButton } from '../../shared/neon/NeonButton'
import { Kana } from '../../shared/neon/primitives'
import { buildWhatsAppLink, contactData, type HomeContent } from '../home.content'
import { EpisodeHeader } from './EpisodeHeader'

interface ContactProps {
  content: HomeContent
}

const socials = [
  { label: 'GitHub', href: contactData.github, icon: <BrandIcon icon={siGithub} size={18} /> },
  { label: 'LinkedIn', href: contactData.linkedin, icon: <Linkedin aria-hidden="true" width={18} height={18} /> },
  { label: 'Instagram', href: contactData.instagram, icon: <BrandIcon icon={siInstagram} size={18} /> },
  { label: 'Facebook', href: contactData.facebook, icon: <BrandIcon icon={siFacebook} size={18} /> },
]

/**
 * EP.06 UPLINK — the final episode. The scene opens with an iris from DG-01's position, the
 * mascot pops in and waves, and the terminal is where you actually copy the address.
 */
export const Contact = ({ content }: ContactProps) => {
  const { contact, sections } = content
  const { status, copy } = useCopyToClipboard()
  const whatsappUrl = buildWhatsAppLink(contactData.whatsapp, contact.whatsappMessage)
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (_root, { onEnter }) => {
    gsap
      .timeline({ scrollTrigger: onEnter('.yk-uplink-stage', 'top 75%') })
      .from('.yk-uplink-stage', { clipPath: 'circle(0% at 78% 42%)', duration: 1.3, ease: 'expo.inOut' }, 0)
      .from('.dg-mascot', { scale: 0, yPercent: 30, rotation: -12, duration: 0.9, ease: 'elastic.out(1, 0.5)' }, 0.55)
      .from('.yk-uplink-bubble', { scale: 0, transformOrigin: '0% 100%', duration: 0.4, ease: 'back.out(3)' }, 1.1)
      .from('.yk-uplink-terminal', { rotationX: -80, transformPerspective: 900, transformOrigin: '50% 0%', duration: 0.9, ease: 'expo.out' }, 0.7)
      .from('.yk-social', { scale: 0, rotation: 45, stagger: 0.06, duration: 0.5, ease: 'back.out(2.5)' }, 0.9)
  })

  return (
    <section ref={ref} id="contact" className="yk-episode yk-uplink" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="yk-uplink-stage">
        <div className="wrap yk-uplink-grid">
          <div className="yk-uplink-copy">
            <EpisodeHeader
              id="contact"
              code={sections.contact.code}
              title={
                <>
                  {contact.titleLead} <span className="yk-uplink-accent">{contact.titleAccent}</span>
                  {contact.titleTail}
                </>
              }
            />
            <p className="yk-uplink-desc">{contact.description}</p>

            <div className="yk-uplink-ctas">
              <NeonButton href={`mailto:${contactData.email}`} size="lg" icon={<Mail aria-hidden="true" />}>
                {contact.email}
              </NeonButton>
              <NeonButton
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="lg"
                glitchText={contact.whatsapp}
                icon={<ArrowUpRight aria-hidden="true" />}
              >
                <BrandIcon icon={siWhatsapp} size={16} /> {contact.whatsapp}
              </NeonButton>
            </div>

            <div className="yk-socials">
              <p className="hud-label">{contact.networks}</p>
              <ul>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="yk-social"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="yk-uplink-visual">
            <div className="yk-uplink-mascot">
              <Mascot />
              <p className="yk-uplink-bubble" aria-hidden="true">
                <Kana>通信中…</Kana>
              </p>
            </div>

            <div className="yk-uplink-terminal">
              <p className="yk-term-bar hud-label" aria-hidden="true">
                <span>tty2</span>
                <span>mail</span>
              </p>
              <div className="yk-term-body">
                <p>
                  <span className="text-neon-magenta">~/alexi $</span> {contact.command}
                </p>
                <div className="yk-term-email">
                  <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                  <button type="button" className="yk-copy" onClick={() => void copy(contactData.email)}>
                    <Copy aria-hidden="true" />
                    {contact.copy}
                  </button>
                </div>
                <p className="yk-term-status" role="status" aria-live="polite">
                  {status === 'copied' ? (
                    <>
                      <span className="text-neon-cyan">[ok]</span> {contact.copied}
                    </>
                  ) : null}
                  {status === 'error' ? (
                    <>
                      <span className="text-neon-warn">[err]</span> {contact.copyFailed}
                    </>
                  ) : null}
                </p>
                <p className="text-mute"># {contact.responseTime}</p>
                <p aria-hidden="true">
                  <span className="text-neon-magenta">~/alexi $</span> <span className="yk-caret animate-blink" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

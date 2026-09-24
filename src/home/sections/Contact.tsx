import { ArrowUpRight, Copy, Linkedin, Mail } from 'lucide-react'
import { siFacebook, siGithub, siInstagram, siWhatsapp } from 'simple-icons'
import { BrandIcon } from '../../shared/components/BrandIcon'
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard'
import { buildWhatsAppLink, contactData, type HomeContent } from '../home.content'

interface ContactProps {
  content: HomeContent
  index: number
}

const socials = [
  { label: 'GitHub', href: contactData.github, icon: <BrandIcon icon={siGithub} size={18} /> },
  { label: 'LinkedIn', href: contactData.linkedin, icon: <Linkedin aria-hidden="true" width={18} height={18} /> },
  { label: 'Instagram', href: contactData.instagram, icon: <BrandIcon icon={siInstagram} size={18} /> },
  { label: 'Facebook', href: contactData.facebook, icon: <BrandIcon icon={siFacebook} size={18} /> },
]

export const Contact = ({ content, index }: ContactProps) => {
  const { contact, sections } = content
  const { status, copy } = useCopyToClipboard()
  const whatsappUrl = buildWhatsAppLink(contactData.whatsapp, contact.whatsappMessage)

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="wrap">
        <div className="grid-12 contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="section-index label">
              <span className="section-num">§{String(index).padStart(2, '0')}</span>
              <span>{sections.contact.code}</span>
            </p>
            <h2 id="contact-title" className="contact-title">
              {contact.titleLead} <span className="accent">{contact.titleAccent}</span>
              {contact.titleTail}
            </h2>
            <p className="body-copy">{contact.description}</p>

            <div className="hero-ctas">
              <a href={`mailto:${contactData.email}`} className="button button-primary">
                <Mail aria-hidden="true" />
                {contact.email}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button">
                <BrandIcon icon={siWhatsapp} size={16} />
                {contact.whatsapp}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>

            <div className="socials">
              <p className="label">{contact.networks}</p>
              <ul>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="terminal contact-terminal" data-reveal>
            <p className="terminal-bar mono" aria-hidden="true">
              <span>tty2</span>
              <span>mail</span>
            </p>
            <div className="terminal-body mono">
              <p className="terminal-line">
                <span className="term-prompt">~/alexi $</span> {contact.command}
              </p>
              <div className="terminal-email">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                <button type="button" className="copy-button" onClick={() => void copy(contactData.email)}>
                  <Copy aria-hidden="true" />
                  {contact.copy}
                </button>
              </div>
              <p className="terminal-status" role="status" aria-live="polite">
                {status === 'copied' ? (
                  <>
                    <span className="ok">[ok]</span> {contact.copied}
                  </>
                ) : null}
                {status === 'error' ? (
                  <>
                    <span className="err">[err]</span> {contact.copyFailed}
                  </>
                ) : null}
              </p>
              <p className="terminal-line dim"># {contact.responseTime}</p>
              <p className="terminal-line" aria-hidden="true">
                <span className="term-prompt">~/alexi $</span> <span className="term-caret" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

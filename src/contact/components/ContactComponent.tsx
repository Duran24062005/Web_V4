import { Mail, MessageSquare, Send, User } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'
import handleWhatsAppContact from '../hook/useWhats'

export const ContactComponent = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <section id="contact" className="relative z-20 mb-16 py-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold gradient-text md:text-6xl">{copy.recruiter.contact.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{copy.recruiter.contact.description}</p>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-semibold">{copy.recruiter.contact.contactInfo}</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-purple-800 bg-card/50 backdrop-blur">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">{copy.common.email}</h4>
                        <p className="text-violet-400">alexisdurangomez588@gmail.com</p>
                        <p className="text-sm text-muted-foreground">{copy.common.responseTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-purple-800 bg-card/50 backdrop-blur">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-green-500/10 p-3">
                        <MessageSquare className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 font-semibold">WhatsApp</h4>
                        <p className="mb-3 text-sm text-muted-foreground">{copy.common.directResponse}</p>
                        <button
                          onClick={() => handleWhatsAppContact(language)}
                          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {copy.common.openWhatsapp}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="rounded-lg border border-purple-800 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur">
                <div className="p-8">
                  <h4 className="mb-2 text-lg font-semibold">{copy.common.preferOtherChannel}</h4>
                  <p className="text-sm text-muted-foreground">{copy.common.otherChannelDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-purple-800 bg-card shadow-xl">
            <div className="p-8">
              <form id="contact-form" className="space-y-6">
                <div className="mb-6 flex justify-center">
                  <p
                    className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-600 dark:bg-green-950/30 dark:text-green-400"
                    id="success"
                  >
                    {copy.common.emailForm}
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="from_name" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {copy.common.fullName}
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    placeholder={copy.contactPage.yourName}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {copy.common.emailAddress}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    {copy.common.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={copy.contactPage.yourIdea}
                    className="flex resize-none w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="h-11 w-full inline-flex items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors ring-offset-background hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {copy.common.sendMessage}
                </button>

                <p className="text-center text-xs text-muted-foreground">{copy.common.submitFormConsent}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

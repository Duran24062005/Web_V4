import type { FormEvent } from 'react'
import { Github, Instagram, Linkedin, Mail, MessageSquare, Timer } from 'lucide-react'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { homeContent } from '../home/home.content'

const buildWhatsAppLink = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`

export const Contact = () => {
  const whatsAppUrl = buildWhatsAppLink(
    homeContent.contact.whatsapp,
    homeContent.contact.whatsappMessage,
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const interest = String(formData.get('interest') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const subject = encodeURIComponent(`Nuevo contacto desde portafolio: ${interest || 'Consulta general'}`)
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nInterés: ${interest}\n\nMensaje:\n${message}`,
    )

    window.location.href = `mailto:${homeContent.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <CuratedPageShell activePath="/contact">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-32 md:px-8">
        <section className="mb-24 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="mb-6 font-headline text-5xl font-extrabold leading-none tracking-[-0.06em] md:text-7xl">
              Iniciar una{' '}
              <span className="font-editorial font-medium italic text-[var(--curated-accent)]">
                conversación
              </span>
            </h1>
            <p className="max-w-3xl font-editorial text-xl leading-relaxed text-[var(--curated-muted)] md:text-2xl">
              Si ya tienes un proyecto definido o todavía estás aterrizando la idea, puedo ayudarte a traducirlo a una solución web clara y técnicamente sólida.
            </p>
          </div>

          <div className="flex justify-end lg:col-span-5">
            <div className="relative aspect-square w-full max-w-sm">
              <div className="absolute inset-0 rounded-full bg-[var(--curated-accent)] opacity-5 blur-3xl" />
              <img
                src="/image/perfil2.jpg"
                alt="Alexi Durán Gómez"
                className="h-full w-full rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-1">
            <article className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface)] p-8">
              <div className="mb-6 flex items-center gap-4">
                <MessageSquare className="h-7 w-7 text-[var(--curated-accent)]" />
                <h3 className="font-headline text-lg font-bold">Ubicación y alcance</h3>
              </div>
              <p className="mb-2 font-editorial text-xl italic text-[var(--curated-text)]">
                Colombia
              </p>
              <p className="font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                Disponible para trabajo remoto y colaboraciones internacionales
              </p>
            </article>

            <article className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface)] p-8">
              <h3 className="mb-8 font-headline text-lg font-bold">Canales directos</h3>
              <div className="space-y-6">
                <a href={`mailto:${homeContent.contact.email}`} className="group flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--curated-surface-strong)] transition-colors group-hover:bg-[rgba(253,197,98,0.12)]">
                    <Mail className="h-5 w-5 text-[var(--curated-accent)]" />
                  </div>
                  <div>
                    <p className="font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                      Email
                    </p>
                    <p className="font-editorial text-lg transition-colors group-hover:text-[var(--curated-accent)]">
                      {homeContent.contact.email}
                    </p>
                  </div>
                </a>

                <a href={whatsAppUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--curated-surface-strong)] transition-colors group-hover:bg-[rgba(253,197,98,0.12)]">
                    <MessageSquare className="h-5 w-5 text-[var(--curated-accent)]" />
                  </div>
                  <div>
                    <p className="font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                      WhatsApp
                    </p>
                    <p className="font-editorial text-lg transition-colors group-hover:text-[var(--curated-accent)]">
                      {homeContent.contact.whatsapp}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--curated-surface-strong)]">
                    <Timer className="h-5 w-5 text-[var(--curated-accent)]" />
                  </div>
                  <div>
                    <p className="font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                      Respuesta
                    </p>
                    <p className="font-editorial text-lg">Dentro de 24 horas hábiles</p>
                  </div>
                </div>
              </div>
            </article>

            <article className="border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface)] p-8">
              <h3 className="mb-6 font-headline text-lg font-bold">Seguir proceso</h3>
              <div className="flex gap-4">
                <a
                  href={homeContent.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center bg-[var(--curated-surface-strong)] transition-all hover:text-[var(--curated-accent)]"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={homeContent.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center bg-[var(--curated-surface-strong)] transition-all hover:text-[var(--curated-accent)]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={homeContent.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center bg-[var(--curated-surface-strong)] transition-all hover:text-[var(--curated-accent)]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </article>
          </div>

          <section className="relative overflow-hidden bg-[var(--curated-surface-strong)] p-8 md:p-12 lg:col-span-2">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--curated-accent)] opacity-[0.03] blur-3xl" />
            <h2 className="mb-2 font-headline text-3xl font-bold">Enviar mensaje</h2>
            <p className="mb-10 font-editorial text-lg italic text-[var(--curated-muted)]">
              Consulta sobre proyecto, colaboración o una conversación técnica inicial.
            </p>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="group relative">
                  <label className="mb-2 block font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors group-focus-within:text-[var(--curated-accent)]">
                    Nombre completo
                  </label>
                  <input
                    className="w-full border-0 border-b border-[rgba(153,144,124,0.3)] bg-transparent px-0 py-3 font-editorial text-xl text-[var(--curated-text)] placeholder:text-[rgba(200,198,197,0.2)] focus:border-[var(--curated-accent)] focus:outline-none"
                    name="fullName"
                    placeholder="Tu nombre"
                    required
                    type="text"
                  />
                </div>

                <div className="group relative">
                  <label className="mb-2 block font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors group-focus-within:text-[var(--curated-accent)]">
                    Correo electrónico
                  </label>
                  <input
                    className="w-full border-0 border-b border-[rgba(153,144,124,0.3)] bg-transparent px-0 py-3 font-editorial text-xl text-[var(--curated-text)] placeholder:text-[rgba(200,198,197,0.2)] focus:border-[var(--curated-accent)] focus:outline-none"
                    name="email"
                    placeholder="tu@email.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="mb-2 block font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors group-focus-within:text-[var(--curated-accent)]">
                  Tipo de interés
                </label>
                <select
                  className="w-full cursor-pointer appearance-none border-0 border-b border-[rgba(153,144,124,0.3)] bg-transparent px-0 py-3 font-editorial text-xl text-[var(--curated-text)] focus:border-[var(--curated-accent)] focus:outline-none"
                  name="interest"
                >
                  <option className="bg-[var(--curated-surface-strong)]">Desarrollo full stack</option>
                  <option className="bg-[var(--curated-surface-strong)]">Frontend</option>
                  <option className="bg-[var(--curated-surface-strong)]">Backend</option>
                  <option className="bg-[var(--curated-surface-strong)]">Consultoría técnica</option>
                  <option className="bg-[var(--curated-surface-strong)]">Otro</option>
                </select>
              </div>

              <div className="group relative">
                <label className="mb-2 block font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors group-focus-within:text-[var(--curated-accent)]">
                  Mensaje
                </label>
                <textarea
                  className="w-full resize-none border-0 border-b border-[rgba(153,144,124,0.3)] bg-transparent px-0 py-3 font-editorial text-xl text-[var(--curated-text)] placeholder:text-[rgba(200,198,197,0.2)] focus:border-[var(--curated-accent)] focus:outline-none"
                  name="message"
                  placeholder="Cuéntame sobre tu idea, necesidad o contexto."
                  required
                  rows={4}
                />
              </div>

              <div className="pt-4">
                <button
                  className="group relative flex items-center gap-4 overflow-hidden bg-[var(--curated-accent)] px-10 py-4 font-label text-sm font-bold uppercase tracking-[0.24em] text-[#422c00] shadow-[0_10px_30px_-10px_rgba(253,197,98,0.4)] transition-all hover:pr-14"
                  type="submit"
                >
                  <span className="relative z-10">Enviar mensaje</span>
                  <span className="absolute right-6 opacity-0 transition-all group-hover:opacity-100">→</span>
                </button>
              </div>
            </form>
          </section>
        </section>
      </main>
    </CuratedPageShell>
  )
}

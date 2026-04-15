import { ArrowRight } from 'lucide-react'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { useLanguage } from '../i18n/LanguageContext'
import { LocalizedLink } from '../i18n/LocalizedLink'
import { getCopy } from '../i18n/copy'
import { getServicesPageContent } from './services.content'

export const Services = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)
  const servicesPageContent = getServicesPageContent(language)
  const FullStackIcon = servicesPageContent.cards[3].icon
  const OptimizationIcon = servicesPageContent.cards[4].icon

  return (
    <CuratedPageShell activePath="/services">
      <main className="mx-auto max-w-[1440px] overflow-hidden px-4 pb-24 pt-32 md:px-8">
        <section className="relative mb-24 md:mb-32">
          <div className="absolute -left-24 top-0 h-72 w-72 bg-[radial-gradient(circle,rgba(253,197,98,0.08),transparent_70%)]" />

          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="mb-4 block font-label text-sm uppercase tracking-[0.3em] text-[var(--curated-accent)]">
                {servicesPageContent.heroEyebrow}
              </span>
              <h1 className="font-headline text-5xl font-extrabold leading-[0.9] tracking-[-0.06em] md:text-7xl xl:text-8xl">
                {servicesPageContent.heroTitleLead}
                <br />
                <span className="font-editorial font-normal italic text-[var(--curated-muted)]">
                  {servicesPageContent.heroTitleAccent}
                </span>
              </h1>
            </div>

            <div className="pb-2 lg:col-span-4">
              <p className="font-editorial text-xl leading-relaxed text-[var(--curated-muted)] md:text-2xl">
                {servicesPageContent.heroBody}
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesPageContent.cards.slice(0, 3).map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-[var(--curated-surface)] p-10 transition-all duration-500 hover:bg-[var(--curated-surface-strong)]"
              >
                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--curated-surface-lowest)] text-[var(--curated-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-4 font-headline text-3xl font-bold">{service.title}</h3>
                  <p className="mb-8 font-editorial text-lg italic text-[var(--curated-muted)]">
                    {service.description}
                  </p>
                  <ul className="mb-12 space-y-3 font-label text-sm text-[var(--curated-muted)]">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--curated-accent)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="z-10 mt-auto">
                  <LocalizedLink
                    to="/contact"
                    className="inline-flex items-center gap-2 font-label text-sm font-bold tracking-wide text-[var(--curated-accent)]"
                  >
                    {copy.common.exploreCapabilities.toUpperCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </LocalizedLink>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--curated-accent)] transition-all duration-700 group-hover:w-full" />
              </article>
            )
          })}

          <article className="group relative flex flex-col gap-12 overflow-hidden bg-[var(--curated-surface)] p-12 transition-all duration-500 hover:bg-[var(--curated-surface-strong)] lg:col-span-2 md:flex-row">
            <div className="md:w-1/2">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--curated-surface-lowest)] text-[var(--curated-accent)]">
                <FullStackIcon className="h-5 w-5" />
              </div>
              <h3 className="mb-6 font-headline text-4xl font-bold">
                {servicesPageContent.cards[3].title}
              </h3>
              <p className="mb-8 font-editorial text-xl italic text-[var(--curated-muted)]">
                {servicesPageContent.cards[3].description}
              </p>
              <LocalizedLink
                to="/projects"
                className="inline-flex items-center gap-2 font-label text-sm font-bold tracking-wide text-[var(--curated-accent)]"
              >
                {copy.common.viewRelatedProjects.toUpperCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </div>

            <div className="relative min-h-[240px] overflow-hidden border border-[rgba(153,144,124,0.12)] md:w-1/2">
              <img
                src="/image/setup.jpg"
                alt="Espacio de trabajo y desarrollo"
                className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-1000 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--curated-surface)] via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--curated-accent)] transition-all duration-700 group-hover:w-full" />
          </article>

          <article className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-[var(--curated-surface)] p-10 transition-all duration-500 hover:bg-[var(--curated-surface-strong)]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--curated-surface-lowest)] text-[var(--curated-accent)]">
                <OptimizationIcon className="h-5 w-5" />
              </div>
              <h3 className="mb-4 font-headline text-3xl font-bold">
                {servicesPageContent.cards[4].title}
              </h3>
              <p className="mb-8 font-editorial text-lg italic text-[var(--curated-muted)]">
                {servicesPageContent.cards[4].description}
              </p>
              <ul className="mb-12 space-y-3 font-label text-sm text-[var(--curated-muted)]">
                {servicesPageContent.cards[4].features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--curated-accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="z-10 mt-auto">
              <LocalizedLink
                to="/contact"
                className="inline-flex items-center gap-2 font-label text-sm font-bold tracking-wide text-[var(--curated-accent)]"
              >
                {copy.common.letsTalk.toUpperCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--curated-accent)] transition-all duration-700 group-hover:w-full" />
          </article>
        </section>

        <section className="relative mt-32 overflow-hidden bg-[var(--curated-surface)] px-8 py-20 text-center md:px-12 md:py-24">
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_center,rgba(253,197,98,0.12),transparent_70%)]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="mb-6 block font-label text-xs uppercase tracking-[0.3em] text-[var(--curated-muted)]">
              {copy.common.nextStep}
            </span>
            <h2 className="mb-8 font-headline text-5xl font-bold tracking-[-0.05em] md:text-6xl">
              {servicesPageContent.ctaTitleLead}{' '}
              <span className="font-editorial font-normal italic text-[var(--curated-accent)]">
                {servicesPageContent.ctaTitleAccent}
              </span>{' '}
              {servicesPageContent.ctaTitleTail}
            </h2>
            <p className="mb-12 font-editorial text-xl leading-relaxed text-[var(--curated-muted)]">
              {servicesPageContent.ctaBody}
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <LocalizedLink
                to="/contact"
                className="bg-[var(--curated-accent)] px-10 py-4 font-label text-sm font-bold tracking-[0.14em] text-[#422c00] transition-all hover:shadow-[0_0_30px_rgba(253,197,98,0.2)]"
              >
                {copy.common.startConversation.toUpperCase()}
              </LocalizedLink>
              <LocalizedLink
                to="/projects"
                className="border border-[rgba(153,144,124,0.3)] px-10 py-4 font-label text-sm font-semibold text-[var(--curated-text)] transition-colors hover:bg-[var(--curated-surface-strong)]"
              >
                {copy.common.viewProjects.toUpperCase()}
              </LocalizedLink>
            </div>
          </div>
        </section>
      </main>
    </CuratedPageShell>
  )
}

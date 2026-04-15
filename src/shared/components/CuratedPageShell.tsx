import { useState, type ReactNode } from 'react'
import { ArrowRight, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitch } from '../../i18n/LanguageSwitch'
import { LocalizedLink } from '../../i18n/LocalizedLink'
import { getCopy } from '../../i18n/copy'
import { contactData } from '../../home/home.content'

interface CuratedPageShellProps {
  activePath: string
  children: ReactNode
}

export const CuratedPageShell = ({ activePath, children }: CuratedPageShellProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 border border-[rgba(153,144,124,0.12)] bg-[rgba(19,19,19,0.94)] px-5 py-4 shadow-[0_40px_60px_-15px_rgba(229,226,225,0.06)] backdrop-blur-xl md:px-8">
          <LocalizedLink
            to="/"
            className="font-headline text-xl font-extrabold tracking-[-0.04em] text-[var(--curated-text)] md:text-2xl"
          >
            Alexi Dg
          </LocalizedLink>

          <nav className="hidden items-center gap-8 md:flex">
            {copy.navigation.curated.map((item) => {
              const isActive = activePath === item.href

              return (
                <LocalizedLink
                  key={item.href}
                  to={item.href}
                  className={`border-b-2 pb-1 font-label text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
                    isActive
                      ? 'border-[var(--curated-accent)] text-[var(--curated-accent)]'
                      : 'border-transparent text-[var(--curated-muted)] hover:text-[var(--curated-accent)]'
                  }`}
                >
                  {item.label}
                </LocalizedLink>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitch
              className="flex items-center rounded-full border border-[rgba(153,144,124,0.16)] bg-[var(--curated-surface-soft)] p-1"
              buttonClassName="rounded-full px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors"
              activeButtonClassName="bg-[var(--curated-accent)] text-[#422c00]"
              inactiveButtonClassName="text-[var(--curated-muted)] hover:text-[var(--curated-text)]"
            />
            <LocalizedLink
              to="/contact"
              className="inline-flex items-center gap-2 bg-[var(--curated-accent)] px-6 py-2.5 font-label text-sm font-semibold tracking-[0.08em] text-[#422c00] transition-transform duration-300 hover:scale-[1.02]"
            >
              {copy.navigation.talk}
              <ArrowRight className="h-4 w-4" />
            </LocalizedLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(153,144,124,0.16)] bg-[var(--curated-surface-soft)] text-[var(--curated-text)] md:hidden"
            aria-label={copy.navigation.openMenu}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mx-auto mt-3 w-full max-w-[1440px] border border-[rgba(153,144,124,0.12)] bg-[rgba(19,19,19,0.98)] p-4 shadow-[0_40px_60px_-15px_rgba(229,226,225,0.06)] backdrop-blur-xl md:hidden">
            <div className="mb-4 flex justify-center">
              <LanguageSwitch
                className="flex items-center rounded-full border border-[rgba(153,144,124,0.16)] bg-[var(--curated-surface-soft)] p-1"
                buttonClassName="rounded-full px-4 py-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors"
                activeButtonClassName="bg-[var(--curated-accent)] text-[#422c00]"
                inactiveButtonClassName="text-[var(--curated-muted)] hover:text-[var(--curated-text)]"
              />
            </div>
            <nav className="flex flex-col gap-3">
              {copy.navigation.curated.map((item) => (
                <LocalizedLink
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-3 font-label text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
                    activePath === item.href
                      ? 'bg-[rgba(253,197,98,0.08)] text-[var(--curated-accent)]'
                      : 'text-[var(--curated-muted)] hover:bg-[rgba(253,197,98,0.08)] hover:text-[var(--curated-accent)]'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </LocalizedLink>
              ))}

              <LocalizedLink
                to="/contact"
                className="mt-2 inline-flex items-center justify-center bg-[var(--curated-accent)] px-4 py-3 font-label text-sm font-semibold tracking-[0.08em] text-[#422c00]"
                onClick={() => setMenuOpen(false)}
              >
                {copy.navigation.talk}
              </LocalizedLink>
            </nav>
          </div>
        )}
      </header>

      <div className="min-h-screen bg-[var(--curated-bg)] text-[var(--curated-text)]">{children}</div>

      <footer className="border-t border-[rgba(153,144,124,0.12)] bg-[var(--curated-surface)] px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-headline text-sm font-extrabold uppercase tracking-[0.3em] text-[var(--curated-text)]">
              Alexi Dg
            </p>
            <p className="mt-2 text-sm text-[var(--curated-muted)]">
              © {new Date().getFullYear()} {copy.footer.curatedDescription}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={contactData.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

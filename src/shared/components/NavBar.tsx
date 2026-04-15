import { Atom } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logoutAction } from '../../actions/logOut.action'
import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitch } from '../../i18n/LanguageSwitch'
import { LocalizedLink } from '../../i18n/LocalizedLink'
import { getCopy } from '../../i18n/copy'
import { buildLocalizedPath, stripLanguageFromPath } from '../../i18n/utils'
import { getSessionToken } from '../../lib/session'
import { useAuthSession } from '../hooks/useAuthSession'

interface NavItem {
  label: string
  href: string
}

interface NavBarProps {
  items: readonly NavItem[]
}

export const NavBar = ({ items }: NavBarProps) => {
  const [openMenu, setOpenMenu] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = stripLanguageFromPath(location.pathname)
  const { isAuthenticated, clearSession } = useAuthSession()
  const { language } = useLanguage()
  const copy = getCopy(language)

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((element) => {
        const top = element.getBoundingClientRect().top
        const winHeight = window.innerHeight
        if (top < winHeight - 100) {
          element.classList.add('animate-fadeIn')
        }
      })
    }

    window.addEventListener('scroll', animateOnScroll)
    window.addEventListener('load', animateOnScroll)

    return () => {
      window.removeEventListener('scroll', animateOnScroll)
      window.removeEventListener('load', animateOnScroll)
    }
  }, [])

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]')

    const handler = (event: Event) => {
      event.preventDefault()
      const anchor = event.currentTarget as HTMLAnchorElement
      const target = document.querySelector(anchor.getAttribute('href')!)
      target?.scrollIntoView({ behavior: 'smooth' })
    }

    anchors.forEach((anchor) => anchor.addEventListener('click', handler))
    return () => anchors.forEach((anchor) => anchor.removeEventListener('click', handler))
  }, [])

  const visibleItems = items.filter((item) => {
    if (currentPath !== '/') {
      if (item.href === '#about-me' || item.href === '#skills') {
        return false
      }
    }

    const token = getSessionToken()

    if (token && item.href === '/login') {
      return false
    }

    if (!token && item.href === '/privated-zone') {
      return false
    }

    return true
  })

  const logAuth = async () => {
    try {
      setIsLoggingOut(true)
      await logoutAction()
    } finally {
      clearSession()
      setIsLoggingOut(false)
      navigate(buildLocalizedPath(language, '/'))
    }
  }

  const token = getSessionToken()

  return (
    <header className="relative z-10 bg-black">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <LocalizedLink to="/" className="flex gap-2 text-2xl font-bold gradient-text">
            <Atom />
            Alexi Dg
          </LocalizedLink>

          <div className="hidden items-center space-x-6 md:flex">
            {visibleItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${item.href === currentPath ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </a>
              ) : (
                <LocalizedLink
                  key={item.href}
                  to={item.href}
                  className={`nav-link ${item.href === currentPath ? 'nav-link-active' : ''} ${
                    item.href === '/login' ? 'rounded-lg border-2 border-green-400 bg-violet-800 p-2' : ''
                  }`}
                >
                  {item.label}
                </LocalizedLink>
              ),
            )}
            <LanguageSwitch
              className="flex items-center rounded-full border border-slate-700 bg-slate-950 p-1"
              buttonClassName="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
              activeButtonClassName="bg-violet-700 text-white"
              inactiveButtonClassName="text-slate-400 hover:text-white"
            />
            {isAuthenticated && token ? (
              <button
                onClick={() => void logAuth()}
                disabled={isLoggingOut}
                className="rounded-lg bg-red-400 p-1 text-black hover:bg-red-500"
              >
                {isLoggingOut ? copy.navigation.loggingOut : copy.navigation.logout}
              </button>
            ) : null}
          </div>

          <button type="button" className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div ref={mobileMenuRef} className={`${openMenu ? 'block' : 'hidden'} md:hidden`}>
          <div className="grid col-span-1 space-y-1 px-4 pb-3 pt-2 sm:px-3">
            <div className="mb-3 flex justify-center">
              <LanguageSwitch
                className="flex items-center rounded-full border border-slate-700 bg-slate-950 p-1"
                buttonClassName="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                activeButtonClassName="bg-violet-700 text-white"
                inactiveButtonClassName="text-slate-400 hover:text-white"
              />
            </div>
            {visibleItems.map((item) =>
              item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link mobile-nav-link"
                  onClick={() => setOpenMenu(false)}
                >
                  {item.label}
                </a>
              ) : (
                <LocalizedLink
                  key={item.href}
                  to={item.href}
                  className="nav-link mobile-nav-link"
                  onClick={() => setOpenMenu(false)}
                >
                  {item.label}
                </LocalizedLink>
              ),
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

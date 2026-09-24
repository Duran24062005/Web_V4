import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { getHomeContent } from '../../home/home.content'
import { useClientValue } from '../hooks/useClientValue'

const currentYear = () => new Date().getFullYear()
const buildYear = Number(__BUILD_DATE__.slice(0, 4))

export const SiteFooter = () => {
  const { language } = useLanguage()
  const { footer } = getHomeContent(language)
  const year = useClientValue(currentYear, buildYear)

  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <p className="site-footer-build">
          <strong>© {year} Alexi Durán Gómez</strong>
          <span>
            REV {__APP_VERSION__} · {footer.build}{' '}
            <a
              href={`https://github.com/Duran24062005/Web_V4/commit/${__BUILD_SHA__}`}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {__BUILD_SHA__}
            </a>{' '}
            · <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
          </span>
        </p>
        <p>{footer.stack}</p>
        <a href="#hero" className="site-footer-top" onClick={() => window.scrollTo({ top: 0 })}>
          <ArrowUp aria-hidden="true" width={14} height={14} /> {footer.backToTop}
        </a>
      </div>
    </footer>
  )
}

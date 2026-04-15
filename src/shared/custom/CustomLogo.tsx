import { useLanguage } from '../../i18n/LanguageContext'
import { LocalizedLink } from '../../i18n/LocalizedLink'

interface Props {
  subtitle?: string
}

export const CustomLogo = ({ subtitle }: Props) => {
  const { language } = useLanguage()
  const fallbackSubtitle = language === 'es' ? 'WebSite' : 'Website'

  return (
    <LocalizedLink to="/" className="flex items-center whitespace-nowrap">
      <span className="m-0 whitespace-nowrap font-montserrat text-xl font-bold">Alexi Dg |</span>
      <p className="m-0 whitespace-nowrap px-2 text-muted-foreground">{subtitle ?? fallbackSubtitle}</p>
    </LocalizedLink>
  )
}

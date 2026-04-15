import { Link, type LinkProps } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { buildLocalizedPath } from './utils'

export const LocalizedLink = ({ to, ...props }: LinkProps) => {
  const { language } = useLanguage()

  if (typeof to !== 'string') {
    return <Link to={to} {...props} />
  }

  return <Link to={buildLocalizedPath(language, to)} {...props} />
}


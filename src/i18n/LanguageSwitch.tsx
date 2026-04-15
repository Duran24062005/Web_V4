import type { ButtonHTMLAttributes } from 'react'
import { useLanguage } from './LanguageContext'
import { supportedLanguages, type Language } from './config'

const labels: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
}

interface LanguageSwitchProps {
  className?: string
  buttonClassName?: string
  activeButtonClassName?: string
  inactiveButtonClassName?: string
}

export const LanguageSwitch = ({
  className,
  buttonClassName,
  activeButtonClassName,
  inactiveButtonClassName,
}: LanguageSwitchProps) => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={className}>
      {supportedLanguages.map((option) => {
        const isActive = option === language

        return (
          <LanguageButton
            key={option}
            isActive={isActive}
            label={labels[option]}
            onClick={() => setLanguage(option)}
            buttonClassName={buttonClassName}
            activeButtonClassName={activeButtonClassName}
            inactiveButtonClassName={inactiveButtonClassName}
          />
        )
      })}
    </div>
  )
}

const LanguageButton = ({
  isActive,
  label,
  buttonClassName,
  activeButtonClassName,
  inactiveButtonClassName,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive: boolean
  label: string
  buttonClassName?: string
  activeButtonClassName?: string
  inactiveButtonClassName?: string
}) => (
  <button
    type="button"
    aria-pressed={isActive}
    className={`${buttonClassName ?? ''} ${isActive ? activeButtonClassName ?? '' : inactiveButtonClassName ?? ''}`.trim()}
    {...props}
  >
    {label}
  </button>
)


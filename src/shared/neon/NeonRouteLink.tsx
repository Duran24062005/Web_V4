import { useRef, type ReactNode } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { LocalizedLink } from '../../i18n/LocalizedLink'
import { cn } from '../../lib/utils'
import { useMagnetic } from '../hooks/useMagnetic'
import { neonButton } from './neonButton.variants'

interface NeonRouteLinkProps extends VariantProps<typeof neonButton> {
  /** Route inside the current language, e.g. "/contact". */
  to: string
  children: string
  icon?: ReactNode
  className?: string
}

/** NeonButton look for in-app navigation: a localized router link with the magnetic shell. */
export const NeonRouteLink = ({ to, children, icon, variant, size, className }: NeonRouteLinkProps) => {
  const shellRef = useRef<HTMLSpanElement>(null)
  useMagnetic(shellRef, 0.28)

  return (
    <span ref={shellRef} className={cn('yk-btn-shell', `yk-btn-shell--${variant ?? 'primary'}`)}>
      <LocalizedLink to={to} className={cn(neonButton({ variant, size }), className)}>
        <span className="yk-btn-label" data-text={children}>
          {children}
        </span>
        {icon}
      </LocalizedLink>
    </span>
  )
}

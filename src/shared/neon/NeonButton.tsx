import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { useMagnetic } from '../hooks/useMagnetic'
import { neonButton } from './neonButton.variants'

/**
 * DG-OS buttons. The outer shell carries the glow (a drop-shadow survives the clip-path) and
 * the magnetic pull; the inner element is the real <a>/<button> with the cut corners.
 * Hover splits the label into RGB layers unless safe mode is on (see components.css).
 *
 *   <NeonButton href="#projects">Ver proyectos</NeonButton>
 *   <NeonButton as="button" variant="ghost" onClick={…}>Descargar CV</NeonButton>
 */
type NeonVariants = VariantProps<typeof neonButton>

interface CommonProps extends NeonVariants {
  children: ReactNode
  /** Icon rendered after the label (lucide icons, aria-hidden). */
  icon?: ReactNode
  /** Plain-text label for the glitch layers when children is not a string. */
  glitchText?: string
  magnetic?: boolean
  shellClassName?: string
}

type AnchorProps = CommonProps & { as?: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = CommonProps & { as: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>

export const NeonButton = (props: AnchorProps | ButtonProps) => {
  const shellRef = useRef<HTMLSpanElement>(null)
  const { children, icon, glitchText, magnetic = true, shellClassName, variant, size, className, as, ...rest } = props
  useMagnetic(shellRef, magnetic ? 0.28 : 0)

  const label = typeof children === 'string' ? children : glitchText
  const inner = (
    <>
      <span className="yk-btn-label" data-text={label}>
        {children}
      </span>
      {icon}
    </>
  )
  const classes = cn(neonButton({ variant, size }), className)

  return (
    <span ref={shellRef} className={cn('yk-btn-shell', `yk-btn-shell--${variant ?? 'primary'}`, shellClassName)}>
      {as === 'button' ? (
        <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
          {inner}
        </button>
      ) : (
        <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
          {inner}
        </a>
      )}
    </span>
  )
}

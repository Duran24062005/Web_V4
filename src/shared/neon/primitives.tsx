import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Decorative Japanese text. Always hidden from assistive tech: it repeats what the page says. */
export const Kana = ({ children, className, vertical = false }: { children: ReactNode; className?: string; vertical?: boolean }) => (
  <span aria-hidden="true" className={cn('font-jp select-none', vertical && 'yk-vertical', className)}>
    {children}
  </span>
)

/** Brush onomatopoeia (ドン, ゴゴゴ…) in the Japanese Brush face. Decorative. */
export const Onomatopoeia = ({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <span aria-hidden="true" className={cn('yk-sfx-text', className)} style={style}>
    {children}
  </span>
)

/**
 * Text with RGB-split ghost layers. The layers are CSS pseudo-elements fed from `data-text`,
 * so the accessible text is the plain string. Glitch stops in safe mode / reduced motion.
 */
export const GlitchText = ({
  as: Tag = 'span',
  text,
  className,
  idle = false,
}: {
  as?: 'span' | 'p' | 'h2' | 'h3' | 'strong'
  text: string
  className?: string
  /** Glitch periodically on its own instead of only on hover. */
  idle?: boolean
}) => (
  <Tag className={cn('yk-glitch', idle && 'yk-glitch--idle', className)} data-text={text}>
    {text}
  </Tag>
)

interface HudPanelProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'dl' | 'section' | 'aside' | 'article'
  /** Small tab label on the top edge ("STATUS", "EP.03"…). Decorative unless you say otherwise. */
  tab?: string
  tone?: 'cyan' | 'magenta' | 'violet'
  children: ReactNode
}

/** Bevelled HUD frame with a 1px neon edge (diagonals included) and corner ticks. */
export const HudPanel = ({ as: Tag = 'div', tab, tone = 'cyan', className, children, ...rest }: HudPanelProps) => (
  <Tag className={cn('yk-panel', `yk-panel--${tone}`, className)} {...rest}>
    {tab ? (
      <span className="yk-panel-tab hud-label" aria-hidden="true">
        {tab}
      </span>
    ) : null}
    {children}
  </Tag>
)

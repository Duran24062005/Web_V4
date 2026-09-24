import type { SimpleIcon } from 'simple-icons'

interface BrandIconProps {
  icon?: SimpleIcon
  /** Text fallback for technologies without an official mark (e.g. C#). */
  glyph?: string
  size?: number
  className?: string
}

export const BrandIcon = ({ icon, glyph, size = 20, className }: BrandIconProps) => {
  if (icon) {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={icon.path} />
      </svg>
    )
  }

  return (
    <span
      className={`brand-glyph ${className ?? ''}`.trim()}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      {glyph}
    </span>
  )
}

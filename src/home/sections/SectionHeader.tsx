import type { ReactNode } from 'react'

interface SectionHeaderProps {
  id: string
  index: number
  code: string
  title: ReactNode
  description?: ReactNode
  aside?: ReactNode
}

/** Datasheet-style section header: `§03 · WORK ─────` rule, title and an optional note column. */
export const SectionHeader = ({ id, index, code, title, description, aside }: SectionHeaderProps) => (
  <header className="section-head grid-12" data-reveal>
    <p className="section-index label">
      <span className="section-num">§{String(index).padStart(2, '0')}</span>
      <span>{code}</span>
      <span className="section-rule" aria-hidden="true" />
    </p>
    <h2 id={`${id}-title`} className="section-title">
      {title}
    </h2>
    {description || aside ? (
      <div className="section-note">
        {description ? <p>{description}</p> : null}
        {aside}
      </div>
    ) : null}
  </header>
)

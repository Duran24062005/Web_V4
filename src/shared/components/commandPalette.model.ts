import type { ReactNode } from 'react'

export type PaletteGroup = 'navigate' | 'actions' | 'links'

export interface PaletteCommand {
  id: string
  group: PaletteGroup
  label: string
  keywords?: string
  hint?: string
  icon?: ReactNode
  run: () => void
}

export interface PaletteLabels {
  title: string
  placeholder: string
  empty: string
  groups: Record<PaletteGroup, string>
  hints: { navigate: string; run: string; close: string }
}

const groupOrder: PaletteGroup[] = ['navigate', 'actions', 'links']

const normalize = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export const filterCommands = (commands: PaletteCommand[], query: string) => {
  const terms = normalize(query).split(/\s+/).filter(Boolean)

  const matches = commands.filter((command) => {
    const haystack = normalize(`${command.label} ${command.keywords ?? ''}`)
    return terms.every((term) => haystack.includes(term))
  })

  // Keep the visual grouping order so arrow keys follow what is on screen.
  return groupOrder.flatMap((group) => matches.filter((command) => command.group === group))
}

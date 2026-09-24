import { fireEvent, render, screen } from '@testing-library/react'
import { CommandPalette } from './CommandPalette'
import { filterCommands, type PaletteCommand, type PaletteLabels } from './commandPalette.model'

const labels: PaletteLabels = {
  title: 'Command palette',
  placeholder: 'Type a command',
  empty: 'No results',
  groups: { navigate: 'Navigate', actions: 'Actions', links: 'Links' },
  hints: { navigate: 'navigate', run: 'run', close: 'close' },
}

const buildCommands = (run = vi.fn()): PaletteCommand[] => [
  { id: 'github', group: 'links', label: 'Abrir GitHub', run },
  { id: 'email', group: 'actions', label: 'Copiar correo', keywords: 'email mail', run },
  { id: 'stack', group: 'navigate', label: 'Ir a Stack', run },
]

describe('filterCommands', () => {
  it('matches labels and keywords ignoring case and accents', () => {
    const commands = buildCommands()

    expect(filterCommands(commands, 'CORREO').map((command) => command.id)).toEqual(['email'])
    expect(filterCommands(commands, 'mail').map((command) => command.id)).toEqual(['email'])
    expect(filterCommands(commands, 'STÁCK').map((command) => command.id)).toEqual(['stack'])
  })

  it('returns every command in group order for an empty query', () => {
    expect(filterCommands(buildCommands(), '').map((command) => command.id)).toEqual(['stack', 'email', 'github'])
  })
})

describe('CommandPalette', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0)
      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders nothing while closed', () => {
    render(<CommandPalette open={false} onClose={vi.fn()} commands={buildCommands()} labels={labels} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('focuses the input and moves the selection with the arrow keys', () => {
    render(<CommandPalette open onClose={vi.fn()} commands={buildCommands()} labels={labels} />)
    const input = screen.getByRole('combobox')

    expect(input).toHaveFocus()
    expect(screen.getByRole('option', { name: 'Ir a Stack' })).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getByRole('option', { name: 'Copiar correo' })).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(screen.getByRole('option', { name: 'Abrir GitHub' })).toHaveAttribute('aria-selected', 'true')
  })

  it('runs the highlighted command on Enter and closes', () => {
    const run = vi.fn()
    const onClose = vi.fn()
    render(<CommandPalette open onClose={onClose} commands={buildCommands(run)} labels={labels} />)
    const input = screen.getByRole('combobox')

    fireEvent.change(input, { target: { value: 'correo' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('shows the empty message and closes on Escape', () => {
    const onClose = vi.fn()
    render(<CommandPalette open onClose={onClose} commands={buildCommands()} labels={labels} />)
    const input = screen.getByRole('combobox')

    fireEvent.change(input, { target: { value: 'zzz' } })
    expect(screen.getByText('No results')).toBeInTheDocument()

    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

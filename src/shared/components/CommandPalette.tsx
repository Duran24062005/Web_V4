import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import {
  filterCommands,
  type PaletteCommand,
  type PaletteGroup,
  type PaletteLabels,
} from './commandPalette.model'

export type { PaletteCommand } from './commandPalette.model'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  commands: PaletteCommand[]
  labels: PaletteLabels
}

export const CommandPalette = ({ open, ...props }: CommandPaletteProps) =>
  open ? <PaletteDialog {...props} /> : null

const PaletteDialog = ({ onClose, commands, labels }: Omit<CommandPaletteProps, 'open'>) => {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const baseId = useId()
  const listId = `${baseId}-list`

  const results = useMemo(() => filterCommands(commands, query), [commands, query])
  const activeCommand = results[activeIndex]

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, results])

  const runCommand = (command: PaletteCommand | undefined) => {
    if (!command) {
      return
    }

    onClose()
    // Let the dialog unmount (and release the scroll lock) before navigating.
    window.requestAnimationFrame(() => command.run())
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(Math.max(results.length - 1, 0))
        break
      case 'Enter':
        event.preventDefault()
        runCommand(activeCommand)
        break
      case 'Escape':
        event.preventDefault()
        onClose()
        break
      case 'Tab':
        // The input is the only focusable element; keep focus inside the dialog.
        event.preventDefault()
        break
    }
  }

  let renderedGroup: PaletteGroup | null = null

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label={labels.title}>
        <div className="palette-input-row">
          <span className="palette-prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            className="palette-input"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeCommand ? `${baseId}-${activeCommand.id}` : undefined}
            aria-label={labels.placeholder}
            placeholder={labels.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="kbd">esc</span>
        </div>

        <ul ref={listRef} id={listId} className="palette-list" role="listbox" aria-label={labels.title}>
          {results.length === 0 ? (
            <li className="palette-empty" role="presentation">
              {labels.empty}
            </li>
          ) : (
            results.map((command, index) => {
              const showGroup = command.group !== renderedGroup
              renderedGroup = command.group

              return (
                <li key={command.id} role="presentation">
                  {showGroup ? (
                    <div className="palette-group" aria-hidden="true">
                      {labels.groups[command.group]}
                    </div>
                  ) : null}
                  <div
                    id={`${baseId}-${command.id}`}
                    className="palette-item"
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => runCommand(command)}
                  >
                    {command.icon}
                    <span>{command.label}</span>
                    {command.hint ? <span className="palette-item-hint">{command.hint}</span> : null}
                  </div>
                </li>
              )
            })
          )}
        </ul>

        <div className="palette-footer" aria-hidden="true">
          <span>
            <span className="kbd">↑</span>
            <span className="kbd">↓</span>
            {labels.hints.navigate}
          </span>
          <span>
            <span className="kbd">↵</span>
            {labels.hints.run}
          </span>
          <span>
            <span className="kbd">esc</span>
            {labels.hints.close}
          </span>
        </div>
      </div>
    </div>
  )
}

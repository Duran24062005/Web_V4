import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { LanguageLayout } from '../i18n/LanguageLayout'
import Home from './Home'

vi.mock('../shared/hooks/useProjects', () => ({
  useProjects: () => ({ projectsList: [], loading: false, error: null, handleSearch: vi.fn() }),
}))

const renderHome = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:lang/*" element={<LanguageLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('Home', () => {
  it('renders the Spanish copy and section navigation', () => {
    renderHome('/es')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Construyo productos que funcionan.')
    const nav = screen.getAllByRole('navigation', { name: 'Navegación principal' })[0]
    for (const label of ['Perfil', 'Stack', 'Proyectos', 'Experiencia', 'Servicios', 'Contacto']) {
      expect(within(nav).getByRole('link', { name: new RegExp(label) })).toBeInTheDocument()
    }
    expect(within(nav).queryByRole('link', { name: /Blog/ })).not.toBeInTheDocument()
  })

  it('renders the English copy', () => {
    renderHome('/en')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build products that hold up.')
    expect(screen.getByRole('heading', { level: 2, name: 'Professional experience' })).toBeInTheDocument()
  })

  it('lists the local case studies with visible placeholders for missing data', () => {
    renderHome('/es')

    expect(screen.getByRole('heading', { level: 3, name: 'web_v4_backend' })).toBeInTheDocument()
    expect(screen.getAllByText('pendiente: tu rol en el proyecto').length).toBeGreaterThan(0)
  })

  it('opens the command palette with Ctrl+K', () => {
    renderHome('/es')

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    expect(screen.getByRole('dialog', { name: 'Paleta de comandos' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /Ir a Stack/ })).toBeInTheDocument()
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { LanguageLayout } from '../i18n/LanguageLayout'
import type { Project } from '../interfaces/Project.interfaces'
import { Projects } from './Projects'

const handleSearch = vi.fn()

const project = (id: string, title: string, technologies: string[]): Project => ({
  id,
  title,
  description: `${title} description`,
  technologies,
  imageUrl: `/image/${id}.png`,
  demoUrl: `https://demo.example/${id}`,
  repoUrl: `https://github.com/example/${id}`,
  featured: false,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
})

vi.mock('../shared/hooks/useProjects', () => ({
  useProjects: () => ({
    projectsList: [
      project('alpha', 'Alpha', ['React.js', 'Node.js', 'Docker']),
      project('beta', 'Beta', ['Python', 'FastAPI']),
      project('gamma', 'Gamma', ['Java']),
    ],
    loading: false,
    error: null,
    handleSearch,
  }),
}))

const renderProjects = () =>
  render(
    <MemoryRouter initialEntries={['/es/projects']}>
      <Routes>
        <Route path="/:lang/*" element={<LanguageLayout />}>
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('Projects page', () => {
  it('renders API projects with the per-slot links', () => {
    renderProjects()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Proyectos seleccionados.')
    expect(screen.getByRole('heading', { level: 3, name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Live demo: Alpha' })).toHaveAttribute('href', 'https://demo.example/alpha')
    expect(screen.getByRole('link', { name: 'GitHub: Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver proyecto: Beta' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Código: Gamma' })).toHaveAttribute('href', 'https://github.com/example/gamma')
  })

  it('marks the active filter and forwards it to the search', () => {
    renderProjects()

    const react = screen.getByRole('button', { name: 'React.js' })
    expect(screen.getByRole('button', { name: 'Todos los proyectos' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(react)
    expect(react).toHaveAttribute('aria-pressed', 'true')
    expect(handleSearch).toHaveBeenCalledWith('React.js')
  })
})

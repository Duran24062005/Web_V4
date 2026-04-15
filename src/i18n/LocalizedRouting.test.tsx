import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageLayout } from './LanguageLayout'
import { LanguageSwitch } from './LanguageSwitch'
import { LocalizedLink } from './LocalizedLink'

const LocationProbe = () => {
  const location = useLocation()
  return <p data-testid="location">{location.pathname}</p>
}

const renderRouter = (initialEntries: string[]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/:lang/*" element={<LanguageLayout />}>
          <Route
            path="projects"
            element={
              <div>
                <LanguageSwitch />
                <LocalizedLink to="/contact">Go to contact</LocalizedLink>
                <LocationProbe />
              </div>
            }
          />
          <Route
            path="contact"
            element={
              <div>
                <LocationProbe />
              </div>
            }
          />
          <Route
            index
            element={
              <div>
                <LocationProbe />
              </div>
            }
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('localized routing', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('renders localized links with the current language prefix', () => {
    renderRouter(['/en/projects'])

    expect(screen.getByRole('link', { name: 'Go to contact' })).toHaveAttribute('href', '/en/contact')
  })

  it('changes the language and keeps the current route', async () => {
    renderRouter(['/es/projects'])

    fireEvent.click(screen.getByRole('button', { name: 'EN' }))

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('/en/projects')
    })
  })

  it('redirects invalid language prefixes to the preferred language', async () => {
    localStorage.setItem('portfolio.language', 'es')
    renderRouter(['/fr/projects'])

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('/es/projects')
    })
  })
})

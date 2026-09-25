import { Outlet } from 'react-router-dom'
import { ExperienceRuntime } from './ExperienceRuntime'
import 'lenis/dist/lenis.css'

/**
 * Wraps the public routes (home, services, projects, blog, contact) in the DG-OS experience.
 * Auth, dashboard and recruiter routes stay outside it.
 */
const PublicLayout = () => (
  <>
    <ExperienceRuntime />
    <Outlet />
  </>
)

export default PublicLayout

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import PublicLayout from './experience/PublicLayout'
import { LanguageLayout } from './i18n/LanguageLayout'
import { LocalizedRedirect } from './i18n/LocalizedRedirect'
import { RequireAuth } from './shared/components/RequireAuth'

// Only the home page ships in the entry chunk; every other route loads on demand.
const Services = lazy(() => import('./services/Services').then((module) => ({ default: module.Services })))
const Projects = lazy(() => import('./projects/Projects').then((module) => ({ default: module.Projects })))
const Blogs = lazy(() => import('./blog/Blogs').then((module) => ({ default: module.Blogs })))
const BlogDetail = lazy(() =>
  import('./blog/components/BlogDetail').then((module) => ({ default: module.BlogDetail })),
)
const Contact = lazy(() => import('./contact/Contact').then((module) => ({ default: module.Contact })))
const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'))
const Login = lazy(() => import('./auth/pages/login/Login').then((module) => ({ default: module.Login })))
const Register = lazy(() =>
  import('./auth/pages/register/Register').then((module) => ({ default: module.Register })),
)
const Index = lazy(() => import('./dashboard/Index').then((module) => ({ default: module.Index })))
const Recruiter = lazy(() => import('./recruiter/Recruiter').then((module) => ({ default: module.Recruiter })))
const PrivateZona = lazy(() =>
  import('./recruiter/PrivateZona').then((module) => ({ default: module.PrivateZona })),
)

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<LocalizedRedirect />} />
        <Route path="/:lang/*" element={<LanguageLayout />}>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Index />} />
          </Route>
          <Route path="recruiter" element={<Recruiter />} />
          <Route path="privated-zone" element={<PrivateZona />} />
        </Route>
        <Route path="*" element={<LocalizedRedirect preservePath />} />
      </Routes>
    </Suspense>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import { Register } from './auth/pages/register/Register'
import AuthLayout from './auth/layouts/AuthLayout'
import { Blogs } from './blog/Blogs'
import { BlogDetail } from './blog/components/BlogDetail'
import { Contact } from './contact/Contact'
import { Index } from './dashboard/Index'
import Home from './home/Home'
import { LanguageLayout } from './i18n/LanguageLayout'
import { LocalizedRedirect } from './i18n/LocalizedRedirect'
import { Projects } from './projects/Projects'
import { PrivateZona } from './recruiter/PrivateZona'
import { Recruiter } from './recruiter/Recruiter'
import { Services } from './services/Services'
import { Login } from './auth/pages/login/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LocalizedRedirect />} />
      <Route path="/:lang/*" element={<LanguageLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blog" element={<Blogs />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<Index />} />
        <Route path="recruiter" element={<Recruiter />} />
        <Route path="privated-zone" element={<PrivateZona />} />
      </Route>
      <Route path="*" element={<LocalizedRedirect preservePath />} />
    </Routes>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import { Blogs } from './blog/Blogs'
import { BlogDetail } from './blog/components/BlogDetail'
import { Contact } from './contact/Contact'
import Home from './home/Home'
import { Projects } from './projects/Projects'
import { Index } from './dashboard/Index'
import { Services } from './services/Services'
import { Login } from './auth/pages/login/Login'
import { Recruiter } from './recruiter/Recruiter'
import { PrivateZona } from './recruiter/PrivateZona'


function App() {

  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Index />} />
          <Route path='/recruiter' element={<Recruiter />} />
          <Route path='/privated-zone' element={<PrivateZona />} />
    </Routes>
  )
}

export default App

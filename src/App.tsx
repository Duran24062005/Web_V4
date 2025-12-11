import { Route, Routes } from 'react-router-dom'
import { Blogs } from './Blogs'
import { Contact } from './Contact'
import Index from './Index'
import { Projects } from './Projects'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App

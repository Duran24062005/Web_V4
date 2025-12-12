import { Route, Routes } from 'react-router-dom'
import { Blogs } from './blog/Blogs'
import { Contact } from './contact/Contact'
import Index from './home/Index'
import { Projects } from './projects/Projects'


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

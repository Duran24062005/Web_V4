import { AboutMe } from './components/AboutMe'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MySkills } from './components/MySkills'
import { MySperience } from './components/MySperience'
import { NavBar } from './components/NavBar'
import { TopProjects } from './components/TopProjects'

function Index() {

  return (
    <>
    <NavBar/>
    <main className='relative z-10'>
      {/* Other components and content would go here */}
      <Header />
      <AboutMe />
      <MySkills />
      <MySperience />
      <TopProjects /> 
      <Footer />
    </main>
    </>
  )
}

export default Index


import { AboutMe } from './components/AboutMe'
import { NavBar } from '../shared/components/NavBar'
import { Footer } from '../shared/components/Footer'
import { Header } from './components/Header'
import { MySkills } from './components/MySkills'
import { MySperience } from './components/MySperience'
import { TopProjects } from './components/TopProjects'
import { navBarItems } from '../mock/data/navBarItems'

function Home() {

  return (
    <>
    <main className='relative z-10'>
    <NavBar items={navBarItems}/>
      {/* Other components and content would go here */}
      <Header title='Alexi Dg' subtitle='Junior Full Stack Web Developer'/>
      <AboutMe />
      <MySkills />
      <MySperience />
      <TopProjects /> 
      <Footer />
    </main>
    </>
  )
}

export default Home


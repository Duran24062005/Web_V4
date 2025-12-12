import { AboutMe } from './components/AboutMe'
import { NavBar } from '../shared/components/NavBar'
import { Footer } from '../shared/components/Footer'
import { Header } from './components/Header'
import { MySkills } from './components/MySkills'
import { MySperience } from './components/MySperience'
import { TopProjects } from './components/TopProjects'

function Index() {

  return (
    <>
    <NavBar/>
    <main className='relative z-10'>
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

export default Index


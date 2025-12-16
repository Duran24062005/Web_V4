import { NavBar } from '../shared/components/NavBar'
import { AboutMe } from './components/AboutMe'
import { Header } from './components/Header'
import { MySkills } from './components/MySkills'
import { MySperience } from './components/MySperience'
import { TopProjects } from './components/TopProjects'
import { navBarItems } from '../mock/data/navBarItems'
import { Footer } from '../shared/components/Footer'
import { useProjects } from '../shared/hooks/useProjects'

function Home() {

  const { projectsList, loading  } = useProjects();

  return (
    <>
      <NavBar items={navBarItems} />
    <main className="min-h-screen flex flex-col bg-black">
      {/* Other components and content would go here */}
      <div className="flex-grow h-screen">
        <Header title={`Hi there! \n\n I'm Alexi Duran G`} subtitle='Junior Full Stack Web Developer'/>
      </div>
      <AboutMe />
      <MySkills />
      <MySperience />
      <TopProjects projects={projectsList} state={loading} /> 
    </main>
    <Footer />
    </>
  )
}

export default Home


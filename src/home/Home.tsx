import { NavBar } from '../shared/components/NavBar'
import { AboutMe } from './components/AboutMe'
import { Header } from './components/Header'
import { MySkills } from './components/MySkills'
import { MySperience } from './components/MySperience'
import { TopProjects } from './components/TopProjects'
import { navBarItems, navBarItemsHome } from '../mock/data/navBarItems'
import { Footer } from '../shared/components/Footer'
import { useProjects } from '../shared/hooks/useProjects'
import { ContactComponent } from '../contact/components/ContactComponent'
import { ServiceComponent } from '../services/components/ServiceComponent'

function Home() {

  const { projectsList, loading  } = useProjects();
  
  const token = localStorage.getItem('token');

  return (
    <>
    <main className="min-h-screen flex flex-col bg-black mb-12">
      <NavBar items={token? navBarItems : navBarItemsHome } />
      {/* Other components and content would go here */}
      <div className="flex h-screen">
        <Header title={`Alexi Duran G`} subtitle='Junior Full Stack Web Developer'/>
      </div>
      <AboutMe />
      <MySkills />
      <MySperience />
      <ServiceComponent />
      <TopProjects projects={projectsList} state={loading} /> 
      <ContactComponent/>
    </main>
    <Footer />
    </>
  )
}

export default Home


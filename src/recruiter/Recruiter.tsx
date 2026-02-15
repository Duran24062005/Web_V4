import { ContactComponent } from "../contact/components/ContactComponent"
import { AboutMe } from "./components/AboutMe"
import { Header } from "../home/components/Header"
import { MySkills } from "../home/components/MySkills"
import { MySperience } from "../home/components/MySperience"
import { TopProjects } from "../home/components/TopProjects"
import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import { useProjects } from "../shared/hooks/useProjects"

export const Recruiter = () => {
    const { projectsList, loading  } = useProjects();
  return (
    <>
        <main className="min-h-screen flex flex-col bg-black mb-12">
          <NavBar items={navBarItems} />
          {/* Other components and content would go here */}
          <div className="flex h-screen">
            <Header title={`Alexi Duran G`} subtitle='Junior Full Stack Web Developer'/>
          </div>
          <AboutMe />
          <MySkills />
          <MySperience />
          <TopProjects projects={projectsList} state={loading} /> 
          <ContactComponent/>
        </main>
        <Footer />
        </>
  )
}

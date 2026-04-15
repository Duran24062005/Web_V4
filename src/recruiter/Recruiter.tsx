import { ContactComponent } from '../contact/components/ContactComponent'
import { Header } from '../home/components/Header'
import { MySkills } from '../home/components/MySkills'
import { MySperience } from '../home/components/MySperience'
import { TopProjects } from '../home/components/TopProjects'
import { AboutMe } from './components/AboutMe'
import { getNavBarItems } from '../mock/data/navBarItems'
import { Footer } from '../shared/components/Footer'
import { NavBar } from '../shared/components/NavBar'
import { useProjects } from '../shared/hooks/useProjects'
import { useLanguage } from '../i18n/LanguageContext'
import { getCopy } from '../i18n/copy'

export const Recruiter = () => {
  const { projectsList, loading } = useProjects()
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <>
      <main className="mb-12 flex min-h-screen flex-col bg-black">
        <NavBar items={getNavBarItems(language)} />
        <div className="flex h-screen">
          <Header
            title={copy.recruiter.title}
            subtitle={copy.recruiter.subtitle}
            quote={copy.recruiter.heroQuote}
            primaryCta={copy.recruiter.contactMe}
            secondaryCta={copy.recruiter.viewProjects}
            availability={copy.recruiter.available}
          />
        </div>
        <AboutMe
          image="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/image_e713f47e.png"
          video="https://duran24062005.github.io/Web_V4/public/video/WhatsApp%20Video%202026-02-14%20at%2012.45.45%20PM.mp4"
        />
        <TopProjects projects={projectsList} state={loading} />
        <MySkills />
        <MySperience />
        <ContactComponent />
      </main>
      <Footer />
    </>
  )
}

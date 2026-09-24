import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { SiteFooter } from '../shared/components/SiteFooter'
import { SiteNav } from '../shared/components/SiteNav'
import { useDocumentMeta } from '../shared/hooks/useDocumentMeta'
import { useProjects } from '../shared/hooks/useProjects'
import { useReveal } from '../shared/hooks/useReveal'
import { getHomeContent, sectionIds } from './home.content'
import { caseStudies, mergeCaseStudies } from './projects.data'
import { stackCount } from './stack.data'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Profile } from './sections/Profile'
import { Projects } from './sections/Projects'
import { Services } from './sections/Services'
import { Stack } from './sections/Stack'
import './home.css'

const sectionNumber = (id: (typeof sectionIds)[number]) => sectionIds.indexOf(id) + 1

function Home() {
  const { language } = useLanguage()
  const { projectsList } = useProjects()
  const location = useLocation()
  const content = getHomeContent(language)
  const cases = useMemo(() => mergeCaseStudies(projectsList, caseStudies), [projectsList])

  useDocumentMeta({ ...content.meta, language })
  useReveal(cases.length)

  // Arriving from another page with /es#section: jump to it once the sections exist.
  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }
    // Only on first mount; in-page anchors are handled by the browser.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SiteNav />
      <main id="main" className="home" tabIndex={-1}>
        <Hero content={content} technologies={stackCount} caseStudies={cases.length} />
        <Profile content={content} language={language} index={sectionNumber('about-me')} />
        <Stack content={content} language={language} index={sectionNumber('skills')} />
        <Projects content={content} language={language} index={sectionNumber('projects')} cases={cases} />
        <Experience content={content} index={sectionNumber('experience')} />
        <Services content={content} index={sectionNumber('services')} />
        <Contact content={content} index={sectionNumber('contact')} />
      </main>
      <SiteFooter />
    </>
  )
}

export default Home

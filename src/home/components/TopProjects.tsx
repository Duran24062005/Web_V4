import { ChevronRight, Github } from 'lucide-react'
import type { Project } from '../../interfaces/Project.interfaces'
import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'
import { LocalizedLink } from '../../i18n/LocalizedLink'
import { ProjectCardSkeletonGrid } from '../../shared/skeletons/ProjectsSkeleton'

interface TopProjectsProps {
  projects: Project[]
  state?: boolean
}

const topProjectTitles = ['Web_V4', 'Email_Python_FastAPI', 'UserManagerExpress']

export const TopProjects = ({ projects, state }: TopProjectsProps) => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <section id="projects" className="relative z-20 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-4xl font-bold gradient-text">{copy.recruiter.featuredProjectsTitle}</h2>
        {state ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCardSkeletonGrid quantity={3} />
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((project) => topProjectTitles.includes(project.title))
                .slice(0, 3)
                .map((project) => (
                  <div key={project.id} className="overflow-hidden rounded-lg bg-gray-800">
                    <img src={project.imageUrl} alt={project.title} className="h-48 w-full object-cover" />
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                      <p className="mb-4 text-gray-400">{project.description}</p>
                      <div>
                        {project.technologies.map((tech, index) => (
                          <span
                            key={`${project.id}-${tech}-${index}`}
                            className="mr-2 mb-2 inline-block rounded-full bg-purple-600 px-2 py-1 text-xs text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <a href={project.repoUrl} className="flex text-purple-400 hover:text-purple-300">
                          <Github />
                        </a>
                        <a href={project.demoUrl} className="flex text-purple-400 hover:text-purple-300">
                          {copy.common.readMore} <ChevronRight />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="container mt-6 text-center">
              <LocalizedLink
                to="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl sm:px-8"
              >
                {copy.common.readMore}...
              </LocalizedLink>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">{copy.common.noFeaturedProjects}</p>
        )}
      </div>
    </section>
  )
}

import { NavBar } from '../shared/components/NavBar'
import { FilterProjects } from './components/FilterProjects'
import { ProjectLists } from './components/ProjectLists'
import getProjects from '../actions/get.projects.actions'
import { useEffect, useState } from 'react'
import type { Project } from '../interfaces/Project.interfaces'


const techNames: string[] = [
  "Html5",
  "Css3",
  "React",
  "JavaScript",
  "Express.js",
  "Tailwind CSS",
  "Docker",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL"
];

export const Projects = () => {

  const [projectsList, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      const setProjectsList = async () => {
          const dat = await getProjects("all");
          setProjects(dat);
      }
        setProjectsList();
    }, []);


    const hanlderSerach = (query: string) => {
      console.log(query);
      console.log(projectsList);
      const search = projectsList.filter(project => project.technologies.includes(query));
      setProjects(search);
    }

  return (
    <>
    <NavBar />
    <section id="projects" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Proyectos Destacados</h2>
                {/* Lista de Proyectos */}
                <FilterProjects techList={techNames} onLabelClick={hanlderSerach}/>
                {/* Lista de Proyectos */}
                <ProjectLists projects={projectsList}/> 
            </div>
        </section>
    </>
  )
}

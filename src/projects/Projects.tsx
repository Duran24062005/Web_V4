import { NavBar } from '../shared/components/NavBar'
import { FilterProjects } from './components/FilterProjects'
import { ProjectLists } from './components/ProjectLists'
import getProjects from '../actions/get.projects.actions'
import { useEffect, useState } from 'react'
import type { Project } from '../interfaces/Project.interfaces'
import { Footer } from '../shared/components/Footer'
import { navBarItems } from '../mock/data/navBarItems'


const techNames: string[] = [
  "Html5",
  "Css3",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "JavaScript",
  "Express.js",
  "Docker",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL"
];

export const Projects = () => {

  const [projectsList, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

    useEffect(() => {
      const setProjectsList = async () => {
          const dat = await getProjects("all");
          setProjects(dat);
          setAllProjects(dat);
      }
        setProjectsList();
    }, []);


    const hanlderSerach = (query: string) => {
      if (query === "all") {
        setProjects(allProjects);
        return;
      }
      
      const search = allProjects.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(query.toLowerCase())
        )
      );
      setProjects(search);
    }

  return (
    <>
    <NavBar items={navBarItems} />
    <section id="projects" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Mis Proyectos</h2>
                {/* Lista de Proyectos */}
                <FilterProjects techList={techNames} onLabelClick={hanlderSerach}/>
                {/* Lista de Proyectos */}
                <ProjectLists projects={projectsList}/> 
            </div>
        </section>
        <Footer />
    </>
  )
}

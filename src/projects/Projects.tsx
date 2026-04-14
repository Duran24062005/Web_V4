import { NavBar } from '../shared/components/NavBar'
import { FilterProjects } from './components/FilterProjects'
import { ProjectLists } from './components/ProjectLists'
// import getProjects from '../actions/get.projects.actions'
// import { useEffect, useState } from 'react'
// import type { Project } from '../interfaces/Project.interfaces'
import { Footer } from '../shared/components/Footer'
import { navBarItems } from '../mock/data/navBarItems'
import { techNames } from '../mock/data/tech.data'
import { useProjects } from '../shared/hooks/useProjects'




export const Projects = () => {

  const { projectsList, handleSearch, loading, error } = useProjects();

  return (
    <>
    <NavBar items={navBarItems} />
    <section id="projects" className="py-20 bg-black text-white mb-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Mis Proyectos</h2>
                {/* Lista de Proyectos */}
                <FilterProjects techList={techNames} onLabelClick={handleSearch}/>
                {error && <p className="mb-6 text-center text-red-400">{error}</p>}
                {/* Lista de Proyectos */}
                <ProjectLists projects={projectsList} state={loading}/> 
            </div>
        </section>
    <Footer /> 
    </>
  )
}

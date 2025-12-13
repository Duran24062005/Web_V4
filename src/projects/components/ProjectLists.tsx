import type { Project } from "../../interfaces/Project.interfaces"
import { ProjectCardSkeletonGrid } from "../skeletons/ProjectsSkeleton";
// import ReactMarkdown from 'react-markdown';

interface ProjectsProps {
  projects: Project[];
  state?: boolean;
}

export const ProjectLists = ({ projects, state }: ProjectsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        state ? (
            <ProjectCardSkeletonGrid quantity={6} />
        ) :
        projects.length == 0 && (
            <div className="text-center text-gray-400">No se encontraron proyectos</div>
        )||
        projects.map(e => (
          <div className="bg-gray-800 rounded-lg overflow-hidden" key={e.id}>
                <img src={e.imageUrl} alt={e.title}
                    className="w-full h-48 object-cover"/>
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{e.title}</h3>
                    <p className="text-gray-400 mb-4">{e.description}</p>
                    <ul>
                        {e.technologies.map((tech) => (
                            <li key={tech} className="inline-block bg-purple-600 text-white px-2 py-1 mr-2 mb-2 rounded text-sm">{tech}</li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between">
                        <a href="#" className="text-purple-400 hover:text-purple-300">Ver más</a>
                        <a href={e.repoUrl} target="_blanck" className="text-purple-400 hover:text-purple-300">GitHub</a>
                        <a href={e.demoUrl} target="_blanck" className="text-purple-400 hover:text-purple-300">Deploy</a>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}



{/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src="/image/Captura de pantalla 2024-09-16 143050.png" alt="Proyecto 1"
                            className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Sistema de Gestión de Tareas</h3>
                            <p className="text-gray-400 mb-4">Aplicación web para la organización y seguimiento de tareas
                                personales y de equipo.</p>
                            <a href="#" className="text-purple-400 hover:text-purple-300">Ver más</a>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src="/image/Captura de pantalla 2024-09-22 100455.png" alt="Proyecto 2"
                            className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">App para escuchar musica</h3>
                            <p className="text-gray-400 mb-4">Plataforma integral que permite buscar, reproducir y gestionar 
                                listas de reproducción de sus canciones y artistas favoritos..</p>
                            <a href="#" className="text-purple-400 hover:text-purple-300">Ver más</a>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src="/image/Captura de pantalla 2024-09-29 093158.png" alt="Proyecto 3"
                            className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Dashboard de Análisis de Datos</h3>
                            <p className="text-gray-400 mb-4">Herramienta de visualización de datos en tiempo real para toma
                                de decisiones educativa.</p>
                            <a href="#" className="text-purple-400 hover:text-purple-300">Ver más</a>
                        </div>
                    </div>
                </div>*/}
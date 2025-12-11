
export const TopProjects = () => {
  return (
     <section id="projects" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Proyectos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <img src="/image/Captura de pantalla 2024-09-22 100455.png" alt="Proyecto 2" className="w-full h-48 object-cover"/>
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
                </div>
            </div>
        </section>
  )
}

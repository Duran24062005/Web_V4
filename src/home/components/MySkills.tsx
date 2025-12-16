
export const MySkills = () => {
  return (
    <section id="skills" className="py-20 z-20 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Mis Habilidades</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-html5 text-5xl mb-4 text-yellow-500"></i>
                        <h3 className="text-xl font-semibold">HTML5</h3>
                        <p className="mt-2">Estructuración semántica y accesible de contenido web.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-css3-alt text-5xl mb-4 text-blue-500"></i>
                        <h3 className="text-xl font-semibold">CSS3</h3>
                        <p className="mt-2">Diseño responsivo y animaciones.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-js text-5xl mb-4 text-yellow-400"></i>
                        <h3 className="text-xl font-semibold">JavaScript</h3>
                        <p className="mt-2">ES6+, asincronía, y manipulación del DOM.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fas fa-mobile-alt text-5xl mb-4 text-purple-500"></i>
                        <h3 className="text-xl font-semibold">Diseño Responsivo</h3>
                        <p className="mt-2">Creación de interfaces adaptables a todos los dispositivos.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-react text-5xl mb-4 text-blue-400"></i>
                        <h3 className="text-xl font-semibold">React</h3>
                        <p className="mt-2">Desarrollo de SPA y gestión de estado con Redux.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-python text-5xl mb-4 text-blue-500"></i> 
                        <h3 className="text-xl font-semibold">Python</h3>
                        <p className="mt-2">Creación de APIs RESTful con FastAPI.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-laravel text-5xl mb-4 text-blue-400"></i>
                        <h3 className="text-xl font-semibold">Laravel</h3>
                        <p className="mt-2">Creación de APIs RESTful y microservicios.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-node-js text-5xl mb-4 text-blue-400"></i>
                        <h3 className="text-xl font-semibold">Node.js</h3>
                        <p className="mt-2">Creación de APIs RESTful con Express.js.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-java text-5xl mb-4 text-blue-400"></i>
                        <h3 className="text-xl font-semibold">Java</h3>
                        <p className="mt-2">Creación de APIs RESTful y microservicios.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fas fa-database text-5xl mb-4 text-blue-600"></i>
                        <h3 className="text-xl font-semibold">SQL & NoSQL</h3>
                        <p className="mt-2">Diseño y optimización de bases de datos.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-git-alt text-5xl mb-4 text-orange-600"></i>
                        <h3 className="text-xl font-semibold">Git</h3>
                        <p className="mt-2">Control de versiones y gestion de ramas.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <i className="fab fa-github text-5xl mb-4 text-orange-600"></i>
                        <h3 className="text-xl font-semibold">GitHub</h3>
                        <p className="mt-2">Colaboración en equipo.</p>
                    </div>
                </div>
            </div>
        </section>
  )
}

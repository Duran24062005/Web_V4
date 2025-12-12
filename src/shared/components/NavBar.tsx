
export const NavBar = () => {
  return (
    <header className="relative z-10">
        <nav className="container mx-auto px-6 py-3 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
            <div className="flex justify-between items-center">
                <a href="#" className="text-2xl font-bold gradient-text">Alexi Dg</a>
                <div className="hidden md:flex space-x-6">
                    <a href="/" className="nav-link">Inicio</a>
                    <a href="#about-me" className="nav-link">Sobre mi</a>
                    <a href="#skills" className="nav-link">Habilidades</a>
                    {/* <a href="#experiencia" className="nav-link">Experiencia</a> */}
                    <a href="/projects" className="nav-link">Proyectos</a>
                    <a href="/blog" className="nav-link">Blog</a>
                    <a href="/contact" className="nav-link">Contacto</a> 
                   {/* <a href="/pokemon-app.html" className="nav-link">Pokemon app</a> */}
                </div>
                <button type="submit" id="mobile-menu-button" className="md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div id="mobile-menu" className="hidden md:hidden">
                <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 grid col-span-1">
                    <a href="#about-me" className="nav-link">Sobre mi</a>
                    <a href="#skills" className="nav-link">Habilidades</a>
                    {/*} <a href="#experiencia" className="nav-link">Experiencia</a> */}
                    <a href="#projects" className="nav-link">Proyectos</a>
                    <a href="#blog" className="nav-link">Blog</a>
                    <a href="#contact" className="nav-link">Contacto</a>
                    {/* <a href="/pokemon-app.html" className="nav-link">Pokemon app</a> */}
                </div>
            </div>
        </nav>
    </header>
  )
}

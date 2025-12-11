
export const Header = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Alexi Dg
                </h1>
                <p className="text-2xl md:text-3xl mb-8 mt-4 flex-1">Junior Full Stack Web Developer</p>
                <a href="#contacto"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Contáctame</a>
            </div>
            <div className="absolute inset-0 z-0">
                <div id="particles-js"></div>
            </div>
        </section>
  )
}

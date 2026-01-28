import { useAnimationUpDown } from "../../shared/hooks/useAnimation"
import { AnimateBackground } from "./AnimatedBackground"

interface HeaderProps {
  title: string
  subtitle: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  
  useAnimationUpDown("#title")

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <AnimateBackground />
      </div>

      <div className="relative z-10 w-full h-full flex items-center text-center py-20 lg:py-0">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          
          {/* Imagen - visible en móvil arriba, desktop a la izquierda */}
          <div className="lg:hidden flex justify-center mb-12">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute -inset-4 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <img
                src="/public/image/image_94f2750b.png"
                alt="Perfil"
                className="relative w-full h-full object-cover rounded-full shadow-2xl ring-4 ring-white/20"
              />
            </div>
          </div>

          <div className="relative flex items-center">
            {/* Imagen desktop */}
            <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-[45%] xl:w-[50%] z-10">
              <div className="relative">
                <div className="absolute -inset-8 bg-yellow-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <img
                    src="/public/image/image_94f2750b.png"
                    alt="Perfil"
                    className="relative w-[400px] h-[400px] xl:w-[600px] xl:h-[600px] object-cover rounded-full shadow-2xl ring-4 ring-white/20 hover:ring-yellow-500/50 transition-all duration-500 hover:scale-105 mr-auto"
                  />
                </div>
              </div>
            </div>

            {/* Contenido de texto */}
            <div className="relative z-20 w-full lg:w-[55%] xl:w-[50%] lg:ml-100 space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="home-header text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="gradient-text" id="title">{title}</span>
                </h1>
              </div>

              <p className="text-red-500">Live to learn and learn to grow</p>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-pretty text-white/90">
                {subtitle}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 pb-8">
                <a
                  href="#about-me"
                  className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 text-center"
                >
                  Contáctame
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50 text-center"
                >
                  Ver proyectos
                </a>
                
                <div className="bg-black/80 backdrop-blur-sm border-2 border-yellow-500 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-2xl self-start sm:self-auto">
                  <p className="Alexi text-base sm:text-lg font-bold text-center">Disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#about-me" className="text-white/60 hover:text-red-500 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
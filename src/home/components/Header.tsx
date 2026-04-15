import { useAnimationUpDown } from '../../shared/hooks/useAnimation'
import { AnimateBackground } from './AnimatedBackground'

interface HeaderProps {
  title: string
  subtitle: string
  quote: string
  primaryCta: string
  secondaryCta: string
  availability: string
}

export const Header = ({
  title,
  subtitle,
  quote,
  primaryCta,
  secondaryCta,
  availability,
}: HeaderProps) => {
  useAnimationUpDown('#title')

  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <AnimateBackground />
      </div>

      <div className="relative z-10 flex h-full w-full items-center py-20 text-center lg:py-0">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="mb-12 flex justify-center lg:hidden">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
              <div className="absolute -inset-4 rounded-full bg-yellow-500/10 blur-3xl" />
              <img
                src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/image_94f2750b.png"
                alt="Profile"
                className="relative h-full w-full rounded-full object-cover shadow-2xl ring-4 ring-white/20"
              />
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-40 top-1/2 hidden w-[45%] -translate-y-1/2 lg:block xl:w-[50%] z-10">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-yellow-500/10 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/image_94f2750b.png"
                    alt="Profile"
                    className="relative mr-auto h-[200px] w-[100px] rounded-full object-cover shadow-2xl ring-4 ring-white/20 transition-all duration-500 hover:scale-105 hover:ring-yellow-500/50 xl:h-[400px] xl:w-[400px]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-20 w-full space-y-6 sm:space-y-8 lg:ml-100 lg:w-[55%] xl:w-[50%]">
              <div className="space-y-4">
                <h1 className="home-header text-3xl font-bold sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                  <span className="gradient-text" id="title">
                    {title}
                  </span>
                </h1>
              </div>

              <p className="text-pretty text-base leading-relaxed text-white/90 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                {subtitle}
              </p>

              <p className="text-xl text-red-500">{quote}</p>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 lg:ml-50">
                <a
                  href="#about-me"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl sm:px-10 sm:py-4"
                >
                  {primaryCta}
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 py-3 text-center font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10 sm:px-10 sm:py-4"
                >
                  {secondaryCta}
                </a>

                <div className="self-start rounded-full border-2 border-yellow-500 bg-black/80 px-6 py-3 shadow-2xl backdrop-blur-sm sm:self-auto sm:px-8 sm:py-4">
                  <p className="Alexi text-center text-base font-bold sm:text-lg">{availability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce sm:bottom-12">
        <a href="#about-me" className="text-white/60 transition-colors hover:text-red-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

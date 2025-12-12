import { AnimateBackground } from "./AnimatedBackground";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Partículas en el fondo - solo en esta sección */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimateBackground />
      </div>
      
      {/* Contenido en primer plano */}
      <div className="z-20 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {title}
        </h1>
        <p className="text-2xl md:text-3xl mb-8 mt-4">{subtitle}</p>
        <a 
          href="#about-me"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Contáctame
        </a>
      </div>
    </section>
  );
};
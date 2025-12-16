import { AnimateBackground } from "./AnimatedBackground";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimateBackground />
      </div>
      
      {/* Contenido en primer plano */}
      <div className="z-20 relative">
        <h1 className="home-header text-5xl md:text-7xl font-extrabold mb-2 -ml-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600">
          {title.slice(0, 10)}
        </h1>
        <h2 className="home-header text-2xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
          {title.slice(10)}
        </h2>
        <p className="text-2xl md:text-3xl mb-8 mt-4 text-white">{subtitle}</p>
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
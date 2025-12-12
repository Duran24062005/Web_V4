import { AnimateBackground } from "./AnimatedBackground";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {title}
        </h1>
        <p className="text-2xl md:text-3xl mb-8 mt-4">{subtitle}</p>
        <a 
          href="#contacto"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Contáctame
        </a>
      </div>
      
      <div id="particles-js" className="absolute inset-0 -z-10">
        <AnimateBackground />
      </div>
    </section>
  );
};
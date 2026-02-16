import { ContactComponent } from "../contact/components/ContactComponent"
import { AboutMe } from "./components/AboutMe"
import { Header } from "../home/components/Header"
import { MySkills } from "../home/components/MySkills"
import { MySperience } from "../home/components/MySperience"
import { TopProjects } from "../home/components/TopProjects"
import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import { useProjects } from "../shared/hooks/useProjects"

export const Recruiter = () => {
  const aboutDataUp: string[] = [
    `¡Bienvenidos a mi sitio web! Estoy encantado de que estés aquí. Este es el espacio donde comparto mi pasión y dedicación a todos los ámbitos que verás. Aquí encontrarás una muestra de mis proyectos, ideas y experiencias a lo largo de mi trayectoria.`,
    `Soy un desarrollador web full stack junior apasionado por crear soluciones digitales innovadoras y eficientes. Con 2 años de experiencia en el desarrollo de aplicaciones web, he trabajado en una amplia gama de proyectos, desde pequeñas aplicaciones hasta sistemas empresariales complejos.`,
    `Mi experiencia abarca tanto el desarrollo front-end como back-end, lo que me permite ofrecer soluciones integrales. Me especializo en tecnologías modernas como React, Laravel, Python(FastAPI) y bases de datos SQL y NoSQL. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades para mantenerme al día con las últimas tendencias en desarrollo web.`,
    `Fuera del mundo del código, disfruto de la Musica, la pintura y la lectura de ciencia ficción. Creo que estas actividades me ayudan a mantener una perspectiva fresca y creativa en mi trabajo como desarrollador.`,
  ]

  const aboutDataDown: string[] = [
    `Este sitio web fue desarrollado como parte de un reto enfocado en demostrar mis habilidades técnicas mediante un proyecto real, más allá de un CV tradicional. La intención es que quien lo visite pueda conocer quién soy, cómo trabajo y qué soy capaz de construir.`,
    `Para el frontend utilicé principalmente herramientas de Vercel como v0.dev para generar ideas de interfaz, estructuras de diseño y optimizar el uso de Tailwind. Para soporte en redacción técnica, decisiones y contexto del proyecto utilicé OpenAI (ChatGPT).`,
    `En el backend y la lógica del sistema también apoyé el desarrollo con IA, especialmente Anthropic (Claude), lo que me permitió mejorar la eficiencia y claridad del código. Además, complementé el proceso con herramientas de Google y diseño en Figma para mantener coherencia visual y buenas prácticas.`,
    `No suelo depender de una sola IA, sino combinar varias según sus fortalezas. Este proyecto refleja precisamente esa forma de trabajo: usar tecnología actual para construir soluciones funcionales, bien estructuradas y orientadas a resolver problemas reales.`,
  ]

  const image = "https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/image_e713f47e.png"
  const video = "https://duran24062005.github.io/Web_V4/public/video/WhatsApp%20Video%202026-02-14%20at%2012.45.45%20PM.mp4" 
    const { projectsList, loading  } = useProjects();
  return (
    <>
        <main className="min-h-screen flex flex-col bg-black mb-12">
          <NavBar items={navBarItems} />
          {/* Other components and content would go here */}
          <div className="flex h-screen">
            <Header title={`Alexi Duran G`} subtitle='Junior Full Stack Web Developer'/>
          </div>
          <AboutMe upText={aboutDataUp} image={image} downText={aboutDataDown} video={video} />
          <MySkills />
          <MySperience />
          <TopProjects projects={projectsList} state={loading} /> 
          <ContactComponent/>
        </main>
        <Footer />
        </>
  )
}

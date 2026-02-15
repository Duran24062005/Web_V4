
export const AboutMe = () => {
  return (
     <section id="about-me" className="py-20 z-20 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="md:w-1/2 lg:w-2/6 mb-8 md:mb-0">
                        <img src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/image_e713f47e.png" alt="Alexi Dg" className="rounded-full mx-auto border-4 border-purple-500 shadow-lg" />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Sobre mi</h2>
                        <p className="mb-4">
                            ¡Bienvenidos a mi sitio web! Estoy encantado de que estés aquí. Este es el espacio donde comparto mi pasión y dedicación
                            a todos los ámbitos que verás. Aquí encontrarás una muestra de mis proyectos, ideas y experiencias a lo largo de mi
                            trayectoria.
                        </p>
                        <p className="mb-4">
                            Soy un desarrollador web full stack junior apasionado por crear soluciones digitales innovadoras y
                            eficientes. Con 2 años de experiencia en el desarrollo de aplicaciones web, he
                            trabajado en una amplia gama de proyectos, desde pequeñas aplicaciones hasta sistemas
                            empresariales complejos.
                        </p>
                        <p className="mb-4">
                            Mi experiencia abarca tanto el desarrollo front-end como back-end, lo que me permite ofrecer
                            soluciones integrales. Me especializo en tecnologías modernas como React, Laravel, Python(FastAPI) y bases
                            de datos SQL y NoSQL. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis
                            habilidades para mantenerme al día con las últimas tendencias en desarrollo web.
                        </p>
                        <p>
                            Fuera del mundo del código, disfruto de la Musica, la pintura y la lectura de ciencia
                            ficción. Creo que estas actividades me ayudan a mantener una perspectiva fresca y creativa
                            en mi trabajo como desarrollador.
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:flex lg:flex  justify-center mt-24 px-2">
                <div className="flex flex-col-reverse md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/1 max-w-2xl px-2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left gradient-text">Quiero contarte sobre está web</h2>
                        <p className="mb-4 text-sm md:text-base">
                            Este sitio web fue desarrollado como parte de un reto enfocado en demostrar mis habilidades técnicas mediante un proyecto real, más allá de un CV tradicional. La intención es que quien lo visite pueda conocer quién soy, cómo trabajo y qué soy capaz de construir.
                        </p>
                        <p className="mb-4 text-sm md:text-base">
                            Para el frontend utilicé principalmente herramientas de Vercel como v0.dev para generar ideas de interfaz, estructuras de diseño y optimizar el uso de Tailwind. Para soporte en redacción técnica, decisiones y contexto del proyecto utilicé OpenAI (ChatGPT).
                        </p>
                        <p className="mb-4 text-sm md:text-base">
                            En el backend y la lógica del sistema también apoyé el desarrollo con IA, especialmente Anthropic (Claude), lo que me permitió mejorar la eficiencia y claridad del código. Además, complementé el proceso con herramientas de Google y diseño en Figma para mantener coherencia visual y buenas prácticas.
                        </p>
                        <p className="mb-4 text-sm md:text-base">
                            No suelo depender de una sola IA, sino combinar varias según sus fortalezas. Este proyecto refleja precisamente esa forma de trabajo: usar tecnología actual para construir soluciones funcionales, bien estructuradas y orientadas a resolver problemas reales.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-end px-2">
                    <video className="w-full max-w-lg rounded-xl border-4 border-purple-500 shadow-xl" controls>
                        <source src="https://duran24062005.github.io/Web_V4/public/video/WhatsApp%20Video%202026-02-14%20at%2012.45.45%20PM.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
  )
}

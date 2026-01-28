
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
        </section>
  )
}

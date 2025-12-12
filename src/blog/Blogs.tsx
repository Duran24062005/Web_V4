import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"

export const Blogs = () => {
  return (
    <>
    <NavBar items={navBarItems}/>
    <section id="blog" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Blog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article className="max-w-2xl mx-4 bg-black shadow-lg rounded-lg overflow-hidden" >
                        <img src="/image/setup.jpg" alt="My setup" className="w-full h-64 object-cover"/>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">El futuro de la tecnología</h2>
                            <p className="text-gray-400 mb-4">
                                El futuro de la tecnología promete transformar profundamente el mundo en que vivimos, y para la juventud, representa un
                                universo de oportunidades. Con avances en inteligencia artificial, automatización, blockchain y biotecnología, se espera
                                que surjan nuevas industrias y empleos que aún no existen, ofreciendo a las nuevas generaciones un amplio margen para
                                innovar y crecer profesionalmente.
                            </p>
                            <a href="#" className="text-purple-400 hover:text-purple-300">Leer más</a>
                        </div>
                    </article>
                    <article className="max-w-2xl mx-4 bg-black shadow-lg rounded-lg overflow-hidden">
                        <img src="/image/Fondo2.jpg" alt="AI generated city" className="w-full h-64 object-cover"/>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">La evolución de la Inteligencia Artificial en el desarrollo web</h2>
                            <p className="text-gray-400 mb-4">
                                Hoy en día, las IA son capaces de procesar enormes volúmenes de datos, reconocer patrones, y realizar tareas antes
                                reservadas para humanos, como conducir automóviles, diagnosticar enfermedades o escribir textos. Los avances en
                                aprendizaje automático (machine learning) y redes neuronales han permitido que estas tecnologías no solo ejecuten
                                órdenes, sino que también se mejoren a sí mismas con el tiempo.
                            </p>
                        </div>
                    </article>
                    <article className="max-w-2xl mx-4 bg-black shadow-lg rounded-lg overflow-hidden">
                        <img src="/image/learn.jpeg" alt="web standard reference images" className="w-full h-64 object-cover"/>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold">El Movimiento No-Code: Innovación al Alcance de Todos</h2>
                            <h3 className="text-xl font-bold m-2">Desarrollo sin código (No-Code/Low-Code)</h3>
                            <p className="text-gray-400 mb-4">
                                El movimiento "no-code" está transformando la forma en que las personas construyen aplicaciones y sitios web. Gracias a
                                plataformas que eliminan la necesidad de escribir código, cualquier persona, sin conocimientos técnicos avanzados, puede
                                crear soluciones tecnológicas. Herramientas como Webflow, Bubble y Airtable permiten diseñar y desarrollar sin tocar una
                                línea de programación, democratizando el acceso al desarrollo de software.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
            <Footer/>
        </section>
    </>
  )
}

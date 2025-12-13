import type { BlogPost } from "../../interfaces/blog.response"

interface BlogListProps {
    blogs: BlogPost[]
}

export const BlogsList = ({ blogs }: BlogListProps) => {
  return (
    <>
        {
            blogs.map((e)=>(
                <article key={e.id} className="max-w-2xl mx-4 bg-black shadow-lg rounded-lg overflow-hidden">
                        <img src={e.imageUrl ? e.imageUrl : "/image/Fondo2.jpg"} alt="AI generated city" className="w-full h-64 object-cover"/>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{e.title}</h2>
                            <p className="text-gray-400 mb-4">
                                {e.excerpt}
                            </p>
                            <ul>
                                {e.tags.map((tag, index)=>(
                                    <li key={index} className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded mr-2 my-1">
                                        {tag}
                                    </li>
                                ))
                                }
                            </ul>
                            <ul className="flex mt-4 justify-between">
                                <li>{new Date(e.createdAt).toISOString().split("T")[0]}</li>
                                <li>{new Date(e.updatedAt).toISOString().split("T")[0]}</li>
                            </ul>
                        </div>
                        <a href={`/blog/${e.id}`} className="text-purple-400 hover:text-purple-300 p-4 block">
                            Leer más
                        </a>
                </article>
            ))
        }
    </>
  )
}


{/*
     {e.content.substring(0, 150) + '...'}
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
*/}
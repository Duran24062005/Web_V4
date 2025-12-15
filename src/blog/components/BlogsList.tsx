import { Calendar, Eye, User } from "lucide-react";
import type { BlogPost } from "../../interfaces/blog.response"

interface BlogListProps {
    blogs: BlogPost[];
    state: boolean;
}

export const BlogsList = ({ blogs, state }: BlogListProps) => {
  return (
    <>
        {
            state  ? (
                <div className="text-center text-green-400">Cargando...</div>
            ) : 
            blogs.length === 0 && (
                <div className="text-center text-red-400">No se encontraron blogs.</div>
            ) ||
            blogs.map((blog) => (
                <article
                key={blog.id}
                className="group bg-black rounded-xl overflow-hidden border border-purple-800 hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/50 flex flex-col"
                >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-zinc-800">
                    <img
                    src={blog.imageUrl || "/placeholder.svg?height=400&width=600&query=blog+post"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-zinc-100 mb-3 line-clamp-2 group-hover:text-white transition-colors leading-snug">
                    {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">{blog.excerpt}</p>

                    {/* Tags */}
                    {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700 hover:bg-zinc-750 transition-colors"
                        >
                            {tag}
                        </span>
                        ))}
                        {blog.tags.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs">
                            +{blog.tags.length - 3}
                        </span>
                        )}
                    </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-4 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5" title="Fecha de creación">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        </span>
                        <span className="flex items-center gap-1.5" title="Vistas">
                        <Eye className="h-3.5 w-3.5" />
                        {blog.views}
                        </span>
                    </div>
                    </div>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <User className="h-3.5 w-3.5" />
                        <span className="font-medium">{blog.author}</span>
                    </div>
                    <a
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors group/link"
                    >
                        Leer más
                        <svg
                        className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                    </div>
                </div>
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
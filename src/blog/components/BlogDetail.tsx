import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Calendar, Eye, User, ArrowLeft, Tag, Share2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown";
import type { Blog } from "../../interfaces/blog.interface"
import { NavBar } from "../../shared/components/NavBar"
import { Footer } from "../../shared/components/Footer"
import { navBarItems } from "../../mock/data/navBarItems"
import { getErrorMessage } from "../../lib/http"
import { getBlogById } from "../../services/blogs/blogs.service"

export const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const foundBlog = await getBlogById(id as string)
        setBlog(foundBlog)
      } catch (err) {
        setError(getErrorMessage(err, "Error al cargar el blog"))
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      void fetchBlog()
    }
  }, [id])

  const handleShare = (platform: "facebook" | "twitter" | "linkedin") => {
    if (!blog) return

    const url = window.location.href
    const text = blog.title

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400")
  }

  if (loading) {
    return (
      <>
        <NavBar items={navBarItems} />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Cargando blog...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <NavBar items={navBarItems} />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <ArrowLeft className="w-10 h-10 text-red-500 rotate-180" />
            </div>
            <h2 className="text-4xl font-bold text-red-500 mb-4">Oops!</h2>
            <p className="text-xl text-gray-400 mb-8">{error || "Blog no encontrado"}</p>
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Blogs
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-white mb-2 mt-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-gray-300">{children}</li>,

  code: ({ children, ...props }) => (
    <code
      className="bg-gray-800 text-purple-400 px-2 py-1 rounded text-sm"
      {...props}
    >
      {children}
    </code>
  ),

  pre: ({ children, ...props }) => (
    <pre
      className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700"
      {...props}
    >
      {children}
    </pre>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-4 bg-purple-900/10 py-2 rounded-r">
      {children}
    </blockquote>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-purple-400 hover:text-purple-300 underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),

  img: ({ src, alt, ...props }) => (
    <img
      src={src || "/placeholder.svg"}
      alt={alt || ""}
      className="rounded-lg my-6 w-full shadow-lg"
      {...props}
    />
  ),
}



  return (
    <>
      <NavBar items={navBarItems} />

      <article className="min-h-screen w-full bg-black text-white py-20">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Volver a Blogs
          </button>

          {/* Blog Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight">{blog.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blog.views} vistas</span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-sm border border-purple-800 hover:bg-purple-900/50 transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {blog.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-8 shadow-2xl">
                <img
                  src={blog.imageUrl || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Excerpt */}
            <p className="text-xl text-gray-300 italic border-l-4 border-purple-500 pl-6 py-2 bg-purple-900/10 rounded-r-lg">
              {blog.excerpt}
            </p>
          </header>

          {/* Blog Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div className="text-gray-300 leading-relaxed">
              <ReactMarkdown
                components={markdownComponents}
              >
                {blog.content}
              </ReactMarkdown>

            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <button
                onClick={() => navigate("/blog")}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Ver todos los blogs
              </button>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Compartir:
                </span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
                  aria-label="Compartir en Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-3 rounded-full bg-gray-800 hover:bg-sky-500 transition-colors"
                  aria-label="Compartir en Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-3 rounded-full bg-gray-800 hover:bg-blue-700 transition-colors"
                  aria-label="Compartir en LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  )
}

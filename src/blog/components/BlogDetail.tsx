import { useEffect, useState } from 'react'
import { ArrowLeft, Bookmark, Link2, Share2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Blog } from '../../interfaces/blog.interface'
import { getErrorMessage } from '../../lib/http'
import { getBlogById } from '../../services/blogs/blogs.service'
import { CuratedPageShell } from '../../shared/components/CuratedPageShell'

const estimateReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const foundBlog = await getBlogById(id as string)
        setBlog(foundBlog)
      } catch (loadError) {
        setError(getErrorMessage(loadError, 'Error al cargar el blog'))
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      void fetchBlog()
    }
  }, [id])

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-10 font-headline text-3xl font-bold tracking-[-0.04em] text-[var(--curated-text)]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-16 font-headline text-3xl font-bold tracking-[-0.04em] text-[var(--curated-text)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-12 font-headline text-2xl font-bold tracking-[-0.03em] text-[var(--curated-text)]">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-8 font-editorial text-xl leading-relaxed text-[rgba(229,226,225,0.9)]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-12 border-l-2 border-[var(--curated-accent)] pl-6 font-editorial text-xl italic text-[var(--curated-muted)]">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="mb-8 list-disc space-y-3 pl-6 font-editorial text-xl text-[rgba(229,226,225,0.9)]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 font-editorial text-xl text-[rgba(229,226,225,0.9)]">
        {children}
      </ol>
    ),
    code: ({ children, className, ...props }) => (
      <code
        className={`rounded bg-[var(--curated-surface-lowest)] px-2 py-1 font-mono text-sm text-[var(--curated-accent)] ${className ?? ''}`}
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="my-12 overflow-x-auto border border-[rgba(153,144,124,0.1)] bg-[var(--curated-surface-lowest)] p-6 font-mono text-sm leading-6 text-[var(--curated-muted)]"
        {...props}
      >
        {children}
      </pre>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-[var(--curated-accent)] underline underline-offset-4"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }) => (
      <img
        src={src ?? '/placeholder.svg'}
        alt={alt ?? ''}
        className="my-8 w-full rounded-xl object-cover shadow-2xl"
        {...props}
      />
    ),
  }

  if (loading) {
    return (
      <CuratedPageShell activePath="/blog">
        <div className="flex min-h-screen items-center justify-center px-4 pt-32">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[var(--curated-accent)]" />
            <p className="font-editorial text-xl italic text-[var(--curated-muted)]">Cargando artículo...</p>
          </div>
        </div>
      </CuratedPageShell>
    )
  }

  if (error || !blog) {
    return (
      <CuratedPageShell activePath="/blog">
        <div className="flex min-h-screen items-center justify-center px-4 pt-32">
          <div className="text-center">
            <h2 className="mb-4 font-headline text-4xl font-bold text-red-400">No fue posible abrir el artículo</h2>
            <p className="mb-8 font-editorial text-xl italic text-[var(--curated-muted)]">
              {error || 'Blog no encontrado'}
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 bg-[var(--curated-accent)] px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-[#422c00]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </button>
          </div>
        </div>
      </CuratedPageShell>
    )
  }

  return (
    <CuratedPageShell activePath="/blog">
      <main className="pb-24 pt-32">
        <div className="mx-auto mb-12 max-w-4xl px-4 md:px-8">
          <Link
            to="/blog"
            className="group flex items-center gap-2 font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </div>

        <article className="mx-auto max-w-4xl px-4 md:px-8">
          <header className="mb-16">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-[rgba(153,144,124,0.15)] bg-[var(--curated-surface-lowest)] px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--curated-accent)]">
                {blog.tags[0] ?? 'Blog'}
              </span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[var(--curated-muted)]">
                {new Date(blog.createdAt).toLocaleDateString('es-CO', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="h-1 w-1 rounded-full bg-[rgba(153,144,124,0.5)]" />
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[var(--curated-muted)]">
                {estimateReadingTime(blog.content)} min lectura
              </span>
            </div>

            <h1 className="mb-8 font-headline text-4xl font-extrabold leading-[1.1] tracking-[-0.06em] md:text-6xl">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 border-y border-[rgba(153,144,124,0.1)] py-8">
              <img
                src="/image/image_94f2750b.png"
                alt="Alexi Durán Gómez"
                className="h-12 w-12 rounded-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
              <div>
                <p className="font-headline text-sm font-bold uppercase tracking-tight text-[var(--curated-text)]">
                  {blog.author}
                </p>
                <p className="font-editorial text-base italic text-[var(--curated-muted)]">
                  Desarrollo, arquitectura y producto
                </p>
              </div>

              <div className="ml-auto flex gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(153,144,124,0.2)] text-[var(--curated-muted)] transition-all hover:border-[var(--curated-accent)] hover:text-[var(--curated-accent)]"
                  aria-label="Copiar enlace"
                >
                  <Link2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(153,144,124,0.2)] text-[var(--curated-muted)] transition-all hover:border-[var(--curated-accent)] hover:text-[var(--curated-accent)]"
                  aria-label="Guardar artículo"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(153,144,124,0.2)] text-[var(--curated-muted)] transition-all hover:border-[var(--curated-accent)] hover:text-[var(--curated-accent)]"
                  aria-label="Compartir"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          {blog.imageUrl && (
            <div className="group relative mb-16">
              <div className="absolute inset-0 rounded-xl bg-[rgba(253,197,98,0.05)] opacity-0 transition-opacity group-hover:opacity-100" />
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="aspect-[21/9] w-full rounded-xl object-cover shadow-2xl"
              />
            </div>
          )}

          <div className="max-w-none">
            <p className="mb-8 font-editorial text-2xl italic leading-relaxed text-[var(--curated-muted)]">
              {blog.excerpt}
            </p>

            <ReactMarkdown components={markdownComponents}>{blog.content}</ReactMarkdown>
          </div>

          <footer className="mt-20 border-t border-[rgba(153,144,124,0.1)] pt-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[var(--curated-surface)] px-4 py-2 font-label text-xs text-[var(--curated-muted)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <span className="font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                  Compartir artículo
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </CuratedPageShell>
  )
}

import { Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CuratedPageShell } from '../shared/components/CuratedPageShell'
import { useBlogs } from '../shared/hooks/useBlogs'

const estimateReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export const Blogs = () => {
  const { blogs, loading, error, searchBlogs } = useBlogs()
  const [query, setQuery] = useState('')

  const tagOptions = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags).filter(Boolean)),
  ).slice(0, 6)

  const featuredBlog = blogs[0]
  const secondaryBlogs = blogs.slice(1)

  return (
    <CuratedPageShell activePath="/blog">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-32 md:px-8">
        <header className="mb-20">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-[-0.06em] md:text-7xl">
                El cuaderno del
                <br />
                <span className="font-editorial font-normal italic text-[var(--curated-accent)]">
                  desarrollador.
                </span>
              </h1>
              <p className="max-w-3xl font-editorial text-xl italic leading-relaxed text-[var(--curated-muted)] md:text-2xl">
                Artículos sobre arquitectura, frontend, backend y decisiones técnicas que vale la pena dejar escritas.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="group relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--curated-muted)]" />
                <input
                  value={query}
                  onChange={(event) => {
                    const value = event.target.value
                    setQuery(value)
                    searchBlogs(value)
                  }}
                  className="w-full border-0 border-b-2 border-[rgba(153,144,124,0.2)] bg-[var(--curated-surface)] py-4 pl-12 pr-4 font-editorial text-lg italic text-[var(--curated-text)] transition-all placeholder:text-[rgba(200,198,197,0.5)] focus:border-[var(--curated-accent)] focus:outline-none"
                  placeholder="Buscar artículos..."
                  type="text"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mb-16 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setQuery('')
              searchBlogs('all')
            }}
            className="rounded-full bg-[var(--curated-accent)] px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[#422c00]"
          >
            Todas las entradas
          </button>
          {tagOptions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag)
                searchBlogs(tag)
              }}
              className="rounded-full bg-[var(--curated-surface)] px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-muted)] transition-colors hover:text-[var(--curated-accent)]"
            >
              {tag}
            </button>
          ))}
        </section>

        {error && <p className="mb-8 text-center text-red-400">{error}</p>}

        {loading ? (
          <div className="space-y-10">
            <div className="grid gap-12 bg-[var(--curated-surface)] md:grid-cols-12">
              <div className="h-96 animate-pulse bg-[rgba(255,255,255,0.06)] md:col-span-7" />
              <div className="space-y-5 p-8 md:col-span-5">
                <div className="h-4 w-1/3 animate-pulse rounded bg-[rgba(255,255,255,0.06)]" />
                <div className="h-10 w-full animate-pulse rounded bg-[rgba(255,255,255,0.08)]" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-[rgba(255,255,255,0.06)]" />
              </div>
            </div>
          </div>
        ) : blogs.length > 0 ? (
          <>
            {featuredBlog && (
              <article className="group mb-24">
                <div className="grid overflow-hidden bg-[var(--curated-surface)] md:grid-cols-12 md:gap-12">
                  <div className="h-96 overflow-hidden md:col-span-7 md:h-auto">
                    <img
                      src={featuredBlog.imageUrl}
                      alt={featuredBlog.title}
                      className="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:col-span-5 md:p-12">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-accent)]">
                        Artículo destacado
                      </span>
                      <span className="h-px w-12 bg-[rgba(153,144,124,0.3)]" />
                      <span className="font-label text-xs font-medium uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                        {estimateReadingTime(featuredBlog.content)} min lectura
                      </span>
                    </div>
                    <Link to={`/blog/${featuredBlog.id}`}>
                      <h2 className="mb-6 font-headline text-3xl font-bold leading-tight transition-colors group-hover:text-[var(--curated-accent)] md:text-4xl">
                        {featuredBlog.title}
                      </h2>
                    </Link>
                    <p className="mb-8 font-editorial text-lg italic leading-relaxed text-[var(--curated-muted)]">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-4">
                      <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                        {new Date(featuredBlog.createdAt).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {secondaryBlogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className={`group flex flex-col overflow-hidden ${
                    index === 2 ? 'bg-[var(--curated-surface)] md:row-span-2' : 'bg-[var(--curated-surface-strong)]'
                  }`}
                >
                  {index === 2 && blog.imageUrl ? (
                    <div className="h-64 overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                      />
                    </div>
                  ) : null}

                  <div className="flex h-full flex-col p-8">
                    <div className="mb-8 flex items-start justify-between">
                      <span className="rounded-full bg-[var(--curated-surface-lowest)] px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--curated-muted)]">
                        {blog.tags[0] ?? 'Blog'}
                      </span>
                      <span className="font-label text-[10px] font-bold uppercase tracking-[0.24em] text-[rgba(200,198,197,0.55)]">
                        {estimateReadingTime(blog.content)} min
                      </span>
                    </div>
                    <h3 className={`${index === 2 ? 'text-3xl' : 'text-2xl'} mb-4 font-headline font-bold transition-colors group-hover:text-[var(--curated-accent)]`}>
                      {blog.title}
                    </h3>
                    <p className="mb-10 font-editorial italic text-[var(--curated-muted)]">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[rgba(153,144,124,0.08)] pt-6">
                      <span className="font-label text-[10px] uppercase tracking-[0.24em] text-[rgba(200,198,197,0.55)]">
                        {new Date(blog.createdAt).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="font-label text-xs uppercase tracking-[0.2em] text-[var(--curated-muted)] transition-colors group-hover:text-[var(--curated-accent)]">
                        Leer
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          </>
        ) : (
          <div className="bg-[var(--curated-surface)] p-12 text-center">
            <p className="font-editorial text-2xl italic text-[var(--curated-muted)]">
              No se encontraron artículos con el criterio actual.
            </p>
          </div>
        )}
      </main>
    </CuratedPageShell>
  )
}

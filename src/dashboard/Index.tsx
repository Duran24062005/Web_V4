import { Ban, CheckCircle2, Edit3, FileText, LogOut, Shield, Send, Users } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useLanguage } from '../i18n/LanguageContext'
import { buildLocalizedPath } from '../i18n/utils'
import type { User } from '../interfaces/auth.response'
import type { Blog } from '../interfaces/blog.interface'
import { getErrorMessage } from '../lib/http'
import { clearSession } from '../lib/session'
import { getAdminUsers, updateUserStatus } from '../services/admin/users.service'
import { createBlog, getBlogs } from '../services/blogs/blogs.service'
import { useAuthSession } from '../shared/hooks/useAuthSession'

const emptyBlogForm = {
  title: '',
  excerpt: '',
  content: '',
  tags: '',
  imageUrl: '',
  published: true,
}

export const Index = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { user } = useAuthSession()
  const [blogForm, setBlogForm] = useState(emptyBlogForm)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isPublishing, setIsPublishing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const userName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email || 'Autor'
  const isAdmin = user.isAdmin || user.role === 'admin'

  const myPosts = useMemo(() => {
    if (!user.id) return []
    return blogs.filter((blog) => blog.authorId === user.id || blog.author === userName || blog.authorName === userName)
  }, [blogs, user.id, userName])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true)
        const [loadedBlogs, loadedUsers] = await Promise.all([
          getBlogs(isAdmin ? 'all' : 'mine'),
          isAdmin ? getAdminUsers() : Promise.resolve([]),
        ])
        setBlogs(loadedBlogs)
        setUsers(loadedUsers)
      } catch (error) {
        toast.error(getErrorMessage(error, 'No se pudo cargar el dashboard'))
      } finally {
        setIsLoading(false)
      }
    }

    void loadDashboard()
  }, [isAdmin])

  const handleChange = (field: keyof typeof emptyBlogForm, value: string | boolean) => {
    setBlogForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleCreateBlog = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPublishing(true)

    try {
      const newBlog = await createBlog({
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        imageUrl: blogForm.imageUrl,
        published: blogForm.published,
        tags: blogForm.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      })

      setBlogs((current) => [newBlog, ...current])
      setBlogForm(emptyBlogForm)
      toast.success('Post publicado correctamente')
    } catch (error) {
      toast.error(getErrorMessage(error, 'No se pudo publicar el post'))
    } finally {
      setIsPublishing(false)
    }
  }

  const handleUserStatus = async (targetUser: User, status: 'active' | 'inactive' | 'blocked') => {
    const userId = targetUser._id || targetUser.id
    if (!userId) return

    try {
      const updatedUser = await updateUserStatus(userId, status)
      setUsers((current) => current.map((item) => ((item._id || item.id) === userId ? updatedUser : item)))
      toast.success(status === 'blocked' ? 'Cuenta bloqueada' : 'Cuenta activada')
    } catch (error) {
      toast.error(getErrorMessage(error, 'No se pudo actualizar la cuenta'))
    }
  }

  const handleLogout = () => {
    clearSession()
    navigate(buildLocalizedPath(language, '/login'))
  }

  const visiblePosts = isAdmin ? blogs : myPosts

  return (
    <main className="min-h-screen bg-[#090908] px-4 pb-20 pt-28 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 font-label text-xs uppercase tracking-[0.24em] text-[var(--curated-accent)]">
              <Shield className="h-4 w-4" />
              {isAdmin ? 'Panel admin' : 'Panel de autor'}
            </p>
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Hola, {userName}</h1>
            <p className="mt-3 max-w-2xl font-editorial text-lg italic text-[var(--curated-muted)]">
              Crea posts desde tu cuenta. La API asigna tu autoría automáticamente y mantiene proyectos solo para admin.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
          <Card className="border-white/10 bg-[var(--curated-surface)] text-white">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileText className="h-5 w-5 text-[var(--curated-accent)]" />
                <h2 className="font-headline text-2xl font-bold">Nuevo post</h2>
              </div>

              <form className="grid gap-5" onSubmit={handleCreateBlog}>
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={blogForm.title}
                    onChange={(event) => handleChange('title', event.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Resumen</Label>
                  <Input
                    id="excerpt"
                    value={blogForm.excerpt}
                    onChange={(event) => handleChange('excerpt', event.target.value)}
                    placeholder="Una idea corta para presentar el artículo"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Contenido markdown</Label>
                  <textarea
                    id="content"
                    value={blogForm.content}
                    onChange={(event) => handleChange('content', event.target.value)}
                    className="min-h-56 rounded-md border border-input bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-[var(--curated-accent)]"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags separados por coma</Label>
                    <Input
                      id="tags"
                      value={blogForm.tags}
                      onChange={(event) => handleChange('tags', event.target.value)}
                      placeholder="react, api, portfolio"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Imagen URL</Label>
                    <Input
                      id="imageUrl"
                      value={blogForm.imageUrl}
                      onChange={(event) => handleChange('imageUrl', event.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 text-sm text-[var(--curated-muted)]">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(event) => handleChange('published', event.target.checked)}
                  />
                  Publicar inmediatamente
                </label>

                <Button type="submit" disabled={isPublishing} className="gap-2">
                  <Send className="h-4 w-4" />
                  {isPublishing ? 'Publicando...' : 'Publicar post'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[var(--curated-surface)] text-white">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="font-headline text-2xl font-bold">{isAdmin ? 'Posts recientes' : 'Mis posts'}</h2>
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-[var(--curated-muted)]">
                  {visiblePosts.length}
                </span>
              </div>

              <div className="space-y-4">
                {isLoading ? <p className="text-sm text-[var(--curated-muted)]">Cargando...</p> : null}
                {visiblePosts.slice(0, 8).map((blog) => (
                  <article key={blog.id} className="border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3 className="font-headline text-lg font-bold">{blog.title}</h3>
                      <span className="text-xs uppercase tracking-[0.18em] text-[var(--curated-muted)]">
                        {blog.published ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-[var(--curated-muted)]">{blog.excerpt}</p>
                    <p className="mt-4 flex items-center gap-2 text-xs text-[var(--curated-muted)]">
                      <Edit3 className="h-3.5 w-3.5" />
                      {blog.authorName || blog.author}
                    </p>
                  </article>
                ))}
                {!isLoading && visiblePosts.length === 0 ? (
                  <p className="text-sm text-[var(--curated-muted)]">Todavía no hay posts para mostrar.</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </section>

        {isAdmin ? (
          <section className="border border-white/10 bg-[var(--curated-surface)] p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-5 w-5 text-[var(--curated-accent)]" />
              <h2 className="font-headline text-2xl font-bold">Usuarios</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-[var(--curated-muted)]">
                  <tr>
                    <th className="py-3">Nombre</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Rol</th>
                    <th className="py-3">Estado</th>
                    <th className="py-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((account) => {
                    const accountId = account._id || account.id || account.email
                    const isBlocked = account.status === 'blocked'

                    return (
                      <tr key={accountId} className="border-b border-white/5">
                        <td className="py-4">
                          {account.first_name} {account.last_name}
                        </td>
                        <td className="py-4 text-[var(--curated-muted)]">{account.email}</td>
                        <td className="py-4">{account.is_admin ? 'admin' : account.role}</td>
                        <td className="py-4">
                          <span className="rounded-full bg-black/30 px-3 py-1 text-xs">{account.status}</span>
                        </td>
                        <td className="py-4 text-right">
                          <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={() => handleUserStatus(account, isBlocked ? 'active' : 'blocked')}
                          >
                            {isBlocked ? <CheckCircle2 className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                            {isBlocked ? 'Activar' : 'Bloquear'}
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

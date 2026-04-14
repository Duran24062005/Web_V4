import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import { BlogsList } from "./components/BlogsList"
import { PreSearch } from "./components/PreSearch"
import { SearchBar } from "./components/SearchBar"
import { useBlogs } from "../shared/hooks/useBlogs"

export const Blogs = () => {
  const { blogs, loading, error, searchBlogs } = useBlogs();

  const name = ['hola', 'mundo'];
  
  return (
    <>
    {/* Navbar = Barra de navegación */}
    <NavBar items={navBarItems} />

    <section id="blog" className="pt-2 mb-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold my-8 text-center gradient-text">Blog</h2>

                {/* Componente de busqueda del blog = Input entrada */}
                <div className="flex justify-end">
                  <SearchBar placeholder="Buscar Blog" btnDescription="Buscar" onQuery={searchBlogs} />
                </div>

                {/* Busquedas anteriores = busquedas precargadas */}
                <PreSearch paramSearch={name} onLabelClick={searchBlogs} />
                {error && <p className="mb-6 text-center text-red-400">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">   
                    {/* Lista de blogs = tarjetas de blog */}
                    <BlogsList blogs={blogs} state={loading} />
                </div>
            </div>
    </section>

    {/* Footer = pie de pagina */}
    <Footer />
    </>
  )
}

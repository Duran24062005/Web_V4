import { BlogsMockData } from "../mock/data/blog.mock.data"
import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import { BlogsList } from "./components/BlogsList"
import { PreSearch } from "./components/PreSearch"
import { SearchBar } from "./components/SearchBar"

export const Blogs = () => {
  return (
    <>
    {/* Navbar = Barra de navegación */}
    <NavBar items={navBarItems} />

    <section id="blog" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Blog</h2>

                {/* Componente de busqueda del blog = Input entrada */}
                <SearchBar placeholder="Buscar proyecto" btnDescription="Buscar" onQuery={()=>{}} />

                {/* Busquedas anteriores = busquedas precargadas */}
                <PreSearch />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">   
                    {/* Lista de blogs = tarjetas de blog */}
                    <BlogsList blogs={BlogsMockData} />
                </div>
            </div>
    </section>

    {/* Footer = pie de pagina */}
    <Footer />
    </>
  )
}

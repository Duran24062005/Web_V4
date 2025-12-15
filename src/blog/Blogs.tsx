import { useEffect, useState } from "react"
import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import { BlogsList } from "./components/BlogsList"
import { PreSearch } from "./components/PreSearch"
import { SearchBar } from "./components/SearchBar"
import type { Blog } from "../interfaces/blog.interface"
import getBlogs from "../actions/getblogs.action"

export const Blogs = () => {
  const [ blogList, setBlogList ] = useState<Blog[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  const name = ['hola', 'mundo'];

  useEffect(()=>{
    const setBlogsList = async () => {
      const data = await getBlogs('all');
      setBlogList(data);
      setLoading(false);
    }
    setBlogsList()
  }, []);

  const hanlderClickBlogs = () => {

  }

  return (
    <>
    {/* Navbar = Barra de navegación */}
    <NavBar items={navBarItems} />

    <section id="blog" className="pt-2">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold my-8 text-center gradient-text">Blog</h2>

                {/* Componente de busqueda del blog = Input entrada */}
                <div className="flex justify-end">
                  <SearchBar placeholder="Buscar Blog" btnDescription="Buscar" onQuery={()=>{}} />
                </div>

                {/* Busquedas anteriores = busquedas precargadas */}
                <PreSearch paramSearch={name} onLabelClick={hanlderClickBlogs} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">   
                    {/* Lista de blogs = tarjetas de blog */}
                    <BlogsList blogs={blogList} state={loading} />
                </div>
            </div>
    </section>

    {/* Footer = pie de pagina */}
    <Footer />
    </>
  )
}

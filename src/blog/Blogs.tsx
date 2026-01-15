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
  const [ allBlogs, setAllBlogs ] = useState<Blog[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  const name = ['hola', 'mundo'];

  useEffect(()=>{
    const setBlogsList = async () => {
      const data = await getBlogs('all');
      setBlogList(data);
      setAllBlogs(data);
      setLoading(false);
    }
    setBlogsList()
  }, []);

  const hanlderClickBlogs = (query: string) => {
    // console.log("Hola desde el blog" + query);
    // Si la query está vacía, muestra todos los blogs nuevamente
    if (!query) {
        setBlogList(blogList);
        return;
    }

    
    const lowerCaseQuery = query.toLocaleLowerCase();
    
    // Filtra la lista completa (allBlogs)
    const filteredResults = blogList.filter((blog) => {
      // Revisa si el título coincide
      const titleMatch = blog.title.toLocaleLowerCase().includes(lowerCaseQuery);
      // Revisa si el autor coincide
      const authorMatch = blog.author.toLocaleLowerCase().includes(lowerCaseQuery);
      // Revisa si alguna etiqueta coincide
      const techMatch = blog.tags.some(tag => tag.toLocaleLowerCase().includes(lowerCaseQuery));
      
      // Devuelve true si coincide con cualquiera de los criterios (OR lógico)
      return titleMatch || authorMatch || techMatch;
    });
    
    // Actualiza solo los blogs visibles
    setBlogList(filteredResults);
    
    if (query === 'all') {
        setBlogList(allBlogs);
        return;
    }
  }
  
  return (
    <>
    {/* Navbar = Barra de navegación */}
    <NavBar items={navBarItems} />

    <section id="blog" className="pt-2 mb-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold my-8 text-center gradient-text">Blog</h2>

                {/* Componente de busqueda del blog = Input entrada */}
                <div className="flex justify-end">
                  <SearchBar placeholder="Buscar Blog" btnDescription="Buscar" onQuery={(e)=>hanlderClickBlogs(e)} />
                </div>

                {/* Busquedas anteriores = busquedas precargadas */}
                <PreSearch paramSearch={name} onLabelClick={hanlderClickBlogs} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">   
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

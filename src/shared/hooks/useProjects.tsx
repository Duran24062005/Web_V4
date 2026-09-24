import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/Project.interfaces";

export const useProjects = () => {
    const [projectsList, setProjects] = useState<Project[]>([]);
      const [allProjects, setAllProjects] = useState<Project[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
            const setProjectsList = async () => {
                // Without a configured API there is nothing to fetch; skip the failing request.
                if (!import.meta.env.VITE_URL_BASE_API) {
                  setLoading(false);
                  return;
                }

                // Loaded on demand so axios stays out of the home page's entry chunk.
                const [{ default: getProjects }, { getErrorMessage }] = await Promise.all([
                  import("../../actions/get.projects.actions"),
                  import("../../lib/http"),
                ]);
                try {
                  const dat = await getProjects("all");
                  setProjects(dat);
                  setAllProjects(dat);
                } catch (loadError) {
                  setError(getErrorMessage(loadError, 'No fue posible cargar los proyectos.'));
                } finally {
                  setLoading(false);
                }
            }
              void setProjectsList();
        }, []);
    
    
        const handleSearch = (query: string) => {
          if (query === "all") {
            setProjects(allProjects);
            return;
          }
          
          const search = allProjects.filter(project => 
            project.technologies.some(tech => 
              tech.toLowerCase().includes(query.toLowerCase())
            )
          );
          setProjects(search);
        }
  return {
    projectsList,
    handleSearch,
    loading,
    error,
  }
}

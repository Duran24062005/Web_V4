import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/Project.interfaces";
import getProjects from "../../actions/get.projects.actions";
import { getErrorMessage } from "../../lib/http";

export const useProjects = () => {
    const [projectsList, setProjects] = useState<Project[]>([]);
      const [allProjects, setAllProjects] = useState<Project[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
            const setProjectsList = async () => {
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

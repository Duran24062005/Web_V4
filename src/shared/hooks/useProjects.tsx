import { useEffect, useState } from "react";
import type { Project } from "../../interfaces/Project.interfaces";
import getProjects from "../../actions/get.projects.actions";

export const useProjects = () => {
    const [projectsList, setProjects] = useState<Project[]>([]);
      const [allProjects, setAllProjects] = useState<Project[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
    
        useEffect(() => {
          const setProjectsList = async () => {
              const dat = await getProjects("all");
              setProjects(dat);
              setAllProjects(dat);
              setLoading(false);
          }
            setProjectsList();
        }, []);
    
    
        const hanlderSerach = (query: string) => {
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
    hanlderSerach,
    loading
  }
}

interface FilterProjectsProps {
  // Define any props needed for filtering projects
  techList: string[];
  onLabelClick: (tech: string) => void;
}


export const FilterProjects = ({ techList, onLabelClick }: FilterProjectsProps) => {
  return (
    <>
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      {techList.map((tech) => (
        <button
          key={tech}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition"
          onClick={()=>onLabelClick(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
    </>
  )
}

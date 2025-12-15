interface PreSearchProps {
  paramSearch: string[];
  onLabelClick: (param: string)=>void;
}
export const PreSearch = ({ paramSearch, onLabelClick }: PreSearchProps) => {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      <button
        className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-500 transition"
        onClick={()=>onLabelClick("all")}
      >
        Todos
      </button>
      {paramSearch.map((param) => (
        <button
          key={param}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition"
          onClick={()=>onLabelClick(param.toLocaleLowerCase())}
        >
          {param}
        </button>
      ))}
    </div>
  )
}

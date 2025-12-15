import { useEffect, useState } from "react";

interface Props {
    placeholder?: string;
    btnDescription?: string;
    onQuery: (query: string)=>void;
}


export const SearchBar = ({ placeholder, btnDescription, onQuery }: Props) => {

  const [ query, setQuery ] = useState('');

  
  useEffect(()=>{
    // console.log('Hola desde el efecto');
    const timeoutId = setTimeout(()=>{
      onQuery(query);
    }, 900);
    // onQuery(query);

    return ()=>{
      // console.log('Se disparó la función de limpieza. Componente desmontado');
      clearTimeout(timeoutId);
    }
    
  }, [query, onQuery]);

  const handlerSearch = () => {
    onQuery(query);
    setQuery('');
  }

  {/* Manjador de la logica del enter */}
  const handlerKeyDown = (event:  React.KeyboardEvent<HTMLInputElement>) =>{
    if (event.key === 'Enter') {
      handlerSearch();
    }
  }



  return (
    <div className="my-4">
      <div className="search-container flex justify-end border-2 border-purple-800 rounded-md">
          <input 
            className="text-black pl-2 border border-sky-600 rounded-tl-md rounded-bl-md"
            type="text" 
            placeholder={ placeholder ? placeholder : 'Busca lo que quiera' } 
            value={query}
            onChange={(e)=> setQuery(e.target.value)}

            onKeyDown={handlerKeyDown}
          />
          <button
          className="bg-purple-700 hover:bg-purple-400 rounded-tr-md rounded-br-md p-2"
          onClick={handlerSearch}
          >{btnDescription ? btnDescription : 'Buscar'}</button>
      </div>
    </div>
  )
}
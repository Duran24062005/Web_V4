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
    <div className="search-container">
        <input 
          type="text" 
          placeholder={ placeholder ? placeholder : 'Busca lo que quiera' } 
          value={query}
          onChange={(e)=> setQuery(e.target.value)}

          onKeyDown={handlerKeyDown}
        />
        <button
        onClick={handlerSearch}
        >{btnDescription ? btnDescription : 'Buscar'}</button>
    </div>
  )
}
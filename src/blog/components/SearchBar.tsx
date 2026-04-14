import { useState } from "react";

interface Props {
    placeholder?: string;
    btnDescription?: string;
    onQuery: (query: string)=>void;
}


export const SearchBar = ({ placeholder, btnDescription, onQuery }: Props) => {

  const [ query, setQuery ] = useState('');
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
            className="text-gray-200 pl-2 border-sky-600 rounded-tl-md rounded-bl-md focus:outline-none focus:ring-0 focus:border-transparent"
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

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "../pages/MoviesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setmovies] = useState([]);
  const query = searchParams.get("q");

  const getTopRatedMovies = async(url) => {

    const res = await fetch(url)
    const data = await res.json()

    setmovies(data.results);
  };

  useEffect(()=>{

    const searchWidthQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    getTopRatedMovies(searchWidthQueryURL);
    
  }, [query]);

    return (
    <div className="conatiner">
    <h2 className="title">
      Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && 
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
    );
  };
  
  export default Search
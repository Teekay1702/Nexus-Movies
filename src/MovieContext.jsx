import React, { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const MOVIE_DB_API_KEY = "5017776348012e3d35b87f7c927200a4";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState({ show: false, msg: "" });

  
  
    const fetchMovies = async (searchQuery = "") => {
      setLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_DB_API_KEY}`;
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${query}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
          setMovies(data.results);
          setIsError({ show: false, msg: "" });
        } else {
          setMovies([]);
          setIsError({ show: true, msg: "No movies found!" });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsError({ show: true, msg: "Something went wrong!" });
      }
      setLoading(false);
    };

    useEffect(() => {fetchMovies();
  }, [query]);

  return (
    <MovieContext.Provider value={{ movies, loading, query, setQuery, isError, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useGlobalContext = () => useContext(MovieContext);

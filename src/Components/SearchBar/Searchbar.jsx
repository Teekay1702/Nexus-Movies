import React, { useState, useEffect } from 'react';

const SearchBar = ({ onMoviesUpdate, onLoadingUpdate }) => {
  const MOVIE_DB_API_KEY = '5017776348012e3d35b87f7c927200a4'
  const [query, setQuery] = useState('')
  const [isError, setIsError] = useState({ show: false, msg: '' })

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        onLoadingUpdate(true)
        const url = query
          ? `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${query}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_DB_API_KEY}`
        
        const response = await fetch(url)
        const data = await response.json()
        
        if (data.results.length === 0) {
          setIsError({ show: true, msg: 'No movies found' })
        } else {
          setIsError({ show: false, msg: '' })
        }
        
        onMoviesUpdate(data.results)
        onLoadingUpdate(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setIsError({ show: true, msg: 'Error fetching movies' })
        onLoadingUpdate(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchMovies()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query, onMoviesUpdate, onLoadingUpdate])

  return (
    <section className="search-section">
      <h2>Search for movie</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input 
            type="text" 
            placeholder="Search Movie" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
        </div>
      </form>
      <div className="card-error">
        <p>{isError.show && isError.msg}</p>
      </div>
    </section>
  );
};

export default SearchBar;
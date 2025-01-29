import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/Searchbar'

function App() {
  const MOVIE_DB_API_KEY = '5017776348012e3d35b87f7c927200a4'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [isError, setIsError] = useState({ show: false, msg: '' })

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
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
        
        setMovies(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setIsError({ show: true, msg: 'Error fetching movies' })
        setLoading(false)
      }
    }

    // Add a small delay to avoid too many API calls while typing
    const timeoutId = setTimeout(() => {
      fetchMovies()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query]) // Add query as dependency to refetch when search term changes

  return (
    <div className="app">
      <h1>Nexus Movies</h1>
      
      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        isError={isError}
      />

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <p>Rating: {movie.vote_average}/10</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
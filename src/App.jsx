import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const MOVIE_DB_API_KEY = '5017776348012e3d35b87f7c927200a4'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_DB_API_KEY}`
        )
        const data = await response.json()
        setMovies(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="app">
      <h1>Nexus Movies</h1>
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

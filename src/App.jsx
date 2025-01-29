import { useState } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/Searchbar'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <div className="app">
      <h1>Nexus Movies</h1>
      
      <SearchBar 
        onMoviesUpdate={setMovies}
        onLoadingUpdate={setLoading}
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
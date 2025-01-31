import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../MovieContext';

const SearchResults = () => {
  const { query } = useParams();
  const {fetchMovies, setQuery } = useGlobalContext();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '5017776348012e3d35b87f7c927200a4'; // Replace with your actual TMDb API key

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleBackToHome = () => {
    setQuery("");
    fetchMovies();
    navigate('/');
  }

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="movies-grid">
      <button onClick={handleBackToHome} className="back-button">
        ⬅ Back to Home
      </button>
      <h2>Search Results for "{query}"</h2>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <h3>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </h3>
            <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
          </div>
        ))
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;

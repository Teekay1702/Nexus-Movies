import React from 'react';
import './Movie-Grid.css';
import { useGlobalContext } from '../../MovieContext';
import { Link } from 'react-router-dom';

const MovieGrid = () => {
  const { movies, loading } = useGlobalContext();

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="movies-grid">
      <Link to="/" className="back-button">⬅ Back to Home</Link>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
          <h2>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
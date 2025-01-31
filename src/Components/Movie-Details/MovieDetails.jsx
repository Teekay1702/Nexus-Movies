import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../MovieContext';

const MovieDetails = () => {
  const { id } = useParams();
  const { setQuery, query } = useGlobalContext();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=5017776348012e3d35b87f7c927200a4`
        );
        const data = await response.json();
        setMovie(data);

        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5017776348012e3d35b87f7c927200a4`
        );
        const trailerData = await trailerResponse.json();

        const officialTrailer = trailerData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (officialTrailer) {
            setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
          }

          setLoading(false);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBackToSearchResults = () => {
    if (query) {
      navigate(`/search/${query}`);
    } else {
      navigate('/');
    }
  };

  const handleBackToHome = () => {
    setQuery("");
    navigate('/');
  };

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="movie-details">
        <div className="buttons">
        {query && (
          <button onClick={handleBackToSearchResults} className="back-button">
            ⬅ Back to Search Results
          </button>
        )}
        <button onClick={handleBackToHome} className="home-button">
          🏠 Back to Home
        </button>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
      <p>Release Date: {movie.release_date}</p>
      {/* YouTube Trailer */}
      {trailer ? (
        <div className="trailer">
          <h3>Watch Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={trailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No trailer available.</p>
      )}
    </div>
  );
};

export default MovieDetails;

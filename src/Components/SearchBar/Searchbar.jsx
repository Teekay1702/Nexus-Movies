import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';
import 'font-awesome/css/font-awesome.min.css';
import { useGlobalContext } from '../../MovieContext';

const SearchBar = () => {
  const { setQuery, isError } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres,  setGenres] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedGenre) {
      navigate(`/search/${selectedGenre || searchTerm}`);
    } else if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }

    setSearchTerm('');
    setSelectedGenre('');
  }

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=5017776348012e3d35b87f7c927200a4');
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data.genres || []);
      }
      catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section className="search-section">
      <h2>Search for a Movie</h2>
      <form onSubmit={handleSearch}>
        <div>
          <input 
            type="text" 
            placeholder="Search Movie" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
            </select>
          <button type="submit">🔍 Search</button>
        </div>
      </form>
      {isError.show && <p className="card-error">{isError.msg}</p>}
    </section>
  );
};

export default SearchBar;

import React, { useState } from 'react';  // ✅ Add useState
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';
import { useGlobalContext } from '../../MovieContext';

const SearchBar = () => {
  const { setQuery, isError } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setQuery(searchTerm);
      navigate(`/search/${searchTerm}`);
    }
  };

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
          <button type="submit">🔍 Search</button>
        </div>
      </form>
      {isError.show && <p className="card-error">{isError.msg}</p>}
    </section>
  );
};

export default SearchBar;

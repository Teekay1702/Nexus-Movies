import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './Components/SearchBar/Searchbar';
import MovieGrid from './Components/Movie-Grid/Movie-grid';
import MovieDetails from './Components/Movie-Details/MovieDetails';
import SearchResults from './Components/SearchBar/SearchResults';
import { MovieProvider } from './MovieContext';

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <h1>Nexus Movies</h1>
          <SearchBar />
          <Routes>
            <Route path="/" element={<MovieGrid />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search/genre/:genreId" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;

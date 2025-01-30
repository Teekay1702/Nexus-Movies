import React from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/Searchbar'
import MovieGrid from './Components/Movie-Grid/Movie-grid'
import { MovieProvider } from './MovieContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
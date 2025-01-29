import React from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/Searchbar'
import MovieGrid from './Components/Movie-Grid/Movie-grid'
import { MovieProvider } from './MovieContext'

function App() {
  return (
    <MovieProvider>
      <div className="app">
        <h1>Nexus Movies</h1>
        <SearchBar />
        <MovieGrid />
      </div>
    </MovieProvider>
  )
}

export default App
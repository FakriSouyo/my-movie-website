import React, { useState, useEffect, useRef } from 'react'
import { searchMovies } from '../utils/api'

const SearchBar = ({ onMovieClick }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeout = useRef(null)

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true)
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
      searchTimeout.current = setTimeout(async () => {
        try {
          const searchResults = await searchMovies(query)
          setResults(searchResults.slice(0, 5))
        } catch (error) {
          console.error("Error searching movies:", error)
        } finally {
          setIsSearching(false)
        }
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 px-4 py-2 rounded-full bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg">
          <p className="p-2 text-center text-muted-foreground">Mencari...</p>
        </div>
      )}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center p-2 hover:bg-accent cursor-pointer"
              onClick={() => {
                onMovieClick(movie.id)
                setQuery('')
                setResults([])
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-12 h-18 object-cover rounded mr-4"
              />
              <span className="text-foreground">{movie.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
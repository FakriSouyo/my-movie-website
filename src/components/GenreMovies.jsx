import React, { useState, useEffect } from 'react'
import { fetchMoviesByGenre } from '../utils/api'
import MovieGrid from './MovieGrid'

const GenreMovies = ({ genreId, genreName, onMovieClick }) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMoviesByGenre = async () => {
      try {
        setIsLoading(true)
        const fetchedMovies = await fetchMoviesByGenre(genreId)
        setMovies(fetchedMovies)
      } catch (error) {
        console.error("Error fetching movies by genre:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getMoviesByGenre()
  }, [genreId])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Memuat...</div>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Film {genreName}</h2>
      <MovieGrid movies={movies} onMovieClick={onMovieClick} />
    </div>
  )
}

export default GenreMovies
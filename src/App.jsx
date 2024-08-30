import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MovieGrid from './components/MovieGrid'
import FeaturedMovie from './components/FeaturedMovie'
import MovieDetails from './components/MovieDetails'
import GenreMovies from './components/GenreMovies'
import LandingPage from './components/LandingPage'
import { fetchTrendingMovies, fetchMovieDetails } from './utils/api'

function App() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        const movies = await fetchTrendingMovies()
        setTrendingMovies(movies)

        const featuredMoviesData = await Promise.all(
          movies.slice(0, 5).map(movie => fetchMovieDetails(movie.id))
        )
        setFeaturedMovies(featuredMoviesData)
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId)
    setSelectedGenre(null)
  }

  const handleGenreClick = (genreId, genreName) => {
    setSelectedGenre({ id: genreId, name: genreName })
    setSelectedMovieId(null)
  }

  const handleBackToHome = () => {
    setSelectedMovieId(null)
    setSelectedGenre(null)
  }

  const handleEnterApp = () => {
    setShowLanding(false)
  }

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <LandingPage key="landing" onEnter={handleEnterApp} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen bg-background text-foreground"
        >
          <Header onBackToHome={handleBackToHome} onMovieClick={handleMovieClick} onGenreClick={handleGenreClick} />
          <main className="flex-1 p-4 space-y-8 pt-20">
            {isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-primary"
                >
                  Memuat...
                </motion.div>
              </div>
            ) : selectedMovieId ? (
              <MovieDetails movieId={selectedMovieId} onMovieClick={handleMovieClick} />
            ) : selectedGenre ? (
              <GenreMovies
                genreId={selectedGenre.id}
                genreName={selectedGenre.name}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <>
                {featuredMovies.length > 0 && <FeaturedMovie movies={featuredMovies} onMovieClick={handleMovieClick} />}
                <MovieGrid movies={trendingMovies} onMovieClick={handleMovieClick} />
              </>
            )}
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
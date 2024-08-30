import React, { useState, useEffect } from 'react'
import { fetchMovieDetails, fetchRelatedMovies } from '../utils/api'

const MovieDetails = ({ movieId, onMovieClick }) => {
  const [movie, setMovie] = useState(null)
  const [relatedMovies, setRelatedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true)
        const details = await fetchMovieDetails(movieId)
        setMovie(details)
        const related = await fetchRelatedMovies(movieId)
        setRelatedMovies(related.slice(0, 6))
      } catch (error) {
        console.error("Error fetching movie details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getMovieDetails()
  }, [movieId])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Memuat...</div>
  }

  if (!movie) {
    return <div className="text-center">Film tidak ditemukan</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-[400px] object-cover rounded-xl"
        />
        <div className="absolute bottom-0 left-0 p-6 flex items-end">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-40 rounded-xl shadow-lg mr-6"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-lg text-white">{new Date(movie.release_date).getFullYear()}</span>
              <span className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-lg text-white">{movie.genres.map(genre => genre.name).join(' • ')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Sinopsis</h2>
          <p className="text-lg mb-6 text-muted-foreground">{movie.overview}</p>
          
          {movie.videos.results.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[400px] rounded-xl"
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Pemeran Utama</h2>
          <div className="grid grid-cols-3 gap-4">
            {movie.credits.cast.slice(0, 6).map(actor => (
              <div key={actor.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="font-semibold text-sm">{actor.name}</p>
                <p className="text-xs text-muted-foreground">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Film Terkait</h2>
        {relatedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedMovies.map(movie => (
              <div 
                key={movie.id} 
                className="cursor-pointer"
                onClick={() => onMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-lg mb-2"
                />
                <p className="font-semibold text-sm">{movie.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Tidak ada film terkait yang ditemukan.</p>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
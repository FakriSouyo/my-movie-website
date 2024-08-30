import React, { useState, useEffect } from 'react'

const FeaturedMovie = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 5000) // Ganti slide setiap 5 detik

    return () => clearInterval(timer)
  }, [movies])

  if (!movies || movies.length === 0) return null

  const movie = movies[currentIndex]

  const {
    title,
    backdrop_path,
    release_date,
    vote_average,
    genres,
    overview
  } = movie;

  const releaseYear = new Date(release_date).getFullYear();
  const imageUrl = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;

  return (
    <section className="relative h-[calc(100vh-4rem)] md:h-96 overflow-hidden rounded-xl shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-end p-4 md:p-8">
        <h2 className="text-2xl md:text-5xl font-bold font-heading text-white mb-2 md:mb-4">{title}</h2>
        <div className="flex flex-wrap items-center space-x-2 md:space-x-4 text-white/80 mb-2 md:mb-3">
          <span className="text-sm md:text-lg">{releaseYear}</span>
          <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded-full text-xs md:text-sm">
            {vote_average.toFixed(1)}
          </span>
          <span className="text-sm md:text-lg hidden md:inline">{genres.map(genre => genre.name).join(' • ')}</span>
        </div>
        <p className="text-white/90 text-xs md:text-lg max-w-2xl mb-3 md:mb-6 line-clamp-2 md:line-clamp-3">
          {overview}
        </p>
        <button 
          className="bg-red-600 hover:bg-red-700 transition-colors text-white font-bold text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 rounded-full w-max"
          onClick={() => onMovieClick(movie.id)}
        >
          Lihat Detail
        </button>
      </div>
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedMovie
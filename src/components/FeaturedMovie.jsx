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
    <section className="relative h-96 overflow-hidden rounded-xl shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex flex-col justify-end p-8">
        <h2 className="text-5xl font-bold font-heading text-white mb-4">{title}</h2>
        <div className="flex items-center space-x-4 text-white/80 mb-3">
          <span className="text-lg">{releaseYear}</span>
          <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
            {vote_average.toFixed(1)}
          </span>
          <span className="text-lg">{genres.map(genre => genre.name).join(' • ')}</span>
        </div>
        <p className="text-white/90 text-lg max-w-2xl mb-6 line-clamp-3">
          {overview}
        </p>
        <button 
          className="bg-red-600 hover:bg-red-700 transition-colors text-white font-bold text-lg px-8 py-3 rounded-full w-max"
          onClick={() => onMovieClick(movie.id)}
        >
          Lihat Detail
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
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
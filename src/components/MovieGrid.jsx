import React from 'react'

const MovieGrid = ({ movies, onMovieClick }) => {
  return (
    <section className="mt-8">
      <h3 className="text-3xl font-bold font-heading mb-6 text-primary">Film Trending</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => onMovieClick(movie.id)}
          >
            <div className="aspect-[2/3] relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4">
                <h4 className="text-white text-center font-bold text-lg mb-2 line-clamp-2">{movie.title}</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-white text-sm">{new Date(movie.release_date).getFullYear()}</span>
                  <span className="text-yellow-400 text-sm bg-yellow-400/20 px-2 py-1 rounded-full">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <button className="bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded-full transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MovieGrid
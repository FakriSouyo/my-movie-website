import React, { useState, useEffect } from 'react'
import { fetchGenres } from '../utils/api'

const Sidebar = ({ isOpen, onClose, onGenreClick }) => {
  const [genres, setGenres] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getGenres = async () => {
      try {
        setIsLoading(true)
        const fetchedGenres = await fetchGenres()
        setGenres(fetchedGenres)
      } catch (error) {
        console.error("Error fetching genres:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getGenres()
  }, [])

  return (
    <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-card overflow-y-auto transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <button
          className="mb-4 text-foreground"
          onClick={onClose}
        >
          Tutup
        </button>
        <nav className="space-y-4">
          <h2 className="text-lg font-semibold font-heading text-foreground">Genre</h2>
          {isLoading ? (
            <p>Memuat genre...</p>
          ) : (
            <ul className="space-y-2">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      onGenreClick(genre.id, genre.name);
                      onClose();
                    }}
                  >
                    {genre.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
import React, { useState, useEffect } from 'react'
import { fetchGenres } from '../utils/api'

const Sidebar = ({ onGenreClick }) => {
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

  if (isLoading) {
    return <aside className="w-64 p-4 bg-card fixed top-16 left-0 bottom-0 overflow-y-auto">Memuat genre...</aside>
  }

  return (
    <aside className="w-64 p-4 bg-card fixed top-16 left-0 bottom-0 overflow-y-auto">
      <nav className="space-y-4">
        <h2 className="text-lg font-semibold font-heading text-foreground">Genre</h2>
        <ul className="space-y-2">
          {genres.map((genre) => (
            <li key={genre.id}>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  onGenreClick(genre.id, genre.name);
                }}
              >
                {genre.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
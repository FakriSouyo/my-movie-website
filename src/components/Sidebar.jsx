import React, { useState, useEffect } from 'react'
import { fetchGenres } from '../utils/api'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

const Sidebar = ({ isOpen, onClose, onGenreClick }) => {
  const [genres, setGenres] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { language } = useLanguage();
  const t = translations[language];

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
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <aside 
        className={`fixed top-16 left-0 bottom-0 w-64 bg-background/80 backdrop-blur-md overflow-y-auto transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            className="mb-4 text-foreground hover:text-primary transition-colors"
            onClick={onClose}
          >
            {t.close}
          </button>
          <nav className="space-y-4">
            <h2 className="text-lg font-semibold font-heading text-foreground">{t.genres}</h2>
            {isLoading ? (
              <p>{t.loading}</p>
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
    </>
  )
}

export default Sidebar
import React from 'react'
import SearchBar from './SearchBar'
import LanguageToggle from './LanguageToggle'

const Header = ({ onBackToHome, onMovieClick, toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-md border-b border-border z-30">
      <div className="flex items-center">
        <button
          className="mr-4 text-foreground p-2 hover:bg-red-600 hover:text-white rounded-full transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold cursor-pointer text-foreground" onClick={onBackToHome}>MovieFlix</h1>
      </div>
      <SearchBar onMovieClick={onMovieClick} />
    </header>
  )
}

export default Header
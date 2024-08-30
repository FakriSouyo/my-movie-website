import React from 'react'
import SearchBar from './SearchBar'

const Header = ({ onBackToHome, onMovieClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-4 bg-background border-b border-border z-10">
      <h1 className="text-2xl font-bold cursor-pointer text-foreground" onClick={onBackToHome}>MovieFlix</h1>
      <SearchBar onMovieClick={onMovieClick} />
    </header>
  )
}

export default Header
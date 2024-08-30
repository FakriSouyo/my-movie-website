import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LandingPage = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(onEnter, 1000) // Delay to allow exit animation
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-black text-white p-4 overflow-hidden"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-bold mb-4 text-red-500">MovieFlix</h1>
            <p className="text-xl mb-8">Jelajahi Dunia Sinema dalam Genggaman Anda</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-4xl"
          >
            {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Animation', 'Thriller'].map((genre, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                className="bg-red-800/30 p-6 rounded-lg text-center shadow-lg"
              >
                <h3 className="text-lg font-semibold">{genre}</h3>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: '#ff3e3e' }}
            className="bg-red-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
            onClick={handleEnter}
          >
            Mulai Menjelajah
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-4 text-sm text-gray-400"
          >
            © 2023 MovieFlix. All rights reserved.
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LandingPage
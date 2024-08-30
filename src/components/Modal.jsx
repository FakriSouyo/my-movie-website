import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose()
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-start p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-lg w-full max-w-5xl my-8"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
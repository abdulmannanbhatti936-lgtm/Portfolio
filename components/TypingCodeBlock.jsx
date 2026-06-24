'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CODE_STRING = `{
  "name": "Abdul Mannan Bhatti",
  "role": "Full Stack Developer",
  "stack": [
    "Next.js",
    "React",
    "TailwindCSS",
    "PHP",
    "MySQL"
  ],
  "passion": "Building scalable engines"
}`;

export default function TypingCodeBlock() {
  const [displayedText, setDisplayedText] = useState('')
  const [showAvatar, setShowAvatar] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    if (showAvatar) {
      setDisplayedText('')
      return
    }
    const interval = setInterval(() => {
      if (currentIndex <= CODE_STRING.length) {
        setDisplayedText(CODE_STRING.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 40) // Typing speed

    return () => clearInterval(interval)
  }, [showAvatar])

  return (
    <motion.div 
      onClick={() => setShowAvatar(!showAvatar)}
      className="w-[360px] h-[500px] cursor-pointer rounded-3xl relative overflow-hidden shadow-2xl border border-white/60 bg-white/70 backdrop-blur-md group"
      whileHover={{ scale: 1.02 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      role="button"
      tabIndex={0}
      aria-label="Toggle profile avatar and code block"
    >
      <AnimatePresence mode="wait">
        {showAvatar ? (
          <motion.div
            key="avatar"
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="absolute inset-0 bg-[#282828]"
          >
             <Image 
               src="/images/BitEmoji.jpeg"
               alt="Bitmoji Avatar"
               fill
               className="object-contain"
               sizes="360px"
             />
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, scale: 1.1, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="absolute inset-0 p-8 font-space flex flex-col justify-center"
          >
            {/* Fake window controls */}
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            
            <div className="text-[13px] sm:text-[14px] leading-relaxed text-body whitespace-pre font-medium mt-8">
              <span className="text-[#1a1a1a] drop-shadow-sm">{displayedText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle indicator to click */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-subtle/50 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        Click to flip
      </div>
    </motion.div>
  )
}

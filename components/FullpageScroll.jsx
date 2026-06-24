'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FullpageScroll({ sections, initialSection = 0 }) {
  const [currentSection, setCurrentSection] = useState(initialSection)
  const [isScrolling, setIsScrolling] = useState(false)
  const currentSectionRef = useRef(initialSection)
  const isScrollingRef = useRef(false)
  const touchStart = useRef(0)
  const scrollTimeout = useRef(null)
  const containerRef = useRef(null)

  const handleScroll = useCallback((direction) => {
    if (isScrollingRef.current) return
    
    // Check for internal scrolling before switching sections
    const activeSection = containerRef.current?.querySelector('.section-content-wrapper')
    if (activeSection) {
      const isAtBottom = Math.abs(activeSection.scrollHeight - activeSection.clientHeight - activeSection.scrollTop) < 5
      const isAtTop = activeSection.scrollTop < 5

      if (direction === 'down' && !isAtBottom) return // Let it scroll internally
      if (direction === 'up' && !isAtTop) return // Let it scroll internally
    }

    let next = currentSectionRef.current
    if (direction === 'down' && next < sections.length - 1) {
      next++
    } else if (direction === 'up' && next > 0) {
      next--
    }

    if (next !== currentSectionRef.current) {
      isScrollingRef.current = true
      setIsScrolling(true)
      currentSectionRef.current = next
      setCurrentSection(next)
      
      // Dispatch event for 3D background swush
      window.dispatchEvent(new CustomEvent('section-change', { detail: { index: next } }))

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        isScrollingRef.current = false
        setIsScrolling(false)
      }, 200) // Even faster lock
    }
  }, [sections.length])

  useEffect(() => {
    const onWheel = (e) => {
      const activeSection = containerRef.current?.querySelector('.section-content-wrapper')
      if (activeSection) {
        const isAtBottom = Math.abs(activeSection.scrollHeight - activeSection.clientHeight - activeSection.scrollTop) < 5
        const isAtTop = activeSection.scrollTop < 5
        const direction = e.deltaY > 0 ? 'down' : 'up'

        if ((direction === 'down' && !isAtBottom) || (direction === 'up' && !isAtTop)) {
          // Allow native scroll inside the section
          return 
        }
      }

      e.preventDefault()
      if (Math.abs(e.deltaY) < 40) return
      handleScroll(e.deltaY > 0 ? 'down' : 'up')
    }

    const onTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY
    }

    const onTouchEnd = (e) => {
      const delta = touchStart.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 50) return 
      handleScroll(delta > 0 ? 'down' : 'up')
    }

    const onKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') handleScroll('down')
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') handleScroll('up')
    }

    const handleGoToSection = (e) => {
      const targetIndex = e.detail.index
      if (targetIndex !== undefined && targetIndex >= 0 && targetIndex < sections.length) {
        if (!isScrollingRef.current) {
          isScrollingRef.current = true
          setIsScrolling(true)
          currentSectionRef.current = targetIndex
          setCurrentSection(targetIndex)
          
          // Dispatch event for 3D background swush
          window.dispatchEvent(new CustomEvent('section-change', { detail: { index: targetIndex } }))

          if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
          scrollTimeout.current = setTimeout(() => {
            isScrollingRef.current = false
            setIsScrolling(false)
          }, 200)
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('go-to-section', handleGoToSection)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('go-to-section', handleGoToSection)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [handleScroll, sections.length])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ 
            duration: 0.2, // Even faster duration
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="w-full h-full will-change-transform"
        >
          <div className="section-content-wrapper w-full h-full overflow-y-auto scroll-smooth">
            {sections[currentSection]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-40">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isScrollingRef.current) {
                isScrollingRef.current = true
                setIsScrolling(true)
                currentSectionRef.current = i
                setCurrentSection(i)
                window.dispatchEvent(new CustomEvent('section-change', { detail: { index: i } }))
                setTimeout(() => {
                  isScrollingRef.current = false
                  setIsScrolling(false)
                }, 200)
              }
            }}
            className="group relative flex items-center justify-center"
          >
            <div className={`w-[2px] transition-all duration-500 ${
              currentSection === i ? 'h-10 bg-sidebar' : 'h-4 bg-gray-300 group-hover:bg-gray-400'
            }`} />
          </button>
        ))}
      </div>
    </div>
  )
}

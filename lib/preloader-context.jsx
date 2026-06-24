'use client'

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'

const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false })

const PreloaderContext = createContext({ homeContentReady: false })

/** Resets on full page load/reload — never across client-side navigation */
let preloaderFinished = false
/** Stable across React Strict Mode re-mounts within the same page load */
let preloaderDecision = null

export function PreloaderProvider({ children }) {
  const [showPreloader, setShowPreloader] = useState(false)
  const [homeContentReady, setHomeContentReady] = useState(false)

  useLayoutEffect(() => {
    if (preloaderFinished) {
      setShowPreloader(false)
      setHomeContentReady(true)
      return
    }

    if (preloaderDecision === 'hide') {
      setShowPreloader(false)
      setHomeContentReady(true)
      return
    }

    if (preloaderDecision === 'show') {
      setShowPreloader(true)
      setHomeContentReady(false)
      return
    }

    preloaderDecision = 'show'
    setShowPreloader(true)
    setHomeContentReady(false)
  }, [])

  const handleComplete = useCallback(() => {
    preloaderFinished = true
    preloaderDecision = 'hide'
    setShowPreloader(false)
    setHomeContentReady(true)
  }, [])

  return (
    <PreloaderContext.Provider value={{ homeContentReady }}>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader key="preloader" onComplete={handleComplete} />
        )}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  )
}

export function useHomeContentReady() {
  return useContext(PreloaderContext).homeContentReady
}

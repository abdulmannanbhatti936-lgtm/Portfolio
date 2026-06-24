'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SECTION_HASH_MAP } from '../data/navigation'
import { getReturnSection } from './navigation'

const ActiveSectionContext = createContext(null)

function resolveHomeSectionIndex() {
  if (typeof window === 'undefined') return 0
  const hash = window.location.hash.replace('#', '') || getReturnSection() || ''
  const index = SECTION_HASH_MAP[hash]
  return index !== undefined ? index : 0
}

export function ActiveSectionProvider({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    if (isHome) setActiveSection(resolveHomeSectionIndex())
  }, [isHome, pathname])

  useEffect(() => {
    const handleSectionChange = (e) => {
      const index = e.detail?.index
      if (typeof index === 'number') {
        setActiveSection(index)
      }
    }
    window.addEventListener('section-change', handleSectionChange)
    return () => window.removeEventListener('section-change', handleSectionChange)
  }, [])

  const setSection = useCallback((index) => {
    if (typeof index === 'number' && index >= 0) {
      setActiveSection(index)
    }
  }, [])

  const value = useMemo(
    () => ({ activeSection, setActiveSection: setSection, isHome }),
    [activeSection, setSection, isHome]
  )

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionContext)
  if (!ctx) {
    throw new Error('useActiveSection must be used within ActiveSectionProvider')
  }
  return ctx
}

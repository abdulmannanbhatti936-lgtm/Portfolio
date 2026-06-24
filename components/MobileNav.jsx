'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { HiMenuAlt2, HiX } from 'react-icons/hi'
import { useActiveSection } from '../lib/active-section-context'
import {
  isHomeNavActive,
  isRouteNavActive,
  handleNavClick,
  isHomeRoute,
  NAV_ITEMS,
  homePathWithReturn,
} from '../lib/navigation'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { activeSection, isHome } = useActiveSection()

  return (
    <motion.div
      animate={{ x: isHome ? 0 : 100, opacity: isHome ? 1 : 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden fixed top-0 left-0 w-full z-[60] p-4 flex justify-end items-center bg-transparent"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sidebar p-2 focus:outline-none focus:ring-2 focus:ring-sidebar rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <HiX size={32} /> : <HiMenuAlt2 size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-sidebar z-[70] flex flex-col items-center justify-center gap-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
              aria-label="Close menu"
            >
              <HiX size={32} />
            </button>

            <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, i) => {
                const isActive = isHome
                  ? isHomeNavActive(item.sectionIndex, activeSection)
                  : isRouteNavActive(pathname, item.href)

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={
                        !isHome && isHomeRoute(item.href) && item.href === '/'
                          ? homePathWithReturn()
                          : item.href
                      }
                      prefetch
                      onClick={(e) => {
                        setIsOpen(false)
                        if (!isHome && isHomeRoute(item.href)) {
                          return
                        }
                        handleNavClick(e, pathname, item.sectionIndex, item.hash)
                      }}
                      className={`text-3xl font-space font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-4 py-2 ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-gray-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

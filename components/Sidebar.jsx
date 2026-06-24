'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import Magnetic from './Magnetic'
import { useActiveSection } from '../lib/active-section-context'
import { NAV_ITEMS } from '../data/navigation'
import {
  isHomeNavActive,
  isRouteNavActive,
  handleNavClick,
  isHomeRoute,
  homePathWithReturn,
} from '../lib/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const { activeSection, isHome } = useActiveSection()

  return (
    <motion.aside
      animate={{ x: isHome ? 0 : -150 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col justify-center items-center w-16 h-screen fixed left-6 top-0 z-50"
      aria-label="Main navigation"
    >
      <nav className="bg-sidebar py-8 px-2 rounded-[30px] flex flex-col gap-6 shadow-2xl border border-white/5" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = isHome
            ? isHomeNavActive(item.sectionIndex, activeSection)
            : isRouteNavActive(pathname, item.href)
          
          return (
            <Link
              key={item.href}
              href={
                !isHome && isHomeRoute(item.href) && item.href === '/'
                  ? homePathWithReturn()
                  : item.href
              }
              prefetch={true}
              onClick={(e) => {
                if (!isHome && isHomeRoute(item.href)) {
                  return
                }
                handleNavClick(e, pathname, item.sectionIndex, item.hash)
              }}
              className="relative group flex items-center justify-center"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Magnetic>
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white ${
                    isActive ? 'bg-white text-sidebar shadow-lg' : 'text-[#8899aa] hover:text-white hover:bg-white/5'
                  }`}
                  tabIndex={0}
                >
                  <item.icon size={22} aria-hidden="true" />
                </div>
              </Magnetic>

              {/* Tooltip */}
              <span className="absolute left-20 bg-sidebar text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none uppercase tracking-widest whitespace-nowrap shadow-xl border border-white/10 translate-x-2 group-hover:translate-x-0" role="tooltip">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
      </motion.aside>
  )
}

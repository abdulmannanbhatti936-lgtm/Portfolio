'use client'
import { memo } from 'react'

const SectionWrapper = memo(function SectionWrapper({ children, className = "", id = "", sectionIndex = null }) {
  return (
    <section
      id={id}
      data-section-index={sectionIndex ?? undefined}
      className={`min-h-screen flex items-center pt-28 sm:pt-32 lg:pt-0 px-8 sm:px-20 lg:pl-72 lg:pr-32 relative ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  )
})

export default SectionWrapper

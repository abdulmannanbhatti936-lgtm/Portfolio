'use client'
import { memo } from 'react'
import { motion } from 'framer-motion'

const SectionLabel = memo(function SectionLabel({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="section-label mb-8"
    >
      {children}
    </motion.div>
  )
})

export default SectionLabel

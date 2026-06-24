'use client'
import { useRef, memo } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const Magnetic = memo(function Magnetic({ children }) {
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 350, damping: 20, mass: 0.1 }
  const quickX = useSpring(x, springConfig)
  const quickY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    x.set(middleX * 0.4)
    y.set(middleY * 0.4)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ position: 'relative', x: quickX, y: quickY }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
})

export default Magnetic

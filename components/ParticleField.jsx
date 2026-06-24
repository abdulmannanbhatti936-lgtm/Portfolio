'use client'
import { useEffect, useRef, useState } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particlesArray = []
    let animationFrameId
    
    const mouse = {
      x: null,
      y: null,
      radius: 200
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.vx = 0
        this.vy = 0
        this.size = Math.random() * 2 + 1
        this.color = `rgba(45, 55, 72, ${Math.random() * 0.5 + 0.3})` // Dark slate for visibility on light bg
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        let dxBase = this.baseX - this.x
        let dyBase = this.baseY - this.y
        
        // Always apply a gentle spring back to original position
        this.vx += dxBase * 0.02
        this.vy += dyBase * 0.02

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < mouse.radius) {
            // Minor magnetic pull towards cursor
            let force = (mouse.radius - distance) / mouse.radius
            
            let ax = (dx / distance) * force * 0.4
            let ay = (dy / distance) * force * 0.4

            this.vx += ax
            this.vy += ay
          }
        }

        // Apply friction to slow down and stabilize
        this.vx *= 0.85
        this.vy *= 0.85

        this.x += this.vx
        this.y += this.vy
      }
    }

    const init = () => {
      particlesArray = []
      // Use window dimensions to keep particle count consistent across all screen pixel densities
      const numberOfParticles = (window.innerWidth * window.innerHeight) / 6000 
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * window.innerWidth
        let y = Math.random() * window.innerHeight
        particlesArray.push(new Particle(x, y))
      }
    }

    const animate = () => {
      // Must use canvas width/height which are scaled by dpr, or clear Rect with window dimensions since ctx is scaled
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw()
        particlesArray[i].update()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      init()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (isMobile) return null

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}

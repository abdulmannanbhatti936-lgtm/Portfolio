'use client'
import { useRef, useEffect, useState } from 'react'

export default function Background3D() {
  const containerRef = useRef(null)
  const speedRef = useRef(0.03)
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
    if (!containerRef.current || isMobile) return

    let disposed = false
    let frameId = null
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (disposed || !containerRef.current) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, precision: 'lowp' })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2))
      containerRef.current.appendChild(renderer.domElement)

      const geometry = new THREE.PlaneGeometry(20, 20, 20, 20)
      const material = new THREE.MeshPhongMaterial({
        color: 0x2D3748,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = -Math.PI / 3
      scene.add(mesh)

      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(0, 1, 1)
      scene.add(light)
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))

      camera.position.z = 5

      const clock = new THREE.Clock()

      const animate = () => {
        if (disposed) return

        if (!document.hidden) {
          const elapsedTime = clock.getElapsedTime()

          if (speedRef.current > 0.03) {
            speedRef.current *= 0.95
          }

          mesh.rotation.z = elapsedTime * speedRef.current
          renderer.render(scene, camera)
        }

        frameId = requestAnimationFrame(animate)
      }

      animate()

      const handleSectionChange = () => {
        speedRef.current = 0.5
      }

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('section-change', handleSectionChange)
      window.addEventListener('resize', handleResize)

      cleanup = () => {
        window.removeEventListener('section-change', handleSectionChange)
        window.removeEventListener('resize', handleResize)
        if (frameId) cancelAnimationFrame(frameId)
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-60"
      aria-hidden="true"
    />
  )
}

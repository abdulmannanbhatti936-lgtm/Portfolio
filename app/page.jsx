'use client'
import { useEffect, useMemo } from 'react'
import { SECTION_HASH_MAP } from '../data/navigation'
import { getReturnSection } from '../lib/navigation'
import { useHomeContentReady } from '../lib/preloader-context'
import FullpageScroll from '../components/FullpageScroll'
import HeroSection from '../components/HeroSection'
import AboutPreview from '../components/AboutPreview'
import Expertise from '../components/Expertise'
import ProjectsPreview from '../components/ProjectsPreview'
import ServicesPreview from '../components/ServicesPreview'
import ContactSection from '../components/ContactSection'

export default function Home() {
  const homeContentReady = useHomeContentReady()

  const sections = useMemo(
    () => [
      <HeroSection key="hero" />,
      <AboutPreview key="about" />,
      <Expertise key="expertise" />,
      <ProjectsPreview key="projects" />,
      <ServicesPreview key="services" />,
      <ContactSection key="contact" />,
    ],
    []
  )

  useEffect(() => {
    if (!homeContentReady) return

    const scrollToSection = () => {
      const hash =
        window.location.hash.replace('#', '') || getReturnSection() || ''
      const index = SECTION_HASH_MAP[hash]
      if (index !== undefined) {
        requestAnimationFrame(() => {
          window.dispatchEvent(
            new CustomEvent('go-to-section', { detail: { index } })
          )
        })
      }
    }

    window.addEventListener('hashchange', scrollToSection)
    return () => window.removeEventListener('hashchange', scrollToSection)
  }, [homeContentReady])

  if (!homeContentReady) return null

  const hash = typeof window !== 'undefined' ? (window.location.hash.replace('#', '') || getReturnSection() || '') : ''
  const initialSection = SECTION_HASH_MAP[hash] ?? 0

  return <FullpageScroll sections={sections} initialSection={initialSection} />
}

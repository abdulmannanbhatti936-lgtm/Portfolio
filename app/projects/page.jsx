'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import SectionLabel from '../../components/SectionLabel'
import BackButton from '../../components/BackButton'
import { projects } from '../../data/projects'
import { PAGE_TRANSITION, pageFadeUp } from '../../lib/motion-presets'
export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="subpage-container subpage-enter px-8 sm:px-20 lg:pl-56 lg:pr-32 py-24 bg-background min-h-screen">
      <BackButton />
      <SectionLabel instant>FULL PORTFOLIO</SectionLabel>
      
      <motion.h1
        {...pageFadeUp}
        className="text-5xl sm:text-7xl font-space font-bold text-heading mb-24"
      >
        Selected <span className="text-subtle">Works.</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...PAGE_TRANSITION, delay: Math.min(i * 0.04, 0.12) }}
              viewport={{ once: true, margin: '-40px' }}
              className={`border-beam-wrapper group flex flex-col rounded-2xl ${i === 0 ? 'md:col-span-2' : ''}`}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="border-beam-content pointer-events-none" />
              {/* Project Info */}
              <div className="flex flex-col gap-4 p-8 rounded-[calc(1rem-2px)] bg-white/40 dark:bg-sidebar/20 transition-colors h-full relative z-10">
                <div className="flex justify-between items-start">
                  <Link href={`/projects/${project.id}`}>
                    <h2 className="text-3xl font-space font-bold text-heading group-hover:text-primary transition-colors cursor-pointer">
                      {project.title}
                    </h2>
                  </Link>
                  <span className="text-xs font-space font-bold text-border">
                    {project.id < 10 ? `0${project.id}` : project.id}
                  </span>
                </div>
                
                <p className="text-body text-lg font-inter leading-relaxed opacity-70 max-w-2xl flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-heading px-3 py-1 rounded-full bg-white/90 border-2 border-sidebar/20 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-auto pt-4 border-t border-border/50">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-2 text-sm font-space font-bold text-heading hover:text-primary transition-colors"
                  >
                    Read Case Study <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                  {project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-space font-bold text-heading hover:text-primary transition-colors"
                    >
                      <FiExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Footer Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 max-w-2xl mx-auto text-center"
      >
        <div className="bg-sidebar/5 border border-border/50 p-8 rounded-3xl mb-8">
           <FiGithub size={32} className="mx-auto text-subtle mb-4" />
           <p className="text-heading font-space font-bold text-xl mb-2">Looking for Source Code?</p>
           <p className="text-subtle font-inter text-base">The source code for all the projects listed above, along with detailed documentation, can be found on my GitHub.</p>
        </div>
        <a
          href="https://github.com/abdulmannanbhatti936-lgtm?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 text-2xl font-space font-bold text-heading hover:text-primary transition-all"
          aria-label="Check out GitHub profile"
        >
          View my GitHub
          <span className="text-3xl">↗</span>
        </a>
      </motion.div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {hoveredProject && hoveredProject.previewImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 hidden sm:block overflow-hidden rounded-xl shadow-2xl bg-sidebar/5 border border-border/20"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 270,
              width: '400px',
              height: '250px'
            }}
          >
            <Image 
              src={hoveredProject.previewImage} 
              alt={hoveredProject.title} 
              fill 
              className="object-cover"
              sizes="400px"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

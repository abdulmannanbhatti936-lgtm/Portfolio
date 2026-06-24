'use client'
import { motion, useSpring } from 'framer-motion'
import SectionLabel from './SectionLabel'
import ReturnAwareLink from './ReturnAwareLink'
import SectionWrapper from './SectionWrapper'
import MagneticElement from './MagneticElement'
import ParticleField from './ParticleField'

import { projects } from '../data/projects'

const featuredProjects = projects
  .filter(p => p.featured)
  .slice(0, 2)
  .map((p, i) => ({
    id: `0${i + 1}`,
    name: p.title,
    desc: p.description
  }))

export default function ProjectsPreview() {
  return (
    <SectionWrapper id="projects" sectionIndex={3} className="relative overflow-hidden">

      {/* Background Text */}
      <motion.div 
        initial={{ x: 50 }}
        whileInView={{ x: -50 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none"
      >
        <h2 className="text-[15rem] lg:text-[25rem] font-space font-black text-primary/5 leading-none -rotate-90 origin-left translate-x-20">
          WORKS
        </h2>
      </motion.div>

      <div className="max-w-6xl w-full">
        <SectionLabel>MY PROJECTS</SectionLabel>
        
        <div className="space-y-8 mb-20">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="border-beam-wrapper group cursor-pointer relative z-10"
            >
              <div className="border-beam-content pointer-events-none" />
              <div className="flex items-center gap-6 lg:gap-12 px-6 lg:px-10 py-10 relative z-10 bg-white/40 group-hover:bg-white/60 transition-colors duration-500 rounded-[calc(1rem-2px)]">
                <span className="text-2xl lg:text-4xl font-space font-black text-border group-hover:text-primary transition-colors shrink-0">
                  {project.id}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-4xl lg:text-6xl font-space font-bold text-heading">
                    {project.name}
                  </h3>
                  <p className="text-subtle text-lg font-inter opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 truncate max-w-full block">
                    {project.desc}
                  </p>
                </div>
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 shrink-0">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <MagneticElement>
            <ReturnAwareLink
              href="/projects"
              returnHash="projects"
              className="group inline-flex items-center gap-6 text-2xl font-space font-bold text-primary hover:text-heading transition-all"
            >
              Explore My Projects
              <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                →
              </div>
            </ReturnAwareLink>
          </MagneticElement>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

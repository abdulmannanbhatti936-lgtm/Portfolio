'use client'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import ReturnAwareLink from './ReturnAwareLink'
import SectionWrapper from './SectionWrapper'
import MagneticElement from './MagneticElement'

export default function AboutPreview() {
  return (
    <SectionWrapper id="about" sectionIndex={1} className="relative overflow-hidden py-24 lg:py-32">
      


      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        
        {/* Left - Main Headline */}
        <div className="lg:col-span-7">
          <SectionLabel>ABOUT ME</SectionLabel>
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-space font-bold text-heading leading-[1.15] tracking-tight mt-6"
          >
            A software engineer <br className="hidden sm:block" />
            <span className="text-subtle/50 italic font-medium tracking-normal">who loves to build</span> <br className="hidden sm:block" />
            clean engines.
          </motion.h3>
        </div>

        {/* Right - Bio & CTA in a sleek glass card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 lg:p-12 rounded-3xl bg-primary/5 backdrop-blur-sm border border-primary/10 shadow-xl"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-8 w-16 h-[3px] bg-primary rounded-full -translate-y-1/2" />

            <p className="text-body text-lg sm:text-xl font-inter leading-relaxed mb-10 opacity-90">
              I am a results-driven Full Stack Developer from Islamabad, Pakistan. 
              I specialize in architecting scalable web applications with a focus on code integrity and fluid user experiences.
            </p>

            <MagneticElement>
              <ReturnAwareLink
                href="/about"
                returnHash="about"
                className="group flex items-center justify-center gap-4 px-8 py-4 bg-primary text-background rounded-full font-space font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                Learn More
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </ReturnAwareLink>
            </MagneticElement>
          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  )
}

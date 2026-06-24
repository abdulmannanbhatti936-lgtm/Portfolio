'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ReturnAwareLink from './ReturnAwareLink'
import SectionWrapper from './SectionWrapper'
import TypingCodeBlock from './TypingCodeBlock'

export default function HeroSection() {
  return (
    <SectionWrapper id="home" sectionIndex={0}>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 max-w-[1100px]">
          <div className="text-subtle font-space font-medium text-[12px] tracking-[0.4em] uppercase mb-8">
            Abdul Mannan Bhatti
          </div>
          
          <motion.h3
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[82px] font-space font-black text-heading leading-[1.1] tracking-tighter mb-8"
          >
            <span className="block whitespace-nowrap">Full Stack</span>
            <span className="block whitespace-nowrap">Web Developer</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-subtle text-[16px] sm:text-[17px] font-inter leading-relaxed max-w-2xl mb-12 opacity-80"
          >
            Hi! I am Mannan, a fullstack Web Developer specializing in modern Web Development with a growing focus on Artificial Intelligence. I architect scalable, production-ready engines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a href="/Resume.pdf" className="bg-[#2D3748] text-white px-8 py-3.5 rounded-xl font-inter text-sm font-semibold transition-all hover:bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D3748]" aria-label="Download CV">
              Download CV
            </a>
            <ReturnAwareLink
              href="/contact"
              returnHash="home"
              className="border-2 border-[#2D3748] text-[#2D3748] px-8 py-3.5 rounded-xl font-inter text-sm font-semibold transition-all hover:bg-[#2D3748] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D3748]"
              aria-label="Contact me"
            >
              Contact Me
            </ReturnAwareLink>
          </motion.div>
        </div>

        {/* Right Content - Vertical Oval Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative hidden xl:block shrink-0"
        >
          <TypingCodeBlock />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-space font-bold tracking-[0.5em] uppercase text-subtle opacity-50">Scroll</span>
        <div className="w-[1px] h-8 bg-subtle opacity-20" />
      </motion.div>
    </SectionWrapper>
  )
}

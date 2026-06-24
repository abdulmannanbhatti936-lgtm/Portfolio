'use client'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import ReturnAwareLink from './ReturnAwareLink'
import SectionWrapper from './SectionWrapper'

const services = ['Full Stack Developer', 'AI/ML Integration', 'UI/UX Designer']

export default function ServicesPreview() {
  return (
    <SectionWrapper id="services" sectionIndex={4}>
      {/* Background Text */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden">
        <h2 className="text-[12rem] lg:text-[18rem] font-space font-black text-heading/5 leading-none rotate-90 translate-y-32 translate-x-32">
          EXPERTISE
        </h2>
      </div>

      <div className="max-w-4xl w-full">
        <SectionLabel>SERVICES</SectionLabel>
        
        <div className="space-y-4 mb-16">
          {services.map((service, i) => (
            <motion.h3
              key={service}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-8xl font-space font-bold text-heading/20 hover:text-heading transition-all cursor-default flex items-center gap-8"
            >
              <span className="text-primary opacity-0 hover:opacity-100 transition-opacity text-4xl">/</span>
              {service}
            </motion.h3>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReturnAwareLink
            href="/services"
            returnHash="services"
            className="group inline-flex items-center gap-6 text-2xl font-space font-bold text-primary hover:text-heading transition-all"
          >
            All Services
            <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center">
               <motion.span
                animate={{ x: [-20, 0, 20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl"
              >
                →
              </motion.span>
            </div>
          </ReturnAwareLink>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

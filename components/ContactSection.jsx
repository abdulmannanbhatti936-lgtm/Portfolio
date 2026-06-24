'use client'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { SiFiverr } from 'react-icons/si'
import SectionLabel from './SectionLabel'
import ReturnAwareLink from './ReturnAwareLink'
import SectionWrapper from './SectionWrapper'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/abdulmannanbhatti936-lgtm', label: 'GitHub Profile' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/abdul-mannan-bhatti-789756289', label: 'LinkedIn Profile' },
  { icon: FaWhatsapp, href: 'https://wa.me/923012343633', label: 'WhatsApp Contact' },
  { icon: SiFiverr, href: 'https://www.fiverr.com/abdulmannanb204', label: 'Fiverr Profile' },
]

const actionBaseClass =
  'h-14 sm:h-16 flex items-center justify-center rounded-2xl bg-white border border-border/50 text-subtle shadow-sm transition-all hover:text-primary hover:border-primary/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary'

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" sectionIndex={5}>
      {/* Background Text */}
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: -50 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -bottom-10 right-0 pointer-events-none select-none overflow-hidden"
      >
        <h2 className="text-[15rem] lg:text-[25rem] font-space font-black text-heading/5 leading-none translate-y-20">
          CONTACT
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="max-w-4xl">
          <SectionLabel>GET IN TOUCH</SectionLabel>

          <motion.h3
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl lg:text-[10rem] font-space font-bold text-heading leading-[0.85] mb-12 tracking-tighter"
          >
            Let&apos;s work <br />
            <span className="text-subtle/50">together.</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10 sm:mb-12"
          >
            <a
              href="mailto:abdulmannanbhatti936@gmail.com"
              className="group relative text-xl sm:text-3xl lg:text-4xl font-space font-medium text-heading hover:text-primary transition-all pb-2"
            >
              abdulmannanbhatti936@gmail.com
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/20 group-hover:bg-primary transition-all origin-left group-hover:scale-x-105" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex w-full flex-wrap items-center justify-start gap-4 sm:gap-6"
          aria-label="Contact actions"
        >
          {socialLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`${actionBaseClass} w-14 sm:w-16 shrink-0`}
            >
              <item.icon size={24} aria-hidden="true" />
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ delay: 0.5 + socialLinks.length * 0.1 }}
            className="shrink-0"
          >
            <ReturnAwareLink
              href="/contact"
              returnHash="contact"
              aria-label="Open contact form"
              className={`${actionBaseClass} px-5 sm:px-7 font-space font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-heading hover:bg-white/90`}
            >
              Lets goo
            </ReturnAwareLink>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

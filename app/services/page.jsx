'use client'
import { motion } from 'framer-motion'
import SectionLabel from '../../components/SectionLabel'
import BackButton from '../../components/BackButton'

const services = [
  {
    num: '01',
    title: 'Full Stack Web Development',
    desc: 'End-to-end development of complex web applications using modern stacks like React, Node.js, or PHP/MySQL.'
  },
  {
    num: '02',
    title: 'PHP & MySQL Development',
    desc: 'Custom backend solutions, database architecture, and server-side logic optimized for performance.'
  },
  {
    num: '03',
    title: 'React.js Frontend Development',
    desc: 'Responsive, highly interactive user interfaces built with React, Tailwind CSS, and Framer Motion.'
  },
  {
    num: '04',
    title: 'AI Integration',
    desc: 'Seamless integration of AI capabilities using modern LLM APIs to enhance user interaction.'
  },
  {
    num: '05',
    title: 'Wordpress and Woocommerce',
    desc: 'Custom WordPress development, theme customization, and e-commerce solutions via WooCommerce.'
  },
  {
    num: '06',
    title: 'Bug Fixing & Code Review',
    desc: 'Optimization of existing codebases, performance tuning, and professional code auditing.'
  },
  {
    num: '07',
    title: 'UI/UX Designing',
    desc: 'Creation of intuitive, user-centered interfaces and wireframes optimized for both aesthetics and functional usability.'
  },
  {
    num: '08',
    title: 'Video Editing',
    desc: 'Professional video production and editing services, focusing on crisp pacing, engaging transitions, and polished brand storytelling.'
  },
  {
    num: '09',
    title: 'Graphic Designing',
    desc: 'Development of high-quality digital assets, brand identities, and marketing materials with clean, purposeful design.'
  }
]

export default function ServicesPage() {
  return (
    <div className="subpage-container px-8 sm:px-20 lg:pl-56 lg:pr-32 py-24">
      <BackButton />
      <SectionLabel>ALL SERVICES</SectionLabel>
      
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-5xl sm:text-7xl font-space font-bold text-heading mb-24"
      >
        What I <span className="text-subtle">Offer.</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-12">
        {services.map((service, i) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <div className="text-4xl font-space font-bold text-gray-200 group-hover:text-primary transition-colors mb-6">
              {service.num}
            </div>
            <h2 className="text-3xl font-space font-bold text-heading mb-4 relative inline-block">
              {service.title}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
            </h2>
            <p className="text-body text-lg font-inter opacity-70 leading-relaxed max-w-md">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

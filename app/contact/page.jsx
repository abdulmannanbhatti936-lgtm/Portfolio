'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { SiFiverr } from 'react-icons/si'
import SectionLabel from '../../components/SectionLabel'
import BackButton from '../../components/BackButton'
import { submitToWeb3Forms } from '../../lib/web3forms'
import { pageSlideIn } from '../../lib/motion-presets'

export default function ContactPage() {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)

    try {
      await submitToWeb3Forms(formRef.current)
      setSuccess(true)
      formRef.current.reset()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const buttonLabel = loading
    ? 'Sending....'
    : success
      ? 'Form Submitted Successfully'
      : error
        ? 'Error'
        : null

  return (
    <div className="subpage-container subpage-enter px-8 sm:px-20 lg:pl-48 lg:pr-32 py-24">
      <BackButton />
      <SectionLabel instant>CONTACT</SectionLabel>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side */}
        <motion.div {...pageSlideIn(true)}>
          <h1 className="text-5xl sm:text-7xl font-space font-bold text-heading leading-[0.9] mb-12">
            Let's build <br />
            <span className="text-subtle">something.</span>
          </h1>
          
          <div className="space-y-8 mb-16">
            {[
              { icon: FiMail, label: 'Email', value: 'abdulmannanbhatti936@gmail.com', href: 'mailto:abdulmannanbhatti936@gmail.com' },
              { icon: FiPhone, label: 'Phone', value: '+92 301 2343633', href: 'tel:+923012343633' },
              { icon: FiMapPin, label: 'Location', value: 'Islamabad, Pakistan', href: '#' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="w-12 h-12 border border-border flex items-center justify-center text-primary bg-white">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-subtle mb-1">{item.label}</p>
                  <a href={item.href} className="font-space font-bold text-heading hover:text-primary transition-colors">
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6">
            {[
              { icon: FiGithub, href: 'https://github.com/abdulmannanbhatti936-lgtm', label: 'GitHub Profile' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/abdul-mannan-bhatti-789756289', label: 'LinkedIn Profile' },
              { icon: FaWhatsapp, href: 'https://wa.me/923012343633', label: 'WhatsApp Contact' },
              { icon: SiFiverr, href: 'https://www.fiverr.com/abdulmannanb204', label: 'Fiverr Profile' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-14 h-14 border border-border flex items-center justify-center text-subtle hover:text-primary hover:border-primary bg-white transition-all"
              >
                <social.icon size={24} aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          {...pageSlideIn(false)}
          className="bg-white p-10 border border-border shadow-minimal"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-b-2 border-border focus-within:border-primary transition-colors">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-subtle mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full py-2 bg-transparent outline-none font-space font-bold text-heading"
                />
              </div>
              <div className="border-b-2 border-border focus-within:border-primary transition-colors">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-subtle mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full py-2 bg-transparent outline-none font-space font-bold text-heading"
                />
              </div>
            </div>
            <div className="border-b-2 border-border focus-within:border-primary transition-colors">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-subtle mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                className="w-full py-2 bg-transparent outline-none font-space font-bold text-heading"
              />
            </div>
            <div className="border-b-2 border-border focus-within:border-primary transition-colors">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-subtle mb-2">Message</label>
              <textarea
                name="message"
                required
                rows="4"
                className="w-full py-2 bg-transparent outline-none font-space font-bold text-heading resize-none"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sidebar text-white py-5 font-space font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black transition-all disabled:opacity-50"
            >
              {buttonLabel ?? (
                <>
                  Send Message <FiSend size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

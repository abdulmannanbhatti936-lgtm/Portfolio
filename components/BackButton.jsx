'use client'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { homePathWithReturn } from '../lib/navigation'

export default function BackButton({ href, text }) {
  const targetHref = href || homePathWithReturn()
  const displayText = text || 'Back Home'
  
  return (
    <Link
      href={targetHref}
      prefetch
      className="fixed top-8 right-8 sm:right-12 lg:right-32 z-50 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-border/30 px-6 py-3 rounded-2xl font-space font-bold text-sm text-heading hover:bg-white hover:text-black transition-all shadow-xl subpage-enter focus:outline-none focus:ring-2 focus:ring-primary"
      style={{ animationDuration: '0.2s' }}
    >
      <FiArrowLeft size={18} />
      {displayText}
    </Link>
  )
}

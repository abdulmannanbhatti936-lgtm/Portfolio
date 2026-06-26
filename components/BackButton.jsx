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
      aria-label={displayText}
      className="back-button"
    >
      <span className="button-content">
        <FiArrowLeft size={18} className="button-icon" />
        {displayText}
      </span>
    </Link>
  )
}

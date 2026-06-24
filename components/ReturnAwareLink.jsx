'use client'
import Link from 'next/link'
import { setReturnSection } from '../lib/navigation'

export default function ReturnAwareLink({ href, returnHash, children, className, ...props }) {
  return (
    <Link 
      href={href} 
      className={className} 
      onClick={() => setReturnSection(returnHash)}
      {...props}
    >
      {children}
    </Link>
  )
}

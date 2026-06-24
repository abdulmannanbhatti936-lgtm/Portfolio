'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { homePathWithReturn } from '../lib/navigation'

export default function BrandLogo() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="fixed top-8 sm:top-12 left-8 sm:left-12 lg:left-24 right-12 z-[100] flex justify-between items-center pointer-events-none">
      <Link
        href={isHome ? '/' : homePathWithReturn()}
        prefetch={!isHome}
        className="group pointer-events-auto sm:-translate-x-[40px] sm:-translate-y-[7px] inline-block"
      >
        <span className="text-heading font-space font-black text-xl sm:text-2xl tracking-tight group-hover:opacity-70 transition-opacity">
          Abdul Mannan
        </span>
      </Link>

      <div className="hidden lg:flex flex-col gap-1 pointer-events-auto cursor-pointer group">
        <div className="w-8 h-[2px] bg-heading group-hover:w-10 transition-all duration-300"></div>
        <div className="w-6 h-[2px] bg-heading group-hover:w-8 transition-all duration-300 self-end"></div>
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SUBPAGE_ROUTES = ['/about', '/projects', '/services', '/contact']

export default function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    const prefetchAll = () => {
      SUBPAGE_ROUTES.forEach((route) => router.prefetch(route))
    }

    prefetchAll()

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetchAll, { timeout: 500 })
      return () => window.cancelIdleCallback(id)
    }
  }, [router])

  return null
}

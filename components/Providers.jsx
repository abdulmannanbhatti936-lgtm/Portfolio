'use client'

import { ActiveSectionProvider } from '../lib/active-section-context'
import { PreloaderProvider } from '../lib/preloader-context'
import RoutePrefetcher from './RoutePrefetcher'

export default function Providers({ children }) {
  return (
    <PreloaderProvider>
      <ActiveSectionProvider>
        <RoutePrefetcher />
        {children}
      </ActiveSectionProvider>
    </PreloaderProvider>
  )
}

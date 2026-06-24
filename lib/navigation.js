import { NAV_ITEMS } from '../data/navigation'

const RETURN_HASH_KEY = 'portfolio-return-hash'

export function setReturnSection(hash) {
  if (typeof window === 'undefined' || !hash) return
  sessionStorage.setItem(RETURN_HASH_KEY, hash)
}

export function getReturnSection() {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(RETURN_HASH_KEY)
}

export function homePathWithReturn() {
  const hash = getReturnSection()
  return hash ? `/#${hash}` : '/'
}

export function isHomeNavActive(navSectionIndex, activeSection) {
  return activeSection === navSectionIndex
}

export function isRouteNavActive(pathname, href) {
  if (href.startsWith('/#')) return false
  return pathname === href
}

export function handleNavClick(e, pathname, sectionIndex, hash) {
  if (pathname !== '/') return false

  e.preventDefault()
  if (hash) setReturnSection(hash)
  window.dispatchEvent(
    new CustomEvent('go-to-section', { detail: { index: sectionIndex } })
  )
  return true
}

export function isHomeRoute(href) {
  return href === '/' || href.startsWith('/#')
}

export { NAV_ITEMS }

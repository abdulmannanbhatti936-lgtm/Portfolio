import { FiHome, FiUser, FiCpu, FiGrid, FiLayers, FiMail } from 'react-icons/fi'

/** Nav order matches home full-page sections and dedicated routes. */
export const NAV_ITEMS = [
  { label: 'Home', href: '/', sectionIndex: 0, icon: FiHome, hash: 'home' },
  { label: 'About', href: '/about', sectionIndex: 1, icon: FiUser, hash: 'about' },
  { label: 'Expertise', href: '/#expertise', sectionIndex: 2, icon: FiCpu, hash: 'expertise' },
  { label: 'Projects', href: '/projects', sectionIndex: 3, icon: FiGrid, hash: 'projects' },
  { label: 'Services', href: '/services', sectionIndex: 4, icon: FiLayers, hash: 'services' },
  { label: 'Contact', href: '/contact', sectionIndex: 5, icon: FiMail, hash: 'contact' },
]

export const SECTION_HASH_MAP = Object.fromEntries(
  NAV_ITEMS.map((item) => [item.hash, item.sectionIndex])
)

/** Fast transitions for subpage navigation (~300ms target) */
export const PAGE_TRANSITION = { duration: 0.1, ease: [0.22, 1, 0.36, 1] }

export const pageFadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: PAGE_TRANSITION,
}

export const pageSlideIn = (fromLeft = true) => ({
  initial: { opacity: 0, x: fromLeft ? -12 : 12 },
  animate: { opacity: 1, x: 0 },
  transition: PAGE_TRANSITION,
})

import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { pauseScroll, resumeScroll } from '../../../experience/motion/runtime'

/**
 * Fullscreen menu for small screens: a magenta manga panel slices in diagonally, then the
 * episode links drop in one by one. Esc and every link close it.
 * Default export so SiteNav can lazy-load it: Motion only downloads when a phone opens the menu.
 */
const MobileMenu = ({
  open,
  id,
  label,
  onClose,
  items,
}: {
  open: boolean
  id: string
  label: string
  onClose: () => void
  items: ReactNode[]
}) => {
  useEffect(() => {
    if (!open) {
      return
    }

    pauseScroll()
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => {
      resumeScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const reduced = useReducedMotion()

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <AnimatePresence>
        {open ? (
          <motion.div
            id={id}
            className="yk-menu"
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            data-lenis-prevent
          >
            <motion.div
              className="yk-menu-slash"
              aria-hidden="true"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <nav aria-label={label} className="yk-menu-nav">
              <ul>
                {items.map((item, index) => (
                  <MenuItem key={index} index={index}>
                    {item}
                  </MenuItem>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  )
}

export default MobileMenu

/** One animated menu entry; `index` drives the stagger. */
const MenuItem = ({ index, children }: { index: number; children: ReactNode }) => (
  <motion.li
    initial={{ opacity: 0, x: -48, skewX: -12 }}
    animate={{ opacity: 1, x: 0, skewX: 0 }}
    transition={{ delay: 0.22 + index * 0.06, type: 'spring', stiffness: 420, damping: 30 }}
  >
    {children}
  </motion.li>
)

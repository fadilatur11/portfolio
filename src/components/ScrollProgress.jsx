import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/**
 * ScrollProgress — 2px amber bar scrubbed to page scroll (PFR-010): the
 * reviewer's eye moving through the file. Spring-smoothed scaleX, transform
 * only, fixed above the nav (z 200 > 90), pointer-transparent, aria-hidden.
 * Under reduced motion it renders nothing (rest state, non-gating).
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  if (reduced) return null

  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX }} />
}

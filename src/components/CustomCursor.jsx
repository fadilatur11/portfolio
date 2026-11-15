import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 250, damping: 24, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 250, damping: 24, mass: 0.6 })
  // the inspection light: same source, deeper lag than the ring (PFR-010)
  const glowX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.9 })
  const glowY = useSpring(y, { stiffness: 60, damping: 22, mass: 0.9 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return undefined
    setEnabled(true)
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target
      setHovering(!!(t.closest && t.closest('a, button, [data-cursor]')))
    }
    document.addEventListener('pointermove', onMove)
    return () => document.removeEventListener('pointermove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <div className="cursor-fx" aria-hidden="true">
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: hovering ? 0.5 : 1 }} />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
      <motion.div
        className="cursor-glow"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: hovering ? 0.9 : 0.85 }}
      />
    </div>
  )
}

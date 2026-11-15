import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EXPO } from '../lib/motion.js'
import { site } from '../data/site.js'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const iv = setInterval(() => {
      setCount((c) => Math.min(100, c + 5))
    }, 70)
    const t = setTimeout(() => onDoneRef.current(), 1900)
    return () => {
      clearInterval(iv)
      clearTimeout(t)
    }
  }, [])

  // Exit wipe (PFR-010): AnimatePresence in App.jsx keeps the panel mounted
  // while it slides up (0.55s expo); the interior fades out slightly faster
  // so the counter never visibly sticks mid-wipe. Reduced motion never mounts
  // the preloader at all (loading starts false), so no exit runs there.
  return (
    <motion.div
      className="preloader"
      aria-hidden="true"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.55, ease: EXPO }}
    >
      <motion.div className="preloader-inner" exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EXPO }}>
        <p className="preloader-name">{site.name}</p>
        <p className="preloader-role mono-label">{site.role} / Portfolio</p>
        <p className="preloader-count">{count}</p>
      </motion.div>
    </motion.div>
  )
}

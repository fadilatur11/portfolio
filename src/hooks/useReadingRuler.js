import { useEffect, useRef } from 'react'

/**
 * Reading ruler: lines near the pointer Y brighten via a per-line `--lit`
 * custom property (distance-based falloff, identical formula to the reference:
 * lit = max(0, 1 - dist / 2.6)). Pointermove is rAF-throttled; reads and writes
 * are batched per frame so opacity-only writes never thrash layout.
 * Fine pointers only, never under reduced motion.
 */
export function useReadingRuler(stageRef, enabled) {
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !enabledRef.current) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lines = Array.from(stage.querySelectorAll('.ln'))
    let raf = 0
    let py = null

    const paint = () => {
      raf = 0
      for (const ln of lines) {
        if (py === null) {
          ln.style.removeProperty('--lit')
          continue
        }
        const r = ln.getBoundingClientRect()
        const dist = Math.abs(py - (r.top + r.height / 2)) / r.height
        const lit = Math.max(0, 1 - dist / 2.6)
        if (lit > 0) ln.style.setProperty('--lit', lit.toFixed(3))
        else ln.style.removeProperty('--lit')
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onMove = (e) => {
      py = e.clientY
      schedule()
    }
    const onLeave = () => {
      py = null
      schedule()
    }

    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      for (const ln of lines) ln.style.removeProperty('--lit')
    }
  }, [stageRef, enabled])
}

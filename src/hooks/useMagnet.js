import { useEffect, useRef } from 'react'

/**
 * Magnet cursor drift: the element drifts toward the pointer while it hovers
 * within `padding` of the element bounds, springs back on leave.
 * Mechanism adapted from the reference (window-level mousemove + translate3d).
 * Fine pointers only; disabled under prefers-reduced-motion.
 */
export function useMagnet({ padding = 110, strength = 4 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const inside =
        Math.abs(e.clientX - cx) < r.width / 2 + padding &&
        Math.abs(e.clientY - cy) < r.height / 2 + padding
      el.style.transition = inside ? 'transform .3s ease-out' : 'transform .6s ease-in-out'
      el.style.transform = inside
        ? `translate3d(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px, 0)`
        : 'translate3d(0, 0, 0)'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.style.transition = ''
      el.style.transform = ''
    }
  }, [padding, strength])

  return ref
}

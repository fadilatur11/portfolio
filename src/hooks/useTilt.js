import { useEffect, useRef, useState } from 'react'

const FINE_QUERY = '(hover: hover) and (pointer: fine)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

const clampHalf = (v) => Math.max(-0.5, Math.min(0.5, v))

/**
 * useTilt — physical 3D hover for case cards (PFR-010 "the reviewer's light").
 *
 * Attaches pointer listeners ONLY on a fine pointer with motion allowed:
 * (hover: hover) and (pointer: fine) AND NOT prefers-reduced-motion. Otherwise
 * the hook is fully inert — no listeners, no inline vars, no state churn.
 *
 * On move (rAF-throttled, one layout read per pointerenter — the cached rect
 * is fine for tilt) it writes CSS custom properties on the element:
 *   --rx/--ry   card rotation, clamped to ±maxTilt degrees
 *   --gx/--gy   pointer position as percentages (the inspection-light glow)
 *   --img-x/--img-y  inner image parallax, opposing the tilt (±parallax/2 px)
 * The vars are consumed by CSS on .case-inner / .case-view-media img, so this
 * hook is transform/opacity-only — never layout.
 *
 * dataset.state: 'move' while the pointer moves (CSS transitions off),
 * 'settle' on pointerleave (vars reset to neutral, CSS transition returns).
 *
 * Returns { ref, state }; safe under StrictMode (listeners cleaned up).
 */
export function useTilt({ maxTilt = 4, glow = true, parallax = 10 } = {}) {
  const ref = useRef(null)
  const [state, setState] = useState('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return undefined
    if (!window.matchMedia(FINE_QUERY).matches) return undefined
    if (window.matchMedia(REDUCED_QUERY).matches) return undefined

    let rect = null
    let raf = 0
    let lastX = 0
    let lastY = 0

    const apply = () => {
      raf = 0
      if (!rect || rect.width === 0 || rect.height === 0) return
      if (!Number.isFinite(lastX) || !Number.isFinite(lastY)) return
      const nx = clampHalf((lastX - rect.left) / rect.width - 0.5)
      const ny = clampHalf((lastY - rect.top) / rect.height - 0.5)
      el.style.setProperty('--rx', `${(-ny * maxTilt * 2).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(nx * maxTilt * 2).toFixed(2)}deg`)
      if (glow) {
        el.style.setProperty('--gx', `${(((lastX - rect.left) / rect.width) * 100).toFixed(2)}%`)
        el.style.setProperty('--gy', `${(((lastY - rect.top) / rect.height) * 100).toFixed(2)}%`)
      }
      if (parallax) {
        el.style.setProperty('--img-x', `${(nx * -parallax).toFixed(2)}px`)
        el.style.setProperty('--img-y', `${(ny * -parallax).toFixed(2)}px`)
      }
    }

    const onEnter = () => {
      rect = el.getBoundingClientRect() // one layout read per hover session
    }

    const onMove = (e) => {
      // synthetic/degenerate events without coords (jsdom fallbacks, some
      // pen/touch edge cases) must never write NaN into the CSS vars
      if (!Number.isFinite(e.clientX) || !Number.isFinite(e.clientY)) return
      lastX = e.clientX
      lastY = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
      if (el.dataset.state !== 'move') {
        el.dataset.state = 'move'
        setState('move')
      }
    }

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
      rect = null
      el.dataset.state = 'settle'
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      if (glow) {
        el.style.setProperty('--gx', '50%')
        el.style.setProperty('--gy', '50%')
      }
      if (parallax) {
        el.style.setProperty('--img-x', '0px')
        el.style.setProperty('--img-y', '0px')
      }
      setState('settle')
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [maxTilt, glow, parallax])

  return { ref, state }
}

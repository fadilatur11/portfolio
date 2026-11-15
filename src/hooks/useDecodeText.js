import { useEffect, useRef, useState } from 'react'

const DEFAULT_GLYPHS = '!<>-_\\/[]{}—=+*^?#01'
const FRAME_MS = 30 // unresolved glyphs re-roll ~30ms per frame (spec)
const IO_MARGIN = '-10% 0px' // vertical-only margin — documented PFR-007 IO trap
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * useDecodeText — one-shot kinetic decode for mono kickers (PFR-010: files
 * being indexed). IntersectionObserver (once, disconnect after trigger) starts
 * a ~duration rAF scramble in which characters resolve left-to-right while
 * unresolved positions cycle random glyphs. Whitespace is kept literal so the
 * layout never collapses mid-scramble.
 *
 * RENDER INVARIANT (hard, unit-tested): the rendered text equals `finalText`
 * whenever reduced motion, IO missing, !enabled, or before/after the scramble.
 * The initial state IS the final text — the scramble only ever starts from a
 * real IO trigger, so a stubbed/dead IO (jsdom, old browsers) renders plain.
 *
 * Accessibility: consumers keep aria-label={finalText} on the element, so
 * screen readers always read the real string even mid-scramble.
 *
 * One-shot; all timers cancelled on unmount (no state updates after unmount).
 * Returns { ref, text }.
 */
export function useDecodeText(finalText, { enabled = true, duration = 700, glyphs = DEFAULT_GLYPHS } = {}) {
  const ref = useRef(null)
  const [text, setText] = useState(finalText)

  // keep the parity invariant if the caller swaps the string mid-flight
  useEffect(() => {
    setText(finalText)
  }, [finalText])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el || typeof window === 'undefined') return undefined
    if (window.matchMedia(REDUCED_QUERY).matches) return undefined
    if (!('IntersectionObserver' in window)) return undefined

    let raf = 0
    let started = false
    let lastFrame = 0
    let startedAt = 0
    let io = null
    const chars = Array.from(finalText)

    const runScramble = (now) => {
      if (lastFrame === 0) {
        lastFrame = now
        startedAt = now
        raf = requestAnimationFrame(runScramble)
        return
      }
      if (now - lastFrame < FRAME_MS) {
        raf = requestAnimationFrame(runScramble)
        return
      }
      lastFrame = now
      const t = Math.min(1, (now - startedAt) / duration)
      const resolved = Math.floor(t * chars.length)
      let out = ''
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i]
        out += i < resolved || ch === ' ' ? ch : glyphs[(Math.random() * glyphs.length) | 0]
      }
      setText(out)
      if (t < 1) {
        raf = requestAnimationFrame(runScramble)
      } else {
        raf = 0
        setText(finalText) // exact, character-for-character final parity
      }
    }

    const start = () => {
      if (started) return
      started = true
      if (io) io.disconnect() // once
      raf = requestAnimationFrame(runScramble)
    }

    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start()
      },
      { rootMargin: IO_MARGIN },
    )
    io.observe(el)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (io) io.disconnect()
    }
  }, [finalText, enabled, duration, glyphs])

  return { ref, text }
}

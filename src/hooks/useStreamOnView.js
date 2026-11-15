import { useEffect } from 'react'
import { makeStreamCursor, streamInto } from '../lib/streamText.js'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const IO_MARGIN = '-8% 0px' // vertical-only margin — documented PFR-007 IO trap
const DONE_FADE_MS = 520

/**
 * useStreamOnView — one-shot LLM-style stream for a pure-text line when it
 * scrolls into view (PFR-010d: the section lines keep the hero's motion
 * language). Element must contain ONLY text (children are replaced during the
 * stream and never restored until cancel/complete — the final textContent is
 * byte-identical to the original, the parity invariant lives in streamInto).
 *
 * Gates: reduced motion → inert; no IO (jsdom/old browsers) → inert; once.
 * On unmount: cancels + restores the original string.
 */
export function useStreamOnView(ref, { enabled = true, speed = 'normal' } = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!enabled || !el || typeof window === 'undefined') return undefined
    if (window.matchMedia(REDUCED_QUERY).matches) return undefined
    if (!('IntersectionObserver' in window)) return undefined

    const final = el.textContent
    el.setAttribute('aria-label', final)

    const cursor = makeStreamCursor()
    let cancel = null
    let disposed = false

    const io = new IntersectionObserver(
      ([entry]) => {
        if (disposed || !entry.isIntersecting) return
        io.disconnect() // once
        el.textContent = ''
        cancel = streamInto(el, final, cursor, {
          speed,
          onDone: () => {
            cursor.classList.add('is-done')
            setTimeout(() => cursor.remove(), DONE_FADE_MS)
          },
        })
      },
      { rootMargin: IO_MARGIN },
    )
    io.observe(el)

    return () => {
      disposed = true
      io.disconnect()
      cancel?.()
      cursor.remove()
    }
  }, [ref, enabled, speed])
}

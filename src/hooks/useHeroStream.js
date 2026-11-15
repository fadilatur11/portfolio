import { useLayoutEffect } from 'react'
import { makeStreamCursor, streamInto } from '../lib/streamText.js'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

const START_MS = 140 // after playIntro flips true
const GAP_MS = 260 // pause between targets
const DONE_FADE_MS = 520

/**
 * useHeroStream — LLM-style streaming reveal for the hero copy (PFR-010c).
 *
 * The kicker, the three H1 lines and the lede type out like a model response:
 * variable character chunks, punctuation beats, and one amber stream cursor
 * travelling across targets in sequence, fading out when the response
 * completes. The chunk/tick engine lives in lib/streamText.js so the section
 * lines (useStreamOnView) share the exact same motion language.
 *
 * FINAL-STRING PARITY (hard, test-covered): every target's textContent ends
 * byte-identical to its original — the stream only ever writes prefixes of it.
 *
 * Gates (all hard):
 * - reduced motion → inert: full text immediately (the accepted rest state);
 * - enabled=false (no intro) → inert;
 * - no layout reads; imperative writes only, no React re-render.
 *
 * useLayoutEffect so the initial blank lands in the same commit that flips
 * `enabled` — the full text is never painted before the stream starts.
 */
export function useHeroStream({ enabled, heroRef, kickerRef, line1Ref, line2Ref, line3Ref, ledeRef }) {
  useLayoutEffect(() => {
    const hero = heroRef?.current
    if (!enabled || !hero || typeof window === 'undefined') return undefined
    if (window.matchMedia(REDUCED_QUERY).matches) return undefined

    const targets = [kickerRef?.current, line1Ref?.current, line2Ref?.current, line3Ref?.current, ledeRef?.current].filter(Boolean)
    if (targets.length === 0) return undefined

    const timers = new Set()
    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.delete(id)
        if (!disposed) fn()
      }, ms)
      timers.add(id)
      return id
    }

    let disposed = false
    let cancelActive = null
    const cursor = makeStreamCursor()

    hero.setAttribute('data-stream', 'on')

    const originals = targets.map((el) => el.textContent)

    // blank every target synchronously (pre-paint) and arm aria labels so
    // screen readers always read the full strings
    targets.forEach((el, i) => {
      el.setAttribute('aria-label', originals[i])
      el.textContent = ''
    })

    const run = (index) => {
      if (disposed) return
      const el = targets[index]
      if (!el) return
      cancelActive = streamInto(el, originals[index], cursor, {
        onDone: () => {
          if (index + 1 < targets.length) {
            later(() => run(index + 1), GAP_MS)
          } else {
            cursor.classList.add('is-done')
            later(() => cursor.remove(), DONE_FADE_MS)
          }
        },
      })
    }

    later(() => run(0), START_MS)

    return () => {
      disposed = true
      timers.forEach(clearTimeout)
      cancelActive?.()
      // restore every target to its exact original string
      targets.forEach((el, i) => {
        if (el.isConnected) {
          el.textContent = originals[i]
          el.setAttribute('aria-label', originals[i])
        }
      })
      cursor.remove()
      hero.removeAttribute('data-stream')
    }
  }, [enabled, heroRef, kickerRef, line1Ref, line2Ref, line3Ref, ledeRef])
}

import { useEffect } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const IO_MARGIN = '-10% 0px' // vertical-only margin — documented PFR-007 IO trap

const DELETE_MS = 65 // per-char delete step
const TYPE_MS = 65 // per-char retype step
const TRAVEL_REST_MS = 420 // pause after the caret lands on a token
const RETYPE_PAUSE_MS = 180 // beat between deleting and retyping
const REST_MS = 950 // pause after a completed edit cycle
const GAP_MIN_MS = 700 // extra idle gap before the next edit point
const GAP_MAX_MS = 1600

const rand = (min, max) => min + Math.random() * (max - min)

/**
 * useCodeSession — ambient "live coding session" for the hero stage (PFR-010b).
 *
 * The amber caret travels between curated token positions in the illustrative
 * snippet, deletes a few trailing characters and retypes them (NET-ZERO: the
 * token text always returns to its exact original). It reads as someone (or an
 * AI assist) still working in the file — the reviewer never left.
 *
 * Gates (all hard):
 * - reduced motion → inert (static code, the accepted rest state);
 * - no IntersectionObserver (jsdom/old browsers) → inert;
 * - stage offscreen or tab hidden → paused; resumes with a fresh cycle.
 *
 * All updates are imperative DOM writes on ONE token at a time (no React
 * re-render, no layout thrash beyond the caret's inline reflow). The caret
 * element is re-parented per cycle and restored to its home position on
 * cleanup; React never re-renders the stage after the session starts.
 */
export function useCodeSession(stageRef, editPoints, { enabled = false, startDelayMs = 3200 } = {}) {
  useEffect(() => {
    const stage = stageRef.current
    if (!enabled || !stage || typeof window === 'undefined') return undefined
    if (window.matchMedia(REDUCED_QUERY).matches) return undefined
    if (!('IntersectionObserver' in window)) return undefined

    const caret = stage.querySelector('.code-caret')
    if (!caret) return undefined
    const caretHome = caret.parentNode
    const caretNext = caret.nextSibling
    const timers = new Set()
    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.delete(id)
        if (disposed || !visible) return
        fn()
      }, ms)
      timers.add(id)
      return id
    }

    let disposed = false
    let visible = false
    let sessionStarted = false // exactly ONE first step — never double-schedule
    let startPending = false // startDelay elapsed while the stage was offscreen
    let idx = 0
    let activeNode = null
    let original = ''

    const clearActive = () => {
      if (activeNode) {
        activeNode.data = original
        activeNode = null
        original = ''
      }
    }

    const findToken = (point) => {
      const rows = stage.querySelectorAll('.code .ln')
      const row = Array.from(rows).find(
        (r) => r.querySelector('.n')?.textContent === String(point.line),
        )
      if (!row) return null
      const wrap = row.querySelector('.t')
      const el = wrap && wrap.children[point.token]
      if (!el || !el.firstChild || el.firstChild.nodeType !== Node.TEXT_NODE) return null
      return el
    }

    const scheduleNext = (ms) => {
      later(() => step(), ms)
    }

    const retypeStep = (node, full, n, j) => {
      if (j < n) {
        j += 1
        node.data = full.slice(0, full.length - n + j)
        later(() => retypeStep(node, full, n, j), TYPE_MS)
      } else {
        clearActive()
        scheduleNext(REST_MS + rand(GAP_MIN_MS, GAP_MAX_MS))
      }
    }

    const deleteStep = (node, full, n, k) => {
      if (k < n) {
        k += 1
        node.data = full.slice(0, full.length - k)
        later(() => deleteStep(node, full, n, k), DELETE_MS)
      } else {
        later(() => retypeStep(node, full, n, 0), RETYPE_PAUSE_MS)
      }
    }

    const step = () => {
      if (disposed || !visible) return
      const point = editPoints[idx % editPoints.length]
      idx += 1
      const el = findToken(point)
      if (!el) {
        scheduleNext(800)
        return
      }
      clearActive()
      const node = el.firstChild
      original = node.data
      activeNode = node
      // travel: the caret lands inside the token, right after its text
      el.appendChild(caret)
      caret.classList.add('is-in-token')
      const n = Math.min(point.chars, Math.max(0, original.length - 1))
      later(() => deleteStep(node, original, n, 0), TRAVEL_REST_MS)
    }

    const onVisibility = () => {
      if (document.hidden) {
        visible = false
        clearActive()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible
        visible = entry.isIntersecting && !document.hidden
        stage.classList.toggle('has-live-session', visible)
        if (disposed) return
        if (visible && !wasVisible) {
          if (startPending) {
            // startDelay elapsed while offscreen — begin the session now
            startPending = false
            sessionStarted = true
            step()
          } else if (sessionStarted) {
            later(() => step(), 600) // resume after an offscreen pause
          }
        } else if (!visible) {
          clearActive()
        }
      },
      { rootMargin: IO_MARGIN },
    )
    io.observe(stage)

    // the SINGLE session start — the IO onset path above only fires it when
    // the stage was offscreen at startDelay; this avoids concurrent cycles
    later(() => {
      if (disposed) return
      if (visible) {
        sessionStarted = true
        step()
      } else {
        startPending = true
      }
    }, startDelayMs)

    return () => {
      disposed = true
      timers.forEach(clearTimeout)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      clearActive()
      caret.classList.remove('is-in-token')
      if (caretHome) caretHome.insertBefore(caret, caretNext)
      stage.classList.remove('has-live-session')
    }
    // editPoints must be a stable module-level constant, or the session
    // tears down and restarts on every render.
  }, [stageRef, enabled, startDelayMs, editPoints])
}

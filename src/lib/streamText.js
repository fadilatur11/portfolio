const rand = (min, max) => min + Math.random() * (max - min)

/**
 * Speed profiles for the LLM-style text stream (PFR-010c/010d).
 * - normal: hero copy — readable, deliberate
 * - fast:   long body text (JSDoc bio) — same feel, ~2x denser chunks
 */
export const SPEEDS = {
  normal: { tickMin: 26, tickMax: 55, chunkMin: 1, chunkMax: 4, punctPause: 120 },
  fast: { tickMin: 16, tickMax: 34, chunkMin: 2, chunkMax: 5, punctPause: 90 },
}

export function makeStreamCursor() {
  const cursor = document.createElement('span')
  cursor.className = 'stream-cursor'
  cursor.setAttribute('aria-hidden', 'true')
  return cursor
}

/**
 * streamInto — type `final` into `el` character-chunks, LLM-style. Appends a
 * text node + the travelling cursor; mutates only that text node. The element
 * MUST be a pure-text element (its children are replaced by the stream).
 *
 * Returns cancel(): stops the timers and (if still mounted) completes the
 * text to `final` — the net-zero/parity invariant lives HERE, in one place.
 */
export function streamInto(el, final, cursor, { onDone, isDisposed, speed = 'normal' } = {}) {
  const s = SPEEDS[speed] || SPEEDS.normal
  const textNode = document.createTextNode('')
  el.appendChild(textNode)
  el.appendChild(cursor)
  const timers = new Set()
  let stopped = false

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.delete(id)
      if (stopped || isDisposed?.()) return
      fn()
    }, ms)
    timers.add(id)
    return id
  }

  let i = 0
  const tick = () => {
    if (i < final.length) {
      const chunk = s.chunkMin + Math.floor(Math.random() * (s.chunkMax - s.chunkMin + 1))
      i = Math.min(final.length, i + chunk)
      textNode.data = final.slice(0, i)
      const ch = final[i - 1]
      const punct = ch === ',' || ch === '.' || ch === '—' || ch === ';'
      later(tick, rand(s.tickMin, s.tickMax) + (punct ? s.punctPause : 0))
    } else {
      el.setAttribute('aria-label', final)
      onDone?.()
    }
  }
  later(tick, rand(60, 140))

  return function cancel() {
    stopped = true
    timers.forEach(clearTimeout)
    if (textNode.isConnected) textNode.data = final // parity invariant
  }
}

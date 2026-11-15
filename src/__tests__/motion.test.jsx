import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { useRef } from 'react'
import ScrollProgress from '../components/ScrollProgress.jsx'
import { useDecodeText } from '../hooks/useDecodeText.js'
import { useTilt } from '../hooks/useTilt.js'
import { useCodeSession } from '../hooks/useCodeSession.js'
import { useHeroStream } from '../hooks/useHeroStream.js'
import { useStreamOnView } from '../hooks/useStreamOnView.js'

/* Environment facts verified against the REAL test setup (src/__tests__/setup.js
   + vitest jsdom), not assumptions:
   - jsdom has NO native matchMedia → the setup.js polyfill applies and
     `(prefers-reduced-motion: reduce)` matches TRUE by default (the baseline
     vitest output even prints framer's reduced-motion notice). So reduced
     behavior is testable with the default env, and the "motion allowed" side
     is tested with an explicit matchMedia mock.
   - jsdom has NO IntersectionObserver → the setup.js stub never fires
     callbacks, which is exactly the "IO missing/dead" branch of useDecodeText.
   - (hover: hover) and (pointer: fine) never matches → useTilt is inert here. */

const KICKER = '// Fullstack & Backend Developer'

function mockMatchMedia({ reduce = false, fine = false } = {}) {
  return vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query.includes('prefers-reduced-motion') ? reduce : fine,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
}

function DecodeHarness({ text, options }) {
  const d = useDecodeText(text, options)
  return <p ref={d.ref} aria-label={text}>{d.text}</p>
}

function TiltHarness() {
  const tilt = useTilt({ maxTilt: 4, glow: true, parallax: 10 })
  return <div ref={tilt.ref} data-testid="card">card</div>
}

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

describe('ScrollProgress', () => {
  it('renders a fixed aria-hidden bar when motion is allowed', () => {
    mockMatchMedia({ reduce: false })
    const { container } = render(<ScrollProgress />)
    const bar = container.querySelector('.scroll-progress')
    expect(bar).not.toBeNull()
    expect(bar.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders nothing under reduced motion', () => {
    mockMatchMedia({ reduce: true })
    const { container } = render(<ScrollProgress />)
    expect(container.querySelector('.scroll-progress')).toBeNull()
  })
})

describe('useDecodeText', () => {
  it('renders the exact final text when the IO trigger never fires (jsdom stub)', async () => {
    const { container } = render(<DecodeHarness text={KICKER} />)
    const p = container.querySelector('p')
    expect(p.textContent).toBe(KICKER)
    expect(p.getAttribute('aria-label')).toBe(KICKER)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 60))
    })
    expect(p.textContent).toBe(KICKER) // parity holds after effects flush
  })

  it('renders the exact final text when disabled', () => {
    const { container } = render(<DecodeHarness text={KICKER} options={{ enabled: false }} />)
    expect(container.querySelector('p').textContent).toBe(KICKER)
  })

  it('ends the scramble at the exact final text, character-for-character (IO fires)', async () => {
    const finalText = KICKER
    class FakeIO {
      constructor(cb) { this.cb = cb }
      observe() { this.cb([{ isIntersecting: true }]) }
      unobserve() {}
      disconnect() {}
    }
    const realIO = window.IntersectionObserver
    window.IntersectionObserver = FakeIO
    mockMatchMedia({ reduce: false })
    try {
      const { container } = render(
        <DecodeHarness text={finalText} options={{ duration: 120 }} />,
      )
      const p = container.querySelector('p')
      expect(p.getAttribute('aria-label')).toBe(finalText) // SR always reads the real string
      await act(async () => {
        await new Promise((r) => setTimeout(r, 400))
      })
      expect(p.textContent).toBe(finalText)
    } finally {
      window.IntersectionObserver = realIO
    }
  })
})

describe('useCodeSession', () => {
  const TOKEN_TEXT = 'syncChannelOrders'
  const POINTS = [{ line: 20, token: 2, chars: 4 }]

  function SessionHarness({ enabled, startDelayMs = 50 }) {
    const ref = useRef(null)
    useCodeSession(ref, POINTS, { enabled, startDelayMs })
    return (
      <div ref={ref}>
        <div className="code">
          <div className="ln">
            <span className="n">20</span>
            <span className="t">
              <i>k</i>
              <i>p</i>
              <i>{TOKEN_TEXT}</i>
              <i>p(</i>
            </span>
          </div>
        </div>
        <span className="code-caret" />
      </div>
    )
  }

  it('stays inert under reduced motion (default jsdom polyfill): no caret move, no text churn', async () => {
    const { container } = render(<SessionHarness enabled />)
    const token = container.querySelectorAll('.t i')[2]
    const caret = container.querySelector('.code-caret')
    await act(async () => {
      await new Promise((r) => setTimeout(r, 120))
    })
    expect(token.textContent).toBe(TOKEN_TEXT)
    expect(caret.parentNode).not.toBe(token) // never travelled
  })

  it('stays inert when the IO stub never fires (no visibility signal)', async () => {
    mockMatchMedia({ reduce: false })
    const { container } = render(<SessionHarness enabled />)
    const token = container.querySelectorAll('.t i')[2]
    await act(async () => {
      await new Promise((r) => setTimeout(r, 120))
    })
    expect(token.textContent).toBe(TOKEN_TEXT)
  })

  it('travels the caret, deletes and retypes back to the EXACT original (net-zero)', async () => {
    vi.useFakeTimers()
    class FakeIO {
      constructor(cb) { this.cb = cb }
      observe() { this.cb([{ isIntersecting: true }]) }
      unobserve() {}
      disconnect() {}
    }
    const realIO = window.IntersectionObserver
    window.IntersectionObserver = FakeIO
    mockMatchMedia({ reduce: false, fine: false })
    try {
      const { container, unmount } = render(<SessionHarness enabled startDelayMs={50} />)
      const token = container.querySelectorAll('.t i')[2]
      const caret = container.querySelector('.code-caret')

      act(() => { vi.advanceTimersByTime(220) }) // start delay elapsed → step()
      expect(caret.parentNode).toBe(token) // travelled into the token

      act(() => { vi.advanceTimersByTime(300) }) // first delete step landed
      const mid = token.textContent
      expect(mid.length).toBeLessThan(TOKEN_TEXT.length) // actively editing
      expect(TOKEN_TEXT.startsWith(mid)).toBe(true) // prefix of the original

      // deterministic completion: first cycle finishes at ~1040ms; the next
      // step cannot start before 950 + 700ms of rest/gap (≥ 2700ms)
      act(() => { vi.advanceTimersByTime(800) })
      expect(token.textContent).toBe(TOKEN_TEXT) // NET-ZERO invariant restored

      unmount()
    } finally {
      window.IntersectionObserver = realIO
      vi.useRealTimers()
    }
  })
})

describe('useHeroStream', () => {
  const LINE1 = 'Digital craft,'
  const LEDE = 'Backend roots, fullstack range — streamed sentence.'

  function StreamHarness({ enabled }) {
    const heroRef = useRef(null)
    const kickerRef = useRef(null)
    const line1Ref = useRef(null)
    const line2Ref = useRef(null)
    const line3Ref = useRef(null)
    const ledeRef = useRef(null)
    useHeroStream({ enabled, heroRef, kickerRef, line1Ref, line2Ref, line3Ref, ledeRef })
    return (
      <div ref={heroRef}>
        <p ref={kickerRef} className="hero-kicker">{'// Fullstack Developer'}</p>
        <h1>
          <span ref={line1Ref}>{LINE1}</span>
          <span ref={line2Ref}>engineered.</span>
          <span ref={line3Ref}>Shipped.</span>
        </h1>
        <p ref={ledeRef}>{LEDE}</p>
      </div>
    )
  }

  it('renders full text immediately and never under reduced motion (default jsdom)', () => {
    const { container } = render(<StreamHarness enabled />)
    expect(container.textContent).toContain(LINE1)
    expect(container.querySelector('.stream-cursor')).toBeNull()
  })

  it('streams in sequence and restores byte-identical final strings (fake timers)', () => {
    vi.useFakeTimers()
    mockMatchMedia({ reduce: false })
    try {
      const { container } = render(<StreamHarness enabled />)
      const [kicker, line1, line2, line3, lede] = container.querySelectorAll('p, h1 span')
      // layout effect blanked targets pre-paint; cursor joins once run(0) fires
      expect(kicker.textContent).toBe('')
      act(() => { vi.advanceTimersByTime(220) }) // START_MS elapsed
      expect(container.querySelector('.stream-cursor')).not.toBeNull()
      expect(container.firstElementChild.getAttribute('data-stream')).toBe('on')

      act(() => { vi.advanceTimersByTime(4000) }) // kicker + all three lines
      expect(line1.textContent).toBe(LINE1) // byte-identical final
      expect(line2.textContent).toBe('engineered.')
      expect(line3.textContent).toBe('Shipped.')
      expect(container.querySelector('.stream-cursor')).not.toBeNull() // lede still going

      act(() => { vi.advanceTimersByTime(6000) }) // lede finishes + cursor fades
      expect(lede.textContent).toBe(LEDE)
      expect(lede.getAttribute('aria-label')).toBe(LEDE)
      expect(container.querySelector('.stream-cursor')).toBeNull() // cursor removed
      expect(line1.textContent).toBe(LINE1) // untouched by later targets
    } finally {
      vi.useRealTimers()
      vi.restoreAllMocks()
    }
  })

  it('is inert when disabled (no intro): full text, no cursor, no data-stream', () => {
    const { container } = render(<StreamHarness enabled={false} />)
    expect(container.textContent).toContain(LINE1)
    expect(container.querySelector('.stream-cursor')).toBeNull()
    expect(container.firstElementChild.getAttribute('data-stream')).toBeNull()
  })
})

describe('useStreamOnView', () => {
  const FINAL = 'case files — reviewed & shipped'

  function ViewHarness({ speed }) {
    const ref = useRef(null)
    useStreamOnView(ref, { speed })
    return <p ref={ref}>{FINAL}</p>
  }

  it('is inert under reduced motion (default jsdom): text untouched, no cursor', async () => {
    const { container } = render(<ViewHarness />)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 80))
    })
    expect(container.querySelector('p').textContent).toBe(FINAL)
    expect(container.querySelector('.stream-cursor')).toBeNull()
  })

  it('streams once on IO fire and restores the byte-identical final (fake timers)', () => {
    vi.useFakeTimers()
    class FakeIO {
      constructor(cb) { this.cb = cb }
      observe() { this.cb([{ isIntersecting: true }]) }
      unobserve() {}
      disconnect() {}
    }
    const realIO = window.IntersectionObserver
    window.IntersectionObserver = FakeIO
    mockMatchMedia({ reduce: false })
    try {
      const { container } = render(<ViewHarness />)
      const p = container.querySelector('p')
      act(() => { vi.advanceTimersByTime(300) }) // IO fired + stream started
      const cursor = container.querySelector('.stream-cursor')
      expect(cursor).not.toBeNull()
      const mid = p.textContent
      expect(FINAL.startsWith(mid)).toBe(true) // prefix invariant

      act(() => { vi.advanceTimersByTime(3000) }) // completes (short line)
      expect(p.textContent).toBe(FINAL) // byte-identical parity
      expect(p.getAttribute('aria-label')).toBe(FINAL)
    } finally {
      window.IntersectionObserver = realIO
      vi.useRealTimers()
      vi.restoreAllMocks()
    }
  })
})

describe('useTilt', () => {
  it('stays fully inert without a fine pointer (no listeners, no vars)', () => {
    const { getByTestId } = render(<TiltHarness />)
    const el = getByTestId('card')
    fireEvent.pointerEnter(el)
    fireEvent.pointerMove(el, { clientX: 40, clientY: 40 })
    fireEvent.pointerLeave(el)
    expect(el.style.getPropertyValue('--rx')).toBe('')
    expect(el.style.getPropertyValue('--ry')).toBe('')
    expect(el.dataset.state).toBeUndefined()
  })

  it('writes clamped tilt vars on a fine pointer and resets on leave', async () => {
    mockMatchMedia({ reduce: false, fine: true })
    const { getByTestId } = render(<TiltHarness />)
    const el = getByTestId('card')
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 100, height: 100, x: 0, y: 0, right: 100, bottom: 100, toJSON: () => {},
    })
    // jsdom has NO PointerEvent, and RTL's fallback pointermove carries no
    // coordinates — dispatch a MouseEvent-based pointermove WITH coords.
    const firePointer = (type, x, y) =>
      el.dispatchEvent(new MouseEvent(type, { bubbles: true, clientX: x, clientY: y }))
    act(() => {
      firePointer('pointerenter', 150, 150)
      firePointer('pointermove', 150, 150) // far corner → full clamp
    })
    await act(async () => {
      await new Promise((r) => setTimeout(r, 60)) // let the rAF-throttled apply() run
    })
    expect(el.dataset.state).toBe('move')
    expect(el.style.getPropertyValue('--rx')).toBe('-4.00deg') // clamped ±4°
    expect(el.style.getPropertyValue('--ry')).toBe('4.00deg')
    expect(el.style.getPropertyValue('--img-x')).toBe('-5.00px') // opposing parallax ±5px
    expect(el.style.getPropertyValue('--img-y')).toBe('-5.00px')
    act(() => {
      firePointer('pointerleave', 0, 0)
    })
    expect(el.dataset.state).toBe('settle')
    expect(el.style.getPropertyValue('--rx')).toBe('0deg')
    expect(el.style.getPropertyValue('--img-x')).toBe('0px')
  })
})

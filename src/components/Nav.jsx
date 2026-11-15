import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const LINKS = [
  ['Work', '#work'],
  ['Profile', '#profile'],
  ['CV', '#cv'],
  ['Contact', '#contact'],
]

/* Logo mark: a gutter tick (amber flag block) + the wordmark. */
function LogoMark() {
  return (
    <svg className="nav-mark" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.2" y="3.5" width="1.4" height="17" fill="currentColor" opacity=".45" />
      <rect x="10" y="5.4" width="9.5" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="10" y="10.9" width="6" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="10" y="16.4" width="8" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="5.1" y="9.6" width="3.6" height="4.8" rx="1" fill="var(--amber)" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinelRef = useRef(null)
  const menuRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const links = Array.from(document.querySelectorAll('.nav-links a'))
    if (!('IntersectionObserver' in window)) return undefined
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`))
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    sections.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const first = menuRef.current?.querySelector('a, button')
    if (first) first.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Hide on scroll down / show on scroll up (translate only, transform-family).
  // Disabled under reduced motion and while the mobile menu is open.
  useEffect(() => {
    if (reduced) return undefined
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        const dy = y - last
        if (Math.abs(dy) > 2) {
          if (y > 120 && dy > 0) setHidden(true)
          else setHidden(false)
          last = y
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      setHidden(false)
    }
  }, [reduced])

  const navHidden = hidden && !open

  return (
    <>
      <div className="nav-sentinel" ref={sentinelRef} aria-hidden="true" />
      <header className={`nav${scrolled ? ' is-scrolled' : ''}${navHidden ? ' is-hidden' : ''}`}>
        <a className="nav-brand" href="#top">
          <LogoMark />
          <span className="nav-brand-word">{site.brand}</span>
          <span className="nav-brand-sub">{site.brandSub}</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p className="nav-status mono-label">
          <span className="status-dot" aria-hidden="true" />
          Open for work
        </p>
        <button
          className="nav-menu-btn mono-label"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <div className="mobile-menu-panel" ref={menuRef}>
          <button
            className="mobile-menu-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
          <nav className="mobile-menu-nav" aria-label="Mobile">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
          <p className="mobile-menu-foot mono-meta">{site.email}</p>
        </div>
      </div>
    </>
  )
}

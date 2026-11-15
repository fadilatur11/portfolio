import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App.jsx'
import { featured, archive } from '../data/projects.js'

describe('App (reduced-motion fallback)', () => {
  it('renders nav, hero, and all five sections', () => {
    render(<App />)
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /selected work/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /the whole path, ?one developer/i })).toBeInTheDocument()
    expect(screen.getByText('Curriculum')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /hiring for backend ?or fullstack/i })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders 6 featured rows with names and 7 archive names', () => {
    render(<App />)
    featured.forEach((p) => expect(screen.getAllByText(p.name).length).toBeGreaterThan(0))
    archive.forEach((n) => expect(screen.getAllByText(n).length).toBeGreaterThan(0))
    expect(screen.getByText('+7')).toBeInTheDocument()
    expect(screen.getByText((_, el) => el?.textContent?.startsWith('6 featured / 7 more') ?? false)).toBeInTheDocument()
  })

  it('shows project descriptions on non-interactive case cards (no modal)', () => {
    render(<App />)
    expect(screen.getByText(featured[0].desc)).toBeInTheDocument()
    expect(document.querySelector('.project-dialog')).toBeNull()
    expect(document.querySelector('.case-open')).toBeNull()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('preserves every legacy content string verbatim', () => {
    render(<App />)
    expect(screen.getByText('I am Fadilatur Rokhman, a fullstack developer with backend roots and more than four years of professional experience. I build web applications, business platforms, CMS and POS systems, transaction flows, and service integrations, and I deploy and run them on AWS. I use AI across my daily work to get routine tasks done faster, without lowering the bar on reliability, security, or maintainability. I am open to backend and fullstack roles where one person can own the path from the database to production.')).toBeInTheDocument()
    expect(screen.getAllByText('fadilatur38@gmail.com').length).toBeGreaterThan(0)
    expect(screen.getByText('Probolinggo, Indonesia')).toBeInTheDocument()
    expect(screen.getByText('Open to opportunities')).toBeInTheDocument()
    const cv = screen.getByText('Curriculum').closest('a')
    expect(cv?.getAttribute('href')).toBe('cv/CV FADILATUR ROKHMAN-compressed.pdf')
    expect(screen.getByText('From backend')).toBeInTheDocument()
    expect(screen.getByText('live on AWS.')).toBeInTheDocument()
    expect(screen.getByText('View selected work')).toBeInTheDocument()
  })

  it('keeps legacy anchor ids reachable', () => {
    render(<App />)
    for (const id of ['work', 'profile', 'cv', 'contact']) {
      expect(document.getElementById(id)).not.toBeNull()
    }
  })
})

describe('BackgroundSpace (no WebGL)', () => {
  it('falls back to the painted scene without taking the page down', () => {
    // jsdom has no canvas contexts: the WebGL renderer reports unavailable,
    // the component must switch to the 2D/CSS scene and stay decorative.
    render(<App />)
    const bg = document.querySelector('.bg-space')
    expect(bg).not.toBeNull()
    expect(bg.getAttribute('aria-hidden')).toBe('true')
    expect(bg.dataset.mode).toBe('2d')
    expect(bg.querySelector('.planet-canvas')).not.toBeNull()
    expect(bg.querySelector('.meteor-strike')).not.toBeNull()
    expect(document.documentElement.dataset.bgError).toBeUndefined()
  })
})

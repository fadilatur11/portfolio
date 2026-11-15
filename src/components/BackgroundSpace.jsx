import { useEffect, useRef, useState } from 'react'
import { drawPlanetScene } from '../lib/planetCanvas.js'
import { createStrikeRenderer } from '../lib/strikeShader.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/**
 * BackgroundSpace — the "meteor strike" backdrop.
 *
 * Primary path (mode "gl"): one real-time WebGL pass (lib/strikeShader.js)
 * renders the whole scene from a single light — sphere planet, atmosphere,
 * volumetric beam, bloom, filmic tonemap — with a camera that eases toward
 * the pointer and lifts on scroll. `lit` ignites the strike once the page is
 * revealed, so the entrance is one sequence instead of an always-on loop.
 *
 * Fallback (mode "2d"): no WebGL, or the shader failed → the earlier scene:
 * planet painted once on a 2D canvas (lib/planetCanvas.js) under CSS light
 * layers. The canvas is re-keyed per mode because a canvas that has handed
 * out a WebGL context can never hand out a 2D one.
 *
 * Discipline in both modes: aria-hidden, loop stops while the tab is hidden,
 * reduced motion = one static composed frame, and a failure here must NEVER
 * take the page down (the message lands on <html data-bg-error>).
 */
const IMPACT_X = 0.5

/**
 * Lets the scene compose around the hero copy instead of running under it.
 *  - flag: light is kept off the lede (the one block of small muted text),
 *    feathered wide, so it never sits on the glow whatever the viewport does.
 *  - side-by-side hero: the horizon settles just below the lede.
 *  - stacked hero (copy spans the beam axis): the beam only becomes visible
 *    below the copy — a beam needs air to scatter in, so the vacuum run can
 *    honestly stay dark — and the light steps back for the code on the planet.
 */
function composeAroundHero() {
  const lede = document.querySelector('.hero-lede')
  const copy = document.querySelector('.hero-copy')
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (!lede || !copy || !vw || !vh) return null
  const r = lede.getBoundingClientRect()
  if (!r.height) return null
  const y = window.scrollY
  const flag = [r.left, r.top + y, r.right, r.bottom + y]
  const axis = IMPACT_X * vw
  if (r.left < axis && r.right > axis) {
    const bottom = (copy.getBoundingClientRect().bottom + y) / vh
    return { flag, calm: true, beamTop: bottom, horizon: bottom + 0.13 }
  }
  return { flag, calm: false, horizon: (r.bottom + y) / vh + 0.03 }
}

export default function BackgroundSpace({ lit = true }) {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const reduced = useReducedMotion()
  const [mode, setMode] = useState('gl')

  useEffect(() => {
    if (mode !== 'gl') return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined
    let renderer = null
    try {
      renderer = createStrikeRenderer(canvas, { reducedMotion: reduced, impactX: IMPACT_X, compose: composeAroundHero })
    } catch (err) {
      document.documentElement.dataset.bgError = String(err?.message || err).slice(0, 300)
    }
    if (!renderer) {
      setMode('2d')
      return undefined
    }
    rendererRef.current = renderer
    return () => {
      rendererRef.current = null
      renderer.destroy()
    }
  }, [mode, reduced])

  useEffect(() => {
    if (lit && rendererRef.current) rendererRef.current.ignite()
  }, [lit, mode, reduced])

  useEffect(() => {
    if (mode !== '2d') return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const render = () => {
      try {
        drawPlanetScene(canvas, { impactX: IMPACT_X })
      } catch (err) {
        document.documentElement.dataset.bgError = String(err?.message || err).slice(0, 300)
      }
    }
    render()
    let t = 0
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(render, 180)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
    }
  }, [mode])

  return (
    <div className="bg-space" data-mode={mode} aria-hidden="true">
      <canvas key={mode} className="planet-canvas" ref={canvasRef} />
      {mode === '2d' && (
        <>
          <div className="stars" />
          <span className="meteor" />
          <div className="meteor-strike">
            <div className="shaft" />
            <div className="horizon-splash" />
            <div className="beam-glow" />
            <div className="beam-core" />
            <span className="beam-flow" />
            <div className="impact" />
            <div className="impact-core" />
          </div>
        </>
      )}
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { featured, archive } from '../data/projects.js'
import MaskedHeading from './MaskedHeading.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useTilt } from '../hooks/useTilt.js'
import { useStreamOnView } from '../hooks/useStreamOnView.js'
import { EXPO, SOFT, groupProps } from '../lib/motion.js'

/* "+7" numeral: rises with a slight scale settle, driven by the work-archive
   group trigger (one IO on a full-width element — a narrow child with its own
   rootMargin inset would risk never intersecting). */
const ARCHIVE_COUNT = {
  hidden: { opacity: 0, y: 34, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EXPO, delay: 0.1 } },
}

/**
 * CaseCard — one featured case file. The motion.li keeps its framer entrance
 * untouched; ALL card content lives inside .case-inner, the tilt-transform
 * element. useTilt writes --rx/--ry (±4°), --gx/--gy (pointer glow) and
 * --img-x/--img-y (opposing inner image parallax) on the li; CSS consumes
 * them on .case-inner / the screenshot. Inert on touch and reduced motion.
 */
function CaseCard({ project, index, reduced }) {
  const tilt = useTilt({ maxTilt: 4, glow: true, parallax: 10 })

  return (
    <motion.li
      ref={tilt.ref}
      className="case-card"
      initial={reduced ? undefined : { opacity: 0, y: 44, clipPath: 'inset(0 0 16% 0)' }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: EXPO, delay: (index % 2) * 0.08 }}
    >
      <div className="case-inner">
        <div className="case-head">
          <span className="case-ref mono-label">case://{project.num}</span>
          <h3 className="case-name">{project.name}</h3>
          <motion.span
            className={`badge badge-${project.status.toLowerCase()}`}
            initial={reduced ? undefined : { opacity: 0, scale: 0.6 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ type: 'spring', stiffness: 420, damping: 24, delay: 0.22 + (index % 2) * 0.08 }}
          >
            <i className="badge-tick" aria-hidden="true" />
            {project.status}
          </motion.span>
        </div>
        <div className={`case-view case-view--${project.num}`}>
          <motion.div
            className="case-view-media"
            initial={reduced ? undefined : { scale: 1.06 }}
            whileInView={reduced ? undefined : { scale: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, ease: EXPO, delay: 0.1 + (index % 2) * 0.08 }}
          >
            <img src={project.img} alt="" width="1600" height="1000" loading="lazy" decoding="async" />
          </motion.div>
          <span className="case-chip">{project.type} / {project.year}</span>
        </div>
        <p className="case-desc">{project.desc}</p>
      </div>
    </motion.li>
  )
}

/**
 * Work — "case files": each project reads like a reviewed file, header row with
 * a case:// reference and verdict badge, screenshot in a diff-view frame.
 * Full-motion pass: header lines masked-rise (staggered), cards clip-reveal
 * from the bottom edge, screenshots settle 1.06 → 1 on enter (hover 1.045 via
 * CSS on the inner img), verdict badges pop with a spring, the +7 numeral rises.
 * PFR-010 continuous layer: cards gain a physical tilt/glow/parallax hover
 * (useTilt) and the archive ticker skews with scroll velocity (±1.2° clamp) —
 * reading speed, one focal language. Screenshots are art-directed: browser
 * chrome/taskbar is cropped out per image (--img-zoom/--img-tx/--img-ty map
 * in main.css) and each frame carries a mono caption chip (type — year).
 * Entrances are once-only and rest at fully-visible states; under reduced
 * motion nothing is initially hidden and the skew/tilt stay inert.
 */
export default function Work() {
  const tickerRef = useRef(null)
  const workRef = useRef(null)
  const reduced = useReducedMotion()
  // section lines stream once on view (PFR-010d) — same motion language as hero
  const kickerRef = useRef(null)
  const archiveLabelRef = useRef(null)
  useStreamOnView(kickerRef)
  useStreamOnView(archiveLabelRef)

  // Opposing-row parallax: the section header drifts slightly against scroll.
  const { scrollYProgress } = useScroll({ target: workRef, offset: ['start end', 'end start'] })
  const headY = useTransform(scrollYProgress, [0, 1], [52, -52])

  // Ticker skew = reading speed: manual, deterministic scroll velocity
  // (px/sec, sampled from scrollY change events). QA live 2026-11-15 proved
  // useVelocity(scrollY) stayed 0 on this framer-motion v14 build while the
  // scrollY MotionValue itself updated (ScrollProgress scrubbed from the very
  // same source), so the chain below deliberately does not touch that code
  // path. The velocity maps PROPORTIONALLY onto ±1.2° (0 → 1500 px/s = full
  // skew, clamped outside) instead of a raw clamp: a raw px/s clamp would
  // saturate at 1.2° for any real scroll speed (binary indicator) and freeze
  // there after the last change event — the proportional map decays to exact
  // 0° at rest. jsdom (no scroll events) is a no-op. framer writes the
  // transform on .ticker-skew; the CSS keyframe translation stays on the
  // inner ul, so the two never fight.
  const { scrollY } = useScroll()
  const velocityMV = useMotionValue(0)
  const last = useRef(null)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const now = performance.now()
    if (last.current && now > last.current.t) {
      velocityMV.set(((y - last.current.y) / (now - last.current.t)) * 1000)
    }
    last.current = { y, t: now }
  })
  const skewY = useTransform(velocityMV, [-1500, 1500], ['-1.2deg', '1.2deg'])

  useEffect(() => {
    const el = tickerRef.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-paused', !entry.isIntersecting)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])


  return (
    <section className="work" id="work" ref={workRef}>
      <motion.header
        className="work-head"
        style={reduced ? undefined : { y: headY }}
        {...groupProps(reduced, { step: 0.07, delayChildren: 0.05, margin: '-10% 0px' })}
      >
        <motion.p className="work-kicker mono-label" variants={reduced ? undefined : SOFT} ref={kickerRef}>
          case files / reviewed &amp; shipped
        </motion.p>
        <MaskedHeading as="h2" className="work-title display-1" lines={['Selected', 'work']} inherited />
        <motion.p className="work-meta mono-meta" variants={reduced ? undefined : SOFT}>
          6 featured / 7 more<br />2017-2024
        </motion.p>
      </motion.header>

      <ul className="case-list" role="list">
        {featured.map((p, i) => (
          <CaseCard key={p.num} project={p} index={i} reduced={reduced} />
        ))}
      </ul>

      <motion.div
        className="work-archive"
        {...groupProps(reduced, { step: 0.1, delayChildren: 0.05, margin: '-10% 0px' })}
      >
        <motion.p
          className="archive-count display-2"
          variants={reduced ? undefined : ARCHIVE_COUNT}
        >
          +7
        </motion.p>
        <motion.div className="archive-body" variants={reduced ? undefined : SOFT}>
          <p className="archive-label mono-label" ref={archiveLabelRef}>More shipped projects</p>
          <div className="ticker" ref={tickerRef}>
            <motion.div className="ticker-skew" style={reduced ? undefined : { skewY }}>
              <ul className="ticker-track" role="list" aria-label="Archive project names">
                <li className="ticker-group">
                  {archive.map((n) => (
                    <span key={n} className="ticker-name">{n}</span>
                  ))}
                </li>
                <li className="ticker-group" aria-hidden="true">
                  {archive.map((n) => (
                    <span key={n} className="ticker-name">{n}</span>
                  ))}
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MaskedHeading from './MaskedHeading.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useStreamOnView } from '../hooks/useStreamOnView.js'
import { SOFT, POP, stagger, groupProps, revealProps } from '../lib/motion.js'

const SKILLS = [
  'Backend development',
  'Fullstack applications',
  'AWS deployment',
  'API integrations',
  'CMS & POS systems',
  'AI-assisted development',
  'System analysis & planning',
]

/**
 * Profile — the bio reads as a JSDoc block; skills are mono chips.
 * Full-motion pass: heading masked-rise; skill chips pop in with a 40ms
 * spring stagger. PFR-010 continuous layer: the JSDoc block is scrubbed by
 * scroll (opacity 0.62 → 1, y 28 → 0 across its own viewport approach) so the
 * block keeps brightening as the reviewer reads into it. The bio stays ONE
 * direct text node (content contract). Under reduced motion everything
 * renders at rest.
 */
export default function ProfileSection() {
  const reduced = useReducedMotion()
  // section lines stream once on view (PFR-010d); the bio gets the faster
  // profile — it is the long body line of the section
  const focusRef = useRef(null)
  const bioRef = useRef(null)
  const metaRef = useRef(null)
  useStreamOnView(focusRef)
  useStreamOnView(bioRef, { speed: 'fast' })
  useStreamOnView(metaRef)
  const jsdocRef = useRef(null)

  // Continuous scrub: driven by the jsdoc block's own scroll progress
  // (vertical-only offsets); framer writes transform/opacity only.
  const { scrollYProgress } = useScroll({ target: jsdocRef, offset: ['start 0.92', 'start 0.45'] })
  // starts at 0.62, not lower: below that the bio drops under 4.5:1 while it
  // is already on screen and readable
  const jsdocOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 1])
  const jsdocY = useTransform(scrollYProgress, [0, 1], [28, 0])

  return (
    <section className="profile" id="profile">
      <MaskedHeading
        as="h2"
        className="profile-title display-1"
        lines={['The whole path,', 'one developer.']}
      />
      <div className="profile-grid">
        <motion.div
          className="jsdoc"
          ref={jsdocRef}
          style={reduced ? undefined : { opacity: jsdocOpacity, y: jsdocY }}
        >
          <p className="jsdoc-body" ref={bioRef}>
            I am Fadilatur Rokhman, a fullstack developer with backend roots and more than four years of professional experience. I build web applications, business platforms, CMS and POS systems, transaction flows, and service integrations, and I deploy and run them on AWS. I use AI across my daily work to get routine tasks done faster, without lowering the bar on reliability, security, or maintainability. I am open to backend and fullstack roles where one person can own the path from the database to production.
          </p>
        </motion.div>
        <motion.div
          className="profile-skills"
          {...groupProps(reduced, { step: 0.04, delayChildren: 0.12, margin: '-12% 0px' })}
        >
          <motion.p className="mono-label" variants={reduced ? undefined : SOFT} ref={focusRef}>
            Technical focus
          </motion.p>
          <motion.ul className="skill-chips" role="list" variants={reduced ? undefined : stagger(0.04, 0)}>
            {SKILLS.map((s) => (
              <motion.li key={s} className="skill-chip" variants={reduced ? undefined : POP}>
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
      <motion.p className="profile-meta mono-meta" {...revealProps(reduced, { y: 20, duration: 0.6, margin: '-12% 0px' })} ref={metaRef}>
        4+ years experience / Probolinggo, Indonesia
      </motion.p>
    </section>
  )
}

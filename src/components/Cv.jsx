import { motion } from 'framer-motion'
import { site } from '../data/site.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { EXPO } from '../lib/motion.js'

const letterVariant = {
  hidden: { y: '112%' },
  show: { y: '0%', transition: { duration: 0.65, ease: EXPO } },
}

/* Letter-rise for one display word. The UNCLIPPED word wrapper carries
   the variants (a clipped letter span would never intersect, so IO would
   deadlock); letters stagger via inherited variants. The full word stays in
   aria-label so the accessible name is unchanged.
   The whileInView trigger itself lives on the <section> (always visible),
   because the card below starts fully clipped (clip-path inset 100%) — an IO
   on a fully-clipped element can never fire. */
function RiseWord({ text, className }) {
  return (
    <motion.span
      className={`rise-word${className ? ` ${className}` : ''}`}
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.032, delayChildren: 0.35 } } }}
    >
      {Array.from(text).map((ch, i) => (
        <span className="rise-letter" key={`${ch}-${i}`} aria-hidden="true">
          <motion.span variants={letterVariant}>{ch === ' ' ? '\u00A0' : ch}</motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * CV — a single file strip: cv.pdf chip + format note, the display word pair
 * on one line, and the amber action as the one button on the right.
 * "Curriculum" must remain a plain text node inside the anchor.
 * Full-motion pass: the card wipes in (clip-path inset 100% → 0, top-down)
 * once when the section scrolls into view; "Vitae" letters rise after it.
 */
export default function Cv() {
  const reduced = useReducedMotion()

  return (
    <motion.section
      className="cv"
      id="cv"
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'show'}
      viewport={{ once: true, margin: '-12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.a
        className="cv-card"
        href={site.cv}
        target="_blank"
        rel="noreferrer"
        variants={{
          hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          show: {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 0.7, ease: EXPO },
          },
        }}
      >
        <span className="cv-file mono-label">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 1.5h5.2L13 5.3V14a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 4 14V1.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M9 1.5V5h4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          cv.pdf
        </span>
        <span className="cv-meta mono-meta">PDF &middot; opens in a new tab</span>
        <span className="cv-word display-1">
          <span className="line"><span className="line-inner">Curriculum</span></span>
          <RiseWord text="Vitae" className="cv-word-accent" />
        </span>
        <span className="cv-action">Open document <span aria-hidden="true">&#8599;</span></span>
      </motion.a>
    </motion.section>
  )
}

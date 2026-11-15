import { motion } from 'framer-motion'
import MaskedHeading from './MaskedHeading.jsx'
import { site } from '../data/site.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { EXPO, SOFT, groupProps } from '../lib/motion.js'

/**
 * Contact — masked-rise heading, email link whose underline draws in
 * (scaleX 0 → 1, origin left) once in view, meta rows + socials staggered.
 * The email text stays a direct text node (content contract).
 */
export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section className="contact" id="contact">
      <MaskedHeading
        as="h2"
        className="contact-title display-1"
        lines={['Hiring for backend', 'or fullstack?', 'Write to me.']}
      />
      <motion.a
        className="contact-email"
        href={`mailto:${site.email}`}
        initial={reduced ? undefined : 'hidden'}
        whileInView={reduced ? undefined : 'show'}
        viewport={{ once: true, margin: '-12% 0px' }}
        variants={{
          hidden: { opacity: 0, y: 32 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
        }}
      >
        {site.email}<span className="email-arrow" aria-hidden="true">&#8599;</span>
        <motion.span
          className="email-line"
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.7, ease: EXPO, delay: 0.25 } },
          }}
        />
      </motion.a>
      <motion.div
        className="contact-meta"
        {...groupProps(reduced, { step: 0.07, delayChildren: 0.12, margin: '-12% 0px' })}
      >
        <motion.p className="contact-row" variants={reduced ? undefined : SOFT}>
          <span className="mono-label">Location</span>{site.location}
        </motion.p>
        <motion.p className="contact-row" variants={reduced ? undefined : SOFT}>
          <span className="mono-label">Availability</span>{site.availability}
        </motion.p>
        <motion.div className="contact-row" variants={reduced ? undefined : SOFT}>
          <span className="mono-label">Elsewhere</span>
          <p className="contact-social">
            <a href={site.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">&#8599;</span></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">&#8599;</span></a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

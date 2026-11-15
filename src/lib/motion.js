/* ==========================================================================
   motion.js — shared motion presets for the full-motion pass.
   Rules encoded here:
   - one expo curve (matches --ease-expo token) for every entrance;
   - only transform / opacity / clip-path values animate;
   - every preset is consumed through the `reduced` gate so that under
     prefers-reduced-motion elements render at REST state (never hidden).
   ========================================================================== */

/** expo easing token (same curve as --ease-expo in tokens.css) */
export const EXPO = [0.16, 1, 0.3, 1]

/** soft rise for single blocks (kickers, meta lines, rows) */
export const SOFT = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EXPO } },
}

/** masked line rise: inner span slides up inside an overflow-hidden wrapper */
export const MASK_LINE = {
  hidden: { y: '112%' },
  show: { y: '0%', transition: { duration: 0.6, ease: EXPO } },
}

/** chip / badge pop (spring) */
export const POP = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 430, damping: 26 } },
}

/** orchestration variant: stagger children */
export const stagger = (step = 0.06, delay = 0.04) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

/**
 *whileInView props for a self-triggered block. Pass `reduced` from the
 * useReducedMotion hook; under reduced motion this returns an empty object so
 * the element renders at rest (no initial hidden state at all).
 */
export function revealProps(reduced, { y = 32, duration = 0.7, delay = 0, margin = '-10% 0px' } = {}) {
  if (reduced) return {}
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, ease: EXPO, delay },
  }
}

/**
 * Orchestrator props for a parent whose children carry variants
 * (SOFT / MASK_LINE / POP). Children render at rest under reduced motion.
 */
export function groupProps(reduced, { step = 0.06, delay = 0.04, margin = '-12% 0px' } = {}) {
  if (reduced) return {}
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin },
    variants: stagger(step, delay),
  }
}

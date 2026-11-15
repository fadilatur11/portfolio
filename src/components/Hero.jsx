import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { site } from '../data/site.js'
import { useMagnet } from '../hooks/useMagnet.js'
import { useReadingRuler } from '../hooks/useReadingRuler.js'
import { useAmbientPause } from '../hooks/useAmbientPause.js'
import { useCodeSession } from '../hooks/useCodeSession.js'
import { useHeroStream } from '../hooks/useHeroStream.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/* ---- decorative code segments (rendered aria-hidden; generic illustrative TS) ---- */
const C = (t) => ({ c: 'c', t }) // comment
const K = (t) => ({ c: 'k', t }) // keyword
const F = (t) => ({ c: 'f', t }) // function
const Y = (t) => ({ c: 'y', t }) // type
const S = (t) => ({ c: 's', t }) // string
const P = (t) => ({ c: 'p', t }) // plain
const M = (t) => ({ c: 'm', t }) // constant
const HL = (t) => ({ c: 'hl', t }) // the one amber token

const CODE_BEFORE = [
  { n: 12, seg: [C('// channels.ts: marketplace order sync')] },
  { n: 13, seg: [K('import'), P(' { redis } '), K('from'), S(" './lib/redis'")] },
  { n: 14, seg: [K('import'), P(' { db } '), K('from'), S(" './lib/postgres'")] },
  { n: 15, seg: [] },
  { n: 16, seg: [C('/**')] },
  { n: 17, seg: [C(' * Pull new orders from a sales channel and')] },
  { n: 18, seg: [C(' * append them to the backoffice ledger.')] },
  { n: 19, seg: [C(' */')] },
  { n: 20, seg: [K('export async function'), P(' '), F('syncChannelOrders'), P('(')] },
  { n: 21, seg: [P('  channelId: '), Y('string'), P(',')] },
  { n: 22, seg: [P('  cursor: '), Y('string'), P(',')] },
  { n: 23, seg: [P(') {')] },
  { n: 24, seg: [P('  '), K('const'), P(' lockKey = '), HL('`sync:${channelId}`')], flag: true },
]

const CODE_AFTER = [
  { n: 25, seg: [P('  '), K('const'), P(' lock = '), K('await'), P(' redis.'), F('set'), P('(lockKey, '), S("'1'"), P(', '), S("'NX'"), P(', '), S("'EX'"), P(', '), M('300'), P(')')] },
  { n: 26, seg: [P('  '), K('if'), P(' (!lock) '), K('return'), P(' { skipped: '), M('true'), P(' }')] },
  { n: 27, seg: [] },
  { n: 28, seg: [P('  '), K('const'), P(' orders = '), K('await'), P(' db.order.'), F('findMany'), P('({')] },
  { n: 29, seg: [P('    where: { channel: channelId, createdAfter: cursor },')] },
  { n: 30, seg: [P('  })')] },
  { n: 31, seg: [P('  '), K('await'), P(' ledger.'), F('append'), P('(orders)')] },
  { n: 32, seg: [P('  '), K('await'), P(' redis.'), F('set'), P('(cursor, latest.id)')] },
  { n: 33, seg: [P('  '), K('return'), P(' { synced: orders.length }')] },
  { n: 34, seg: [P('}')] },
]

/* Read-wave order: --i indexes run continuously across before + after blocks. */

/* Live-coding session edit points (PFR-010b): the caret rotates through these
   curated (line, token, chars) positions, deleting and retyping a few trailing
   characters — NET-ZERO, the token text always returns to its exact original.
   Line 24 (the amber flag) is deliberately excluded: the review thread anchors
   to it. Token indices count ALL children of the line's .t wrapper. */
const EDIT_POINTS = [
  { line: 13, token: 3, chars: 3 }, // './lib/redis'
  { line: 20, token: 2, chars: 4 }, // syncChannelOrders
  { line: 21, token: 1, chars: 3 }, // string
  { line: 25, token: 13, chars: 2 }, // 300
  { line: 29, token: 0, chars: 4 }, // where-line tail
  { line: 32, token: 3, chars: 3 }, // append
]

function CodeLine({ line, index }) {
  return (
    <div className={`ln${line.flag ? ' flag' : ''}`} style={{ '--i': index }}>
      <span className="n">{line.n}</span>
      <span className="t">
        {line.seg.map((s, j) =>
          s.c === 'hl' ? (
            <span className="hl" key={j}>{s.t}</span>
          ) : (
            <i key={j} className={s.c}>{s.t}</i>
          ),
        )}
      </span>
    </div>
  )
}

/* Gutter tick mark — the brand glyph. `amber` flips the flag block to the accent. */
export function TickGlyph({ amber = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.2" y="3.5" width="1.4" height="17" fill="currentColor" opacity=".45" />
      <rect x="10" y="5.4" width="9.5" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="10" y="10.9" width="6" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="10" y="16.4" width="8" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="5.1" y="9.6" width="3.6" height="4.8" rx="1" fill={amber ? 'var(--amber)' : 'currentColor'} />
    </svg>
  )
}

/* Exit parallax for one H1 line: scrubbed translate as the hero scrolls out.
   Staggered depths give the three lines different rates (reference-style
   opposing scroll rows). Applied to the OUTER .hline mask so the intro rise
   (CSS animation on .hline-inner) and the scrub never fight each other. */
function ExitLine({ progress, depth, reduced, children }) {
  const y = useTransform(progress, [0, 1], [0, depth])
  return (
    <motion.span className="hline" style={reduced ? undefined : { y }}>
      {children}
    </motion.span>
  )
}

/**
 * Hero — copy column + the code stage ("the image IS the code").
 * Intro sequence (only when `playIntro` && motion allowed, ≤1.6s total):
 * masked H1 lines rise → code lines wipe in with the gutter read-wave →
 * the flagged line pulses amber → the review comment unfolds into the gap.
 * Scroll depth: the stage drifts up (-44px) and dims slightly (brightness),
 * while the H1 lines leave at staggered rates — all scrubbed to hero exit.
 * Without motion: everything renders static and visible (non-gating).
 */
export default function Hero({ playIntro = false }) {
  const stageRef = useRef(null)
  const heroRef = useRef(null)
  const [threadOpen, setThreadOpen] = useState(!playIntro)
  const reduced = useReducedMotion()
  const magnetPrimary = useMagnet({ padding: 90, strength: 5 })
  const magnetGhost = useMagnet({ padding: 90, strength: 5 })

  // LLM-style streaming reveal (PFR-010c): the kicker, the three H1 lines and
  // the lede type out like a model response — variable char chunks, one amber
  // stream cursor travelling down the column, fading out when done. Final
  // strings stay byte-identical (test contract); reduced motion renders the
  // full text immediately (the accepted rest state). Replaces the PFR-010
  // decode effect on the kicker, which is why useDecodeText is no longer used.
  const kickerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const ledeRef = useRef(null)
  useHeroStream({ enabled: playIntro, heroRef, kickerRef, line1Ref, line2Ref, line3Ref, ledeRef })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -44])
  const brightness = useTransform(scrollYProgress, [0, 0.85], [1, 0.82])
  const stageFilter = useTransform(brightness, (v) => `brightness(${v})`)

  useReadingRuler(stageRef, playIntro)
  useAmbientPause(stageRef)
  // Ambient live-coding session: the caret keeps "working" in the file while
  // the stage is visible. Inert under reduced motion / without IO (jsdom).
  useCodeSession(stageRef, EDIT_POINTS, { enabled: playIntro })

  useEffect(() => {
    if (!playIntro) return undefined
    const t = setTimeout(() => setThreadOpen(true), 1000)
    return () => clearTimeout(t)
  }, [playIntro])

  return (
    <section className="hero" id="top" data-intro={playIntro ? 'play' : 'off'} ref={heroRef}>
      <div className="hero-copy">
        <p className="hero-kicker mono-label" ref={kickerRef}>{`// ${site.role}`}</p>
        <h1 className="hero-title">
          <ExitLine progress={scrollYProgress} depth={-30} reduced={reduced}>
            <span className="hline-inner" ref={line1Ref}>From backend</span>
          </ExitLine>{' '}
          <ExitLine progress={scrollYProgress} depth={-16} reduced={reduced}>
            <span className="hline-inner" ref={line2Ref}>to browser,</span>
          </ExitLine>{' '}
          <ExitLine progress={scrollYProgress} depth={-6} reduced={reduced}>
            <span className="hline-inner" ref={line3Ref}>live on AWS.</span>
          </ExitLine>
        </h1>
        <p className="hero-lede" ref={ledeRef}>
          I design the data and the APIs, build the interface on top, and
          deploy the result to AWS. AI speeds up my routine work. The review
          bar stays where it was.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href="#work" ref={magnetPrimary}>
            View selected work <span className="btn-arrow" aria-hidden="true">&#8594;</span>
          </a>
          <a className="btn btn-ghost" href="#contact" ref={magnetGhost}>
            Get in touch <span className="btn-arrow" aria-hidden="true">&#8594;</span>
          </a>
        </div>
      </div>

      <motion.div
        className={`hero-stage${playIntro ? ' is-reading' : ''}`}
        id="stage"
        ref={stageRef}
        style={reduced ? undefined : { y: stageY, filter: stageFilter }}
      >
        <div className="code" aria-hidden="true">
          {CODE_BEFORE.map((line, i) => (
            <CodeLine key={line.n} line={line} index={i} />
          ))}
        </div>

        <div className={`thread${threadOpen ? ' is-open' : ''}`}>
          <div className="thread-clip">
            <article
              className="comment"
              aria-label={`Review note by ${site.github.split('/').pop()} on channels.ts, line 24`}
            >
              <header className="c-head">
                <span className="c-av" aria-hidden="true"><TickGlyph /></span>
                <span className="c-who mono-label">reviewer: {site.github.split('/').pop()}</span>
                <span className="c-when">channels.ts · line 24</span>
              </header>
              <div className="c-body">
                <p>
                  <span className="prefix">review:</span>{" "}
                  ships under real load. 4+ years in production. approve.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="code code-after" aria-hidden="true">
          {CODE_AFTER.map((line, j) => (
            <CodeLine key={line.n} line={line} index={CODE_BEFORE.length + j} />
          ))}
          <span className="code-caret" aria-hidden="true" />
        </div>
      </motion.div>

      <p className="stage-caption mono-label" aria-hidden="true">
        channels.ts / illustrative code
      </p>
    </section>
  )
}

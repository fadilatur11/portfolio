import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { featured } from '../data/projects.js'

function Reel({ project, onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const filter = useTransform(brightness, (v) => `brightness(${v})`)
  const radius = useTransform(scrollYProgress, [0, 1], ['0vw', '4vw'])

  return (
    <div className="reel-slot" ref={ref}>
      <motion.div className="reel-card" style={{ scale, filter, borderRadius: radius }}>
        <img className="reel-img" src={project.img} alt="" width="1600" height="1000" loading={project.num === '01' ? 'eager' : 'lazy'} decoding="async" />
        <div className="reel-shade" aria-hidden="true" />
        <div className="reel-info">
          <span className="reel-num mono-label">{project.num} / 06</span>
          <span className="reel-title">{project.name}</span>
          <span className="reel-sub">
            <span className="reel-type">{project.type}</span>
            <span className="reel-year mono-meta">{project.year}</span>
            <span className={`badge badge-${project.status.toLowerCase()}`}>{project.status}</span>
          </span>
        </div>
        <button
          type="button"
          className="reel-open"
          aria-label={`Open project details: ${project.name}`}
          aria-haspopup="dialog"
          onClick={() => onOpen(project)}
        >
          View case <span aria-hidden="true">&#8599;</span>
        </button>
      </motion.div>
    </div>
  )
}

export default function ReelStack({ onOpen }) {
  return (
    <div className="reel-stack">
      {featured.map((p) => (
        <Reel key={p.num} project={p} onOpen={onOpen} />
      ))}
    </div>
  )
}

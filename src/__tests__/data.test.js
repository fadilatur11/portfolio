import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { featured, archive } from '../data/projects.js'

describe('data integrity', () => {
  it('has exactly 6 featured projects and 7 archive names', () => {
    expect(featured).toHaveLength(6)
    expect(archive).toHaveLength(7)
  })

  it('every featured project has complete fields', () => {
    for (const p of featured) {
      expect(p.num).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.type).toBeTruthy()
      expect(p.desc).toBeTruthy()
      expect(p.status).toMatch(/^(RECENT|SHIPPED)$/)
    }
  })

  it('every featured image path exists under public/', () => {
    for (const p of featured) {
      const path = p.img.replace(/^\//, '')
      expect(existsSync(path), `missing asset: ${path}`).toBe(true)
    }
  })

  it('CV pdf exists in public/cv', () => {
    expect(existsSync('public/cv/CV FADILATUR ROKHMAN-compressed.pdf')).toBe(true)
  })
})

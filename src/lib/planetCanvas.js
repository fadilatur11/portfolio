const TAU = Math.PI * 2

/* ------------------------------------------------------------------ noise */

function hash2(ix, iy, seed) {
  const s = Math.sin(ix * 127.1 + iy * 311.7 + seed * 74.7) * 43758.5453
  return s - Math.floor(s)
}

function smoothStep(t) {
  return t * t * (3 - 2 * t)
}

function valueNoise(x, y, seed) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const x0 = hash2(ix, iy, seed)
  const x1 = hash2(ix + 1, iy, seed)
  const y0 = hash2(ix, iy + 1, seed)
  const y1 = hash2(ix + 1, iy + 1, seed)
  const top = x0 + smoothStep(fx) * (x1 - x0)
  const bottom = y0 + smoothStep(fy) * (y1 - y0)
  return top + smoothStep(fy) * (bottom - top)
}

function fbm(x, y, seed, { octaves = 5, lacunarity = 2, gain = 0.5 } = {}) {
  let sum = 0
  let amp = 0.5
  let norm = 0
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise(x, y, seed + o * 17)
    norm += amp
    x *= lacunarity
    y *= lacunarity
  }
  return sum / norm
}

/* ------------------------------------------------------------------ layers */

function makeLayer(w, h) {
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.ceil(w))
  c.height = Math.max(1, Math.ceil(h))
  return c
}

/* ------------------------------------------------------------------ draw */

export function drawPlanetScene(canvas, { impactX = 0.5 } = {}) {
  const ctx = canvas.getContext && canvas.getContext('2d')
  if (!ctx) return false

  const w = canvas.clientWidth
  const h = canvas.clientHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.max(1, Math.round(w * dpr))
  canvas.height = Math.max(1, Math.round(h * dpr))
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const R = w * 1.5
  const apexY = h * 0.71
  const cx = w / 2
  const cy = apexY + R
  const bandH = h - apexY

  /* -------- landmass + cloud layers (low-res FBM, upscaled) ------------- */

  const lw = Math.max(2, Math.ceil(w / 3))
  const lh = Math.max(2, Math.ceil(bandH / 3) + 2)
  const land = makeLayer(lw, lh)
  const landCtx = land.getContext('2d')
  const landImg = landCtx.createImageData(lw, lh)
  const landData = landImg.data
  for (let py = 0; py < lh; py++) {
    for (let px = 0; px < lw; px++) {
      const nx = (px / w) * 5
      const ny = (py / bandH) * 1.8
      const v = fbm(nx, ny, 7, { octaves: 5 })
      const landA = smoothStep((v - 0.45) / 0.25) * 0.45
      const i = (py * lw + px) * 4
      landData[i] = 100
      landData[i + 1] = 118
      landData[i + 2] = 136
      landData[i + 3] = Math.round(landA * 255)
    }
  }
  landCtx.putImageData(landImg, 0, 0)

  const clouds = makeLayer(lw, lh)
  const cloudCtx = clouds.getContext('2d')
  const cloudImg = cloudCtx.createImageData(lw, lh)
  const cloudData = cloudImg.data
  for (let py = 0; py < lh; py++) {
    for (let px = 0; px < lw; px++) {
      const nx = (px / w) * 7
      const ny = (py / bandH) * 2.2
      const v = fbm(nx, ny, 41, { octaves: 4 })
      let cloudA = smoothStep((v - 0.44) / 0.3) * 0.4
      const depth = py / lh
      cloudA *= 1 - depth * 0.55
      const i = (py * lw + px) * 4
      cloudData[i] = 235
      cloudData[i + 1] = 225
      cloudData[i + 2] = 205
      cloudData[i + 3] = Math.round(cloudA * 255)
    }
  }
  cloudCtx.putImageData(cloudImg, 0, 0)

  /* -------- paint the planet band (clipped below the arc) --------------- */

  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, w, h)
  ctx.arc(cx, cy, R, 0, TAU, true)
  ctx.clip('evenodd')

  // ocean base with depth falloff from the rim
  const surf = ctx.createLinearGradient(0, apexY, 0, h)
  surf.addColorStop(0, '#0a1119')
  surf.addColorStop(0.4, '#070c12')
  surf.addColorStop(1, '#03060a')
  ctx.fillStyle = surf
  ctx.fillRect(0, apexY - 2, w, bandH + 4)

  // landmasses — soft, dim night-side terrain (blur kills the blocky upscale)
  ctx.globalAlpha = 1
  ctx.filter = 'blur(2.5px)'
  ctx.drawImage(land, 0, apexY - 8, w, bandH + 16)
  ctx.filter = 'none'

  // beam light-pool on the surface at the impact point
  const ix = impactX * w
  const surfaceY = cy - Math.sqrt(Math.max(0, R * R - (ix - cx) * (ix - cx)))
  const pool = ctx.createRadialGradient(ix, surfaceY + 30, 10, ix, surfaceY + 30, 320)
  pool.addColorStop(0, 'rgba(242,179,61,0.30)')
  pool.addColorStop(0.45, 'rgba(242,179,61,0.12)')
  pool.addColorStop(1, 'rgba(242,179,61,0)')
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = pool
  ctx.fillRect(ix - 320, surfaceY - 40, 640, 420)
  ctx.globalCompositeOperation = 'source-over'

  // clouds over everything, screen-blended
  ctx.globalCompositeOperation = 'screen'
  ctx.globalAlpha = 0.8
  ctx.filter = 'blur(4px)'
  ctx.drawImage(clouds, 0, apexY - 8, w, bandH + 16)
  ctx.filter = 'none'
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'

  // photographic vignette toward the bottom of the frame
  const vig = ctx.createLinearGradient(0, apexY + bandH * 0.45, 0, h)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(0,0,0,0.5)')
  ctx.fillStyle = vig
  ctx.fillRect(0, apexY, w, bandH)

  ctx.restore()

  /* -------- atmosphere scattering bands along the arc ------------------- */

  const a0 = Math.PI * 1.08
  const a1 = Math.PI * 1.92

  const band = (width, color, blur) => {
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, R, a0, a1)
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.shadowColor = 'rgba(242,179,61,0.55)'
    ctx.shadowBlur = blur
    ctx.stroke()
    ctx.restore()
  }

  band(1.4, 'rgba(255,228,178,0.95)', 0)
  band(4, 'rgba(255,214,150,0.4)', 10)
  band(12, 'rgba(242,179,61,0.18)', 26)
  band(34, 'rgba(242,179,61,0.08)', 46)
  band(70, 'rgba(180,95,35,0.05)', 70)

  /* -------- hot segment right under the beam impact --------------------- */

  ctx.save()
  const hot = ctx.createRadialGradient(ix, surfaceY, 2, ix, surfaceY, 190)
  hot.addColorStop(0, 'rgba(255,246,224,0.85)')
  hot.addColorStop(0.3, 'rgba(255,218,150,0.4)')
  hot.addColorStop(1, 'rgba(242,179,61,0)')
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = hot
  ctx.beginPath()
  ctx.arc(ix, surfaceY, 190, 0, TAU)
  ctx.fill()
  ctx.restore()

  /* -------- city lights (clusters sampled on the landmass) -------------- */

  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, w, h)
  ctx.arc(cx, cy, R, 0, TAU, true)
  ctx.clip('evenodd')
  ctx.globalCompositeOperation = 'lighter'

  const isLand = (px, py) => {
    const lx = Math.min(lw - 1, Math.max(0, Math.round((px / w) * lw)))
    const ly = Math.min(lh - 1, Math.max(0, Math.round(((py - apexY) / bandH) * lh)))
    return landData[(ly * lw + lx) * 4 + 3] > 100
  }

  let placed = 0
  for (let attempt = 0; attempt < 90 && placed < 16; attempt++) {
    const rx = 0.06 + 0.88 * hash2(placed * 13.3, attempt, 91)
    const px = rx * w
    const arcY = cy - Math.sqrt(Math.max(0, R * R - (px - cx) * (px - cx)))
    const py = arcY + 10 + hash2(attempt, placed, 23) * 40
    if (py > h - 40) continue
    const coastal = isLand(px, py) || isLand(px + 30, py) || isLand(px - 30, py)
    if (!coastal && attempt < 60) continue
    const strength = 0.7 + hash2(attempt, 5, 55) * 0.5
    // glow patch
    const patch = ctx.createRadialGradient(px, py, 2, px, py, 46)
    patch.addColorStop(0, `rgba(242,179,61,${0.14 * strength})`)
    patch.addColorStop(1, 'rgba(242,179,61,0)')
    ctx.fillStyle = patch
    ctx.beginPath()
    ctx.arc(px, py, 46, 0, TAU)
    ctx.fill()
    // bright core + scattered sub-dots
    const dots = 5 + Math.floor(hash2(attempt, 9, 77) * 5)
    for (let d = 0; d < dots; d++) {
      const ox = (hash2(d, attempt, 3) - 0.5) * 56
      const oy = (hash2(d, attempt, 11) - 0.5) * 18
      const dotX = px + ox
      const dotY = py + oy
      ctx.fillStyle = `rgba(255,${214 + Math.floor(hash2(d, attempt, 31) * 30)},150,${0.5 + hash2(d, attempt, 47) * 0.45})`
      ctx.shadowColor = 'rgba(242,179,61,0.9)'
      ctx.shadowBlur = 7
      ctx.beginPath()
      ctx.arc(dotX, dotY, 0.8 + hash2(d, attempt, 61) * 1.5, 0, TAU)
      ctx.fill()
    }
    ctx.shadowBlur = 0
    placed += 1
  }
  ctx.restore()

  return true
}

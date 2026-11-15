import { useEffect } from 'react'

/**
 * Ambient-motion budget: pauses the decorative read-wave when it cannot be seen.
 * Toggles `tab-hidden` on <html> via visibilitychange and `is-offscreen` on the
 * stage via IntersectionObserver; CSS pauses the animation-play-state for both.
 */
export function useAmbientPause(stageRef) {
  useEffect(() => {
    const root = document.documentElement
    const stage = stageRef.current

    const onVisibility = () => root.classList.toggle('tab-hidden', document.hidden)
    onVisibility() // handle a page opened in a background tab
    document.addEventListener('visibilitychange', onVisibility)

    let io
    if (stage && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => stage.classList.toggle('is-offscreen', !entry.isIntersecting),
        { threshold: 0 },
      )
      io.observe(stage)
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      root.classList.remove('tab-hidden')
      if (io) io.disconnect()
      if (stage) stage.classList.remove('is-offscreen')
    }
  }, [stageRef])
}

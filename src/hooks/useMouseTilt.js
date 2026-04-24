import { useRef, useCallback } from 'react'

/**
 * Returns a ref to attach to an element and an onMouseMove handler
 * that applies a CSS 3D tilt transform based on cursor position.
 */
export function useMouseTilt({ maxTilt = 15, scale = 1.04, perspective = 800 } = {}) {
  const ref = useRef(null)

  const handleMouseMove = useCallback(
    e => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateX = ((y - cy) / cy) * -maxTilt
      const rotateY = ((x - cx) / cx) * maxTilt
      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`
      el.style.transition = 'transform 0.1s ease-out'
    },
    [maxTilt, scale, perspective]
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    el.style.transition = 'transform 0.5s ease-out'
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}

/**
 * Hook that returns current mouse position relative to viewport
 */
export function useGlobalMousePosition() {
  const pos = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback(e => {
    pos.current = { x: e.clientX, y: e.clientY }
  }, [])

  return { pos, handleMouseMove }
}

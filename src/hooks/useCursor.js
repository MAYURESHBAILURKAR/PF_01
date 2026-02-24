import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 769) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const animateRing = () => {
      const { x: mx, y: my } = mousePos.current
      const { x: rx, y: ry } = ringPos.current
      const newX = rx + (mx - rx) * 0.12
      const newY = ry + (my - ry) * 0.12
      ringPos.current = { x: newX, y: newY }
      ring.style.left = newX + 'px'
      ring.style.top = newY + 'px'
      rafRef.current = requestAnimationFrame(animateRing)
    }

    const onMouseEnterLink = () => document.body.classList.add('cursor--link')
    const onMouseLeaveLink = () => document.body.classList.remove('cursor--link')

    document.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animateRing)

    // Attach hover states to interactive elements
    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .cursor-hover').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    attachHoverListeners()

    // Reattach when DOM changes (e.g. after route change)
    const observer = new MutationObserver(attachHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return { dotRef, ringRef }
}

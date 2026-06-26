import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15

      dot.style.left = mouse.current.x + 'px'
      dot.style.top = mouse.current.y + 'px'
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top = ring.current.y + 'px'

      raf.current = requestAnimationFrame(tick)
    }

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const addCls = (c) => () => document.body.classList.add(c)
    const rmCls = (c) => () => document.body.classList.remove(c)

    const bind = () => {
      document.querySelectorAll('a, button, [role="button"], .cursor-hover').forEach((el) => {
        if (el._cb) return; el._cb = 1
        el.addEventListener('mouseenter', addCls('cursor--link'))
        el.addEventListener('mouseleave', rmCls('cursor--link'))
      })
    }

    document.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(tick)
    bind()

    const obs = new MutationObserver(() => requestAnimationFrame(bind))
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      obs.disconnect()
      document.body.classList.remove('cursor--link')
    }
  }, [])

  return { dotRef, ringRef }
}

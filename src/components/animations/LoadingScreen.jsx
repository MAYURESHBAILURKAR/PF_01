/**
 * LoadingScreen.jsx — Lemniscate Thread Edition
 * ─────────────────────────────────────────────────────────────────────────────
 * Animation: a single luminous thread traces a lemniscate (∞) path forever.
 * A hot dot leads the way; a fading tail follows. The line itself slowly
 * rotates in 3-D via a subtle perspective tilt. Nothing else. Meditative.
 *
 * VARIANTS
 *   fullscreen  – fixed viewport takeover (default)
 *   overlay     – absolute, covers parent (parent needs position:relative)
 *   corner      – non-blocking toast in bottom-right corner
 *
 * USAGE
 *   import LoadingScreen, { useLoading } from '@/components/animations/LoadingScreen'
 *   <LoadingScreen isLoading={isFetching} />
 *   <LoadingScreen isLoading={saving} variant="corner" message="Saving" />
 *   const { isLoading, run } = useLoading()
 *   const data = await run(fetchSomething())
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'

// ─── Status ticker (unchanged API) ────────────────────────────
const AUTO_MSG = ['Loading', 'Fetching data', 'Processing', 'Almost there']

function StatusTicker({ message, accentColor }) {
  const [text, setText] = useState(message ?? AUTO_MSG[0])
  const isStatic = Boolean(message)

  useEffect(() => {
    if (isStatic) { setText(message); return }
    const id = setInterval(() => {
      setText(t => AUTO_MSG[(AUTO_MSG.indexOf(t) + 1) % AUTO_MSG.length])
    }, 2200)
    return () => clearInterval(id)
  }, [isStatic, message])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 20 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--fg-muted, #888880)',
          }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
          <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
              }}
          />
    </div>
  )
}

// ─── Lemniscate math ───────────────────────────────────────────
// Parametric: x = a·cos(t) / (1+sin²t),  y = a·sin(t)·cos(t) / (1+sin²t)
// t ∈ [0, 2π] traces the full figure-eight once.
function lemniPt(t, a) {
  const s = Math.sin(t), c = Math.cos(t)
  const d = 1 + s * s
  return { x: (a * c) / d, y: (a * s * c) / d }
}

// Pre-bake N sample points so we never recompute in the hot loop
function bakePoints(a, N = 300) {
  return Array.from({ length: N }, (_, i) => lemniPt((i / N) * Math.PI * 2, a))
}

// ─── The lemniscate canvas ─────────────────────────────────────
const TAIL  = 60   // how many samples long the visible tail is
const SPEED = 0.35 // samples advanced per animation frame

function LemniscateThread({ accentColor, a = 72, size = 200 }) {
  const canvasRef  = useRef(null)
  const tRef       = useRef(0)
  const rafRef     = useRef(null)
  const pts        = useRef(bakePoints(a))
  const wrapRef    = useRef(null)

  // Slowly tilt the whole thing in 3-D with GSAP
  useEffect(() => {
    if (!wrapRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        rotateY:   12,
        rotateX:   6,
        duration:  6,
        ease:      'sine.inOut',
        repeat:    -1,
        yoyo:      true,
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  // RAF draw loop on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2 = canvas.getContext('2d')
    const N    = pts.current.length
    const cx   = size / 2
    const cy   = size / 2

    // Parse accent color once into rgba components for gradient
    // We support hex (#rrggbb) and css var fallback
    let r = 200, g = 255, b = 87  // default lime
    const hex = accentColor.startsWith('#') ? accentColor : '#c8ff57'
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16)
      g = parseInt(hex.slice(3, 5), 16)
      b = parseInt(hex.slice(5, 7), 16)
    }

    function draw() {
      ctx2.clearRect(0, 0, size, size)

      const head = Math.floor(tRef.current) % N

      // ── Draw tail: TAIL segments fading to transparent ──────
      for (let i = 0; i < TAIL; i++) {
        const idx0 = (head - i + N) % N
        const idx1 = (head - i - 1 + N) % N
        const p0   = pts.current[idx0]
        const p1   = pts.current[idx1]
        const frac = 1 - i / TAIL              // 1 at head → 0 at tail end
        const alpha = frac * frac * 0.85        // quadratic fade

        ctx2.beginPath()
        ctx2.moveTo(cx + p0.x, cy + p0.y)
        ctx2.lineTo(cx + p1.x, cy + p1.y)
        ctx2.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`
        ctx2.lineWidth   = 1.5 + frac * 0.8    // slightly thicker at head
        ctx2.lineCap     = 'round'
        ctx2.stroke()
      }

      // ── Ghost path: full lemniscate, very dim ───────────────
      ctx2.beginPath()
      pts.current.forEach((p, i) => {
        if (i === 0) ctx2.moveTo(cx + p.x, cy + p.y)
        else         ctx2.lineTo(cx + p.x, cy + p.y)
      })
      ctx2.closePath()
      ctx2.strokeStyle = `rgba(${r},${g},${b},0.07)`
      ctx2.lineWidth   = 1
      ctx2.stroke()

      // ── Hot dot (head) ───────────────────────────────────────
      const hp = pts.current[head]
      // Outer glow
      const grd = ctx2.createRadialGradient(
        cx + hp.x, cy + hp.y, 0,
        cx + hp.x, cy + hp.y, 12,
      )
      grd.addColorStop(0,   `rgba(${r},${g},${b},0.55)`)
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`)
      ctx2.beginPath()
      ctx2.arc(cx + hp.x, cy + hp.y, 12, 0, Math.PI * 2)
      ctx2.fillStyle = grd
      ctx2.fill()
      // Core dot
      ctx2.beginPath()
      ctx2.arc(cx + hp.x, cy + hp.y, 2.5, 0, Math.PI * 2)
      ctx2.fillStyle = `rgba(${r},${g},${b},1)`
      ctx2.shadowBlur  = 8
      ctx2.shadowColor = `rgba(${r},${g},${b},0.9)`
      ctx2.fill()
      ctx2.shadowBlur = 0

      tRef.current += SPEED
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [accentColor, a, size])

  return (
    <div
      ref={wrapRef}
      style={{
        width: size, height: size,
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ display: 'block' }}
      />
    </div>
  )
}

// ─── Compact thread for overlay / corner ──────────────────────
// Same math, smaller canvas, no 3-D tilt — inline and clean.
function MiniThread({ accentColor, a = 28, size = 72 }) {
  const canvasRef = useRef(null)
  const tRef      = useRef(0)
  const rafRef    = useRef(null)
  const pts       = useRef(bakePoints(a))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx  = canvas.getContext('2d')
    const N    = pts.current.length
    const cx   = size / 2
    const cy   = size / 2
    const MINI_TAIL = 45

    let r = 200, g = 255, b = 87
    const hex = accentColor.startsWith('#') ? accentColor : '#c8ff57'
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16)
      g = parseInt(hex.slice(3, 5), 16)
      b = parseInt(hex.slice(5, 7), 16)
    }

    function draw() {
      ctx.clearRect(0, 0, size, size)
      const head = Math.floor(tRef.current) % N

      // Ghost path
      ctx.beginPath()
      pts.current.forEach((p, i) => {
        if (i === 0) ctx.moveTo(cx + p.x, cy + p.y)
        else         ctx.lineTo(cx + p.x, cy + p.y)
      })
      ctx.closePath()
      ctx.strokeStyle = `rgba(${r},${g},${b},0.1)`
      ctx.lineWidth   = 1
      ctx.stroke()

      // Tail
      for (let i = 0; i < MINI_TAIL; i++) {
        const idx0 = (head - i + N) % N
        const idx1 = (head - i - 1 + N) % N
        const frac  = (1 - i / MINI_TAIL) ** 2
        ctx.beginPath()
        ctx.moveTo(cx + pts.current[idx0].x, cy + pts.current[idx0].y)
        ctx.lineTo(cx + pts.current[idx1].x, cy + pts.current[idx1].y)
        ctx.strokeStyle = `rgba(${r},${g},${b},${(frac * 0.9).toFixed(3)})`
        ctx.lineWidth   = 1.5
        ctx.lineCap     = 'round'
        ctx.stroke()
      }

      // Hot dot
      const hp = pts.current[head]
      ctx.beginPath()
      ctx.arc(cx + hp.x, cy + hp.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle   = `rgba(${r},${g},${b},1)`
      ctx.shadowBlur  = 7
      ctx.shadowColor = `rgba(${r},${g},${b},0.8)`
      ctx.fill()
      ctx.shadowBlur  = 0

      tRef.current += SPEED
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [accentColor, a, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}

// ─── Fullscreen variant ────────────────────────────────────────
function FullscreenLoader({ message, accentColor }) {
  return (
    <motion.div
      key="fs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.45 } }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9990,
        background: 'var(--bg, #080808)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot-grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
      }} />

      {/* Deep vignette so dot-grid fades at edges */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, var(--bg, #080808) 100%)',
      }} />

      {/* Noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} />

      {/* ∞ thread */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 } }}
        exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.35 } }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <LemniscateThread accentColor={accentColor} a={72} size={220} />
      </motion.div>

      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
        exit={{ opacity: 0 }}
        style={{ marginTop: 28, position: 'relative', zIndex: 1 }}
      >
        <StatusTicker message={message} accentColor={accentColor} />
      </motion.div>
    </motion.div>
  )
}

// ─── Overlay variant ───────────────────────────────────────────
function OverlayLoader({ message, accentColor }) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.28 } }}
      exit={{ opacity: 0, transition: { duration: 0.28 } }}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(8,8,8,0.88)',
        backdropFilter: 'blur(14px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 18,
        borderRadius: 'inherit',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
      >
        <MiniThread accentColor={accentColor} a={28} size={72} />
      </motion.div>
      <StatusTicker message={message} accentColor={accentColor} />
    </motion.div>
  )
}

// ─── Corner toast variant ──────────────────────────────────────
function CornerLoader({ message, accentColor }) {
  return (
    <motion.div
      key="corner"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, y: 14, transition: { duration: 0.28 } }}
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
        background: 'var(--bg, #080808)',
        border: `1px solid ${accentColor}22`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px ${accentColor}08`,
        overflow: 'hidden',
        minWidth: 186,
      }}
    >
      {/* Travelling accent line — a single CSS-animated light that sweeps */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '40%', height: '1.5px',
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
        <MiniThread accentColor={accentColor} a={10} size={28} />
        <StatusTicker message={message} accentColor={accentColor} />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORTED COMPONENT
// ─────────────────────────────────────────────────────────────
/**
 * @param {boolean}  isLoading
 * @param {string}   [message]        - Static text. Auto-cycles if omitted.
 * @param {'fullscreen'|'overlay'|'corner'} [variant='fullscreen']
 * @param {string}   [accentColor]    - Defaults to CSS var(--accent)
 */
export default function LoadingScreen({
  isLoading = false,
  message,
  variant = 'fullscreen',
  accentColor = 'var(--accent, #c8ff57)',
}) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        variant === 'overlay' ? <OverlayLoader  key="o" message={message} accentColor={accentColor} /> :
        variant === 'corner'  ? <CornerLoader   key="c" message={message} accentColor={accentColor} /> :
                                <FullscreenLoader key="f" message={message} accentColor={accentColor} />
      )}
    </AnimatePresence>
  )
}

// ─── useLoading hook ──────────────────────────────────────────
export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState(null)

  const run = useCallback(async (promise) => {
    setIsLoading(true)
    setError(null)
    try {
      return await promise
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, run }
}

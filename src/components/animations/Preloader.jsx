import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useUIStore } from '@/store'

const LETTERS = ['M', 'A', 'Y', 'U', 'R', 'E', 'S', 'H']
const ACCENT_START = 4

export default function Preloader({ onComplete }) {
  const wrapperRef = useRef(null)
  const lettersRef = useRef([])
  const barRef = useRef(null)
  const countRef = useRef(null)
  const setPreloaderDone = useUIStore((s) => s.setPreloaderDone)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Lock scroll while preloader runs
    document.body.style.overflow = 'hidden'

    const bar = barRef.current
    const countEl = countRef.current
    const letters = lettersRef.current.filter(Boolean)

    // Animate progress counter
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 3
      if (progress >= 100) { progress = 100; clearInterval(interval) }
      if (bar) bar.style.width = Math.min(progress, 100) + '%'
      if (countEl) countEl.textContent = String(Math.floor(Math.min(progress, 100))).padStart(2, '0') + '%'
    }, 80)

    function finish() {
      clearInterval(interval)
      document.body.style.overflow = ''
      // Signal store & parent
      setPreloaderDone()
      if (onComplete) onComplete()
    }

    const tl = gsap.timeline({ onComplete: finish })

    tl.to(letters, {
      y: 0,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.06,
      delay: 0.2,
    })
    .to({}, { duration: 0.5 }) // brief hold
    .to(wrapper, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    })

    return () => {
      clearInterval(interval)
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [setPreloaderDone, onComplete])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9997,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Letters row */}
      <div style={{ display: 'flex' }}>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            style={{
              display: 'inline-block',
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 10vw, 9rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: i >= ACCENT_START ? '#c8ff57' : '#e8e6e0',
              transform: 'translateY(120%)',
              willChange: 'transform',
              overflow: 'hidden',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          width: '0%',
          background: '#c8ff57',
          transition: 'width 0.1s linear',
        }}
      />

      {/* Percentage counter */}
      <div
        ref={countRef}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '40px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
        }}
      >
        00%
      </div>
    </div>
  )
}

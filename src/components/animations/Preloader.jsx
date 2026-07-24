import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useUIStore } from '@/store'

const WORDS = [
  'Hello',
  'Bonjour',
  'Hola',
  'Ciao',
  'Hallo',
  'Olá',
  'こんにちは',
  '안녕하세요',
  '你好',
  'नमस्ते',
  'Welcome',
]

const STEP = 0.25

export default function Preloader({ onComplete }) {
  const wrapperRef = useRef(null)
  const wordRef = useRef(null)
  const glowRef = useRef(null)
  const countRef = useRef(null)
  const setPreloaderDone = useUIStore((s) => s.setPreloaderDone)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const wordEl = wordRef.current
    const countEl = countRef.current
    const glowEl = glowRef.current

    if (!wrapper || !wordEl || !countEl || !glowEl) return

    const glowTween = gsap.to(glowEl, {
      keyframes: [
        { scale: 1, opacity: 0.12, duration: 0 },
        { scale: 1.15, opacity: 0.22, duration: 1.2, ease: 'sine.out' },
        { scale: 1, opacity: 0.12, duration: 1.2, ease: 'sine.in' },
      ],
      repeat: -1,
    })

    document.body.style.overflow = 'hidden'
    gsap.set(wordEl, { opacity: 0, y: 16 })

    function finish() {
      document.body.style.overflow = ''
      setPreloaderDone()
      if (onComplete) onComplete()
    }

    const entranceDur = STEP * 0.5
    const exitDur = STEP * 0.5
    const counter = { val: 0 }
    const totalDuration = (WORDS.length - 1) * STEP + entranceDur

    const tl = gsap.timeline({ onComplete: finish })

    // Word chain built FIRST, with an explicit position (0) on the first item.
    // That explicit position resets the timeline's insertion cursor, so every
    // subsequent unpositioned tween chains correctly from 0 — regardless of
    // what else gets added to the timeline later.
    WORDS.forEach((word, i) => {
      const isLast = i === WORDS.length - 1

      tl.call(
        () => {
          wordEl.textContent = word
          wordEl.style.color = isLast ? '#c8ff57' : '#e8e6e0'
        },
        null,
        i === 0 ? 0 : undefined
      )

      tl.fromTo(
        wordEl,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: entranceDur, ease: 'power2.out' }
      )

      if (!isLast) {
        tl.to(wordEl, {
          opacity: 0,
          y: -16,
          duration: exitDur,
          ease: 'power2.in',
        })
      }
    })

    // Counter tween: explicit position 0 so it runs in parallel with the word
    // chain above, not appended after it.
    tl.to(
      counter,
      {
        val: 100,
        duration: totalDuration,
        ease: 'power1.inOut',
        onUpdate: () => {
          countEl.textContent = String(Math.floor(counter.val)).padStart(2, '0')
        },
      },
      0
    )

    tl.to(wrapper, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.35,
    })

    return () => {
      tl.kill()
      glowTween.kill()
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
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: 'min(60vw, 700px)',
          height: 'min(60vw, 700px)',
          borderRadius: '50%',
          background: `
            radial-gradient(
              circle,
              #C8FF57 0%,
              rgba(200,255,87,0.55) 10%,
              rgba(200,255,87,0.22) 30%,
              rgba(200,255,87,0.08) 50%,
              transparent 100%
            )
          `,
          filter: 'blur(20px)',
          opacity: 0.12,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', zIndex: 1 }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#c8ff57',
            flexShrink: 0,
            animation: 'preloaderDotPulse 1.2s ease-in-out infinite',
          }}
        />
        <div style={{ overflow: 'hidden' }}>
          <span
            ref={wordRef}
            style={{
              display: 'inline-block',
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#e8e6e0',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '40px',
          display: 'flex',
          alignItems: 'flex-start',
          fontFamily: 'JetBrains Mono, monospace',
          color: '#e8e6e0',
          lineHeight: 1,
        }}
      >
        <span ref={countRef} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600 }}>
          00
        </span>
        <span style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#C8FF57', marginTop: '4px' }}>
          %
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#C8FF57',
            animation: 'preloaderDotPulse 1.2s ease-in-out infinite',
          }}
        />
        Loading Experience
      </div>

      <style>{`
        @keyframes preloaderDotPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
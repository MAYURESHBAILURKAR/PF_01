import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAPReveal, useGSAPCounter } from '@/hooks/useGSAP'
import { useParallax } from '@/hooks/useGSAP'
import { PERSONAL, STATS } from '@/lib/data'
import img2 from '@/assets/img2.webp'
import Resume from '@/assets/Mayuresh_Bailurkar.pdf'

function StatCard({ num, suffix, label }) {
  const ref = useRef(null)
  useGSAPCounter(ref, num, suffix)
  return (
    <div
      className="p-6 md:p-7 border-r border-b transition-colors duration-300 group"
      style={{ borderColor: 'var(--border-color)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--card-bg)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <div
        ref={ref}
        className="font-display font-extrabold leading-none mb-1"
        style={{
          fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
          letterSpacing: '-0.03em',
          color: 'var(--accent)',
        }}
      >
        0
      </div>
      <div className="text-xs tracking-wider" style={{ color: 'var(--fg-muted)' }}>
        {label}
      </div>
    </div>
  )
}

export default function AboutPreviewSection() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  useGSAPReveal(sectionRef)
  useParallax(imageRef, -12) // subtle upward parallax on photo

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
      style={{ padding: 'var(--section-py) var(--section-px)' }}
    >
      {/* Left: Photo placeholder */}
      <div className="relative" ref={imageRef}>
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '3/4',
            maxHeight: '560px',
            background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--bg-2) 100%)',
            borderRadius: '2px',
          }}
        >
          {/* Placeholder icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <img
              src={img2}
              alt="Mayuresh Bailurkar"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
    linear-gradient(to top, var(--bg), transparent 60%),
    linear-gradient(to bottom, var(--bg), transparent 10%),
    linear-gradient(to left, var(--bg), transparent 10%),
    linear-gradient(to right, var(--bg), transparent 10%)
  `
              }}
            />
          </div>
        </div>

        {/* Badge */}
        <div
          className="absolute bottom-6 right-6 font-mono text-xs font-semibold tracking-wider uppercase rounded-full"
          style={{ padding: '8px 14px', background: 'var(--accent)', color: '#111' }}
        >
          Open to Work ✦
        </div>
      </div>

      {/* Right: Content */}
      <div>
        <p
          className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-5"
          style={{ color: 'var(--accent)' }}
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          About Me
        </p>

        <h2
          className="font-display font-extrabold leading-none mb-6"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
        >
          <span className="block overflow-hidden">
            <span className="reveal-inner block" style={{ transform: 'translateY(110%)' }}>Crafting digital</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-inner block italic" style={{ transform: 'translateY(110%)', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>experiences</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-inner block" style={{ transform: 'translateY(110%)' }}>that work.</span>
          </span>
        </h2>

        <p
          className="mb-10 text-sm md:text-base leading-relaxed"
          style={{ color: 'var(--fg-muted)', lineHeight: 1.8 }}
        >
          {PERSONAL.bio.split('Mayuresh Bailurkar').map((part, i) =>
            i === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <span key={i}>
                <span style={{ color: 'var(--fg)' }}>Mayuresh Bailurkar</span>
                {part}
              </span>
            )
          )}
        </p>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 border border-l-0 border-t-0 mb-8"
          style={{ borderColor: 'var(--border-color)' }}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <a
          href={Resume}
          download
          className="inline-flex items-center gap-2 border font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[var(--accent)] hover:text-[#111] hover:border-[var(--accent)]"
          style={{
            padding: '14px 28px',
            borderColor: 'var(--border-color)',
            color: 'var(--fg)',
            borderRadius: '2px',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 15V3m0 12l-4-4m4 4l4-4M3 21h18" />
          </svg>
          Download Resume
        </a>
      </div>
    </section>
  )
}

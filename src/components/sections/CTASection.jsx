import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSONAL } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Expanding top line
      gsap.fromTo('.cta-line', { width: '0%', opacity: 0 }, {
        width: '100%', opacity: 0.5, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      // Reveal lines
      gsap.to('.cta-reveal-inner', {
        translateY: '0%',
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.cta-reveal-inner', start: 'top 85%' },
      })
      // Fade up sub
      gsap.fromTo('.cta-sub', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-sub', start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="border-t text-center relative overflow-hidden"
      style={{
        borderColor: 'var(--border-color)',
        padding: 'clamp(80px, 12vw, 180px) clamp(20px, 4vw, 60px)',
      }}
    >
      {/* Expanding decorative line — scroll-triggered */}
      <div
        className="cta-line absolute top-0 left-0 h-px"
        style={{ background: 'var(--accent)', width: 0, opacity: 0.5 }}
      />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: '60vw',
          height: '40vw',
          background: 'radial-gradient(ellipse, rgba(200,255,87,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Section label */}
      <p
        className="font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 mb-8"
        style={{ color: 'var(--accent)' }}
      >
        <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
        Let's Connect
      </p>

      {/* Big heading */}
      <h2
        className="font-display font-extrabold leading-none mb-10"
        style={{ fontSize: 'clamp(3rem, 9vw, 10rem)', letterSpacing: '-0.04em' }}
      >
        {['Let\'s Build', 'Something', 'Great.'].map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span
              className="cta-reveal-inner block"
              style={{
                transform: 'translateY(110%)',
                color: i === 1 ? 'var(--accent)' : 'var(--fg)',
                fontStyle: i === 1 ? 'italic' : 'normal',
                fontFamily: i === 1 ? 'var(--font-serif)' : 'var(--font-display)',
                fontWeight: i === 1 ? 400 : 800,
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </h2>

      <p
        className="cta-sub text-base md:text-lg mx-auto mb-10 max-w-md"
        style={{ color: 'var(--fg-muted)', lineHeight: 1.7 }}
      >
        Have a project in mind? I'm available for freelance work and full-time opportunities.
      </p>

      <div className="cta-sub flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full font-bold text-base tracking-wider uppercase transition-all duration-200 hover:-translate-y-1"
          style={{ padding: '18px 40px', background: 'var(--accent)', color: '#111' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(200,255,87,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Start a Conversation ↗
        </Link>
      </div>

      <a
        href={`mailto:${PERSONAL.email}`}
        className="font-display font-bold inline-block border-b transition-colors duration-300"
        style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
          color: 'var(--fg-muted)',
          borderColor: 'var(--border-color)',
          paddingBottom: '2px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent)'
          e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--fg-muted)'
          e.currentTarget.style.borderColor = 'var(--border-color)'
        }}
      >
        {PERSONAL.email}
      </a>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUIStore } from '@/store'
import { PERSONAL } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

function NameMarquee() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Wait one frame so layout is complete, then measure
    const raf = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth
      const halfWidth = totalWidth / 2   // half = one full set of items

      // Infinite left-scroll using modifiers (seamless loop, no jank)
      tweenRef.current = gsap.to(track, {
        x: -halfWidth,
        duration: 24,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % halfWidth)
        }
      })

      // Slow on hover / resume on leave
      const section = sectionRef.current
      const slowDown = () => gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
      const speedUp = () => gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.in', overwrite: 'auto' })
      section.addEventListener('mouseenter', slowDown)
      section.addEventListener('mouseleave', speedUp)

      // Scroll-velocity skew for depth
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(track, {
            skewX: self.getVelocity() / -2500,
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        }
      })

      return () => {
        section.removeEventListener('mouseenter', slowDown)
        section.removeEventListener('mouseleave', speedUp)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      tweenRef.current?.kill()
    }
  }, [])

  // Render 6 copies — enough to fill any screen width with no gap
  const items = Array.from({ length: 6 })

  return (
    <div
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{
        borderColor: 'var(--border-color)',
        padding: 'clamp(10px,1.5vw,18px) 0',
        // background: 'var(--bg)',
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {items.map((_, i) => (
          <div
            key={i}
            className="inline-flex items-baseline flex-shrink-0 name-word-group "
            style={{ gap: 'clamp(24px,3vw,56px)', padding: '0 clamp(24px,3vw,56px)' }}
          >
            <span
              className="name-word font-display font-extrabold"
              style={{
                fontSize: 'clamp(3.5rem,9vw,10rem)',
                letterSpacing: '-.04em',
                lineHeight: 1,
                transition: 'color .3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
            >
              Mayuresh
            </span>

            <span
              className="name-word font-display font-extrabold"
              style={{
                fontSize: 'clamp(3.5rem,9vw,10rem)',
                letterSpacing: '-.04em',
                lineHeight: 1,
                transition: 'color .3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
            >
              Bailurkar
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(3rem,8vw,9rem)',
                color: 'var(--accent)',
                opacity: 0.65,
                lineHeight: 1,
                letterSpacing: '-.02em',
                fontWeight: 400,
              }}
            >
              —
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


export default function HeroSection() {
  const sectionRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const isPreloaderDone = useUIStore((s) => s.isPreloaderDone)
  const hasAnimated = useRef(false)

  function playHeroAnim() {
    if (hasAnimated.current || !sectionRef.current) return
    hasAnimated.current = true

    gsap.from('.name-marquee-outer', {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'power4.out',
    }, '-=0.5')

    gsap.to('.hero-line-inner', { y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.1 })
    gsap.to('.hero-eyebrow', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.6 })
    gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.7 })
    gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.8 })
    gsap.to('.scroll-indicator', { opacity: 1, duration: 0.5, delay: 1.2 })
  }

  // Trigger hero anim when preloader finishes
  useEffect(() => {
    if (!isPreloaderDone) return
    const t = setTimeout(playHeroAnim, 80)
    return () => clearTimeout(t)
  }, [isPreloaderDone])

  // Safety net fallback
  useEffect(() => {
    const fallback = setTimeout(playHeroAnim, 3500)
    return () => clearTimeout(fallback)
  }, [])

  // Parallax orbs on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, { yPercent: -15, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ padding: '0 clamp(20px, 4vw, 60px) clamp(40px, 6vw, 80px)' }}>
      {/* BG Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.4 }} />

      {/* Orbs */}
      <div ref={orb1Ref} className="absolute pointer-events-none rounded-full" style={{ width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', background: 'radial-gradient(circle, rgba(200,255,87,0.12) 0%, transparent 70%)', top: '10%', right: '-10%', animation: 'heroFloat 8s ease-in-out infinite' }} />
      <div ref={orb2Ref} className="absolute pointer-events-none rounded-full" style={{ width: 'clamp(200px,35vw,400px)', height: 'clamp(200px,35vw,400px)', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', bottom: '20%', left: '-5%', animation: 'heroFloat 11s ease-in-out infinite reverse' }} />

      {/* Eyebrow */}
      <p className="hero-eyebrow font-mono text-xs tracking-widest uppercase flex items-center gap-3 select-none" style={{ color: 'var(--accent)', opacity: 0, marginBottom: 'clamp(70px, 5vw, 96px)',paddingBottom: 'clamp(40px, 5vw, 96px)' }}>
        <span className="inline-block w-8 h-px" style={{ background: 'var(--accent)' }} />
        {PERSONAL.available ? 'Available for new opportunities' : 'Currently unavailable'}
      </p>

      {/* Headline */}
      <div className="name-marquee-outer">
        <NameMarquee />
      </div>
      <h1 className="select-none mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 9vw, 5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em' }}>
        <span className="block" style={{ overflow: 'hidden' }}>
          <span className="hero-line-inner block" style={{ transform: 'translateY(110%)', willChange: 'transform' }}>Software</span>
        </span>
        <span className="block" style={{ overflow: 'hidden' }}>
          <span className="hero-line-inner block" style={{ transform: 'translateY(110%)', willChange: 'transform' }}>
            <em style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>Developer.</em>&nbsp;
          </span>
        </span>
        {/* <span className="block" style={{ overflow: 'hidden' }}>
          <span className="hero-line-inner block" style={{ transform: 'translateY(110%)', willChange: 'transform' }}>Problem Solver.</span>
        </span> */}
      </h1>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <p className="hero-desc max-w-sm" style={{ color: 'var(--fg-muted)', fontSize: 'clamp(0.9rem,1.5vw,1.05rem)', lineHeight: 1.7, opacity: 0, transform: 'translateY(20px)' }}>
          Building <span style={{ color: 'var(--fg)' }}>scalable, elegant</span> digital products. Passionate about clean code, great UX, and pushing what's possible on the web.
        </p>
        <div className="hero-cta flex items-center gap-4 flex-wrap" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:-translate-y-[2px]" style={{ padding: '16px 32px', background: 'var(--accent)', color: '#111' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(200,255,87,0.35)' }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}>
            View Work
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17l10-10M17 17V7H7" /></svg>
          </Link>
          <Link to="/contact" className="inline-flex items-center rounded-full font-medium text-sm tracking-wider uppercase border transition-all duration-200 hover:-translate-y-[2px]" style={{ padding: '16px 32px', borderColor: 'var(--border-color)', color: 'var(--fg)' }}>
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute right-8 bottom-16 hidden sm:flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, var(--fg-muted), transparent)', animation: 'heroScrollLine 2s ease-in-out infinite' }} />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-muted)', writingMode: 'vertical-rl' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes heroScrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}

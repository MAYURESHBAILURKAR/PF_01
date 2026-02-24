import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSONAL, TIMELINE, STATS } from '@/lib/data'
import CTASection from '@/components/sections/CTASection'
import SkillsSection from '@/components/sections/SkillsSection'
import img2 from '@/assets/img2.webp'
import Resume from '@/assets/Mayuresh_Bailurkar.pdf'

gsap.registerPlugin(ScrollTrigger)

function TimelineItem({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="flex gap-6 md:gap-10 items-start">
      {/* Year */}
      <div className="flex-shrink-0 w-16 md:w-24">
        <span
          className="font-mono text-xs tracking-wider"
          style={{ color: 'var(--accent)' }}
        >
          {item.year}
        </span>
      </div>

      {/* Dot + Line */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0"
          style={{
            borderColor: 'var(--accent)',
            background: item.type === 'work' ? 'var(--accent)' : 'transparent',
          }}
        />
        <div className="w-px flex-1 mt-2" style={{ background: 'var(--border-color)', minHeight: '60px' }} />
      </div>

      {/* Content */}
      <div className="pb-10">
        <div
          className="font-mono text-xs tracking-wider uppercase mb-1"
          style={{ color: 'var(--fg-muted)' }}
        >
          {item.company} · {item.type === 'work' ? '💼' : '🎓'}
        </div>
        <h3
          className="font-display font-bold mb-2"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em' }}
        >
          {item.role}
        </h3>
        <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about-hero-line', {
        translateY: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.1, delay: 0.1,
      })
    }, headingRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <div
        ref={headingRef}
        className="border-b"
        style={{
          padding: 'clamp(120px, 15vw, 200px) var(--section-px) clamp(60px, 8vw, 100px)',
          borderColor: 'var(--border-color)',
        }}
      >
        <p
          className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-6"
          style={{ color: 'var(--accent)' }}
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          About Me
        </p>
        <h1
          className="font-display font-extrabold leading-none"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}
        >
          {['The', 'Developer', 'Behind the', 'Code.'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="about-hero-line block"
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
        </h1>
      </div>

      {/* Bio + Photo */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        style={{ padding: 'var(--section-py) var(--section-px)' }}
      >
        {/* Photo */}
        <div
          className="relative overflow-hidden"
          style={{
            borderColor: 'var(--border-color)',
            aspectRatio: '4/5',
            background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--bg-2) 100%)',
          }}
        >
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

        {/* Content */}
        <div>
          <p style={{ color: 'var(--fg-muted)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '40px' }}>
            {PERSONAL.bio}
          </p>
          <p style={{ color: 'var(--fg-muted)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '40px' }}>
            When I'm not coding, I'm exploring design systems, contributing to open source, reading about distributed systems, or experimenting with creative coding. I believe the best products are born when engineering and design think together.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 border-l border-t mb-8" style={{ borderColor: 'var(--border-color)' }}>
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-5 border-r border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="font-display font-extrabold leading-none mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'var(--accent)' }}>
                  {stat.num}{stat.suffix}
                </div>
                <div className="text-xs tracking-wider" style={{ color: 'var(--fg-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <a
            href={Resume}
            download
            className="inline-flex items-center gap-2 border font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[var(--accent)] hover:text-[#111] hover:border-[var(--accent)]"
            style={{ padding: '14px 28px', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M3 21h18" /></svg>
            Download Resume
          </a>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '0 var(--section-px) var(--section-py)' }}>
        <p className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-4" style={{ color: 'var(--accent)' }}>
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          Journey
        </p>
        <h2 className="font-display font-extrabold leading-none mb-16" style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}>
          Experience &amp; Education
        </h2>
        <div>
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      <SkillsSection />
      <CTASection />
    </>
  )
}

import { useEffect, useRef } from 'react'
import { SKILLS_ROW_1, SKILLS_ROW_2 } from '@/lib/data'
import { useGSAPReveal } from '@/hooks/useGSAP'
import gsap from 'gsap'

function SkillsRow({ skills, reverse = false }) {
  const doubled = [...skills, ...skills]
  return (
    <div className="overflow-hidden mb-4">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${reverse ? 'marqueeReverse' : 'marquee'} 25s linear infinite`,
        }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 border rounded-full whitespace-nowrap font-medium text-sm transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-none"
            style={{
              padding: '10px 18px',
              borderColor: 'var(--border-color)',
              color: 'var(--fg)',
            }}
          >
            <span className="text-base">{skill.icon}</span>
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  useGSAPReveal(ref)

    useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])


  return (
    <section
      ref={ref}
      style={{ paddingBottom: 'var(--section-py)', paddingTop: 0 }}
    >
      <div style={{ padding: '0 var(--section-px)' }}>
        {/* <p
          className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-4"
          style={{ color: 'var(--accent)' }}
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          Tech Stack
        </p> */}
        <h2
          className="font-display font-extrabold leading-none mb-12"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
        >
          <span className="block overflow-hidden">
            <span className="reveal-inner block" style={{ transform: 'translateY(110%)' }}>Tech</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-inner block italic" style={{ transform: 'translateY(110%)', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>Stack</span>
          </span>
        </h2>
      </div>

      <SkillsRow skills={SKILLS_ROW_1} />
      <SkillsRow skills={SKILLS_ROW_2} reverse />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

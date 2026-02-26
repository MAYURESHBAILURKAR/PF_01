import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { PROJECTS } from '@/lib/data'
import CTASection from '@/components/sections/CTASection'
import nexus from '@/assets/nexus/Nexus_1.png'
import mytheresa from '@/assets/mytheresa/mythersa_1.webp'

const images = [null, nexus, null, mytheresa]

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(null)
  const previewRef = useRef(null)
  const headingRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.projects-hero-line', {
        translateY: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.1, delay: 0.1,
      })
    }, headingRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!previewRef.current) return
      gsap.to(previewRef.current, {
        x: e.clientX + 24, y: e.clientY - 80, duration: 0.6, ease: 'power3.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Page hero */}
      <div
        ref={headingRef}
        className="border-b"
        style={{ padding: 'clamp(120px,15vw,200px) var(--section-px) clamp(60px,8vw,100px)', borderColor: 'var(--border-color)' }}
      >
        <p className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-6" style={{ color: 'var(--accent)' }}>
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          Portfolio
        </p>
        <h1 className="font-display font-extrabold leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}>
          {['Selected', 'Work &', 'Projects.'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="projects-hero-line block" style={{
                transform: 'translateY(110%)',
                color: i === 1 ? 'var(--accent)' : 'var(--fg)',
                fontStyle: i === 1 ? 'italic' : 'normal',
                fontFamily: i === 1 ? 'var(--font-serif)' : 'var(--font-display)',
                fontWeight: i === 1 ? 400 : 800,
              }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Cursor hover preview */}
      <div
        ref={previewRef}
        className="fixed pointer-events-none z-50 rounded overflow-hidden hidden lg:flex items-center justify-center border"
        style={{
          width: 'clamp(200px, 20vw, 300px)',
          aspectRatio: '16/10',
          opacity: activeProject ? 1 : 0,
          transform: activeProject ? 'scale(1)' : 'scale(0.88)',
          borderColor: activeProject ? activeProject.accentColor + '44' : 'transparent',
          background: '#141414',
          top: 0, left: 0,
          transition: 'opacity 0.25s, transform 0.25s, border-color 0.25s',
          willChange: 'transform',
        }}
      >

        {activeProject && (
          <>
            {images?.[activeProject.num - 1] ? (
              <img
                src={images[activeProject.num - 1]} // Dynamic source
                alt={activeProject.title || "Project Preview"}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="font-display font-extrabold text-3xl" style={{ color: activeProject.accentColor }}>
                  {activeProject.num}
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: activeProject.accentColor, opacity: 0.6 }}>
                  View Case Study →
                </span>
              </div>

            )}
          </>
        )}
      </div>

      {/* Projects list */}
      <section style={{ padding: 'var(--section-py) var(--section-px)' }}>
        <ul>
          {PROJECTS.map((project) => (
            <li
              key={project.id}
              className="border-t group cursor-none"
              style={{ borderColor: 'var(--border-color)' }}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div
                className="grid items-center gap-4 md:gap-12"
                style={{
                  gridTemplateColumns: 'auto 1fr auto',
                  padding: 'clamp(20px, 3vw, 36px) 0',
                  transition: 'padding-left 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '20px'
                  e.currentTarget.style.background = 'var(--card-bg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span className="font-mono text-xs tracking-wider min-w-[28px]" style={{ color: 'var(--fg-muted)' }}>
                  {project.num}
                </span>

                <div>
                  <span className="font-display font-bold leading-none block mb-1.5"
                    style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)', letterSpacing: '-0.02em' }}>
                    {project.title}
                  </span>
                  <span className="text-xs hidden md:block" style={{ color: 'var(--fg-muted)', maxWidth: '500px' }}>
                    {project.description.slice(0, 90)}…
                  </span>
                </div>

                <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-end">
                  <div className="hidden sm:flex gap-2 flex-wrap">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}
                        className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border whitespace-nowrap"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-lg transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: 'var(--fg-muted)' }}
                  >↗</span>
                </div>
              </div>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: 'var(--border-color)' }} />
        </ul>
      </section>

      <CTASection />
    </>
  )
}

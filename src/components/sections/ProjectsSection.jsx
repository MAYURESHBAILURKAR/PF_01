import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
        className="relative w-full max-w-2xl border overflow-hidden"
        style={{ background: 'var(--bg)', borderColor: 'var(--border-color)', borderRadius: '4px', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image placeholder */}
        <div
          className="w-full flex items-center justify-center border-b"
          style={{ height: '240px', background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <span className="font-display font-extrabold text-5xl" style={{ color: project.accentColor }}>
            {project.num}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 border rounded transition-colors duration-200 ml-4 flex-shrink-0"
              style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-muted)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)' }}
            >
              ✕
            </button>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded-full"
                style={{ borderColor: project.accentColor + '44', color: project.accentColor }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-200"
              style={{ padding: '12px 24px', background: 'var(--accent)', color: '#111' }}
            >
              Live Demo ↗
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border rounded-full font-medium text-sm tracking-wider uppercase transition-all duration-200"
              style={{ padding: '12px 24px', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection({ limit }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const previewRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS

  // Stagger project rows in
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-item',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.project-list',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Move preview with cursor
  useEffect(() => {
    const onMove = (e) => {
      if (!previewRef.current) return
      gsap.to(previewRef.current, {
        x: e.clientX + 24,
        y: e.clientY - 80,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        style={{ padding: 'var(--section-py) var(--section-px)' }}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <p
              className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-4"
              style={{ color: 'var(--accent)' }}
            >
              <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
              Selected Work
            </p>
            <h2
              className="font-display font-extrabold leading-none"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
            >
              <span className="block overflow-hidden">
                <span className="reveal-inner block" style={{ transform: 'translateY(110%)' }}>Recent</span>
              </span>
              <span className="block overflow-hidden">
                <span className="reveal-inner block italic" style={{ transform: 'translateY(110%)', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>Projects</span>
              </span>
            </h2>
          </div>
          {limit && (
            <Link
              to="/projects"
              className="inline-flex items-center rounded-full font-medium text-sm tracking-wider uppercase border transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                padding: '14px 28px',
                borderColor: 'var(--border-color)',
                color: 'var(--fg)',
              }}
            >
              View All ({PROJECTS.length}) →
            </Link>
          )}
        </div>

        {/* Hover preview (desktop only) */}
        <div
          ref={previewRef}
          className="fixed pointer-events-none z-50 rounded overflow-hidden hidden lg:flex items-center justify-center border transition-all duration-300"
          style={{
            width: 'clamp(200px, 20vw, 320px)',
            aspectRatio: '16/10',
            opacity: activeProject ? 1 : 0,
            transform: activeProject ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-3deg)',
            borderColor: activeProject ? activeProject.accentColor + '33' : 'transparent',
            background: '#141414',
            top: 0,
            left: 0,
            willChange: 'transform',
          }}
        >
          {activeProject && (
            <span
              className="font-display font-extrabold text-xl"
              style={{ color: activeProject.accentColor }}
            >
              {activeProject.num}
            </span>
          )}
        </div>

        {/* Project list */}
        <ul className="project-list">
          {projects.map((project) => (
            <li
              key={project.id}
              className="project-item border-t group"
              style={{ borderColor: 'var(--border-color)' }}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div
                className="grid items-center gap-4 md:gap-12 transition-all duration-300 group-hover:bg-[var(--card-bg)]"
                style={{
                  gridTemplateColumns: 'auto 1fr auto',
                  padding: 'clamp(20px, 3vw, 36px) 0',
                  paddingLeft: '0',
                  transition: 'padding-left 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '16px' }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0' }}
              >
                {/* Number */}
                <span
                  className="font-mono text-xs tracking-wider min-w-[28px]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {project.num}
                </span>

                {/* Name */}
                <span
                  className="font-display font-bold leading-none"
                  style={{
                    fontSize: 'clamp(1.3rem, 3vw, 2.4rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                </span>

                {/* Tags + arrow */}
                <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-end">
                  <div className="hidden sm:flex gap-2 flex-wrap">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border rounded-full whitespace-nowrap"
                        style={{
                          borderColor: 'var(--border-color)',
                          color: 'var(--fg-muted)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-lg transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: 'var(--fg-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            </li>
          ))}

          {/* Last border */}
          <li className="border-t" style={{ borderColor: 'var(--border-color)' }} />
        </ul>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

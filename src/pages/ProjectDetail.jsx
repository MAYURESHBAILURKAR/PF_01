import { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

// ─── Helpers ──────────────────────────────────────────────────
function BackArrow() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M19 12H5M5 12l7-7M5 12l7 7" />
    </svg>
  )
}

function ExternalArrow() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M7 17l10-10M17 17V7H7" />
    </svg>
  )
}

// ─── Sidebar stat block ───────────────────────────────────────
function StatBlock({ label, value, accent }) {
  return (
    <div className="border-b py-5" style={{ borderColor: 'var(--border-color)' }}>
      <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
        {label}
      </div>
      <div
        className="font-display font-bold text-sm leading-snug"
        style={{ color: accent ? 'var(--accent)' : 'var(--fg)' }}
      >
        {value}
      </div>
    </div>
  )
}

// ─── Feature card ─────────────────────────────────────────────
function FeatureCard({ icon, title, desc, accentColor, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: index * 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={ref}
      className="p-6 border transition-all duration-300 group"
      style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor + '55'
        e.currentTarget.style.background = accentColor + '06'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)'
        e.currentTarget.style.background = 'var(--card-bg)'
      }}
    >
      <div
        className="text-2xl mb-4 w-10 h-10 flex items-center justify-center border"
        style={{ borderColor: accentColor + '40', background: accentColor + '12' }}
      >
        {icon}
      </div>
      <h4 className="font-display font-bold text-base mb-2" style={{ letterSpacing: '-0.01em' }}>{title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{desc}</p>
    </div>
  )
}

// ─── Adjacent project nav ─────────────────────────────────────
function ProjectNav({ prev, next }) {
  return (
    <div className="grid grid-cols-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
      {prev ? (
        <Link
          to={`/projects/${prev.id}`}
          className="flex flex-col gap-2 p-8 md:p-12 border-r transition-all duration-300 group"
          style={{ borderColor: 'var(--border-color)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--card-bg)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-2" style={{ color: 'var(--fg-muted)' }}>
            <BackArrow /> Previous
          </span>
          <span className="font-display font-bold transition-colors duration-300 group-hover:text-[var(--accent)]"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.02em' }}>
            {prev.title}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          to={`/projects/${next.id}`}
          className="flex flex-col gap-2 p-8 md:p-12 text-right transition-all duration-300 group"
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--card-bg)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase flex items-center justify-end gap-2" style={{ color: 'var(--fg-muted)' }}>
            Next <ExternalArrow />
          </span>
          <span className="font-display font-bold transition-colors duration-300 group-hover:text-[var(--accent)]"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.02em' }}>
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  const project = PROJECTS.find((p) => String(p.id) === String(id))
  const currentIdx = PROJECTS.findIndex((p) => String(p.id) === String(id))
  const prevProject = currentIdx > 0 ? PROJECTS[currentIdx - 1] : null
  const nextProject = currentIdx < PROJECTS.length - 1 ? PROJECTS[currentIdx + 1] : null

  // Redirect if project not found
  useEffect(() => {
    if (!project) navigate('/projects', { replace: true })
  }, [project, navigate])

  // Hero title reveal animation
  useEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.to('.pd-num',   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to('.pd-line',  { y: 0, duration: 1.0, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
        .to('.pd-meta',  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '-=0.5')
        .to('.pd-ctas',  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.pd-divider', { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [project])

  if (!project) return null

  // Derive feature highlights from tags & description
  const features = buildFeatures(project)

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden"
        style={{ padding: 'clamp(110px,14vw,160px) var(--section-px) 0' }}
      >
        {/* Accent glow behind title */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '60vw', height: '60vw',
            background: `radial-gradient(circle, ${project.accentColor}14 0%, transparent 65%)`,
            top: '0', right: '-10%',
            filter: 'blur(40px)',
          }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '72px 72px', opacity: 0.3,
        }} />

        {/* Back link */}
        <Link
          to="/projects"
          className="absolute top-[84px] left-[--section-px] inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300"
          style={{ left: 'clamp(20px,4vw,60px)', color: 'var(--fg-muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
        >
          <BackArrow /> All Projects
        </Link>

        {/* Project number */}
        <div
          className="pd-num font-mono text-[10px] tracking-widest uppercase flex items-center gap-3 mb-6"
          style={{ color: project.accentColor, opacity: 0, transform: 'translateY(12px)' }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: project.accentColor }}
          />
          Project {project.num}
        </div>

        {/* Giant title */}
        <div ref={titleRef}>
          <h1
            className="font-display font-extrabold leading-none mb-10"
            style={{ fontSize: 'clamp(2.2rem,8vw,9rem)', letterSpacing: '-0.04em' }}
          >
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="block" style={{ overflow: 'hidden' }}>
                <span
                  className="pd-line block"
                  style={{
                    transform: 'translateY(110%)',
                    color: i % 3 === 1 ? project.accentColor : 'var(--fg)',
                    fontStyle: i % 3 === 1 ? 'italic' : 'normal',
                    fontFamily: i % 3 === 1 ? 'var(--font-serif)' : 'var(--font-display)',
                    fontWeight: i % 3 === 1 ? 400 : 800,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className="pd-meta font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border"
              style={{
                borderColor: i === 0 ? project.accentColor + '60' : 'var(--border-color)',
                color: i === 0 ? project.accentColor : 'var(--fg-muted)',
                opacity: 0, transform: 'translateY(10px)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="pd-ctas flex items-center gap-4 mb-12" style={{ opacity: 0, transform: 'translateY(16px)' }}>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:-translate-y-[2px]"
              style={{ padding: '14px 28px', background: project.accentColor, color: '#111' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px ${project.accentColor}44` }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
            >
              Live Demo <ExternalArrow />
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border rounded-full font-medium text-sm tracking-wider uppercase transition-all duration-200 hover:-translate-y-[2px]"
              style={{ padding: '14px 28px', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
            >
              GitHub <ExternalArrow />
            </a>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-medium text-sm tracking-wider uppercase transition-colors duration-300"
            style={{ color: 'var(--fg-muted)', paddingLeft: '4px' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            Discuss Project →
          </Link>
        </div>

        {/* Bottom divider line that scales in */}
        <div
          className="pd-divider h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}60, var(--border-color) 60%)`,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />
      </section>

      {/* ─── HORIZONTAL GALLERY (images) or nothing ──────── */}
      <HorizontalGallery project={project} />

      {/* ─── MAIN CONTENT ────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) var(--section-px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-20 items-start">

          {/* Left: Description + features */}
          <div>
            {/* Show mockup only when there are no real images */}
            {(!project.images || project.images.length === 0) && (
              <ProjectMockup project={project} />
            )}

            {/* Description */}
            <div className="mt-12 mb-10">
              <p
                className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 mb-4"
                style={{ color: project.accentColor }}
              >
                <span className="inline-block w-5 h-px" style={{ background: project.accentColor }} />
                Overview
              </p>
              <p
                className="leading-relaxed"
                style={{
                  color: 'var(--fg-muted)',
                  fontSize: 'clamp(1rem,1.6vw,1.15rem)',
                  lineHeight: 1.85,
                  maxWidth: '620px',
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Feature highlights grid */}
            <div className="mb-4">
              <p
                className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 mb-6"
                style={{ color: project.accentColor }}
              >
                <span className="inline-block w-5 h-px" style={{ background: project.accentColor }} />
                Key Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, i) => (
                  <FeatureCard key={i} {...feat} accentColor={project.accentColor} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="lg:sticky lg:top-28">
            <div className="border" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
              {/* Accent top bar */}
              <div className="h-[3px] w-full" style={{ background: project.accentColor }} />

              <div className="p-6">
                <StatBlock label="Project" value={project.title} />
                <StatBlock label="Category" value={getCategory(project)} />
                <StatBlock label="Tech Stack" value={project.tags.join(', ')} />
                <StatBlock label="Status" value={project.live && project.live !== '#' ? 'Live & Deployed' : 'In Development'} accent={project.live && project.live !== '#'} />

                {/* Links */}
                <div className="pt-5 flex flex-col gap-3">
                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-sm font-medium border px-4 py-3 transition-all duration-200 group"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = project.accentColor
                        e.currentTarget.style.color = project.accentColor
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)'
                        e.currentTarget.style.color = 'var(--fg)'
                      }}
                    >
                      View Live Site
                      <ExternalArrow />
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between text-sm font-medium border px-4 py-3 transition-all duration-200"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--fg-muted)'
                        e.currentTarget.style.color = 'var(--fg)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)'
                        e.currentTarget.style.color = 'var(--fg-muted)'
                      }}
                    >
                      Source Code
                      <ExternalArrow />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* All projects quick nav */}
            <div className="mt-6 border" style={{ borderColor: 'var(--border-color)' }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg-muted)' }}>
                  All Projects
                </span>
              </div>
              <ul>
                {PROJECTS.map((p) => (
                  <li key={p.id} className="border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}>
                    <Link
                      to={`/projects/${p.id}`}
                      className="flex items-center justify-between px-6 py-3 text-sm transition-all duration-200 group"
                      style={{
                        color: String(p.id) === String(id) ? project.accentColor : 'var(--fg-muted)',
                        background: String(p.id) === String(id) ? project.accentColor + '10' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (String(p.id) !== String(id)) {
                          e.currentTarget.style.color = 'var(--fg)'
                          e.currentTarget.style.background = 'var(--card-bg)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (String(p.id) !== String(id)) {
                          e.currentTarget.style.color = 'var(--fg-muted)'
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[10px]" style={{ color: 'inherit', opacity: 0.6 }}>{p.num}</span>
                        <span className="font-medium truncate max-w-[160px]">{p.title}</span>
                      </span>
                      {String(p.id) === String(id) && (
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── TECH DEEP DIVE ──────────────────────────────── */}
      <TechSection project={project} />

      {/* ─── PREV / NEXT NAV ─────────────────────────────── */}
      <ProjectNav prev={prevProject} next={nextProject} />
    </div>
  )
}

// ─── Horizontal Scroll Gallery ────────────────────────────────
// Pins the section while the inner track scrolls horizontally.
// Falls back to ProjectMockup when project.images is empty/absent.
function HorizontalGallery({ project }) {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const hasImages  = project.images && project.images.length > 0

  useEffect(() => {
    if (!hasImages) return
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    // How far to scroll: full track width minus one viewport width
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      // Pin + horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     () => `+=${Math.abs(getScrollAmount()) + window.innerWidth * 0.5}`,
          scrub:   1,
          pin:     true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track, {
        x: () => getScrollAmount(),
        ease: 'none',
      })

      // Each card fades + rises as it enters the viewport-equivalent zone
      const cards = track.querySelectorAll('.gallery-card')
      cards.forEach((card, i) => {
        if (i === 0) return // first card is already visible
        gsap.fromTo(card,
          { opacity: 0.3, scale: 0.93 },
          {
            opacity: 1, scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 85%',
              end:   'left 40%',
              scrub: true,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [hasImages, project.images])

  // ── Fallback: no images — skip gallery, render nothing (ProjectMockup handles it)
  if (!hasImages) return null

  const SLIDE_W = 'min(78vw, 960px)'

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', background: 'var(--bg)' }}
    >
      {/* Sticky header label */}
      <div
        className="absolute top-8 left-0 right-0 z-10 flex items-center justify-between pointer-events-none"
        style={{ padding: '0 clamp(20px,4vw,60px)' }}
      >
        <p
          className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-2"
          style={{ color: project.accentColor }}
        >
          <span className="inline-block w-5 h-px" style={{ background: project.accentColor }} />
          Gallery — {project.images.length} Screens
        </p>
        {/* Scroll hint */}
        <p
          className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-2"
          style={{ color: 'var(--fg-muted)', opacity: 0.6 }}
        >
          Scroll to explore
          <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
            <path d="M1 5h22M17 1l5 4-5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex items-center"
        style={{
          height: '100%',
          gap: 'clamp(16px,2.5vw,28px)',
          padding: '0 clamp(20px,5vw,72px)',
          willChange: 'transform',
        }}
      >
        {project.images.map((img, i) => (
          <div
            key={i}
            className="gallery-card flex-shrink-0 relative overflow-hidden border"
            style={{
              width: SLIDE_W,
              height: 'clamp(340px,58vh,640px)',
              borderColor: i === 0 ? project.accentColor + '55' : 'var(--border-color)',
              background: 'var(--card-bg)',
              transition: 'border-color .3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.accentColor + '80' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = i === 0 ? project.accentColor + '55' : 'var(--border-color)' }}
          >
            {/* Browser chrome bar */}
            <div
              className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-4"
              style={{ height: 36, background: 'rgba(0,0,0,0.35)', borderBottom: `1px solid ${project.accentColor}20` }}
            >
              <div className="flex gap-1.5">
                {['#ff5f57','#ffbd2e','#28ca41'].map((c, j) => (
                  <span key={j} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
              <div
                className="flex-1 mx-3 rounded font-mono text-[9px] flex items-center px-3 truncate"
                style={{ height: 19, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.28)' }}
              >
                {project.live && project.live !== '#'
                  ? project.live.replace('https://', '')
                  : `${project.title.toLowerCase().replace(/\s+/g, '-')}.app`}
              </div>
              {/* Slide counter */}
              <span className="font-mono text-[9px] tabular-nums flex-shrink-0" style={{ color: project.accentColor + '80' }}>
                {String(i + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
              </span>
            </div>

            {/* The actual image */}
            <img
              src={img}
              alt={`${project.title} screenshot ${i + 1}`}
              className="absolute inset-0 top-9 w-full object-cover object-top"
              style={{ height: 'calc(100% - 36px)' }}
              loading="lazy"
            />

            {/* Subtle accent gradient overlay on first card */}
            {i === 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}12 0%, transparent 50%)`,
                }}
              />
            )}
          </div>
        ))}

        {/* End-cap spacer with project num watermark */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width: 'clamp(120px,16vw,200px)', height: 'clamp(340px,58vh,640px)' }}
        >
          <span
            className="font-display font-extrabold select-none"
            style={{
              fontSize: 'clamp(4rem,10vw,9rem)',
              color: project.accentColor,
              opacity: 0.06,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {project.num}
          </span>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <GalleryProgress sectionRef={sectionRef} accentColor={project.accentColor} />
    </section>
  )
}

// Thin progress bar that fills as gallery scrolls
function GalleryProgress({ sectionRef, accentColor }) {
  const barRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !barRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{ height: 2, background: 'var(--border-color)' }}
    >
      <div
        ref={barRef}
        className="absolute inset-0 origin-left"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }}
      />
    </div>
  )
}

// ─── Project mockup / visual ──────────────────────────────────
function ProjectMockup({ project }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, scale: 0.97, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.5,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border"
      style={{
        aspectRatio: '16/9',
        background: `linear-gradient(135deg, ${project.accentColor}10 0%, var(--card-bg) 50%, var(--bg-2) 100%)`,
        borderColor: project.accentColor + '30',
      }}
    >
      {/* Browser chrome */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4"
        style={{ height: '36px', background: 'rgba(0,0,0,0.3)', borderBottom: `1px solid ${project.accentColor}20` }}
      >
        <div className="flex gap-1.5">
          {['#ff5f57', '#ffbd2e', '#28ca41'].map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div
          className="flex-1 mx-4 rounded font-mono text-[10px] flex items-center px-3"
          style={{ height: '20px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
        >
          {project.live && project.live !== '#' ? project.live.replace('https://', '') : `${project.title.toLowerCase().replace(/\s+/g, '-')}.app`}
        </div>
      </div>

      {/* Content area */}
      <div className="absolute inset-0 top-9 flex items-center justify-center">
        {/* Abstract code lines visual */}
        <div className="absolute inset-0 flex flex-col justify-center p-8 opacity-20"
          style={{ gap: '10px' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span className="font-mono text-[10px]" style={{ color: project.accentColor, minWidth: '20px' }}>{String(i + 1).padStart(2, '0')}</span>
              <div
                className="h-[2px] rounded"
                style={{
                  width: `${30 + Math.sin(i * 1.7) * 25 + Math.cos(i) * 20}%`,
                  background: i % 3 === 0 ? project.accentColor : 'var(--fg)',
                  opacity: i % 3 === 0 ? 0.8 : 0.4,
                }}
              />
            </div>
          ))}
        </div>

        {/* Central label */}
        <div className="relative z-10 text-center">
          <div
            className="font-display font-extrabold mb-3"
            style={{ fontSize: 'clamp(3rem,8vw,6rem)', color: project.accentColor, opacity: 0.15, letterSpacing: '-0.04em', lineHeight: 1 }}
          >
            {project.num}
          </div>
          <div
            className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 border"
            style={{ borderColor: project.accentColor + '40', color: project.accentColor }}
          >
            {project.images?.length > 0 ? 'Project Preview' : 'Screenshots Coming Soon'}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Tech deep dive section ───────────────────────────────────
function TechSection({ project }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-chip',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="border-t"
      style={{ borderColor: 'var(--border-color)', padding: 'clamp(50px,7vw,90px) var(--section-px)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 mb-4"
            style={{ color: project.accentColor }}>
            <span className="inline-block w-5 h-px" style={{ background: project.accentColor }} />
            Tech Stack
          </p>
          <h2 className="font-display font-extrabold leading-none mb-6"
            style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.03em' }}>
            Built with <em style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: project.accentColor, fontWeight: 400 }}>precision.</em>
          </h2>
          <p className="leading-relaxed" style={{ color: 'var(--fg-muted)', maxWidth: '400px', lineHeight: 1.8 }}>
            Every technology in this stack was chosen deliberately — optimized for performance, scalability, and developer experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 content-start">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className="tech-chip inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-xs font-medium tracking-wider uppercase transition-all duration-200"
              style={{ borderColor: 'var(--border-color)', color: 'var(--fg)', background: 'var(--card-bg)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.accentColor
                e.currentTarget.style.color = project.accentColor
                e.currentTarget.style.background = project.accentColor + '10'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)'
                e.currentTarget.style.color = 'var(--fg)'
                e.currentTarget.style.background = 'var(--card-bg)'
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: project.accentColor }}
              />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Helpers ──────────────────────────────────────────────────
function getCategory(project) {
  const tags = project.tags.map(t => t.toLowerCase())
  if (tags.some(t => t.includes('react native') || t.includes('expo') || t.includes('ionic'))) return 'Mobile Application'
  if (tags.some(t => t.includes('microservice') || t.includes('docker'))) return 'Microservices / Backend'
  if (tags.some(t => t.includes('react') || t.includes('angular') || t.includes('next'))) return 'Web Application'
  return 'Full-Stack Application'
}

function buildFeatures(project) {
  // Smart feature extraction from tags and description
  const desc = project.description.toLowerCase()
  const tags = project.tags

  const all = [
    { icon: '🔐', title: 'Authentication', desc: 'Secure JWT-based authentication with role-based access control.', keywords: ['jwt', 'auth', 'rbac', 'role', 'biometric'] },
    { icon: '📡', title: 'REST API', desc: 'Clean, versioned RESTful API endpoints with proper error handling.', keywords: ['api', 'rest', 'express', 'node'] },
    { icon: '🐳', title: 'Containerized', desc: 'Docker-based deployment for consistent environments across dev and prod.', keywords: ['docker', 'container', 'microservice'] },
    { icon: '🤖', title: 'AI Powered', desc: 'Integrated AI capabilities using modern ML APIs and models.', keywords: ['ai', 'gemini', 'openai', 'ml', 'gpt'] },
    { icon: '📱', title: 'Cross-Platform', desc: 'Runs natively on iOS and Android from a single codebase.', keywords: ['react native', 'expo', 'ionic', 'mobile', 'cross-platform'] },
    { icon: '⚡', title: 'Optimized', desc: 'Performance-tuned with lazy loading, caching, and optimized queries.', keywords: ['performance', 'optimiz', 'responsiveness', 'speed'] },
    { icon: '🗄️', title: 'Database', desc: 'Robust data modeling with efficient indexing and query optimization.', keywords: ['mongodb', 'postgres', 'mysql', 'database'] },
    { icon: '💳', title: 'Payments', desc: 'Secure payment processing with Stripe integration.', keywords: ['stripe', 'payment', 'billing'] },
    { icon: '📦', title: 'State Management', desc: 'Predictable state management using Redux for complex data flows.', keywords: ['redux', 'state', 'zustand', 'context'] },
    { icon: '🔔', title: 'Real-time', desc: 'Live notifications and updates using WebSockets or polling.', keywords: ['realtime', 'socket', 'websocket', 'live', 'whatsapp'] },
    { icon: '🏗️', title: 'Microservices', desc: 'Decoupled service architecture with API gateway for scalability.', keywords: ['microservice', 'gateway', 'service'] },
    { icon: '📊', title: 'Analytics', desc: 'Built-in reporting and analytics for business insights.', keywords: ['analytic', 'report', 'dashboard', 'segment', 'loyalty'] },
  ]

  const matched = all.filter(f =>
    f.keywords.some(kw =>
      desc.includes(kw) || tags.some(t => t.toLowerCase().includes(kw))
    )
  )

  // Always return 4 features
  return matched.slice(0, 4).length >= 4 ? matched.slice(0, 4)
    : [...matched, ...all.filter(f => !matched.includes(f))].slice(0, 4)
}

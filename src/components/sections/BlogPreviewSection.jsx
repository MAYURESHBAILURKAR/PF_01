import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blogApi } from '@/lib/api'
import { formatDate, readingTime } from '@/lib/utils'
import { motion } from 'framer-motion'
import LoadingScreen, { useLoading } from '@/components/animations/LoadingScreen'
import { SAMPLE_POSTS } from '../../lib/data'
gsap.registerPlugin(ScrollTrigger)


function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="border-r border-b p-6 md:p-10 transition-colors duration-300 group"
      style={{ borderColor: 'var(--border-color)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--card-bg)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <div
        className="font-mono text-xs tracking-wider uppercase mb-5"
        style={{ color: 'var(--fg-muted)' }}
      >
        {formatDate(post.date)} · {readingTime(post.content)}
      </div>

      <h3
        className="font-display font-bold leading-snug mb-4 group-hover:text-[var(--accent)] transition-colors duration-300"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.02em' }}
      >
        {post.title}
      </h3>

      <p
        className="text-sm leading-relaxed mb-6 line-clamp-3"
        style={{ color: 'var(--fg-muted)' }}
      >
        {post.content.substring(0, 140)}...
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border rounded-full"
            style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1.5 font-bold text-xs tracking-wider uppercase transition-all duration-200 group-hover:gap-3"
        style={{ color: 'var(--accent)' }}
      >
        Read More ↗
      </Link>
    </motion.article>
  )
}

export default function BlogPreviewSection({ limit = 3 }) {
  const [posts, setPosts] = useState(SAMPLE_POSTS.slice(0, limit))
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    blogApi.getAll({ limit, sort: '-date' })
      .then((res) => {
        setPosts(res.data.blogs.slice(0, limit))
        setIsLoading(false)
      })
      .catch(() => {
        setPosts(SAMPLE_POSTS.slice(0, limit))
        setIsLoading(false)
      })
  }, [limit])

  // Stagger blog cards in
  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [posts])

  return (
    <section ref={sectionRef} style={{ padding: 'var(--section-py) var(--section-px)' }}>
      {/* Header */}
      <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
        <div>
          <p
            className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-4"
            style={{ color: 'var(--accent)' }}
          >
            <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
            From the Blog
          </p>
          <h2
            className="font-display font-extrabold leading-none"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            <span className="block overflow-hidden">
              <span className="reveal-inner block" style={{ transform: 'translateY(110%)' }}>Latest</span>
            </span>
            <span className="block overflow-hidden">
              <span className="reveal-inner block italic" style={{ transform: 'translateY(110%)', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>Writings</span>
            </span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center rounded-full font-medium text-sm tracking-wider uppercase border transition-all duration-200 hover:-translate-y-[2px]"
          style={{ padding: '14px 28px', borderColor: 'var(--border-color)', color: 'var(--fg)' }}
        >
          All Posts →
        </Link>
      </div>

      {/* Grid */}

      {
        isLoading ? (
          <div style={{ position: 'relative' }}>
            {/* <ProjectsGrid /> */}
            <LoadingScreen isLoading={isLoading} variant="overlay" />
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {posts.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )
      }


    </section>
  )
}

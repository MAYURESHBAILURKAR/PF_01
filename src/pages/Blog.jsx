import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogApi } from '@/lib/api'
import { formatDate, readingTime } from '@/lib/utils'
import LoadingScreen, { useLoading } from '@/components/animations/LoadingScreen'
import { SAMPLE_POSTS } from '../lib/data'

// const SAMPLE_POSTS = [
//   { _id: '1', slug: 'building-performant-react-apps', title: 'Building Performant React Apps with GSAP Animations', content: 'A deep dive into integrating GSAP with React without the common pitfalls that kill performance and cause memory leaks in your application...', tags: ['React', 'GSAP', 'Performance'], date: '2025-02-15' },
//   { _id: '2', slug: 'mongodb-schema-design-patterns', title: 'MongoDB Schema Design Patterns for Scale', content: 'The patterns that separate a MongoDB setup that breaks at 10k users from one that handles millions without breaking a sweat...', tags: ['MongoDB', 'Database'], date: '2025-01-20' },
//   { _id: '3', slug: 'developer-should-learn-design', title: 'Why Every Developer Should Learn Basic Design', content: 'Understanding design fundamentals doesn\'t make you a designer — it makes you a significantly better engineer...', tags: ['Design', 'Career'], date: '2024-12-10' },
//   { _id: '4', slug: 'nodejs-microservices-patterns', title: 'Node.js Microservices: Patterns That Actually Work', content: 'Real-world microservices patterns from production systems — event sourcing, sagas, circuit breakers, and more...', tags: ['Node.js', 'Architecture'], date: '2024-11-05' },
// ]

export default function BlogPage() {
  const [posts, setPosts] = useState(SAMPLE_POSTS)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    blogApi.getAll().then((res) => {
      setPosts(res.data?.blogs || SAMPLE_POSTS)
      setIsLoading(false)
    })
      .catch(() => {
        setPosts(SAMPLE_POSTS)
        setIsLoading(false)
      })
  }, [])

  const filtered = (posts || []).filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />
  }

  return (
    <>
      {/* Header */}
      <div
        className="border-b"
        style={{ padding: 'clamp(120px,15vw,200px) var(--section-px) clamp(60px,8vw,100px)', borderColor: 'var(--border-color)' }}
      >
        <p className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-6" style={{ color: 'var(--accent)' }}>
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          Blog
        </p>
        <h1 className="font-display font-extrabold leading-none mb-8" style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}>
          <span className="block">Thoughts &</span>
          <span className="block italic" style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>Writings.</span>
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md font-body bg-transparent border-b py-3 text-base outline-none"
          style={{ borderColor: 'var(--border-color)', color: 'var(--fg)' }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)' }}
        />
      </div>

      {/* Posts */}
      <section style={{ padding: 'var(--section-py) var(--section-px)' }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--fg-muted)' }}>No posts found matching "{search}".</p>
        ) : (
          <div className="space-y-0">
            {filtered.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="border-t group py-8 md:py-10"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <Link to={`/blog/${post.slug}`} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                  <div>
                    <div className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: 'var(--fg-muted)' }}>
                      {formatDate(post.date)} · {readingTime(post.content)}
                    </div>
                    <h2
                      className="font-display font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]"
                      style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
                      {post.content.substring(0, 160)}...
                    </p>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border rounded-full" style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="text-2xl transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 self-start mt-1 hidden md:block"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    ↗
                  </span>
                </Link>
              </motion.article>
            ))}
            <div className="border-t" style={{ borderColor: 'var(--border-color)' }} />
          </div>
        )}
      </section>
    </>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { blogApi } from '@/lib/api'
import { formatDate, readingTime } from '@/lib/utils'
import { SAMPLE_POSTS } from '../lib/data'


export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
    setLoading(true)
    
    blogApi.getOne(slug)
      .then((res) => { 
        const fetchedPost = res?.data || SAMPLE_POSTS.find((el) => el.slug === slug);
        setPost(fetchedPost || null);
        setLoading(false);
      })
      .catch(() => { 
        const fallbackPost = SAMPLE_POSTS.find((el) => el.slug === slug);
        setPost(fallbackPost || null); 
        setLoading(false);
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--fg-muted)', animation: 'pulse 1s ease-in-out infinite' }}>
          Loading...
        </div>
      </div>
    )
  }

 if (!post) {
    return <div className="text-center py-20">Post not found.</div>
  }

  return (
    <article>
      {/* Header */}
      <div
        className="border-b"
        style={{ padding: 'clamp(120px,15vw,180px) var(--section-px) clamp(40px,6vw,80px)', borderColor: 'var(--border-color)' }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-8 transition-colors duration-300"
          style={{ color: 'var(--fg-muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
        >
          ← All Posts
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded-full" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              {tag}
            </span>
          ))}
        </div>

        <h1
          className="font-display font-extrabold leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.03em', maxWidth: '900px' }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--fg-muted)' }}>
            By {post.author || 'Mayuresh Bailurkar'}
          </span>
          <span style={{ color: 'var(--border-color)' }}>·</span>
          <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--fg-muted)' }}>
            {formatDate(post.date)}
          </span>
          <span style={{ color: 'var(--border-color)' }}>·</span>
          <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--fg-muted)' }}>
            {readingTime(post.content)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="prose-custom mx-auto"
        style={{
          maxWidth: '740px',
          padding: 'clamp(40px,8vw,80px) var(--section-px)',
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem',
                    margin: '1.5rem 0',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85em',
                    background: 'var(--card-bg)',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    border: '1px solid var(--border-color)',
                  }}
                  {...props}
                >
                  {children}
                </code>
              )
            },
            h1: ({ children }) => <h1 className="font-display font-extrabold mb-6 mt-12" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>{children}</h1>,
            h2: ({ children }) => <h2 className="font-display font-bold mb-4 mt-10" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>{children}</h2>,
            h3: ({ children }) => <h3 className="font-display font-bold mb-3 mt-8" style={{ fontSize: '1.3rem' }}>{children}</h3>,
            p: ({ children }) => <p className="mb-5 leading-relaxed" style={{ color: 'var(--fg-muted)', lineHeight: 1.85 }}>{children}</p>,
            ul: ({ children }) => <ul className="mb-5 pl-5 space-y-2" style={{ color: 'var(--fg-muted)', listStyle: 'disc' }}>{children}</ul>,
            ol: ({ children }) => <ol className="mb-5 pl-5 space-y-2" style={{ color: 'var(--fg-muted)', listStyle: 'decimal' }}>{children}</ol>,
            blockquote: ({ children }) => (
              <blockquote
                className="my-6 pl-5 italic"
                style={{
                  borderLeft: '3px solid var(--accent)',
                  color: 'var(--fg-muted)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                }}
              >
                {children}
              </blockquote>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>

        {/* Share */}
        <div className="border-t mt-16 pt-8 flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--fg-muted)' }}>Share this post</span>
          <div className="flex gap-3">
            {['Twitter', 'LinkedIn', 'Copy Link'].map((s) => (
              <button
                key={s}
                className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 border rounded-full transition-all duration-300"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--fg-muted)' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-bold text-sm tracking-wider uppercase transition-colors duration-300"
            style={{ color: 'var(--fg-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}

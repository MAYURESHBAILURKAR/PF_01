import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MarkdownRenderer({ content }) {
  if (!content) return null

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          const isBlock = match || String(children).includes('\n')

          return !inline && isBlock ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match ? match[1] : 'text'}
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
      {content}
    </ReactMarkdown>
  )
}
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAPFadeUp } from '@/hooks/useGSAP'
import { PERSONAL } from '@/lib/data'

export default function Footer() {
  const ref = useRef(null)
  useGSAPFadeUp(ref)

  const year = new Date().getFullYear()

  return (
    <footer
      ref={ref}
      className="border-t"
      style={{
        background: 'var(--bg-2)',
        borderColor: 'var(--border-color)',
        padding: '40px clamp(20px, 4vw, 60px)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        {/* Copyright */}
        <p
          className="font-mono text-xs tracking-wide text-center md:text-left"
          style={{ color: 'var(--fg-muted)' }}
        >
          © {year} {PERSONAL.name}
        </p>

        {/* Logo */}
        <div className="text-center font-display font-extrabold text-xl tracking-snug">
          MB<span style={{ color: 'var(--accent)' }}>.</span>
        </div>

        {/* Links */}
        <nav className="flex items-center justify-center md:justify-end gap-6 flex-wrap">
          {[
            { label: 'GitHub', href: PERSONAL.social.github },
            { label: 'LinkedIn', href: PERSONAL.social.linkedin },
            { label: 'Twitter', href: PERSONAL.social.twitter },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="text-xs tracking-widest uppercase font-medium transition-colors duration-300"
              style={{ color: 'var(--fg-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore, useUIStore } from '@/store'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  const location = useLocation()
  const isPreloaderDone = useUIStore((s) => s.isPreloaderDone)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isPreloaderDone ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[72px]"
        style={{
          padding: '0 clamp(20px, 4vw, 60px)',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          background: scrolled
            ? theme === 'dark'
              ? 'rgba(8,8,8,0.85)'
              : 'rgba(242,240,234,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'border-color 0.4s, background 0.4s, backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg tracking-snug select-none">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite' }}
          />
          MB
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-xs tracking-widest uppercase font-medium relative group"
                  style={{ color: isActive ? 'var(--fg)' : 'var(--fg-muted)' }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-[-2px] left-0 h-[1px] transition-all duration-300 ease-out"
                    style={{
                      background: 'var(--accent)',
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                  <span
                    className="absolute bottom-[-2px] left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                    style={{ background: 'var(--accent)' }}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-11 h-6 rounded-full border transition-colors duration-300"
            style={{
              background: 'var(--border-color)',
              borderColor: 'var(--border-color)',
            }}
          >
            <span
              className="absolute w-[18px] h-[18px] rounded-full top-[2px] left-[2px] transition-transform duration-300"
              style={{
                background: 'var(--accent)',
                transform: theme === 'light' ? 'translateX(20px)' : 'translateX(0)',
              }}
            />
          </button>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              background: 'var(--accent)',
              color: '#111',
              boxShadow: '0 0 0 0 rgba(200,255,87,0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,255,87,0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 0 rgba(200,255,87,0)'
            }}
          >
            Let's Talk
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1 z-[200]"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                background: 'var(--fg)',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                background: 'var(--fg)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-all duration-300"
              style={{
                background: 'var(--fg)',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] flex flex-col justify-center"
            style={{
              background: 'var(--bg)',
              padding: '60px clamp(24px, 6vw, 80px)',
            }}
          >
            <ul>
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="border-b"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <Link
                    to={link.href}
                    className="block py-6 font-display font-extrabold tracking-snug transition-all duration-300 hover:pl-4"
                    style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex gap-6 mt-12"
            >
              {['GitHub', 'LinkedIn', 'Twitter'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs tracking-widest uppercase font-medium transition-colors duration-300"
                  style={{ color: 'var(--fg-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}
                >
                  {s}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { contactApi } from '@/lib/api'
import { PERSONAL } from '@/lib/data'

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const headingRef = useRef(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.contact-hero-line', {
        translateY: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.1, delay: 0.1,
      })
    }, headingRef)
    return () => ctx.revert()
  }, [])

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await contactApi.send(data)
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border-color)',
    padding: '16px 0',
    color: 'var(--fg)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <>
      {/* Hero */}
      <div
        ref={headingRef}
        className="border-b"
        style={{ padding: 'clamp(120px,15vw,200px) var(--section-px) clamp(60px,8vw,100px)', borderColor: 'var(--border-color)' }}
      >
        <p className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-6" style={{ color: 'var(--accent)' }}>
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          Get in Touch
        </p>
        <h1 className="font-display font-extrabold leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}>
          {["Let's", 'Work', 'Together.'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="contact-hero-line block"
                style={{
                  transform: 'translateY(110%)',
                  color: i === 1 ? 'var(--accent)' : 'var(--fg)',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  fontFamily: i === 1 ? 'var(--font-serif)' : 'var(--font-display)',
                  fontWeight: i === 1 ? 400 : 800,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Content */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        style={{ padding: 'var(--section-py) var(--section-px)' }}
      >
        {/* Left: Info */}
        <div>
          <p className="text-base leading-relaxed mb-12" style={{ color: 'var(--fg-muted)', maxWidth: '400px' }}>
            Have a project in mind or want to explore a collaboration? I'd love to hear from you. Fill out the form or reach out directly.
          </p>

          <div className="space-y-8">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>Email</div>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="font-display font-bold text-xl transition-colors duration-300"
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)' }}
              >
                {PERSONAL.email}
              </a>
            </div>
            <div>
              <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>Location</div>
              <p className="font-display font-bold text-xl">{PERSONAL.location}</p>
            </div>
            <div>
              <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--fg-muted)' }}>Socials</div>
              <div className="flex gap-4 flex-wrap">
                {Object.entries(PERSONAL.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs tracking-wider uppercase px-4 py-2 border rounded-full transition-all duration-300 capitalize"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.color = 'var(--fg-muted)'
                    }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-8">
              {/* Name */}
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>
                  Your Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="John Doe"
                  style={{
                    ...inputStyle,
                    borderColor: errors.name ? '#ff6b6b' : 'var(--border-color)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={(e) => { e.target.style.borderColor = errors.name ? '#ff6b6b' : 'var(--border-color)' }}
                />
                {errors.name && (
                  <span className="font-mono text-xs mt-1 block" style={{ color: '#ff6b6b' }}>
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>
                  Email Address *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                  })}
                  type="email"
                  placeholder="john@company.com"
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? '#ff6b6b' : 'var(--border-color)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={(e) => { e.target.style.borderColor = errors.email ? '#ff6b6b' : 'var(--border-color)' }}
                />
                {errors.email && (
                  <span className="font-mono text-xs mt-1 block" style={{ color: '#ff6b6b' }}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>
                  Your Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Message must be at least 20 characters' } })}
                  rows={5}
                  placeholder="Tell me about your project..."
                  style={{
                    ...inputStyle,
                    resize: 'none',
                    borderColor: errors.message ? '#ff6b6b' : 'var(--border-color)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={(e) => { e.target.style.borderColor = errors.message ? '#ff6b6b' : 'var(--border-color)' }}
                />
                {errors.message && (
                  <span className="font-mono text-xs mt-1 block" style={{ color: '#ff6b6b' }}>
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-10 inline-flex items-center gap-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-200 disabled:opacity-60"
              style={{ padding: '18px 40px', background: 'var(--accent)', color: '#111' }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message ↗'}
            </button>

            {/* Status messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 font-mono text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  ✓ Message sent! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 font-mono text-sm"
                  style={{ color: '#ff6b6b' }}
                >
                  ✕ Something went wrong. Please try emailing directly.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </>
  )
}

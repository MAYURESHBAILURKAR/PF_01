/**
 * FAQ Section — visible content + FAQPage JSON-LD via useJsonLd.
 * Each question/answer pair is a discrete citeable entity for AI engines.
 * Structured semantics: each FAQ item uses <dl> + <dt>/<dd> for machine parsing.
 */

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({ q, a, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: index * 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="border-t py-6 md:py-8" style={{ borderColor: 'var(--border-color)' }}>
      <dt className="font-display font-bold mb-3 transition-colors duration-300 hover:text-[var(--accent)]"
        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', letterSpacing: '-0.01em' }}>
        {q}
      </dt>
      <dd className="leading-relaxed" style={{ color: 'var(--fg-muted)', lineHeight: 1.8, marginLeft: 0 }}
        itemProp="acceptedAnswer">
        {a}
      </dd>
    </div>
  )
}

export default function FAQSection({ faqs, limit }) {
  const sectionRef = useRef(null)
  const items = limit ? faqs.slice(0, limit) : faqs

  return (
    <section
      ref={sectionRef}
      aria-labelledby="faq-heading"
      style={{ padding: 'var(--section-py) var(--section-px)' }}
    >
      {/* Header */}
      <div className="mb-12">
        <p className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-4"
          style={{ color: 'var(--accent)' }}>
          <span className="inline-block w-6 h-px" style={{ background: 'var(--accent)' }} />
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="font-display font-extrabold leading-none"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
        >
          <span className="block overflow-hidden">
            <span className="reveal-inner block" style={{ transform: 'translateY(110%)' }}>Frequently</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-inner block italic" style={{ transform: 'translateY(110%)', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>Asked</span>
          </span>
        </h2>
      </div>

      {/* FAQ list — <dl> for semantic machine-parsing */}
      <dl itemScope itemType="https://schema.org/FAQPage" className="max-w-4xl">
        {items.map((faq, i) => (
          <FAQItem key={i} q={faq.question} a={faq.answer} index={i} />
        ))}
        <div className="border-t" style={{ borderColor: 'var(--border-color)' }} />
      </dl>
    </section>
  )
}
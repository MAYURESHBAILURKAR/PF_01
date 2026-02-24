import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TECH_MARQUEE } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function MarqueeStrip({ items = TECH_MARQUEE, reverse = false }) {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const raf = requestAnimationFrame(() => {
      const halfWidth = track.scrollWidth / 2

      tweenRef.current = gsap.to(track, {
        x: reverse ? halfWidth : -halfWidth,
        duration: 28,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const v = parseFloat(x) % halfWidth
            return reverse ? (v > 0 ? v - halfWidth : v) : v
          }),
        },
      })

      // Velocity-reactive skew + speed
      ScrollTrigger.create({
        onUpdate: (self) => {
          const vel = self.getVelocity()
          gsap.to(track, {
            skewX: vel / -4000,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          const boost = 1 + Math.abs(vel) / 3000
          if (tweenRef.current) {
            gsap.to(tweenRef.current, {
              timeScale: reverse ? -boost : boost,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: () => {
                gsap.to(tweenRef.current, {
                  timeScale: reverse ? -1 : 1,
                  duration: 1.5,
                  ease: 'power2.inOut',
                })
              },
            })
          }
        },
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      tweenRef.current?.kill()
    }
  }, [reverse])

  const doubled = [...items, ...items]

  return (
    <div
      className="border-y overflow-hidden"
      style={{
        borderColor: 'var(--border-color)',
        background: 'var(--bg-2)',
        padding: '18px 0',
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-7 font-display font-bold uppercase tracking-wide"
            style={{
              padding: '0 28px',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'var(--fg-muted)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'var(--accent)' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Scroll Progress Bar ─────────────────────────────────────────────── */
export function ScrollProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress, transformOrigin: 'left center' })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent), var(--accent-dark))',
        transformOrigin: 'left center',
        scaleX: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        boxShadow: '0 0 12px rgba(200,255,87,0.7)',
      }}
    />
  )
}

/* ─── Velocity Skew Effect ────────────────────────────────────────────── */
export function useScrollVelocitySkew(ref, strength = 3000) {
  useEffect(() => {
    if (!ref?.current) return

    let proxy = { skewY: 0 }
    const setter = gsap.quickSetter(ref.current, 'skewY', 'deg')
    const clamp  = gsap.utils.clamp(-20, 20)

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        const skew = clamp(velocity / -strength)
        if (Math.abs(skew) > Math.abs(proxy.skewY)) {
          proxy.skewY = skew
          gsap.to(proxy, {
            skewY: 0,
            duration: 0.1,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => setter(proxy.skewY),
          })
        }
      },
    })

    return () => st.kill()
  }, [ref, strength])
}

/* ─── Section Entrance: fade + slide up on scroll ─────────────────────── */
export function useSectionReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref?.current) return

    const el = ref.current
    const {
      y = 60,
      duration = 1,
      ease = 'power3.out',
      delay = 0,
      start = 'top 85%',
    } = options

    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === el) st.kill()
    })
  }, [ref])
}

/* ─── Horizontal scroll reveal for cards/grid items ──────────────────── */
export function useStaggerReveal(containerRef, selector = '.stagger-item', options = {}) {
  useEffect(() => {
    if (!containerRef?.current) return

    const items = containerRef.current.querySelectorAll(selector)
    if (!items.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.8,
          ease: options.ease || 'power3.out',
          stagger: options.stagger || 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start || 'top 80%',
            once: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, selector])
}

/* ─── Horizontal parallax stripe (decorative element) ────────────────── */
export function useHorizontalParallax(ref, xPercent = 10) {
  useEffect(() => {
    if (!ref?.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { xPercent: -xPercent },
        {
          xPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [ref, xPercent])
}

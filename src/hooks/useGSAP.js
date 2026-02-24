import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAPReveal — animates .reveal-inner elements within a container
 * when they scroll into view
 */
export function useGSAPReveal(containerRef, deps = []) {
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const lines = containerRef.current.querySelectorAll('.reveal-inner')
      lines.forEach((line) => {
        gsap.to(line, {
          translateY: '0%',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * useGSAPFadeUp — fades elements up on scroll
 */
export function useGSAPFadeUp(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.9,
          ease: 'power3.out',
          delay: options.delay || 0,
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 90%',
            once: true,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [ref, options.delay, options.duration, options.start])
}

/**
 * useGSAPCounter — animates a number from 0 to target
 */
export function useGSAPCounter(ref, target, suffix = '') {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.floor(this.targets()[0].val) + suffix
            },
          })
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [ref, target, suffix])
}

/**
 * useParallax — scroll-based parallax on an element
 */
export function useParallax(ref, yPercent = -20) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [ref, yPercent])
}

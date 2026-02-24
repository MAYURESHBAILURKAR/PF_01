import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

function createLenis() {
  return new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  })
}

export function useSmoothScroll() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    let lenis = createLenis()
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time) => lenisInstance?.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // On resize: destroy old instance, recreate fresh one at current scroll position
    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const currentScroll = lenis.scroll

        lenis.destroy()

        lenis = createLenis()
        lenisInstance = lenis
        lenis.on('scroll', ScrollTrigger.update)

        // Restore scroll position without animation
        lenis.scrollTo(currentScroll, { immediate: true })

        ScrollTrigger.refresh()
      }, 150)
    }

    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

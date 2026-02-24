import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export function PageTransitionOverlay() {
  const location = useLocation()
  const pathsRef = useRef([])

  // Configuration
  const numPoints = 10
  const numPaths = 2
  const delayPointsMax = 0.3
  const delayPerPath = 0.2

  useEffect(() => {
    // 1. Initialize points at 0 (meaning the liquid is at the very top, covering everything)
    const allPoints = [
      new Array(numPoints).fill(0),
      new Array(numPoints).fill(0)
    ]

    // 2. Generate random delays for that organic, liquid feel
    const pointsDelay = []
    for (let i = 0; i < numPoints; i++) {
      pointsDelay.push(Math.random() * delayPointsMax)
    }

    // 3. Render function: Anchored to the bottom (M 0 100), drawing up to the points
    const render = () => {
      pathsRef.current.forEach((path, i) => {
        if (!path) return
        const points = allPoints[i]
        
        let d = `M 0 100 V ${points[0]}`
        for (let j = 0; j < numPoints - 1; j++) {
          let p = ((j + 1) / (numPoints - 1)) * 100
          let cp = p - (1 / (numPoints - 1)) * 100 / 2
          d += ` C ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`
        }
        d += ` V 100 H 0 Z`
        
        path.setAttribute('d', d)
      })
    }

    // Force an immediate render so the screen is covered BEFORE the animation starts
    render()

    // 4. Animate the points from 0 down to 100 (falling out through the bottom)
    const tl = gsap.timeline({
      onUpdate: render,
    })

    for (let i = 0; i < numPaths; i++) {
      // Reverse path order so the top-most layer drops away first
      let pathDelay = delayPerPath * (numPaths - i - 1) 
      for (let j = 0; j < numPoints; j++) {
        tl.to(allPoints[i], {
          [j]: 100, // Move point to the bottom of the viewBox
          duration: 0.9,
          ease: 'power2.inOut',
        }, pathDelay + pointsDelay[j])
      }
    }

    // Cleanup if the user navigates super fast mid-animation
    return () => tl.kill()

  }, [location.pathname])

  return (
    <svg 
      className="fixed inset-0 z-[9980] pointer-events-none w-full h-full" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-dark, #9dd400)" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="var(--bg-2)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      
      {/* Background wave */}
      <path ref={el => pathsRef.current[0] = el} fill="url(#gradient2)" />
      {/* Foreground wave */}
      <path ref={el => pathsRef.current[1] = el} fill="url(#gradient1)" />
    </svg>
  )
}
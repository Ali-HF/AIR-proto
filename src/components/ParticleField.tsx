import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface ParticleNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const location = useLocation()

  // Track location and scroll to adjust hero multiplier
  const isHomeRef = useRef<boolean>(location.pathname === '/')
  const targetMultiplierRef = useRef<number>(location.pathname === '/' ? 1.25 : 1.0)
  const currentMultiplierRef = useRef<number>(location.pathname === '/' ? 1.25 : 1.0)
  const rafIdRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const isRunningRef = useRef<boolean>(true)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)

  // Update target multiplier on route change
  useEffect(() => {
    const isHome = location.pathname === '/'
    isHomeRef.current = isHome
    if (!isHome) {
      targetMultiplierRef.current = 1.0
    } else {
      const scrollY = window.scrollY || 0
      const heroThreshold = 550
      if (scrollY <= 50) {
        targetMultiplierRef.current = 1.25
      } else if (scrollY >= heroThreshold) {
        targetMultiplierRef.current = 1.0
      } else {
        const factor = (scrollY - 50) / (heroThreshold - 50)
        targetMultiplierRef.current = 1.25 - 0.25 * factor
      }
    }
  }, [location.pathname])

  // Track scroll on Home page to smoothly adjust multiplier
  useEffect(() => {
    const handleScroll = () => {
      if (!isHomeRef.current) return
      const scrollY = window.scrollY || 0
      const heroThreshold = 550
      if (scrollY <= 50) {
        targetMultiplierRef.current = 1.25
      } else if (scrollY >= heroThreshold) {
        targetMultiplierRef.current = 1.0
      } else {
        const factor = (scrollY - 50) / (heroThreshold - 50)
        targetMultiplierRef.current = 1.25 - 0.25 * factor
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mousePosRef.current = null
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let nodes: ParticleNode[] = []

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initNodes = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const area = width * height
      const isMobile = width < 640
      // 1 node per ~12,000px^2, capped at 95 desktop, 45 mobile
      const targetCount = Math.min(isMobile ? 45 : 95, Math.max(22, Math.floor(area / 12000)))

      nodes = []
      for (let i = 0; i < targetCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.0 + 1.8, // 1.8px - 2.8px
        })
      }
    }

    initNodes()

    const handleResize = () => {
      initNodes()
      if (prefersReducedMotion) {
        drawFrame(1)
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Gaussian-like random jitter
    const getJitter = () => {
      return (Math.random() + Math.random() + Math.random() - 1.5) * 0.035
    }

    const drawFrame = (dt: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Ease multiplier (~400ms transition)
      const easeSpeed = 0.08 * dt
      currentMultiplierRef.current += (targetMultiplierRef.current - currentMultiplierRef.current) * Math.min(easeSpeed, 1)
      const currentMultiplier = currentMultiplierRef.current

      const isMobile = width < 640
      const maxDist = isMobile ? 110 : 150
      const maxDistSq = maxDist * maxDist
      const maxSpeed = 0.28 // max speed clamp
      const damping = Math.pow(0.97, dt)

      // Update positions with Brownian motion
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]

          // Add small Gaussian impulse jitter
          node.vx += getJitter() * dt
          node.vy += getJitter() * dt

          // Apply light damping
          node.vx *= damping
          node.vy *= damping

          // Clamp max speed
          const speed = Math.hypot(node.vx, node.vy)
          if (speed > maxSpeed) {
            node.vx = (node.vx / speed) * maxSpeed
            node.vy = (node.vy / speed) * maxSpeed
          }

          // Delta-time based position update
          node.x += node.vx * dt
          node.y += node.vy * dt

          // Soft-bounce or wrap at container boundaries
          if (node.x < 0) {
            node.x = 0
            node.vx = -node.vx * 0.8
          } else if (node.x > width) {
            node.x = width
            node.vx = -node.vx * 0.8
          }

          if (node.y < 0) {
            node.y = 0
            node.vy = -node.vy * 0.8
          } else if (node.y > height) {
            node.y = height
            node.vy = -node.vy * 0.8
          }
        }
      }

      // Draw connecting lines between nodes within distance threshold
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / maxDist) * 0.24 * currentMultiplier
            if (alpha > 0.005) {
              ctx.strokeStyle = `rgba(85, 90, 125, ${alpha.toFixed(3)})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.lineTo(nodes[j].x, nodes[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Draw interactive connections to cursor position if available
      const mouse = mousePosRef.current
      if (mouse && !prefersReducedMotion) {
        const mouseDist = 140
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x
          const dy = nodes[i].y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < mouseDist) {
            const alpha = (1 - dist / mouseDist) * 0.35 * currentMultiplier
            ctx.strokeStyle = `rgba(79, 139, 255, ${alpha.toFixed(3)})` // Aurora blue connection
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      const nodeAlpha = Math.min(1, 0.55 * currentMultiplier)
      ctx.fillStyle = `rgba(80, 85, 120, ${nodeAlpha.toFixed(3)})`

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (prefersReducedMotion) {
      drawFrame(1)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    const loop = (currentTime: number) => {
      if (!isRunningRef.current) return

      const deltaMs = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime
      // Normalize delta-time (60fps = 1.0)
      const dt = Math.min(Math.max(deltaMs / 16.6667, 0.2), 3.0)

      drawFrame(dt)
      rafIdRef.current = requestAnimationFrame(loop)
    }

    lastTimeRef.current = performance.now()
    rafIdRef.current = requestAnimationFrame(loop)

    // Visibility management (pause when hidden)
    const handleVisibility = () => {
      if (document.hidden) {
        isRunningRef.current = false
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
        }
      } else {
        if (!isRunningRef.current) {
          isRunningRef.current = true
          lastTimeRef.current = performance.now()
          rafIdRef.current = requestAnimationFrame(loop)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none block"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  )
}

export default ParticleField

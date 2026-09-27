import { useEffect, useRef } from "react"
import { useTheme } from "./ThemeProvider"

export function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Color resolution for different themes
    const getPrimaryColor = () => {
      const currentTheme = theme as string
      if (currentTheme === "theme-paper-lab") return "rgba(225, 29, 72, " // Crimson red
      if (currentTheme === "theme-terminal") return "rgba(0, 255, 65, "   // Neon green
      if (currentTheme === "theme-ned") return "rgba(234, 179, 8, "       // NED gold
      if (currentTheme === "theme-aurora") return "rgba(225, 29, 143, "   // Magenta
      if (currentTheme === "theme-ember") return "rgba(249, 115, 22, "    // Ember orange
      if (currentTheme === "theme-space") return "rgba(168, 85, 247, "    // Deep space purple
      if (currentTheme === "theme-neural") return "rgba(236, 72, 153, "   // Neural pink
      if (currentTheme === "theme-robotics") return "rgba(234, 179, 8, "  // Robotics yellow
      if (currentTheme === "theme-bio") return "rgba(16, 185, 129, "      // Bio emerald
      if (currentTheme === "theme-mint-dark") return "rgba(85, 215, 153, "// Mint dark
      return "rgba(16, 185, 129, " // Mint light default
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      baseRadius: number
      radius: number

      constructor(w: number, h: number) {
        this.x = Math.random() * (w || 100)
        this.y = Math.random() * (h || 100)
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.baseRadius = Math.random() * 1.5 + 1.2
        this.radius = this.baseRadius
      }

      update(w: number, h: number, mouse: { x: number; y: number; active: boolean }) {
        this.x += this.vx
        this.y += this.vy

        // Soft bounce at edges
        if (this.x < 0) {
          this.x = 0
          this.vx *= -1
        } else if (this.x > w) {
          this.x = w
          this.vx *= -1
        }

        if (this.y < 0) {
          this.y = 0
          this.vy *= -1
        } else if (this.y > h) {
          this.y = h
          this.vy *= -1
        }

        // Mouse influence: subtle attraction and pulse
        if (mouse.active) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 180

          if (dist < maxDist && dist > 0) {
            const force = (maxDist - dist) / maxDist
            // Gentle nudge towards cursor without clumping
            this.x += (dx / dist) * force * 0.6
            this.y += (dy / dist) * force * 0.6
            this.radius = this.baseRadius + force * 1.2
          } else {
            this.radius = this.baseRadius
          }
        } else {
          this.radius = this.baseRadius
        }
      }

      draw(context: CanvasRenderingContext2D, colorPrefix: string) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = `${colorPrefix}0.75)`
        context.fill()
      }
    }

    let particles: Particle[] = []

    const initParticles = (w: number, h: number) => {
      particles = []
      const density = (w * h) / 11000
      const numParticles = Math.max(30, Math.min(95, Math.floor(density)))
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(w, h))
      }
    }

    // Handles DPR and exact 1:1 CSS pixel alignment
    const handleResize = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height

      // Ensure canvas internal bitmap matches displayed size * DPR
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      // Scale context so drawing commands use CSS pixel units
      if (ctx.resetTransform) {
        ctx.resetTransform()
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
      }
      ctx.scale(dpr, dpr)

      if (particles.length === 0) {
        initParticles(width, height)
      } else {
        // Clamp particles to new boundaries
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width
          if (p.y > height) p.y = Math.random() * height
        })
      }
    }

    handleResize()

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(canvas)
    window.addEventListener("resize", handleResize)

    // Accurate mouse tracking mapped directly to canvas bounds
    const mouse = { x: -9999, y: -9999, active: false }
    let lastClientX = -9999
    let lastClientY = -9999

    const updateMouseFromClient = (clientX: number, clientY: number) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const mx = clientX - rect.left
      const my = clientY - rect.top

      if (mx >= -50 && mx <= rect.width + 50 && my >= -50 && my <= rect.height + 50) {
        mouse.x = mx
        mouse.y = my
        mouse.active = true
      } else {
        mouse.active = false
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      lastClientX = e.clientX
      lastClientY = e.clientY
      updateMouseFromClient(e.clientX, e.clientY)
    }

    const onScroll = () => {
      if (mouse.active && lastClientX !== -9999) {
        updateMouseFromClient(lastClientX, lastClientY)
      }
    }

    const onMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mouseout", onMouseLeave, { passive: true })

    const animate = () => {
      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height)
        const colorPrefix = getPrimaryColor()

        // 1. Update and draw nodes
        particles.forEach((p) => {
          p.update(width, height, mouse)
          p.draw(ctx, colorPrefix)
        })

        // 2. Draw connections between nearby nodes
        const maxLinkDist = 130
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i]
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < maxLinkDist) {
              const alpha = (1 - dist / maxLinkDist) * 0.32
              ctx.beginPath()
              ctx.strokeStyle = `${colorPrefix}${alpha.toFixed(3)})`
              ctx.lineWidth = 1
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }

          // 3. Connect nearby nodes to cursor
          if (mouse.active) {
            const mdx = mouse.x - p1.x
            const mdy = mouse.y - p1.y
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
            const mouseLinkDist = 180

            if (mDist < mouseLinkDist) {
              const alpha = (1 - mDist / mouseLinkDist) * 0.65
              ctx.beginPath()
              ctx.strokeStyle = `${colorPrefix}${alpha.toFixed(3)})`
              ctx.lineWidth = 1.1
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(mouse.x, mouse.y)
              ctx.stroke()
            }
          }
        }

        // 4. Draw interactive node at the cursor position
        if (mouse.active) {
          ctx.beginPath()
          ctx.arc(mouse.x, mouse.y, 2.8, 0, Math.PI * 2)
          ctx.fillStyle = `${colorPrefix}0.9)`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mouseout", onMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none block"
    />
  )
}


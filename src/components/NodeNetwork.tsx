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
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", resize)
    resize()

    // Determine colors based on theme heuristically or just use CSS variables
    // For simplicity, we extract colors from computed style or use a fixed one per theme
    const style = getComputedStyle(document.documentElement)
    
    // Convert HSL to rgb/rgba for canvas
    const getPrimaryColor = () => {
       if (theme === "theme-paper-lab") return "rgba(220, 20, 60, " // Cardinal Red approx
       if (theme === "theme-terminal") return "rgba(0, 255, 65, "
       if (theme === "theme-ned") return "rgba(255, 204, 0, "
       if (theme === "theme-aurora") return "rgba(200, 20, 150, "
       if (theme === "theme-ember") return "rgba(220, 100, 30, "
       return "rgba(150, 100, 255, " // Midnight (violet approx)
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 1
        this.vy = (Math.random() - 0.5) * 1
        this.radius = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw(ctx: CanvasRenderingContext2D, colorPrefix: string) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = colorPrefix + "0.8)"
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      const numParticles = Math.min(100, (window.innerWidth * window.innerHeight) / 10000)
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
      }
    }

    // Mouse interaction
    let mouse = { x: -1000, y: -1000 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseout", onMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const colorPrefix = getPrimaryColor()

      particles.forEach(p => {
        p.update()
        p.draw(ctx, colorPrefix)
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = colorPrefix + (1 - distance / 120) * 0.4 + ")"
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
        
        // Mouse connection
        const mdx = particles[i].x - mouse.x
        const mdy = particles[i].y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < 150) {
          ctx.beginPath()
          ctx.strokeStyle = colorPrefix + (1 - mDist / 150) * 0.8 + ")"
          ctx.lineWidth = 1.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseout", onMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" 
    />
  )
}

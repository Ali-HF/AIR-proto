import { motion, useMotionValue, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface ClickRipple {
  id: number
  x: number
  y: number
}

// Ultra-subtle Web Audio haptic click generator (mimics physical mechanical trackpad click)
function playHapticTick() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === "suspended") {
      ctx.resume()
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    // Rapid pitch drop from 1200Hz to 160Hz in 9ms gives crisp tactile snap
    osc.frequency.setValueAtTime(1200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.009)

    // Very subtle volume (tactile sensation, not intrusive sound)
    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.009)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.01)
  } catch {
    // AudioContext blocked or not supported
  }
}

// Device linear resonant actuator (LRA) hardware vibration
function triggerDeviceVibration() {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(12)
    }
  } catch {
    // Ignore if not supported/permitted
  }
}

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // States: default, pointer (buttons/links), card (bento/hexagons)
  const [hoverState, setHoverState] = useState<"default" | "pointer" | "card">("default")
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [ripples, setRipples] = useState<ClickRipple[]>([])

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check for interactive links and buttons
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setHoverState("pointer")
        return
      }

      // Check for cards, tiles, or interactive groups
      if (
        target.closest(".bg-card") ||
        target.closest(".group") ||
        target.closest("tr") ||
        target.closest(".hover\\:shadow-lg")
      ) {
        setHoverState("card")
        return
      }

      setHoverState("default")
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true)
      triggerDeviceVibration()
      playHapticTick()

      // Spawn haptic visual ripple ring at click coordinates
      const id = Date.now() + Math.random()
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }])
    }

    const handleMouseUp = () => {
      setIsMouseDown(false)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  // Base state transformations (refined, subtle, elegant)
  const getVariants = () => {
    if (isMouseDown) {
      return {
        scale: hoverState === "pointer" ? 0.92 : 0.88,
        rotate: hoverState === "pointer" ? -4 : -2,
        opacity: 1,
        fill: "hsl(var(--primary) / 0.25)",
        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.25))",
      }
    }

    switch (hoverState) {
      case "pointer":
        return {
          scale: 1.08,
          rotate: -4,
          opacity: 1,
          fill: "hsl(var(--primary) / 0.15)",
          filter: "drop-shadow(0px 3px 8px rgba(0,0,0,0.25))",
        }
      case "card":
        return {
          scale: 1.05,
          rotate: 0,
          opacity: 0.95,
          fill: "hsl(var(--primary) / 0.08)",
          filter: "drop-shadow(0px 3px 8px rgba(0,0,0,0.2))",
        }
      default:
        return {
          scale: 1,
          rotate: 0,
          opacity: 1,
          fill: "transparent",
          filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.2))",
        }
    }
  }

  return (
    <>
      {/* Expanding Haptic Ripple Shockwaves */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{
              scale: 0.3,
              opacity: 0.75,
            }}
            animate={{
              scale: 1.6,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.15, 0.85, 0.35, 1], // snappy spring out
            }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
            }}
            className="fixed pointer-events-none rounded-full border border-primary/70 z-[9998]"
            style={{
              left: ripple.x - 18,
              top: ripple.y - 18,
              width: 36,
              height: 36,
              boxShadow: "0 0 8px hsl(var(--primary) / 0.3)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Interactive Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] origin-top-left"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={getVariants()}
        transition={{
          duration: isMouseDown ? 0.08 : 0.18, // Swift, responsive, subtle transition
          ease: "easeOut",
        }}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 28 28"
          stroke="hsl(var(--primary))"
          strokeWidth={hoverState === "pointer" || isMouseDown ? "2" : "1.5"}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="transform -translate-x-[1px] -translate-y-[1px] transition-all duration-150"
        >
          <path d="M0 0 L9 24 L13 13 L24 9 Z" />
        </svg>

        {/* Tactile Impact Dot (illuminates during active click) */}
        {isMouseDown && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary -translate-x-0.5 -translate-y-0.5 shadow-[0_0_6px_hsl(var(--primary))]"
          />
        )}
      </motion.div>
    </>
  )
}

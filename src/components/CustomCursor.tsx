import { motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference origin-top-left"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 28 28" 
        fill="transparent" 
        stroke="white" 
        strokeWidth={isHovering ? "2.5" : "1.5"}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="transform -translate-x-[1px] -translate-y-[1px]"
      >
        {/* Hollow pointer without a stem/tail */}
        <path d="M0 0 L9 24 L13 13 L24 9 Z" />
      </svg>
    </motion.div>
  )
}

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingTechObjects() {
  const { scrollY } = useScroll()
  const [windowHeight, setWindowHeight] = useState(1000)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Parallax calculations based on scroll position
  const y1 = useTransform(scrollY, [0, windowHeight * 2], [0, -300])
  const y2 = useTransform(scrollY, [0, windowHeight * 2], [0, 400])
  const y3 = useTransform(scrollY, [0, windowHeight * 2], [0, -200])
  const y4 = useTransform(scrollY, [0, windowHeight * 2], [0, 500])

  const r1 = useTransform(scrollY, [0, windowHeight * 2], [0, 180])
  const r2 = useTransform(scrollY, [0, windowHeight * 2], [0, -360])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Floating Plus Sign */}
      <motion.div 
        style={{ y: y1, rotate: r1 }} 
        className="absolute top-1/4 left-[10%] text-primary/30 w-8 h-8 flex items-center justify-center"
      >
        <div className="w-px h-full bg-current absolute" />
        <div className="w-full h-px bg-current absolute" />
      </motion.div>

      {/* Floating Tech Bracket */}
      <motion.div 
        style={{ y: y2 }} 
        className="absolute top-[60%] right-[15%] text-primary/20 font-mono text-4xl font-bold"
      >
        {`{ }`}
      </motion.div>

      {/* Floating Square */}
      <motion.div 
        style={{ y: y3, rotate: r2 }} 
        className="absolute top-[80%] left-[20%] w-12 h-12 border-2 border-primary/20 rounded-md"
      />

      {/* Floating Dot Grid Block */}
      <motion.div 
        style={{ y: y4 }} 
        className="absolute top-[30%] right-[10%] grid grid-cols-3 gap-2 opacity-30"
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
        ))}
      </motion.div>
    </div>
  )
}

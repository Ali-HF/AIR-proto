import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col justify-center max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-sm mb-6">
          <div className="w-8 h-[2px] bg-primary" />
          Our Mission
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">About AIR Lab</h1>
        <div className="space-y-8 text-xl font-medium text-muted-foreground leading-relaxed">
          <p>
            The Artificial Intelligence Research Lab (AIR Lab) at NED University is dedicated to pushing the boundaries of machine learning, natural language processing, and computer vision.
          </p>
          <p>
            Our mission is to develop foundational models optimized for the region's unique linguistic and infrastructural challenges, ensuring AI benefits all segments of society. We bridge the gap between abstract theoretical research and practical, deployable engineering solutions.
          </p>
        </div>
        
        <div className="mt-16 pt-16 border-t flex flex-col sm:flex-row gap-6">
           <a href="/team" className="inline-flex items-center text-lg font-semibold hover:text-primary transition-colors">
              Meet the Team <ArrowRight className="ml-2 w-5 h-5" />
           </a>
           <a href="/projects" className="inline-flex items-center text-lg font-semibold hover:text-primary transition-colors">
              Explore Projects <ArrowRight className="ml-2 w-5 h-5" />
           </a>
        </div>
      </motion.div>
    </div>
  )
}

import { motion } from "framer-motion"
import { NodeNetwork } from "../components/NodeNetwork"
import { ArrowRight, Brain, Zap, Code, Database, LineChart } from "lucide-react"
import CountUpModule from "react-countup"
import MarqueeModule from "react-fast-marquee"
import { Button } from "../components/ui/button"

const CountUp = (CountUpModule as any).default || CountUpModule
const Marquee = (MarqueeModule as any).default || MarqueeModule

export default function Home() {
  const logos = [
    "Google DeepMind", "OpenAI", "Meta AI", "Hugging Face", "Stanford HAI", "MIT CSAIL"
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Background Hero Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <NodeNetwork />
      </div>
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto flex-1 flex flex-col items-center text-center px-6 pt-32 pb-24 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Pioneering Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] max-w-5xl leading-[1.1] mb-6">
            Artificial Intelligence <br className="hidden md:block"/> Research Lab
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Building next-generation models and intelligent systems at NED University. We bridge the gap between theoretical research and real-world impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => window.location.href='/about'}>
              Discover Our Mission <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href='/projects'}>
              View Projects
            </Button>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 flex justify-center items-center gap-12 md:gap-24 text-center border-y py-6 w-full max-w-4xl border-border/50 bg-background/50 backdrop-blur-sm"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold font-mono text-primary">
              <CountUp end={45} duration={2} />+
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Publications</div>
          </div>
          <div className="w-px h-12 bg-border/50" />
          <div>
            <div className="text-3xl md:text-4xl font-bold font-mono text-primary">
              <CountUp end={120} duration={2} />+
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Lab Members</div>
          </div>
          <div className="w-px h-12 bg-border/50" />
          <div>
            <div className="text-3xl md:text-4xl font-bold font-mono text-primary">
              <CountUp end={15} duration={2} />
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Active Grants</div>
          </div>
        </motion.div>

        {/* Product Preview Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-24 w-full max-w-5xl rounded-[var(--radius-window)] border bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Mac window controls */}
          <div className="bg-muted/50 border-b px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-4 text-xs font-mono text-muted-foreground">air-lab/core-model.py</div>
          </div>
          <div className="p-8 md:p-12 aspect-video flex items-center justify-center bg-gradient-to-br from-primary/5 to-transparent relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative text-center">
              <Brain className="w-24 h-24 text-primary mx-auto mb-6 opacity-80" />
              <h3 className="text-2xl font-semibold mb-2">Neural Architecture Preview</h3>
              <p className="text-muted-foreground">Training visualization dashboard coming soon.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="w-full border-y bg-muted/20 py-12 z-10 overflow-hidden">
        <div className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Industry & Academic Collaborations
        </div>
        <Marquee gradient={true} gradientColor="hsl(var(--background))" gradientWidth={100} speed={40} className="py-4">
          {logos.map((logo, idx) => (
            <div key={idx} className="mx-12 text-xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors cursor-default">
              {logo}
            </div>
          ))}
        </Marquee>
      </section>

      {/* Bento Grid Features */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Core Research Areas</h2>
          <p className="text-muted-foreground">Exploring the frontiers of artificial intelligence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Block 1: Large */}
          <div className="md:col-span-2 md:row-span-2 rounded-[var(--radius-card)] border bg-card p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-8 right-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity">
              <Brain className="w-12 h-12" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <h3 className="text-2xl font-bold mb-2">Foundational Models</h3>
            <p className="text-muted-foreground max-w-md">Developing state-of-the-art LLMs optimized for regional languages and specialized domain tasks.</p>
          </div>
          
          {/* Block 2 */}
          <div className="rounded-[var(--radius-card)] border bg-card p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-6 right-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Edge AI</h3>
            <p className="text-muted-foreground text-sm">Deploying high-performance models on constrained hardware.</p>
          </div>
          
          {/* Block 3 */}
          <div className="rounded-[var(--radius-card)] border bg-card p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-colors">
             <div className="absolute top-6 right-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Open Source</h3>
            <p className="text-muted-foreground text-sm">Contributing tools and datasets back to the community.</p>
          </div>

          {/* Block 4 */}
          <div className="rounded-[var(--radius-card)] border bg-card p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-colors">
             <div className="absolute top-6 right-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity">
              <Database className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Data Curation</h3>
            <p className="text-muted-foreground text-sm">Large scale ethically sourced datasets.</p>
          </div>

          {/* Block 5 */}
          <div className="md:col-span-2 rounded-[var(--radius-card)] border bg-card p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-6 right-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity">
              <LineChart className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Safety & Alignment</h3>
            <p className="text-muted-foreground max-w-md">Ensuring robust, unbiased, and safe deployment of intelligent systems in critical environments.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { motion } from "framer-motion"
import { NodeNetwork } from "../components/NodeNetwork"
import { FloatingTechObjects } from "../components/FloatingTechObjects"
import { ArrowRight, BookOpen, Building2, Globe2, ShieldCheck, Users, GraduationCap } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Home() {
  const pillars = [
    {
      title: "Theoretical & Applied Research",
      icon: BookOpen,
      description: "Serving as a hub for theoretical exploration, applied research, and interdisciplinary collaboration in modern AI.",
    },
    {
      title: "Robust, Ethical & Explainable Systems",
      icon: ShieldCheck,
      description: "Developing intelligent systems that are robust, ethical, explainable, and scalable, addressing challenges across academia, industry, and society.",
    },
    {
      title: "Academia & Industry Synergy",
      icon: Building2,
      description: "Collaborating with industry partners to solve real-world problems, enabling knowledge transfer, applied innovation, and workforce development.",
    },
    {
      title: "Capacity Building & Community",
      icon: Globe2,
      description: "Promoting AI awareness through workshops, seminars, training programs, and open research initiatives across Pakistan and beyond.",
    },
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Background Tech Objects */}
      <FloatingTechObjects />

      {/* Background Hero Layer with Node Network */}
      <div className="absolute top-0 left-0 right-0 h-[1100px] lg:h-[1250px] overflow-hidden pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
        <NodeNetwork />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto flex-1 flex flex-col items-center text-center px-6 pt-28 pb-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-3.5 py-1 text-xs font-mono font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            NED University of Engineering & Technology
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Artificial Intelligence <br />
            Research Lab
          </h1>

          <p className="text-primary font-mono text-sm md:text-base font-semibold mb-4">
            Department of Computer Science & Information Technology
          </p>

          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Advancing cutting-edge research in Artificial Intelligence and translating innovation into real-world impact. Bridging academia and industry through robust, ethical, and explainable intelligent systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => (window.location.href = "/about")}
            >
              About the Lab <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => (window.location.href = "/team")}
            >
              <Users className="w-4 h-4 mr-2" /> View Our Team
            </Button>
          </div>
        </motion.div>

        {/* Institutional Overview Card (Featuring the official logo and mission statement) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 w-full max-w-4xl rounded-2xl border bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden text-left p-8 md:p-12 relative"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 flex items-center justify-center p-4 rounded-2xl bg-muted/40 border">
              <img
                src="/AIR-proto/air-lab-mark.svg"
                alt="AIR Lab Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Lab Mission & Vision
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Shaping the Future of AI in Pakistan
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                By combining strong foundations in computer science with contemporary AI methodologies, AIR Lab pushes the boundaries of what intelligent systems can achieve while preparing skilled graduates for the evolving technological landscape.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                <span>• Department of CS & IT</span>
                <span>• NED University</span>
                <span>• Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Core Research Pillars Section (Strictly based on provided content) */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 z-10 border-t">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2">
            Focus & Direction
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Core Objectives & Scope
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Guiding principles and operational pillars of the Artificial Intelligence Research Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border bg-card p-8 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Quick Access to Team & Previous Interns */}
      <section className="w-full border-t bg-muted/20 py-16 z-10">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Explore Lab Contributors</h3>
            <p className="text-sm text-muted-foreground">
              Review current faculty coordinator, research interns, and previous intern cohorts.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => (window.location.href = "/team")}>
              <Users className="w-4 h-4 mr-2" /> Current Team
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/interns")}>
              <GraduationCap className="w-4 h-4 mr-2" /> Previous Interns
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Building2, Globe2 } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[calc(100vh-4rem)] flex flex-col justify-center max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-mono font-medium text-primary mb-6">
          <span className="w-2 h-2 rounded-full bg-primary" />
          NED University of Engineering & Technology
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          About AIR Lab
        </h1>
        <p className="text-primary font-mono text-sm md:text-base font-semibold mb-10">
          Department of Computer Science & Information Technology
        </p>

        <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            The Artificial Intelligence Research Lab (AIR Lab) at the Department of Computer Science & Information Technology, NED University of Engineering & Technology, is established with the vision of advancing cutting-edge research in Artificial Intelligence and translating innovation into real-world impact. AIR Lab serves as a hub for theoretical exploration, applied research, and interdisciplinary collaboration in modern AI. Our research focuses on developing intelligent systems that are robust, ethical, explainable, and scalable, addressing challenges across academia, industry, and society. By combining strong foundations in computer science with contemporary AI methodologies, we aim to push the boundaries of what intelligent systems can achieve.
          </p>

          <p>
            A core objective of AIR Lab is to bridge the gap between academia and industry. We actively collaborate with industry partners to solve real-world problems, enabling knowledge transfer, applied innovation, and workforce development. Through joint projects, sponsored research, and student involvement, the lab contributes practical AI solutions while preparing skilled graduates for the evolving technological landscape. Beyond research, AIR Lab is committed to community engagement and capacity building. The lab promotes AI awareness through workshops, seminars, training programs, and open research initiatives, fostering an ecosystem of learning and innovation within and beyond the university.
          </p>

          <p>
            By nurturing talent, encouraging collaboration, and pursuing impactful research, the Artificial Intelligence Research Lab aspires to play a meaningful role in shaping the future of AI in Pakistan and contributing to the global AI research community.
          </p>
        </div>

        {/* Core Pillars derived from provided content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-10 border-t">
          <div className="p-6 rounded-xl border bg-card/60">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Research & Theory</h3>
            <p className="text-sm text-muted-foreground">
              Advancing robust, ethical, explainable, and scalable intelligent systems combining computer science fundamentals with contemporary AI.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card/60">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Academia-Industry Bridge</h3>
            <p className="text-sm text-muted-foreground">
              Solving real-world problems through joint sponsored projects, workforce development, and practical AI solutions.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-card/60">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Capacity Building</h3>
            <p className="text-sm text-muted-foreground">
              Workshops, seminars, training programs, and open research initiatives fostering learning and innovation across Pakistan.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="/team"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            Meet Our Team <ArrowRight className="ml-1.5 w-4 h-4" />
          </a>
          <span className="text-muted-foreground">•</span>
          <a
            href="/interns"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            Previous Research Interns <ArrowRight className="ml-1.5 w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

import projectsData from "../data/projects.json"
import { motion } from "framer-motion"
import { Tabs } from "../components/ui/tabs"
import { Card } from "../components/ui/card"
import { ArrowUpRight, BarChart } from "lucide-react"

export default function Projects() {
  const categories = ["Funded", "R&D", "Undergraduate", "Postgraduate"]

  const ProjectList = ({ category }: { category: string }) => {
    const filtered = category === "All" ? projectsData : projectsData.filter(p => p.category === category)
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {filtered.length === 0 && <p className="text-muted-foreground py-12">No projects found in this category.</p>}
        {filtered.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group flex flex-col h-full overflow-hidden hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <div className="aspect-[2/1] w-full overflow-hidden bg-muted relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="px-2 py-1 bg-primary/20 text-primary-foreground backdrop-blur-md rounded-md text-[10px] font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                     <BarChart className="w-5 h-5" />
                   </div>
                   <div>
                     <div className="text-xl font-bold font-mono tracking-tight text-foreground">
                       {Math.floor(Math.random() * 80 + 10)}%
                     </div>
                     <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                       Performance Gain
                     </div>
                   </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  const tabs = [
    { id: "all", label: "All Projects", content: <ProjectList category="All" /> },
    ...categories.map(cat => ({
      id: cat.toLowerCase(),
      label: cat,
      content: <ProjectList category={cat} />
    }))
  ]

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Research Projects</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">Explore our latest advancements in models and systems.</p>
      </div>
      
      <Tabs tabs={tabs} defaultTab="all" />
    </div>
  )
}

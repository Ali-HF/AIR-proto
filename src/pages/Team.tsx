import teamData from "../data/team.json"
import { motion } from "framer-motion"
import { Tabs } from "../components/ui/tabs"
import { Card } from "../components/ui/card"
import { Mail, BookOpen, Globe } from "lucide-react"

const ProfileCard = ({ member, i }: { member: any, i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
  >
    <Card className="overflow-hidden group hover:border-primary/50 transition-colors bg-card hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight mb-1">{member.name}</h3>
        <p className="text-primary font-mono text-xs mb-4">{member.role}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {member.researchAreas.map((area: string) => (
            <span key={area} className="px-2 py-1 bg-muted rounded-md text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {area}
            </span>
          ))}
        </div>
        <div className="flex gap-4 pt-4 border-t border-border/50">
          <a href="#" className="text-muted-foreground hover:text-foreground"><Mail className="w-4 h-4" /></a>
          <a href="#" className="text-muted-foreground hover:text-foreground"><BookOpen className="w-4 h-4" /></a>
          <a href="#" className="text-muted-foreground hover:text-foreground"><Globe className="w-4 h-4" /></a>
        </div>
      </div>
    </Card>
  </motion.div>
)

export default function Team() {
  const faculty = teamData.filter(m => m.role.toLowerCase().includes("faculty"))
  const postgrad = teamData.filter(m => m.role.toLowerCase().includes("postgraduate"))
  const undergrad = teamData.filter(m => m.role.toLowerCase().includes("undergraduate"))

  const TabContent = ({ members }: { members: typeof teamData }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {members.map((member, i) => (
        <ProfileCard key={member.id} member={member} i={i} />
      ))}
    </div>
  )

  const tabs = [
    { id: "faculty", label: "Faculty", content: <TabContent members={faculty} /> },
    { id: "postgrad", label: "Postgraduate", content: <TabContent members={postgrad} /> },
    { id: "undergrad", label: "Undergraduate", content: <TabContent members={undergrad} /> }
  ]

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Core Team</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">The researchers and engineers driving innovation at AIR Lab.</p>
      </div>
      
      <Tabs tabs={tabs} defaultTab="faculty" />
    </div>
  )
}


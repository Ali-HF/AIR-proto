import teamData from "../data/team.json"
import { motion } from "framer-motion"
import { Tabs } from "../components/ui/tabs"
import { Card } from "../components/ui/card"
import Tilt from "react-parallax-tilt"
import { Mail, BookOpen, Globe } from "lucide-react"

const ProfileCard = ({ member, i }: { member: any, i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
    className="flex flex-col items-center text-center group"
  >
    {/* Hexagon Picture */}
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={2000} className="mb-6">
      <div 
        className="w-48 h-56 md:w-56 md:h-64 bg-muted relative transition-transform duration-500"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Tilt>

    {/* Info */}
    <h3 className="text-xl font-semibold tracking-tight mb-1">{member.name}</h3>
    <p className="text-primary font-mono text-xs mb-4">{member.role}</p>
    
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {member.researchAreas.map((area: string) => (
        <span key={area} className="px-2 py-1 bg-muted/50 rounded-md text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {area}
        </span>
      ))}
    </div>

    <div className="flex gap-4 pt-4 border-t border-border/50 w-full justify-center">
      <a href="#" className="text-muted-foreground hover:text-foreground"><Mail className="w-4 h-4" /></a>
      <a href="#" className="text-muted-foreground hover:text-foreground"><BookOpen className="w-4 h-4" /></a>
      <a href="#" className="text-muted-foreground hover:text-foreground"><Globe className="w-4 h-4" /></a>
    </div>
  </motion.div>
)

export default function Team() {
  const faculty = teamData.filter(m => m.role.toLowerCase().includes("faculty"))
  const postgrad = teamData.filter(m => m.role.toLowerCase().includes("postgraduate"))
  const undergrad = teamData.filter(m => m.role.toLowerCase().includes("undergraduate"))

  const TabContent = ({ members }: { members: typeof teamData }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
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


import teamData from "../data/team.json"
import { motion } from "framer-motion"
import { Tabs } from "../components/ui/tabs"
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
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={2000}>
    <div 
      className="w-40 h-[184px] md:w-52 md:h-[240px] bg-muted relative transition-transform duration-500"
      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Overlay Info on Hover to keep the honeycomb tight */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 text-center z-10">
        <h3 className="text-sm md:text-lg font-bold tracking-tight mb-1">{member.name}</h3>
        <p className="text-primary font-mono text-[10px] md:text-xs mb-2">{member.role}</p>
        <div className="flex gap-2">
          <a href="#" className="text-muted-foreground hover:text-foreground"><Mail className="w-3 h-3 md:w-4 md:h-4" /></a>
          <a href="#" className="text-muted-foreground hover:text-foreground"><Globe className="w-3 h-3 md:w-4 md:h-4" /></a>
        </div>
      </div>
    </div>
    </Tilt>
  </motion.div>
)

const HoneycombGrid = ({ members }: { members: typeof teamData }) => {
  // Create rows of [3, 2, 3, 2] for desktop
  const desktopRows: typeof teamData[] = []
  let i = 0
  let isRowOfThree = true
  while (i < members.length) {
    const chunkSize = isRowOfThree ? 3 : 2
    desktopRows.push(members.slice(i, i + chunkSize))
    i += chunkSize
    isRowOfThree = !isRowOfThree
  }

  // Create rows of [2, 1, 2, 1] for mobile
  const mobileRows: typeof teamData[] = []
  let j = 0
  let isRowOfTwo = true
  while (j < members.length) {
    const chunkSize = isRowOfTwo ? 2 : 1
    mobileRows.push(members.slice(j, j + chunkSize))
    j += chunkSize
    isRowOfTwo = !isRowOfTwo
  }

  return (
    <>
      {/* Desktop Honeycomb */}
      <div className="hidden md:flex flex-col items-center mt-12 pb-24">
        {desktopRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center gap-4"
            style={{ marginTop: rowIndex > 0 ? '-66px' : '0' }}
          >
            {row.map((member, idx) => (
              <ProfileCard key={member.id} member={member} i={rowIndex * 3 + idx} />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Honeycomb */}
      <div className="flex md:hidden flex-col items-center mt-8 pb-12">
        {mobileRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center gap-2"
            style={{ marginTop: rowIndex > 0 ? '-50px' : '0' }}
          >
            {row.map((member, idx) => (
              <ProfileCard key={member.id} member={member} i={rowIndex * 2 + idx} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default function Team() {
  const faculty = teamData.filter(m => m.role.toLowerCase().includes("faculty"))
  const postgrad = teamData.filter(m => m.role.toLowerCase().includes("postgraduate"))
  const undergrad = teamData.filter(m => m.role.toLowerCase().includes("undergraduate"))

  const TabContent = ({ members }: { members: typeof teamData }) => (
    <HoneycombGrid members={members} />
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


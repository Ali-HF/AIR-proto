import { useState } from "react"
import teamData from "../data/team.json"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Tabs } from "../components/ui/tabs"
import {
  Mail,
  Phone,
  FileText,
  UserCheck,
  GraduationCap,
  Users,
  ExternalLink,
  Sparkles,
  LayoutGrid,
  TableProperties,
} from "lucide-react"

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z" />
  </svg>
)

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

type TeamMember = (typeof teamData)[number]

export default function Team() {
  const faculty = teamData.filter((m) => m.category === "Faculty")
  const interns = teamData.filter((m) => m.category === "Research Interns")

  const [internViewMode, setInternViewMode] = useState<"cards" | "table">("cards")

  // Honeycomb arrangement:
  // Row 1 (4 members): Dr. Murk Marvi + 3 interns
  // Row 2 (3 members): 3 interns (interlocking offset)
  // Row 3 (4 members): 4 interns (interlocking offset)
  const hexRow1 = [teamData[1], teamData[0], teamData[2], teamData[3]] // Shaheer, Dr. Marvi (center), Kashaf, Haseeb
  const hexRow2 = [teamData[4], teamData[5], teamData[6]] // Umer, Omer, Shujauddin
  const hexRow3 = [teamData[7], teamData[8], teamData[9], teamData[10]] // Muhammed Ahmed, Roshaan, Hammad, Areeba

  // Single Hexagon Item Component
  const HexItem = ({ member }: { member: TeamMember }) => {
    const isFaculty = member.category === "Faculty"

    return (
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={800}
        scale={1.05}
        transitionSpeed={400}
        className="cursor-pointer"
      >
        <div
          tabIndex={0}
          role="group"
          aria-label={`${member.name} - ${member.role}`}
          className="group relative block w-[110px] h-[126px] sm:w-[142px] sm:h-[162px] md:w-[165px] md:h-[190px] focus:outline-hidden"
        >
          {/* Hexagon Border Layer */}
          <div
            className={`w-full h-full p-[2.5px] transition-all duration-300 ${
              isFaculty
                ? "bg-gradient-to-b from-primary via-primary/70 to-primary/30 group-hover:from-primary group-hover:via-primary group-hover:to-primary/60 drop-shadow-md"
                : "bg-gradient-to-b from-primary/40 via-border to-primary/10 group-hover:from-primary group-hover:via-primary/70 group-hover:to-primary/40 drop-shadow-xs"
            }`}
            style={{ clipPath: HEX_CLIP }}
          >
            {/* Hexagon Content Area */}
            <div
              className="w-full h-full bg-card relative overflow-hidden flex items-center justify-center"
              style={{ clipPath: HEX_CLIP }}
            >
              {/* Member Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-all duration-500 filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-110"
              />

              {/* Hover Info Overlay (Bottom Gradient - Leaves Face Clear) */}
              <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-2 bg-gradient-to-t from-background via-background/90 to-transparent flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-primary uppercase tracking-wider line-clamp-1">
                  {isFaculty ? "Faculty Lead" : "Intern"}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-foreground leading-tight line-clamp-1 px-1">
                  {member.name}
                </span>

                {/* Micro Action Buttons */}
                <div className="flex items-center gap-1.5 mt-1">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Email ${member.name}`}
                      className="w-5 h-5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    >
                      <Mail className="w-2.5 h-2.5" />
                    </a>
                  )}
                  {"linkedin" in member && member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="LinkedIn Profile"
                      className="w-5 h-5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    >
                      <LinkedinIcon className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Faculty Special Crown/Badge indicator */}
              {isFaculty && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-primary text-[9px] font-mono font-bold text-primary-foreground tracking-wider uppercase shadow-xs">
                  Lead
                </div>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    )
  }

  // Honeycomb View Content (Default Tab)
  const HoneycombContent = () => (
    <div className="mt-8 space-y-12">
      {/* Visual Guide Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Honeycomb Matrix
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground font-mono">
          Hover over any hexagon to view details and quick contact links • Explore sub-tabs for complete profiles
        </p>
      </div>

      {/* Honeycomb Grid Container */}
      <div className="relative py-4 flex flex-col items-center justify-center overflow-x-auto">
        <div className="min-w-[340px] sm:min-w-[500px] md:min-w-[690px] flex flex-col items-center select-none py-2">
          {/* Row 1 (4 members) */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 z-30">
            {hexRow1.map((m) => (
              <HexItem key={m.id} member={m} />
            ))}
          </div>

          {/* Row 2 (3 members - Interlocking) */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 -mt-7 sm:-mt-10 md:-mt-12 z-20">
            {hexRow2.map((m) => (
              <HexItem key={m.id} member={m} />
            ))}
          </div>

          {/* Row 3 (4 members - Interlocking) */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 -mt-7 sm:-mt-10 md:-mt-12 z-10">
            {hexRow3.map((m) => (
              <HexItem key={m.id} member={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Faculty Coordinator Sub-Tab (Dr. Murk Marvi Card)
  const FacultyContent = () => (
    <div className="mt-8 space-y-6 max-w-4xl">
      {faculty.map((member) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border bg-card p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="w-28 h-28 rounded-2xl overflow-hidden border border-primary/20 shrink-0 shadow-sm bg-muted">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                {member.role}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {member.name}
              </h2>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {member.designation}
              </p>
            </div>

            {member.qualifications && (
              <div className="space-y-1.5 pt-2 border-t text-sm text-foreground/90">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Academic Qualifications
                </p>
                {member.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t flex flex-wrap items-center gap-4 text-sm font-mono">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{member.email}</span>
                </a>
              )}
              {member.phone && (
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{member.phone}</span>
                </div>
              )}
              {member.cvUrl && (
                <a
                  href={member.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 transition-opacity ml-auto"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Official CV (PDF)</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  // Current Research Interns Sub-Tab (Cards formatted like Dr. Murk Marvi's card)
  const InternsContent = () => (
    <div className="mt-8 space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-mono text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{interns.length}</span> active Research Interns
        </p>

        {/* View Switcher */}
        <div className="inline-flex items-center rounded-lg border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setInternViewMode("cards")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              internViewMode === "cards"
                ? "bg-card text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Profile Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setInternViewMode("table")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              internViewMode === "table"
                ? "bg-card text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>Directory Table</span>
          </button>
        </div>
      </div>

      {internViewMode === "cards" ? (
        /* Rich Profile Cards (2-column responsive grid) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {interns.map((intern, idx) => (
            <motion.div
              key={intern.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="rounded-2xl border bg-card p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start group"
            >
              {/* Photo */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-primary/20 shrink-0 shadow-xs bg-muted">
                <img
                  src={intern.image}
                  alt={intern.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Information */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary mb-2">
                    <UserCheck className="w-3.5 h-3.5" />
                    {intern.role}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {intern.name}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Department of Computer Science & Information Technology, NED University
                  </p>
                </div>

                {/* Institutional Email and LinkedIn */}
                <div className="pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <a
                    href={`mailto:${intern.email}`}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate max-w-[200px]">{intern.email}</span>
                  </a>

                  {intern.linkedin && (
                    <a
                      href={intern.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-medium transition-colors"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                      <span>Profile</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Compact Directory Table View */
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-4 px-6 font-semibold">#</th>
                <th className="py-4 px-6 font-semibold">Name</th>
                <th className="py-4 px-6 font-semibold">Institutional Email</th>
                <th className="py-4 px-6 font-semibold text-right">LinkedIn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {interns.map((intern, idx) => (
                <tr
                  key={intern.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground">
                    {(idx + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="py-3 px-6 font-medium text-foreground group-hover:text-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={intern.image}
                        alt={intern.name}
                        className="w-9 h-9 rounded-full object-cover border border-border shadow-2xs shrink-0"
                      />
                      <span className="font-semibold">{intern.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground">
                    <a
                      href={`mailto:${intern.email}`}
                      className="hover:underline flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-muted-foreground/60" />
                      {intern.email}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {intern.linkedin && (
                      <a
                        href={intern.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                        <span>Profile</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground/60" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  // Pending placeholder for Postgraduate & Undergraduate
  const PendingContent = ({ role }: { role: string }) => (
    <div className="mt-8 p-12 text-center rounded-xl border border-dashed bg-muted/20">
      <GraduationCap className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
      <h3 className="text-lg font-semibold mb-1">{role}</h3>
      <p className="text-sm font-mono text-muted-foreground">
        Information pending institutional confirmation.
      </p>
    </div>
  )

  // Tab definitions: Honeycomb Overview is default (first tab)
  const tabs = [
    {
      id: "overview",
      label: `All Members (${teamData.length})`,
      content: <HoneycombContent />,
    },
    {
      id: "faculty",
      label: "Faculty Members",
      content: <FacultyContent />,
    },
    {
      id: "interns",
      label: `Research Interns (${interns.length})`,
      content: <InternsContent />,
    },
    {
      id: "postgrad",
      label: "Postgraduate Students",
      content: <PendingContent role="Postgraduate Students" />,
    },
    {
      id: "undergrad",
      label: "Undergraduate Students",
      content: <PendingContent role="Undergraduate Students" />,
    },
  ]

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl min-h-[calc(100vh-4rem)]">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-mono font-medium text-primary mb-4">
          <Users className="w-3.5 h-3.5" />
          AIR Lab Members
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Our Team
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Faculty, research interns, and scholars contributing to research and innovation at AIR Lab.
        </p>
      </div>

      <Tabs tabs={tabs} defaultTab="overview" />
    </div>
  )
}

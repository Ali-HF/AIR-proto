import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, FileText, Phone, ExternalLink, GraduationCap, Users } from 'lucide-react'
import teamData from '../data/team.json'
import previousInternsData from '../data/previous_interns.json'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'
import StudentApplicationModal from '../components/StudentApplicationModal'

const Linkedin = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const HEXAGON_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

type TabType = 'all' | 'faculty' | 'interns' | 'previous' | 'postgrad' | 'undergrad'

export default function Team() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [applyModalOpen, setApplyModalOpen] = useState(false)

  // Faculty coordinator
  const faculty = teamData.filter(m => m.category === 'Faculty')
  // Research interns
  const currentInterns = teamData.filter(m => m.category === 'Research Interns')

  // Row mapping for 4 - 3 - 4 Honeycomb layout
  const row1 = [
    teamData.find(m => m.id === 'ri1') || teamData[1],
    teamData.find(m => m.id === 'f1') || teamData[0], // Dr. Murk Marvi (Lead)
    teamData.find(m => m.id === 'ri2') || teamData[2],
    teamData.find(m => m.id === 'ri3') || teamData[3],
  ]

  const row2 = [
    teamData.find(m => m.id === 'ri4') || teamData[4],
    teamData.find(m => m.id === 'ri5') || teamData[5],
    teamData.find(m => m.id === 'ri6') || teamData[6],
  ]

  const row3 = [
    teamData.find(m => m.id === 'ri7') || teamData[7],
    teamData.find(m => m.id === 'ri8') || teamData[8],
    teamData.find(m => m.id === 'ri9') || teamData[9],
    teamData.find(m => m.id === 'ri10') || teamData[10],
  ]

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'all', label: 'All Members', count: teamData.length },
    { id: 'faculty', label: 'Faculty', count: faculty.length },
    { id: 'interns', label: 'Research Interns', count: currentInterns.length },
    { id: 'previous', label: 'Previous Interns', count: previousInternsData.length },
    { id: 'postgrad', label: 'Postgraduate' },
    { id: 'undergrad', label: 'Undergraduate' },
  ]

  // Hexagon Component with Hairline border, B&W dormant image, color pop on hover, LEAD black pill, frosted glass overlay
  const HexagonCard = ({ member }: { member: any }) => {
    if (!member) return null
    const isLead = member.isLead || member.id === 'f1'

    return (
      <div
        tabIndex={0}
        role="group"
        aria-label={`${member.name} - ${member.role}`}
        className="group relative block w-[110px] h-[126px] sm:w-[142px] sm:h-[162px] md:w-[165px] md:h-[190px] focus:outline-none transition-transform duration-300 hover:z-40 hover:scale-105 cursor-pointer"
      >
        {/* Hairline hexagon border container */}
        <div
          className={`w-full h-full p-[1.5px] transition-all duration-300 ${
            isLead
              ? 'bg-[#0B0B0F] shadow-sm'
              : 'bg-[var(--line)] group-hover:bg-[#0B0B0F]'
          }`}
          style={{ clipPath: HEXAGON_CLIP }}
        >
          <div
            className="w-full h-full bg-[var(--surface)] relative overflow-hidden flex items-center justify-center"
            style={{ clipPath: HEXAGON_CLIP }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-500 filter grayscale contrast-[1.02] group-hover:grayscale-0 group-hover:scale-108"
              loading="lazy"
            />

            {/* Frosted Glass Hover Overlay */}
            <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-2 bg-[rgba(11,11,15,0.72)] backdrop-blur-[8px] flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
              <span className="text-[9px] sm:text-[10px] font-mono font-medium text-white/70 uppercase tracking-wider line-clamp-1">
                {isLead ? 'Faculty Lead' : 'Intern'}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white leading-tight line-clamp-1 px-1">
                {member.name}
              </span>

              <div className="flex items-center gap-1.5 mt-1">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    onClick={e => e.stopPropagation()}
                    title={`Email ${member.name}`}
                    className="w-5 h-5 rounded-full bg-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-2.5 h-2.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    title="LinkedIn Profile"
                    className="w-5 h-5 rounded-full bg-white/20 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-2.5 h-2.5" />
                  </a>
                )}
                {member.cvUrl && (
                  <a
                    href={member.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    title="View Official CV"
                    className="w-5 h-5 rounded-full bg-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors"
                  >
                    <FileText className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* LEAD Badge: Black Pill */}
            {isLead && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0B0B0F] text-[9px] font-mono font-bold text-white tracking-wider uppercase shadow-xs">
                LEAD
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans">
      {/* Header */}
      <div className="mb-12 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="white" icon={<Users className="w-3.5 h-3.5" />}>
              RESEARCH FACULTY & FELLOWS
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
            Our Team
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] leading-relaxed font-normal">
            Faculty leads, research interns, and scholars contributing to foundational AI and autonomous systems at AIR Lab.
          </p>
        </SectionReveal>
      </div>

      {/* ── Sub-tabs as a Segmented Control: white pill container with hairline border ── */}
      <div className="mb-12 overflow-x-auto pb-2 flex justify-start">
        <div className="inline-flex items-center gap-1 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-full shadow-[var(--shadow-sm)]">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0B0B0F] text-white shadow-xs'
                    : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <sup className={`ml-1 text-[10px] font-mono ${isActive ? 'text-white/70' : 'text-[var(--ink-3)]'}`}>
                    {tab.count}
                  </sup>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {/* ── TAB 1: ALL MEMBERS (4-3-4 HONEYCOMB LAYOUT) ── */}
        {activeTab === 'all' && (
          <motion.div
            key="all"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-10"
          >
            {/* Explanatory subtitle */}
            <div className="text-center max-w-xl mx-auto">
              <p className="text-[13px] text-[var(--ink-2)]">
                Hover over any member to view details and quick contact links. Explore sub-tabs for complete profiles.
              </p>
            </div>

            {/* Interlocking 3-Row Honeycomb (4 - 3 - 4 layout) */}
            <div className="relative py-6 flex flex-col items-center justify-center overflow-x-auto">
              <div className="min-w-[340px] sm:min-w-[500px] md:min-w-[690px] flex flex-col items-center select-none py-2">
                {/* Row 1: 4 Hexagons */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 z-30">
                  {row1.map(m => (
                    <HexagonCard key={m.id} member={m} />
                  ))}
                </div>

                {/* Row 2: 3 Hexagons (Shifted up with negative margin to interlock) */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 -mt-7 sm:-mt-10 md:-mt-12 z-20">
                  {row2.map(m => (
                    <HexagonCard key={m.id} member={m} />
                  ))}
                </div>

                {/* Row 3: 4 Hexagons (Shifted up with negative margin to interlock) */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 -mt-7 sm:-mt-10 md:-mt-12 z-10">
                  {row3.map(m => (
                    <HexagonCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: FACULTY (Large white card with aurora corner bloom) ── */}
        {activeTab === 'faculty' && (
          <motion.div
            key="faculty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {faculty.map(f => (
              <div
                key={f.id}
                className="craftly-card p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group"
              >
                {/* Aurora Corner Bloom (top-right, blur 60px, 25% opacity) */}
                <div
                  className="absolute -top-12 -right-12 w-72 h-72 rounded-full pointer-events-none opacity-25 blur-[60px]"
                  style={{ background: 'var(--aurora)' }}
                  aria-hidden="true"
                />

                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-[var(--line)] shrink-0 shadow-sm bg-[#EDEDF0]">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover portrait-grayscale"
                  />
                </div>

                <div className="flex-1 space-y-4 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Badge variant="dark" icon={<GraduationCap className="w-3.5 h-3.5 text-white" />}>
                        {f.role}
                      </Badge>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-medium font-head text-[var(--ink)]">
                      {f.name}
                    </h2>
                    <p className="text-sm font-medium text-[var(--ink-2)] mt-1">
                      {f.designation}
                    </p>
                  </div>

                  {f.qualifications && (
                    <div className="space-y-1.5 pt-3 border-t border-[var(--line)] text-sm">
                      <p className="text-xs font-mono uppercase tracking-wider text-[var(--ink-3)] font-semibold mb-2">
                        Academic Qualifications
                      </p>
                      {f.qualifications.map((q: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--ink-2)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0F] shrink-0" />
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-4 text-xs font-mono">
                    {f.phone && (
                      <div className="flex items-center gap-1.5 text-[var(--ink-2)]">
                        <Phone className="w-3.5 h-3.5 text-[var(--ink-3)]" />
                        <span>{f.phone}</span>
                      </div>
                    )}
                    {f.email && (
                      <a
                        href={`mailto:${f.email}`}
                        className="flex items-center gap-1.5 text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[var(--ink-3)]" />
                        <span>{f.email}</span>
                      </a>
                    )}
                    {f.cvUrl && (
                      <a
                        href={f.cvUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 px-4 rounded-full bg-[#0B0B0F] text-white text-xs font-medium inline-flex items-center gap-1.5 shadow-sm hover:bg-[#202028] transition-colors"
                      >
                        <span>Official CV</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── TAB 3: CURRENT RESEARCH INTERNS (3-4 col grid of white cards) ── */}
        {activeTab === 'interns' && (
          <motion.div
            key="interns"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentInterns.map(intern => (
              <div
                key={intern.id}
                className="craftly-card p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-[#EDEDF0] border border-[var(--line)]">
                      <img
                        src={intern.image}
                        alt={intern.name}
                        className="w-full h-full object-cover portrait-grayscale"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-medium font-head text-[var(--ink)] truncate">
                        {intern.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[var(--ink-3)] uppercase block">
                        {intern.role}
                      </span>
                      <div className="text-[11px] text-[var(--ink-2)] mt-0.5 truncate">
                        {intern.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono">
                  <a
                    href={`mailto:${intern.email}`}
                    className="text-[var(--ink-2)] hover:text-[var(--ink)] flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3 h-3" /> Email
                  </a>
                  {intern.linkedin && (
                    <a
                      href={intern.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--ink-2)] hover:text-[#0B0B0F] flex items-center gap-1.5 transition-colors"
                    >
                      <Linkedin className="w-3 h-3" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── TAB 4: PREVIOUS INTERNS (Clean table with hairline rows, no zebra striping) ── */}
        {activeTab === 'previous' && (
          <motion.div
            key="previous"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="craftly-card overflow-hidden">
              <div className="p-6 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium font-head text-[var(--ink)]">
                    Previous Research Interns & Alumni
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-2)] mt-0.5 font-normal">
                    Scholars who completed applied AI and machine learning research tenures at AIR Lab.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F4F4F6] text-[var(--ink)] border border-[var(--line)] shrink-0">
                  {previousInternsData.length} Alumni Recorded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                  <thead>
                    <tr className="border-b border-[var(--line)] font-mono text-[11px] uppercase tracking-wider text-[var(--ink-3)]">
                      <th className="py-3.5 px-6 font-medium">Name</th>
                      <th className="py-3.5 px-6 font-medium">Affiliation</th>
                      <th className="py-3.5 px-6 font-medium">NED Student Email</th>
                      <th className="py-3.5 px-6 text-right font-medium">LinkedIn Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {previousInternsData.map(p => (
                      <tr key={p.id} className="hover:bg-[#F9F9FB] transition-colors">
                        <td className="py-3.5 px-6 font-medium text-[var(--ink)]">
                          {p.name}
                        </td>
                        <td className="py-3.5 px-6 text-[var(--ink-2)] font-mono text-xs">
                          {p.tenure} • {p.department}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-xs text-[var(--ink-2)]">
                          <a href={`mailto:${p.email}`} className="hover:text-[var(--ink)] hover:underline">
                            {p.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <a
                            href={p.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F6] text-[var(--ink)] hover:bg-[#0B0B0F] hover:text-white transition-all text-xs font-mono"
                          >
                            <Linkedin className="w-3 h-3" />
                            <span>LinkedIn Profile</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 5 & TAB 6: POSTGRADUATE / UNDERGRADUATE ── */}
        {(activeTab === 'postgrad' || activeTab === 'undergrad') && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="craftly-card p-12 text-center max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-[#F4F4F6] border border-[var(--line)] text-[var(--ink)] mx-auto flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-medium font-head text-[var(--ink)] mb-2">
              {activeTab === 'postgrad' ? 'Postgraduate MS & PhD Scholars' : 'Undergraduate Research Scholars'}
            </h3>
            <p className="text-[14.5px] text-[var(--ink-2)] max-w-md mx-auto mb-8 font-normal leading-relaxed">
              Nominations and batch appointments for {activeTab === 'postgrad' ? 'MS & PhD thesis scholars' : 'undergraduate capstone fellowships'} are currently in progress. Apply now to secure research placement for the upcoming session.
            </p>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="h-11 px-6 rounded-full bg-[#0B0B0F] text-white text-xs font-medium cursor-pointer shadow-sm hover:bg-[#202028] transition-all"
            >
              Apply for Research Placement →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Application Modal */}
      <StudentApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  )
}

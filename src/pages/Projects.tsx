import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, Search, ArrowUpRight } from 'lucide-react'
import projectsData from '../data/projects.json'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'

type Category = 'All' | 'Funded' | 'R&D' | 'Undergraduate' | 'Postgraduate'

export default function Projects() {
  const [active, setActive] = useState<Category>('All')
  const [query, setQuery] = useState('')

  const filtered = projectsData.filter(p => {
    const matchesCat = active === 'All' || p.category === active
    const matchesSearch =
      query === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.supervisor.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesSearch
  })

  const categories: Category[] = ['All', 'Funded', 'R&D', 'Undergraduate', 'Postgraduate']

  const getAuroraDot = (category: string) => {
    switch (category) {
      case 'Funded':
        return '#4F8BFF' // Aurora blue
      case 'R&D':
        return '#F25CC1' // Aurora pink
      case 'Postgraduate':
        return '#8B7BFF' // Aurora violet
      case 'Undergraduate':
        return '#FF7A45' // Aurora orange
      default:
        return '#FFD24D' // Aurora yellow
    }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans">
      {/* Header */}
      <div className="mb-12 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="white" icon={<FolderGit2 className="w-3.5 h-3.5" />}>
              APPLIED SYSTEMS & GRANTS
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
            Research & Development Projects
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] leading-relaxed font-normal">
            From state-funded national grant initiatives to innovative undergraduate capstones and open-source models.
          </p>
        </SectionReveal>
      </div>

      {/* ── Filter chips as pill toggles & Search ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-[var(--line)]">
        {/* Pill Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer select-none ${
                active === cat
                  ? 'bg-[#0B0B0F] text-white shadow-xs'
                  : 'bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--line)] hover:text-[var(--ink)] hover:border-[rgba(11,11,15,0.2)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-3)]" />
          <input
            type="text"
            placeholder="Search projects, leads..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/20 transition-all shadow-[var(--shadow-sm)]"
          />
        </div>
      </div>

      {/* ── Project Cards (White, 28px radius, aurora colored dot, hover lifts 4px + shadow grows) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active + query}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filtered.map((proj, i) => (
            <div
              key={proj.id}
              className="craftly-card p-6 flex flex-col justify-between group overflow-hidden"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <div>
                {/* Media Image Thumbnail (rounded-2xl) */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-[#EDEDF0] mb-5 border border-[var(--line)]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover portrait-grayscale group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {/* Small colored dot tag using the aurora stops */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[11px] font-medium text-[var(--ink)] shadow-xs">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getAuroraDot(proj.category) }}
                      />
                      {proj.category}
                    </span>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#0B0B0F]/80 text-white backdrop-blur-sm">
                      {proj.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/90 bg-black/50 backdrop-blur-sm">
                      {proj.metric}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[18px] sm:text-[19px] font-medium font-head text-[var(--ink)] mb-2 group-hover:text-black leading-snug">
                  {proj.title}
                </h3>
                <p className="text-[13.5px] text-[var(--ink-2)] leading-relaxed mb-4 line-clamp-3 font-normal">
                  {proj.description}
                </p>

                <div className="text-[11.5px] font-mono text-[var(--ink-2)] space-y-1 pt-3 border-t border-[var(--line)]">
                  <div>
                    Lead: <span className="text-[var(--ink)] font-semibold">{proj.supervisor}</span>
                  </div>
                  <div>
                    Grant: <span className="text-[var(--ink)] font-semibold">{proj.funding}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--ink-3)]">REF #{proj.id}</span>
                <span className="text-[var(--ink)] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 border border-dashed border-[var(--line)] rounded-[28px] bg-[var(--surface)]">
          <p className="text-sm font-mono text-[var(--ink-2)]">No projects match the selected criteria.</p>
        </div>
      )}
    </div>
  )
}

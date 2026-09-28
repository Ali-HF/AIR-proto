import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Copy, Check, ExternalLink } from 'lucide-react'
import pubData from '../data/publications.json'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'

export default function Publications() {
  const [activeVenue, setActiveVenue] = useState('All')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const venues = ['All', 'NeurIPS', 'CVPR', 'ACL', 'ICLR Workshop']

  const filtered = pubData.filter(p => {
    if (activeVenue === 'All') return true
    return p.venue.includes(activeVenue)
  })

  const copyBibtex = (p: typeof pubData[0]) => {
    const bib = `@inproceedings{air_${p.id},\n  title={${p.title}},\n  author={${p.authors}},\n  booktitle={${p.venue}},\n  year={${p.year}}\n}`
    navigator.clipboard.writeText(bib)
    setCopiedId(p.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans">
      {/* Header */}
      <div className="mb-12 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="white" icon={<BookOpen className="w-3.5 h-3.5" />}>
              PEER-REVIEWED SCIENTIFIC OUTPUT
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
            Publications & Preprints
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] leading-relaxed font-normal">
            Groundbreaking conference papers, journal articles, and open benchmark releases from AIR Lab scholars.
          </p>
        </SectionReveal>
      </div>

      {/* Filter Tabs as Pill Toggles */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--line)] pb-6">
        {venues.map(v => (
          <button
            key={v}
            onClick={() => setActiveVenue(v)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer select-none ${
              activeVenue === v
                ? 'bg-[#0B0B0F] text-white shadow-xs'
                : 'bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--line)] hover:text-[var(--ink)] hover:border-[rgba(11,11,15,0.2)]'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVenue}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {filtered.map((pub, i) => (
              <div
                key={pub.id}
                className="craftly-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#F4F4F6] text-[var(--ink)] border border-[var(--line)]">
                      {pub.venue}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono text-[var(--ink-3)]">
                      Year {pub.year}
                    </span>
                    <span className="text-xs font-mono text-[var(--ink-3)]">#PUB-{pub.id}</span>
                  </div>

                  <h3 className="text-[19px] sm:text-[21px] font-medium font-head text-[var(--ink)] group-hover:text-black leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] font-mono text-[var(--ink-2)]">
                    Authors: <span className="text-[var(--ink)] font-semibold">{pub.authors}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--line)]">
                  <button
                    onClick={() => copyBibtex(pub)}
                    className="h-9 px-3.5 rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[rgba(11,11,15,0.25)] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer text-[var(--ink-2)] hover:text-[var(--ink)]"
                    title="Copy BibTeX Citation"
                  >
                    {copiedId === pub.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--ink-3)]" />
                        <span>BibTeX</span>
                      </>
                    )}
                  </button>

                  <a
                    href={pub.link}
                    className="h-9 px-4 rounded-full bg-[#0B0B0F] text-white text-xs font-medium shadow-xs hover:bg-[#202028] transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Paper PDF</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

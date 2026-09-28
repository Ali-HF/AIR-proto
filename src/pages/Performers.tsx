import { Trophy, Medal, Sparkles, Flame } from 'lucide-react'
import performersData from '../data/performers.json'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'

export default function Performers() {
  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans">
      {/* Header */}
      <div className="mb-14 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="white" icon={<Trophy className="w-3.5 h-3.5" />}>
              ACADEMIC EXCELLENCE & HALL OF FAME
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
            High Performers of the Month
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] leading-relaxed font-normal">
            Honoring outstanding researchers, breakthrough paper leads, and engineering champions at AIR Lab.
          </p>
        </SectionReveal>
      </div>

      {/* Podium Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {performersData.map((perf, index) => {
          const isGold = perf.rank === 1

          return (
            <SectionReveal key={perf.id} staggerIndex={index}>
              <div
                className="craftly-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden h-full"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div>
                  {/* Top Rank Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 ${
                          isGold
                            ? 'bg-[#0B0B0F] text-white shadow-xs'
                            : 'bg-[#F4F4F6] text-[var(--ink)] border border-[var(--line)]'
                        }`}
                      >
                        <Medal className="w-3.5 h-3.5" /> Rank #{perf.rank}
                      </span>
                      <span className="text-xs font-mono text-[var(--ink-3)]">{perf.month}</span>
                    </div>

                    <span className="text-xs font-mono text-[var(--ink)] font-semibold">
                      {perf.metrics.citations} Citations
                    </span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[var(--line)] bg-[#EDEDF0]">
                      <img
                        src={perf.image}
                        alt={perf.name}
                        className="w-full h-full object-cover portrait-grayscale group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-medium font-head text-[var(--ink)]">
                        {perf.name}
                      </h3>
                      <p className="font-mono text-xs text-[var(--ink-2)] font-medium uppercase tracking-wider mt-0.5">
                        {perf.role}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {perf.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#F4F4F6] border border-[var(--line)] text-[var(--ink-2)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievement Highlight */}
                  <div className="rounded-2xl bg-[#F8F8FA] border border-[var(--line)] p-4 mb-6">
                    <h4 className="text-sm font-medium font-head text-[var(--ink)] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#4F8BFF]" />
                      {perf.title}
                    </h4>
                    <p className="text-[13px] text-[var(--ink-2)] leading-relaxed font-normal">
                      {perf.achievement}
                    </p>
                  </div>
                </div>

                {/* Metrics Footer */}
                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
                  <span>Impact Factor: <strong className="text-[var(--ink)] font-medium">Flagship Level</strong></span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> SOTA Verified
                  </span>
                </div>
              </div>
            </SectionReveal>
          )
        })}
      </div>
    </div>
  )
}

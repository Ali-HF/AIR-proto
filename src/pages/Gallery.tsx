import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Maximize2 } from 'lucide-react'
import galleryData from '../data/gallery.json'
import Badge from '../components/ui/Badge'
import SectionReveal from '../components/ui/SectionReveal'

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null)

  const categories = ['All', 'Infrastructure', 'Robotics', 'Events', 'Hardware', 'Hackathons', 'Delegations']

  const filtered = galleryData.filter(g => {
    if (activeCat === 'All') return true
    return g.cat === activeCat
  })

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-28 px-6 max-w-[1200px] mx-auto relative font-sans">
      {/* Header */}
      <div className="mb-12 text-left max-w-3xl">
        <SectionReveal delay={0}>
          <div className="mb-4">
            <Badge variant="white" icon={<Camera className="w-3.5 h-3.5" />}>
              MEDIA, SIGHTS & LAB LIFE
            </Badge>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h1 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
            Laboratory Gallery & Media
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] leading-relaxed font-normal">
            Visual documentation of supercomputer commissioning, outdoor drone flight trials, hardware prototyping, and hackathons.
          </p>
        </SectionReveal>
      </div>

      {/* Category Filter Chips as Pill Toggles */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--line)] pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer select-none ${
              activeCat === cat
                ? 'bg-[#0B0B0F] text-white shadow-xs'
                : 'bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--line)] hover:text-[var(--ink)] hover:border-[rgba(11,11,15,0.2)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Grid Gallery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6"
        >
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`${item.span} h-full`}
            >
              <div
                onClick={() => setSelectedImage(item)}
                className="h-full relative rounded-[24px] overflow-hidden border border-[var(--line)] bg-[#EDEDF0] cursor-pointer group shadow-[var(--shadow-card)]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover portrait-grayscale group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white/95 text-[var(--ink)]">
                    {item.cat}
                  </span>
                  <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <h3 className="text-base sm:text-lg font-medium font-head text-white leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-[rgba(11,11,15,0.7)] backdrop-blur-[16px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-[var(--surface)] border border-[var(--line)] rounded-[28px] overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[65vh] w-full bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[65vh]"
                />
              </div>

              <div className="p-6">
                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#F4F4F6] text-[var(--ink)] mb-2">
                  {selectedImage.cat}
                </div>
                <h3 className="text-xl font-medium font-head text-[var(--ink)] mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-[var(--ink-2)]">{selectedImage.desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react'
import AirLabLogo from './AirLabLogo'
import ParticleField from './ParticleField'
import StudentApplicationModal from './StudentApplicationModal'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Track scroll for sticky navbar hairline border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileMenuOpen(prev => (prev ? false : prev))
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Projects', path: '/projects' },
    { name: 'Publications', path: '/publications' },
    { name: 'Collaborations', path: '/collaborations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Performers', path: '/performers' },
    { name: 'Interns', path: '/interns' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[var(--ink)] relative selection:bg-[#0B0B0F] selection:text-white font-sans antialiased">
      {/* ── Single shared ParticleField behind everything ── */}
      <ParticleField />

      {/* ── 1. Vacancy Ribbon (Slim white bar, hairline border, black pill badge, gray text, black pill button) ── */}
      <div className="w-full bg-[var(--surface)] border-b border-[var(--line)] text-xs font-medium py-2 px-4 sm:px-6 relative z-50">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            {/* Small black pill badge "Applications Open" with soft pulsing dot */}
            <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-[#0B0B0F] text-white text-[11px] font-medium tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Applications Open
            </span>
            <span className="text-[13px] text-[var(--ink-2)] font-normal">
              Student Research Internship & Fellowship Vacancies Open for Fall 2026 — NEDUET CSIT
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setApplyModalOpen(true)}
              className="group inline-flex items-center gap-1.5 h-7 px-3.5 rounded-full bg-[#0B0B0F] text-white text-[11px] font-medium tracking-tight hover:bg-[#202028] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href="https://cct.neduet.edu.pk/AIR"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
            >
              NED Portal <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Sticky Navbar (Height 64px, rgba(255,255,255,.7) + blur(16px), hairline bottom border on scroll) ── */}
      <header
        className={`sticky top-0 z-40 h-[64px] transition-all duration-200 ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.75)] backdrop-blur-[16px] border-b border-[var(--line)] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            : 'bg-[rgba(255,255,255,0.65)] backdrop-blur-[16px] border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between gap-4">
          {/* Left: AIR Lab logo + wordmark */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <AirLabLogo height={34} />
          </Link>

          {/* Center: Nav links in 14-15px ink-2, active = ink with 2px underline dot */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative text-[14.5px] font-medium transition-colors py-1 ${
                    isActive
                      ? 'text-[var(--ink)] font-semibold'
                      : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--ink)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: "Contact" text link + black pill CTA "Apply Now" */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="mailto:contact@airlab.neduet.edu.pk"
              className="hidden md:inline-flex text-[14px] font-medium text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
            >
              Contact
            </a>

            <button
              onClick={() => setApplyModalOpen(true)}
              className="group inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-[#0B0B0F] text-white text-[13px] font-medium tracking-tight hover:bg-[#202028] transition-all duration-150 cursor-pointer shadow-[var(--shadow-sm)] active:scale-[0.98]"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[rgba(11,11,15,0.2)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile: Full-width frosted sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-[64px] left-0 right-0 bg-[rgba(255,255,255,0.92)] backdrop-blur-[24px] border-b border-[var(--line)] px-6 py-6 shadow-xl"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--ink)] text-white'
                          : 'bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--line)] hover:text-[var(--ink)]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
                <a
                  href="mailto:contact@airlab.neduet.edu.pk"
                  className="text-xs text-[var(--ink-2)] hover:text-[var(--ink)]"
                >
                  contact@airlab.neduet.edu.pk
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setApplyModalOpen(true)
                  }}
                  className="h-8 px-4 rounded-full bg-[#0B0B0F] text-white text-xs font-medium"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main Page Content ── */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* ── 3. Footer (White, hairline top border, 4-column link grid, small gray text, large faint AIR Lab wordmark at bottom, NED CSIT credit) ── */}
      <footer className="w-full bg-[var(--surface)] border-t border-[var(--line)] pt-16 pb-12 relative z-20 font-sans">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[var(--line)]">
            {/* Column 1: Lab Identity */}
            <div className="space-y-3.5">
              <Link to="/" className="inline-block py-0.5">
                <AirLabLogo height={32} />
              </Link>
              <p className="text-[13.5px] text-[var(--ink-2)] leading-relaxed max-w-sm">
                The Artificial Intelligence Research Laboratory, Department of Computer Science & Information Technology (CSIT), NED University of Engineering & Technology. Advancing foundation models, edge perception, and robotics.
              </p>
              <div className="pt-1 text-[12.5px] text-[var(--ink-3)] space-y-1">
                <div>NED University Main Campus, Karachi 75270</div>
                <div>contact@airlab.neduet.edu.pk</div>
              </div>
            </div>

            {/* Column 2: Research */}
            <div>
              <h5 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-4 font-head">
                Research
              </h5>
              <ul className="space-y-2.5 text-[14px] text-[var(--ink-2)]">
                <li><Link to="/projects" className="hover:text-[var(--ink)] transition-colors">Projects Catalog</Link></li>
                <li><Link to="/publications" className="hover:text-[var(--ink)] transition-colors">Publications</Link></li>
                <li><Link to="/collaborations" className="hover:text-[var(--ink)] transition-colors">Industry Alliances</Link></li>
                <li><Link to="/gallery" className="hover:text-[var(--ink)] transition-colors">Lab Gallery</Link></li>
              </ul>
            </div>

            {/* Column 3: People */}
            <div>
              <h5 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-4 font-head">
                People
              </h5>
              <ul className="space-y-2.5 text-[14px] text-[var(--ink-2)]">
                <li><Link to="/team" className="hover:text-[var(--ink)] transition-colors">Faculty & Scholars</Link></li>
                <li><Link to="/performers" className="hover:text-[var(--ink)] transition-colors">Performers of the Month</Link></li>
                <li><Link to="/interns" className="hover:text-[var(--ink)] transition-colors">Research Interns</Link></li>
                <li><Link to="/about" className="hover:text-[var(--ink)] transition-colors">About the Lab</Link></li>
              </ul>
            </div>

            {/* Column 4: NED CSIT Credit & External */}
            <div>
              <h5 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-4 font-head">
                NED CSIT
              </h5>
              <ul className="space-y-2.5 text-[14px] text-[var(--ink-2)]">
                <li>
                  <a href="https://cct.neduet.edu.pk/AIR" target="_blank" rel="noreferrer" className="hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1">
                    Official Portal <ExternalLink className="w-3 h-3 text-[var(--ink-3)]" />
                  </a>
                </li>
                <li>
                  <a href="https://www.neduet.edu.pk" target="_blank" rel="noreferrer" className="hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1">
                    NED University <ExternalLink className="w-3 h-3 text-[var(--ink-3)]" />
                  </a>
                </li>
                <li>
                  <button onClick={() => setApplyModalOpen(true)} className="hover:text-[var(--ink)] transition-colors cursor-pointer text-left">
                    Internship Portal
                  </button>
                </li>
                <li>
                  <a href="mailto:contact@airlab.neduet.edu.pk" className="hover:text-[var(--ink)] transition-colors">
                    Inquiries & Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Large faint AIR Lab wordmark at bottom */}
          <div className="pt-10 pb-4 text-center select-none overflow-hidden">
            <span className="block text-[clamp(48px,12vw,130px)] font-bold tracking-tight text-[rgba(11,11,15,0.035)] font-head leading-none whitespace-nowrap">
              AIR LAB NEDUET
            </span>
          </div>

          {/* Bottom credit line */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[12.5px] text-[var(--ink-3)] gap-3 pt-4 border-t border-[var(--line)]">
            <div>
              &copy; {new Date().getFullYear()} Artificial Intelligence Research Lab &bull; Department of CSIT, NED University.
            </div>
            <div className="flex items-center gap-3">
              <span>National AI Sovereignty</span>
              <span>&bull;</span>
              <span>Theoretical & Applied Computing</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Student Application Modal ── */}
      <StudentApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  )
}

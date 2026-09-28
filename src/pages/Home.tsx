import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Brain,
  Eye,
  Bot,
  Layers,
  Database,
  ShieldCheck,
  Check,
  Send,
  User,
} from 'lucide-react'
import AuroraBackground from '../components/ui/AuroraBackground'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Accordion from '../components/ui/Accordion'
import SectionReveal from '../components/ui/SectionReveal'
import StudentApplicationModal from '../components/StudentApplicationModal'

const collaborators = [
  'PLAID',
  'Grasshopper',
  'PAI 02',
  'commune',
  'DeepMind',
  'Numeral',
  'perplexity',
  'NVIDIA Research',
  'HEC Pakistan',
  'NEDUET CSIT',
]

const featuredProjects = [
  {
    title: 'UrduLLM — Bilingual Foundation Model',
    tag: 'Foundation Models',
    badge: 'SLURM Supercluster',
    desc: 'Bilingual Urdu-English transformer architecture benchmarked on regional statutes, biomedical literature, and low-resource vernacular syntax for national computational sovereignty.',
    actionLabel: 'Deploy Model',
    secondaryLabel: 'View Weights',
    metric: '12.4B Tokens',
    accent: '#4F8BFF',
  },
  {
    title: 'EdgeVision — Low-Latency Transit AI',
    tag: 'Autonomous Perception',
    badge: '60 FPS @ 5W',
    desc: 'Real-time urban edge perception deployed across Karachi traffic corridors for adaptive signal timing, multi-class vehicle trajectory tracking, and safety anomaly alerts.',
    actionLabel: 'Inspect Pipeline',
    secondaryLabel: 'Field Metrics',
    metric: '60 FPS Embedded',
    accent: '#F25CC1',
  },
  {
    title: 'AgriSwarm — Autonomous UAV Collective',
    tag: 'Robotics & Swarms',
    badge: 'Multispectral SLAM',
    desc: 'Cooperative drone fleet utilizing decentralized visual odometry and multispectral imaging for autonomous crop stress identification and micro-fertilizer optimization.',
    actionLabel: 'Simulate Swarm',
    secondaryLabel: 'ROS2 Docs',
    metric: '98.2% Accuracy',
    accent: '#FF7A45',
  },
]

const cardFeatures = [
  {
    icon: Brain,
    title: 'Foundation Models & NLP',
    desc: 'State-of-the-art transformer pretraining and tokenization specialized for Urdu, regional vernaculars, and multi-modal alignment.',
    link: '/projects',
  },
  {
    icon: Eye,
    title: 'Edge Computer Vision',
    desc: 'Lightweight neural networks optimized for NVIDIA Jetson and low-power embedded processors executing real-time object detection.',
    link: '/projects',
  },
  {
    icon: Bot,
    title: 'Autonomous Robotics & Swarms',
    desc: 'Multi-agent robotic coordination, decentralized SLAM, and cooperative path planning for precision agriculture and inspection.',
    link: '/projects',
  },
  {
    icon: Layers,
    title: 'Distributed Supercomputing',
    desc: 'High-throughput cluster partitions interconnected via high-speed fabric for large-scale distributed neural network pretraining.',
    link: '/projects',
  },
  {
    icon: ShieldCheck,
    title: 'Ethical & Robust AI',
    desc: 'Empirical model safety verification, explainability toolkits, and bias audit pipelines ensuring responsible deployment in critical sectors.',
    link: '/about',
  },
  {
    icon: Database,
    title: 'Open Datasets & Benchmarks',
    desc: 'Curated standardized datasets and reproducible benchmarks advancing machine learning research across Pakistani academic institutions.',
    link: '/publications',
  },
]

const faqs = [
  {
    q: 'What is the right fellowship or collaboration track for me?',
    a: 'We offer specialized tracks for postgraduate researchers (12B+ foundation models), undergraduate scholars (edge robotics & CV), and industrial partners (custom model alignment, on-prem deployments, and sponsored labs).',
  },
  {
    q: 'How do compute allocations work on the lab supercluster?',
    a: 'Selected fellows and verified projects receive dedicated SLURM partitions on high-performance compute clusters interconnected via high-speed fabric for multi-node distributed pretraining.',
  },
  {
    q: 'Can researchers access additional GPU hours at any time?',
    a: 'Yes. High-priority training jobs and paper submission deadlines receive priority burst quotas through our automated compute scheduler.',
  },
  {
    q: 'How can outside teams and enterprise partners collaborate with AIR Lab?',
    a: 'Enterprise partners sponsor dedicated research cohorts with zero-data-retention guarantees, custom network security policies, and specialized model fine-tuning tailored to industrial applications.',
  },
  {
    q: 'Where can I view our open-source weights and documentation?',
    a: 'All peer-reviewed model checkpoints, tokenizers, and benchmark evaluation suites are published publicly on our Hugging Face and GitHub repositories under permissive open-weights licenses.',
  },
  {
    q: 'What happens when my project is accepted for IEEE/CVF publication?',
    a: 'AIR Lab fully supports conference travel grants, presentation registration fees, and open-access publication costs for authors presenting at flagship venues.',
  },
]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [applyModalOpen, setApplyModalOpen] = useState(false)

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % featuredProjects.length)
  }

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const currentProject = featuredProjects[activeSlide]

  return (
    <div className="w-full relative overflow-hidden">
      {/* ── 1. HERO SECTION (Centered, Aurora behind H1) ── */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-36 px-6 text-center flex flex-col items-center">
        {/* Reusable Aurora Background centered vertically on hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1100px] pointer-events-none -z-10">
          <AuroraBackground />
        </div>

        {/* Small pill badge above H1: white, hairline border, tiny icon + "NEDUET · CSIT" */}
        <SectionReveal delay={0}>
          <div className="inline-flex items-center mb-6">
            <Badge variant="white" icon={<Sparkles className="w-3.5 h-3.5" />}>
              NEDUET · CSIT
            </Badge>
          </div>
        </SectionReveal>

        {/* H1: Centered, two lines, huge, tight */}
        <SectionReveal delay={0.08}>
          <h1 className="max-w-4xl mx-auto font-head font-medium tracking-tight text-[var(--ink)] mb-6 text-balance">
            Extend your intelligence with a full team of researchers.
          </h1>
        </SectionReveal>

        {/* Subhead: 18px ink-2, max-width 560px */}
        <SectionReveal delay={0.16}>
          <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] max-w-[560px] mx-auto leading-relaxed mb-8 font-normal font-sans text-balance">
            Pioneering foundational artificial intelligence, real-time edge perception, and autonomous robotics at NED University of Engineering & Technology.
          </p>
        </SectionReveal>

        {/* Two buttons: black pill "Explore Research →" + soft outline pill "Meet the Team" */}
        <SectionReveal delay={0.22}>
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <Button to="/projects" variant="primary" size="md" arrow>
              Explore Research
            </Button>
            <Button to="/team" variant="secondary" size="md">
              Meet the Team
            </Button>
          </div>
        </SectionReveal>

        {/* One line of small gray trust chips with tiny check/dot icons */}
        <SectionReveal delay={0.28}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--ink-2)]">
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--ink-3)]" />
              <span>Funded research projects</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--ink-3)]" />
              <span>Research interns & fellows</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--ink-3)]" />
              <span>Industry collaborations</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[var(--ink-3)]" />
              <span>Peer-reviewed publications</span>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── 2. LOGO / COLLABORATOR STRIP ── */}
      <section className="w-full border-y border-[var(--line)] bg-[var(--surface)] py-7 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10">
            {collaborators.map((name, idx) => (
              <span
                key={idx}
                className="logo-grayscale font-head text-[14px] sm:text-[15px] font-semibold tracking-tight text-[var(--ink)] cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SECTION INTRO ("What we do" style) ── */}
      <section className="pt-24 sm:pt-32 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto text-left">
          <SectionReveal>
            <h2 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
              Enterprise AI that just works.
            </h2>
            <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] max-w-xl font-normal leading-relaxed">
              Security, governance, and computational scalability built in from day one. Deploy with confidence across your organization.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── 4. FEATURED PANEL (Large rounded 32px container with soft aurora background) ── */}
      <section className="pb-24 sm:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal>
            <div
              className="relative rounded-[32px] p-4 sm:p-7 md:p-9 border border-[var(--line)] overflow-hidden shadow-[var(--shadow-card)]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(79,139,255,0.12) 0%, rgba(139,123,255,0.10) 22%, rgba(242,92,193,0.12) 48%, rgba(255,122,69,0.11) 75%, rgba(255,210,77,0.12) 100%)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[420px]">
                {/* Left Inset Card (20px radius) */}
                <div className="lg:col-span-6 bg-[var(--surface)] border border-[var(--line)] rounded-[20px] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--shadow-sm)]">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="h-6 px-2.5 rounded-full bg-[#F4F4F6] text-[11px] font-medium text-[var(--ink-2)] border border-[var(--line)]">
                        {currentProject.tag}
                      </span>
                      <span className="h-6 px-2.5 rounded-full bg-[#0B0B0F] text-white text-[11px] font-medium">
                        {currentProject.badge}
                      </span>
                    </div>

                    <h3 className="text-[22px] sm:text-[26px] font-medium font-head text-[var(--ink)] mb-3 leading-snug">
                      {currentProject.title}
                    </h3>

                    <p className="text-[14.5px] text-[var(--ink-2)] leading-relaxed mb-6 font-sans">
                      {currentProject.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between gap-4">
                    {/* Prev / Next Small Square White Buttons with 1px border */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevSlide}
                        aria-label="Previous featured project"
                        className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:border-[rgba(11,11,15,0.25)] hover:shadow-xs transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Next featured project"
                        className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:border-[rgba(11,11,15,0.25)] hover:shadow-xs transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-[var(--ink-3)] font-mono ml-1">
                        0{activeSlide + 1} / 0{featuredProjects.length}
                      </span>
                    </div>

                    {/* Action button */}
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)] hover:text-[#4F8BFF] transition-colors"
                    >
                      <span>Explore Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Half: Light-gray (#EDEDF0) rounded media tile with centered floating button */}
                <div className="lg:col-span-6 bg-[#EDEDF0] rounded-[20px] border border-[rgba(11,11,15,0.06)] p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                  {/* Subtle decorative dot lattice */}
                  <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(11,11,15,0.15) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }}
                  />

                  {/* Centered Floating Black Pill Button + Small White Icon Tile (matching reference) */}
                  <div className="relative z-10 flex items-center gap-3">
                    {/* Small white icon tile */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-11 h-11 rounded-xl bg-white border border-[var(--line)] shadow-[var(--shadow-sm)] flex items-center justify-center text-[var(--ink)] shrink-0"
                    >
                      <User className="w-5 h-5 text-[var(--ink-2)]" />
                    </motion.div>

                    {/* Centered floating black pill button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setApplyModalOpen(true)}
                      className="h-11 px-5 rounded-full bg-[#0B0B0F] text-white shadow-[0_4px_16px_rgba(11,11,15,0.15)] flex items-center gap-2 text-xs font-medium cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish & Deploy</span>
                    </motion.button>
                  </div>

                  {/* Floating metric chip */}
                  <div className="mt-8 relative z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--line)] text-[11px] text-[var(--ink-2)] font-mono">
                    Active Benchmark: <span className="font-semibold text-[var(--ink)]">{currentProject.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── 5. CARDS GRID (3-up white cards, 28px radius, hairline border, shadow) ── */}
      <section className="pb-24 sm:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal>
            <div className="mb-12 text-left">
              <h2 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
                Pioneering Pillars & Research Capabilities
              </h2>
              <p className="text-[17px] text-[var(--ink-2)] max-w-xl font-normal">
                Disciplined engineering, rigorous scientific inquiry, and open scientific contributions.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardFeatures.map((item, idx) => {
              const Icon = item.icon
              return (
                <SectionReveal key={idx} staggerIndex={idx}>
                  <Link
                    to={item.link}
                    className="craftly-card p-8 flex flex-col justify-between group h-full block cursor-pointer"
                  >
                    <div>
                      {/* Icon in rounded chip */}
                      <div className="w-12 h-12 rounded-xl bg-[#F4F4F6] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] mb-6 group-hover:bg-[#EBEBEF] transition-colors">
                        <Icon className="w-5 h-5 text-[var(--ink)]" />
                      </div>

                      <h3 className="font-head text-[20px] font-medium text-[var(--ink)] mb-2.5">
                        {item.title}
                      </h3>

                      <p className="text-[14.5px] text-[var(--ink-2)] leading-relaxed font-sans font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Subtle arrow that nudges right on hover */}
                    <div className="pt-6 mt-6 border-t border-[var(--line)] flex items-center justify-between text-xs font-medium text-[var(--ink)]">
                      <span>Explore domain</span>
                      <ArrowRight className="w-4 h-4 text-[var(--ink-3)] group-hover:text-[var(--ink)] transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </SectionReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ (Accordion with hairline dividers, question left / + rotating to ×) ── */}
      <section className="pb-24 sm:pb-36 px-6">
        <div className="max-w-[840px] mx-auto text-left">
          <SectionReveal>
            <div className="mb-10">
              <h2 className="font-head font-medium text-[var(--ink)] mb-3 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-[16px] text-[var(--ink-2)] font-normal">
                Everything you need to know about joining AIR Lab, research grants, compute clusters, and publication guidelines.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <Accordion items={faqs} />
          </SectionReveal>
        </div>
      </section>

      {/* ── 7. CLOSING CTA ("Let's talk deployment" style) ── */}
      <section className="relative py-24 sm:py-32 px-6 text-center overflow-hidden border-t border-[var(--line)] bg-[var(--surface)]">
        {/* Aurora band bloom behind at low opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] pointer-events-none -z-10 opacity-40 blur-[80px]">
          <div
            className="w-[90vw] max-w-[800px] h-[300px] rounded-full mx-auto"
            style={{ background: 'var(--aurora)' }}
          />
        </div>

        <div className="max-w-[700px] mx-auto relative z-10">
          <SectionReveal>
            <h2 className="font-head font-medium text-[var(--ink)] mb-4 tracking-tight">
              Let's talk deployment.
            </h2>
            <p className="text-[17px] sm:text-[18px] text-[var(--ink-2)] leading-relaxed mb-8 max-w-xl mx-auto font-normal">
              Whether you are an enterprise seeking high-performance AI deployment, a university scholar, or a prospective fellow — let's build together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Button onClick={() => setApplyModalOpen(true)} variant="primary" size="md" arrow>
                Apply for Fellowship
              </Button>
              <Button href="mailto:contact@airlab.neduet.edu.pk" variant="secondary" size="md">
                Contact Lab Team
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Student Application Modal */}
      <StudentApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  )
}

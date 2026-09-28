import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, Check, GraduationCap, FileText, User, Mail, BookOpen } from 'lucide-react'

interface StudentApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function StudentApplicationModal({ isOpen, onClose }: StudentApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science & IT',
    program: 'Undergraduate BS (3rd/4th Year)',
    track: 'Foundational LLMs & Urdu NLP',
    resumeUrl: '',
    statement: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with 12px blur and rgba(11,11,15,.35) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(11,11,15,0.35)] backdrop-blur-[12px] transition-opacity"
          />

          {/* Modal Container: white 28px-radius panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[var(--surface)] border border-[var(--line)] rounded-[28px] shadow-[0_24px_70px_rgba(20,20,60,0.14)] p-6 sm:p-8 z-10 overflow-hidden font-sans my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F4F4F6] border border-[var(--line)] flex items-center justify-center text-[var(--ink-2)] hover:text-[var(--ink)] hover:border-[rgba(11,11,15,0.2)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              /* Success Screen with a soft aurora bloom and check icon */
              <div className="text-center py-10 px-4 relative overflow-hidden">
                {/* Soft Aurora Bloom behind */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-35 blur-[70px] pointer-events-none"
                  style={{ background: 'var(--aurora)' }}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#0B0B0F] text-white mx-auto flex items-center justify-center mb-6 shadow-md">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-medium font-head text-[var(--ink)] mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-[14.5px] text-[var(--ink-2)] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for applying to the Artificial Intelligence Research Lab at NED University. Dr. Murk Marvi and the faculty review committee will review your application and contact you at <strong className="text-[var(--ink)]">{formData.email}</strong>.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#F8F8FA] border border-[var(--line)] text-xs font-mono text-[var(--ink-2)] text-left mb-6 max-w-md mx-auto space-y-1.5">
                    <div><strong>Applicant:</strong> {formData.name} ({formData.rollNo})</div>
                    <div><strong>Department:</strong> {formData.department}</div>
                    <div><strong>Research Track:</strong> {formData.track}</div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="h-11 px-8 rounded-full bg-[#0B0B0F] text-white text-xs font-medium shadow-sm hover:bg-[#202028] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F6] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#4F8BFF]" />
                    <span>FALL 2026 RESEARCH FELLOWSHIP ADMISSIONS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight font-head text-[var(--ink)]">
                    Apply for Research Vacancy
                  </h2>
                  <p className="text-[14px] text-[var(--ink-2)] mt-1 font-sans">
                    Join NED University's premier AI Lab. Work directly with faculty on supercluster compute, LLMs, computer vision, and robotics testbeds.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Muhammad Ali"
                          className="w-full pl-10 pr-3.5 h-12 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all"
                        />
                      </div>
                    </div>

                    {/* Student Email */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                        NED Cloud Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="yourname@cloud.neduet.edu.pk"
                          className="w-full pl-10 pr-3.5 h-12 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Roll Number */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                        Roll / Reg Number *
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
                        <input
                          type="text"
                          required
                          value={formData.rollNo}
                          onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                          placeholder="e.g. CS-2022045"
                          className="w-full pl-10 pr-3.5 h-12 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all"
                        />
                      </div>
                    </div>

                    {/* Program / Level */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                        Academic Program
                      </label>
                      <select
                        value={formData.program}
                        onChange={e => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-3.5 h-12 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all"
                      >
                        <option value="Undergraduate BS (3rd/4th Year)">Undergraduate BS (3rd / 4th Year)</option>
                        <option value="Undergraduate BS (1st/2nd Year)">Undergraduate BS (1st / 2nd Year)</option>
                        <option value="Postgraduate MS Candidate">Postgraduate MS Candidate</option>
                        <option value="Doctoral PhD Scholar">Doctoral PhD Scholar</option>
                      </select>
                    </div>
                  </div>

                  {/* Research Track of Interest */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                      Primary Research Track of Interest *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
                      <select
                        value={formData.track}
                        onChange={e => setFormData({ ...formData, track: e.target.value })}
                        className="w-full pl-10 pr-3.5 h-12 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all"
                      >
                        <option value="Foundational LLMs & Urdu NLP">Foundational LLMs & Urdu NLP</option>
                        <option value="Edge AI & Low-Power Embedded Vision">Edge AI & Low-Power Embedded Vision</option>
                        <option value="Autonomous Robotics & Aerial SLAM">Autonomous Robotics & Aerial SLAM</option>
                        <option value="AI Safety, Interpretability & Alignment">AI Safety, Interpretability & Alignment</option>
                        <option value="Healthcare & Clinical Multimodal AI">Healthcare & Clinical Multimodal AI</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume / Portfolio Link */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                      Resume / GitHub / Portfolio Link *
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
                      <input
                        type="url"
                        required
                        value={formData.resumeUrl}
                        onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                        placeholder="https://github.com/... or Google Drive link"
                        className="w-full pl-10 pr-3.5 h-12 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all"
                      />
                    </div>
                  </div>

                  {/* Brief Statement */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--ink)] mb-1.5">
                      Brief Statement of Interest / Past Projects
                    </label>
                    <textarea
                      rows={3}
                      value={formData.statement}
                      onChange={e => setFormData({ ...formData, statement: e.target.value })}
                      placeholder="Briefly highlight your technical background, PyTorch/TensorFlow experience, or relevant coursework..."
                      className="w-full p-3.5 rounded-[14px] border border-[var(--line)] bg-[#FAFAFC] text-[13.5px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[#4F8BFF] focus:ring-2 focus:ring-[#4F8BFF]/25 transition-all resize-none"
                    />
                  </div>

                  {/* Submit = black pill full width */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-12 rounded-full bg-[#0B0B0F] text-white text-[14px] font-medium flex items-center justify-center gap-2 shadow-[var(--shadow-sm)] hover:bg-[#202028] transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

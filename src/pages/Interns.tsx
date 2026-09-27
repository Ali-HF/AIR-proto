import internsData from "../data/interns.json"
import { motion } from "framer-motion"
import { Mail, History, ExternalLink } from "lucide-react"

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z" />
  </svg>
)

export default function Interns() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-mono font-medium text-primary mb-4">
            <History className="w-3.5 h-3.5" />
            Alumni & Past Cohorts
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Previous Research Interns
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Alumni who contributed to research, development, and experiments at AIR Lab.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-4 px-6 font-semibold">#</th>
                <th className="py-4 px-6 font-semibold">Name</th>
                <th className="py-4 px-6 font-semibold">Institutional Email</th>
                <th className="py-4 px-6 font-semibold text-right">LinkedIn Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {internsData.map((intern, idx) => (
                <tr
                  key={intern.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground">
                    {(idx + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="py-4 px-6 font-medium text-foreground group-hover:text-primary transition-colors">
                    {intern.name}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-muted-foreground">
                    <a
                      href={`mailto:${intern.email}`}
                      className="hover:underline inline-flex items-center gap-2"
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
      </motion.div>
    </div>
  )
}

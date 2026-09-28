import { Link, Outlet, useLocation } from "react-router-dom"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { motion, useScroll, useSpring } from "framer-motion"
import { Menu, X, Mail, Phone } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

export function Layout() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Previous Interns", path: "/interns" },
    { name: "Projects", path: "/projects" },
    { name: "Collaborations", path: "/collaborations" },
    { name: "Publications", path: "/publications" },
    { name: "Gallery", path: "/gallery" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background selection:bg-primary/20">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-50 pointer-events-none" />

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Institutional Top Banner */}
      <div className="w-full bg-primary text-primary-foreground text-xs font-mono font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span>Department of Computer Science & Information Technology • NED University of Engineering & Technology</span>
      </div>

      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2.5 group">
            <img
              src="/air-lab-mark.svg"
              alt="AIR Lab Logo"
              className="w-7 h-7 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="flex items-center gap-1.5">
              <span>AIR Lab</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider text-muted-foreground border-l pl-2 border-border">
                NEDUET
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex gap-6 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  location.pathname === link.path ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-4 w-px bg-border mx-2" />
            <Button size="sm" onClick={() => (window.location.href = "/about")}>
              About Us
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background p-4 flex flex-col gap-2 absolute w-full left-0 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium p-3 rounded-md ${
                  location.pathname === link.path ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full mt-2" onClick={() => (window.location.href = "/about")}>
              About Us
            </Button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col">
        <div className="flex-1 flex flex-col min-h-[calc(100vh-8rem)] relative">
          <Outlet />
        </div>
      </main>

      <footer className="border-t bg-background pt-16 pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2.5 mb-4 group">
                <img
                  src="/air-lab-mark.svg"
                  alt="AIR Lab Logo"
                  className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
                />
                <span className="flex flex-col">
                  <span>AIR Lab</span>
                  <span className="text-[10px] font-mono text-muted-foreground font-normal tracking-wide">
                    Artificial Intelligence Research Lab
                  </span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
                Department of Computer Science & Information Technology, NED University of Engineering & Technology, Karachi, Pakistan.
              </p>
              <div className="space-y-1.5 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>marvi@cloud.neduet.edu.pk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>9221-99261261 Ext: 2399</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider font-mono mb-4 text-foreground">
                Sections
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About AIR Lab</Link></li>
                <li><Link to="/team" className="hover:text-foreground transition-colors">Our Team</Link></li>
                <li><Link to="/interns" className="hover:text-foreground transition-colors">Previous Interns</Link></li>
                <li><Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider font-mono mb-4 text-foreground">
                Engagement
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/collaborations" className="hover:text-foreground transition-colors">Industry Collaborations</Link></li>
                <li><Link to="/publications" className="hover:text-foreground transition-colors">Blogs & Papers</Link></li>
                <li><Link to="/gallery" className="hover:text-foreground transition-colors">Gallery</Link></li>
                <li><Link to="/performers" className="hover:text-foreground transition-colors">Best Performers</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Department of CS & IT • NED University
            </div>
            <div>
              © {new Date().getFullYear()} Artificial Intelligence Research Lab (AIR Lab). All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <ThemeSwitcher />
    </div>
  )
}

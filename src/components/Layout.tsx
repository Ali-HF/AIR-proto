import { Link, Outlet, useLocation } from "react-router-dom"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { motion, useScroll, useSpring } from "framer-motion"
import { Menu, X, ArrowRight, Globe, MessageCircle, Briefcase } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export function Layout() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Projects", path: "/projects" },
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

      {/* Announcement Banner */}
      <div className="w-full bg-primary text-primary-foreground text-xs md:text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2">
        <Badge variant="secondary" className="h-5 px-2 text-[10px] bg-white/20 text-white hover:bg-white/20 border-none">NEW</Badge>
        <span>Applications for Summer 2026 Research Internships are now open.</span>
        <ArrowRight className="w-4 h-4 inline" />
      </div>

      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
          <Link to="/" className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              A
            </div>
            AIR Lab
          </Link>
          
          <div className="hidden md:flex gap-6 items-center">
            {links.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-4 w-px bg-border mx-2" />
            <Button size="sm" className="font-semibold" onClick={() => window.location.href='/about'}>Join the Lab</Button>
          </div>

          <button 
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 absolute w-full left-0 shadow-lg">
             {links.map(link => (
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
            <Button className="w-full mt-2">Join the Lab</Button>
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
              <Link to="/" className="text-xl font-semibold tracking-tight flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                  A
                </div>
                AIR Lab
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">
                Pioneering next-generation models and intelligent systems at NED University of Engineering & Technology.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Globe className="w-5 h-5"/></a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><MessageCircle className="w-5 h-5"/></a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Briefcase className="w-5 h-5"/></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Research</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
                <li><Link to="/publications" className="hover:text-foreground transition-colors">Publications</Link></li>
                <li><Link to="/gallery" className="hover:text-foreground transition-colors">Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">People</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/team" className="hover:text-foreground transition-colors">Core Team</Link></li>
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Join Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                All systems operational
             </div>
             <div>
               © {new Date().getFullYear()} Artificial Intelligence Research Lab
             </div>
          </div>
        </div>
      </footer>

      <ThemeSwitcher />
    </div>
  )
}


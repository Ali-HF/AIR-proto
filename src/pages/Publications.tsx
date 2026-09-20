import pubsData from "../data/publications.json"
import blogsData from "../data/blogs.json"
import { motion } from "framer-motion"
import { Card } from "../components/ui/card"
import { Calendar, User, BookOpen } from "lucide-react"

export default function Publications() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Research & Updates</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">Latest papers, articles, and announcements from the lab.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <div className="flex items-center gap-2 mb-8 border-b pb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Research Papers</h2>
          </div>
          <div className="space-y-4">
            {pubsData.map((pub, i) => (
              <motion.div 
                key={pub.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer group hover:shadow-sm">
                  <h3 className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">{pub.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {pub.year}</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">{pub.venue}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pub.authors}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-8 border-b pb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold">Latest Blogs</h2>
          </div>
          <div className="space-y-4">
            {blogsData.map((blog, i) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer group hover:shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors pr-4">{blog.title}</h3>
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{blog.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    By {blog.author}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

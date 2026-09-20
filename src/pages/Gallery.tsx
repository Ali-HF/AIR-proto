import galleryData from "../data/gallery.json"
import { motion } from "framer-motion"

export default function Gallery() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">Life at AIR Lab</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">Behind the scenes at our research facility.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {galleryData.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`relative group overflow-hidden rounded-xl ${item.span} bg-muted`}
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <h3 className="text-xl font-display font-bold text-foreground">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

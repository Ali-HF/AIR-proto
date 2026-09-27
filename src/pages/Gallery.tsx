import { Camera, Image as ImageIcon } from "lucide-react"

export default function Gallery() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl min-h-[calc(100vh-4rem)]">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-mono font-medium text-primary mb-4">
          <Camera className="w-3.5 h-3.5" />
          Lab Media
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Gallery
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Pictures and moments from the Artificial Intelligence Research Lab.
        </p>
      </div>

      <div className="p-16 text-center rounded-2xl border border-dashed bg-muted/20 max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
          <ImageIcon className="w-7 h-7 opacity-80" />
        </div>
        <h3 className="text-xl font-bold mb-2">Gallery of Pictures</h3>
        <p className="text-sm font-mono text-muted-foreground max-w-md mx-auto mb-2">
          Images only — no text content. Pending image upload.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Photographs and event captures will be showcased here once media files are provided.
        </p>
      </div>
    </div>
  )
}

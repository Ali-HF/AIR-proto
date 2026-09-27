import { Handshake, Image as ImageIcon } from "lucide-react"

export default function Collaborations() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl min-h-[calc(100vh-4rem)]">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-mono font-medium text-primary mb-4">
          <Handshake className="w-3.5 h-3.5" />
          Partnerships
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Industry Collaborations
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Bridging academia and industry through joint problem-solving, sponsored research, and applied innovation.
        </p>
      </div>

      <div className="mt-8 p-16 text-center rounded-2xl border border-dashed bg-muted/20 max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
          <ImageIcon className="w-7 h-7 opacity-80" />
        </div>
        <h3 className="text-xl font-bold mb-2">Partner Organizations</h3>
        <p className="text-sm font-mono text-muted-foreground max-w-md mx-auto mb-2">
          Images only — no text content. Pending image upload.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Partner logos and collaborative project images will be displayed here once uploaded.
        </p>
      </div>
    </div>
  )
}

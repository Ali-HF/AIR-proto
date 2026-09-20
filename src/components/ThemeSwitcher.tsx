import { useTheme, type Theme } from "./ThemeProvider"
import { Palette } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes: { id: Theme; name: string }[] = [
    { id: "default", name: "Mint Light" },
    { id: "theme-mint-dark", name: "Mint Dark" },
    { id: "theme-terminal", name: "Terminal" },
    { id: "theme-aurora", name: "Aurora" },
    { id: "theme-ember", name: "Ember" },
    { id: "theme-ned", name: "NED Signature" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex flex-col gap-2 bg-popover text-popover-foreground p-3 rounded-lg border shadow-lg w-48">
        <h4 className="font-mono text-xs mb-2 text-muted-foreground uppercase tracking-widest">Select Theme</h4>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
              theme === t.id ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <button className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
        <Palette className="h-5 w-5" />
      </button>
    </div>
  )
}

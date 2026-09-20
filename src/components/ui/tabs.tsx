import * as React from "react"
import { cn } from "../../lib/utils"

export function Tabs({ tabs, defaultTab }: { tabs: { id: string, label: string, content: React.ReactNode }[], defaultTab?: string }) {
  const [active, setActive] = React.useState(defaultTab || tabs[0].id)
  
  return (
    <div className="w-full">
      <div className="flex space-x-2 border-b border-border/50 mb-6 pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap rounded-md hover:bg-muted",
              active === tab.id ? "text-primary" : "text-muted-foreground"
            )}
          >
            {tab.label}
            {active === tab.id && (
              <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      <div>
        {tabs.find(t => t.id === active)?.content}
      </div>
    </div>
  )
}

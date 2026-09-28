import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemePalette = 
  | 'default'         // Aurora Sunset (Craftly / BlockAI Studio inspiration)
  | 'theme-emerald'   // Emerald Horizon (Ali's signature mint/emerald)
  | 'theme-cobalt'    // Electric Cobalt (Deep tech frontier AI)
  | 'theme-cyber'     // Cyber Canary (High-contrast canary gold)

export interface ThemeOption {
  id: ThemePalette
  name: string
  accent: string
  subAccent: string
  tertiary: string
  bgPreview: string
  description: string
  gradientText: string
  glows: {
    c1: string
    c2: string
    c3: string
    c4: string
  }
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    name: 'Aurora Sunset',
    accent: '#F43F5E',
    subAccent: '#FB923C',
    tertiary: '#FBBF24',
    bgPreview: '#FFFFFF',
    description: 'Inspiration palette: vibrant magenta, sunset coral & warm amber gold blurs',
    gradientText: 'linear-gradient(135deg, #F43F5E 0%, #FB923C 50%, #FBBF24 100%)',
    glows: {
      c1: 'rgba(244, 63, 94, 0.40)',
      c2: 'rgba(251, 146, 60, 0.40)',
      c3: 'rgba(251, 191, 36, 0.35)',
      c4: 'rgba(168, 85, 247, 0.25)',
    }
  },
  {
    id: 'theme-emerald',
    name: 'Emerald Horizon',
    accent: '#10B981',
    subAccent: '#06B6D4',
    tertiary: '#84CC16',
    bgPreview: '#FAFAFA',
    description: "Ali's signature aesthetic: crisp emerald, electric cyan & deep teal blurs",
    gradientText: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #84CC16 100%)',
    glows: {
      c1: 'rgba(16, 185, 129, 0.40)',
      c2: 'rgba(6, 182, 212, 0.40)',
      c3: 'rgba(132, 204, 22, 0.35)',
      c4: 'rgba(20, 184, 166, 0.25)',
    }
  },
  {
    id: 'theme-cobalt',
    name: 'Electric Cobalt',
    accent: '#2563EB',
    subAccent: '#7C3AED',
    tertiary: '#38BDF8',
    bgPreview: '#F8FAFC',
    description: 'Frontier AI research: cobalt blue, electric violet & sky cyan blurs',
    gradientText: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #38BDF8 100%)',
    glows: {
      c1: 'rgba(37, 99, 235, 0.40)',
      c2: 'rgba(124, 58, 237, 0.40)',
      c3: 'rgba(56, 189, 248, 0.35)',
      c4: 'rgba(236, 72, 153, 0.25)',
    }
  },
  {
    id: 'theme-cyber',
    name: 'Cyber Canary',
    accent: '#FFE600',
    subAccent: '#F59E0B',
    tertiary: '#A3E635',
    bgPreview: '#0C0D12',
    description: 'High-contrast tech: luminous electric canary gold & amber blurs',
    gradientText: 'linear-gradient(135deg, #FFE600 0%, #F59E0B 50%, #A3E635 100%)',
    glows: {
      c1: 'rgba(255, 230, 0, 0.40)',
      c2: 'rgba(245, 158, 11, 0.40)',
      c3: 'rgba(163, 230, 53, 0.35)',
      c4: 'rgba(255, 215, 0, 0.25)',
    }
  }
]

interface ThemeContextType {
  palette: ThemePalette
  setPalette: (palette: ThemePalette) => void
  isDark: boolean
  toggleDark: () => void
  activeTheme: ThemeOption
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Version 5: default to Aurora Sunset in Light mode
  const [palette, setPaletteState] = useState<ThemePalette>(() => {
    const version = localStorage.getItem('air_theme_aurora_v5')
    if (!version) {
      localStorage.setItem('air_theme_aurora_v5', '5.0')
      localStorage.removeItem('air_theme_palette')
      localStorage.removeItem('air_theme_mode')
      return 'default'
    }
    const saved = localStorage.getItem('air_theme_palette') as ThemePalette
    const valid = THEME_OPTIONS.some(o => o.id === saved)
    return valid ? saved : 'default'
  })

  // Default to FALSE (Light mode like the inspiration design)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const version = localStorage.getItem('air_theme_aurora_v5')
    if (!version) return false
    const saved = localStorage.getItem('air_theme_mode')
    if (saved !== null) return saved === 'dark'
    return false // Light mode default!
  })

  const activeTheme = THEME_OPTIONS.find(t => t.id === palette) || THEME_OPTIONS[0]

  useEffect(() => {
    const root = document.documentElement

    // Remove all previous theme classes
    THEME_OPTIONS.forEach(opt => {
      if (opt.id !== 'default') {
        root.classList.remove(opt.id)
      }
    })

    if (palette !== 'default') {
      root.classList.add(palette)
    }

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Set custom CSS variables for ambient background blurs
    root.style.setProperty('--glow-1', activeTheme.glows.c1)
    root.style.setProperty('--glow-2', activeTheme.glows.c2)
    root.style.setProperty('--glow-3', activeTheme.glows.c3)
    root.style.setProperty('--glow-4', activeTheme.glows.c4)
    root.style.setProperty('--accent-gradient', activeTheme.gradientText)
    root.style.setProperty('--theme-accent', activeTheme.accent)
    root.style.setProperty('--theme-subaccent', activeTheme.subAccent)

    localStorage.setItem('air_theme_palette', palette)
    localStorage.setItem('air_theme_mode', isDark ? 'dark' : 'light')
  }, [palette, isDark, activeTheme])

  const setPalette = (newPalette: ThemePalette) => {
    setPaletteState(newPalette)
  }

  const toggleDark = () => {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ palette, setPalette, isDark, toggleDark, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

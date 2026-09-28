import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  variant?: 'white' | 'dark' | 'outline' | 'aurora'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  className = '',
  variant = 'white',
  dot = false,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] font-medium tracking-tight transition-all duration-150 select-none'

  const variantStyles = {
    white: 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] shadow-[var(--shadow-sm)]',
    dark: 'bg-[var(--ink)] text-white border border-transparent shadow-[var(--shadow-sm)]',
    outline: 'bg-transparent text-[var(--ink-2)] border border-[var(--line)]',
    aurora: 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] shadow-[0_2px_12px_rgba(79,139,255,0.12)]',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      )}
      {icon && <span className="shrink-0 w-3.5 h-3.5 flex items-center justify-center text-[var(--ink-2)]">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}

export default Badge

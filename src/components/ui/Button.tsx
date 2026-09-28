import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'pill'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  to?: string
  href?: string
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  to,
  href,
  icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-12 px-6 text-sm',
    lg: 'h-13 px-7 text-base',
  }

  const variantStyles = {
    primary:
      'bg-[#0B0B0F] text-white border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_14px_rgba(11,11,15,0.12)] hover:bg-[#202028] hover:shadow-[0_6px_20px_rgba(11,11,15,0.18)]',
    secondary:
      'bg-[rgba(255,255,255,0.65)] hover:bg-[rgba(255,255,255,0.95)] text-[#0B0B0F] border border-[var(--line)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-[rgba(11,11,15,0.16)]',
    outline:
      'bg-transparent hover:bg-white text-[#0B0B0F] border border-[var(--line)] shadow-none hover:border-[rgba(11,11,15,0.2)]',
    pill:
      'bg-white text-[#0B0B0F] border border-[var(--line)] shadow-[var(--shadow-sm)] hover:border-[rgba(11,11,15,0.2)]',
  }

  const sharedClasses = `group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] select-none cursor-pointer tracking-tight ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={sharedClasses}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={sharedClasses} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button className={sharedClasses} {...props}>
      {content}
    </button>
  )
}

export default Button

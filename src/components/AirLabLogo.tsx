import React from 'react'
import airLabLogo from '../assets/air-lab-logo-dark.png'

interface AirLabLogoProps {
  className?: string
  height?: number | string
}

export const AirLabLogo: React.FC<AirLabLogoProps> = ({
  className = '',
  height = 36,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <img
        src={airLabLogo}
        alt="AI Research Lab — NED University"
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
        className="object-contain"
      />
    </div>
  )
}

export default AirLabLogo

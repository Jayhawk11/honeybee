'use client'

import Link from 'next/link'
import LogoText from './LogoText'
import { useTheme } from '@/contexts/ThemeContext'

type LogoVariant = 'tier1' | 'tier2' | 'tier3'

interface LogoProps {
  variant?: LogoVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  showInc?: boolean
  href?: string
  className?: string
  compactText?: boolean
}

export default function Logo({
  variant = 'tier1',
  size = 'md',
  showText = true,
  showInc = true,
  href = '/',
  className = '',
  compactText = false,
}: LogoProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const sizeClasses = {
    sm: 'w-10 h-10 md:w-12 md:h-12',
    md: 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16',
    lg: 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20',
    xl: 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24',
  }

  const LogoContent = (
    <div className={`relative inline-flex items-center space-x-2 ${className}`}>
      {/* Simple Logo Icon */}
      <div className={`flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900 shadow-lg ${sizeClasses[size]}`}>
        <span className="font-extrabold text-amber-600 dark:text-amber-400 text-2xl md:text-3xl lg:text-4xl">
          🐝
        </span>
      </div>

      {/* Logo Text - Desktop */}
      {showText && (
        <div className="relative z-10 flex-shrink-0 hidden md:block">
          <LogoText size={size} showInc={showInc} />
        </div>
      )}

      {/* Compact Logo Text for Mobile */}
      {showText && (
        <div className="relative z-10 flex-shrink-0 md:hidden">
          <LogoText size={size} showInc={false} compact={true} />
        </div>
      )}
    </div>
  )

   if (href) {
   return (
     <Link href={href} aria-label="Honey Bee Community Services - Go to homepage" className="flex items-center group">
        {LogoContent}
      </Link>
    )
   }

   return LogoContent
}

// Export individual components for flexibility
export { LogoText }

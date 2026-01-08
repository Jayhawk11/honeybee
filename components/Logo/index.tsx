'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import LogoContainer from './LogoContainer'
import AnimatedLogo from './AnimatedLogo'
import LogoText from './LogoText'
import HoneycombPattern from './HoneycombPattern'
import ParticleField from './ParticleField'
import { useTheme } from '@/contexts/ThemeContext'

// Lazy load 3D logo to avoid loading Three.js on initial page load
const Logo3D = dynamic(() => import('./Logo3D'), {
  loading: () => (
    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
  ),
  ssr: false
})

type LogoVariant = 'tier1' | 'tier2' | 'tier3'

interface LogoProps {
  variant?: LogoVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  showInc?: boolean
  href?: string
  withParticles?: boolean
  withPattern?: boolean
  interactive?: boolean
  className?: string
}

export default function Logo({
  variant = 'tier3',
  size = 'md',
  showText = true,
  showInc = true,
  href = '/',
  withParticles = true,
  withPattern = true,
  interactive = true,
  className = '',
}: LogoProps) {
  const [mounted, setMounted] = useState(false)
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'
  const themeMounted = themeContext?.mounted ?? true

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !themeMounted) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div
          className={`rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse ${
            size === 'sm' ? 'w-8 h-8' :
            size === 'md' ? 'w-10 h-10 md:w-12 md:h-12' :
            size === 'lg' ? 'w-12 h-12 md:w-14 md:h-14' :
            'w-14 h-14 md:w-16 md:h-16'
          }`}
        />
        {showText && (
          <div
            className={`h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${
              size === 'sm' ? 'w-20' :
              size === 'md' ? 'w-24' :
              size === 'lg' ? 'w-28' :
              'w-32'
            }`}
          />
        )}
      </div>
    )
  }

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  const LogoContent = (
    <div className={`relative flex items-center space-x-2 ${className}`}>
      {/* Tier 3: 3D Particle Field */}
      <AnimatePresence>
        {variant === 'tier3' && withParticles && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute -inset-8 pointer-events-none ${
              size === 'sm' ? '-inset-4' :
              size === 'md' ? '-inset-6' :
              size === 'lg' ? '-inset-8' :
              '-inset-10'
            }`}
          >
            <ParticleField count={size === 'sm' ? 15 : size === 'md' ? 25 : 35} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tier 2+: Honeycomb Pattern Background */}
      <AnimatePresence>
        {variant !== 'tier1' && withPattern && mounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute -inset-4 pointer-events-none overflow-hidden rounded-full ${
              size === 'sm' ? '-inset-2' :
              size === 'md' ? '-inset-3' :
              size === 'lg' ? '-inset-4' :
              '-inset-5'
            }`}
          >
            <HoneycombPattern
              size={size === 'sm' ? 8 : size === 'md' ? 10 : 12}
              density="low"
              animated={interactive}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Container with all tiers */}
      <div className="relative z-10">
        {variant === 'tier3' && interactive ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Logo3D
              size={
                size === 'sm' ? 32 :
                size === 'md' ? 48 :
                size === 'lg' ? 56 :
                64
              }
              interactive={interactive}
            />
          </motion.div>
        ) : variant === 'tier2' ? (
          <LogoContainer
            showText={false}
            size={size}
            href={undefined}
          >
            <AnimatedLogo
              size={
                size === 'sm' ? 32 :
                size === 'md' ? 48 :
                size === 'lg' ? 56 :
                64
              }
              animated={mounted}
            />
          </LogoContainer>
        ) : (
          <LogoContainer
            showText={false}
            size={size}
            href={undefined}
          >
            <div className="flex items-center justify-center w-full h-full">
              <span className={`font-extrabold text-amber-600 dark:text-amber-400 ${sizeClasses[size]}`}>
                🐝
              </span>
            </div>
          </LogoContainer>
        )}
      </div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="relative z-10"
        >
          <LogoText size={size} showInc={showInc} />
        </motion.div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center group">
        {LogoContent}
      </Link>
    )
  }

  return LogoContent
}

// Export individual components for flexibility
export { LogoText }
export { LogoContainer }
export { AnimatedLogo }
export { HoneycombPattern }
export { ParticleField }
export { Logo3D }

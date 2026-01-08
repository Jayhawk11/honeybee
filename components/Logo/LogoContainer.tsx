'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import LogoText from './LogoText'

interface LogoContainerProps {
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  children?: React.ReactNode
}

export default function LogoContainer({
  showText = true,
  size = 'md',
  href = undefined,
  children,
}: LogoContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  // Motion values for magnetic effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = 10 // Maximum movement in pixels
    const moveX = (e.clientX - centerX) / (rect.width / 2) * distance
    const moveY = (e.clientY - centerY) / (rect.height / 2) * distance

    x.set(moveX)
    y.set(moveY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-12 h-12 md:w-14 md:h-14',
    xl: 'w-14 h-14 md:w-16 md:h-16',
  }

  const LogoContent = (
    <div className="flex items-center space-x-2">
      {/* Animated logo container */}
      <motion.div
        ref={ref}
        style={{
          x: springX,
          y: springY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className={`relative ${sizeClasses[size]} cursor-pointer`}
      >
        {/* Logo content (children or placeholder) */}
        <motion.div
          className={`relative w-full h-full rounded-full ${
            theme === 'light'
              ? 'bg-gradient-to-br from-amber-100 to-amber-200'
              : 'bg-gradient-to-br from-amber-800 to-amber-900'
          } shadow-lg`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Animated text */}
      {showText && (
        <motion.div
          animate={{
            x: isHovered ? 2 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <LogoText size={size} showInc />
        </motion.div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {LogoContent}
      </Link>
    )
  }

  return LogoContent
}

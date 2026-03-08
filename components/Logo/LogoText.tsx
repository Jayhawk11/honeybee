'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

interface LogoTextProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showInc?: boolean
  compact?: boolean
}

export default function LogoText({ size = 'md', showInc = true, compact = false }: LogoTextProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const text = compact ? 'Honey Bee' : 'Honey Bee Community Services'

  const sizeClasses = {
    sm: 'text-lg md:text-xl lg:text-2xl xl:text-3xl',
    md: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
    lg: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    xl: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
  }

  const words = text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className={`flex items-baseline ${sizeClasses[size]}`}>
      <motion.div
        className="relative inline-flex items-baseline space-x-2 font-extrabold tracking-tight"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={`word-${wordIndex}`}
            variants={wordVariants}
            className={`relative inline-block bg-clip-text text-transparent bg-gradient-to-br ${
              theme === 'light'
                ? 'from-amber-800 via-amber-600 to-yellow-600'
                : 'from-amber-200 via-yellow-100 to-amber-300'
            }`}
          >
            {word}{wordIndex < words.length - 1 && ' '}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

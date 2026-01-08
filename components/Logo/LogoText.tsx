'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

interface LogoTextProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showInc?: boolean
}

export default function LogoText({ size = 'md', showInc = true }: LogoTextProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const text = 'Honeybee Community Services'

  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
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
        type: 'spring',
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
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

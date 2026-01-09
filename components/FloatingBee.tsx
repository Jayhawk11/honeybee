'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FloatingBeeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  delay?: number
  duration?: number
  color?: 'yellow' | 'gold'
}

export default function FloatingBee({
  className = '',
  size = 'md',
  delay = 0,
  duration = 4,
  color = 'yellow'
}: FloatingBeeProps) {
  const sizes = {
    sm: { width: 24, height: 24 },
    md: { width: 40, height: 40 },
    lg: { width: 64, height: 64 }
  }

  const colors = {
    yellow: {
      body: '#FFEB3B',
      stripes: '#1A1A1A',
      wing: 'rgba(255, 235, 59, 0.3)'
    },
    gold: {
      body: '#FFD700',
      stripes: '#1A1A1A',
      wing: 'rgba(255, 215, 0, 0.3)'
    }
  }

  const { width, height } = sizes[size]
  const { body, stripes, wing } = colors[color]

  // Memoize size style to prevent re-renders and enable GPU acceleration
  const sizeStyle = useMemo(() => ({ width, height, willChange: 'opacity, transform' }), [width, height])

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={sizeStyle}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          x: [0, 10, 20, 10, 0],
          y: [0, -15, -10, -20, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Wings */}
        <motion.g animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }}>
          <ellipse cx="24" cy="24" rx="12" ry="8" fill={wing} transform="rotate(-15 24 24)" />
          <ellipse cx="40" cy="24" rx="12" ry="8" fill={wing} transform="rotate(15 40 24)" />
        </motion.g>

        {/* Body */}
        <ellipse cx="32" cy="36" rx="16" ry="12" fill={body} />

        {/* Stripes */}
        <rect x="24" y="28" width="3" height="16" fill={stripes} />
        <rect x="32" y="28" width="3" height="16" fill={stripes} />
        <rect x="40" y="28" width="3" height="16" fill={stripes} />

        {/* Head */}
        <circle cx="32" cy="22" r="6" fill={body} />

        {/* Eyes */}
        <circle cx="29" cy="21" r="2" fill={stripes} />
        <circle cx="35" cy="21" r="2" fill={stripes} />

        {/* Stinger */}
        <path d="M32 48 L32 54" stroke={stripes} strokeWidth="2" strokeLinecap="round" />

        {/* Antennae */}
        <path d="M28 18 Q24 14 22 16" stroke={stripes} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M36 18 Q40 14 42 16" stroke={stripes} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  )
}

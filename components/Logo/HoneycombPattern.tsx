'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

interface HoneycombPatternProps {
  size?: number
  density?: 'low' | 'medium' | 'high'
  animated?: boolean
}

export default function HoneycombPattern({
  size = 20,
  density = 'medium',
  animated = true,
}: HoneycombPatternProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'

  const colors = {
    light: {
      fill: 'rgba(251, 191, 36, 0.1)',
      stroke: 'rgba(251, 191, 36, 0.3)',
      glow: 'rgba(251, 191, 36, 0.15)',
    },
    dark: {
      fill: 'rgba(245, 158, 11, 0.1)',
      stroke: 'rgba(245, 158, 11, 0.3)',
      glow: 'rgba(245, 158, 11, 0.2)',
    },
  }

  const currentColors = theme === 'light' ? colors.light : colors.dark

  // Generate hexagon path
  const hexagonPath = useMemo(() => {
    const angle = (Math.PI / 3)
    let path = `M ${size} 0`
    for (let i = 1; i < 6; i++) {
      const x = size + size * Math.cos(i * angle)
      const y = size + size * Math.sin(i * angle)
      path += ` L ${x} ${y}`
    }
    path += ' Z'
    return path
  }, [size])

  // Generate grid positions
  const gridPositions = useMemo(() => {
    const hexHeight = size * Math.sqrt(3)
    const hexWidth = size * 2
    const vertDist = hexHeight
    const horizDist = hexWidth * 0.75

    const rows = density === 'low' ? 4 : density === 'medium' ? 6 : 8
    const cols = density === 'low' ? 6 : density === 'medium' ? 8 : 12

    const positions: { x: number; y: number; delay: number }[] = []

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * horizDist
        const y = row * vertDist + (col % 2 === 0 ? 0 : vertDist / 2)

        // Add some randomness to delays for organic feel
        const delay = Math.random() * 2

        positions.push({ x, y, delay })
      }
    }

    return positions
  }, [size, density])

  const hexagonVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: 180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 25,
      },
    },
    hover: {
      scale: 1.1,
      opacity: 0.8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size * 12} ${size * 8}`}
        preserveAspectRatio="xMidYMid slice"
        className="opacity-60"
      >
        {gridPositions.map((pos, index) => (
          <motion.g
            key={`${pos.x}-${pos.y}-${index}`}
            initial="hidden"
            animate={animated ? 'visible' : 'hidden'}
            whileHover="hover"
            variants={hexagonVariants}
            transition={{
              delay: animated ? pos.delay : 0,
            }}
            style={{ transformOrigin: `${pos.x + size}px ${pos.y + size}px` }}
          >
            {/* Hexagon fill */}
            <motion.path
              d={hexagonPath}
              fill={currentColors.fill}
              stroke={currentColors.stroke}
              strokeWidth="1"
              transform={`translate(${pos.x}, ${pos.y})`}
            />

            {/* Animated glow effect */}
            {animated && (
              <motion.path
                d={hexagonPath}
                fill="none"
                stroke={currentColors.glow}
                strokeWidth="3"
                transform={`translate(${pos.x}, ${pos.y})`}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: pos.delay,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'blur(2px)' }}
              />
            )}
          </motion.g>
        ))}
      </svg>

      {/* Floating particles */}
      {animated && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                theme === 'light'
                  ? 'bg-amber-400'
                  : 'bg-amber-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

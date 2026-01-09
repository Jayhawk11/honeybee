'use client'

import { motion } from 'framer-motion'

interface HoneycombMarkerProps {
  color?: string
  size?: number
  isActive?: boolean
}

export default function HoneycombMarker({ color = '#F59E0B', size = 40, isActive = false }: HoneycombMarkerProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: isActive ? 1.2 : 1,
        rotate: 0,
        y: isActive ? -8 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{ width: size, height: size }}
      className="relative"
    >
      {/* Pulse effect for active marker */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: [1, 1.8, 2.2],
            opacity: [0.6, 0.3, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      )}

      {/* Honeycomb SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' : 'none' }}
      >
        <defs>
          <linearGradient id="honeycombGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Outer hexagon with gradient */}
        <polygon
          points="50,5 85,25 85,65 50,85 15,65 15,25"
          fill="url(#honeycombGradient)"
          stroke="#B45309"
          strokeWidth="2"
          className="hover:brightness-110 transition-all duration-300"
        />

        {/* Inner hexagon for 3D effect */}
        <polygon
          points="50,15 75,30 75,60 50,75 25,60 25,30"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="1"
        />

        {/* Small dot in center */}
        <circle
          cx="50"
          cy="45"
          r="8"
          fill="#F59E0B"
          className={isActive ? 'animate-pulse' : ''}
        />

        {/* Bee icon in center */}
        <text
          x="50"
          y="50"
          fontSize="28"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#B45309"
          fontWeight="bold"
          className="select-none"
        >
          🐝
        </text>
      </svg>
    </motion.div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

interface AnimatedLogoProps {
  size?: number
  animated?: boolean
}

export default function AnimatedLogo({ size = 48, animated = true }: AnimatedLogoProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  const colors = {
    body: theme === 'light' ? '#FCD34D' : '#F59E0B',
    stripe: '#1A1A1A',
    wing: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(200, 200, 200, 0.6)',
    eye: '#000000',
    outline: theme === 'light' ? '#B45309' : '#92400E',
  }

  // Stroke animation variants
  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', stiffness: 50, damping: 25 },
        opacity: { duration: 0.3 },
      },
    },
  }

  const wingVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const bodyVariants = {
    rest: { y: 0, rotate: 0 },
    hover: {
      y: [-2, 2, -2],
      rotate: [-3, 3, -3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={animated ? 'hidden' : 'visible'}
      animate={animated ? 'visible' : 'visible'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-visible"
    >
      {/* Back wing */}
      <motion.g
        variants={wingVariants}
        animate={isHovered ? 'hover' : 'rest'}
        style={{ transformOrigin: '40px 45px' }}
        initial="rest"
      >
        <motion.ellipse
          cx="30"
          cy="45"
          rx="12"
          ry="8"
          fill={colors.wing}
          stroke={colors.outline}
          strokeWidth="1"
          variants={drawVariants}
          initial="hidden"
          animate={animated ? 'visible' : 'visible'}
          transition={{ delay: 0.3 }}
          style={{ filter: 'blur(0.5px)' }}
        />
      </motion.g>

      {/* Bee body with animation */}
      <motion.g variants={bodyVariants} animate={isHovered ? 'hover' : 'rest'} initial="rest">
        {/* Body outline */}
        <motion.ellipse
          cx="50"
          cy="55"
          rx="20"
          ry="25"
          fill={colors.body}
          stroke={colors.outline}
          strokeWidth="2"
          variants={drawVariants}
          transition={{ delay: 0.1 }}
        />

        {/* Stripes */}
        {[35, 45, 55, 65].map((y, index) => (
          <motion.line
            key={y}
            x1="35"
            y1={y}
            x2="65"
            y2={y}
            stroke={colors.stripe}
            strokeWidth="4"
            strokeLinecap="round"
            variants={drawVariants}
            transition={{ delay: 0.2 + index * 0.1 }}
          />
        ))}

        {/* Face */}
        <motion.g variants={drawVariants} transition={{ delay: 0.4 }}>
          {/* Eyes */}
          <circle cx="42" cy="35" r="3" fill={colors.eye} />
          <circle cx="58" cy="35" r="3" fill={colors.eye} />
          {/* Eye shine */}
          <circle cx="41" cy="34" r="1" fill="white" />
          <circle cx="57" cy="34" r="1" fill="white" />
          {/* Smile */}
          <path
            d="M 45 42 Q 50 47 55 42"
            stroke={colors.stripe}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* Antennae */}
        <motion.g variants={drawVariants} transition={{ delay: 0.5 }}>
          <path
            d="M 42 30 Q 38 20 35 22"
            stroke={colors.stripe}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 58 30 Q 62 20 65 22"
            stroke={colors.stripe}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Antenna tips */}
          <circle cx="35" cy="22" r="2" fill={colors.body} />
          <circle cx="65" cy="22" r="2" fill={colors.body} />
        </motion.g>

        {/* Stinger */}
        <motion.path
          d="M 50 80 L 50 88"
          stroke={colors.stripe}
          strokeWidth="3"
          strokeLinecap="round"
          variants={drawVariants}
          transition={{ delay: 0.6 }}
        />
      </motion.g>

      {/* Front wing */}
      <motion.g
        variants={wingVariants}
        animate={isHovered ? 'hover' : 'rest'}
        style={{ transformOrigin: '60px 45px' }}
        initial="rest"
      >
        <motion.ellipse
          cx="70"
          cy="45"
          rx="12"
          ry="8"
          fill={colors.wing}
          stroke={colors.outline}
          strokeWidth="1"
          variants={drawVariants}
          transition={{ delay: 0.7 }}
          style={{ filter: 'blur(0.5px)' }}
        />
      </motion.g>

      {/* Honey drip effect - visible on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Honey drips */}
            {[30, 40, 50, 60, 70].map((x, index) => (
              <motion.circle
                key={x}
                cx={x}
                cy={85}
                r={2 + Math.random() * 2}
                fill="#FCD34D"
                opacity={0.8}
                animate={{
                  y: [85, 100],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 1 + index * 0.2,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </motion.svg>
  )
}

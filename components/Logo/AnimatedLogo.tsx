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
  const [isHovered, setIsHovered] = useState(false)

  const colors = {
    body: theme === 'light' ? '#FCD34D' : '#F59E0B',
    stripe: '#1A1A1A',
    wing: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(200, 200, 200, 0.6)',
    eye: '#000000',
    outline: theme === 'light' ? '#B45309' : '#92400E',
  }



  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-visible"
    >
       {/* Back wing */}
      <motion.g
        animate={isHovered ? { rotate: [-10, 10, -10, 10, 0] } : { rotate: 0 }}
        style={{ transformOrigin: '40px 45px' }}
        transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
      >
         <motion.ellipse
           cx="30"
           cy="45"
           rx="12"
           ry="8"
           fill={colors.wing}
           stroke={colors.outline}
           strokeWidth="1"
           style={{ filter: 'blur(0.5px)' }}
         />
      </motion.g>

       {/* Bee body with animation */}
      <motion.g animate={isHovered ? { y: [-2, 2, -2], rotate: [-3, 3, -3] } : { y: 0, rotate: 0 }} transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}>
        {/* Body outline */}
        <motion.ellipse
           cx="50"
           cy="55"
           rx="20"
           ry="25"
           fill={colors.body}
           stroke={colors.outline}
           strokeWidth="2"
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
           />
         ))}

         {/* Face */}
         <motion.g>
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
         <motion.g>
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
         />
      </motion.g>

       {/* Front wing */}
      <motion.g
        animate={isHovered ? { rotate: [-10, 10, -10, 10, 0] } : { rotate: 0 }}
        style={{ transformOrigin: '60px 45px' }}
        transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
      >
         <motion.ellipse
           cx="70"
           cy="45"
           rx="12"
           ry="8"
           fill={colors.wing}
           stroke={colors.outline}
           strokeWidth="1"
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

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoneyDripButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function HoneyDripButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  size = 'md'
}: HoneyDripButtonProps) {
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  }

  const variants = {
    primary: 'bg-honey-500 hover:bg-honey-600 text-white',
    secondary: 'bg-bee-amber hover:bg-bee-amber/90 text-white'
  }

  const ButtonContent = () => (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Honey Drip SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="honey-drip" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 Q50 -5 100 0 T200 0 L200 60 Q150 65 100 60 T0 60 Z"
          fill="url(#honey-drip)"
          className="animate-drip"
        />
      </svg>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Honey Drop Icon on Hover */}
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
        whileHover={{ opacity: 1 }}
      >
        <svg width="16" height="24" viewBox="0 0 16 24" fill="#FFD700">
          <path d="M8 0 C12.4 0 16 3.6 16 8 C16 13.3 9.3 18.3 8 24 C6.7 18.3 0 13.3 0 8 C0 3.6 3.6 0 8 0 Z" />
        </svg>
      </motion.div>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        <ButtonContent />
      </a>
    )
  }

  return <ButtonContent />
}

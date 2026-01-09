'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import HoneycombPattern from '../Logo/HoneycombPattern'

interface SectionProps {
  id?: string
  title: string
  description?: string
  children: ReactNode
  icon?: ReactNode
  className?: string
  backgroundPattern?: {
    size?: 'sm' | 'md' | 'lg'
    opacity?: number
    animate?: boolean
  }
}

export function Section({
  id,
  title,
  description,
  children,
  icon,
  className = '',
  backgroundPattern = { size: 'md', opacity: 0.05, animate: true }
}: SectionProps) {
  return (
    <section id={id} className={`py-20 relative overflow-hidden ${className}`}>
      {backgroundPattern && (
        <HoneycombPattern
          stringSize={backgroundPattern.size}
          opacity={backgroundPattern.opacity}
          color="#FFD700"
          animated={backgroundPattern.animate}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {icon && <div className="inline-flex items-center justify-center gap-2 mb-6">{icon}</div>}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  )
}

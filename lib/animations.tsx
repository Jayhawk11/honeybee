'use client'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

type SectionMotionProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode
  delay?: number
  delayIndex?: number
}

export function FadeIn({ children, delay, delayIndex, className, ...props }: SectionMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay !== undefined ? delay : delayIndex ? delayIndex * 0.1 : 0 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInLeft({ children, className, ...props }: SectionMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInRight({ children, className, ...props }: SectionMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredContainer({ children, className, ...props }: SectionMotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { ComponentType } from 'react'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  color: string
  slug: string
  image: string
  index: number
}

/**
 * ServiceCard Component
 * Reusable card for displaying service information with image, icon, and CTA
 */
export function ServiceCard({
  id,
  title,
  description,
  icon: Icon,
  color,
  slug,
  image,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Link href={`/services/${slug}`} data-testid={`service-card-${id}`}>
        <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-200 mb-4">
              {description}
            </p>
            <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
              <span className="font-medium">Learn More</span>
              <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

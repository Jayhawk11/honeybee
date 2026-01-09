'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import HoneycombPattern from './Logo/HoneycombPattern'
import FloatingBee from './FloatingBee'

// Lazy load EventPhotoSlideshow to avoid blocking initial render
const EventPhotoSlideshow = dynamic(() => import('./EventPhotoSlideshow'), {
  loading: () => (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
  ),
  ssr: false
})

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-honey-100 via-honey-200 to-bee-amber dark:from-gray-900 dark:via-primary-900 dark:to-gray-800" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent" aria-hidden="true" />

      {/* Honeycomb Pattern Overlay */}
      <HoneycombPattern size={60} opacity={0.08} color="#FFD700" animated={true} aria-hidden="true" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-honey-300 rounded-full blur-3xl opacity-50 animate-pulse" role="presentation" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-bee-amber rounded-full blur-3xl opacity-30 animate-pulse" role="presentation" aria-hidden="true" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-honey-400 rounded-full blur-2xl opacity-40 animate-float" role="presentation" aria-hidden="true" />

      {/* Floating Bees */}
      <FloatingBee size="lg" delay={0.5} duration={5} className="absolute top-[15%] right-[10%]" />
      <FloatingBee size="md" delay={1.5} duration={4.5} className="absolute top-[25%] right-[25%]" />
      <FloatingBee size="sm" delay={2} duration={3.5} className="absolute top-[60%] right-[5%]" />
      <FloatingBee size="md" delay={0.8} duration={4.8} className="absolute bottom-[30%] left-[5%]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <SparklesIcon className="w-5 h-5 text-bee-gold" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Founded in 2013
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <div className="w-5 h-5 bg-honey-100 dark:bg-honey-900 rounded-full flex items-center justify-center">
                  <span className="text-sm">🐝</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  10+ Years of Service
                </span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              data-testid="hero-heading"
            >
              Supporting Adults With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-honey-500 to-bee-amber">
                Intellectual and Developmental Disabilities
              </span>
            </motion.h1>

            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative mb-8"
            >
              <svg
                className="absolute -top-4 -left-4 w-8 h-8 text-honey-300 opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl sm:text-2xl italic text-gray-700 dark:text-gray-300 font-light pl-6">
                &ldquo;Diversity and inclusion are about giving value to every human being, no matter our differences&rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
              data-testid="hero-description"
            >
              Honey Bee Community Services, Inc. assists individuals with developmental disabilities to live independently in community through Residential, Day Supports, and Targeted Case Management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToServices}
                aria-label="Scroll to services section to learn more about our services"
                className="group relative px-8 py-4 bg-bee-amber hover:bg-honey-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Learn More
                  <ChevronDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-honey-500 to-bee-amber opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <a
                href="#contact"
                aria-label="Go to contact form to get in touch with us"
                className="px-8 py-4 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 hover:border-bee-amber text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

          {/* Event Photo Slideshow */}
          <EventPhotoSlideshow />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <div className="w-2 h-2 bg-bee-gold-dark rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

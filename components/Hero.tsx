'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-200 to-accent-400 dark:from-gray-900 dark:via-primary-900 dark:to-gray-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-300 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-400 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-2xl opacity-40 animate-float" />

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <SparklesIcon className="w-5 h-5 text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Founded in 2013
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Supporting Adults With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
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
                className="absolute -top-4 -left-4 w-8 h-8 text-primary-300 opacity-50"
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
            >
              Honey Bee Community Services, Inc. assists individuals with developmental disabilities to live independently in the community through Residential, Day Supports, and Targeted Case Management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToServices}
                className="group relative px-8 py-4 bg-accent-400 hover:bg-accent-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Learn More
                  <ChevronDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <a
                href="#contact"
                className="px-8 py-4 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 hover:border-primary-400 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full aspect-square lg:aspect-[4/3] max-w-xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-500 rounded-3xl transform rotate-3 opacity-20 blur-xl" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/45042478-ec17-47fe-93fe-b72b121b824f/Andrew+Diane+Jenny+Conner.jpg"
                  alt="HBCS team members supporting community members"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">10+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Years of Service</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
          <div className="w-2 h-2 bg-primary-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

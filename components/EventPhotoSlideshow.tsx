'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface EventPhoto {
  title: string
  imageUrl: string
  description?: string
}

const events: EventPhoto[] = [
  {
    title: 'KC Police Station',
    imageUrl: '/assets/kc-police-station.jpg',
    description: 'Community outreach event at Kansas City Kansas Police Station'
  },
  {
    title: 'Union Station',
    imageUrl: '/assets/union-station.jpg',
    description: 'Visit to historic Union Station'
  },
  {
    title: 'Renaissance Festival',
    imageUrl: '/assets/renaissance-festival.jpg',
    description: 'Annual Knights of Lights Festival celebration'
  }
]

export default function EventPhotoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isPaused || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [mounted, isPaused, prefersReducedMotion])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  if (!mounted) {
    return (
      <div className="w-full aspect-square lg:aspect-[4/3] max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-primary-300 to-primary-500 animate-pulse" />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
      className="relative w-full aspect-square lg:aspect-[4/3] max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-500" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />

      {/* Slideshow Container */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={events[currentIndex].imageUrl}
              alt={events[currentIndex].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Screen reader-only announcement for play state */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {isPaused ? 'Photo slideshow paused' : 'Photo slideshow playing'}
        </div>

        {/* Title Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-bee-gold"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {events[currentIndex].title}
          </h3>
          {events[currentIndex].description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {events[currentIndex].description}
            </p>
          )}
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="group" aria-label="Photo navigation">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show photo ${index + 1} of ${events.length}: ${events[index].title}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

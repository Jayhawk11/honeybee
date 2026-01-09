'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

// Lazy load heavy sections to reduce initial bundle size
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
})
const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
})
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
})
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
})
const FAQAssistant = dynamic(() => import('@/components/FAQAssistant'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
})
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />
})

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="w-full">
      <Hero />
      <Suspense fallback={<div className="h-96 animate-pulse" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse" />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse" />}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse" />}>
        <FAQAssistant />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse" />}>
        <Contact />
      </Suspense>
    </div>
  )
}

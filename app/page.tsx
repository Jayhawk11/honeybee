'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Locations from '@/components/Locations'
import Contact from '@/components/Contact'

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
      <Services />
      <About />
      <Testimonials />
      <Locations />
      <Contact />
    </div>
  )
}

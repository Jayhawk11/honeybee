'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Section } from '@/components/layout/Section'
import { FadeIn, FadeInLeft, FadeInRight } from '@/lib/animations'
import { aboutData } from '@/data/about'

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <Section
        id="about"
        data-testid="about-section"
        title="About HBCS"
        description="Founded in 2013, Honey Bee Community Services has been dedicated to empowering individuals with intellectual and developmental disabilities to live their best lives"
        className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        backgroundPattern={{ size: 'md', opacity: 0.06, animate: false }}
      >
        <div className="space-y-16 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5" />
              </div>
            </div>
            <div className="h-64 lg:h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section
      id="about"
      data-testid="about-section"
      title="About HBCS"
      description="Founded in 2013, Honey Bee Community Services has been dedicated to empowering individuals with intellectual and developmental disabilities to live their best lives"
      className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      backgroundPattern={{ size: 'md', opacity: 0.06, animate: true }}
    >
      <div className="space-y-16 mb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {aboutData.mission.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {aboutData.mission.content}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {aboutData.mission.additional}
            </p>
          </FadeInLeft>

          <FadeInRight className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-honey-300 to-bee-amber rounded-3xl transform rotate-3 opacity-20 blur-xl" />
            <div className="relative bg-gradient-to-br from-honey-50 to-bee-cream dark:from-honey-900/20 dark:to-bee-amber/20 rounded-3xl p-12 shadow-xl border-2 border-honey-200 dark:border-honey-800">
              {/* Hexagonal Stats Grid */}
              <div className="grid grid-cols-2 gap-8">
                {aboutData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center relative group"
                  >
                    {/* Hexagonal background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="100" height="115" viewBox="0 0 100 115" fill="none">
                        <path d="M50 0 L95 25 L95 75 L50 100 L5 75 L5 25 Z" stroke="#FFD700" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="relative">
                      <p className={`text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                      <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInRight>
        </div>

        <FadeIn>
          <div className="bg-gradient-to-br from-honey-50 to-bee-cream dark:from-honey-900/20 dark:to-bee-cream/20 rounded-3xl p-10 border-2 border-honey-200 dark:border-honey-800 relative overflow-hidden">
            {/* Decorative honeycomb */}
            <div className="absolute -right-10 -bottom-10 opacity-5">
              <svg width="200" height="230" viewBox="0 0 200 230" fill="none">
                <path d="M100 0 L190 50 L190 150 L100 200 L10 150 L10 50 Z" stroke="#FFD700" strokeWidth="4" />
                <path d="M100 40 L150 70 L150 130 L100 160 L50 130 L50 70 Z" stroke="#FFD700" strokeWidth="4" />
              </svg>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {aboutData.story.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {aboutData.story.summary}
                </p>
                <Link
                  href="/history"
                  className="inline-flex items-center gap-2 text-honey-600 dark:text-honey-400 font-semibold hover:text-honey-700 dark:hover:text-honey-300"
                >
                  Read Our Full History
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {aboutData.story.fullStory}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {aboutData.story.growth}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-gradient-to-br from-wax-100 to-honey-50 dark:from-wax-900/20 dark:to-honey-900/20 rounded-3xl p-10 border-2 border-wax-200 dark:border-wax-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {aboutData.recognition.title}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
              {aboutData.recognition.description}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  CDDO Affiliations
                </h4>
                <ul className="space-y-2">
                  {aboutData.recognition.cddoAffiliations.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Community Involvement
                </h4>
                <ul className="space-y-2">
                  {aboutData.recognition.communityInvolvement.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Values
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          These core values guide everything we do and reflect our commitment to those we serve
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {aboutData.values.map((value, index) => {
          const Icon = value.icon
          return (
            <FadeIn
              key={value.title}
              delayIndex={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-honey-400 to-honey-600 mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </FadeIn>
          )
        })}
      </div>
    </Section>
  )
}

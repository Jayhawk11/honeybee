'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Section } from '@/components/layout/Section'
import { FadeIn } from '@/lib/animations'
import { services } from '@/data/services'

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon

  return (
    <FadeIn delayIndex={index} id={service.id}>
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl transform rotate-3 opacity-20 blur-xl`} />
          <div className={`relative ${service.bgColor} rounded-3xl p-8 shadow-xl border-2 border-honey-200 dark:border-honey-800`}>
            {/* Honeycomb decoration */}
            <div className="absolute -top-4 -right-4 opacity-10">
              <svg width="80" height="92" viewBox="0 0 80 92" fill="none">
                <path d="M40 0 L76.6 20 L76.6 60 L40 80 L3.4 60 L3.4 20 Z" stroke={service.color.includes('honey') ? '#FFD700' : '#FFB300'} strokeWidth="3" />
                <path d="M40 20 L56.6 30 L56.6 50 L40 60 L23.4 50 L23.4 30 Z" stroke={service.color.includes('honey') ? '#FFD700' : '#FFB300'} strokeWidth="3" />
              </svg>
            </div>

            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {service.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {service.description}
            </p>
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-bee-gold flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl transform -rotate-3 opacity-20 blur-xl`} />
          <div className="relative h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default function Services() {
  return (
    <Section
      id="services"
      title="Our Services"
      description="Comprehensive support services tailored to help individuals with intellectual and developmental disabilities live fulfilling, independent lives"
      className="bg-white dark:bg-gray-900"
      backgroundPattern={{ size: 'md', opacity: 0.05, animate: false }}
    >
      <div className="space-y-24">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <FadeIn className="mt-20 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-honey-500 to-bee-amber text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Get Started Today
        </a>
      </FadeIn>
    </Section>
  )
}

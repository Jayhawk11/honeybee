'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HomeIcon, SunIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ServiceCard } from '@/components/ui/ServiceCard'

const InteractiveLocationsMap = dynamic(() => import('@/components/InteractiveLocationsMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  )
})

const services = [
  {
    id: 'residential',
    icon: HomeIcon,
    title: 'Residential Services',
    description: 'Supporting independent living with everyday assistance',
    slug: 'residential',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/8b1ba66a-c7d3-49f9-9e08-8156d390ab76/field+day+pic+2+2025.jpg',
    color: 'from-primary-400 to-primary-600',
    features: ['Daily Living Skills', 'Healthy Nutrition', 'Physical Activity', 'Medical Appointments', 'Medication Management', 'Budgeting & Shopping']
  },
  {
    id: 'day-services',
    icon: SunIcon,
    title: 'Day Services',
    description: 'Community inclusion through choice and adventure',
    slug: 'day-services',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7362848a-d668-427c-8a9c-544bb9e95292/IMG_8624.jpg',
    color: 'from-accent-400 to-orange-500',
    features: ['Community Outings', 'Sports & Events', 'Cultural Activities', 'Social Events', 'Physical Activities', 'Client-Led Planning']
  },
  {
    id: 'case-management',
    icon: UserGroupIcon,
    title: 'Targeted Case Management',
    description: 'Connecting you to the supports you need',
    slug: 'targeted-case-management',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7a3b8e8d-5315-4fb7-81c7-b94a2e2a15d7/5.14.24CatCafe6.jpg',
    color: 'from-yellow-400 to-amber-500',
    features: ['Needs Assessment', 'Service Plan Creation', 'Care Coordination', 'Medical Support', 'Educational Support', 'Ongoing Management']
  }
]

const quickFacts = [
  {
    label: 'Service Areas',
    value: 'Johnson & Wyandotte Counties'
  },
  {
    label: 'Waiver Provider',
    value: 'HCBS IDD Waiver'
  },
  {
    label: 'Founded',
    value: '2013'
  },
  {
    label: 'Day Service Hours',
    value: 'Mon-Fri, 9AM-2PM'
  },
  {
    label: 'Mission',
    value: 'Independence through Support'
  },
  {
    label: 'CDDO Affiliations',
    value: 'Johnson & Wyandotte'
  }
]

export default function ServicesPage() {
  return (
    <div className="w-full">
      <section data-testid="services-hero" className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6" data-testid="services-heading">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Personalized support through Residential, Day Services, and Targeted Case Management to help individuals with intellectual and developmental disabilities live fulfilling, independent lives
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                color={service.color}
                slug={service.slug}
                image={service.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section data-testid="quick-facts-section" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="quick-facts-heading">
              Quick Facts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What you need to know about HBCS services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickFacts.map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
              >
                <p className="text-sm font-medium text-primary-400 mb-2 uppercase tracking-wide">
                  {fact.label}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {fact.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="locations-map-section" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="locations-map-heading">
              Find Us Near You
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our two day service locations serving the Kansas City metropolitan area
            </p>
          </motion.div>

          <InteractiveLocationsMap />
        </div>
      </section>

      <section data-testid="services-cta" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" data-testid="services-cta-heading">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Contact us today to learn how our services can support you or your loved one
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid="services-cta-button"
              aria-label="Contact us today to learn more about our services"
            >
              Contact Us Today
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

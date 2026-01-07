'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
    </div>
  )
})

const locations = [
  {
    id: 1,
    name: 'Main Office',
    address: '123 Main Street, Suite 100',
    city: 'Raleigh, NC 27601',
    phone: '(919) 555-0100',
    email: 'info@hbcs-inc.org',
    hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    services: ['Administrative', 'Case Management', 'Intake'],
    position: [35.7796, -78.6382]
  },
  {
    id: 2,
    name: 'Day Program Center',
    address: '456 Community Lane',
    city: 'Raleigh, NC 27603',
    phone: '(919) 555-0200',
    email: 'dayprogram@hbcs-inc.org',
    hours: 'Monday - Friday: 8:30 AM - 4:30 PM',
    services: ['Day Supports', 'Social Activities', 'Skills Training'],
    position: [35.7803, -78.6401]
  },
  {
    id: 3,
    name: 'Residential Services',
    address: '789 Independence Way',
    city: 'Raleigh, NC 27606',
    phone: '(919) 555-0300',
    email: 'residential@hbcs-inc.org',
    hours: '24/7 Support Available',
    services: ['Residential Supports', 'Community Living'],
    position: [35.7785, -78.6410]
  }
]

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Conveniently located throughout the Triangle region to serve you better
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedLocation(location)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                  selectedLocation.id === location.id
                    ? 'bg-gradient-to-r from-primary-400 to-accent-400 text-white shadow-xl'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg'
                }`}
              >
                <h3 className="text-xl font-bold mb-3">
                  {location.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className={`w-5 h-5 mt-0.5 ${
                      selectedLocation.id === location.id ? 'text-white' : 'text-primary-400'
                    }`} />
                    <div>
                      <p>{location.address}</p>
                      <p>{location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className={`w-5 h-5 ${
                      selectedLocation.id === location.id ? 'text-white' : 'text-primary-400'
                    }`} />
                    <a
                      href={`tel:${location.phone}`}
                      className={`hover:underline ${
                        selectedLocation.id === location.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {location.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className={`w-5 h-5 ${
                      selectedLocation.id === location.id ? 'text-white' : 'text-primary-400'
                    }`} />
                    <p>{location.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 h-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedLocation.name}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-primary-400 mt-0.5" />
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>{selectedLocation.address}</p>
                    <p>{selectedLocation.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-primary-400" />
                  <a
                    href={`tel:${selectedLocation.phone}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {selectedLocation.phone}
                  </a>
                </div>

                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-primary-400" />
                    <a
                      href={`mailto:${selectedLocation.email}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {selectedLocation.email}
                    </a>
                  </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-primary-400 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedLocation.hours}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Services Available
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.services.map((service) => (
                    <span
                      key={service}
                      className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <Map center={selectedLocation.position} />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Questions about our services or locations?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}

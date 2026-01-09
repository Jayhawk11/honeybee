'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPinIcon, ClockIcon, PhoneIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { locations, type Location } from '@/data/locations'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })

export default function InteractiveLocationsMap() {
  const router = useRouter()
  const [{ selectedLocation }, setMapState] = useState<{ selectedLocation: Location | null }>({ selectedLocation: null })
  const [map, setMap] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Memoize dynamic styles to prevent re-renders
  const tagStyle = useMemo(
    () => ({
      backgroundColor: selectedLocation.color ? `${selectedLocation.color}20` : '#F3F4F6',
      color: selectedLocation.color ?? '#F3F4F6'
    }),
    [selectedLocation?.color]
  )

  useEffect(() => {
    // Dynamically load Leaflet CSS
    if (typeof window !== 'undefined' && isMounted) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
  }, [isMounted])

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center" data-testid="locations-map-heading">
          Find Us Near You
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto">
          We have two day service locations serving the Kansas City metropolitan area
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLocationClick(location)}
              className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                selectedLocation.id === location.id
                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-500 shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Location icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, #FCD34D 0%, ${location.color} 100%)`
                  }}
                >
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {location.address}
                  </p>
                  {location.additional && (
                    <p className="text-gray-500 dark:text-gray-500 text-xs mb-2">
                      {location.additional}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    <span>{location.hours}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: selectedLocation.id === location.id ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {location.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
                    style={tagStyle}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200 dark:border-amber-900/50"
        >
          {/* Decorative honeycomb pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="honeycomb"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <polygon
                    points="25 0 50 12.5 50 25 37.5 12.5 25 0 12.5"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#honeycomb)" />
            </svg>
          </div>

          {/* Leaflet Map */}
          <div ref={setMap as any} className="h-full w-full z-0"></div>
        </motion.div>
      </div>
    </div>
  )
}

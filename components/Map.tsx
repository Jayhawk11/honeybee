'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })

interface MapProps {
  center: [number, number] | number[]
}

export default function Map({ center }: MapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[center[0], center[1]] as [number, number]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
         <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" aria-label="OpenStreetMap - Open source map data">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center[0], center[1]]}>
          <Popup>
            <div className="p-2">
              <p className="font-semibold">HBCS Location</p>
              <p className="text-sm text-gray-600">Click to get directions</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
